---
title: 笔记
permalink: /components/kafka
---

## kafka 存储机制

1. 一个topic对应多个partition (每个主题对应物理文件夹为  topic-0, topic-1, ...)
2. 一个partition对应多个segment
3. 一个segment对应4个文件（xxx.index, xxx.log, xxx.timeindex, xxx.snapshot）


index 文件

采用稀疏矩阵进行存储， 结构大概类似如下

|topic offset|position|
|---|---|
|330|1225|
|380|1456|
|420|1928|


第一行存储kafka 的消息偏移， 第二行存储 物理消息相对文件头偏移。


log 文件

|message|offset|position|
|---|---|---|
|1|330|1225|
|2|380|1456|
|3|420|1928|






> 参考文档
> 
> https://mp.weixin.qq.com/s?__biz=Mzg3MTcxMDgxNA==&mid=2247488841&idx=1&sn=2ea884012493403ab45b450271708fc8&source=41#wechat_redirect
> 
> https://zhuanlan.zhihu.com/p/426077521#:~:text=%E5%9B%BE5%EF%BC%9Akafka%E6%97%A5%E5%BF%97%E5%AD%98%E5%82%A8%E7%BB%93%E6%9E%84%20%E4%BB%8E%E4%B8%8A%E5%9B%BE%E5%8F%AF%E4%BB%A5%E7%9C%8B%E5%87%BA%E6%9D%A5%EF%BC%8CKafka%20%E6%98%AF%E5%9F%BA%E4%BA%8E%E3%80%8C%E4%B8%BB%E9%A2%98%20%2B%20%E5%88%86%E5%8C%BA,%2B%20%E5%89%AF%E6%9C%AC%20%2B%20%E5%88%86%E6%AE%B5%20%2B%20%E7%B4%A2%E5%BC%95%E3%80%8D%E7%9A%84%E7%BB%93%E6%9E%84%EF%BC%9A



## kafka实现延迟队列（供参考）

生产者发送消息到broker中，并附上需要延迟执行的时间， 消费者从broker中拉取消息，获取消息发送时间， 加上延迟执行时间，然后把消息放到延迟队列中执行。

> delayQueue 相关源码
> 
> https://www.cnblogs.com/dwlsxj/p/delayedQueue.html