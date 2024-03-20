---
title: CSS-flex布局
date: 2023-07-14
categories:
  - 前端基础
tags:
  - css
---

2009年，W3C 提出了一种新的方案----Flex 布局，可以简便、完整、响应式地实现各种页面布局。目前，它已经得到了所有浏览器的支持，这意味着，现在就能很安全地使用这项功能;
Flex 布局将成为未来布局的首选方案。

<!-- more -->



## 容器属性

### 1. flex-direction

决定主轴和主轴方向

```
.box {
    flex-direction: row | row-reverse | column | clumn-reverse;
}
```

```
row: 水平方向，从左到右
column: 垂直方向，从上到下
```

### 2. flex-wrap

默认情况下，项目都排在一条线（又称"轴线"）上。flex-wrap属性定义，如果一条轴线排不下，如何换行。

```
.box{
  flex-wrap: nowrap | wrap | wrap-reverse;
}
```

```
nowrap: 默认；不换行，元素过多将挤压其他元素
wrap: 换行，新行在第一行下方排序
wrap-reverse: 换行，新行在第一行上方排序
```

:::tip
flex-flow属性是flex-direction属性和flex-wrap属性的简写形式，默认值为row nowrap。
:::

### 3. justify-content

justify-content属性定义了项目在主轴上的对齐方式。

```
.box {
  justify-content: flex-start | flex-end | center | space-between | space-around;
}
```


### 4. align-items

align-items属性定义项目在交叉轴上如何对齐。

```
.box {
  align-items: flex-start | flex-end | center | baseline | stretch;
}
```


### 5. align-content

align-content属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。

```
.box {
  align-content: flex-start | flex-end | center | space-between | space-around | stretch;
}
```



## 项目属性

### 1. order

order属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。

### 2. flex-grow 属性

flex-grow属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。

### 3. flex-shrink

flex-shrink属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。flex属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。

### 4. flex-basis

flex-basis属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。

它可以设为跟width或height属性一样的值（比如350px），则项目将占据固定空间。

```
.item {
    flex-basis: <length> | auto; /* default auto */
}
```

:::tip
flex属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。
该属性有两个快捷值：auto (1 1 auto) 和 none (0 0 auto)。建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值。
:::

### 5. align-self

align-self属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。