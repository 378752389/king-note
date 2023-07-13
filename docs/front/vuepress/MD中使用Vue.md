---
title: 【vuepress高级】 MD中使用Vue组件
date: 2023-07-13
categories:
  - Vue
tags:
  - vuepress
---

有时候，主题内容不能满足我们的需要，此时我们需要自己开发一些组件样式，vuepress提供了 自定义组件可以很好的满足这些需求

<!-- more -->

## 内置组件

* 属性：
  * text - string
  * type - string, 可选值： "tip"|"warning"|"error"，默认值是： "tip"
  * vertical - string, 可选值： "top"|"middle"，默认值是： "top"

* 使用：
    
  我们可以为文字使用 `Badget`，这个 `vuepress` 内置组件添加一些状态:

```md
### Badge <Badge text="beta" type="warning"/> <Badge text="默认主题"/>
```

* 效果：

![内置组件badget](https://raw.githubusercontent.com/378752389/image-bed/main/king-note/%E5%86%85%E7%BD%AEbadget%E7%BB%84%E4%BB%B6.png)


## 自定义页面内容和布局



:::tip
可以直接在md文件内编写vue组件内容，但是不建议这样做，不利于后期维护，建议将组件注册为全局组件。
:::


在`docs/.vuepress/components/` 下创建 `DemoList` 组件，内容如下：

```vue
<script>
export default {
  props: {
    customData: []
  },
}
</script>

<template>
  <ul>
    <li v-for="item in customData">
      {{item.name}} + " : " + {{item.age}}
    </li>
  </ul>
</template>

<style scoped>

</style>
```

`docs/.vuepress/components` 该目录中的 Vue 组件将会被自动注册为全局组件, 在编写`md`文件时，我们不需要引入组件即可使用，引入方式如下:

```markdown
---
title: 【vuepress】md中使用vue
date: 2023-07-13
categories:
  - frontEnd
tags:
  - vue
---

vuepress 定制页面样式

## 这是测试标题

这是一些测试内容 这是一些测试内容 这是一些测试内容
这是一些测试内容 这是一些测试内容 这是一些测试内容
这是一些测试内容 这是一些测试内容 这是一些测试内容

<DemoList :custom-data="customData" />

这是一些测试内容 这是一些测试内容 这是一些测试内容
这是一些测试内容 这是一些测试内容 这是一些测试内容
这是一些测试内容 这是一些测试内容 这是一些测试内容

<script>

export default {
  data() {
    return {
        customData: [
        {
          name: "king",
          age: 25
        },
        {
          name: "xiaoming",
          age: 22
        }
      ]
    }
 }
}
</script>
```


页面效果：

![自定义组件样式](https://raw.githubusercontent.com/378752389/image-bed/main/king-note/%E8%87%AA%E5%AE%9A%E4%B9%89%E7%BB%84%E4%BB%B6%E6%A0%B7%E5%BC%8F.png)
