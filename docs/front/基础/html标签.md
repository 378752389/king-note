---
title: 【html】标签
date: 2023-07-10
categories:
- 前端基础
tags:
- html
---


**注意点**

* html5中，如果属性名和属性值完全一样，可以简写为一个单词



## 一、图片标签

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



## 二、换行和水平线标签

| 标签名 | 效果 |
| :----: | :----: |
| br | 换行 |
| hr | 水平线 |



## 三、文本格式标签

| 标签名 |  效果  |
| :----: | :----: |
| strong |  加粗  |
|   em   |  倾斜  |
|  ins   | 下划线 |
|  del   | 删除线 |



## 四、超链接标签

```html
<a href="#" target="_blank">jump</a>
```



|   属性   |     作用     | 说明                                        |
| :------: | :----------: | :------------------------------------------ |
|  target  | 页面跳转方式 | \_blank: 新窗口跳转<br />\_self: 本窗口跳转 |
| **href** |   跳转连接   |                                             |



## 五、音频标签和视频标签



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



## 六、列表标签

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



## 七、表格标签

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



## 八、表单标签

### 1、input

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



### 2、下拉菜单

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



### 3、文本域

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



### 4、label标签

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



### 5、按钮

```html
<button type="">
  	按钮
</button>
```



| 属性 |        作用        | 说明                                                         |
| :--: | :----------------: | :----------------------------------------------------------- |
| type | 按钮需要被form包裹 | submit：提交按钮， 点击后可以提交表单数据到后台（默认功能）<br />reset：重置按钮，点击后将表单控件恢复默认值<br />button: 普通按钮，默认没有功能，一般和js配置使用 |



### 6、表单



|  属性  | 作用 | 说明                 |
| :----: | :--: | :------------------- |
| action |      | 发送数据到后台的地址 |



## 九、布局标签

| 标签名 |   效果   |
| :----: | :------: |
|  div   | 独占一行 |
|  span  |  不换行  |



## 十、字符实体

| 显示结果 |  描述  | 实体名称 |
| :------: | :----: | -------- |
|          |  空格  | &nbsp；  |
|    <     | 小于号 | \&lt;    |
|    >     | 大于号 | \&gt;    |



### 1、常见字体文件

常见的字体文件包含：

* TTF(TrueType Font)

  `TrueType`是由美国苹果公司和微软公司共同开发的一种电脑轮廓字体（曲线描边字）类型标准。只需要一个文件，包含一个单独的字体样式文件（普通、斜体、粗体等） ；`TrueType`文件格式仅用于屏幕；

* OTF(OpenType Font)

  `OpenType` 是 Adobe 和 Microsoft 联合开发的跨平台字体文件格式，也叫 Type 2 字体，它的字体格式采用 Unicode 编码，是一种兼容各种语言的字体格式：

  - 包含 `TrueType`字体的 `OpenType` 文件后缀名为 `.ttf`。
  - 包含 `PostScript` 字体的文件后缀名为 `.OTF`。
  - 如果是包含一系列 `TrueType` 字体的字体包文件，那么后缀名为`.TTC`。

* WOFF(Web Open Font Format)

  `Web 开放字体格式`是一种网页所采用的字体格式标准。本质上是包含了基于 `sfnt` 的字体（如 `TrueType`、`OpenType` 或开放字体格式），且这些字体均经过 `WOFF`的编码工具压缩，以便嵌入网页中。

* WOFF2

  对 `WOFF` 字体的升级。



### 2、引入外部字体文件

> 写法如下

```css
@font-face {
    // 自定义字体名称
    font-family: "KING_FONT";
    // 字体资源
    src: url("http://xxx") format("woff"), url("http://yyy")  format("truetype");
}
```



> 示例

```css
@font-face {
    font-family: KING_FONT;
    src: url(https://dragon-chen777.github.io/assets/fonts/Alimama_DongFangDaKai_Regular.woff) format("woff");
}
```



> 使用字体阴影做出空洞字体

```css
.empty-font {
	font-size: 30px;
	// 字体内芯颜色
	color: white;
	// 字体边框颜色
	text-shadow: 2px 0 red, -2px 0 red, 0 2px red, 0 -2px red;
}
```





## 十一、字体图标

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







## 十二、Emmet语法

> [Emmet 语法总结 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/217864875)

