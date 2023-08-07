---
title: URL编码和解码
date: 2023-08-06
categories:
  - 计算机基础
tags:
  - 编码
---


网页的 URL 只能包含合法的字符。合法字符分成两类。

URL 元字符：分号（;），逗号（,），斜杠（/），问号（?），冒号（:），at（@），&，等号（=），加号（+），美元符号（$），井号（#）
语义字符：a-z，A-Z，0-9，连词号（-），下划线（_），点（.），感叹号（!），波浪线（~），星号（*），单引号（'），圆括号（()）



除上面字符外，其他字符出现在 URL 之中都必须转义，规则是根据操作系统的默认编码，**将每个字节转为百分号（`%`）加上两个大写的十六进制字母。**



:::tip

URL元字符都有特殊用途，比如： /:分割资源路径；?分割路径和请求参数信息等。

:::



js中的编解码方法

* `encodeURI和decodeURI`
* `encodeURIComponent和decodeURIComponent`

`encodeURI`用于转码整个 URL，它会将**除了元字符和语义字符之外**的字符，都进行转义。

`encodeURIComponent`用于转码 URL 的**组成部分**， 会转义**除了语义字符之外**的所有字符。



使用场景：

通常情况下，使用`encodeURI`进行转码可及，如果请求参数中需要包含元字符信息，则单独用`encodeURIComponent`进行编码。

```
'https://www.baidu.com/s?ie=UTF-8&wd=中国&callback=http://www.test.com/';

# encodeURI
'https://www.baidu.com/s?ie=UTF-8&wd=%E4%B8%AD%E5%9B%BD&callback=http://www.test.com/'

# encodeURIComponent
'https%3A%2F%2Fwww.baidu.com%2Fs%3Fie%3DUTF-8%26wd%3D%E4%B8%AD%E5%9B%BD%26callback%3Dhttp%3A%2F%2Fwww.test.com%2F'
```

