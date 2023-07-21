---
title: Idea中docker插件使用
date: 2023-07-21
categories:
  - 容器
tags:
  - docker
---

## 直连docker后台

centos7下，docker 启动文件归于systemd管理，修改配置文件`/usr/lib/systemd/system/docker.service`, 在ExecStart末尾添加如下内容，允许客户端
远程连接docker的2375端口。

```shell
ExecStart=/usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock -H tcp://0.0.0.0:2375
```

重启docker

```shell
systemctl daemon-reload
systemctl restart docker
```

使用docker客户端远程连接docker
```shell
docker -H tcp://192.168.1.128:2375 info
```



## 通过tls方式连接docker

[参考官方文档](https://docs.docker.com/engine/security/protect-access/)

我们知道，直连方式非常不安全，任何人知道ip都可以连接到docker daemon，所以我们需要通过 tls 保护 docker daemon socket

执行下面脚本生成证书

### 服务端配置

生成docker tls 证书脚本

```shell
cat > docker-tls-generate.sh <<'EOF'
#!/bin/bash

HOST=$(hostname)

hosts="DNS:$HOST,IP:192.168.1.128,IP:127.0.0.1"

# 创建 ca 私钥
openssl genrsa -out ca-key.pem 4096
# 创建 ca 自签名证书
openssl req -new -x509 -days 365 -key ca-key.pem -sha256 -out ca.pem -subj "/C=Cn/ST=GD/L=SZ/O=Ltd/OU=development/CN=CA for Docker"
# 创建 server 私钥
openssl genrsa -out server-key.pem 4096
# 创建 server 证书请求文件
openssl req -subj "/CN=$HOST" -sha256 -new -key server-key.pem -out server.csr

# x509v3 扩展配置， 声明该证书用于服务端认证和服务端证书绑定的域名或IP，在非指定域名或IP服务器上安装该证书无效，会认证失败
echo subjectAltName = $hosts >> extfile-server.cnf
echo extendedKeyUsage = serverAuth >> extfile-server.cnf

# 创建 server 证书， 用 ca 证书对该证书签名
openssl x509 -req -days 365 -sha256 -in server.csr -CA ca.pem -CAkey ca-key.pem -CAcreateserial -out server-cert.pem -extfile extfile-server.cnf

# 创建docker 客户端私钥  
openssl genrsa -out key.pem 4096

# 创建docker 客户端 证书请求文件
openssl req -subj '/CN=client' -new -key key.pem -out client.csr

# x509v3 扩展配置， 申明创建该证书用于客户端认证
echo extendedKeyUsage = clientAuth > extfile-client.cnf

# 生成客户端证书
openssl x509 -req -days 365 -sha256 -in client.csr -CA ca.pem -CAkey ca-key.pem -CAcreateserial -out cert.pem -extfile extfile-client.cnf

EOF
```

```shell
chmod +x docker-tls-generate.sh

./docker-tls-generate.sh
```

:::tip
docker官方文档推荐使用 $HOST 主机名作为 服务端证书的CN （`Common Name`）, 实测下来不用服务器名做 CN 也是可以的。
:::

修改docker启动文件，指定 docker 启动时开始 tls 连接， 并且需要指定服务端证书文件，包括 `ca.pem、server-cert.pem、server-key.pem`；
centos7下，启动文件归于systemd管理，修改配置文件`/usr/lib/systemd/system/docker.service`, 将ExecStart修改为如下内容：

```shell
ExecStart=/usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock \
--tlsverify --tlscacert=/root/docker-tls/ca.pem --tlscert=/root/docker-tls/server-cert.pem \
--tlskey=/root/docker-tls/server-key.pem -H tcp://192.168.1.128:2376
```

![docker开启tls修改systemd配置文件](https://raw.githubusercontent.com/378752389/image-bed/main/king-note/docker%E5%BC%80%E5%90%AFtls%E4%BF%AE%E6%94%B9systemd%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6.png)

:::warning
/root/docker-tls/ 修改为证书存在的目录下
:::

重启 docker
```shell
systemctl daemon-reload
systemctl restart docker
```

使用 客户端命令测试 tls 是否配置成功
```shell
docker --tlsverify \
    --tlscacert=/root/docker-tls/ca.pem \
    --tlscert=/root/docker-tls/cert.pem \
    --tlskey=/root/docker-tls/key.pem \
    -H=192.168.1.128:2376 version
```

![docker远程tls连接服务器返回正常结果](https://raw.githubusercontent.com/378752389/image-bed/main/king-note/docker%E5%BC%80%E5%90%AFtls%E8%BF%9C%E7%A8%8B%E8%BF%9E%E6%8E%A5%E6%9C%8D%E5%8A%A1%E5%99%A8%E6%AD%A3%E5%B8%B8%E8%BF%94%E5%9B%9E%E7%BB%93%E6%9E%9C.png)

如果输出正常，则说明服务端配置成功了

:::tip
docker 默认端口监听在 2375上， docker tls 默认监听在 2376上。

docker 默认是不开放对外监听的，只能通过本地 sock 监听
:::


:::details cat创建文件小插曲
运行下面命令创建 newfile 文件

```shell
cat > newfile <<EOF
this is newfile
my name is $name
EOF
```

cat 查看 发现 $name 变量消失不见了
![cat创建文件后变量引用消失问题](https://raw.githubusercontent.com/378752389/image-bed/main/king-note/cat%E5%88%9B%E5%BB%BA%E6%96%87%E4%BB%B6%E5%90%8E%E5%8F%98%E9%87%8F%E5%BC%95%E7%94%A8%E6%B6%88%E5%A4%B1%E9%97%AE%E9%A2%98.png)


原因是我们没有对变量赋值，然后参数被扩展了，解决办法是用单引号把EOF文件结束符引起来，就可以抑制变量扩展。
```shell
cat > newfile <<'EOF'
this is newfile
my name is $name
EOF
```
:::


### docker 客户端配置

拷贝 `ca.pem、key.pem、cert.pem` 三个文件， 用于客户端连接, 将其存放在指定目录下。

:::warning
idea 插件中指定证书目录中必须存在这三个文件，并且必须同名，否则docker插件识别不到
:::

在idea的插件市场中安装docker插件

![idea插件市场安装docker插件](https://raw.githubusercontent.com/378752389/image-bed/main/king-note/idea%E6%8F%92%E4%BB%B6%E5%B8%82%E5%9C%BA%E6%90%9C%E7%B4%A2%E5%AE%89%E8%A3%85docker%E6%8F%92%E4%BB%B6.png)


在idea打开插件编辑配置界面

![idea开启docker编辑配置](https://raw.githubusercontent.com/378752389/image-bed/main/king-note/idea%E5%BC%80%E5%90%AFdocker%E7%BC%96%E8%BE%91%E9%85%8D%E7%BD%AE.png)

配置插件

![idea中docker插件启动配置](https://raw.githubusercontent.com/378752389/image-bed/main/king-note/idea%E4%B8%ADdocker%E6%8F%92%E4%BB%B6%E5%90%AF%E5%8A%A8%E9%85%8D%E7%BD%AE.png)

1. 添加docker配置项
2. 指定从dockerfile中构建镜像文件
3. 指定docker host 远程连接配置
4. 配置dockerfile文件所在位置，构建上下文和构建镜像的名称和标签

其中 dockerfile 远程连接配置如下

![idea中docker插件远程连接配置](https://raw.githubusercontent.com/378752389/image-bed/main/king-note/idea%E4%B8%ADdocker%E6%8F%92%E4%BB%B6%E8%BF%9C%E7%A8%8B%E8%BF%9E%E6%8E%A5%E9%85%8D%E7%BD%AE.png)

1. 指定远程连接地址，此处使用 https
2. 指定证书存放目录，docker插件会自动读取证书



最后，只需像启动idea项目一样启动插件集合自动编译构建镜像到服务后台了。
