---
title: 前端基础
permalink: /front/base
---


## html 标签



**注意点**

* html5中，如果属性名和属性值完全一样，可以简写为一个单词



### 一、图片标签

```html
<img src="" alt="" title="" width="" height="" />
```



|  属性   |    作用    |            说明            |
| :-----: | :--------: | :------------------------: |
|   alt   |  替换文本  |   图片无法显示时显示文字   |
|  title  |  提示文本  | 鼠标悬停在图片上显示的文字 |
|  width  | 图片的宽度 |     值为数字，没有单位     |
| height  | 图片的高度 |     值为数字，没有单位     |
| **src** |  图片链接  |                            |



### 二、换行和水平线标签

| 标签名 | 效果 |
| :----: | :----: |
| br | 换行 |
| hr | 水平线 |



### 三、文本格式标签

| 标签名 |  效果  |
| :----: | :----: |
| strong |  加粗  |
|   em   |  倾斜  |
|  ins   | 下划线 |
|  del   | 删除线 |



### 四、超链接标签

```html
<a href="#" target="_blank">jump</a>
```



|   属性   |     作用     | 说明                                        |
| :------: | :----------: | :------------------------------------------ |
|  target  | 页面跳转方式 | \_blank: 新窗口跳转<br />\_self: 本窗口跳转 |
| **href** |   跳转连接   |                                             |



### 五、音频标签和视频标签



```html
<audio src=""  ></audio>
```



|   属性   |       作用       | 说明                                         |
| :------: | :--------------: | :------------------------------------------- |
| **src**  |     音频链接     | 支持格式： MP3、Ogg、Wav                     |
| controls | 显示音频控制面板 |                                              |
|   loop   |     循环播放     |                                              |
| autoplay |     自动播放     | 默认浏览器一般会禁用自动播放功能（不会生效） |



```html
<video src=""></video>
```



|   属性   |       作用       | 说明                                               |
| :------: | :--------------: | :------------------------------------------------- |
| **src**  |     音频链接     | 支持格式： MP3、Ogg、Wav                           |
| controls | 显示音频控制面板 |                                                    |
|   loop   |     循环播放     |                                                    |
| autoplay |     自动播放     | 浏览器支持在静音模式下自动播放（需要  muted 属性） |
|  muted   |     静音播放     |                                                    |



### 六、列表标签

列表分类： 无序列表、有序列表、定义列表



1、无序列表

**注意点**

* ul标签里只能包含li
* li： 独占一行



```html
<ul>
    <li>第一项</li>
    <li>第二项</li>
    <li>第三项</li>
</ul>
```



2、有序列表

```html
<ol>
    <li>第一项</li>
    <li>第二项</li>
    <li>第三项</li>
</ol>
```



3、定义列表

```html
<dl>
    <dt>售后服务</dt>
    <dd>第一项</dd>
    <dd>第二项</dd>
    <dd>第三项</dd>
</dl>
```



| 标签名 |                 效果                  |
| :----: | :-----------------------------------: |
|   dl   |               定义列表                |
|   dt   |                 标题                  |
|   dd   | 描述/详情（默认与标题有一个缩进距离） |



### 七、表格标签

1、基本语法

```html
<table>
    <thead>
    	<tr>
        	<th>姓名</th>
            <th>班级</th>
            <th>成绩</th>
        </tr>
    </thead>
    
    <tbody>
    	<tr>
        	<td>张三</td>
            <td>三年一班</td>
            <td>99</td>
        </tr>
    </tbody>
    
    <tfoot>
    	<tr>
        	<td>好样的</td>
            <td>好样的</td>
            <td>好样的</td>
        </tr>
    </tfoot>
</table>
```





**注意点**

* 网页中，表格默认没有边框线，可以为`<table>`添加border属性可以为表格添加边框线



| 标签名 |          效果          |
| :----: | :--------------------: |
| table  |  表格 （border ="1"）  |
|   tr   |           行           |
|   th   |       表头单元格       |
|   td   |       内容单元格       |
| thead  | 增强语义（包裹tr标签） |
| tbody  | 增强语义（包裹td标签） |
| tfoot  |        增强语义        |



2、合并单元格

分类： 跨行合并、跨列合并 

注意点： 不能跨结构标签合并（thead、tbody、tfoot）

合并单元格步骤：

1. 保留最左最上的单元格，添加属性（取值是数字，表格需要合并单元格数量）
   * 跨行合并，保留最上单元格，添加属性 `rowspan`
   * 跨列合并，保留最左单元格，添加属性`colspan`
2. 删除其他单元格



跨行合并

