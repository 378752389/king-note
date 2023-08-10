---
title: Kafka消费者JavaAPI
date: 2023-08-10
categories:
  - 中间件
tags:
  - kafka
---


## 消费者基本配置

```java
public class KafkaConsumerTest {

    public static void main(String[] args) {
        Properties properties = new Properties();

        properties.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, "192.168.1.128:9092");
        properties.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class.getName());
        properties.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class.getName());
        
     	// 必须指定消费者组
        properties.put(ConsumerConfig.GROUP_ID_CONFIG, "consumer-1");


        KafkaConsumer<String, String> consumer = new KafkaConsumer<>(properties);

        // 订阅主题
        List<String> topics = new ArrayList<>();
        topics.add("test");
        consumer.subscribe(topics);

        while (true) {
            // 每隔一秒拉取一个批次
            ConsumerRecords<String, String> batchRecords = consumer.poll(Duration.ofSeconds(1));
            for (ConsumerRecord<String, String> record : batchRecords) {
                System.out.println(record);
            }
        }
    }
}
```

## 消费指定分区配置

```java
// 订阅主题改为订阅主题分区
List<TopicPartition> partitions = new ArrayList<>();
TopicPartition partition = new TopicPartition("test", 0);
partitions.add(partition);
consumer.assign(partitions);
```

## 分区分配和再平衡

作用：确定消费者消费哪个partition的数据

partition.assignment.strategy指定分区的分配策略，默认策略是 Range + CooperativeSticky。

* Range
* RoundRobin
* Sticky
* CooperativeSticky

触发再平衡方式：

* 默认情况下消费者每隔3s和coordinator保持心跳，一旦超时(session.timeout.ms=45s)，该消费者会被移除，触发再平衡；
* 消费者处理消息时间过长(max.poll.interval.ms=5m)，也会触发再平衡；

分区再分配日志信息

```
[main] 2023-08-10 10:28:19.772 INFO  o.a.k.c.c.i.ConsumerCoordinator - [Consumer clientId=consumer-c-group-1, groupId=c-group] Request joining group due to: group is already rebalancing 
[main] 2023-08-10 10:28:19.775 INFO  o.a.k.c.c.i.ConsumerCoordinator - [Consumer clientId=consumer-c-group-1, groupId=c-group] Revoke previously assigned partitions test-1, test-0 
[main] 2023-08-10 10:28:19.775 INFO  o.a.k.c.c.i.ConsumerCoordinator - [Consumer clientId=consumer-c-group-1, groupId=c-group] (Re-)joining group 
[main] 2023-08-10 10:28:19.779 INFO  o.a.k.c.c.i.ConsumerCoordinator - [Consumer clientId=consumer-c-group-1, groupId=c-group] Successfully joined group with generation Generation{generationId=8, memberId='consumer-c-group-1-a6520723-e869-44ca-9b19-8575617d4a7d', protocol='range'} 
[main] 2023-08-10 10:28:19.784 INFO  o.a.k.c.c.i.ConsumerCoordinator - [Consumer clientId=consumer-c-group-1, groupId=c-group] Successfully synced group in generation Generation{generationId=8, memberId='consumer-c-group-1-a6520723-e869-44ca-9b19-8575617d4a7d', protocol='range'} 
[main] 2023-08-10 10:28:19.786 INFO  o.a.k.c.c.i.ConsumerCoordinator - [Consumer clientId=consumer-c-group-1, groupId=c-group] Notifying assignor about the new Assignment(partitions=[test-1]) 
[main] 2023-08-10 10:28:19.786 INFO  o.a.k.c.c.i.ConsumerCoordinator - [Consumer clientId=consumer-c-group-1, groupId=c-group] Adding newly assigned partitions: test-1 
[main] 2023-08-10 10:28:19.793 INFO  o.a.k.c.c.i.ConsumerCoordinator - [Consumer clientId=consumer-c-group-1, groupId=c-group] Setting offset for partition test-1 to the committed offset FetchPosition{offset=85, offsetEpoch=Optional[0], currentLeader=LeaderAndEpoch{leader=Optional[192.168.1.128:9092 (id: 0 rack: null)], epoch=0}} 

```

> * Revoke previously assigned partitions test-1, test-0 , 之前消费者消费分区包含 0, 1
>* protocol='range': 消费者分区分配方式
>* Adding newly assigned partitions: test-1 ， 重新分配分区包含 1

### range

定义：首先对同一个topic里面的分区按照序列号进行排序，对消费者按照字母进行排序，然后通过 partition号 / consumer号
来决定消费者消费第几个分区。如果除不尽，那么靠前的消费者将多消耗一个分区。

```

```

问题：如果消费组订阅了多个主题，并且这些主题数并不能被分区数整除，那么可能前几个消费者的负载将非常高，应为多个topic都将多一个partition给靠前的消费者。

