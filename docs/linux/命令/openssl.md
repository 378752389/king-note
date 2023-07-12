---
title: openssl生成自签名证书
date: 2023-07-11
categories:
  - 网络安全
tags:
  - 证书
---

#### https部署

**HTTPS工作流程**

1.客户端发起一个 HTTPS 请求。
2.服务端把配置好的证书返回给客户端。
3.客户端验证证书：比如是否在有效期内，证书的用途是不是匹配 Client 请求的站点，是不是在 CRL 吊销列表里面，它的上一级证书是否有效等
4.客户端使用伪随机数生成对称密钥，并通过证书里服务器的公钥进行加密。后续使用该对称密钥进行传输信息。
5.服务端使用自己的私钥解密这个消息，得到对称密钥。至此，客户端和服务端都持有了相同的对称密钥。
6.服务端使用对称密钥加密“明文内容 A”，发送给客户端。
7.客户端使用对称密钥解密响应的密文，得到“明文内容 A”。
8.客户端再次发起 HTTPS 的请求，使用对称密钥加密请求的“明文内容 B”，然后服务器使用对称密钥解密密文，得到“明文内容 B”。
以此保持加密通信。





1. **生成ca私钥和ca根证书**

```shell
#---------------------生成ca根证书-------------------------------
#1. 创建ca私钥
openssl genrsa -out rootCA.key 2048

#2. 创建ca自签名证书  -nodes 不加密输出  -new 新的证书请求
openssl req -x509 -new -nodes -key rootCA.key  -days 365 -out rootCA.crt
```



2. **将rootCA.crt导入到浏览器中**



3. **创建server私钥**

```shell
#---------------------创建服务器私钥-------------------------------
openssl genrsa -out server.key 2048
```



4. **编写cert.ext附加配置文件**

```toml
# Extensions to add to a certificate request
basicConstraints = CA:FALSE
keyUsage = nonRepudiation, digitalSignature, keyEncipherment, dataEncipherment
subjectAltName = @alt_names

[alt_names]
# 改成自己需要支持的服务器的域名
DNS.1 = zx.wenking.com
#DNS.2 = helpdesk.example.org
#DNS.3 = systems.example.net

# 改成自己需要支持的服务器的ip
IP.1 = 172.16.24.143
# IP.2 = 172.16.24.85
```

当我们用域名或者ip地址访问服务器时，浏览器将校验domain or ip是否和 alt_names中的域名或者ip相等， 如果不相等  将提示 当前访问的请求不安全。



5. **生成证书请求文件， 用ca私钥对证书请求文件进行签名**

```shell
# 生成证书请求文件
openssl req -new -key server.key -out server.csr

#使用ca私钥对证书进行签名    -CAcreateserial: 创建序号文件   -CAserial serial： 指定序号文件
openssl x509 -req -in server.csr -out server.crt -days 365 -CAcreateserial -CA rootCA.crt -CAkey rootCA.key -CAserial serial -extfile cert.ext
```



**部署**： 将server.key和server.crt文件放置到nginx配置文件中

```
server {
        listen       443 ssl;
        server_name  test.wenking.com;

        ssl_certificate      /usr/local/nginx/ssl/server.crt;
        ssl_certificate_key  /usr/local/nginx/ssl/server.key;
        
        location / {
            root   html;
            index  index.html index.htm;
        }
    }

```





**验证证书合法性**

```shell
openssl verify -CAfile rootCA.crt server.crt
```





**其他**：

```shell
#查看证书
openssl x509 -in github.crt -text -noout

# 连接github.com:443 获取tls 证书
openssl s_client -connect github.com:443 -showcerts | sed -n '/-----BEGIN/,/-----END/p' > github.com.crt
```



**pkcs12转换**

```shell
# 服务端证书和私钥打包为 pkcs12 文件
openssl pkcs12 -export -clcerts -in server.crt -inkey server.key -out server.p12

# 提取用户证书
openssl pkcs12 -in server.p12 -clcerts -password pass:217 -nokeys -out server_cert.pem
# 提取密钥
openssl pkcs12 -in server.p12  -nocerts -password pass:217 -nodes -out private_key.pem
# 从密钥中提取公钥
openssl rsa -in private_key.pem -pubout -out pk_server.pub
# 从密钥中提取私钥
openssl rsa -in private_key.pem -out pk_server.key
```



> pkcs12 大致的组成包括密钥和证书， 密钥有公私钥对组成



**jks和pkcs12转换**

```shell
# jks -> p12
keytool -importkeystore -srckeystore server.jks -srcstoretype JKS -deststoretype PKCS12 -destkeystore server.p12
# p12 -> jks
keytool -importkeystore -srckeystore server.p12 -srcstoretype PKCS12 -deststoretype JKS -destkeystore server.jks
```







**查看证书的网站：** https://myssl.com/cert_decode.html



**chrome 浏览器中删除证书：** chrome://net-internals/#hsts



**note：**

csr文件可以理解为没有签名的crt文件， 因为签名需要用issuer机构进行签名（此处为ca），同时还需要包含证书请求链。



[使用openssl制作自定义CA、自签名ssl证书 (github.com)](https://gist.github.com/liuguangw/4d4b87b750be8edb700ff94c783b1dd4)