```html
<table border="1">
      <thead>
        <tr>
          <th>姓名</th>
          <th>语文</th>
          <th>数学</th>
          <th>总分</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>张三</td>
          <td>89</td>
          <td rowspan="2">85</td>
          <td>174</td>
        </tr>

        <tr>
          <td>李四</td>
          <td>79</td>
          <!-- <td>75</td> -->
          <td>154</td>
        </tr>
      </tbody>
    </table>
```



跨列合并

```html
<table border="1">
      <thead>
        <tr>
          <th>姓名</th>
          <th>语文</th>
          <th>数学</th>
          <th>总分</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>张三</td>
          <td colspan="2">89</td>
          <td>85</td>
          <td>174</td>
        </tr>

        <tr>
          <td>李四</td>
          <td>79</td>
          <td>75</td> 
          <td>154</td>
        </tr>
      </tbody>
    </table>
```



### 八、表单标签

#### 1、input

**通用属性**

| 属性  |    作用    | 说明                                                         |
| :---: | :--------: | :----------------------------------------------------------- |
| type  | 输入框类型 | text：文本输入框，输入单行文本<br />password: 密码框<br />radio：单选框<br />checkbox：多选框<br />file：文件上传 |
| value |   标签值   |                                                              |



**输入框类型特有属性**

1. text、password

```html
<input type="text" placeholder="请输入用户名">
```

添加默认样式

```css
input {
    margin: 0;
    padding: 0;
    border: 0 none;
    outline-style: none;
    vertical-align: bottom; 
}
```





|    属性     |   作用   | 说明 |
| :---------: | :------: | :--- |
| placeholder | 输入提示 |      |

2. radio

```html
<input type="radio" name="gender" checked>男
<input type="radio" name="gender" >女
```



|  属性   |   作用   | 说明                       |
| :-----: | :------: | :------------------------- |
|  name   | 控件名称 | 控件分组，同组只能选中一个 |
| checked | 默认选中 |                            |

3. file

```html
<input type="file">
```



|   属性   |    作用    | 说明 |
| :------: | :--------: | :--- |
| multiple | 多文件选择 |      |



4. checkbox

```html
<input name="favor" type="checkbox" checked>
```



|  属性   |   作用   | 说明                       |
| :-----: | :------: | :------------------------- |
| checked | 默认选中 |                            |
|  name   | 控件名称 | 控件分组，同组只能选中一个 |



#### 2、下拉菜单

```html
<select>
    <option>北京</option>
    <option>上海</option>
    <option>广州</option>
    <option>深圳</option>
</select>
```



|   属性   |   作用   | 说明 |
| :------: | :------: | :--- |
| selected | 默认选中 |      |



#### 3、文本域

多行文本

```html
<textarea></textarea>
```



| 属性 | 作用 | 说明 |
| :--: | :--: | :--- |
| name |      |      |
|  id  |      |      |
| cols |      |      |
| rows |      |      |



#### 4、label标签

**增大点击范围**

写法一

* label标签只包裹内容，不包裹表单控件
* 设置label的for属性值和表单控件id属性值相同

```html
<input type="radio" id="man">
<label for="man">男</label>
```



写法二

* 使用label标签包括文字和表单控件，不需要属性

```html
<label><input type="radio">女</label>
```



#### 5、按钮

```html
<button type="">
  	按钮
</button>
```



| 属性 |        作用        | 说明                                                         |
| :--: | :----------------: | :----------------------------------------------------------- |
| type | 按钮需要被form包裹 | submit：提交按钮， 点击后可以提交表单数据到后台（默认功能）<br />reset：重置按钮，点击后将表单控件恢复默认值<br />button: 普通按钮，默认没有功能，一般和js配置使用 |



#### 6、表单



|  属性  | 作用 | 说明                 |
| :----: | :--: | :------------------- |
| action |      | 发送数据到后台的地址 |



### 九、布局标签

| 标签名 |   效果   |
| :----: | :------: |
|  div   | 独占一行 |
|  span  |  不换行  |



### 十、字符实体

| 显示结果 |  描述  | 实体名称 |
| :------: | :----: | -------- |
|          |  空格  | &nbsp；  |
|    <     | 小于号 | \&lt;    |
|    >     | 大于号 | \&gt;    |



### 十一、字体图标

展示的是图片，本质是字体

iconfont图标库：https://www.iconfont.cn/

下载字体流程：

* 登录
* 进入图标库，选择图标，加入购物车
* 将购物车里面的图标添加至项目
* 确定，下载到本地

选择所有图标库加入购物车脚本

