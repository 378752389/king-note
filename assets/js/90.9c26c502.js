(window.webpackJsonp=window.webpackJsonp||[]).push([[90],{549:function(_,v,e){"use strict";e.r(v);var d=e(3),t=Object(d.a)({},(function(){var _=this,v=_._self._c;return v("ContentSlotsDistributor",{attrs:{"slot-key":_.$parent.slotKey}},[v("p",[_._v("工作中进行项目开发时，我们通常会给一些表设置逻辑删除字段，目的不仅让sql操作更快，并且在运营人员误操作时，也能快速进行数据恢复。")]),_._v(" "),v("p",[_._v("引入逻辑删除后，同时也会带来一些问题：")]),_._v(" "),v("ol",[v("li",[_._v("自定义sql编写会更加复杂：编写sql是我们需要在查询条件上添加上逻辑删除字段")]),_._v(" "),v("li",[_._v("会和唯一索引发生冲突；")])]),_._v(" "),v("p",[_._v("引入逻辑删除后，我们删除数据时，操作变为更新某条数据项，让其逻辑删除字段置为1。但如果表中存在唯一索引，之后我们在插入一条已被删除的\n数据项，那么将会报错；究其原因是应为表中唯一索引冲突，逻辑删除并为真正删除数据项，而是通过业务逻辑控制，标识为已经删除了。")]),_._v(" "),v("p",[_._v("那开发中，如果需要引入逻辑删除，我们该怎么设计来避免冲突呢？")]),_._v(" "),v("p",[_._v("在"),v("code",[_._v("MySQL")]),_._v("中，当我们创建复合唯一索引时，如果某个字段为 "),v("code",[_._v("null")]),_._v("，是允许重复的，举个例子：")]),_._v(" "),v("p",[_._v("存在一张学生表入下表所示，要求同一个班级下学生人名不能重复。")]),_._v(" "),v("table",[v("thead",[v("tr",[v("th",[_._v("-- id --")]),_._v(" "),v("th",[_._v("-- name --")]),_._v(" "),v("th",[_._v("-- gender --")]),_._v(" "),v("th",[_._v("-- class --")])])]),_._v(" "),v("tbody",[v("tr",[v("td",[_._v("1")]),_._v(" "),v("td",[_._v("张三")]),_._v(" "),v("td",[_._v("男")]),_._v(" "),v("td",[_._v("三年一班")])]),_._v(" "),v("tr",[v("td",[_._v("2")]),_._v(" "),v("td",[_._v("李四")]),_._v(" "),v("td",[_._v("女")]),_._v(" "),v("td",[_._v("三年一班")])]),_._v(" "),v("tr",[v("td",[_._v("3")]),_._v(" "),v("td",[_._v("王五")]),_._v(" "),v("td",[_._v("女")]),_._v(" "),v("td",[_._v("三年一班")])]),_._v(" "),v("tr",[v("td",[_._v("4")]),_._v(" "),v("td",[_._v("张三")]),_._v(" "),v("td",[_._v("男")]),_._v(" "),v("td",[_._v("三年二班")])]),_._v(" "),v("tr",[v("td",[_._v("5")]),_._v(" "),v("td",[_._v("张三")]),_._v(" "),v("td",[_._v("男")]),_._v(" "),v("td",[_._v("null")])]),_._v(" "),v("tr",[v("td",[_._v("6")]),_._v(" "),v("td",[_._v("张三")]),_._v(" "),v("td",[_._v("女")]),_._v(" "),v("td",[_._v("null")])])])]),_._v(" "),v("p",[_._v("为上示表创建唯一索引 "),v("code",[_._v("alter table student add unique index uk_name_class(name, class)")])]),_._v(" "),v("p",[_._v("依次按需插入数据，我们发现表中存在两条 "),v("code",[_._v("name")]),_._v(" 为 "),v("code",[_._v("张三")]),_._v(" 但 "),v("code",[_._v("class")]),_._v(" 为 "),v("code",[_._v("null")]),_._v(" 的数据项，但是命令却不会报错。\n原因："),v("code",[_._v("MySQL")]),_._v(" 对 "),v("code",[_._v("NULL")]),_._v(" 值有一些特别的处理逻辑。")]),_._v(" "),v("p",[_._v("首先，在"),v("code",[_._v("MySQL")]),_._v("中, "),v("code",[_._v("NULL")]),_._v(" 值表示不存在和未知。")]),_._v(" "),v("ol",[v("li",[_._v("进行"),v("strong",[_._v("比较运算（=, <, >, !=）")]),_._v("：比较操作返回的结果都是 "),v("code",[_._v("NULL")]),_._v("， 如需对"),v("code",[_._v("NULL")]),_._v("检测，需要使用 "),v("code",[_._v("IS NULL")]),_._v("("),v("code",[_._v("IS NOT NULL")]),_._v(")")]),_._v(" "),v("li",[_._v("进行"),v("strong",[_._v("聚合运算（count, sum, avg, min 函数后加列名）")]),_._v("：不会计算"),v("code",[_._v("NULL")]),_._v("值")]),_._v(" "),v("li",[_._v("进行"),v("strong",[_._v("逻辑运算")]),_._v("："),v("code",[_._v("AND")]),_._v("和"),v("code",[_._v("OR")]),_._v("，结果可能是 "),v("code",[_._v("NULL")]),_._v("， "),v("code",[_._v("NOT NULL")]),_._v(" 返回"),v("code",[_._v("NULL")])]),_._v(" "),v("li",[_._v("进行"),v("strong",[_._v("排序和分组")]),_._v("："),v("code",[_._v("NULL")]),v("strong",[_._v("排序默认被视为最小值")]),_._v("；"),v("code",[_._v("NULL")]),v("strong",[_._v("分组被视为一个单独的组")]),_._v("；")]),_._v(" "),v("li",[_._v("相关函数： "),v("code",[_._v("IFNULL")]),_._v("-第一个表达式为空返回第二个； "),v("code",[_._v("COALESCE")]),_._v("-返回第一个不为"),v("code",[_._v("NULL")]),_._v("的表达式")]),_._v(" "),v("li",[_._v("相关索引：\n"),v("ul",[v("li",[_._v("唯一索引：唯一索引可以包含多个"),v("code",[_._v("NULL")]),_._v("值")]),_._v(" "),v("li",[_._v("普通索引：普通索引可以包含多个"),v("code",[_._v("NULL")]),_._v("值")])])])]),_._v(" "),v("p",[v("code",[_._v("MySQL")]),_._v(" 中 唯一索引是可以包含多个"),v("code",[_._v("NULL")]),_._v("值；那么我们可以使用这条规则，设计逻辑删除：")]),_._v(" "),v("ol",[v("li",[_._v("逻辑删除字段默认值为0")]),_._v(" "),v("li",[_._v("为唯一索引字段和逻辑删除字段创建一个复合索引 "),v("code",[_._v("uk_student(name, delete_flag)")])]),_._v(" "),v("li",[_._v("删除操作时，将该字段更新为"),v("code",[_._v("NULL")]),_._v("，数据库中存在多个相同唯一索引字段"),v("code",[_._v("（name）")]),_._v("不会发送冲突，因为逻辑删除字段为"),v("code",[_._v("NULL")]),_._v("，组合起来 "),v("code",[_._v("(name, NULL)")])]),_._v(" "),v("li",[_._v("插入重复数据，"),v("code",[_._v("(name, 0)")])]),_._v(" "),v("li",[_._v("再次插入重复数据 "),v("code",[_._v("(name, 0)")]),_._v(" 将发送冲突，存在相同的非空字段。")])]),_._v(" "),v("p",[_._v("总结")]),_._v(" "),v("p",[_._v("解决唯一索引冲突操作：\n"),v("code",[_._v("alter table student add unique index uk_name_class(name, class, delete_flag)")]),_._v(" "),v("code",[_._v("alter table student add unique index uk_name_class(name, class, delete_flag)")])])])}),[],!1,null,null,null);v.default=t.exports}}]);