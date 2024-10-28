(window.webpackJsonp=window.webpackJsonp||[]).push([[191],{651:function(t,a,e){"use strict";e.r(a);var s=e(3),n=Object(s.a)({},(function(){var t=this,a=t._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"概述"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#概述"}},[t._v("#")]),t._v(" 概述")]),t._v(" "),a("p",[t._v("一、seata 中角色分为 TC、TM、RM， TC（server）为单独服务端部署， TM和RM（client）由业务系统集成")]),t._v(" "),a("ul",[a("li",[t._v("client：存放client端sql脚本 (包含 undo_log表) ，参数配置")]),t._v(" "),a("li",[t._v("config-center：各个配置中心参数导入脚本，config.txt(包含server和client，原名nacos-config.txt)为通用参数文件")]),t._v(" "),a("li",[t._v("server：server端数据库脚本 (包含 lock_table、branch_table 与 global_table) 及各个容器配置")])]),t._v(" "),a("blockquote",[a("p",[t._v("资源脚本位置： https://github.com/seata/seata/tree/master/script")])]),t._v(" "),a("p",[t._v("二、Seata TC Server 目前有三种存储模式")]),t._v(" "),a("ul",[a("li",[t._v("file模式： 适合单机部署，全局事务会话信息在内存中读写，并持久化本地文件 root.data, 效率较高")]),t._v(" "),a("li",[t._v("db模式： 适合集群部署，全局事务会话信息通过db共享")]),t._v(" "),a("li",[t._v("redis模式： 性能较高,存在事务信息丢失风险,请提前配置合适当前场景的redis持久化配置.")])]),t._v(" "),a("p",[t._v("三、客户端配置注意事项：")]),t._v(" "),a("ul",[a("li",[a("p",[t._v("seata-spring-boot-starter")]),t._v(" "),a("p",[t._v("内置GlobalTransactionScanner自动初始化功能，若外部实现初始化，请参考SeataAutoConfiguration保证依赖加载顺序\n默认开启数据源自动代理，可配置seata.enable-auto-data-source-proxy: false关闭")])]),t._v(" "),a("li",[a("p",[t._v("spring-cloud-starter-alibaba-seata")]),t._v(" "),a("p",[t._v("2.1.0内嵌seata-all 0.7.1，2.1.1内嵌seata-all 0.9.0，2.2.0内嵌seata-spring-boot-starter 1.0.0, 2.2.1内嵌seata-spring-boot-starter\n1.1.0")])])]),t._v(" "),a("p",[t._v("四、为什么需要分布式事务")]),t._v(" "),a("ul",[a("li",[t._v("如果 A 调用 B ，C 之前报错，A 被事务回滚 ，B ，C 没有调用， 这没问题。")]),t._v(" "),a("li",[t._v("如果是 A 调用 了 B，C 以后 A 抛出异常， 那么 A 回滚了 ，B ，C 执行了 就提交了。 数据 不一致了")]),t._v(" "),a("li",[t._v("如果 A 调用 B ，然后调用 C ，C 报错了 ，C 回滚，C 调用异常 被 A 感知，A 也会回滚，B 执行完就自己提交了，不会跟着一起回滚，数据不一致。")]),t._v(" "),a("li",[t._v("如果 A 调用 B， B 处理了请求， 然后返回时超时了，A 超时异常， 进行回滚， 但 B 已经执行完提交了， 数据 不一致了")])]),t._v(" "),a("p",[t._v("五、seata事务流程")]),t._v(" "),a("ol",[a("li",[t._v("在有注解"),a("code",[t._v("@GlobalTransactional")]),t._v("方法上的服务A开启全局事务，向TC注册TM事务，TC返回XID")]),t._v(" "),a("li",[t._v("TM携带XID调用服务B")]),t._v(" "),a("li",[t._v("服务B携带XID注册分支事务BID")]),t._v(" "),a("li",[t._v("事务执行成功，提交事务，通知TC，并且记录回滚记录写入数据库； 如果事务执行失败，事务回滚，也会通知TC")]),t._v(" "),a("li",[t._v("TM携带XID调用服务C")]),t._v(" "),a("li",[t._v("服务C携带XID注册分支事务BID")]),t._v(" "),a("li",[t._v("事务执行成功，提交事务，通知TC，并且记录回滚记录写入数据库； 如果事务执行失败，事务回滚，也会通知TC")]),t._v(" "),a("li",[t._v("方法调用成功，TM通知TC； 方法调用失败，TM也会通知TC")]),t._v(" "),a("li",[t._v("如果方法调用失败，TC通知各个分支事务进行回滚")])]),t._v(" "),a("p",[t._v("同时seata中还提供了4个定时线程池，检测是否有： 超时事务、异步提交事务、回滚重试事务、重试提交事务")]),t._v(" "),a("p",[t._v("如果发现了有这四类事务，则从全局事务中获取所有的分支事务，分别调用各个分支事务完成对应的操作，依次来确保事务的一致性。")]),t._v(" "),a("blockquote",[a("p",[t._v("springcloud版本依赖关系： https://github.com/alibaba/spring-cloud-alibaba/wiki/%E7%89%88%E6%9C%AC%E8%AF%B4%E6%98%8E")])]),t._v(" "),a("p",[t._v("六、具体实现")]),t._v(" "),a("ul",[a("li",[t._v("当我们导入的是 "),a("code",[t._v("spring-boot-starter-seata")]),t._v(" 依赖时， 在进行跨服务调用是不会开启分布式事务的，因为TM默认在 发起http请求时，是不会发送xid，因此传递 xid 逻辑需要我们自己实现。")])]),t._v(" "),a("p",[t._v("通常情况下，我们会在发送请求时进行请求拦截，并通过将xid的内容设置到请求头中，实现如下")]),t._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("String xid = RootContext.getXID();\nif(xid != null) {\n    requestTemplate.header(RootContext.getXID(), xid);\n}\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br")])]),a("p",[t._v("同时，在接收方需要进行请求过滤，如果请求头中包含xid，需要提取出来，并设置到上下文中")]),t._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("HttpServletRequest req = (javax.servlet.http.HttpServletRequest) request;\nString xid = req.getHeader(RootContext.KEY_XID.toLowerCase());\nboolean isBind = false;\nif (StringUtils.isNotBlank(xid)) {\n    RootContext.bind(xid);\n    isBind = true;\n}\ntry {\n    chain.doFilter(request, response);\n} finally {\n    if (isBind) {\n        RootContext.unbind();\n    }\n}\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br"),a("span",{staticClass:"line-number"},[t._v("8")]),a("br"),a("span",{staticClass:"line-number"},[t._v("9")]),a("br"),a("span",{staticClass:"line-number"},[t._v("10")]),a("br"),a("span",{staticClass:"line-number"},[t._v("11")]),a("br"),a("span",{staticClass:"line-number"},[t._v("12")]),a("br"),a("span",{staticClass:"line-number"},[t._v("13")]),a("br"),a("span",{staticClass:"line-number"},[t._v("14")]),a("br")])]),a("ul",[a("li",[t._v("当我们导入的是 "),a("code",[t._v("spring-cloud-starter-seata")]),t._v(" 依赖时, seata已经为我们封装了xid传递逻辑，因此可以直接调用")])])])}),[],!1,null,null,null);a.default=n.exports}}]);