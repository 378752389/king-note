---
title: 描边动画
date: 2024-04-09
categories:
  - 前端
tags:
  - 样式效果
---

## 效果

<Show-SvgStrokeAnimation />


## 代码

### html

```html
<div>
    <svg class="svg-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
         stroke="#000000"
         stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <g class="path" fill="none" fill-rule="evenodd">
            <path class="path" d="M18 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8c0-1.1.9-2 2-2h5M15 3h6v6M10 14L20.2 3.8"/>
        </g>
    </svg>

    <button id="rp-btn">重新播放</button>
</div>
```
### css

```stylus
.svg-icon
  width: 24px;
  height: 24px;
  fill: none;
  stroke: #000000;
  stroke-width: 2;

  .path
    --l: 0;
    // 将描边进行切割，实线和空白各占一半，每个切割段长度为指定值
    stroke-dasharray: calc(var(--l) * 1px);
    // 将描边进行便宜，正数向右便宜，负数向左便宜，此处目的是让描边一开始就显示空白，然后慢慢显示实线
    stroke-dashoffset: calc(var(--l) * 1px);

.stroke-animation
  animation: stroke 2s forwards;

@keyframes stroke
  0%
    stroke-dashoffset: calc(var(--l) * 1px);
  100%
    stroke-dashoffset: 0;
```


### js

```js
init()
replay()

document.addEventListener('#rp-btn', (e) => {
    replay()
})


const init = () => {
    const svgEl = document.querySelector('.svg-icon')
    traver(svgEl)

    function traver(dom) {
        if (dom.children.length === 0) {
            return;
        }

        for (let i = 0; i < dom.children.length; i++) {
            let el = dom.children[i];
            if (el.tagName === 'g') {
                traver(el)
            } else {
                el.style.setProperty('--l', el.getTotalLength())
            }
        }
    }
}
const replay = () => {
    const svgEl = document.querySelector('.svg-icon');
    traver(svgEl)

    function traver(dom) {
        if (dom.children.length === 0) {
            return;
        }

        for (let i = 0; i < dom.children.length; i++) {
            let el = dom.children[i];
            if (el.tagName === 'g') {
                traver(el)
            } else {
                console.log(111)
                el.classList.remove('stroke-animation');
                // 重新播放动画，先移除样式，然后在下一帧动画播放时在加入样式
                requestAnimationFrame(() => {
                    el.classList.add('stroke-animation')
                })
            }
        }
    }
}
```