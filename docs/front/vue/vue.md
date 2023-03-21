---
title: vue基础
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
