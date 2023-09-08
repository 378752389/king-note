---
title: fetch使用
date: 2023-09-08
sidebar: false
categories:
  - 前端基础
tags:
  - js
---

## 属性

* readyState (ro): 返回 一个无符号短整型（`unsigned short`）数字，代表请求的状态码。

| Value | State              | Description                      |
|-------|--------------------|----------------------------------|
| `0`   | `UNSENT`           | XMLHttpRequest对象被创建，还没调用`open()` |
| `1`   | `OPENED`           | `open()` 被调用                     |
| `2`   | `HEADERS_RECEIVED` | `send()` 被调用，并且已经收到响应头信息         |
| `3`   | `LOADING`          | 正在获取数据，responseText可以拿到部分数据      |
| `4`   | `DONE`             | 操作完成                             |

* response：一个对象，其类型取决于 `responseType` 的值。 `responseType` 可被设置在open和send方法调用之间；
* responseText：返回响应的文本内容
* responseType：可设置响应类型;
    * arraybuffer
    * blob
    * document
    * json
    * text
* responseURL：没有锚点、如果有重定向，则为最后一个重定向的URL。
* timeout：设置请求的超时时间，从`send()`调用开始起算
* withCredentials：是否该使用类似 cookie、Authorization 标头或者 TLS 客户端证书等凭据进行跨站点访问控制（`Acess-Control`
  ）请求。
* upload: 返回一个 XMLHttpRequestUpload (en-US)对象, 对象是不透明的，但可以绑定事件追踪上传进度

```js
const xhr = new XMLHttpRequest();
xhr.open("GET", "/login");
xhr.upload.onprogress = (e) => {
    e = e || event;
    if (e.lengthComputable) {
        result.innerHTML = "Received " + e.loaded + " of " + e.total + " bytes";
    }
}
xhr.send();
```

## 方法

* abort：终止请求
* getAllResponseHeaders：获取所有的响应头；返回的是一个原始的headers字符串，需要手动分割；
* getResponseHeader(k)：获取某一个响应头；
* open(method, url, async=true, user, password)：user和password用于basic认证
* setRequestHeader(k, v)：设置请求头
* send(body)：方法用于发送 HTTP 请求；body的取值可以为如下内容：
    * blob
    * FormData
    * URLSearchParams

## 事件

* abort：请求终止时触发
* error：请求错误时触发
* load：请求完成时触发
* loadend：请求停止后触发（可能是abort、error、load等）
* loadstart：请求开始时触发
* progress：收到数据后周期性触发
* timeout：超时后触发
* readystatechange：readystate改变时触发

```js
const xhr = new XMLHttpRequest();
xhr.open("GET", "/login");
xhr.send();

// 事件监听第一种写法
xhr.onreadystatechange = () => {
    if (xhr.readystate === 4) {
    ...
    }
}

// 事件监听第二种写法
xhr.addEventListener("readystatechange", () => {
    if (xhr.readystate === 4) {
    ...
    }
})
```

## 案例

* 利用 XMLHttpRequest来实现文件上传进度显示,和终止文件上传功能

```html

<body>
<h1></h1>
<input id="file" type="file" multiple/>

<button id="abort">终止上传</button>
</body>

<script>

    const file = document.querySelector("#file");
    const h1 = document.querySelector("h1");
    const xhr = new XMLHttpRequest();
    file.addEventListener("change", function (e) {
        xhr.open("POST", "http://localhost:8080/file/upload")
        xhr.responseType = 'json'

        let files = e.target.files;
        // xhr.setRequestHeader("Content-Type", "form-data/multipart")
        let formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append("files", files[i]);
        }

        // 监听文件上传进度事件
        xhr.upload.onprogress = function (e) {
            h1.innerText = `上传进度： ${(e.loaded / e.total * 100).toFixed(3)} %`;
        }

        // 监听请求执行完成事件
        xhr.upload.addEventListener("load", function (e) {
            console.log("上传数据完成")
        })

        // 监听请求状态改变事件
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                console.log(xhr.response)
            }
        }

        // 监听请求终止事件
        xhr.addEventListener("abort", function () {
            h1.innerText = "上传已终止！";
        })

        // 发送请求
        xhr.send(formData)


    })

    // 终止文件上传请求
    document.querySelector("#abort").addEventListener("click", function () {
        xhr.abort();
    })

</script>
```