```javascript
var span = document.querySelectorAll('.icon-cover');
for (var i = 0, len = span.length; i < len; i++) {
     console.log(span[i].querySelector('span').click());
}
```

下载之后解压文件，目录结构如下：

![](/king-note/assets/img/front/base/iconfont目录结构.png)

其中demo_index.html 用于显示给我们选择的字体样式 `class="..."`；iconfont.css、iconfont.ttf、iconfont.woff、iconfont.woff2为必要文件；

项目引入字体图标时，直接将解压后的目录导入到项目中即可；







使用字体图标

1. 引入字体样式表（iconfont.css）

```html
<link rel="stylesheet" href="./fonts/iconfonts/iconfont.css">
```

2. 标签中使用字体图标类名

```html
<style>
    .iconfont {
        font-size: 200px;
        color: orange;
    }
</style>

<span class="iconfont icon-icon-test3"></span>
```



**注意点**：我们在给字体设置大小的时候，如果直接给标签设置字体大小将会不生效；**原因是默认类选择器`.iconfont`的优先级大于标签选择器`span`**

```html
<style>
    span { 
        font-size: 200px;
        color: orange;
    }
</style>
```







### 十二、Emmet语法

> [Emmet 语法总结 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/217864875)













## css3布局



**注意点**

1. style、link一般放在title标签下



### 一、引入方式

* 内部样式： `css`代码写在style标签内

* 外部样式

  ```html
  <link rel="stylesheet" href="./my.css">
  ```

* 行内样式：配合js使用



### 二、样式配置 



#### 1、字体样式



|      属性       |       作用       | 说明                                                         |
| :-------------: | :--------------: | :----------------------------------------------------------- |
|    font-size    |     文字大小     | 数值： `30px`                                                |
|   font-weight   |     字体粗细     | 正常： 400\|normal<br />加粗：700\|bold                      |
|   font-style    |     文字倾斜     | 正常：normal<br />倾斜：italic                               |
|   line-height   |       行高       | 见下                                                         |
|   font-family   |      字体簇      | eg: Microsoft YaHei, Heiti SC, tahoma, arial, Hiragino Sans GB, 楷体, sans-serif(无衬线) |
|      font       |     复合属性     | style、weight、size、 family；  （**字号和字体必须写，否则不显示**） |
|   text-indent   |     文本缩进     | 缩进2个字： 2em                                              |
|   text-align    | 文本水平对齐方式 | left<br />center<br />right<br />居中的是文字内容，不是标签。本质是控制内容的对齐方式，属性要给内容的父级设置 |
| text-decoration |      修饰线      | none<br />underline（下划线）<br />line-through（删除线）<br />overline（上划线） |
|      color      |     文字颜色     |                                                              |



**特殊说明**

line-height： 设置多行文本的间距（包含 上间距、下间距、文本高度）

属性值：

* 数字 + px
* 数字（当前标签的font-size属性值的倍数）

**垂直居中技巧**： 行高属性值等于盒子高度属性值（使文字垂直居中）



text-align： 设置文本水平对齐方式

本质是控制内容的对齐方式，属性要给内容的父级设置。 

如果要让图片居中， 可以为父元素设置 `text-align：center`



#### 2、背景样式

|         属性         |           作用            | 说明                                                         |
| :------------------: | :-----------------------: | :----------------------------------------------------------- |
|   backgroud-color    |          背景色           |                                                              |
|   backgroud-image    |          背景图           | url(./image/1.png)                                           |
|   backgroud-repeat   | 背景图平铺方式 (默认平铺) | 平铺： repeat<br />不平铺： no-repeat<br />水平平铺：repeat-x<br />垂直平铺：repeat-y |
|  backgroud-position  |        背景图位置         | 左侧：left<br />右侧：right<br />居中：center<br />顶部：top<br />底部： bottom<br />位置： x y;   (+/-水平，+/-垂直) |
|    backgroud-size    |        背景图缩放         | 等比例缩放以完全覆盖背景区（最长边为基础， 图片可能显示不全）： cover<br />等比例缩放背景图以完全装入背景区（最短边为基础，图片可能有露白）：contain<br />百分比：根据盒子尺寸计算图片大小<br />数字 + 单位 |
| backgroud-attachment |        背景图固定         | fixed；                                                      |
|      background      |       背景复合属性        | 背景色 背景图 背景图平铺方式 背景图位置/背景图缩放 背景图固定 |





#### 3、显示模式

* 块级元素
  * 独占一行
  * 宽度默认是父级的100%
  * 添加宽高属性生效
* 行内元素
  * 一行共存多个
  * 尺寸由内容撑开
  * 添加宽高属性不生效
