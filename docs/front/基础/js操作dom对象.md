---
title: JS-操作dom对象
date: 2023-08-11
categories:
  - 前端基础
tags:
  - js
---

## 获取dom对象

* 根据css选择器获取dom元素

```js
// 获取匹配的第一个元素
const box = document.querySelector('css选择器');

// 获取匹配的所有元素
const boxs = document.querySelectorAll('css selector');
```

> querySelector得到的是一个伪数组
>
> * 有长度和索引号，可以通过索引获取
> * 没有push和pop方法

* 其他获取dom元素方式

```js
document.getElementById('nav')

document.getElementByTagName('nav')

document.getElementByClassName('nav')
```



## 操作dom对象内容

* 对象.innerText属性

```js
// 修改元素盒子内容
box.innerText = "新文字";
```

* 对象.innerHTML属性

```js
box.innerHTML = "<strong>新文字</strong>"
```



区别：`innerText`显示纯文本，不解析标签，` innerHTML`会解析标签



## 操作dom对象属性

```js
const img = document.querySelector('img');
img.src = './images/1.png';
```



## 操作dom对象样式属性

* 通过style修改属性样式

```js
const img = document.querySelector('img');
// 格式： 对象.style.样式属性 （多组单词采用小驼峰命名法）
img.style.width = '300px';
```

* className关键字，给元素添加类名，会覆盖旧值

```java
const box = document.querySelector('box');
box.className = 'active';

// 如果要保存旧值，则需要拷贝然后重新赋值
box.className = '旧值 active';
```

* classList

```js
const box = document.querySelector('box');
// 添加类名
box.classList.add('类名');
// 删除类名
box.classList.remove('类名');
// 切换类名： 有指定类名就删除， 没有指定类名就加上
box.classList.toggle('类名');
```



## 操作表单属性

* 获取表单元素值：value属性

```js
const input = document.querySelector('input');
input.value = 'qwe';
```

* 修改表单类型：type属性

```js
const input = document.querySelector('input');
input.type = 'password';
```

* 表单显示相关属性，一律使用 bolean

```js
// disabled, checked, selected
const input = document.querySelector('input');
input.checked = false;
```



## 自定义属性

标准属性：标签天生自带的属性，class、id、title等

自定义属性：

1. 在标签上一律以 `data- `开头
2. 在dom对象上一律以`dataset`对象方式获取



```html
<ul>
    <li data-id="1"></li>
    <li data-id="2"></li>
    <li data-id="3"></li>
</ul>

<script>
	const lis = document.querySelectorAll('li');
	for(let i=0; i< lis.length; i++) {
        console.log(lis[i].dataset.id)
    }
</script>
```



## 定时器-间歇函数

* 开启定时器

```js
// 开启定时器，  开启格式： setInterval(函数，间隔时间)
let n = setInterval(() => {
    console.log("hello");
}, 1000);

// 关闭定时器
clearInterval(n);
```



定时器使用实例：阅读用户协议

```js
let i = 5;
let n = setInterval(function () {
    i--;
    btn.innerHTML = `我以及阅读用户协议(${i})`;
    if (i == 0) {
        btn.disabled = false;
        clearInterval(n);
    }
}, 1000)
```

