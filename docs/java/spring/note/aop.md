---
title: aop
date: 2023-08-02
categories:
  - spring
tags:
  - aop
  - 事务
---

## AOP相关概念

| 概念   | 单词        | 解释                                                  |
|------|-----------|-----------------------------------------------------|
| 目标对象 | Target    | 被增强的方法所在的对象                                         |
| 代理对象 | Proxy     | 对目标对象进行增强后的对象，客户端实际调用的对象                            |
| 连接点  | Joinpoint | 目标对象中可以被增强的方法  (一个Bean的方法都可以叫连接点)                   |
| 切入点  | Pointcut  | 目标对象中实际被增强的方法  （一个Bean的方法只有符合**配置的切点表达式后**，才被称为切入点） |
| 通知   | Advice    | 增强部分的代码逻辑                                           |
| 切面   | Aspect    | 通知和切入点的组合 (在spring中为一个定义的类，包含了切入点和通知)               |
| 织入   | Weaving   | 将通知和切入点动态组合的过程                                      |

![AOP相关概念](https://raw.githubusercontent.com/378752389/image-bed/main/king-note/AOP%E6%A6%82%E5%BF%B5%E8%A7%A3%E9%87%8A.png)

## 切入点

### execution(方法表达式)

### within(x)

定义：目标对象target类型 必须和 x类型 匹配；支持通配符；

```java
x.equals(target.getClass())
```

用法：

| 表达式                          | 说明                                          |
|------------------------------|---------------------------------------------|
| within(com.king…*)           | com.king包及子包下的任何方法                          |
| within(com.king…IPService+)  | com.king包及子包下IPService类型及子类型的任何方法           |
| within(com.king.DemoService) | 匹配com.javacode.DemoService类中所有的方法，不包含子类中的方法 |

### this(x)

定义：代理对象proxy类型是必须和x的类型匹配； 表达式必须是类型全限定名，**不支持通配符；**

```java
x.getClass().isAssignableFrom(proxy.getClass());     // 不代理接口（jdk动态代理），代理target对象（cglib动态代理）
```

### target(x)

定义： 目标对象target类型和x类型匹配； 表达式必须是类型全限定名，**不支持通配符；**

```java
x.getClass().isAssignableFrom(target.getClass());
```

### args(x)

定义： 匹配当前执行的方法传入的参数类型是否和x类型匹配

| 表达式            | 说明                          |
|----------------|-----------------------------|
| args(String)   | 匹配只有一个参数且传入的参数类型是String的方法  |
| args(*,String) | 匹配只有2个参数的且第二个参数类型是String的方法 |
| args(…,String) | 匹配最后1个参数类型是String的方法        |


:::tip

所有@操作，配置的x都为注解类型

:::

### @within(x)

定义：调用目标方法(可能调用的是父类方法)，会检测目标方法所在的类上是否和**x的注解类型**匹配

```java
method.getDeclaringClass().getAnnotation(x) != null
```

### @target(x)

定义：判断目标对象target类型上是否有x注解；

```java
target.class.getAnnotation(x) != null
```

### @args(x)

定义： 方法参数所属的类上有指定的注解

### @annotation(x)：

定义： 匹配被调用的方法上是否和**x的注解类型**匹配

## 通知

### 前置通知

连接点执行之前，执行前置通知

```java
@Aspect
public class BeforeExample {

	@Before("execution(* com.xyz.dao.*.*(..))")
	public void doAccessCheck() {
		// ...
	}
}
```

### 返回通知

连接点正常执行结束，执行返回通知

```java
@Aspect
public class AfterReturningExample {

	@AfterReturning(
		pointcut="execution(* com.xyz.dao.*.*(..))",
		returning="retVal")
	public void doAccessCheck(Object retVal) {
		// ...
	}
}
```

### 异常通知

连接点执行抛出异常，执行异常通知

```java
@Aspect
public class AfterThrowingExample {

	@AfterThrowing(
		pointcut="execution(* com.xyz.dao.*.*(..))",
		throwing="ex")
	public void doRecoveryActions(DataAccessException ex) {
		// ...
	}
}
```

### 最终通知

无论连接点正常执行返回，还是抛出异常，最终通知都将执行

```java
@Aspect
public class AfterFinallyExample {

	@After("execution(* com.xyz.dao.*.*(..))")
	public void doReleaseLock() {
		// ...
	}
}
```

### 环绕通知

在连接点执行周围，进行拦截

```java
@Aspect
public class AroundExample {
    
    public Object preProcessQueryPattern(ProceedingJoinPoint pjp) throws Throwable {
        return pjp.proceed();
    }
}

```

### 拦截连接点的参数和注解

```java
@Aspect
public class AfterFinallyExample {

    // 获取方法执行参数
	@Before("execution(* com.xyz.dao.*.*(..)) && args(account,..)")
    public void validateAccount(Account account) {
        // ...
    }
    
    // 获取方法执行注解
    @Before("execution(* com.xyz.dao.*.*(..)) && @annotation(auditable)") 
    public void audit(Auditable auditable) {
        AuditCode code = auditable.value();
        // ...
    }
}
```

### 通知的执行顺序

当某个连接点有多个通知，可以通过@Order注解控制通知执行顺序：数值越小优先级越高



## Other

[参考博客](https://blog.csdn.net/cocoa_geforce/article/details/116796155)
