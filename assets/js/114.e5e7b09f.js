(window.webpackJsonp=window.webpackJsonp||[]).push([[114],{572:function(t,l,n){"use strict";n.r(l);var s=n(3),v=Object(s.a)({},(function(){var t=this,l=t._self._c;return l("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[l("h2",{attrs:{id:"概念"}},[l("a",{staticClass:"header-anchor",attrs:{href:"#概念"}},[t._v("#")]),t._v(" 概念")]),t._v(" "),l("p",[t._v("对于大文件处理，通常通过分片上传、断点续传和秒传技术手段实现。")]),t._v(" "),l("ul",[l("li",[t._v("分片上传\n分片上传就是将一个大文件分成若干份大小相等的小块文件，等所有小块文件上传成功后，再将文件进行合并成完整的原始文件。")]),t._v(" "),l("li",[t._v("断点续传\n断点续传就是重新上传文件时先判断哪些文件块已经上传过了（比如将分片的chuck md5等信息保存在DB中)，如果上传过了则跳过这些块，否则上传没有上传的块。")]),t._v(" "),l("li",[t._v("秒传\n当用户选择上传一个文件时，服务端检测该文件之前是否已经被上传过，如果服务器已经存有该文件（完全一样），就立马返回前端\n“文件已上传成功”。前端随即将进度条更新至100%。\n这样给用户的感觉就是 “秒传” 的感觉。")])]),t._v(" "),l("p",[t._v("对于分片上传，前后端分别需要怎么做呢？")]),t._v(" "),l("ul",[l("li",[t._v("前端：需要将文件file.slice()成多个文件块，并计算每一块的md5值，每次请求上传都是传一个小文件块。")]),t._v(" "),l("li",[t._v("后端：需要接收每次上传的文件块并保存文件块的信息（比如md5), 如果已经上传则跳过；最后等所有文件上传完成之后，将所有的文件块合并成一个大文件。")])])])}),[],!1,null,null,null);l.default=v.exports}}]);