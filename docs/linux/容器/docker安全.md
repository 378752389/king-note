---
title: docker安全
date: 2023-07-14
categories:
  - 容器
tags:
  - docker
  - 证书
---


:::warning
**docker证书验证规则：要求服务端证书的`common name`必须和部署docker host的主机名相匹配**。
:::


[https单向认证和双向认证](https://blog.csdn.net/duanbokan/article/details/50847612)

```shell
dockerd --tlsverify --tlscacert=ca.pem --tlscert=server-cert.pem --tlskey=server-key.pem -H=0.0.0.0:2376
```


```shell
docker --tlsverify --tlscacert=ca.pem --tlscert=cert.pem --tlskey=key.pem -H=$HOST:2376 version
```