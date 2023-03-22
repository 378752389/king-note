---
title: vue基础
permalink: /front/vue
---


## 前端模块化

import 属于 ES6 规范，是在编译过程中加载（代码执行前执行），代码编写时， import 代码必须放在顶部


导出方式：
```js
// 方式一
export { xxx };

// 方式二 
export default xxx;
```


导入方式：
```js
// 方式一
import {a as A} from 'xxx' // √ 支持

// 方式二  
import * as obj from 'xxx' // √ 将模块中所有的 export 和 export default的属性一起导出为一个新对象

// 方式三
import xxx from 'xxx'
```




require 属于 commonJS 规范，是运行时调用（动态执行），性能上比 import 差点，但模块没有那么复杂，**导入时是什么样子，导出就是什么样子**



导出方式：
```js
// 方式一
exports.xxx = xxx;

// 方式二
module.exports = xxx;
```

导入方式：
```js
// 方式一和方式二
const xxx = require('xxx')
console.log(xxx.name);
xxx.test();
```

::: tip
exports.xxx 和 module.exports 一起使用时， exports.xxx会失效
:::


## vue3项目安装

```shell
npm install vue-cli -g
vue create app
```





## 时间格式化

`npm install moment`

```javascript
import moment from 'moment'

moment().format("YYYY-MM-DD HH:mm:ss")    // 2022-09-08 16:31:37
moment().month() + 1 // 当前月份
```


## axios

#### 简单使用

```javascript
import axios from 'axios'

//----------------------------------简单请求----------------------------------------------------
axios.get('http://XXX.xxx.xxx.xxx:8000/home').then((res) => {
  console.log(res.data)
})

//----------------------------------聚合请求----------------------------------------------------
axios.all([
  axios.get('http://httpbin.org/get').then((res) => {
    console.log(res.data)
  }),
  axios.post('http://httpbin.org/post').then((res) => {
    console.log(res.data)
  })
])

//----------------------------------拦截器-----------------------------------------------------
axios.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return error
  }
)
axios.interceptors.response.use(
  (res) => {
    console.log(res.data)
  },
  (error) => {
    return error
  }
)

```



### 项目集成

```js
import axios from 'axios'


// 异常拦截处理器
const errorHandler = (error) => {
  if (error.response) {
    const data = error.response.data
    // 从 localstorage 获取 token
    const token = storage.get(ACCESS_TOKEN)
    if (error.response.status === 403) {
      notification.error({
        message: 'Forbidden',
        description: data.message
      })
    }
    if (error.response.status === 401 && !(data.result && data.result.isLogin)) {
      notification.error({
        message: 'Unauthorized',
        description: 'Authorization verification failed'
      })
      if (token) {
        store.dispatch('Logout').then(() => {
          setTimeout(() => {
            window.location.reload()
          }, 1500)
        })
      }
    }
  }
  return Promise.reject(error)
}

// 创建 axios 实例
const request = axios.create({
  // API 请求的默认前缀
  baseURL: process.env.VUE_APP_API_BASE_URL,
  timeout: 6000 // 请求超时时间
})

// request interceptor
request.interceptors.request.use(config => {
  const token = storage.get(ACCESS_TOKEN)
  // 如果 token 存在
  // 让每个请求携带自定义 token 请根据实际情况自行修改
  if (token) {
    config.headers[ACCESS_TOKEN] = token
  }
  return config
}, errorHandler)

// response interceptor
request.interceptors.response.use((response) => {
  return response.data
}, errorHandler)
```











## 代码高亮

```shell
npm install --save highlight.js
npm install --save @highlightjs/vue-plugin

#------ main.js ---------
import 'highlight.js/styles/atom-one-dark.css'
import 'highlight.js/lib/common'
import hljsVuePlugin from '@highlightjs/vue-plugin'

app.use(hljsVuePlugin)



#-----use -------
<highlightjs autodetect code="var x = 10" />
```





## 打印数据代理中的数据

```js
  // 导入toRaw函数
  import { toRaw } from '@vue/reactivity';
 
  // 该函数返回转换后的对象
  const crystal = toRaw(menu);
  // 输出可以看到已经不是proxy对象了
  console.log(crystal);
```



## vue-router

```js
// route 相关路由
{
    path: '/about/wk-:name',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
}

// 获取 路由中路径的参数    /about/qwe      name: qwe
console.log(this.$route.params.name)
// 获取 url中查询参数      /about?name=qwe  name:qwe
console.log(this.$route.query)
// 解析route路径    /about/wk-nb-plus
console.log(this.$router.resolve({name: "about", params: {name: "nb-plus"}}).href)

// 声明跳转
<router-link :to="...">
    
// 代码跳转
router.push({ path: '/users/eduardo' })
router.push({ name: 'user', params: { username: 'eduardo' } })


// 监听路由的改变
created() {
    this.$watch(
      () => this.$route.params,
      (toParams, previousParams) => {
        // 对路由变化做出响应...
      }
    )
}

```



## 自定义 权限认证 指令

```js
//----------------------------------------------- main.js 中全局安装插件 --------------------------------------------------------------
app.use(auth)

//----------------------------------------------- 定义指令安装插件 --------------------------------------------------------------------
const roles = [
  {
    name: "admin",
    permissions: [
      {
        name: "system-user:add",
      },
      {
        name: "system-user:delete",
      },
      {
        name: "system-config:edit",
      },
      {
        name: "system-config:delete",
      },
    ],
  },
];

export default {
  install(Vue) {
    Vue.directive("auth", (el, binding, vnode) => {
      // [permission, action] = binding.value && binding.value.split(':') || [null, null]
      const permission = binding.value;

      let hasPermission = false;

      for (let role of roles) {
        const res = role.permissions.find((pms) => {
          return pms.name == permission;
        });

        if (res) {
          hasPermission = true;
          break;
        }
      }

      if (!hasPermission) {
        
        // 实现 v-if 效果， 让该元素消失
        const comment = document.createComment(' ');
        Object.defineProperty(comment, 'setAttribute', {
          value: () => undefined,
        });
        vnode.elm = comment;
        vnode.text = ' ';
        vnode.isComment = true;
        vnode.context = undefined;
        vnode.tag = undefined;
        vnode.directive = undefined;

        if (vnode.componentInstance) {
          vnode.componentInstance.$el = comment;
        }

        if (el.parentNode) {
          el.parentNode.replaceChild(comment, el);
        }
      }
    });
  },
};

```



## Transition

```html
<Transition name='asd'>
</Transition>


<script>
	
</script>

<style>
    .asd-enter-from,
    .asd-enter-to,
    .asd-enter-active,
    .asd-leave-from,
    .asd-leave-to,
    .asd-leave-active {
        
    }
</style>
```





## 环境变量

```shell
# vue 中有个概念就是模式，默认先vue cli 有三个模式

# development 模式用于 vue-cli-service serve   => npm run serve
# production 模式用于 vue-cli-service build => npm run build  和 vue-cli-service test:e2e 
# test 模式用于 vue-cli-service test:unit 

# 我们可以自定义一个环境变量文件 .env.local, 在里面写入如下内容
NODE_ENV=local

# 然后 修改 package.json 文件 "scripts" 里的内容，添加
"local": "vue-cli-service serve --mode local"

# 然后我们运行 npm run local 的时候 就会采用 .env.local 里面设置的环境变量的值


```





