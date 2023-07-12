---
title: JVM
date: 2023-07-11
categories:
  - JavaSE
tags:
  - JVM
---

## 操作命令

### 查看堆信息
```shell
jmap -heap pid
```

### 打印gc信息
```shell
jstat -gc pid milsec
```

### 查看堆内存中对象占用大小排序（前20名）
```shell
jmap -histo 7276 | head -n20
```



### 服务启动堆内存参数调整
```shell
# 堆内存的初始大小
-Xms 
# 堆内存的最大大小
-Xmx 
# 堆内存新生代大小   -Xmx - -Xmn 即为老年代大小
-Xmn 

# 空闲堆空间的最小百分比, 计算公式为：HeapFreeRatio =(CurrentFreeHeapSize/CurrentTotalHeapSize) * 100; 
# HeapFreeRatio < MinHeapFreeRatio 则需要进行堆扩容，扩容的时机应该在每次垃圾回收之后。
-MinHeapFreeRatio
#如果HeapFreeRatio > MaxHeapFreeRatio，则需要进行堆缩容，缩容的时机应该在每次垃圾回收之后。
-MaxHeapFreeRatio


# windows 修改启动参数  catalina.sh
set "JAVA_OPTS=%JAVA_OPTS% -server -Xms5120m -Xmx10240m -XX:MetaspaceSize=512m -XX:CompressedClassSpaceSize=1g"

# linux 修改启动参数 catalina.sh
JAVA_OPTS="$JAVA_OPTS -server -Xms4096m -Xmx6144m -XX:MetaspaceSize=512m -XX:CompressedClassSpaceSize=1g"

```

## 线上问题

### 问题1
现象描述： dubbo频繁导出栈溢出文件
排查步骤：
1. 查看jvm监控，看到cpu使用频率高低不定，但是触发了大量的 fullgc， 初步判断内存容量不够
2. 配置了最大内存为4g，但是实际的堆内存容量大概只有 256m， 实际使用的大概有240m
3. 继续查看栈溢出文件， 发现有大量的请求阻塞在从连接池获取连接的方法中。
4. 查看数据源配置文件， 发现设置的初始值为20，最大激活数为 1500，dubbo服务线程数为500， 配置没有问题。
5. 大量线程需要创建connection对象，却发现堆内存没有这么大的空间，因此请求大量阻塞。

