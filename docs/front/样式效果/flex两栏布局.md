---
title: flex两栏布局
date: 2023-09-19
categories:
  - 前端
tags:
  - 样式效果
---


## 重点

我们在写后台管理页面时，在进行页面布局的时候，通常使用的都是两栏布局。常规的两栏布局正常来说没有问题，但是遇到侧边栏需要伸缩的时候，需要编写js代码
来进行主体栏宽度控制。使用flex布局的优点是侧边栏伸缩不需要编写js代码来控制主体宽度。

:::tip

* 给整个最外层的盒子设置高度 100vh 和宽度 100vw
* 如果给flex项目设置了宽度或高度后，让其他元素撑开宽度或高度，必须给flex项目同时设置 flex-shrink 属性为 0， 否则项目会进行伸缩
* 给项目设置 align-self: stretch 或者 flex-grow: 1，都可以达到让盒子撑满剩余高度或宽度

:::

## 代码

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        .app-container {
            width: 100vw;
            height: 100vh;
            display: flex;
        }

        .content-wrapper {
            /*如果不设置该属性，可能导致设置了宽度的子元素坍缩*/
            flex-grow: 1;
            display: flex;
            flex-direction: column;
        }

        .sidebar {
            width: 300px;
            height: 100%;
            background-color: #ad4e24;
            transition: 0.5s;
            flex-shrink: 0;
        }

        .header {
            height: 60px;
            background-color: red;
            flex-shrink: 0;
        }

        .content {
            background-color: green;
            overflow: auto;
            flex-grow: 1;
        }
        
    </style>
</head>

<body>
<div class="app-container">
    <div class="sidebar"></div>
    <div class="content-wrapper">
        <div class="header">
            <button id="btn">collapse</button>
        </div>
        <div class="content">
            <!--            内容编写-->
        </div>
    </div>
</div>
</body>

<script>
    // 获取侧边栏元素
    const sidebar = document.querySelector(".sidebar");
    // 获取伸缩侧边栏按钮
    const btn = document.querySelector("#btn");

    // 控制侧边栏伸缩状态按钮
    let collapse = true;
    // 注册按钮点击事件
    btn.addEventListener("click", function () {
        sidebar.style.width = collapse ? '50px' : '300px';
        collapse = !collapse;
    })
</script>
</html>
```