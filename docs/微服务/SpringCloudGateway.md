---
title: 网关
date: 2023-07-09
categories:
  - 微服务
tags:
  - 网关
---

## 概述
* Route: 网关的基础构建，包含一个ID，一个目的URI，多个predicate和filter
* Predicate： 是java8的Predicate函数接口，输入参数是`ServerWebExchange`, 可以匹配任何请求内容（eg:请求头和请求参数）
* Filter: `GatewayFilter` 实例，可以修改请求和响应在发送和下游服务之前或返回给上游之前

> 官方文档：  https://docs.spring.io/spring-cloud-gateway/docs/current/reference/html/


## Predicate
可用的predicate包括： After、Before、Between、Cookie、Header、Host、Method、Path、Query

一条匹配规则展示

```yaml
spring:
  cloud:
    gateway:
      routes:
      - id: path_route
        uri: https://example.org
        predicates:
        - Path=/red/{segment},/blue/{segment}
```

对于谓词中提取出来的参数，将会在`GatewayFilter`中进行后续使用

```java
Map<String, String> uriVariables = ServerWebExchangeUtils.getUriTemplateVariables(exchange);

String segment = uriVariables.get("segment");
```

springcloud 进行流量控制

```yaml
spring:
  cloud:
    gateway:
      routes:
      - id: weight_high
        uri: https://weighthigh.org
        predicates:
        - Weight=group1, 8
      - id: weight_low
        uri: https://weightlow.org
        predicates:
        - Weight=group1, 2
```

将80%的流量转发到`https://weighthigh.org`, 20%的流量转发到`https://weightlow.org`


## Filter
可以的Filter包括： AddRequestHeader、AddRequestHeadersIfNotPresent、AddRequestParameter、AddResponseHeader...
