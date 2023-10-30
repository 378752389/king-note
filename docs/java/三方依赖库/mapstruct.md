---
title: mapstruct基本使用
date: 2023-10-30
categories:
  - JavaSE
tags:
  - 网络编程
---

默认情况下，mapstruct 会将 entity 的字段 映射到 dto 上相同的字段名上。

## 操作前准备

定义三个实体类，分别为

> SysRoleReq

```java
@Data
public class SysRoleReq {

    private Integer id;

    private String roleName;

    private List<Integer> resourceIds;
}
```

> SysRoleResp

```java
@Data
public class SysRoleResp {

    private Integer id;

    private String roleName;
    
    private String createTime;
    
    private String resourceName;

    private List<SysResource> resourceList;
}
```

> SysRole

```java
@Data
public class SysRole {
    
    private Integer id;

    private String name;

    private LocalDateTime createTime;

    private LocalDateTime updateTime;

    private String createBy;

    private String updateBy;
}
```

## 基本映射

相同的字段名进行映射，不同的字段名，通过注解指定映射名称

```java
public class SysRoleConverter{
    
    SysRoleConverter INSTANCE = Mappers.getMapper(SysRoleConverter.class);
    
    SysRoleResp toResp(SysRole role);
    
    @Mappings({
        @Mapping(source = "roleName", target = "name")
    })
    // @Mapping(source = "roleName", target = "name")  只有单个映射的简化写法
    SysRole toEntity(SysRoleReq req);
}
```

## 多参数源映射

resp 的数据其实包括了 角色模型层 数据 和 资源模型层 数据，相当于我们需要查询2次数据库，然后组装为一个实体类。

```java
@Mappings({
    @Mapping(source = "sysRole.name", target = "roleName"),
    @Mapping(source = "sysResource.name", target = "resouceName")
})
SysRoleResp toEntity(SysRole sysRole, SysResource sysResource);
```

## 更新Bean

```java
@Mappings({
    @Mapping(source = "roleName", target = "name"),
})
void toEntity(@MappingTarget SysRole sysRole, SysRoleReq req);
```

## 数据类型转换

```java
@Mappings({
    @Mapping(source = "name", target = "roleName"),
    @Mapping(source = "createTime", target = "createTime", dateFormat = "yyyy-MM-dd")
})
SysRoleResp toResp(SysRole role);
```

## 逆映射

一个文件内，两个类之间互相转换映射时其实只要写好其中一个映射，另一个可以通过注解继承原有映射配置，即原有的 target 与 source
会互换

```java
@Mappings({
    @Mapping(source = "name", target = "roleName"),
    @Mapping(source = "createTime", target = "createTime", dateFormat = "yyyy-MM-dd")
})
SysRoleResp toResp(SysRole role);

@InheritInverseConfiguration
SysRole toEntity(SysRoleResp resp)
```

## 集合映射

自定义映射

```java
// 自定义的映射方法：转换boolen为String时，做一些判断然后返回对应的值。
@Named("DoneFormater")
public class DoneFormater {

    @Named("DoneFormater")
    public String toStr(Boolean isDone) {
        if (isDone) {
            return "已完成";
        } else {
            return "未完成";
        }
    }

    @Named("DoneDetailFormater")
    public String toDetail(Boolean isDone) {
        if (isDone) {
            return "该产品已完成";
        } else {
            return "该产品未完成";
        }
    }

    public Boolean toBoolean(String str) {
        if (str.equals("已完成")) {
            return true;
        } else {
            return false;
        }
    }

}
```

```java
// 通过uses 来导入上面我们写的 自定义映射方法
@Mapper( uses = {DoneFormater.class})
public interface ObjectQualiferMapper {

    ObjectQualiferMapper INSTANCE = Mappers.getMapper(ObjectQualiferMapper.class);
	
    // 当有多个方法 拥有一样的参数和返回类型时，需要指定使用其中的哪一个，使用qualifiedByName指定
    @Mapping(source = "isDone", target = "isDone", qualifiedByName = "DoneDetailFormater")
    ProductDTO toDto(Product product);

}


```

List 映射

```java
@Mappings({
    @Mapping(source = "name", target = "roleName"),
    @Mapping(source = "createTime", target = "createTime", dateFormat = "yyyy-MM-dd")
})
SysRoleResp toResp(SysRole role);

// 当执行 下面这个List的转换时，会遍历list: roleList, 后自动调用上面的 entity 转 resp 的转换方法，来进行转换
List<SysRoleResp> toRespList(List<SysRole> roleList);
```

枚举映射

```java
public enum E1 {
    E1_1,
    E1_2,
    E1_3
}
public enum E2 {
    E2_1,
    E2_2,
    E2_3
}
```

```java
 @ValueMappings({
     @ValueMapping(target = "E1_1", source = "E2_1"),
     @ValueMapping(target = "E1_2", source = "E2_2"),
     @ValueMapping(target = MappingConstants.NULL, source = "E2_3") //转换成null
 })
E1 toDTO(E2 e2);
```

