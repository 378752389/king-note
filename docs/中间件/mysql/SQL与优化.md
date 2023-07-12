---
title: SQL与优化
date: '2023-07-11 02:00:00'
categories:
  - MySQL
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
