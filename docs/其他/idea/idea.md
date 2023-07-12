---
title: idea启动参数
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