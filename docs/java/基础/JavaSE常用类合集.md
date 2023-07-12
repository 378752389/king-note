---
title: java基础
date: 2023-07-11
categories:
  - JavaSE
tags:
  - JavaSE
---

## 比较接口

### Comparable

Comparable是排序接口；若一个类实现了Comparable接口，就意味着“该类支持排序”。可以使用Arrays.sort()对改类进行排序, 默认排序为从小到大

该接口有个 `int compare(T o)` 方法

1. 如果返回值小于0： 表示 this 对象 小于 o 对象
2. 如果返回值大于0： 表示 this 对象 大于 o 对象

### Comparator

假如说我们有这样一个需求，需要对类的年龄进行排序，但是类是别人写好的，里面没有Comparable接口，如果在不允许改变源代码的情况下，我们可以使用Comparator接口。

该接口有个 `int compare(T o1, T o2)` 方法

1. 如果返回值小于0： 表示 o1 对象 小于 o2 对象
2. 如果返回值大于0： 表示 o1 对象 大于 o2 对象

## 集合

### list

### queue

* PriorityQueue:非阻塞，线程不安全，无边界， **能保证每次取出的元素都是队列中权值最小的。**（小顶堆）
* ConcurrentLinkedQueue:非阻塞，线程安全，无边界，基于链接节点的队列实现。
* PriorityBlockingQueue:阻塞，线程安全，无边界， 效果同优先级队列。
* ArrayBlockingQueue:阻塞，线程安全，有边界， 一旦创建容量不可改变
* LinkedBlockingQueue:阻塞，线程安全，无边界（可选有边界），链表实现
* DelayQueue: 阻塞、线程安全、无边界，使用优先级队列实现的无界阻塞队列实现类，只有在延迟期满时才能从中提取元素。

### set

* HashSet: 底层实现是HashMap， 线程不安全， 可以存储 null 值
* LinkedHashSet: 是 HashSet的子类， 能够按照**元素添加的顺序遍历**
* TreeSet: 底层是红黑数，能够按照添加**元素大小顺序进行遍历**

### map

### 常用并发集合

* ConcurrentLinkedQueue:非阻塞，线程安全，无边界，基于链接节点的队列实现。
* CopyOnWriteArrayList: 线程安全的 List，在读多写少的场合性能非常好。
* ConcurrentLinkedQueue: 高效的并发队列，使用链表实现。可以看做一个线程安全的 LinkedList，这是一个非阻塞队列。
* ConcurrentSkipListMap: 跳表的实现。使用跳表的数据结构进行快速查找。

## BigDecimal

尽量避免是用 double 的构造函数， 如果需要对 double 进行构造， 可以使用 `Double.toString(val)` 转为 str， 再用 str 进行构造

BigDecimal 进行除法时当不整除出现无限循环小数时，会抛异常，解决办法是为 divide方法设置精度的小数点

NumberFormat 可以对 BigDecimal 进行数据格式化

舍入模式

| 舍入模式          | 说明                                                         |
| ----------------- | ------------------------------------------------------------ |
| ROUND_UP          | 该模式远离0，总是在非零丢弃分数之前增加数字，朝远离数轴的方向进位 |
| ROUND_DOWN        | 该模式向0靠近，永远不要在一个被丢弃的分数前增加数字(即截断)  |
| ROUND_CEILING     | 该模式向正无穷舍入                                           |
| ROUND_FLOOR       | 该模式向负无穷舍入                                           |
| ROUND_HALF_UP     | 该模式向“最近的邻居”四舍五入。如果丢弃的分数是≥ 0.5，则行为与ROUND_UP相同;否则，行为与ROUND_DOWN相同（**四舍五入**） |
| ROUND_HALF_DOWN   | 该模式向“最近的邻居”四舍五入。如果丢弃的分数是> 0.5，则行为与ROUND_UP相同；否则，行为与ROUND_DOWN相同（**五舍六入**） |
| ROUND_HALF_EVEN   | 四舍六入，五看前一位是偶数舍，奇数进位                       |
| ROUND_UNNECESSARY | 在产生不精确结果的操作上指定了此舍入模式，则会抛出ArithmeticException |



## 日期

### UTC和GMT区别

GMT（Greenwich Mean Time）， 格林威治平时（也称格林威治时间）。

它规定太阳每天经过位于英国伦敦郊区的皇家格林威治天文台的时间为中午12点。

UTC（Coodinated Universal Time），协调世界时，又称世界统一时间、世界标准时间、国际协调时间。

UTC 是现在全球通用的时间标准，全球各地都同意将各自的时间进行同步协调。UTC 时间是经过平均太阳时（以格林威治时间GMT为准）、 地轴运动修正后的新时标以及以秒为单位的国际原子时所综合精算而成。

### Instant、Date和LocalDate区别

* Instant： 表示的是时间线上的一个点，也就是时刻， 获取的是UTC的时间。
* Date: 根据当前服务器所处的环境的默认时区来获取的当前时间。 线程不安全。
* LocalDateTime: 是一个不可变类，线程安全。

### 日期转换

Date <----> Instant <----> ZonedDateTime <----> LocalDate

> LocalDateTime总是表示本地日期和时间，要表示一个带时区的日期和时间，我们就需要ZonedDateTime。
> 可以简单地把ZonedDateTime理解成LocalDateTime加ZoneId

```
// Date to Localdate

Date now = new Date();
Instant instant = now.toInstant();
ZonedDateTime zdt = instant.atZone(ZoneId.of("UTC+8"));
// ZonedDateTime zdt = instant.atZone(ZoneId.systemDefault());
LocalDate localDate = zdt.toLocalDate();


// Localdate to Date
LocalDate now = LocalDate.now();
ZonedDateTime zdt = now.atStartOfDay(ZoneId.of("UTC+8"));
Instant instant = zdt.toInstant();
Date date = Date.from(instant);


// Localdate  Localdatetime
 LocalDateTime ldt = ld.atStartOfDay();  
 LocalDateTime ldt = ld.atTime(23, 11, 22);
 
 LocalDate ld = ldt.toLocalDate();
```

### 日期格式化工具

* DateTimeFormatter
* SimpleDateFormat

### 日期计算

| 计算方式 | Date | LocalDate | LocalDateTime |
| --- | ---  | --- | ---|
|计算2个日期差值| TimeUnit.DAYS.convert(d2.getTime() - d1.getTime(), TimeUnit.MILLISECONDS) | Period.between(ld1, ld2).getDays() | ChronoUnit.HOURS.between(ldt1, ldt2)|
|日期比较大小| d1.after(d2) | ld1.isAfter(ld2) | ldt1.isAfter(ldt2) |
|日期加减|  | ld1.plus(2, TimeUnit.DAYS) | ld1.plus(2, TimeUnit.HOURS) |

> 要想在JDBC中，使用Java8的日期LocalDate、LocalDateTime，则必须要求数据库驱动的版本不能低于4.2

