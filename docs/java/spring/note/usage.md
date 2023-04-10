---
title: usage
---

## bean注入方式

给spring注册组件的方式：

* 包扫描+注解（@Controller、@Service、@Component、@Repository）

  特点： 只能注册我们字节写的组件
* 使用@Configuration + @Bean

  特点： 可以注册我们字节和第三方的组件
* @Import注册组件



## @import

点入@Import， 发现其内容如下

```java
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface Import {

	/**
	 * {@link Configuration @Configuration}, {@link ImportSelector},
	 * {@link ImportBeanDefinitionRegistrar}, or regular component classes to import.
	 */
	Class<?>[] value();

}
```

value 属性为class数组， 可以接受如下4中配置

* 加上@Configuration注解的类：将配置类和其中@Bean标注的方法注入到容器中（主要为导入三方配置）
* 实现ImportSelector接口的类：实现该接口selectImports方法， 方法返回一个类全限定名数组，没有想注入的组件返回一个空数组，将类加载到jvm并注入到容器中
* 实现ImportBeanDefinitionRegistrar接口的类：实现该接口registerBeanDefinitions方法，通过自定义BeanDefinition将组件注入到容器中 （可实现动态组件注册）
* 普通类： 将类注入到spring容器中（默认调用无参构造方法）


>ImportSelector.selectImports() 方法中 `AnnotationMetadata` 参数: **添加了@Import注解的类[并非@Import中导入的类]**对应的注解元数据信息


动态组件注入主要用作 接口实例化： mybatis的Mapper接口实例化、openfeign的client接口实例化、dubbo依赖方（reference）接口实例化。

