(window.webpackJsonp=window.webpackJsonp||[]).push([[211],{670:function(e,n,s){"use strict";s.r(n);var t=s(3),_=Object(t.a)({},(function(){var e=this,n=e._self._c;return n("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[n("h2",{attrs:{id:"zk-分布式实现连接管理"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#zk-分布式实现连接管理"}},[e._v("#")]),e._v(" ZK 分布式实现连接管理")]),e._v(" "),n("p",[n("strong",[e._v("连接状态管理：")])]),e._v(" "),n("ul",[n("li",[e._v("连接：用户第一次连接到服务器时，添加一层"),n("code",[e._v("<channel, session>")]),e._v("映射，session为一个空对象，不需要存储任何信息。改对象表示当前有多少用户连接到后台服务器。")]),e._v(" "),n("li",[e._v("登录：用户登录成功后，添加一层"),n("code",[e._v("<user_id, List<channel>")]),e._v(">映射，同时更新连接映射"),n("code",[e._v("<channel, session>")]),e._v("中session的信息（如果未空）。")]),e._v(" "),n("li",[e._v("登出：移除"),n("code",[e._v("<user_id, List<channel>>")]),e._v("映射中当前channel信息，如果"),n("code",[e._v("List<channel>")]),e._v("为空，则彻底删除映射关系，同时重置连接映射"),n("code",[e._v("<channel, session>")]),e._v("中session的信息。")]),e._v(" "),n("li",[e._v("断开连接：进行登出操作，移除"),n("code",[e._v("<channel, session>")]),e._v("映射。")])]),e._v(" "),n("p",[n("img",{attrs:{src:"https://raw.githubusercontent.com/378752389/image-bed/main/king-note/IM%E5%88%86%E5%B8%83%E5%BC%8F%E6%9E%B6%E6%9E%84%E8%BF%9E%E6%8E%A5%E7%AE%A1%E7%90%86%E6%B5%81%E7%A8%8B.png",alt:"IM分布式架构ZK连接管理"}})]),e._v(" "),n("p",[n("strong",[e._v("连接建立流程：")])]),e._v(" "),n("ol",[n("li",[e._v("用户A通过DNS或者Nginx负载均衡后选择一台后台netty服务器建立连接，netty服务器本地保存<channel, session>映射关系。")]),e._v(" "),n("li",[e._v("用户A进行登录操作，登录成功后，修改netty服务器本地保存<channel, session>映射中session的信息、将<user_id, channel>映射关系也存储到本地。")]),e._v(" "),n("li",[e._v("同时将用户A和netty服务器的映射关系存储到Zookeeper中，路径为<user_id>，临时节点内容为netty服务器的ip和端口。")])]),e._v(" "),n("h3",{attrs:{id:"问题1-跨服务器消息发送"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#问题1-跨服务器消息发送"}},[e._v("#")]),e._v(" 问题1： 跨服务器消息发送")]),e._v(" "),n("p",[e._v("用户C连接到netty3服务器中，用户A连接在netty1服务器中。")]),e._v(" "),n("ol",[n("li",[e._v("用户A通过http接口发送消息给用户C，消息到达某台服务器（假设到达netty2服务器上）")]),e._v(" "),n("li",[e._v("netty2服务器从Zookeeper集群中读取"),n("code",[e._v("/IM/C:<user_id>")]),e._v("信息，了解到用户C连接建立在netty3服务器上")]),e._v(" "),n("li",[e._v("netty2将消息推送到Redis中（或者发送到MQ中），netty3服务器只需订阅Redis（MQ）中的消息，即可获取到需要发送到本服务器上建立连接的session信息。")]),e._v(" "),n("li",[e._v("netty3服务器从本地的<user_id, channel>映射中获取到用户C的channel信息，将消息推送到用户C的channel中即可完成消息发送")])]),e._v(" "),n("h3",{attrs:{id:"问题2-服务器宕机"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#问题2-服务器宕机"}},[e._v("#")]),e._v(" 问题2： 服务器宕机")]),e._v(" "),n("ol",[n("li",[e._v("netty1服务器宕机后，本地存储的<channel, session>映射和<user_id, channel>映射关系会丢失")]),e._v(" "),n("li",[e._v("同时，Zookeeper集群中的netty1创建的临时节点"),n("code",[e._v("/IM/<user_id>")]),e._v("会自动删除。这里可以确保session信息数据一致性")])])])}),[],!1,null,null,null);n.default=_.exports}}]);