---
title: Logback
---

## 介绍

logback当前分为三个模块：

* logback-core: 为其他两个模块基础
* logback-classic: 完整的实现了`slf4j`API，可以方便的更换其他日志系统 (包含 logback-core)
* logback-access: 访问模块与Servlet容器集成提供通过Http来访问日志的功能


logback 各个组件之间的关系

```
1. Logger:日志的记录器，把它关联到应用的对应的context上后，主要用于存放日志对象，也可以定义日志类型、级别。

2. Appender:用于指定日志输出的目的地，目的地可以是控制台、文件、数据库等等。

3. Layout:负责把事件转换成字符串，格式化的日志信息的输出。在logback中Layout对象被封装在encoder中。
```

## 使用

```xml
<!--slf4j日志门面-->
<dependency>
    <groupId>org.slf4j</groupId>
    <artifactId>slf4j-api</artifactId>
    <version>1.7.26</version>
</dependency>

<!--logback日志实现-->
<dependency>
    <groupId>ch.qos.logback</groupId>
    <artifactId>logback-classic</artifactId>
    <version>1.2.3</version>
</dependency>
```

> ContextName : 上下文名称; 默认为 `default`