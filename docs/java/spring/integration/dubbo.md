---
title: SpringBoot整合Dubbo
date: 2023-07-06
categories:
  - SpringBoot
tags:
  - Spring整合
---

## 导入依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-dependencies</artifactId>
    <version>2.7.2</version>
</dependency>

<dependency>
    <groupId>org.apache.dubbo</groupId>
    <artifactId>dubbo-spring-boot-starter</artifactId>
    <version>2.7.3</version>
</dependency>

<dependency>
    <groupId>org.apache.curator</groupId>
    <artifactId>curator-recipes</artifactId>
    <version>5.2.0</version>
</dependency>
```



##yaml配置文件

```yaml
spring:
  dubbo:
    application:
      name: xxpay4dubbo-service
      logger: slf4j
    registry:
      address: zookeeper://127.0.0.1:2181
      check: false
    protocol:
      name: dubbo
      port: 20880
    scan: org.xxpay.dubbo     # 扫描 包下 的服务
```



## 服务编写

### 1.主启动类

```java
@EnableDubbo
@SpringBootApplication
public class ProviderApp {
    public static void main(String[] args) {
        SpringApplication.run(ProviderApp.class, args);
    }
}
```



### 2.服务编写

```java
@Service
public class OrderServiceImpl implements OrderService {

    @Override
    public Map<String, String> providerOrder() {
        Map<String, String> map = new HashMap<>();
        map.put("asd", "qwe");
        map.put("zxc", "qaz");
        return map;
    }
}
```


>dubbo官网示例：  https://github.com/apache/dubbo-samples

