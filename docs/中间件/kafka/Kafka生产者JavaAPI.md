---
title: Kafka生产者JavaAPI
date: 2023-08-08
categories:
  - 中间件
tags:
  - kafka
---

## 生产者基本配置

```java
public class KafkaProducerTest {

    public static void main(String[] args) {
        Properties properties = new Properties();

        properties.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, "192.168.1.128:9092");
        properties.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class.getName());
        properties.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, StringSerializer.class.getName());

        KafkaProducer<String, String> producer = new KafkaProducer<>(properties);

        producer.send(new ProducerRecord<>("topic1", "hello"));

        producer.close();
    }
}
```

## 同步发送

```java
producer.send(new ProducerRecord<>("topic1", "hello")).get();
```


## 异步回调发送

```java
producer.send(new ProducerRecord<>("topic1", "hello"), new Callback() {
    @Override
    public void onCompletion(RecordMetadata metadata, Exception exception) {
        if (exception == null) {
            System.out.println("主题: " + metadata.topic() + "  分区: " + metadata.partition());
        }
    }
});
```


## 分区器

producer发送 拦截器 序列化器 分区器

分区器优点：

1. 便于合理使用存储资源，把海量数据切割分布在多台服务器上
2. 提高并行度

粘性分区：选择一个分区，并尽可能的一直使用该分区，直到该分区的batch已满，kafka在随机选取一个和上次不同的分区进行使用。

自定义分区器

```java
public class MyPartition implements Partitioner {
    
    @Override
    public int partition(String topic, Object key, byte[] keyBytes, Object value, byte[] valueBytes, Cluster cluster) {
        String s = value.toString();
        int partition;
        if (s.contains("学习")) {
            partition = 0;
        } else {
            partition = 1;
        }
        return partition;
    }

    @Override
    public void close() {

    }

    @Override
    public void configure(Map<String, ?> configs) {

    }
}
```

注册分区器

```java
properties.put(ProducerConfig.PARTITIONER_CLASS_CONFIG, MyPartition.class.getName());
```

## 提高发送效率

**提高发送效率**

* buffer.memory: 发送缓冲区大小
* batch.size: 数据量达到后才会发送数据，默认16k；推荐32k
* linger.ms: 等待指定量后发送数据，默认0； 推荐 0-100ms
* compression.type: snappy

```java
// 配置kafka发送缓冲区大小为32m
properties.put(ProducerConfig.BUFFER_MEMORY_CONFIG, 33554432);

// 配置kafka发送批次大小
properties.put(ProducerConfig.BATCH_SIZE_CONFIG, 16384);

// 间隔多少秒传输一次
properties.put(ProducerConfig.LINGER_MS_CONFIG, 1);

// 压缩类型
properties.put(ProducerConfig.COMPRESSION_TYPE_CONFIG, "snappy");
```

## 生产者数据可靠性

```java
// 确认类型配置
properties.put(ProducerConfig.ACKS_CONFIG, "1");

// 重试次数配置
properties.put(ProducerConfig.RETRIES_CONFIG, 3);
```

Leader维护了一个动态的ISR集合，即和Leader保持同步的Follower集合，如果Follower长时间未发送ack给leader，则将follower提出去。该时间长度默认30s，通过`replica.lag.time.max.ms`
参数配置

正真的可靠性保证： ACK设置-1，分区副本大于2，并且ISR的最小副本数量大于等于2

* 至少一次：ACK设置-1，分区副本大于2，并且ISR的最小副本数量大于等于2
* 最多一次：ACK设置为0
* 精确一次：幂等性 + （ACK设置-1，分区副本大于2，并且ISR的最小副本数量大于等于2）

重复数据判断标准：具有和<PID, Partition, SeqNumber>相同的消息，提交时都只会持久化一次；PID表示生产者每次重启都会唯一分配一个；Partition表示分区号；Sequence
Number是单调递增的； 所以幂等性只能保证单分区单会话内不重复。

```java
// 开启幂等性， 默认开启的
properties.put(ProducerConfig.ENABLE_IDEMPOTENCE_CONFIG, true);
```



