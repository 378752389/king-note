---
title: jstack线程栈分析
date: 2023-07-26
categories:
  - JavaSE
tags:
  - JVM
---

## Java中的Monitor

在java中，实现线程之间的同步，说的就是对象的Monitor锁，每个Java对象有且仅有一个Monitor，线程状态转化和Monitor的关系如图：

![java中monitor锁执行原理](https://raw.githubusercontent.com/378752389/image-bed/main/king-note/java%E4%B8%ADmonitor%E9%94%81%E6%89%A7%E8%A1%8C%E5%8E%9F%E7%90%86.png)

1. 进入区（Entry Set）：表示线程通过synchronized要求获取对象的锁。如果对象未被锁住，则进入拥有者；否则在进入区等待。一旦对象锁被其他线程释放，立即参与竞争。
2. 拥有者（The Owner）：表示某一线程成功竞争到对象锁。
3. 等待区（Wait Set）：表示线程通过对象的wait方法释放对象的锁，并在等待区等待被唤醒。

从图中可以看出，一个 Monitor在某个时刻，只能被一个线程拥有，该线程就是 “Active Thread”，而其它线程都是 “Waiting Thread”，
分别在两个队列 “ Entry Set”和 “Wait Set”里面等候。在 “Entry Set”中等待的线程状态是 “Waiting for monitor entry”，
而在“Wait Set”中等待的线程状态是 “in Object.wait()”。 先看 “Entry Set”里面的线程。我们称被 synchronized保护起来的代码段为临界区。
当一个线程申请进入临界区时，它就进入了 “Entry Set”队列。

## 线程状态

1. NEW,未启动的。不会出现在Dump中。
2. RUNNABLE,在虚拟机内执行的。
3. BLOCKED,受阻塞并等待监视器锁。
4. WATING,无限期等待另一个线程执行特定操作。
5. TIMED_WATING,有时限的等待另一个线程的特定操作。
6. TERMINATED,已退出的。


## 线程动作

定义： 线程状态产生的原因。

1. runnable：状态一般为RUNNABLE，表示线程具备所有运行条件，在运行队列中准备操作系统的调度，或者正在运行。
2. in Object.wait()：等待区等待，状态为WAITING或TIMED_WAITING。
3. waiting for monitor entry：进入区 等待，状态为BLOCKED。
4. waiting on condition：等待区 等待，被park。
5. sleeping：休眠的线程，调用了Thread.sleep()。

