(window.webpackJsonp=window.webpackJsonp||[]).push([[171],{631:function(t,s,a){"use strict";a.r(s);var e=a(3),v=Object(e.a)({},(function(){var t=this,s=t._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h2",{attrs:{id:"mysql-常用函数"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#mysql-常用函数"}},[t._v("#")]),t._v(" mysql 常用函数")]),t._v(" "),s("table",[s("thead",[s("tr",[s("th",[t._v("函数")]),t._v(" "),s("th",[t._v("描述")]),t._v(" "),s("th",[t._v("用法")])])]),t._v(" "),s("tbody",[s("tr",[s("td",[t._v("cast")]),t._v(" "),s("td",[t._v("把一个字段类型转换为另一个字段类型;"),s("br"),t._v("常用的字段类型有：char、date、datetime、decimal、signed(int)、time")]),t._v(" "),s("td",[t._v("cast(id as signed)")])]),t._v(" "),s("tr",[s("td",[t._v("ifnull")]),t._v(" "),s("td",[t._v("判断第一个参数是否为空， 为空则使用默认值")]),t._v(" "),s("td",[t._v("ifnull(age, 18)")])]),t._v(" "),s("tr",[s("td",[t._v("length")]),t._v(" "),s("td",[t._v("获取字段值对应的长度")]),t._v(" "),s("td",[t._v("length(name)")])]),t._v(" "),s("tr",[s("td",[t._v("concat")]),t._v(" "),s("td",[t._v("字符串拼接")]),t._v(" "),s("td",[t._v("concat('%', 'zxc')")])])])]),t._v(" "),s("ul",[s("li",[s("p",[t._v("insert into：已存在，插入不成功会报错，不存在，插入，id会自增")]),t._v(" "),s("p",[t._v("insert into student(name, age) values('aa', 18)")])]),t._v(" "),s("li",[s("p",[t._v("replace into：已存在替换，删除原来的记录，添加新记录， id会自增")]),t._v(" "),s("p",[t._v("replace into student(name, age) values('aa', 18)")])]),t._v(" "),s("li",[s("p",[t._v("insert ignore：已存在，忽略新插入记录，不存在，插入，id会自增，不会报错")]),t._v(" "),s("p",[t._v("nsert ignore into student(name, age) values('aa', 18)")])])]),t._v(" "),s("h2",{attrs:{id:"explain"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#explain"}},[t._v("#")]),t._v(" explain")]),t._v(" "),s("h3",{attrs:{id:"type字段解释"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#type字段解释"}},[t._v("#")]),t._v(" type字段解释")]),t._v(" "),s("ul",[s("li",[t._v("all:  全表扫面")]),t._v(" "),s("li",[t._v("index：使用索引进行全表扫描")]),t._v(" "),s("li",[t._v("range： 使用索引进行范围扫描")]),t._v(" "),s("li",[t._v("ref： 使用非唯一索引或者唯一索引的前缀扫描")]),t._v(" "),s("li",[t._v("eq_ref： 使用唯一索引")]),t._v(" "),s("li",[t._v("const： 数据只有一行，且是确定的数据")]),t._v(" "),s("li",[t._v("system： 系统表数据查询")]),t._v(" "),s("li",[t._v("null： mysql不用访问表就能获取数据")])]),t._v(" "),s("h3",{attrs:{id:"extra-字段解释"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#extra-字段解释"}},[t._v("#")]),t._v(" extra 字段解释")]),t._v(" "),s("ul",[s("li",[t._v("Using filesort: mysql无法利用索引完成的排序操作称为"),s("strong",[t._v("文件排序")]),t._v("，会对数据使用一个外部的索引排序")]),t._v(" "),s("li",[t._v("Using temporary: mysql使用临时表保存中间结果或使用临时表进行排序。 常见于 "),s("code",[t._v("order by")]),t._v(" 和 "),s("code",[t._v("group by")])]),t._v(" "),s("li",[t._v("Using index: 表明使用了覆盖索引 （如果同时有 Using where, 表明索引用来查找数据）")])]),t._v(" "),s("h2",{attrs:{id:"索引优化"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#索引优化"}},[t._v("#")]),t._v(" 索引优化")]),t._v(" "),s("p",[t._v("以小表驱动大表。驱动表有索引不会使用到索引，被驱动表建立索引会使用到索引")]),t._v(" "),s("h3",{attrs:{id:"分页优化"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#分页优化"}},[t._v("#")]),t._v(" 分页优化")]),t._v(" "),s("p",[t._v("---tip")]),t._v(" "),s("p",[t._v("延迟关联优化：主要设计覆盖索引和回表；")]),t._v(" "),s("ul",[s("li",[t._v("通过覆盖索引在辅助索引上完成所有扫描、过滤、排序和分页；")]),t._v(" "),s("li",[t._v("通过主键回表查询，最大限度减少回表查询I/O次数；")])]),t._v(" "),s("hr"),t._v(" "),s("p",[s("code",[t._v("select * from table where type = 1 order by id desc limit 100000, 10")]),t._v(" 假设在 "),s("code",[t._v("type")]),t._v(" 字段上有建立索引，这条sql执行流程如下：")]),t._v(" "),s("ol",[s("li",[t._v("从辅助索引中查询所有"),s("code",[t._v("type = 1")]),t._v("的列，获取列对应的主键id；（查询一次索引）")]),t._v(" "),s("li",[t._v("根据主键id，到聚簇索引中筛选符合条件的数据项的所有列；（扫描所有行）")]),t._v(" "),s("li",[t._v("将选取出的数据项按照id进行排序；")]),t._v(" "),s("li",[t._v("从排序后的结果中，丢弃前100000项，获取第10001到10010的数据。")])]),t._v(" "),s("p",[t._v("这条sql执行的效率非常低，我们可以利用"),s("strong",[t._v("延迟关联")]),t._v("的方式进行索引优化：")]),t._v(" "),s("div",{staticClass:"language-sql line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-sql"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("select")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("table")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("select")]),t._v(" id "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("table")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("where")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("type")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("limit")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("100000")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("10")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" tmp "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("where")]),t._v(" tmp"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("id "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("table")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("id"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br")])]),s("ol",[s("li",[t._v("从辅助索引中查询所有"),s("code",[t._v("type = 1")]),t._v("的列，获取列对应的主键id；（查询一次索引）")]),t._v(" "),s("li",[t._v("根据主键id，到聚簇索引中筛选符合条件的数据项的所有列；（查询一次索引）")])]),t._v(" "),s("p",[t._v("上述两条sql最大差别是：")]),t._v(" "),s("ul",[s("li",[t._v("前一条sql通过辅助索引查询到主键，然后通过主键提取前100010行"),s("strong",[t._v("所有字段")]),t._v("，抛弃前100000行；（需要查询的行数： 100010 * 【所有字段】）")]),t._v(" "),s("li",[t._v("后一条sql通过辅助索引提取前100010行主键，然后过滤满足条件的后10行，最后通过主键索引提取所有字段；（需要查询的行数：100010 * 【辅助索引id】 + 10 * 【所有字段】）")])]),t._v(" "),s("h3",{attrs:{id:"字段类型优化"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#字段类型优化"}},[t._v("#")]),t._v(" 字段类型优化")]),t._v(" "),s("ul",[s("li",[t._v("整型比字符串类型更高效，对于枚举类，使用整型存储")]),t._v(" "),s("li",[t._v("尽量使用"),s("code",[t._v("NOT NULL")]),t._v("字段，建表时给需要查询的字段指定默认值")])]),t._v(" "),s("h3",{attrs:{id:"union-优化"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#union-优化"}},[t._v("#")]),t._v(" union 优化")]),t._v(" "),s("p",[t._v("在低版本的mysql中，尽量不是用用 or， 可能会导致全表扫描，建议使用 union 替代 or。")]),t._v(" "),s("p",[t._v("MySQL处理union的策略是先创建临时表，然后将各个查询结果填充到临时表中最后再来做查询，很多优化策略在union查询中都会失效，因为它无法利用索引，\n最好手工将where、limit等子句下推到union的各个子查询中，以便优化器可以充分利用这些条件进行优化")]),t._v(" "),s("p",[t._v("除非确实需要服务器去重，一定要使用union all，如果不加all关键字，MySQL会给临时表加上distinct选项，这会导致对整个临时表做唯一性检查，查询结果集很大时代价很高。")])])}),[],!1,null,null,null);s.default=v.exports}}]);