* 行内块元素
  * 一行共存多个
  * 宽高属性生效
  * 宽高默认由内容撑开



```css
div {
    display: block|inline-block|inline;
}
```



#### 4、边框样式

`border: 边框线粗细 线条样式 颜色`

线条样式

| 属性值 | 作用 |
| :----: | :--: |
| solid  | 实线 |
| dashed | 虚线 |
| dotted | 点线 |





#### 5、元素溢出

overflow

| 属性值 |                 作用                 |
| :----: | :----------------------------------: |
| hidden |               溢出隐藏               |
| scroll | 溢出滚动（无论是否溢出都显示滚动条） |
|  auto  |     溢出滚动（溢出才显示滚动条）     |



#### 6、圆角

border-radius

记忆顺序： 从左上角顺时针赋值，没有取值的角和对角取值相同

```css
div {
	border-radius 20px;
    /* 左上和右下、右上和左下 */
    border-radius 10px 80px;
    /* 左上、左下和右上、右下 */
    border-radius 10px 40px 80px;
     /* 左上、右上、右下、左下 */
    border-radius 10px 40px 60px 80px;
}
```



* 正圆形状

  ```css
  img {
  	width: 200px;
  	height: 200px;
      
      border-radius: 100px;
      /* border-radius: 50%; */
  }
  ```

* 胶囊形状

  ```css
  div {
      width 200px;
      height 80px;
      background-color: orange;
      border-radius: 40px;
  }
  ```

  

#### 7、阴影

box-shadow

属性值： x轴偏移量、y轴偏移量、模块半径、扩散半径、颜色、内外阴影

```css
div {
    box-shadow: 2px 5px 10px 1px rgba(0,0,0,0.5) [inset];
}
```



#### 8、垂直对齐

vertical-align： 元素（与文字）垂直对齐的方式， 通常是使用图片和文字对齐

|  属性值  |       作用       |
| :------: | :--------------: |
| baseline | 基线对齐（默认） |
|   top    |     顶部对齐     |
|  middle  |     居中对齐     |
|  bottom  |     底部对齐     |



#### 9、过渡

transition

```css
img {
    width: 200px;
    height: 200px;
    transition: all 1s;
}
```



#### 10、透明度

opacity

属性值： 0 - 1

0： 完全透明（元素不可见）

1： 不透明

0-1之间的小数： 半透明



#### 11、光标类型

cursor

| 属性值  |   作用   |
| :-----: | :------: |
| default |   指针   |
| pointer |   手指   |
|  text   |  工字型  |
|  move   | 十字光标 |



#### 12、段落样式

文字不换行

```css
white-space: wrap; (default)
white-space: nowrap;
```

用途：有时候我们想要多个行内/行内块元素一行显示，不自动换行，可以使用该样式



单行文字超出，省略

```css
.text {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}
```



多行文字超出，省略

```css
.text {
    display: --webkit-box;
    --webkit-box-orient: vertical;
    --webkit-line-clamp: 3;   /* 指定几行文字后进行省略 */
    overflow: hidden;
}
```





### 三、选择器和伪类



#### 1、结构伪类选择器

|      属性      |                作用                |
| :------------: | :--------------------------------: |
| E:first-child  |          查找第一个E元素           |
|  E:last-child  |         查找最后一个E元素          |
| E:nth-child(N) | 查找第N个E元素（第一个元素N值为1） |



> nth-child 与 nth-of-type区别
>
> * e:nth-child(i)：选择第i个节点，判断元素是否为e，如果为e则进行样式渲染
> * e:nth-of-type(i): 选择元素为e的第i个节点，如果存在，则进行样式渲染



:nth-child公式(n 默认从 0 开始)

|        功能         |      公式       |
| :-----------------: | :-------------: |
|      偶数标签       |       2n        |
|      奇数标签       | 2n + 1 \| 2n -1 |
| 找到第5个以后的标签 |      n + 5      |
| 找到第5个以前的标签 |     -n + 5      |



#### 2、超链接伪类

|   属性   |      作用      |
| :------: | :------------: |
|  :link   |     访问前     |
| :visited |     访问后     |
|  :hover  |    鼠标悬停    |
| :active  | 点击时（激活） |



#### 3、伪元素选择器

作用： 创建虚拟元素（伪元素），用来摆放装饰性内容

|  选择器   |               说明                |
| :-------: | :-------------------------------: |
| E::before | 在E元素**内容**前面添加一个伪元素 |
| E::after  | 在E元素**内容**后面添加一个伪元素 |

**注意点**

* 必须设置 `content: ""` 属性，用来设置伪元素内容
* 伪元素默认是行内显示模式
* 权重和标签选择器相同



