---
title: FactoryBean用途
date: 2024-05-05
categories:
  - spring
---

## FactoryBean

什么是 `FactoryBean` ?

`FactoryBean` 是 Spring 提供的一种扩展机制，允许用户自定义对象的创建过程。

当 Spring 需要创建某个对象时，它会首先检查该对象是否实现了 `FactoryBean` 接口。如果实现了该接口，Spring 将会调用该对象的 `getObject()` 方法来获取对象，而不是直接使用该对象本身。

何时使用 `FactoryBean` ?

- 当需要注册的bean需要一系列复杂的初始化步骤；
- 当需要创建一个非单例的bean，并且需要在运行时彻底实现某些操作，或者我们需要对bean实例进行精细控制；


## Bean生命周期

- 实例化
- 属性赋值
- 初始化
- 销毁

### 实例化

Bean 实例化时机也分为2种：
- BeanFactory管理的Bean是在使用到Bean的时候才会实例化Bean
- ApplicantContext管理的Bean在容器初始化的时候就会完成Bean实例化

### 属性赋值

Bean实例化后，Spring会调用Bean的set方法，为Bean的属性赋值，包括基础属性和依赖属性。

### 初始化

- 检查并设置 `Aware` 接口所需对象
- 调用 `BeanPostProcessor` 接口的 `postProcessBeforeInitialization` 方法
- 调用 `InitializingBean` 接口的 `afterPropertiesSet` 方法
- 调用 `init-method` 指定的初始化方法
- 调用 `BeanPostProcessor` 接口的 `postProcessAfterInitialization` 方法
- （注册 DESTRUCTION 相关回调接口）
- Bean初始化完成

### 销毁

- 调用 `DisposableBean` 接口的 `destroy` 方法
- 调用 `destroy-method` 指定的销毁方法
- Bean销毁完成


