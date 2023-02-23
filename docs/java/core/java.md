---
title: java基础
---
## 比较接口

### Comparable

Comparable是排序接口；若一个类实现了Comparable接口，就意味着“该类支持排序”。可以使用Arrays.sort()对改类进行排序, 默认排序为从小到大

该接口有个 `int compare(T o)` 方法
1. 如果返回值小于0： 表示 this 对象 小于 o 对象
2. 如果返回值大于0： 表示 this 对象 大于 o 对象


### Comparator
假如说我们有这样一个需求，需要对类的年龄进行排序，但是类是别人写好的，里面没有Comparable接口，如果在不允许改变源代码的情况下，我们可以使用Comparator接口。

该接口有个 `int compare(T o1, T o2)` 方法
1. 如果返回值小于0： 表示 o1 对象 小于 o2 对象
2. 如果返回值大于0： 表示 o1 对象 大于 o2 对象
