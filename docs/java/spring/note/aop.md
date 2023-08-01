---
title: AOP
permalink: /java/spring/note/
---



## AOP相关概念

| 概念     | 单词      | 解释                                                         |
| -------- | --------- | ------------------------------------------------------------ |
| 目标对象 | Target    | 被增强的方法所在的对象                                       |
| 代理对象 | Proxy     | 对目标对象进行增强后的对象，客户端实际调用的对象             |
| 连接点   | Joinpoint | 目标对象中可以被增强的方法  (一个Bean的方法都可以叫连接点)   |
| 切入点   | Pointcut  | 目标对象中实际被增强的方法  （一个Bean的方法只有符合**配置的切点表达式后**，才被称为切入点） |
| 通知     | Advice    | 增强部分的代码逻辑                                           |
| 切面     | Aspect    | 通知和切入点的组合 (在spring中为一个定义的类，包含了切入点和通知) |
| 织入     | Weaving   | 将通知和切入点动态组合的过程                                 |



![AOP相关概念](https://raw.githubusercontent.com/378752389/image-bed/main/king-note/AOP%E6%A6%82%E5%BF%B5%E8%A7%A3%E9%87%8A.png)




## 通知

```java
@Component
@Aspect
public class LogAspect {

    /**
     * define point cut.
     */
    @Pointcut("execution(* tech.pdai.springframework.service.*.*(..))")
    private void pointCutMethod() {
    }


    /**
     * 环绕通知.
     *
     * @param pjp pjp
     * @return obj
     * @throws Throwable exception
     */
    @Around("pointCutMethod()")
    public Object doAround(ProceedingJoinPoint pjp) throws Throwable {
        System.out.println("-----------------------");
        System.out.println("环绕通知: 进入方法");
        Object o = pjp.proceed();
        System.out.println("环绕通知: 退出方法");
        return o;
    }

    /**
     * 前置通知.
     */
    @Before("pointCutMethod()")
    public void doBefore() {
        System.out.println("前置通知");
    }


    /**
     * 后置通知.
     *
     * @param result return val
     */
    @AfterReturning(pointcut = "pointCutMethod()", returning = "result")
    public void doAfterReturning(String result) {
        System.out.println("后置通知, 返回值: " + result);
    }

    /**
     * 异常通知.
     *
     * @param e exception
     */
    @AfterThrowing(pointcut = "pointCutMethod()", throwing = "e")
    public void doAfterThrowing(Exception e) {
        System.out.println("异常通知, 异常: " + e.getMessage());
    }

    /**
     * 最终通知.
     */
    @After("pointCutMethod()")
    public void doAfter() {
        System.out.println("最终通知");
    }

}

```






## 切入点定义

execution(方法表达式)

```java
execution(modifiers-pattern? ret-type-pattern declaring-type-pattern? name-pattern(param-pattern) throws-pattern?)
```

:::tip

- 其中带 ?号的 modifiers-pattern?，declaring-type-pattern?，hrows-pattern?是可选项
- modifier-pattern? 修饰符匹配，如public 表示匹配公有方法
- ret-type-pattern 返回值匹配，* 表示任何返回值，全路径的类名等
- declaring-type-pattern? 类路径匹配
- name-pattern 方法名匹配，* 代表所有，set*，代表以set开头的所有方法
- (param-pattern) 参数匹配，指定方法参数(声明的类型)，(…)代表所有参数，(*,String)代表第一个参数为任何值,第二个为String类型，(…,String)代表最后一个参数是String类型
- throws-pattern? 异常类型匹配

:::



within(x)

```java
x.equals(target.getClass())
```

定义：目标对象target类型必须和x类型匹配；支持通配符；

用法： 

| 表达式                       | 说明                                                         |
| ---------------------------- | ------------------------------------------------------------ |
| within(com.king…*)           | com.king包及子包下的任何方法                                 |
| within(com.king…IPService+)  | com.king包及子包下IPService类型及子类型的任何方法            |
| within(com.king.DemoService) | 匹配com.javacode.DemoService类中所有的方法，不包含子类中的方法 |



this(x)

```java
x.getClass().isAssignableFrom(proxy.getClass());     // 不代理接口（jdk动态代理），代理target对象（cglib动态代理）
```

定义：代理对象proxy类型是必须和x的类型匹配； 表达式必须是类型全限定名，不支持通配符；



target(x)

```java
x.getClass().isAssignableFrom(target.getClass());
```

定义： 目标对象target类型和x类型匹配；  表达式必须是类型全限定名，不支持通配符；



args(x)

定义： 匹配当前执行的方法传入的参数类型是否和x类型匹配



| 表达式         | 说明                                            |
| -------------- | ----------------------------------------------- |
| args(String)   | 匹配只有一个参数且传入的参数类型是String的方法  |
| args(*,String) | 匹配只有2个参数的且第二个参数类型是String的方法 |
| args(…,String) | 匹配最后1个参数类型是String的方法               |



:::tip

所有@操作，配置的x都为注解类型

:::



@within(x)

定义：调用目标方法，会检测目标方法所在的类上是否和**x的注解类型**匹配

```java
被调用的目标方法Method对象.getDeclaringClass().getAnnotation(within中指定的注解类型) != null
```



@target(x)

定义：判断目标对象target类型上是否有x注解；

```java
target.class.getAnnotation(指定的注解类型) != null
```



@args(x)

定义： 方法参数所属的类上有指定的注解



@annotation(x)：

定义： 匹配被调用的方法上是否和**x的注解类型**匹配











## Other

[参考博客](https://blog.csdn.net/cocoa_geforce/article/details/116796155)
