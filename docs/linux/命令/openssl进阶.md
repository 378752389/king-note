---
title: openssl进阶
date: 2023-07-21
categories:
  - 网络安全
tags:
  - 证书
---

:::tip
为了便于理解，我们可以简单的将tls和ssl划等号。本质tls是ssl的升级，具体区别可自行google。
:::

### 查看证书内容

```shell
openssl x509 -in server-cert.pem -text -noout
```

SSL证书分类：

1. 按照一个证书可以应用一个或多个域名，可以进行如下分类
    * 单域： 单域 SSL 证书仅适用于一个域。（“域”是网站的名称，例如 www.baidu.com）
    * 通配符： 与单域证书一样，通配符 SSL 证书仅适用于一个域。但是，它也包括该域的子域。 eg: 对于通配符域 *.baidu.com 可以匹配
      tieba.baidu.com, pan.baidu.com
    * 多域： 多域 SSL 证书可以应用于多个不相关的域。
2. 按照证书的验证级别进行分类
    * 域验证：这是最严格的验证级别，也是最便宜的级别。企业只需要证明他们控制着域。
    * 组织验证：这是一个需要亲力亲为的过程：证书机构直接联系请求证书的人员或企业。这些证书更受用户信赖。
    * 扩展验证：在发出 SSL 证书之前，需要对组织进行全面的背景检查。

## 浏览器验证ssl证书流程

第一，检查SSL 证书是否是由浏览器中“受信任的根证书颁发机构”颁发。

第二，检查SSL证书中的证书吊销列表，检查证书是否被证书颁发机构吊销。

第三，检查此SSL证书是否过期。

第四，检查部署此SSL证书的网站的域名是否与证书中的域名一致。

