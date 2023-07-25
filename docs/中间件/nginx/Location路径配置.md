---
title: Nginx-Location路径配置
date: 2023-07-25
categories:
  - 中间件
sidebar: false
tags:
  - nginx
---


## location匹配模式

nginx中location的匹配语法如下：

```
location [ = | ^~ | ~ | ~* | ] uri {
  ...
}

location  [指令模式] url匹配模式 {
    
}
```



nginx存在五种匹配模式

### 精确匹配

定义： =指令用于精确字符匹配（模式），不能使用正则，区分大小写。

示例：
```
location = /demo {
    rewrite ^ http://google.com;
}

location = /demo$ {
    rewrite ^ http://google.com;
}
```
解释1： 上述的配置表示只有访问 http://192.168.33.10/demo 才能跳转到google的页面。

反例1： http://192.168.33.10/demo/ ,这样是不能访问到的。

解释2： 上述的配置表示只有访问 http://192.168.33.10/demo$ 才能跳转到google的页面。正则在精确匹配是不生效的。

### 前缀匹配

定义：^~指令用于字符前缀匹配，不能使用正则，区分大小写。只需匹配以url模式开头的即可。

```
location ^~ /demo {
    rewrite ^ http://google.com;
}
```

解释： 下列地址都能匹配到：
* http://192.168.33.10/demo
* http://192.168.33.10/demo/
* http://192.168.33.10/demo/asd


### 正则匹配

定义： ~和~* 指令用于正则匹配，前者表示使用正则，区分大小写，后者表示使用正则，不区分大小写。只需匹配以url模式开头的即可。

示例：
```
location ~ /[0-9]emo {
    rewrite ^ http://google.com;
}

location ~* /[0-9]EmO {
    rewrite ^ http://google.com;
}
```

解释1： 下列地址都能匹配到：
* http://192.168.33.10/5emo
* http://192.168.33.10/2emo
* http://192.168.33.10/5emo/asd

解释2： 下列地址都能匹配到：
* http://192.168.33.10/5emo
* http://192.168.33.10/2EMO
* http://192.168.33.10/5eMo/asd

### 正常匹配

定义： 没有指定匹配指令的即为正常匹配。不区分大小写。

示例：
```
location /demo {
    rewrite ^ http://google.com;
}
```

解释1： 下列地址都能匹配到：

* http://192.168.33.10/demo
* http://192.168.33.10/demo/
* http://192.168.33.10/demoaaa
* http://192.168.33.10/demo/aaa


:::tip

正常匹配和前缀匹配的差别在于优先级。前缀的优先级高于正常匹配。

:::

### 全匹配

定义： 默认的location就是全匹配。

示例：
```
location / {
    rewrite ^ http://google.com;
}
```


## 匹配优先级

nginx的匹配优先级遵循一个大原则和两个小细节。

大原则是关于匹配模式的优先级：

```
精确匹配  >  前缀匹配  >  正则匹配  > 正常匹配  > 全匹配
```

小细节则是同一优先级中：

* 细节一：正则匹配成功之后停止匹配，非正则匹配成功还会接着匹配。
* 细节二：在所有匹配成功的url中，选取匹配度(匹配长度)最大的url字符地址。