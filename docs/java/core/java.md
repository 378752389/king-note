---
title: java基础
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
* **CopyOnWriteArrayList:** 线程安全的 List，在读多写少的场合性能非常好。
* **ConcurrentLinkedQueue:** 高效的并发队列，使用链表实现。可以看做一个线程安全的 LinkedList，这是一个非阻塞队列。
* **ConcurrentSkipListMap:** 跳表的实现。使用跳表的数据结构进行快速查找。

