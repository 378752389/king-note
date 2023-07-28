---
title: jstack线程栈分析
date: 2023-07-26
sidebar: false
categories:
  - JavaSE
tags:
  - JVM
---

## Java中的Monitor

在java中，实现线程之间的同步，说的就是对象的Monitor锁，每个Java对象有且仅有一个Monitor，线程状态转化和Monitor的关系如图：

![线程和监视器锁之间的关系](https://raw.githubusercontent.com/378752389/image-bed/main/king-note/%E7%BA%BF%E7%A8%8B%E5%92%8C%E7%9B%91%E8%A7%86%E5%99%A8%E9%94%81%E4%B9%8B%E9%97%B4%E7%9A%84%E5%85%B3%E7%B3%BB.png)

>1. 进入区（Entry Set）：表示线程通过synchronized要求获取对象的锁。如果对象未被锁住，则进入拥有者；否则在进入区等待。一旦对象锁被其他线程释放，立即参与竞争。
>2. 拥有者（The Owner）：表示某一线程成功竞争到对象锁。
>3. 等待区（Wait Set）：表示线程通过对象的wait方法释放对象的锁，并在等待区等待被唤醒。


从图中可以看出，一个 Monitor在某个时刻，只能被一个线程拥有，该线程就是 “Active Thread”，而其它线程都是 “Waiting Thread”，
分别在两个队列 “ Entry Set”和 “Wait Set”里面等候。在 “Entry Set”中等待的线程状态是 “Waiting for monitor entry”，
而在“Wait Set”中等待的线程状态是 “in Object.wait()”。 先看 “Entry Set”里面的线程。我们称被 synchronized保护起来的代码段为临界区。
当一个线程申请进入临界区时，它就进入了 “Entry Set”队列。


## 一条调用栈包含的信息

### 线程状态

> 1. NEW,未启动的。不会出现在Dump中。
> 2. RUNNABLE,在虚拟机内执行的。
> 3. BLOCKED,受阻塞并等待监视器锁。
> 4. WATING,无限期等待另一个线程执行特定操作。
> 5. TIMED_WATING,有时限的等待另一个线程的特定操作。
> 6. TERMINATED,已退出的。


### 线程动作

定义： 线程状态产生的原因。

> 1. runnable：状态一般为RUNNABLE，表示线程具备所有运行条件，在运行队列中准备操作系统的调度，或者正在运行。
> 2. in Object.wait()：等待区等待，状态为WAITING或TIMED_WAITING。
> 3. waiting for monitor entry：进入区 等待，状态为BLOCKED。
> 4. waiting on condition：等待区 等待，被park。
> 5. sleeping：休眠的线程，调用了Thread.sleep()。


### 调用修饰

定义： 线程在方法调用时额外的重要操作，修饰方法的调用。

> 1. locked<地址>目标：使用synchronized申请对象锁成功，监视器的拥有者；
> 2. waiting to lock<地址>目标：使用synchronized申请对象锁未成功，在进入区等待；
> 3. waiting on<地址>目标：使用synchronized申请对象锁成功后，调用了wait方法，进入对象的等待区等待。在调用栈顶出线，线程状态为WAITING或TIMED_WAITING；
> 4. parking to wait for<地址>目标：park是基本的线程阻塞原语，不通过监视器在对象上阻塞。随concurrent包出现的新的机制，与synchronized体系不同；



## 调用栈信息常见分析

### 1、wait on condition

线程在等待其他线程某个条件发生。常见的情况包括：

* 线程在等待网络IO，网络数据没准备好

![]()

* 线程`sleep`等待

![处于sleep的线程状态](https://raw.githubusercontent.com/378752389/image-bed/main/king-note/%E5%A4%84%E4%BA%8Esleep%E7%9A%84%E7%BA%BF%E7%A8%8B%E7%8A%B6%E6%80%81.png)

一旦数据准备就绪，线程重新激活并处理数据。

模拟真实场景：如果发现大量的线程都处于`wait on condition`状态（线程处于 WAIT or TIMED_WAITING），可能是网络瓶颈。网络阻塞导致线程无法执行。
网络阻塞的原因可能包括：

* 带宽不足：大量线程等待网络读写
* 网络故障：读写了不是特别高但是由于网络故障，导致数据包丢失

### 2、waiting for monitor entry 和 in Object.wait()

参考上面线程和监视器锁之间的关系；

* `waiting for monitor entry`: 线程在进入区（Entry Set）等待，表示线程在加锁处(synchronized)阻塞，线程状态通常为`BLOCKED`
* `in Object.wait()`: 线程在等待区（Wait Set）等待，表示线程在 `lock.wait()`处等待其他线程唤醒，线程状态通常为`TIMED_WAITING`

![synchronized和wait导致的线程阻塞](https://raw.githubusercontent.com/378752389/image-bed/main/king-note/synchronized%E5%92%8Cwait%E5%AF%BC%E8%87%B4%E7%9A%84%E7%BA%BF%E7%A8%8B%E9%98%BB%E5%A1%9E.png)

模拟真实场景：

1. 如果发现大量线程都处于 `waiting for monitor entry`，**表示大量线程都在争抢锁，如果线程都是用户线程，此时可以肯定是程序设计存在不恰当之处**，我们需要优化设计；
eg:
   * 进入临界区的线程代码执行时间过长，是否需要进行异步处理
   * 临界区有进行IO操作阻塞 

2. 线程处于`in Object.wait()`，栈信息中一般包含如下2个调用修饰：
```
- locked <0xef63beb8> (a java.util.ArrayList)
- waiting on <0xef63beb8> (a java.util.ArrayList)
```

这是因为线程处于 `in Object.wait()` 的前提必须先获取锁，获取锁后执行过程中由于缺少某种资源，为了提高并发性能，线程需要放弃锁并等待。


### 注意IO操作的RUNNABLE线程

![数据库阻塞IO导致线程池被打满](https://raw.githubusercontent.com/378752389/image-bed/main/king-note/%E6%95%B0%E6%8D%AE%E5%BA%93%E9%98%BB%E5%A1%9EIO%E5%AF%BC%E8%87%B4%E7%BA%BF%E7%A8%8B%E6%B1%A0%E8%A2%AB%E6%89%93%E6%BB%A1.png)

这个是工作中使用dubbo线程池打满后栈的打印信息，图中可以看到存在一个处于`RUNNABLE`状态并且在进行数据库读指令(socketread0)线程，真实情况是该文件包含大量这种线程,
可以判断线程池打满是因为大量线程在等待获取连接池，可能是因为1. 执行长sql，数据传输比较慢，2. 出现了死锁，此处我为第一种情况执行定时任务批量操作，数据库负载比较大。

### 模拟死锁线程栈信息打印

java 代码片段

:::details java代码片段

```java
new Thread(() -> {
  while(true) {
      synchronized (lock1) {
          System.out.println(Thread.currentThread() + ": 获取锁1成功");

          synchronized (lock2) {
              System.out.println(Thread.currentThread() + ": 获取锁2成功");
          }
      }
  }
}, "thread1").start();

new Thread(() -> {
   while (true) {
       synchronized (lock2) {
           System.out.println(Thread.currentThread() + ": 获取锁2成功");

           synchronized (lock1) {
               System.out.println(Thread.currentThread() + ": 获取锁1成功");
           }
       }
   }
}, "thread2").start();
```

:::

![死锁线程栈信息](https://raw.githubusercontent.com/378752389/image-bed/main/king-note/%E6%AD%BB%E9%94%81%E7%BA%BF%E7%A8%8B%E6%A0%88%E4%BF%A1%E6%81%AF.png)