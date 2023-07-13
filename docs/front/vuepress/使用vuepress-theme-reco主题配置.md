---
title: 【vuepress基础】 使用vuepress-theme-reco主题配置
date: 2023-07-13
categories:
  - Vue
tags:
  - vuepress
---

一个 VuePress 网站必要的配置文件是 .vuepress/config.js，它应该导出一个 JavaScript 对象

<!-- more -->

## 主题引入

```js
module.exports = {
    theme: 'reco',
    themeConfig: {
        // 文章作者信息配置
        author: 'wenking',
        // 主题类型
        type: 'blog',
        // 显示文章最后更新时间
        lastUpdated: '更新时间', // string | boolean
        // 其他: navConf,
        nav: navbarConf,
        // 只有文章标题
        sidebar: sidebarConf,
        // 文章开启子菜单配置
        subSidebar: 'auto',
    }
}
```

在`docs`目录下新建一个`README.md`文件
```markdown
---
home: true
title: 我的博客
description: 这是一个blog测试网站
---
```

效果：

![映入vuepress-theme-reco主题页](https://raw.githubusercontent.com/378752389/image-bed/main/king-note/%E5%BC%95%E5%85%A5vuepress-theme-reco%E4%B8%BB%E9%A2%98%E6%95%88%E6%9E%9C.png)


## Front Matter

完整的样式如下：

```shell
---
title: 第一篇文章
date: '2023-07-13 08:00:00'
categories:
 - 烹饪
 - 爱好
tags:
 - 烤
 - 鸭子
keys:
 - '32位的 md5 加密密文'
publish: false
---
```


## 博客文章摘要

```shell
一个 VuePress 网站必要的配置文件是 .vuepress/config.js，它应该导出一个 JavaScript 对象

\<!-- more --\>
```

效果：

![vuepress-theme-reco博客文章项](https://raw.githubusercontent.com/378752389/image-bed/main/king-note/vuepress-theme-reco%E5%8D%9A%E5%AE%A2%E6%96%87%E7%AB%A0%E9%A1%B9.png)



## 导航栏


```js
module.exports = {
    nav: [{
        text: 'Linux',
        link: "http://www.baidu.com"
    }],
}
```



## 侧边栏

当前项目中包含的`md文件`目录结构如下：

![项目目录结构](https://raw.githubusercontent.com/378752389/image-bed/main/king-note/vuepress%E4%BE%A7%E8%BE%B9%E6%A0%8F%E7%9B%AE%E5%BD%95%E7%BB%93%E6%9E%84.png)


* 全局侧边栏配置：

```js
module.exports = {
    theme: 'reco',
    themeConfig: {
        // 博客配置
        type: 'blog',
        sidebar: [
            {
                title: '前端',   // 必要的
                path: '/blog/vue/父子组件传参',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                // collapsable: false, // 可选的, 默认值是 true,
                sidebarDepth: 2,    // 可选的, 默认值是 1
                children: [
                    '/',
                    '/blog/vue/前端跨域问题'
                ]
            },
            {
                title: '后端',   // 必要的
                // path: '/blog/dubbo/dubbo基础',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                // collapsable: false, // 可选的, 默认值是 true,
                sidebarDepth: 1,    // 可选的, 默认值是 1
                children: [
                    {
                        title: "dubbo",
                        children: [
                            '/blog/dubbo/dubbo基础'
                        ]
                    }
                ]
            }
        ],
    }
}
```

全局侧边栏效果如下：

![vuepress侧边栏全局目录](https://raw.githubusercontent.com/378752389/image-bed/main/king-note/vuepress%E4%BE%A7%E8%BE%B9%E6%A0%8F%E5%85%A8%E5%B1%80%E7%9B%AE%E5%BD%95.png)


* 分组侧边栏配置

```js
module.exports = {
    theme: 'reco',
    themeConfig: {
        // 博客配置
        type: 'blog',
        sidebar: {
            "/blog/dubbo/": [
                "dubbo基础"
            ],
            "/blog/vue/": [
                {
                    title: "vue",
                    children: [
                        "前端跨域问题",
                        "父子组件传参",
                        "定制样式",
                    ]
                }
            ]
        },
    }
}
```

分组侧边栏效果如下：

![分组侧边栏1](https://raw.githubusercontent.com/378752389/image-bed/main/king-note/vuepress%E4%BE%A7%E8%BE%B9%E6%A0%8F%E5%88%86%E7%BB%84%E7%9B%AE%E5%BD%951.png)

![分组侧边栏2](https://raw.githubusercontent.com/378752389/image-bed/main/king-note/vuepress%E4%BE%A7%E8%BE%B9%E6%A0%8F%E5%88%86%E7%BB%84%E7%9B%AE%E5%BD%952.png)