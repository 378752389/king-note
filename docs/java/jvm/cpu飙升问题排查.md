---
title: cpu飙升问题排查
date: 2023-07-26
sidebar: false
categories:
  - JavaSE
tags:
  - JVM
---


## 模拟编写一段高CPU的程序

```java
new Thread(() -> {
    while (true) {
        log.info("hello, king!");
    }
}, "hello-").start();
```

将这块代码片段放置到我们的程序中。

## 查找CPU占用比最高的进程

```shell
top -c
```

![cpu飙高问题排查查找cpu占用率最高的进程](https://raw.githubusercontent.com/378752389/image-bed/main/king-note/cpu%E9%A3%99%E9%AB%98%E9%97%AE%E9%A2%98%E6%8E%92%E6%9F%A5%E6%9F%A5%E6%89%BEcpu%E5%8D%A0%E7%94%A8%E7%8E%87%E6%9C%80%E9%AB%98%E7%9A%84%E8%BF%9B%E7%A8%8B.png)


:::tip

此处我使用的是容器部署的环境，所有java进程的PID为1， 生成环境中如果为非容器部署，PID不可能为1

:::

## 查找CPU占用比最高的线程

```shell
# top -Hp PID
top -Hp 1
```

![cpu飙高问题排查查找cpu占用率最高的几个线程](https://raw.githubusercontent.com/378752389/image-bed/main/king-note/cpu%E9%A3%99%E9%AB%98%E9%97%AE%E9%A2%98%E6%8E%92%E6%9F%A5%E6%9F%A5%E6%89%BEcpu%E5%8D%A0%E7%94%A8%E7%8E%87%E6%9C%80%E9%AB%98%E7%9A%84%E5%87%A0%E4%B8%AA%E7%BA%BF%E7%A8%8B.png)

并将CPU占用率最高的线程PID转化为16进制

```shell
printf "%x" 26

# 1a
```

## 打印java的stack信息

```shell
# jstack PID > 重定向文件名
jstack 1 > stack.log

# 筛选出线程ID为 0x1a 的线程调用栈信息
cat stack.log | grep 0x1a -A 20
```

![cpu飙高问题排查打印CPU占用最高线程栈信息](https://raw.githubusercontent.com/378752389/image-bed/main/king-note/cpu%E9%A3%99%E9%AB%98%E9%97%AE%E9%A2%98%E6%8E%92%E6%9F%A5%E6%89%93%E5%8D%B0CPU%E5%8D%A0%E7%94%A8%E6%9C%80%E9%AB%98%E7%BA%BF%E7%A8%8B%E6%A0%88%E4%BF%A1%E6%81%AF.png)


:::tip

jstack打印后的堆栈信息第一行参数含义解释：

* tid: java内的线程id
* nid: 操作系统级别线程的线程id
* prio: java内定义的线程的优先级
* os_prio:操作系统级别的优先级

:::


可以看到我们的代码在EntryTest类中的63行出现问题

![cpu飙高问题排查存在问题的代码片段](https://raw.githubusercontent.com/378752389/image-bed/main/king-note/cpu%E9%A3%99%E9%AB%98%E9%97%AE%E9%A2%98%E6%8E%92%E6%9F%A5%E5%AD%98%E5%9C%A8%E9%97%AE%E9%A2%98%E7%9A%84%E4%BB%A3%E7%A0%81%E7%89%87%E6%AE%B5.png)

