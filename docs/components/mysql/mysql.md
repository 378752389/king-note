---
title: 笔记
---



## mysql 函数

| 函数                      | 描述                        | 用法 |
|-------------------------------|---------------------------------|---|
| cast                         | 把一个字段类型转换为另一个字段类型;<br />常用的字段类型有：char、date、datetime、decimal、signed(int)、time |cast(id as signed)|
| ifnull | 判断第一个参数是否为空， 为空则使用默认值 | ifnull(age, 18) |
| length | 获取字段值对应的长度 | length(name) |
| concat | 字符串拼接 | concat('%', 'zxc') |







* insert into：已存在，插入不成功会报错，不存在，插入，id会自增

  insert into student(name, age) values('aa', 18)

* replace into：已存在替换，删除原来的记录，添加新记录， id会自增

  replace into student(name, age) values('aa', 18)

* insert ignore：已存在，忽略新插入记录，不存在，插入，id会自增，不会报错

  nsert ignore into student(name, age) values('aa', 18)









## 互联网公司采用RC级别原因

1. 历史原因

   mysql 主从复制是基于binlog日志进行的，binlog有三种格式：
    * statement： 记录修改的sql
    * row： 记录修改的实际数据
    * mixed： 二者混合使用

   在mysql5.0版本之前，只支持statement格式，而这种格式**RC模式**下存在bug：

| Session1                      | Session2                        |
|-------------------------------|---------------------------------|
| begin                         | begin                           |
| delete from test where id < 6 |                                 |
|                               | insert into test(id) values (3) |
|                               | commit                          |
| commit                        |                                 |

在master上执行的顺序为先删除 id 小于 6 的数据， 然后在插入 id = 3的数据，而在 binlog 通过后 slave 执行的顺序变成了 先执行 插入 id = 3的数据， 然后删除id 小于 6 的数据

2. RR问题

   一、在RR 中 存在间隙锁的 问题， 导致出现**死锁**的概率 比 RC 大的多

| Session1                                 | Session2                                 |
|------------------------------------------|------------------------------------------|
| begin                                    | begin                                    |
| select * from t where id = 9 for update; |                                          |
|                                          | select * from t where id = 9 for update; |
|                                          | insert into user value(7,7,7)            |
| insert into user value(7,7,7)            |                                          |
| commit                                   |                                          |
|                                          | commit                                   |

二、在RR 中 条件 未命中索引 会锁表， 在RC 中， 只会锁行

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

## MRR

全称： Multi-Range Read
Optimization。普通索引上查到主键id后，然后在根据主键id去聚簇索引中取数据。此处需要进行回表操作，普通索引上取出的数据不一定是按照主键id进行排序的，因此可能会导致大量的随机读。如果可以在回表之前按照主键进行排序，那么回表的时候就可以用顺序IO取代为随机IO。

**MRR 在本质上是一种用空间换时间的算法**。这块内存的大小就由参数 read_rnd_buffer_size 来控制，如果 read_rnd_buffer 满了，就会先把满了的 rowid
排好序去磁盘读取，接着清空，然后再往里面继续放 rowid，直到 read_rnd_buffer 又达到 read_rnd_buffe 配置的上限，如此循环。

**MRR能够提升性能的核心在于，这条查询语句在索引a上做的是一个范围查询（也就是说，这是一个多值查询），可以得到足够多的主键id。这样通过排序以后，再去主键索引查数据，才能体现出“顺序性”的优势。**

开启mrr

```
set optimizer_switch='mrr=on';
```

## 索引优化

以小表驱动大表。驱动表有索引不会使用到索引，被驱动表建立索引会使用到索引