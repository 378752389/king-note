---
title: springboot中filter和顺序关系
date: 2023-08-13
categories:
  - spring
tags:
  - web组件
---

## 定义

过滤器是 java web 三大常用组件之一，可以对几乎所有请求进行过滤，但是缺点是一个过滤器实例只能在容器初始化时调用一次。

## springboot中使用filter

### 方式一

* 实现 `javax.servlet.Filter` 接口
* 在过滤器上添加 `@WebFilter(filterName="firstFilter",urlPatterns={"/*"})` 注解，并指定匹配路径
* 在主启动类上或者配置类上添加 `@ServletComponentScan` 注解

:::warning
添加 `@Order` 注解并不能改变Filter 执行的先后顺序。

`@Order`注解用于切面的优先级和集合注入时bean的顺序，对于实例化bean的顺序没有影响。
:::

缺点：不能控制 filter 执行顺序

### 方式二

* 实现 `javax.servlet.Filter` 接口
* 在过滤器上添加 `@Component` 注解
* 在filter上添加 `@Order` 注解控制filter 执行顺序


缺点：既可以控制 filter 执行顺序，也可以控制 filter 的拦截路径

### 方式三

* 实现 `javax.servlet.Filter` 接口
* 新增一个配置类，然后将每个过滤器封装为 `FilterRegistrationBean` 


优点：既可以控制 filter 执行顺序，也可以控制 filter 的拦截路径
缺点：需要对每个类击进行封装，稍微麻烦一定

