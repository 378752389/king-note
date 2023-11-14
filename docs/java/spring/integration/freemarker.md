---
title: 整合FreeMarker
date: 2023-07-06
categories:
  - SpringBoot整合
---

### 导入依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-freemarker</artifactId>
</dependency>
```



### 修改配置文件

```yml
spring:
  resources:
    static-locations:
      - classpath:/static/     #指定静态资源的存放路径， 可以直接进行访问
  freemarker:
    suffix: .ftl
    template-loader-path:
      - classpath:/templates/     #指定ftl模板文件的存放路径
```



### 添加模板内容

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<h1>login success</h1>
<p>${txt}</p>
</body>
</html>
```



### 代码编写

```java
@Controller
public class FreemarkerController {

    @GetMapping("/dsa")
    public String asd(Model model) {
        model.addAttribute("txt", "niupi");
        return "asd";
    }
}
```



