---
title: spring中的工具类
---

`GenericTypeResolver` 泛型类型解析
```java
public interface Container<T> {

    }

public class StringContainer implements Container<String> {

}
```

```java
// 解析StringContainer对应的泛型类型， 此处类型为 String.class
Class<?> paramType = GenericTypeResolver.resolveTypeArgument(StringContainer.class, Container.class);

// 解析泛型接口类型， 此处接口类型为 Container.class
Type type = GenericTypeResolver.resolveType(Container.class, StringContainer.class);
```

> 还可以解析返回值泛型类型