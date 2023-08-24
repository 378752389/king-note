---
title: Blob使用
date: 2023-08-24
categories:
  - 前端基础
tags:
  - js
---

## ArrayBuffer对象

定义：表示一段二进制数据，用来模拟内存里面的数据。通过这个对象，JavaScript 可以读写二进制数据。

```js
// 浏览器原生提供ArrayBuffer()构造函数，用来生成实例。它接受一个整数作为参数，表示这段二进制数据占用多少个字节。
var buffer = new ArrayBuffer(8);

// 获取当前实例占用的内存长度（单位字节）
buffer.byteLength

// ArrayBuffer 对象有实例方法slice()，用来复制一部分内存。它接受两个整数参数，分别表示复制的开始位置（从0开始）和结束位置（复制时不包括结束位置），如果省略第二个参数，则表示一直复制到结束。
var buffer_copy = buffer.slice(0);
```


## Blob对象

定义：表示一个二进制文件的数据内容，比如一个图片文件的内容就可以通过 Blob 对象读写。它通常用来读写文件，它的名字是 Binary Large Object （二进制大型对象）的缩写。

:::tip
Blob 与 ArrayBuffer 的区别在于，它用于操作二进制文件，而 ArrayBuffer 用于操作内存。
:::

Blob 表示的不一定是 JavaScript 原生格式的数据。File 接口基于 Blob，继承了 blob 的功能并将其扩展以支持用户系统上的文件。

blob构造函数：Blob构造函数接受两个参数：
* 第一个参数是数组，成员是字符串或二进制对象，表示新生成的Blob实例对象的内容；
* 第二个参数是可选的，是一个配置对象，目前只有一个属性type，它的值是一个字符串，表示数据的 MIME 类型，默认是空字符串。


blob保存文本数据
```js
var htmlFragment = ['<a id="a"><b id="b">hey!</b></a>'];
var blob = new Blob(htmlFragment, {type : 'text/html'});
```

blob保存json数据
```js
var obj = { hello: 'world' };
var blob = new Blob([ JSON.stringify(obj) ], {type : 'application/json'});
```



### 属性

| 属性名 | 属性值           |
| ------ | ---------------- |
| size   | 获取blob数据大小 |
| type   | 获取数据的类型   |



### 方法

* blob.slice(start, end, contentType)
  * 作用：用来拷贝原来的数据;
  * 参数签名： slice方法有三个参数，都是可选的。它们依次是起始的字节位置（默认为0）、结束的字节位置（默认为size属性的值，该位置本身将不包含在拷贝的数据之中）、新实例的数据类型（默认为空字符串）。
  
* blob.stream()
  
  * 作用：返回一个能读取 Blob 内容的 ReadableStream。
  
* blob.arrayBuffer()
  * 作用：返回一个 `promise`，其会兑现一个包含 Blob 所有内容的二进制格式的 ArrayBuffer。
  
* blob.text()
  * 作用：返回一个 `promise`，其会兑现一个包含 Blob 所有内容的 UTF-8 格式的字符串。
  
  



### 从blob中读取数据

* FileReader读取Blob的内容
```js
const reader = new FileReader();
reader.addEventListener("loadend", () => {
  // reader.result 包含被转化为类型化数组的 blob 中的内容
  console.log(reader.result)
});
reader.readAsArrayBuffer(blob);
```
* Response对象读取Blob的内容
```js
const text = await new Response(blob).text();
```
* blob自身的实例方法读取内容
```js
const text = await blob.text();
```



## File对象



定义： `File` 对象是特殊类型的 `Blob`，且可以用在任意的 Blob 类型的 context 中。



### 属性

| 属性名           | 解释                                                         |
| ---------------- | ------------------------------------------------------------ |
| lastModified     | 返回当前 `File` 对象所引用文件最后修改时间戳（ms级别）       |
| lastModifiedDate | 返回当前 `File` 对象所引用文件最后修改时间的 [`Date`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date) 对象。 |
| name             | 返回当前 `File` 对象所引用文件的名字。                       |
| size             | 返回文件的大小。                                             |
| type             | 返回文件的 MIME Type                                         |



