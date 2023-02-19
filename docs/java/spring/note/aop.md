

### 基本概念

aspect(切面): 被@aspect 注解修饰的类

join point(连接点): 方法的执行， 增强的方法内容

advice(建议): 在方法的什么时候执行 连接点（之前， 之后， 前后...）

pointcut(切入点): 在哪些类、方法上执行

Weaving(织入):  将aspect和连接点结合， 形成新的代理类



target: 需要通过aop 增强的对象

proxy: 通过aop增强后生成的对象



`@Aspect`标注的类上，这个类中，可以通过通过`@Pointcut`来定义切入点，可以通过`@Before、@Around、@After、@AfterRunning、@AfterThrowing`标注在方法上来定义通知，定义好了之后，将`@Aspect`标注的这个类交给`AspectJProxyFactory`来解析生成`Advisor`链，进而结合目标对象一起来生成代理对象.

```java
public class AopTest9 {
    @Test
    public void test1() {
        try {
            //对应目标对象
            Service1 target = new Service1();
            //创建AspectJProxyFactory对象
            AspectJProxyFactory proxyFactory = new AspectJProxyFactory();
            //设置被代理的目标对象
            proxyFactory.setTarget(target);
            //设置标注了@Aspect注解的类
            proxyFactory.addAspect(Aspect1.class);
            //生成代理对象
            Service1 proxy = proxyFactory.getProxy();
            //使用代理对象
            proxy.m1();
            proxy.m2();
        } catch (Exception e) {
        }
    }
}
```





### 切入点定义

within(x):

x.equals(target.getClass())

note：目标对象target必须和指定类型相同



within(x+)

note：目标对象target必须和指定类型或子类型相同



this(x)：

x.getClass().isAssignableFrom(proxy.getClass());     // 不代理接口（jdk动态代理），代理target对象（cglib动态代理）

note：代理对象proxy类型是指定对象的子类型



target(x)：

x.getClass().isAssignableFrom(target.getClass());

note： 目标对象target类型是指定对象的子类型

arg(String):

匹配只有一个参数且传入的参数类型是String的方法



@within(注解类型)：

被调用的目标方法Method对象.getDeclaringClass().getAnnotation(within中指定的注解类型) != null

 

@target(注解类型)：

target.class.getAnnotation(指定的注解类型) != null



@args（注解类型）：

@Pointcut("@args(Ann8)")：匹配方法只有一个参数，并且参数所属的类上有Ann8注解



@annotation(注解类型)：

匹配被调用的方法上有指定的注解。





### Other

[参考博客](https://blog.csdn.net/cocoa_geforce/article/details/116796155)