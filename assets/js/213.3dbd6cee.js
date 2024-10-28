(window.webpackJsonp=window.webpackJsonp||[]).push([[213],{672:function(s,t,a){"use strict";a.r(t);var n=a(3),e=Object(n.a)({},(function(){var s=this,t=s._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h2",{attrs:{id:"概述"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#概述"}},[s._v("#")]),s._v(" 概述")]),s._v(" "),t("p",[s._v("在设计文件上传功能时，可以使用http文件上传，也可以使用三方OSS进行上传，上传功能是一段模版代码，没有难点，主要是文件存储路径需要设计，本人在工作中参与过\n一些项目的开发，基本上都脱离不开文件上传功能，对于路径设计，我给出了一些自己的思考；申明此处通常不包含复杂系统设计（eg：多租户系统）")]),s._v(" "),t("h2",{attrs:{id:"上传路径设计"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#上传路径设计"}},[s._v("#")]),s._v(" 上传路径设计")]),s._v(" "),t("p",[s._v("首先对于系统而言，我们需要确认这个是一个什么类型的系统；其次")]),s._v(" "),t("h3",{attrs:{id:"客户端系统"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#客户端系统"}},[s._v("#")]),s._v(" 客户端系统")]),s._v(" "),t("p",[s._v("这类系统特点是用户需要经常上传文件，分享文件，比如微信聊天、婚恋交友、小红书等；那么我们设计时可以以用户为中心，设计路径时就可以依据 "),t("code",[s._v("/系统标识/用户标识/业务标识/...")]),s._v("；")]),s._v(" "),t("div",{staticClass:"custom-block tip"},[t("p",{staticClass:"title"}),t("p",[s._v("标识：可以明确定位标识内容，可以是一个字符串、主键、uuid等；且定义后一般不允许变动。")]),s._v(" "),t("ul",[t("li",[s._v("系统标识：系统名字；字符串；")]),s._v(" "),t("li",[s._v("用户标识：用户主键，uuid；")]),s._v(" "),t("li",[s._v("业务标识：业务内容；字符串；")])])]),t("p",[s._v("示例：")]),s._v(" "),t("ul",[t("li",[s._v("发布图片、文件消息，那么路径设计时可以为： "),t("code",[s._v("/im/1/message/")])]),s._v(" "),t("li",[s._v("发送动态消息，那么路径可以设计为： "),t("code",[s._v("/im/1/moment/")])]),s._v(" "),t("li",[s._v("用户收藏的图片： "),t("code",[s._v("/im/1/picture")])])]),s._v(" "),t("p",[s._v("优点：")]),s._v(" "),t("ul",[t("li",[s._v("用户发送的内容路径可以快速进行定位和管理；")]),s._v(" "),t("li",[s._v("依据用户限制上传数量：比如用户只能收藏30张图片等；")])]),s._v(" "),t("p",[s._v("缺点：")]),s._v(" "),t("ul",[t("li",[s._v("统计时，消息这块消耗了多大的存储量；")])]),s._v(" "),t("h3",{attrs:{id:"业务类型系统"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#业务类型系统"}},[s._v("#")]),s._v(" 业务类型系统")]),s._v(" "),t("p",[s._v("这类系统特点是用户一般不需要或很少需要上传内容，内容通常是网站设计者提供，比如商城系统、外卖系统、点餐系统等 那么我们设计时可以以业务为中心，设计路径就可以依据 "),t("code",[s._v("/系统标识/业务标识/...")])]),s._v(" "),t("p",[s._v("示例：")]),s._v(" "),t("ul",[t("li",[s._v("点餐系统用餐品图片展示；"),t("code",[s._v("/kfc/food/")])])]),s._v(" "),t("div",{staticClass:"custom-block tip"},[t("p",{staticClass:"title"}),t("p",[s._v("这类系统在做业务标识路径设计时，我们不应该把路径分的太细致，同时需要注意路径设计后通常不能再进行变更；")]),s._v(" "),t("p",[s._v("举一个例子：\n在设计电商系统时，我有一种食品A，属于食物分类，参考业务类型系统路径可以设计为: "),t("code",[s._v("/mall/product/food/食品A.jpg")]),s._v("，现在业务需要进行更细致的划分，取消了食物分类，该为 生鲜、零食、干粮、饮品等，\n那么我们之后上传路径可以需要修改为："),t("code",[s._v("/mall/product/drink/食品A.png")]),s._v("等，这样细致划分后就会存在一个类别在多个路径中存在，不便于管理，\n设计时我们应该尽量依据"),t("span",{staticStyle:{color:"red"}},[s._v("不变业务类型设计")]),s._v("，对于分类后期会进行修改应该不在路径考虑范围之内。")])]),t("p",[s._v("优点：")]),s._v(" "),t("ul",[t("li",[s._v("便于所有产品管理和迁移，结构划分明确；")]),s._v(" "),t("li",[s._v("可以基于业务统计消耗了多大的存储量；")])]),s._v(" "),t("p",[s._v("缺点：")]),s._v(" "),t("ul",[t("li",[s._v("单目录内存储量过大")])]),s._v(" "),t("h3",{attrs:{id:"日期标识"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#日期标识"}},[s._v("#")]),s._v(" 日期标识")]),s._v(" "),t("p",[s._v("通常在设计文件路径时，有时我们也会将路径标识作为路径设计的一部分，那么加入日期标识后会有什么优缺点呢？")]),s._v(" "),t("p",[s._v("优点：")]),s._v(" "),t("ul",[t("li",[t("code",[s._v("/im/1/message/20240824/")]),s._v(" 和 "),t("code",[s._v("/im/1/20240824/message/")]),s._v(", "),t("code",[s._v("/kfc/food/20240824/")]),s._v(" 和 "),t("code",[s._v("/kfc/20240824/food")]),s._v(" "),t("ul",[t("li",[s._v("对于前者，可以更容易判断出用户在什么日期有上传过哪些消息文件， 缩短了业务范围；如果只有少量业务需要使用日期标识，推荐使用；")]),s._v(" "),t("li",[s._v("对于后者，只要有业务上传操作，都会创建对应路径，扩大了业务范围但同时增加维护成本；如果有大量业务需要使用日期标识，推荐使用；")])])])]),s._v(" "),t("p",[s._v("缺点：")]),s._v(" "),t("ul",[t("li",[s._v("添加了日期标识意味着消息路径会滚动向前，增加了维护成本；")])]),s._v(" "),t("h2",{attrs:{id:"文件名重命名映射-修改文件名"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#文件名重命名映射-修改文件名"}},[s._v("#")]),s._v(" 文件名重命名映射（修改文件名）")]),s._v(" "),t("p",[s._v("我们需要思考，上传的文件是否需要重命名；文件重命名本身是为了解决文件覆盖的问题；对于相同路径下同一个文件名，后上传的文件会覆盖之前已经上传的文件，导致之前上传的文件丢失。")]),s._v(" "),t("p",[s._v("是否需要文件重命名，我们需要具体分析：")]),s._v(" "),t("ul",[t("li",[s._v("重映射：如果用户对系统不了解，用户使用时通常不会注意文件命名规范，这样可能会导致后上传文件覆盖前面上传文件，前面上传文件内容丢失，此时我们需要启用文件重命名，由后端记录原始文件名称；")]),s._v(" "),t("li",[s._v("不重映射：如果是管理员，管理员使用时了解文件命名规范，上传时会避免文件重复，同时上传时如果存在相同文件名，可以给出提示，询问是否覆盖，这样会有利于文件管理。\n"),t("ul",[t("li",[s._v("对于不重映射，上传文件前我们可以先发送一个查询请求确认文件是否存在，存在则发送一个消息盒提示管理员是否进行覆盖，否则直接进行上传。")])])])]),s._v(" "),t("h2",{attrs:{id:"业务流程"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#业务流程"}},[s._v("#")]),s._v(" 业务流程")]),s._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[s._v("// 1.判断是否需要添加路径标识\n// 2.判断业务标识\n// 3.判断是否需要日期滚动标识\n// 4.判断是否需要重命名\n// 5.判断文件是否存在（文件命名冲突，提示用户是否需要进行覆盖文件）\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br")])]),t("div",{staticClass:"language-java line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-java"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("public")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("static")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("String")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("parsePath")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("String")]),s._v(" filename"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("UploadBusinessEnum")]),s._v(" businessEnum"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 项目名称")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("String")]),s._v(" basePath "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"/project"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n  "),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("String")]),s._v(" path "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" businessEnum"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("getPath")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n  "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 是否需要添加用户标识前缀")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("if")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("isUserBaseSystem")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("String")]),s._v(" userIdentify "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("getUserIdentify")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    basePath "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("String")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("join")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"/"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" basePath"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" userIdentify"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\n  "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("if")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("!")]),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("StrUtil")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("isEmpty")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("path"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    basePath "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("String")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("join")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"/"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" basePath"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" path"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\n  "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("if")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("businessEnum"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("isRollDate")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("SimpleDateFormat")]),s._v(" sdf "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("new")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("SimpleDateFormat")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"yyyyMMdd"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("String")]),s._v(" datePath "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" sdf"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("format")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("new")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Date")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    basePath "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("String")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("join")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"/"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" basePath"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" datePath"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\n  "),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("String")]),s._v(" name "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" filename"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("if")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("businessEnum"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("isRename")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("int")]),s._v(" index "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" filename"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("lastIndexOf")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"."')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("String")]),s._v(" suffix "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" filename"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("substring")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("index "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("+")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("String")]),s._v(" prefix "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token constant"}},[s._v("UUID")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("randomUUID")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("toString")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("replace")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"-"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('""')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    name "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("String")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("join")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"."')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" prefix"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" suffix"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n  basePath "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("String")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("join")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"/"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" basePath"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" name"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n  "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 判断文件是否存在,给终端操作人员反馈")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("boolean")]),s._v(" fileExist "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("isFileExist")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("absPath"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n  \n  "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("return")]),s._v(" basePath"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br"),t("span",{staticClass:"line-number"},[s._v("12")]),t("br"),t("span",{staticClass:"line-number"},[s._v("13")]),t("br"),t("span",{staticClass:"line-number"},[s._v("14")]),t("br"),t("span",{staticClass:"line-number"},[s._v("15")]),t("br"),t("span",{staticClass:"line-number"},[s._v("16")]),t("br"),t("span",{staticClass:"line-number"},[s._v("17")]),t("br"),t("span",{staticClass:"line-number"},[s._v("18")]),t("br"),t("span",{staticClass:"line-number"},[s._v("19")]),t("br"),t("span",{staticClass:"line-number"},[s._v("20")]),t("br"),t("span",{staticClass:"line-number"},[s._v("21")]),t("br"),t("span",{staticClass:"line-number"},[s._v("22")]),t("br"),t("span",{staticClass:"line-number"},[s._v("23")]),t("br"),t("span",{staticClass:"line-number"},[s._v("24")]),t("br"),t("span",{staticClass:"line-number"},[s._v("25")]),t("br"),t("span",{staticClass:"line-number"},[s._v("26")]),t("br"),t("span",{staticClass:"line-number"},[s._v("27")]),t("br"),t("span",{staticClass:"line-number"},[s._v("28")]),t("br"),t("span",{staticClass:"line-number"},[s._v("29")]),t("br"),t("span",{staticClass:"line-number"},[s._v("30")]),t("br"),t("span",{staticClass:"line-number"},[s._v("31")]),t("br"),t("span",{staticClass:"line-number"},[s._v("32")]),t("br"),t("span",{staticClass:"line-number"},[s._v("33")]),t("br"),t("span",{staticClass:"line-number"},[s._v("34")]),t("br"),t("span",{staticClass:"line-number"},[s._v("35")]),t("br"),t("span",{staticClass:"line-number"},[s._v("36")]),t("br"),t("span",{staticClass:"line-number"},[s._v("37")]),t("br")])])])}),[],!1,null,null,null);t.default=e.exports}}]);