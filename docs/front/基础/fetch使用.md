---
title: JS-fetch使用
date: 2023-08-23
sidebar: false
categories:
- 前端基础
tags:
- js
---



## 初次使用

```js
async function getJSON() {
  let url = 'https://www.baidu.com';
  try {
    let response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.log('Request Failed', error);
  }
}
```



:::tip

1. `fetch()`接收到的`response`是一个 [Stream 对象](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API)
2. `response.json()`是一个异步操作，取出所有内容，并将其转为 JSON 对象。

:::



## 定制请求

`fetch()`的第一个参数是 URL，还可以接受第二个参数，作为配置对象，定制发出的 HTTP 请求。

```js
const response = await fetch(url, {
  method: 'POST',
  headers: {
    "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
  },
  body: 'foo=bar&lorem=ipsum',
});

const json = await response.json();
```

:::tip

注意，有些标头不能通过`headers`属性设置，比如`Content-Length`、`Cookie`、`Host`等等。它们是由浏览器自动生成，无法修改。

:::



fetch所有参数

```js
const response = fetch(url, {
  method: "GET",
  headers: {
    "Content-Type": "text/plain;charset=UTF-8"
  },
  body: undefined,
  referrer: "about:client",
  referrerPolicy: "no-referrer-when-downgrade",
  mode: "cors", 
  credentials: "same-origin",
  cache: "default",
  redirect: "follow",
  integrity: "",
  keepalive: false,
  signal: undefined
});
```



### cache

- `default`：默认值，先在缓存里面寻找匹配的请求。
- `no-store`：直接请求远程服务器，并且不更新缓存。
- `reload`：直接请求远程服务器，并且更新缓存。
- `no-cache`：将服务器资源跟本地缓存进行比较，有新的版本才使用服务器资源，否则使用缓存。
- `force-cache`：缓存优先，只有不存在缓存的情况下，才请求远程服务器。
- `only-if-cached`：只检查缓存，如果缓存里面不存在，将返回504错误。



### mode

- `cors`：默认值，允许跨域请求。
- `same-origin`：只允许同源请求。
- `no-cors`：请求方法只限于 GET、POST 和 HEAD，并且只能使用有限的几个简单标头，不能添加跨域的复杂标头，相当于提交表单所能发出的请求。



### credentials

- `same-origin`：默认值，同源请求时发送 Cookie，跨域请求时不发送。
- `include`：不管同源请求，还是跨域请求，一律发送 Cookie。
- `omit`：一律不发送。



```js
fetch('http://another.com', {
  credentials: "include"
});
```





### signal

用于取消fetch请求



### redirect

指定 HTTP 跳转的处理方法

- `follow`：默认值，`fetch()`跟随 HTTP 跳转。
- `error`：如果发生跳转，`fetch()`就报错。
- `manual`：`fetch()`不跟随 HTTP 跳转，但是`response.url`属性会指向新的 URL，`response.redirected`属性会变为`true`，由开发者自己决定后续如何处理跳转。



### keepalive

`keepalive`属性用于页面卸载时，告诉浏览器在后台保持连接，继续发送数据。

一个典型的场景就是，用户离开网页时，脚本向服务器提交一些用户行为的统计信息。这时，如果不用`keepalive`属性，数据可能无法发送，因为浏览器已经把页面卸载了。

```javascript
window.onunload = function() {
  fetch('/analytics', {
    method: 'POST',
    body: "statistics",
    keepalive: true
  });
};
```

## 常见请求方式

### 提交json数据

```js
const user =  { name:  'John', surname:  'Smith'  };
const response = await fetch('/article/fetch/post/user', {
  method: 'POST',
  headers: {
   'Content-Type': 'application/json;charset=utf-8'
  }, 
  body: JSON.stringify(user) 
});
```



### 提交表单数据

```js
const form = document.querySelector('form');

const response = await fetch('/users', {
  method: 'POST',
  body: new FormData(form)
})
```



### 文件上传

```js
const input = document.querySelector('input[type="file"]');

const data = new FormData();
data.append('file', input.files[0]);
data.append('user', 'foo');

fetch('/avatars', {
  method: 'POST',
  body: data
});
```



### 上传二进制数据