```html
<style>
    div::before {
        content: "老鼠"
    }
    div::after {
        content: "大米"
    }
</style>
<div>
    爱
</div>
```



#### 4、其他伪类

`:focus-within`：一个元素或该元素的后代元素获得焦点。

如果想要input获得**聚焦**时，给div设置一个底部的边框，可以使用该伪类，表示元素或者子元素聚焦时候为其设置样式

```html
<style>
    div:focus-within {
        border-bottom: 1px solid #000;
    }
</style>
<body>
     <div>
        <input type="text">
    </div>
</body>
```







### 四、css特性

#### 1、继承性

	* 子级默认继承父级的文字控制属性
	* 如果标签自己有样式，则生效自己的样式，不继承

#### 2、层叠性

* 相同的属性会覆盖，后面的css属性覆盖前面的css属性
* 不同的属性会叠加，不同的css属性都生效

#### 3、优先级

​	通配符 < 标签 < 类 < id < 行内 < !important （提权，加在属性值后面）

​	选中标签的范围越大， 优先级越低



（行内样式、id选择器个数、类选择器个数， 标签选择器个数）

规则：

	* 从左到右依次比较选个树， 同一级个数多的优先级高，如果个数相同，则向后比较
	* important 权重最高
	* 继承权重最低







### 五、盒子模型

#### 1、属性简写

* 四个值，编写顺序为顺指针，从上方开始    上、右、下、左

  ```css
  div {
      /*  上、右、下、左 */
      padding: 10px 20px 40px 80px;
  }
  ```

* 三个值

  ```css
  div {
      /*  上、左右、下*/
      padding: 10px 20px 80px;
  }
  ```

* 两个值

  ```css
  div {
      /*  上下、左右*/
      padding: 20px 80px;
  }
  ```

* 一个值

  ```css
  div {
    	/*  上下左右*/
      padding: 20px;
  }
  ```



#### 2、尺寸计算

默认情况下 ： 盒子尺寸 = 内容尺寸 + border尺寸 + 内边距尺寸， 导致 给盒子 加 border/padding都会撑大盒子

解决办法：

* 手动做减法， 减掉 border /padding 的尺寸
* 内减模式： `box-sizing: border-box`



#### 3、外边距问题



**合并现象**

场景： 垂直排列的兄弟元素，上下margin会合并

现象： 取两个margin中的较大值生效

解决方法： 只需设置一个margin即可， 值为两者先前margin之和

**塌陷问题**

场景： 父子级的标签，子级的添加 上外边距会产生塌陷问题

现象： 导致父子级一起向下移动

解决办法

* 取消子级margin，父级设置padding
* 父级设置 overflow:hidden;
* 父级设置 border-top



#### 4、行内元素内外边距问题

场景： 行内元素添加margin和padding，无法改变元素**垂直位置**（可以改变水平位置）

解决方法： 给行内元素添加 line-height 可以改变垂直位置



#### 5、浮动

浮动后的盒子特点

* (父级元素)顶对齐
* 具备行内块特点
* 脱标准流

> nth-child(4n) {margin-right: 0px;}

清除浮动

* 额外标签法： 在父元素内容的最后添加一个块级元素，设置css属性 clear：both

* 单伪元素法

  ```css
  .clearfix::after {
      content: "";
      display: block;
      clear: both;
  }
  ```

* 双伪元素法

  ```css
  .clearfix::before,
  .clearfix::after {
  	content: "";
      display: table;
  }
  
  .clearfix::after {
      clear: both;
  }
  ```

* overflow: 给浮动的父级元素加 `overflow:hidden;`

  

### 六、定位

#### 1、相对定位

relative

**特点**

* 改变位置参照物是自己原来的位置
* 不脱标，占位
* 显示模式不变



#### 2、绝对定位

absolute

使用场景： 子绝父相

**特点**

* 脱标、不占位
* 参照物找最近的已经定位的祖先元素，如果所有祖先元素都没有定位，则参照浏览器的可视区域
* 显示模式改变，（宽高生效，具备行内块的特点）



#### 3、固定定位

fixed

**特点**

* 脱标、不占位
* 参照物为浏览器窗口
* 显示模式变成为行内块特点



#### 4、堆叠顺序

默认效果： 按照标签书写顺序，后来者居上

作用： 设置定位元素的层级顺序，改变定位元素的显示顺序

使用：取值是整数，默认值为0， 取值越大，则显示顺序越靠上



### 七、精灵图







### 八、搜索引擎优化

**网页头部SEO标签**

* title：网页标题标签
* description： 网页描述
* keywords：网页关键词



