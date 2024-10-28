(window.webpackJsonp=window.webpackJsonp||[]).push([[181],{641:function(s,a,n){"use strict";n.r(a);var t=n(3),e=Object(t.a)({},(function(){var s=this,a=s._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h2",{attrs:{id:"关闭接口"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#关闭接口"}},[s._v("#")]),s._v(" 关闭接口")]),s._v(" "),a("p",[s._v("线上服务在跑期间，突然由于某些原因，接口出现了异常，由于情况紧急，不便修改代码，此时可以通过nginx配置，关闭该接口")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v('server {\n    location /register {\n        default_type  application/json;\n        return 200 \'{"result": 0, "message": "OK"}\';\n    }\n    \n    location / {\n        proxy_pass http://localhost:8080;\n    }\n}\n')])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br")])]),a("h2",{attrs:{id:"接口兼容性迁移"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#接口兼容性迁移"}},[s._v("#")]),s._v(" 接口兼容性迁移")]),s._v(" "),a("p",[s._v("由于项目结构做了修改，之前接口访问地址为： "),a("code",[s._v("/api/check")]),s._v(" ,现在需要将其修改为 "),a("code",[s._v("/api/check_v2")]),s._v(", 为了向后兼容，需要对其进行重定向配置")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("server {\n    location / {\n        rewrite ^/api/check(\\w+)$ /api/check_v2$1;\n        proxy_pass http://localhost:8080;\n    }\n}\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br")])])])}),[],!1,null,null,null);a.default=e.exports}}]);