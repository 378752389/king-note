---
title: logback相关配置
date: 2024-03-06
categories:
  - JavaEE
tags:
  - 日志
---

## 介绍

`logback`主要有三个模块组成，分别是：

- Logger： 应用程序和Logger进行交互产生日志信息
- Appender： 日志输出的放置位置；一个Logger可以有多个Appender，Appender也不仅仅只代表文件。
- Layout： 格式化日志内容

在 `logback` 中日志级别主要： *TRACE, DEBUG, INFO, WARN* and *ERROR.*
如果 Logger 没有指明日志级别，那么它将继承最近祖先的日志级别，默认祖先为root，root的日志级别为`DEBUG`。

eg:

```
<root level="info">
    <appender-ref ref="STDOUT"/>
</root>

 <logger name="com.king.food.web" level="debug" additivity="false">
    <appender-ref ref="STDOUT"/>
</logger>
```

配置文件中包含2个`Logger`， 第二个 `Logger` 的包路径为 `com.king.food.web`， 意味着对于 `com.king.food.web` 以及其
子包下的类文件，都将继承该`Logger`配置，日志输出级别为 `debug`， 对于 `com.king.food` 或者 `org.spring.framework` 等
包，由于没有其他的`Logger`继承配置，因此默认继承 `root` 这一根 `Logger` 配置。

## 配置加载顺序

spring项目中，logback配置文件加载顺序：

1. 在类路径下搜索 logback-test.xml、logback.groovy、logback.xml
2. 使用SPI加载*com.qos.logback.classic.spi.Configurator.*
3. 默认配置，直接打印到控制台

## 变量替换

logback中的变量替换：

在logback中定义了如下变量：

```xml

<property name="LOG_DIR" value="/var/log/application"/>
```

启动程序时可以添加如下参数可以进行变量替换：

```shell
java -DLOG_DIR=/var/log/application -jar xxx.jar
```

## 格式化配置

### 格式化替换参数

| 参数        | 说明                        | 实例                             |
|-----------|---------------------------|--------------------------------|
| %logger   | 日志所属类全名，日志最右边名字永远不会缩写     | %logger{10}                    |
| %date/%d  | 日志日期,格式通 SimpleDateFormat | %date{yyyy-MM-dd HH:mm:ss:SSS} |
| %msg/%m   | 日志消息内容                    |                                |
| %n        | 打印一个换行符号                  |                                |
| %level    | 打印日志输出级别                  |                                |
| %relative | 系统启动到目前所运行的毫秒数            |                                |
| %X        | 扩展内容，MDC                  |                                |

### 格式化修饰参数

修改参数位于 `%` 和格式化替换参数之间， 主要用于美化输出， 常用的有如下几种

- `8`: 数字标识占位符最小长度，如果字符串不足8个字符，将会用空格进行填充。
- `-8`: 负号带表左对齐，默认为右对齐。
- `8.-8`：小数点后面的数字表示截断长度，`-`表示后截断。默认为前截断（保留消息的最后几个字符，前面的字符都进行截取丢弃）
- `08`：如果字符串不足8个字符，前面将会用0进行填充。

## 配置解析

```xml

<configuration>

    <!--    日志路径-->
    <property name="LOG_PATH" value="D:\\Project\\king-food\\king-food-web\\logs"/>
    <!--    但日志文件最大大小-->
    <property name="MAX_FILE_SIZE" value="500MB"/>
    <!--    日志输出格式配置-->
    <property name="LOG_FORMATTER" value="%d{HH:mm:ss.SSS} [%thread] %-5level [%X{ip}, %X{uid}] %logger{36} -%msg%n"/>

    <!--    控制台日志输出配置-->
    <appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
        <encoder>
            <pattern>${LOG_FORMATTER}</pattern>
        </encoder>
    </appender>

    <!--    info 日志级别以上的日志都输出到这里-->
    <appender name="ALL_FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <file>${LOG_PATH}/info.log</file>
        <encoder>
            <pattern>${LOG_FORMATTER}</pattern>
        </encoder>
        <rollingPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedRollingPolicy">
            <fileNamePattern>${LOG_PATH}/info-%d{yyyy-MM-dd}.%03i.log</fileNamePattern>
            <maxHistory>30</maxHistory>
            <totalSizeCap>30GB</totalSizeCap>
            <maxFileSize>${MAX_FILE_SIZE}</maxFileSize>
        </rollingPolicy>
    </appender>


    <appender name="ERROR_FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <file>${LOG_PATH}/error.log</file>
        <encoder>
            <pattern>${LOG_FORMATTER}</pattern>
        </encoder>
        <!--        只匹配错误日志-->
        <filter class="ch.qos.logback.classic.filter.LevelFilter">
            <level>ERROR</level>
            <onMatch>ACCEPT</onMatch>
            <onMismatch>DENY</onMismatch>
        </filter>
        <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <fileNamePattern>${LOG_PATH}/error-%d{yyyy-MM-dd}.log</fileNamePattern>
            <maxHistory>30</maxHistory>
            <totalSizeCap>30GB</totalSizeCap>
        </rollingPolicy>
    </appender>

    <root level="info">
        <appender-ref ref="STDOUT"/>
    </root>

    <logger name="com.king.food.web" level="info" additivity="false">
        <appender-ref ref="STDOUT"/>
        <appender-ref ref="ALL_FILE"/>
        <appender-ref ref="ERROR_FILE"/>
    </logger>
</configuration>
```

参数解释：

- totalSizeCap：用来指定日志文件的上限大小，例如设置为10GB的话，那么当日至总大小到了这个值，就会删除旧的日志
- additivity：是否向下传递日志输出。对于匹配到 `com.king.food.web` 的`Logger`，同时也匹配 `root`, 
  如果添加了 `additivity="false"`后，将结束匹配。