```html
<title>京东(JD.COM)-正品低价、品质保障</title>
<meta name="description" content="专业网上购物商城">
<meta name="keywords" content="网上购物，京东">
```



**Favicon图标**

一般放在网站的根目录里面

```html
<link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
```



**版心居中**

```css
.wrapper {
    width: 1240px;
    margin: 0 auto;
}
```





### 九、动画效果

#### 1、平面转换

transform

概念：改变盒子在平面内的形态（位移、旋转、缩放、倾斜），一般与过渡(transition)配合使用

![](/king-note/assets/img/front/base/平面转换坐标方向.png)

**平移**

```css
transform: translate(x, y);
transform: translateX(x);  === transform: translate(x);
transform: translateY(y);
```

取值：像素单位、百分比（参照盒子自身）



盒子居中效果

```html
<style>
    .box {
        position: absolute;
        left: 50%;
        top: 50%;
        
        transform: translate(-50%, -50%);
        background-color: red;
    }
</style>

<div class="box">
    
</div>
```



图片双开门效果

```html
```



**旋转**

```css
transform: rotate(45deg);
```

默认情况下，转换原点是盒子中心点，可以通过`transform-origin`改变盒子旋转中心点

```css
transform-origin: x y;
```



时钟旋转效果

```html
```



**多重转换**

先平移再旋转

```css
transform: translate(600px) rotate(360deg);
```

原因： 旋转会改变坐标轴向，多重转换以第一种转换形态的坐标轴为准



**缩放**

```css
transform: scale(n);
transform: scale(x, y);
```

一个值时水平垂直同等缩放， 其中n，x，y为缩放倍数， 取值范围为（0， +inf）



视频播放卡片

```html
```



**倾斜**

```css
transform: skew(n deg);
```

正数： 向左倾斜

负数：向右倾斜



#### 2、渐变

多个颜色逐渐变化效果，一般设置盒子背景



**线性渐变**

```css
background-image: linear-gradient(渐变方向, 颜色1 终点位置(到该位置才开始产生渐变), 颜色2 终点位置,...)

渐变方向: to + 方位名词, 角度


background-image: linear-gradient(to right, red, green);
background-image: linear-gradient(45deg, red, green);
background-image: linear-graident(red 80%, green);
```

渐变方向（默认渐变方向为 从上到下）：

* 如果是 to + 方位名词， 那么表示从反方向向指定方向发生渐变
* 如果是角度，（想象一下机械手表的指针） 则默认角度为180deg（从圆心指向正下方）， 0deg为圆心指向正上方的指针，45deg则为左下方指向右上方的指针（所有左下方是红色，右上方是绿色）



产品展示效果

```html
<style>
      .box {
        position: relative;
        height: 300px;
        width: 300px;
      }

      .box:hover .mask {
        opacity: 1;
      }

      .mask {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
          /*关键代码*/
        background-image: linear-gradient(transparent, rgba(0, 0, 0, 0.5));
        opacity: 0;
        transition: all 0.5s;
      }
    </style>
  </head>
  <body>
    <div class="box">
      <img src="../assets/test.png" alt="img" height="300" width="300" />
      <div class="mask"></div>
    </div>
  </body>
```



**径向渐变**

```css
background-image: radial-gradient(半径 at 圆心位置, 颜色1 终点位置(到该位置才开始产生渐变), 颜色2 终点位置,...)

渐变方向: to + 方位名词, 角度

圆
background-image: radial-gradient(50px at center center, red, green);
椭圆
background-image: radial-gradient(50px 20px at center center, red, green);

background-image: radial-graident(50px at 50px 50px red, pink 50%);
```

渐变方向（默认从圆心向外渐变）



按钮添加高光效果

```css
button {
    width: 100px;
    height: 40px;
    color: white;
    background-color: green;
    border: none;
    background-image: radial-gradient(
        30px at center center,
        rgba(255, 255, 255, 0.2),
        transparent
    );
}
```





#### 3、空间转换

![](/king-note/assets/img/front/base/空间转换坐标方向.png)

Z轴位置与视线方向相同， 正向指向用户



**视距**

perspective： 指定了观察者与z=0平面的距离，为元素添加透视效果

透视效果： 近大远小、近实远虚

属性：（添加给父级，取值范围 800-1200）



**平移**

```css
transform: translate3d(x, y, z);
transform: translateX();
transform: translateY();
transform: translateZ();
```

电脑是平面的，默认情况下z轴的平移效果看不到， 需要给父类添加视距属性（perspective）



**旋转**

```css

transform: rotateX(60deg);
transform: rotateX(-60deg);
```

