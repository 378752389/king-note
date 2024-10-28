(window.webpackJsonp=window.webpackJsonp||[]).push([[64],{523:function(v,_,t){"use strict";t.r(_);var e=t(3),n=Object(e.a)({},(function(){var v=this,_=v._self._c;return _("ContentSlotsDistributor",{attrs:{"slot-key":v.$parent.slotKey}},[_("p",[v._v("在js中，null和undefined在语言设计上代表了两种不同的“缺失值”概念，它们在某些情况下会被视为相似。")]),v._v(" "),_("h3",{attrs:{id:"语义"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#语义"}},[v._v("#")]),v._v(" 语义")]),v._v(" "),_("p",[v._v("undefined： undefined通常表示一个变量已经被声明，但还没有被赋值，或者一个函数期望接收一个参数但实际上没有收到。")]),v._v(" "),_("p",[v._v("使用场景：")]),v._v(" "),_("ul",[_("li",[v._v("当一个变量声明后没有初始化，它的默认值就是undefined。")]),v._v(" "),_("li",[v._v("函数参数如果没有传递值，该参数的值默认为undefined。")]),v._v(" "),_("li",[v._v("访问一个对象不存在的属性时返回undefined。")]),v._v(" "),_("li",[v._v("一个表达式或语句没有返回值时，其结果也是undefined。")]),v._v(" "),_("li",[v._v("如果一个函数没有明确的返回值，函数的返回值默认为undefined。")])]),v._v(" "),_("p",[v._v("null: null通常表示一个明确的空值，意味着“没有任何东西”或“没有任何对象”。它常被用来表示一个对象引用的缺失。")]),v._v(" "),_("p",[v._v("使用场景：")]),v._v(" "),_("ul",[_("li",[v._v("当你想要清除一个对象引用时，可以将其设为null。")]),v._v(" "),_("li",[v._v("作为函数的参数，明确表示该参数不包含任何对象。")]),v._v(" "),_("li",[v._v("在数据库查询中，null可以表示缺失或未知的数据。")]),v._v(" "),_("li",[v._v("当初始化一个变量，但还不确定应该赋予什么值时，有时会将其初始化为null。")])]),v._v(" "),_("h3",{attrs:{id:"宽松相等运算符"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#宽松相等运算符"}},[v._v("#")]),v._v(" 宽松相等运算符 ==")]),v._v(" "),_("p",[v._v("当使用==运算符比较null和undefined时，它们会被认为是相等的，这是因为==运算符在比较两个值之前会进行类型转换，这一过程被称为“类型强制”或“类型提升”。\n当一个值是null，另一个值是undefined，或者反过来，JavaScript的==运算符会认为它们相等。这是因为在类型强制的规则下，null和undefined都被认为是“非对象”（non-object），并且在类型转换成数字时都变为0。")]),v._v(" "),_("p",[v._v("当使用宽松比较运算符 == 进行比较时，如果两边的类型不一致，JavaScript 会尝试将它们转换到同一类型再进行比较。对于对象和非对象之间的比较，转换规则如下：")]),v._v(" "),_("ol",[_("li",[v._v("如果一边是对象，另一边是原始类型，那么对象会尝试转换为其原始值。")]),v._v(" "),_("li",[v._v("对象到原始值的转换会首先尝试调用 valueOf() 方法，如果 valueOf() 返回的仍然是一个对象，则会调用 toString() 方法。")]),v._v(" "),_("li",[v._v("一旦对象被转换为原始值，比较就会在两个原始值之间进行。否则返回false")])]),v._v(" "),_("blockquote",[_("p",[v._v("当使用 === 需要比较 类型 和 值。")])]),v._v(" "),_("h3",{attrs:{id:"类型不同"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#类型不同"}},[v._v("#")]),v._v(" 类型不同")]),v._v(" "),_("ul",[_("li",[v._v('typeof null返回"object"（这是一个历史遗留问题，null实际上并不表示一个对象，但出于兼容性原因，typeof null的结果被设定为"object"）。')]),v._v(" "),_("li",[v._v('typeof undefined返回"undefined"。')])]),v._v(" "),_("h3",{attrs:{id:"类型转换"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#类型转换"}},[v._v("#")]),v._v(" 类型转换")]),v._v(" "),_("table",[_("thead",[_("tr",[_("th",[v._v("类型")]),v._v(" "),_("th",[v._v("null")]),v._v(" "),_("th",[v._v("undefined")])])]),v._v(" "),_("tbody",[_("tr",[_("td",[v._v("Boolean")]),v._v(" "),_("td",[v._v("false")]),v._v(" "),_("td",[v._v("false")])]),v._v(" "),_("tr",[_("td",[v._v("String")]),v._v(" "),_("td",[v._v('"null"')]),v._v(" "),_("td",[v._v('"undefined"')])]),v._v(" "),_("tr",[_("td",[v._v("Number")]),v._v(" "),_("td",[v._v("0")]),v._v(" "),_("td",[v._v("NaN")])]),v._v(" "),_("tr",[_("td",[v._v("Object")]),v._v(" "),_("td",[v._v("[Object null]")]),v._v(" "),_("td",[v._v("[Object undefined]")])])])])])}),[],!1,null,null,null);_.default=n.exports}}]);