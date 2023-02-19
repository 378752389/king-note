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

#2. 创建ca自签名证书
openssl req -x509 -new -nodes -key rootCA.key -sha256 -days 3650 -out rootCA.crt
```



2. **将rootCA.crt导入到浏览器中**



3. **创建server私钥**

```shell
#---------------------创建服务器私钥-------------------------------
openssl genrsa -out server.key 2048
```



4. **编写openssl.cnf配置文件**

```toml
[req]
distinguished_name = req_distinguished_name
req_extensions = v3_req

[req_distinguished_name]
countryName = Country Name 
countryName_default = China
stateOrProvinceName = State or Province Name 
stateOrProvinceName_default = GuangDong
localityName = Locality Name
localityName_default = ShenZhen
organizationalUnitName  = Organizational Unit Name (eg, section)
organizationalUnitName_default  = ServiceUnit
commonName = Internet Widgits Ltd
commonName_default = *.wenking.com
commonName_max  = 64

[ v3_req ]
# Extensions to add to a certificate request
basicConstraints = CA:FALSE
keyUsage = nonRepudiation, digitalSignature, keyEncipherment
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
openssl req -new -key server.key -out server.csr -config openssl.cnf -extensions v3_req

#使用ca私钥对证书进行签名
openssl x509 -req -in server.csr -CA rootCA.crt -CAkey rootCA.key -CAcreateserial -out server.crt -days 365 -sha256 -extensions v3_req -extfile openssl.cnf
```



**部署**： 将server.key和server.crt文件放置到nginx配置文件中



**其他**：

```shell
#查看证书
openssl x509 -in github.crt -text -noout

# 连接github.com:443 获取tls 证书
openssl s_client -connect github.com:443 -showcerts | sed -n '/-----BEGIN/,/-----END/p' > github.com.crt
```



**查看证书的网站：** https://myssl.com/cert_decode.html



**chrome 浏览器中删除证书：** chrome://net-internals/#hsts



**note：**

csr文件可以理解为没有签名的crt文件， 因为签名需要用issuer机构进行签名（此处为ca），同时还需要包含证书请求链。

