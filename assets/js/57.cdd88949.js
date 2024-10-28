(window.webpackJsonp=window.webpackJsonp||[]).push([[57],{517:function(t,a,s){"use strict";s.r(a);var e=s(3),r=Object(e.a)({},(function(){var t=this,a=t._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("p",[t._v("定义： FileReader 对象允许 Web 应用程序异步读取存储在用户计算机上的文件（或原始数据缓冲区）的内容，使用 File 或 Blob 对象指定要读取的文件或数据。")]),t._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"title"}),a("p",[t._v("其中 File 对象")]),t._v(" "),a("ol",[a("li",[t._v("可以是来自用户在一个"),a("code",[t._v("<input>")]),t._v("元素上选择文件后返回的FileList对象")]),t._v(" "),a("li",[t._v("也可以来自拖放操作生成的 DataTransfer对象")]),t._v(" "),a("li",[t._v("还可以是来自在一个HTMLCanvasElement上执行mozGetAsFile()方法后返回结果。")])])]),a("div",{staticClass:"custom-block warning"},[a("p",{staticClass:"title"}),a("p",[t._v("FileReader只能读取远程用户文件内容，不能读取本地文件系统")])]),a("h2",{attrs:{id:"构造函数"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#构造函数"}},[t._v("#")]),t._v(" 构造函数")]),t._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" reader "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("FileReader")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br")])]),a("h2",{attrs:{id:"属性"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#属性"}},[t._v("#")]),t._v(" 属性")]),t._v(" "),a("p",{staticStyle:{color:"red"}},[t._v("ro 表示只读 read only")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("属性名")]),t._v(" "),a("th",[t._v("解释")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[t._v("error （ro）")]),t._v(" "),a("td",[t._v("表示在读取文件时发生的错误")])]),t._v(" "),a("tr",[a("td",[t._v("readyState (ro)")]),t._v(" "),a("td",[t._v("表示"),a("code",[t._v("FileReader")]),t._v("状态的数字")])]),t._v(" "),a("tr",[a("td",[t._v("result (ro)")]),t._v(" "),a("td",[t._v("文件的内容。该属性仅在读取操作完成后才有效，数据的格式取决于使用哪个方法来启动读取操作。")])])])]),t._v(" "),a("p",[t._v("其中readyState包括如下状态：")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",{staticStyle:{"text-align":"left"}},[t._v("常量名")]),t._v(" "),a("th",{staticStyle:{"text-align":"left"}},[t._v("值")]),t._v(" "),a("th",{staticStyle:{"text-align":"left"}},[t._v("描述")])])]),t._v(" "),a("tbody",[a("tr",[a("td",{staticStyle:{"text-align":"left"}},[a("code",[t._v("EMPTY")])]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[a("code",[t._v("0")])]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("还没有加载任何数据。")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[a("code",[t._v("LOADING")])]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[a("code",[t._v("1")])]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("数据正在被加载。")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[a("code",[t._v("DONE")])]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[a("code",[t._v("2")])]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("已完成全部的读取请求。")])])])]),t._v(" "),a("h2",{attrs:{id:"事件"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#事件"}},[t._v("#")]),t._v(" 事件")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("事件名")]),t._v(" "),a("th",[t._v("解释")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[t._v("abort")]),t._v(" "),a("td",[t._v("该事件在读取操作被中断时触发。")])]),t._v(" "),a("tr",[a("td",[t._v("error")]),t._v(" "),a("td",[t._v("该事件在读取操作发生错误时触发。")])]),t._v(" "),a("tr",[a("td",[t._v("load")]),t._v(" "),a("td",[t._v("该事件在读取操作完成时触发。")])])])]),t._v(" "),a("p",[t._v("使用：")]),t._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" reader "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("FileReader")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\nreader"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("addEventListener")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"load"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("reader"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("result"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br")])]),a("h2",{attrs:{id:"方法"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#方法"}},[t._v("#")]),t._v(" 方法")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("方法名")]),t._v(" "),a("th",[t._v("解释")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[t._v("abort")]),t._v(" "),a("td",[t._v("中止读取操作")])]),t._v(" "),a("tr",[a("td",[t._v("readAsArrayBuffer(blob)")]),t._v(" "),a("td",[t._v("开始读取指定的 "),a("code",[t._v("Blob")]),t._v("中的内容，一旦完成，result 属性中保存的将是被读取文件的 "),a("code",[t._v("ArrayBuffer")]),t._v(" 数据对象。")])]),t._v(" "),a("tr",[a("td",[t._v("readAsDataURL(blob)")]),t._v(" "),a("td",[t._v("开始读取指定的"),a("code",[t._v("Blob")]),t._v("中的内容。一旦完成，"),a("code",[t._v("result")]),t._v("属性中将包含一个"),a("code",[t._v("data:")]),t._v(" URL 格式的 Base64 字符串以表示所读取文件的内容。")])]),t._v(" "),a("tr",[a("td",[t._v("readAsText(blob)")]),t._v(" "),a("td",[t._v("开始读取指定的"),a("code",[t._v("Blob")]),t._v("中的内容。一旦完成，"),a("code",[t._v("result")]),t._v("属性中将包含一个字符串以表示所读取的文件内容。")])])])])])}),[],!1,null,null,null);a.default=r.exports}}]);