确立旋转方向（**左手法则**）：

1. 沿哪个轴转，哪个轴不动（eg：y轴）
2. 找到另外2轴的正向，以（xyzxyz...)顺序旋转的即为正向，否则为反向



**立体呈现**

transform-style: 设置元素的子元素是位于3d空间还是在平面空间中



|    属性     |      作用      |
| :---------: | :------------: |
|    flat     | 子级处于平面中 |
| preserve-3d | 子级处于3d空间 |



步骤

1. 父级元素添加`transform-style: preserve-3d;`
2. 子级定位
3. 调整子盒子的位置（位移或旋转）



**空间缩放**

```css
transform: scaleX(0.5);
transform: scaleY(0.5);
transform: scaleZ(0.5);

transform: scale3d(x,y,x);
```





#### 4、动画

animation

和过渡的区别：

|        过渡         |                   动画                   |
| :-----------------: | :--------------------------------------: |
| 实现2个状态间的变化 |           实现多个状态间的变化           |
|                     | 过程可控（重复播放、最终画面、是否暂停） |
|    需要手动触发     |                 自动触发                 |



注意点：开始动画如果和盒子初始状态相同，可以省略动画的初始状态



实现步骤：

1. 定义动画

   * ```css
     @keyframes 动画名称 {
         from {}
         to {}
     }
     ```

   * ```css
     @keyframes 动画名称 {
         0% {}
         10% {}
         ......
         100% {}
     }
     ```

2. 使用动画

   ```css
   animation: 动画名称 动画花费时长（秒） 速度曲线 延迟时间 重复次数（infinite） 动画方向（alternate） 执行完毕状态(forwards: 停在结束状态， backwards:初始状态);
   
   
   animation-play-state: paused;(暂停动画，配合hover使用)
   ```



使用

```css
div {
    width: 100px;
    height: 100px;
    background-color: red;
    
    animation: change 1s infinite;
}

@keyframes change {
    0% {
        transform: translate(0);
    }
    
    100% {
        transform: translate(600px);
    }
}
```



图片走马灯效果

无缝动画原理：复制开头图片到结尾位置（需要复制开头图片累加宽度=区域宽度）

```html
<style>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    .container {
        width: 610px;
        height: 100px;
        margin: 0 auto;
        white-space: nowrap;
        overflow: hidden;
    }

    ul li {
        height: 100px;
        width: 200px;
        display: inline-block;
        list-style: none;
    }

    ul {
        animation: move 3s 10 linear;
    }

    ul:hover {
        animation-play-state: paused;
    }

    .box {
        width: 200px;
        height: 100px;
        float: left;
    }

    .red {
        background-color: red;
    }

    .orange {
        background-color: orange;
    }

    .yellow {
        background-color: yellow;
    }

    .green {
        background-color: green;
    }

    .yellowgreen {
        background-color: yellowgreen;
    }

    .skyblue {
        background-color: skyblue;
    }

    .purple {
        background-color: purple;
    }

    @keyframes move {
        0% {
            transform: translateX(0);
        }

        100% {
            transform: translateX(-1421px);
        }
    }
</style>


<div class="container">
    <ul>
        <li class="red"></li>
        <li class="orange"></li>
        <li class="yellow"></li>
        <li class="green"></li>
        <li class="yellowgreen"></li>
        <li class="skyblue"></li>
        <li class="purple"></li>
        
        <li class="red"></li>
        <li class="orange"></li>
        <li class="yellow"></li>
    </ul>
</div>
```





**逐帧动画**

又称为精灵图动画

 ```css
 animation: run 1s steps(12);
 ```



逐帧动画代码

```html
<style>
div {
    width: 133.5px;
    height: 129.5px;
    background-image: url(../assets/trumple.png);
    animation: walking 1s steps(6) infinite;
    }

    @keyframes walking {
        from {
            background-position: 0 0;
        }

        to {
            background-position: -801px 0;
            /* background-position: -667.5px 0; */
        }
    }
</style>
```





### 十、移动端适配

#### 1、几个概念

**分辨率**

* 屏幕分辨率： 纵横向上的像素点数，单位是px  (1920 x 1080)，又称为物理分辨率
* 缩放：如果缩放150%， 新的分辨率为（1920 / 150% x 1080 / 150%）又称为逻辑分辨率

总结：网页的分辨率是参考屏幕的逻辑分辨率



![](/king-note/assets/img/front/base/手机分辨率.png)



**视口**

作用：显示html网页的区域，用来约束html尺寸

