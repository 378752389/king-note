---
title: cfssl使用
---

## 下载

```shell
# 逐个下载二进制文件至当前路径，也可以使用`-O`参数直接下载到/usr/local/bin目录下。
wget https://github.com/cloudflare/cfssl/releases/download/v1.6.0/cfssl_1.6.0_linux_amd64
wget https://github.com/cloudflare/cfssl/releases/download/v1.6.0/cfssl-certinfo_1.6.0_linux_amd64
wget https://github.com/cloudflare/cfssl/releases/download/v1.6.0/cfssljson_1.6.0_linux_amd64
# 赋予执行权限
chmod +x cfssl*

#拷贝二进制文件至执行目录
cp cfssl-certinfo_1.6.0_linux_amd64 /usr/local/bin/cfssl-certinfo
cp cfssl_1.6.0_linux_amd64 /usr/local/bin/cfssl
cp cfssljson_1.6.0_linux_amd64 /usr/local/bin/cfssljson
```

## 查看默认配置

```shell
# ca 证书配置
cfssl print-defaults config > ca-config.json

# 证书请求文件默认配置
cfssl print-defaults csr > ca-csr.json
```

## 自签名证书配置

ca证书签名配置

```shell
cat > ca-config.json <<EOF
{
  "signing": {
    "default": {
      "expiry": "87600h"
    },
    "profiles": {
      "server": {
         "expiry": "87600h",
         "usages": [
            "signing",
            "key encipherment",
            "server auth",
            "client auth"
        ]
      }
    }
  }
}
EOF
```

ca自签名证书请求配置

```shell
cat > ca-csr.json << EOF
{
    "CN": "etcd CA",
    "key": {
        "algo": "rsa",
        "size": 2048
    },
    "names": [
        {
            "C": "CN",
            "L": "Beijing",
            "ST": "Beijing"
        }
    ]
}
EOF
```

* signing: 表示该证书可以用于签名其他证书
* server auth: 表示可以用该CA对server提供的证书进行验证
* client auth: 表示可以用该CA对client提供的证书进行验证

```shell
cfssl gencert -initca ca-csr.json | cfssljson -bare ca
```

> -initca: 生产 ca 私钥， -bare ca 生成的证书前缀名称

最终将包含 ca.csr（证书请求文件）, ca-key.pem（证书私钥）, ca.pem（证书） 三个文件


> 从Chrome58开始，只通过校验SAN(Subject Alternative Name)属性验证证书的有效性。 SAN是X509定义的一个扩展， 使用了
> SAN字段的证书，可以扩展此证书支持的域名，使得一个证书可以支持多个不同域名的解析。


## 编写服务端证书

服务端证书请求配置

```shell
cat > server-csr.json <<EOF
{
    "CN": "server.com",
    "hosts": [
        "server.com",
        "192.168.100.250"
    ],
    "key": {
        "algo": "rsa",
        "size": 2048
    },
    "names": [
        {
            "C": "CN",
            "ST": "Shanghai",
            "L": "Shanghai",
            "O": "cj.io",
            "OU": "infrastructure"
        }
    ]
}
EOF
```

> SAN属性定义在hosts属性内, CN 字段已经无所谓了, 可以随便填。

生成服务端证书

```shell
cfssl gencert -ca=ca.pem -ca-key=ca-key.pem -config=ca-config.json -profile=server server-csr.json | cfssljson -bare server
```

> -ca 指定ca证书， -ca-key 指定ca私钥， -config 指定签名配置， -profile 指定特定配置用途


## 验证证书

```shell
cfssl-certinfo -cert server.pem
```