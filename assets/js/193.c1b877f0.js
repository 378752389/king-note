(window.webpackJsonp=window.webpackJsonp||[]).push([[193],{654:function(t,s,e){"use strict";e.r(s);var n=e(3),r=Object(n.a)({},(function(){var t=this,s=t._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h2",{attrs:{id:"zk分布式锁原理"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#zk分布式锁原理"}},[t._v("#")]),t._v(" Zk分布式锁原理")]),t._v(" "),s("p",[t._v("zk的顺序节点，每次创建时都会分配一个序列号，这个序列号在父节点下唯一，并且递增；由于节点的有序性，zk天然就是一个公平锁。")]),t._v(" "),s("blockquote",[s("p",[t._v("创建锁时，父节点建议创建持久化节点，而子节点（加锁对象节点）建议创建临时顺序节点")])]),t._v(" "),s("p",[t._v("原理：每当进行加锁操作时，都在指定路径下创建临时顺序节点，然后判断自己的排号是不是最小的，如果是，则获取锁。否则就处于等待通知状态，又由于zk节点的监听机制，")])])}),[],!1,null,null,null);s.default=r.exports}}]);