默认网页的宽度为980px，加了视口标签后可以和手机的物理分辨率适配，对于物理设备的物理分辨率宽度

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0"> 
```



**二倍图**

设计稿里面每个元素的尺寸倍数



#### 2、适配方案



|      |       等宽适配        |   等比适配   |
| ---- | :-------------------: | :----------: |
| 特点 |      宽度自适应       | 宽高等比缩放 |
| 案例 | 百分比布局， flex布局 |   rem，vw    |



#### 3、媒体查询

能够检测视口的宽度，然后编写差异化的css样式，当某个条件成立，执行对应的css样式

```css
@media (媒体特性) {
    选择器 {
        css 属性
    }
}
```



```css
@media (width:375px) {
    body {
        background-color: green;
    }
}

// 小于等于 375px 都生效
@media (max-width:375px) 
// 大于等于 375px 都生效  
@media (min-width:375px) 
```



书写顺序

min-width：从小到大书写

max-width: 从大到小书写

```css
body {
    backgound-color: #ccc;
}

/* 屏幕宽度大于等于 768px  */
@media(min-width: 768px) {
    backgound-color: #red;
}

/* 屏幕宽度大于等于 992px  */
@media(min-width: 992px) {
    backgound-color: #green;
}

/* 屏幕宽度大于等于 1200px  */
@media(min-width: 1200px) {
    backgound-color: #skyblue;
}
```





**左侧隐藏**

```html
<style>
    @media(max-width: 768px) {
        .left {
            display: none;
        }
    }
    
    .left {
        width: 300px;
        height: 1000px;
        float: left;
    }
    
    .right {
        height: 1000px;
        float: left;
    }
</style>

<body>
    <div>
        <div class="left">
            
        </div>
        <div class="main">
            
        </div>
    </div>
</body>
```







**rem**

rem是相对单位；相对于html标签的字号计算结果；1rem = 1html字号大小

目前rem布局方案中，将网页等分成10份， 标签的字号为视口宽度的1/10

```css
@media (width: 320px) {
    html {
        font-size: 32px;
    }
}

@media (width: 375px) {
    html {
        font-size: 37.5px;
    }
}
```



推荐是用flexible.js库

flexible.js 是手机淘宝开发出来的一个适配移动端的js库

核心原理就是根据不同的视口宽度给网页的html根节点设置不同的font-size



rem移动适配步骤：

1. 确定基准根字号 （计算68px需要多少个rem， 假设设计稿适配 375px视口， 则 n * 37.5 = 68px）
2. rem单位的尺寸（ = px单位数值 / 基准根字号）



**vw和vh**

相对于视口尺寸进行适配



vw移动适配步骤：

1. 假设盒子宽度是68px，视口宽度为375px，则一个vw为3.75px，则 n * 3.75px = 68px
2. vw单位的尺寸（= px单位数值 / （1 /100 视口宽度））
3. **vw和vh不要进行混用**







### 十一、less

一个css预处理器，扩充了css语言； 浏览器不能识别；；

```less
.box {
    color: red;
    width: (68 / 37.5rem);
    
    .son {
        height: (29 / 37.5rem);
    }
}
```

#### 

**支持算术运算和嵌套表达式**

```less
.box {
    width: 100 + 20px;
    width: 100 - 80px;
    width: 100 * 2px;
    width: (68 / 37.5rem);
    
    // 如果表达式由多个单位，最终css里面以第一个单位为准
    height: (29px / 37.5rem);    // 结果将是 0.7733px;
    
    // & 表示当前选择器，代码写到谁的大括号里面就表示谁，并且不会生成后代选择器
    // 应用： 配置伪类（hover）或者 nth-child结构伪类使用
    a {
        color: green;
        // 最终生成结果为  .box a:hover {color: blue}
        &:hover {
            color: blue;
        }
    }
}


```

**变量**

容器，存储数据，方便使用和修改

```less
//定义变量   @变量名:数据;
@myColor: red;
// 使用变量  css属性: @变量名;
.box {
    color: @myColor;
}
```

**导入导出**

导入： 如果是less文件，可以省略后缀；

```less
@import './base.less';
@import './common';
```

导出：控制文件的导出名字和目录；在less文件第一行添加 //out:存储的url， 文件夹名称后面添加 /

```less
//out: ./index.css
//out: ./css/
//out: ./mycss/index.css

// 禁止导出
//out: false
```









### 布局技巧

* **文字垂直居中**： 行高属性值等于盒子高度属性值

  ```css
  div {
  	height: 100px;
      line-height: 100px;
  }
  ```

  

 



## 附录

### 工具推荐

* PxCook

  像素大厨是一款切图设计工具软件。支持PSD文件的文字、颜色、距离自动只能识别

  



