```js
let blob = await new Promise(resolve =>   
  canvasElem.toBlob(resolve,  'image/png')
);

let response = await fetch('/article/fetch/post/image', {
  method:  'POST',
  body: blob
});
```





## response对象

`fetch()`请求成功以后，得到的是一个 Response 对象， 它对应服务器的 HTTP 回应。



### 属性

* ok：true 对应http状态码（200-299），false 对应其他状态码
* status： 返回http请求状态码
* statusText： http状态码描述
* url：返回http请求的url
* type：返回http请求的类型
    * basic：普通请求（同源请求）
    * cors：跨域请求
    * error：网络错误，用于Service Worker
* redirected：表示请求是否发生了跳转



### 判断请求是否成功

`fetch()`发出请求以后，只有网络错误，或者无法连接时，`fetch()`才会报错，其他情况都不会报错，而是认为请求成功。

只有通过`Response.status`属性，得到 HTTP 回应的真实状态码，才能判断请求是否成功

```js
async function fetchText() {
  let response = await fetch('/readme.txt');
  if (response.status >= 200 && response.status < 300) {
    return await response.text();
  } else {
    throw new Error(response.statusText);
  }
}
```

:::tip

`response.status`属性只有等于 2xx （200~299），才能认定请求成功。这里不用考虑网址跳转（状态码为 3xx），因为`fetch()`会将跳转的状态码自动转为 200

:::

### 响应头

```js
const response = await fetch(url);

for (let [key, value] of response.headers) { 
  console.log(`${key} : ${value}`);  
}
```



属性：

- `Headers.get()`：根据指定的键名，返回键值。
- `Headers.has()`： 返回一个布尔值，表示是否包含某个标头。
- `Headers.keys()`：返回一个遍历器，可以依次遍历所有键名。
- `Headers.values()`：返回一个遍历器，可以依次遍历所有键值。
- `Headers.entries()`：返回一个遍历器，可以依次遍历所有键值对（`[key, value]`）。
- `Headers.forEach()`：依次遍历标头，每个标头都会执行一次参数函数。
- `Headers.set()`：将指定的键名设置为新的键值，如果该键名不存在则会添加。
- `Headers.append()`：添加标头。
- `Headers.delete()`：删除标头。



### 读取响应内容

主要有以下5个方法，这5个方法都是异步的，返回的都是Promise对象：

- `response.text()`：得到文本字符串。
- `response.json()`：得到 JSON 对象。
- `response.blob()`：得到二进制 Blob 对象。
- `response.formData()`：得到 FormData 表单对象。
- `response.arrayBuffer()`：得到二进制 ArrayBuffer 对象。





#### blob获取二进制文件

```js
const response = await fetch('flower.jpg');
const myBlob = await response.blob();
const objectURL = URL.createObjectURL(myBlob);

const myImage = document.querySelector('img');
myImage.src = objectURL;
```



#### arrayBuffer获取流媒体文件

```js
const audioCtx = new window.AudioContext();
const source = audioCtx.createBufferSource();

const response = await fetch('song.ogg');
const buffer = await response.arrayBuffer();

const decodeData = await audioCtx.decodeAudioData(buffer);
source.buffer = buffer;
source.connect(audioCtx.destination);
source.loop = true;
```


### body属性

```js
const response = await fetch('flower.jpg');
const reader = response.body.getReader();

while(true) {
  const {done, value} = await reader.read();

  if (done) {
    break;
  }

  console.log(`Received ${value.length} bytes`)
}
```

上面示例中，response.body.getReader()方法返回一个遍历器。这个遍历器的read()方法每次返回一个对象，表示本次读取的内容块。
这个对象的done属性是一个布尔值，用来判断有没有读完；value属性是一个 arrayBuffer 数组，表示内容块的内容，而value.length属性是当前块的大小。


### 重复读取响应内容

Response(Stream) 对象只能读取一次，读取完就没了。这意味着，前一节的五个读取方法，只能使用一个，否则会报错。

```js
const response1 = await fetch('flowers.jpg');
const response2 = response1.clone();

const myBlob1 = await response1.blob();
const myBlob2 = await response2.blob();

image1.src = URL.createObjectURL(myBlob1);
image2.src = URL.createObjectURL(myBlob2);
```

## 参考链接

> [Fetch API 教程](https://www.ruanyifeng.com/blog/2020/12/fetch-tutorial.html)