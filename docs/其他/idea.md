---
title: idea
date: 2023-07-08
categories:
  - 其他
tags:
  - idea
---

## idea启动参数

IDEA中vm options与program arguments区别：

`VM options`其实就是我们在程序中需要的运行时环境变量，它需要以-D或-X或-XX开头，每个参数使用空格分隔

`eg`: `-Dspring.profiles.active=dev3`

`Program arguments`为我们传入main方法的字符串数组`args[]`，它通常以--开头，如--`spring.profiles.active=dev3`; 其等价于`-Dspring.profiles.active=dev3`,**如果同时存在，以Program arguments配置优先**


## 代码重构

### 类名/方法名/字段重命名

`shift + F6`

### 提取方法/内联方法

* 提取方法: 将公共代码抽出来为一个方法
  `Ctrl + Alt + M`
* 内联方法：将方法内的代码融入到另外一个方法中
  `Ctrl + Alt + N`

### 重构变量/重构常量/重构成员变量

* 提取变量： `Ctrl + Alt + C`
* 提取常量： `Ctrl + Alt + V`
* 提取成员变量：`Ctrl + Alt + F`


### 查看字段有在哪些地方被引用

* `Alt + F7`

### 修改源码

如果想修改源代码，可以在当前项目下建立一个和源码同名类，并且具有相同的包路径。

原理是由java类加载机制决定的，会有限加载当前类路径下的类文件。

### bean生命周期调试

1. 如果想判断bean是什么时候实例化的， 可以在bean的所有构造方法上都打上断点

2. 如果想控制bean初始化，可以实现`BeanPostProcessor`类型，然后在初始化请求对bean实例进行判断，在判断中加入自己的逻辑