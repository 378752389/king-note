---
title: SpringBoot整合动态数据源
date: 2023-07-06
categories:
  - SpringBoot
tags:
  - Spring整合
---

## 导入依赖

```xml

<dependencies>
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
        <version>8.0.30</version>
    </dependency>

    <dependency>
        <groupId>com.baomidou</groupId>
        <artifactId>mybatis-plus-boot-starter</artifactId>
        <version>3.5.2</version>
    </dependency>

    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-aop</artifactId>
    </dependency>

    <dependency>
        <groupId>com.alibaba</groupId>
        <artifactId>druid-spring-boot-starter</artifactId>
        <version>1.2.15</version>
    </dependency>

</dependencies>
```

## 编写配置文件
```yaml
spring:
  datasource:
    master:
      driver-class-name: com.mysql.cj.jdbc.Driver
#      type: com.alibaba.druid.pool.DruidDataSource
      url: jdbc:mysql://127.0.0.1:3306/transaction_test?useUnicode=true&characterEncoding=utf-8&autoReconnect=true&useSSL=false
      username: root
      password: root
    slaver:
      driver-class-name: com.mysql.cj.jdbc.Driver
#      type: com.alibaba.druid.pool.DruidDataSource
      url: jdbc:mysql://127.0.0.1:3306/transaction_test?useUnicode=true&characterEncoding=utf-8&autoReconnect=true&useSSL=false
      username: root
      password: root

mybatis-plus:
  mapper-locations:
    - classpath*:mapper/*.xml              # 定义 xml 存放位置
```


## 服务编写


### 继承动态数据源

```java
public class DynamicDataSource extends AbstractRoutingDataSource {

    public static final ThreadLocal<String> dataSourceKey = new ThreadLocal<>();

    @Override
    protected Object determineCurrentLookupKey() {
        return dataSourceKey.get();
    }


}
```

### 数据源配置

```java
@Configuration
public class DataSourceConfig {

    // 动态数据源配置
    @Bean
    @Primary
    public DynamicDataSource dynamicDataSource(DruidDataSource masterDataSource, DruidDataSource slaverDataSource) {
        DynamicDataSource dynamicDataSource = new DynamicDataSource();
        // 设置默认数据源
        dynamicDataSource.setDefaultTargetDataSource(masterDataSource);

        // 注入所有数据源
        Map<Object, Object> map = new HashMap<>();
        map.put("master", masterDataSource);
        map.put("slaver", slaverDataSource);
        dynamicDataSource.setTargetDataSources(map);

        return dynamicDataSource;
    }
    
    @Bean
    @ConfigurationProperties("spring.datasource.master")
    public DataSourceProperties masterDataSourceProperties() {
        return new DataSourceProperties();
    }

    @Bean
    @ConfigurationProperties("spring.datasource.slaver")
    public DataSourceProperties slaverDataSourceProperties() {
        return new DataSourceProperties();
    }

    @Bean
    public DruidDataSource masterDataSource(DataSourceProperties masterDataSourceProperties) {
        DruidDataSource druidDataSource = new DruidDataSource();
        druidDataSource.setUsername(masterDataSourceProperties.getUsername());
        druidDataSource.setPassword(masterDataSourceProperties.getPassword());
        druidDataSource.setUrl(masterDataSourceProperties.getUrl());
        return druidDataSource;
    }

    @Bean
    public DruidDataSource slaverDataSource(DataSourceProperties slaverDataSourceProperties) {
        DruidDataSource druidDataSource = new DruidDataSource();
        druidDataSource.setUsername(slaverDataSourceProperties.getUsername());
        druidDataSource.setPassword(slaverDataSourceProperties.getPassword());
        druidDataSource.setUrl(slaverDataSourceProperties.getUrl());
        return druidDataSource;
    }
}
```

### 2.编写数据源注解
```java
@Documented
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
public @interface KingDataSource {

    String value() default "master";

}
```


### 数据源切面
```java
@Aspect
@Component
public class DynamicDataSourceAspect {

    @Pointcut("execution(* com.wenking.daynamicdatasource..*(..))")
    public void pointCut() {
    }


    @Before("pointCut()")
    public void before(JoinPoint joinPoint) {
        MethodSignature signature =(MethodSignature) joinPoint.getSignature();
        Method method = signature.getMethod();
        
        KingDataSource annotation = AnnotationUtils.findAnnotation(method.getDeclaringClass(), KingDataSource.class);

        if (annotation != null) {
            String dataSourceKey = annotation.value();
            DynamicDataSource.dataSourceKey.set(dataSourceKey);
        }
    }


    @After("pointCut()")
    public void after() {
        DynamicDataSource.dataSourceKey.set(null);
    }
}
```
