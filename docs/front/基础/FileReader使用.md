---
title: FileReader使用
date: 2023-08-24
categories:
- 前端基础
tags:
- js
---

定义： FileReader 对象允许 Web 应用程序异步读取存储在用户计算机上的文件（或原始数据缓冲区）的内容，使用 File 或 Blob 对象指定要读取的文件或数据。

:::tip
其中 File 对象
1. 可以是来自用户在一个`<input>`元素上选择文件后返回的FileList对象
2. 也可以来自拖放操作生成的 DataTransfer对象
3. 还可以是来自在一个HTMLCanvasElement上执行mozGetAsFile()方法后返回结果。
   :::

:::warning
FileReader只能读取远程用户文件内容，不能读取本地文件系统
:::

## 构造函数
```js
const reader = new FileReader()
```

## 属性

<p style="color: red">ro 表示只读 read only</p>

| 属性名          | 解释                                                         |
| --------------- | ------------------------------------------------------------ |
| error （ro）    | 表示在读取文件时发生的错误                                   |
| readyState (ro) | 表示`FileReader`状态的数字                                   |
| result (ro)     | 文件的内容。该属性仅在读取操作完成后才有效，数据的格式取决于使用哪个方法来启动读取操作。 |



其中readyState包括如下状态：

| 常量名    | 值   | 描述                   |
| :-------- | :--- | :--------------------- |
| `EMPTY`   | `0`  | 还没有加载任何数据。   |
| `LOADING` | `1`  | 数据正在被加载。       |
| `DONE`    | `2`  | 已完成全部的读取请求。 |



## 事件

| 事件名 | 解释                             |
| ------ | -------------------------------- |
| abort  | 该事件在读取操作被中断时触发。   |
| error  | 该事件在读取操作发生错误时触发。 |
| load   | 该事件在读取操作完成时触发。     |



使用：

```js
const reader = new FileReader();

reader.addEventListener("load", () => {
    console.log(reader.result)
})
```



## 方法

| 方法名                  | 解释                                                         |
| ----------------------- | ------------------------------------------------------------ |
| abort                   | 中止读取操作                                                 |
| readAsArrayBuffer(blob) | 开始读取指定的 `Blob`中的内容，一旦完成，result 属性中保存的将是被读取文件的 `ArrayBuffer` 数据对象。 |
| readAsDataURL(blob)     | 开始读取指定的`Blob`中的内容。一旦完成，`result`属性中将包含一个`data:` URL 格式的 Base64 字符串以表示所读取文件的内容。 |
| readAsText(blob)        | 开始读取指定的`Blob`中的内容。一旦完成，`result`属性中将包含一个字符串以表示所读取的文件内容。 |

