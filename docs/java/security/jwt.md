---
title: jwt
permalink: /java/security
---

### jwt

由三部分组成：

* header
  * 头部通常包含令牌的类型typ和签名算法alg
* payload
  * 由claims组成，claims是实体的声明，由三种类型的claim，分别是：*registered*, *public*, and *private* claims.
  * *registered claims*：
    * iss：jwt的签发人信息。（appname or url）
    * sub：jwt持有者的信息。
    * jti：jwt id
    * iat： 签发日期。
    * nbf： not before。要求当前日期必须在签发日志之后使用，
    * exp： 过期时间
    * aud：
* signature
