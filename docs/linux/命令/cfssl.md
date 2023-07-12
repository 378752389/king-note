---
title: cfssl生成自签名证书
date: 2023-07-11
categories:
  - 网络安全
tags:
  - 证书
---

:::tip
在实际的工作中经常遇到制作自定义的服务器证书的场景，目前能够制作 CA 根证书及服务器证书有 openssl 及 cfssl 两种常用工具。
cfssl是CloudFlare开源的一款PKI/TLS工具。 cfssl 包含一个命令行工具 和一个用于 签名，验证并且捆绑TLS证书的 HTTP API 服务。
:::

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

## 默认配置

cfssl执行时候需要指定一些配置信息，这些配置信息包含在默认配置中，通常情况下我们需要修改默认配置

```shell
# ca 证书配置
cfssl print-defaults config > ca-config.json

# 证书请求文件默认配置
cfssl print-defaults csr > ca-csr.json
```

## 证书配置

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

:::tip
从Chrome58开始，只通过校验SAN(Subject Alternative Name)属性验证证书的有效性。 SAN是X509定义的一个扩展， 使用了
SAN字段的证书，可以扩展此证书支持的域名，使得一个证书可以支持多个不同域名的解析。
:::

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

:::tip
SAN属性定义在hosts属性内, CN 字段已经无所谓了, 可以随便填。
:::

生成服务端证书

```shell
cfssl gencert -ca=ca.pem -ca-key=ca-key.pem -config=ca-config.json -profile=server server-csr.json | cfssljson -bare server
```

:::tip
-ca 指定ca证书， -ca-key 指定ca私钥， -config 指定签名配置， -profile 指定特定配置用途
:::

## 验证证书

```shell
cfssl-certinfo -cert server.pem
```

## 参考

:::details
[张先生的深夜食堂](https://www.ethanzhang.xyz/cfssl%E4%BD%BF%E7%94%A8%E6%96%B9%E6%B3%95/#31-%E8%8E%B7%E5%8F%96%E9%BB%98%E8%AE%A4%E8%AE%BE%E7%BD%AE)
:::
