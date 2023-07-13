---
title: 【css3】z-index和层叠上下文
date: 2023-07-10
categories:
  - 前端基础
tags:
  - css3
---

## z-index

没有使用`z-index`，元素的层叠关系由2个因素决定：

* 元素的`position`是否为`static`（默认，即没有设置定位），如果是则元素称为`non-positioned`，反之，其他情况下则为`positioned`；`positioned`会覆盖`non-positioned`；浮动元素也会覆盖`non-positioned`元素；但会被`positioned`覆盖；
* 元素的出场顺序，同类型元素遵循后来者居上；



**以下几种元素可以产生层叠上下文，且z-index的值才有效**：

- 元素的 position 值为 absolute 或 relative， 且 z-index 值不为 auto （默认值）.

- 元素的 position 值为 fixed 或 sticky

- 元素是 flexbox 容器的子元素， 且 z-index 值不为 auto （默认值）

- 元素是 grid 容器的子元素, 且 z-index 值不为 auto （默认值）

- 元素有 opacity 值且值小于 1.

- 元素有以下任意一项的值，且值不为 none :

- - transform
- filter
- perspective
- clip-path
- mask / mask-image / mask-border

- 元素有 isolation 值且值为 isolate.

- 元素有 mix-blend-mode 值且值不为 normal.

- 元素有 -webkit-overflow-scrolling 值且值为 touch.

- 还有少数几种冷门的情况



**层叠上下文是可以嵌套的，并且子层叠上下文被限制在了父层叠上下文中，无论子层叠上下文z-index值有多大，都无法突破父层叠上下文的高度**
