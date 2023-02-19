---
title: Kafka
---

### 导入依赖

```xml
<dependency>
    <groupId>org.springframework.kafka</groupId>
    <artifactId>spring-kafka</artifactId>
</dependency>
```





### 修改配置文件

```yml
spring:
  kafka:
  	bootstrap-servers: localhost:9092
    # bootstrap-servers: 192.168.211.130:9092,192.168.211.130:9093,192.168.211.130:9094
    producer: # producer 生产者
      retries: 0 # 重试次数
      acks: 1 # 应答级别:多少个分区副本备份完成时向生产者发送ack确认(可选0、1、all/-1)
      batch-size: 16384 # 批量大小
      buffer-memory: 33554432 # 生产端缓冲区大小
      key-serializer: org.apache.kafka.common.serialization.StringSerializer
      value-serializer: org.apache.kafka.common.serialization.StringSerializer
    consumer: # consumer消费者
      group-id: mentugroup # 默认的消费组ID
      enable-auto-commit: true # 是否自动提交offset
      auto-commit-interval: 100  # 提交offset延时(接收到消息后多久提交offset)
      # earliest:当各分区下有已提交的offset时，从提交的offset开始消费；无提交的offset时，从头开始消费, 默认值
      # latest:当各分区下有已提交的offset时，从提交的offset开始消费；无提交的offset时，消费新产生的该分区下的数据
      # none:topic各分区都存在已提交的offset时，从offset后开始消费；只要有一个分区不存在已提交的offset，则抛出异常
      auto-offset-reset: latest
      key-deserializer: org.apache.kafka.common.serialization.StringDeserializer
      value-deserializer: org.apache.kafka.common.serialization.StringDeserializer
```





### 生产者

```java
@Component
public class Producer implements InitializingBean {
    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    @Override
    public void afterPropertiesSet() {
        new Thread(()-> {
            while (true) {
                try {
                    Thread.sleep(1000);
                    kafkaTemplate.send("TEST", "this is a test data");
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }).start();
    }
}
```





### 消费者

```java
@Component
@Slf4j
public class Consumer {

    @KafkaListener(topics = "TEST", groupId = "test_group")
    public void test(ConsumerRecord<String, String> record) {
        String topic = record.topic();
        String value = record.value();

        log.info("topic: {}, value: {}", topic, value);

    }
}
```

