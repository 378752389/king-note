---
title: Rabbitmq-Java客户端操作
date: 2024-03-17
categories:
  - 中间件
tags:
  - rabbitmq
---


```java
channel.queueDeclare("test", false, false, false, null);
```

参数解释：
- queue：队列名称， "test"
- durable: 是否为持久化队列。（持久化队列：服务器奔溃后重启后消息不会丢失）
- exclusive： 是否为独占队列。（独占队列：队列只在首次声明它的连接可见，在连接关闭时自动删除队列）。
  - 如果为 独占队列，那么一定不是持久化队列：当exclusive为true， durable设置为true 将不会生效
- autoDelete： 当最后一个消费值断开连接后（没有消费值订阅该队列），队列将会自动删除。
  - 前提声明队列后，必须有消费者连接过，然后断开连接才会自动删除，否则队列会一直存在，直到重启
- arguments： 设置额外的队列属性。eg：TTL、死信交换队列等


```java
channel.basicConsume(queueName, deliverCallback, cancelCallback);
```

参数解释：
- queue：队列名称
- autoAck：消费端自动确认消息。默认为false
- arguments：消费者消费传参
- deliverCallback：消息投递交换机回调
- cancelCallback：消息投递队列回调


## 服务质量保障Qos

> Qos开启在消费端， 并且必须关闭 autoAck（自动确认）功能

默认情况下，broker 收到 producer 发送的消息后，将会投递给 consumer，而投递给 consumer 时可能 consumer的处理速度跟不上 producer，
导致大量消息阻塞到 consumer 缓存中，最终可能导出 oom 问题。

每个 consumer 都有一个 消费缓冲区，缓冲区的大小就是 prefetch，每当收到一条消息，broker会把消息推送到 consumer 的缓冲区中。
当 consumer 的缓冲区满时，将进行阻塞，否则进行投递。



prefetch： 单一消费者最多能消费的 `unacked message`数目。


```java
/**
* prefetchSize:可以预取的消息总大小，如果没有限制，则为0
* prefetchCount:服务器每次传递的最大消息数，如果没有限制，则为0；
* global:如果为true,则当前设置将会应用于整个Channel(频道)
**/ 
void basicQos(int prefetchSize, int prefetchCount, boolean global)
```


```java
// 开启 qos，前提消费值 第二个参数 autoAck 必须设置为 false
channel.basicQos(10);
channel.basicConsume(queueName, false, deliverCallback, cancelCallback);
```

:::tip
一个 channel 可以 创建多个 consumer，一个 consumer 可以类比为一个回掉函数
:::


```java
void basicAck(long deliveryTag, boolean multiple)
```

- deliveryTag: broker消息唯一标识
- multiple: 是否为批处理， 为true， 则标识 ack 所有 小于等于 deliveryTag 的消息。


## 延迟消息（死信队列）

rabbitmq 延迟消息是基于死信队列实现的，首先定义一个普通消息队列，配置相关死信队列参数， 生产者发送的消息都往该队列发送，
然后定义一个死信队列，当普通消息经过超时时间后任未处理，将发送死信队列中。

```java
Map<String, Object> arguments = new HashMap<>();
arguments.put("x-dead-letter-exchange", "");  // 绑定死信队列交换机
arguments.put("x-dead-letter-routing-key", "dead-test2"); // 绑定死信队列路由键
arguments.put("x-message-ttl", 5000);  // 过期时间，及延迟时间
// 普通队列
channel.queueDeclare("test2", false, false, false, arguments);

// 死信队列
channel.queueDeclare("dead-test2", false, false, false, null);
```