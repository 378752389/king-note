---
title: SpringBoot整合FastJSON
date: 2023-07-06
categories:
  - SpringBoot
tags:
  - Spring整合
---

## 导入依赖


```xml
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>fastjson</artifactId>
    <version>1.2.83</version>
</dependency>
```

## 编写java配置

```java

@Configuration
public class JsonConfig {

    @Bean
    FastJsonHttpMessageConverter fastJsonHttpMessageConverter(){

        FastJsonHttpMessageConverter converter = new FastJsonHttpMessageConverter();
        FastJsonConfig jsonConfig = new FastJsonConfig();
        jsonConfig.setCharset(StandardCharsets.UTF_8);
        jsonConfig.setDateFormat("yyyy-MM-dd HH:mm:ss");

        converter.setSupportedMediaTypes(Collections.singletonList(MediaType.APPLICATION_JSON));
        converter.setDefaultCharset(StandardCharsets.UTF_8);
        converter.setFastJsonConfig(jsonConfig);

        return converter;
    }
}
```