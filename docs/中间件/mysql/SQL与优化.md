---
title: MySQL-优化
date: 2023-07-11
categories:
  - 中间件
tags:
  - MySQL
---

## mysql 常用函数

| 函数     | 描述                                                                           | 用法                 |
|--------|------------------------------------------------------------------------------|--------------------|
| cast   | 把一个字段类型转换为另一个字段类型;<br />常用的字段类型有：char、date、datetime、decimal、signed(int)、time | cast(id as signed) |
| ifnull | 判断第一个参数是否为空， 为空则使用默认值                                                        | ifnull(age, 18)    |
| length | 获取字段值对应的长度                                                                   | length(name)       |
| concat | 字符串拼接                                                                        | concat('%', 'zxc') |

* insert into：已存在，插入不成功会报错，不存在，插入，id会自增

  insert into student(name, age) values('aa', 18)

* replace into：已存在替换，删除原来的记录，添加新记录， id会自增

  replace into student(name, age) values('aa', 18)

* insert ignore：已存在，忽略新插入记录，不存在，插入，id会自增，不会报错

  nsert ignore into student(name, age) values('aa', 18)

## explain

### type字段解释

* all:  全表扫面
* index：使用索引进行全表扫描
* range： 使用索引进行范围扫描
* ref： 使用非唯一索引或者唯一索引的前缀扫描
* eq_ref： 使用唯一索引
* const： 数据只有一行，且是确定的数据
* system： 系统表数据查询
* null： mysql不用访问表就能获取数据

### extra 字段解释

* Using filesort: mysql无法利用索引完成的排序操作称为**文件排序**，会对数据使用一个外部的索引排序
* Using temporary: mysql使用临时表保存中间结果或使用临时表进行排序。 常见于 `order by` 和 `group by`
* Using index: 表明使用了覆盖索引 （如果同时有 Using where, 表明索引用来查找数据）

## 索引优化

以小表驱动大表。驱动表有索引不会使用到索引，被驱动表建立索引会使用到索引


### 分页优化

---tip

延迟关联优化：主要设计覆盖索引和回表；

* 通过覆盖索引在辅助索引上完成所有扫描、过滤、排序和分页；
* 通过主键回表查询，最大限度减少回表查询I/O次数；

---

`select * from table where type = 1 order by id desc limit 100000, 10` 假设在 `type` 字段上有建立索引，这条sql执行流程如下：

1. 从辅助索引中查询所有`type = 1`的列，获取列对应的主键id；（查询一次索引）
2. 根据主键id，到聚簇索引中筛选符合条件的数据项的所有列；（扫描所有行）
3. 将选取出的数据项按照id进行排序；
4. 从排序后的结果中，丢弃前100000项，获取第10001到10010的数据。

这条sql执行的效率非常低，我们可以利用**延迟关联**的方式进行索引优化：

```sql
select * from table, (select id from table where type = 1 limit 100000, 10) tmp where tmp.id = table.id;
```

1. 从辅助索引中查询所有`type = 1`的列，获取列对应的主键id；（查询一次索引）
2. 根据主键id，到聚簇索引中筛选符合条件的数据项的所有列；（查询一次索引）


上述两条sql最大差别是：
- 前一条sql通过辅助索引查询到主键，然后通过主键提取前100010行**所有字段**，抛弃前100000行；（需要查询的行数： 100010 * 【所有字段】）
- 后一条sql通过辅助索引提取前100010行主键，然后过滤满足条件的后10行，最后通过主键索引提取所有字段；（需要查询的行数：100010 * 【辅助索引id】 + 10 * 【所有字段】）


### 字段类型优化

- 整型比字符串类型更高效，对于枚举类，使用整型存储
- 尽量使用`NOT NULL`字段，建表时给需要查询的字段指定默认值

### union 优化

在低版本的mysql中，尽量不是用用 or， 可能会导致全表扫描，建议使用 union 替代 or。

MySQL处理union的策略是先创建临时表，然后将各个查询结果填充到临时表中最后再来做查询，很多优化策略在union查询中都会失效，因为它无法利用索引，
最好手工将where、limit等子句下推到union的各个子查询中，以便优化器可以充分利用这些条件进行优化

除非确实需要服务器去重，一定要使用union all，如果不加all关键字，MySQL会给临时表加上distinct选项，这会导致对整个临时表做唯一性检查，查询结果集很大时代价很高。


