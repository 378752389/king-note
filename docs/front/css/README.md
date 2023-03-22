---
title: 笔记
---


## flex布局

flex父元素称为容器(container)， 子元素称为项目(item)

容器有 水平的主轴(main)，垂直的交叉轴(cross)

main start/end: 主轴的开始位置与边框的交叉点， main size： 主轴占用的空间

cross start/end: 交叉轴的开始位置与边框的交叉点， cross size： 交叉轴占用的空间



```
.parent {
    display: flex;
    /* 主轴的方向 */
    flex-direction: row | row-reverse | column | column-reverse; 
    /* 主轴元素满时进行溢出处理 */
    flex-wrap: nowrap | wrap | wrap-reverse;
    /* 项目在主轴的对齐方式 左、右、中、两端对齐、间隔相等 */
    justify-content: flex-start | flex-end | center | space-between | space-around;
    /* 项目在交叉轴的对齐方式 垂直 上、下、中、文字基线、拉升*/
    align-items: flex-start | flex-end | center | baseline | stretch;    /*baseline: 项目的第一行文字的基线对齐。*/
    /* 如果项目有多个主轴， 多个主轴的对齐方式 */
    align-content: flex-start | flex-end | center | space-between | space-around | stretch;
    
    /* flex-direction +  flex-wrap */
    flex-flow: row nowrap;
}



.children {
    /* 定义项目的排序顺序， 数值越小排序越靠前 */
    order: 1;
    /* 定义项目的放大比例， 默认0， 如果为1，则所有项目等比大小 */
    flex-grow: 0;
    /* 如果所有项目的flex-shrink属性都为1，当空间不足时，都将等比例缩小。如果一个项目的flex-shrink属性为0，其他项目都为1，则空间不足时，前者不缩小。*/
    flex-shrink: 1;
    /* 定义单个项目的对齐方式， 默认继承父容器 可以覆盖 父项目  align-items */
    align-self: auto | flex-start | flex-end | center | baseline | stretch;
    
    /* flex-grow, flex-shrink 和 flex-basis */
    flex: 1 1 auto;
}
```

## css attribute

### transition

```css
// 定义过度属性
transition-property
// 定义过度持续时间
transition-duration
// 定义过度函数
transition-timing-function: linear | ease | ease-in | ease-out | ease-in-out
// 定义过度延迟
transition-delay

transition: property duration timing-function delay;

transition: all 0.5s ease;
```



### animation

```css
.bounce-enter-active {
  animation: bounce-in 0.5s;
}

.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}

定义动画帧
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}



animation: name duration timing-function delay iteration-count direction fill-mode play-state;

animation: div-move 2s linear infinite  forwards;

// forwards 保留最后一帧的状态

// 暂停动画播放
animation-play-state: paused;
```



### transform

```
matrix(n,n,n,n,n,n)

translate(x,y) 
translateX(x)
translateY(y)

scale(x,y)
scaleX(x)
scaleY(y)

rotate(angle)
rotateX(angle)
rotateY(angle)

skew(x-angle,y-angle)
skewX(angle)
skewY(angle)

// 设置盒子的中心点
transform-origin:  50px 50px; 
```

