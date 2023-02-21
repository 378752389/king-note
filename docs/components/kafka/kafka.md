

## kafka实现延迟队列（供参考）

生产者发送消息到broker中，并附上需要延迟执行的时间， 消费者从broker中拉取消息，获取消息发送时间， 加上延迟执行时间，然后把消息放到延迟队列中执行。

> delayQueue 相关源码
> 
> https://www.cnblogs.com/dwlsxj/p/delayedQueue.html