### roundrobin

针对集群中所有的topic，把所有partition和所有consumer都列出来，然后按照hashcode进行排序，最后通过轮询算法分配partition给各个消费者。

```

```

### sticky

定义：类似range，消费者消费分区并不一定是固定顺序的，而是随机的。

## 自动提交offset

* enable.auto.commit: 是否开启自动提交offset功能，默认开启
* auto.commit.interval.ms: 自动提交offset的时间间隔，默认是5s

```java
properties.put(ConsumerConfig.ENABLE_AUTO_COMMIT_CONFIG, true);
properties.put(ConsumerConfig.AUTO_COMMIT_INTERVAL_MS_CONFIG, 1000);
```

## offset配置

* auto.offset.reset： latest | earliest | none

> latest: 如果消费者组offset存在，则从offset开始消费，不存在，则从最近处开始消费
>
>earliest：如果消费者组offset存在，则从offset开始消费，不存在，则从头开始消费
>
>none：如果消费者组offset存在，则从offset开始消费，不存在，则抛异常

```java
properties.put(ConsumerConfig.AUTO_OFFSET_RESET_CONFIG, "earliest");
```

## 获取指定分区offset

```java
TopicPartition partition = new TopicPartition("test", 2);

long position = consumer.position(partition);
log.info(position);
```

## 手动提交offset

### 同步提交

```java
properties.put(ConsumerConfig.ENABLE_AUTO_COMMIT_CONFIG, false);

consumer.subscribe(Collections.singleton("test"));

while (true) {
    ConsumerRecords<String, String> records = consumer.poll(Duration.ofSeconds(1));

    for (ConsumerRecord<String, String> record : records) {
        log.info(record.toString());
    }
    
     // 手动提交 offset， 对拉取的批次数据进行提交
    consumer.commitSync();
}
```

### 异步提交

```java
properties.put(ConsumerConfig.ENABLE_AUTO_COMMIT_CONFIG, false);

consumer.subscribe(Collections.singleton("test"));

while (true) {
    ConsumerRecords<String, String> records = consumer.poll(Duration.ofSeconds(1));

    for (ConsumerRecord<String, String> record : records) {
        log.info(record.toString());
    }
    
    // 手动提交 offset， 对拉取的批次数据进行提交
    consumer.commitAsync();
}
```

### 对单条记录进行提交

```java
properties.put(ConsumerConfig.ENABLE_AUTO_COMMIT_CONFIG, false);

while (true) {
    ConsumerRecords<String, String> records = consumer.poll(Duration.ofSeconds(1));
    for (ConsumerRecord<String, String> record : records) {
        System.out.println(record);

        if (record.offset() == 10) {
            consumer.close();
            return;
        }

        // 根据记录信息 进行同步提交
        Map<TopicPartition, OffsetAndMetadata> meta = new HashMap<>();
        meta.put(new TopicPartition(record.topic(), record.partition()),
                 new OffsetAndMetadata(record.offset()));

        consumer.commitSync(meta);
    }

}
```

## 指定offset消费

```java
// 拿到所有的分区信息
Set<TopicPartition> assignments = consumer.assignment();

// 保障分区方案已经制定完毕： 确保消费者组初始化完成
while (assignments.size() == 0) {
    consumer.poll(Duration.ofSeconds(1));
    assignments = consumer.assignment();
}

// 遍历所有分区，然后每个分区的偏移量设置为100， 从100 这个偏移量开始消费
for (TopicPartition partition : assignments) {
    consumer.seek(partition, 100);
}

while (true) {
    ConsumerRecords<String, String> records = consumer.poll(Duration.ofSeconds(1));

    for (ConsumerRecord<String, String> record : records) {
        log.info(record.toString());
    }
}
```

## 指定时间消费

```java
List<TopicPartition> partitions = new ArrayList<>();

// 指定消费分区
TopicPartition partition = new TopicPartition("test", 2);
partitions.add(partition);
consumer.assign(partitions);

// 拿到所有的分区信息
Set<TopicPartition> assignments = consumer.assignment();

// 保障分区方案已经制定完毕
while (assignments.size() == 0) {
    consumer.poll(Duration.ofSeconds(1));
    assignments = consumer.assignment();
}

Map<TopicPartition, Long> map = new HashMap<>();
// 初始化集合，指定分区和对应时间关系
for (TopicPartition partition : assignments) {
    map.put(partition, System.currentTimeMillis() - 24 * 60 * 60 * 1000);
}
Map<TopicPartition, OffsetAndTimestamp> tfmap = consumer.offsetsForTimes(map);

for (TopicPartition partition : assignments) {
    OffsetAndTimestamp offsetAndTimestamp = tfmap.get(partition);
    consumer.seek(partition, offsetAndTimestamp.offset());
}

```



