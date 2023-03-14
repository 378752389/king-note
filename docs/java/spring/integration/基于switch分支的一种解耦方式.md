---
title: 基于switch分支的一种解耦方式
---

## 概述

在实际开发中，我们通常需要根据不同的输入，调用不同的实现类，通常为了避免ifelse 地狱，我们会采用 switch 进行分支选择。
在进行扩展的时候增加分支语句。

在spring 中提供了一种更加简便的解耦方式: `ServiceLocatorFactoryBean`

## 实现

对操作进行抽象
```java
public interface Parse {

    void parse(String text);
}
```

定义操作具体的实现

基于 json 的操作

```java
@Component
public class JSONParse implements Parse{
    @Override
    public void parse(String text) {
        System.out.println("text: " + text + "  已经被解析为json了");
    }
}
```

基于 xml 的操作

```java
@Component
public class JSONParse implements Parse{
    @Override
    public void parse(String text) {
        System.out.println("text: " + text + "  已经被解析为json了");
    }
}
```

定义操作枚举

```java
public enum ParseType {
    JSONParse,
    XMLParse
}
```

定义操作工厂
```java
public interface ParseFactory {

    Parse getParse(ParseType parseType);
}
```

注册操作工厂
```java
@Configuration
public class BeanFactoryConfig {
    @Bean("parseLocatorFactoryBean")
    public ServiceLocatorFactoryBean parseLocatorFactoryBean() {
        ServiceLocatorFactoryBean bean = new ServiceLocatorFactoryBean();
        bean.setServiceLocatorInterface(ParseFactory.class);
        return bean;
    }
}
```

客户端调用
```java
@RestController
public class ClientController  {

    @Autowired
    private ParseFactory parseFactory;
    
    public void call() {
        parseFactory.getParse(ParseType.JSONParse).parse("aaa");
    }
}
```

## 原理

原理是通过 jdk动态代理 创建了 `ParseFactory` 的代理对象， 代理对象中 `ServiceLocatorInvocationHandler` 增强方法通过
`ParseFactory.getParse` 中传递过来的参数， 从spring容器中根据bean的名称拿到对应的bean实例。 