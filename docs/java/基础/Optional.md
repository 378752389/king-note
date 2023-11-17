---
title: Optional使用
date: 2023-11-16
categories:
  - JavaSE
---

Java8提供了非常有用的API：Optional。直接看接口会感到非常茫然，学完后不知如何使用。这边文章主要讲下optional的使用场景

<!-- more -->

## 使用场景

### 场景一

```java
if(user != null) {
    System.out.println(user)
}
```

使用 Optional 简化操作， **存在则进行操作**

```java
Optional.ofNullable(user).ifPresent(System.out::println);
```

### 场景二

当我们需要获取对象的某些属性的时候，我们需要层层解刨调用 `get` 函数， 然后拿去到我们想要的属性。这种代码写得相当繁琐，导致业务代码堆积，不利于阅读

```java
User user = ...
if ( user != null) {
    String name = user.getName();
    if (name != null) {
        return name.toUpperCase();
    } else {
        return null;
    }
} else {
    return null;
}
```

使用 Optional 可以方便清晰进行这种解刨操作， **获取对象的某个属性，并且消除空指针判断**

```java
String name = Optional.ofNullable(user).map(User::getName).map(String::toUpperCase).orElse(null);
```

