---
title: JS-拖拽API
date: 2023-11-03
categories:
- 前端基础
tags:
- js
---

```html
<div data-drop="move" class="area">
    <div draggable="true" class="box"></div>
</div>
```

```js
// 拖拽开始事件触发， 事件源为拖拽元素
let source;
area.addEventListener("dragstart", function (e) {
    // 指示 拖拽的指针效果
    e.dataTransfer.effectAllowed = 'move';
    // 将拖拽元素保存副本，供后续使用
    source = e.target;
})
```


```js
// 推拽到哪个元素之上，将触发该事件， 持续触发
area.addEventListener("dragover", function (e) {
    // 浏览器默认是不允许其他元素拖拽到当前元素之前，因此在移动到某个元素之上时需要触发默认行为
    e.preventDefault()
})
```


```js
// 拖拽到元素上触发， 只触发一次
area.addEventListener("dragenter", function (e) {
    let dropNode = e.target;
    if (dropNode.dataset.drop === e.dataTransfer.effectAllowed) {
        dropNode.classList.add('drop-over')
    }
})
```


```js
// 拖拽放手，事件源为放手的元素
area.addEventListener("drop", function (e) {
    let dropNode = e.target;

    if (dropNode.dataset.drop === e.dataTransfer.effectAllowed) {
        const cloned = source.cloneNode(true)
        dropNode.innerHTML = ''
        dropNode.appendChild(cloned)
    }
})
```