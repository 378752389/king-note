---
title: Rabbitmq-整合SpringBoot
date: 2024-03-17
categories:
  - 中间件
tags:
  - rabbitmq
  - springboot
---

## producer 确认机制配置

```yml
spring:
  rabbitmq:
    publisher-confirm-type: correlated  # 开启发送方确认机制
    publisher-returns: true   # 开启消息返回
    template:
      mandatory: true     # 消息投递失败返回客户端
```


## consumer 可靠性配置

```yml
spring:
  rabbitmq:
    listener:
      simple:
        acknowledge-mode: auto  # 开启自动确认消费机制 manual
        retry:
          enabled: true # 开启消费者失败重试
          initial-interval: 5000ms # 初始失败等待时长为5秒
          multiplier: 1  # 失败的等待时长倍数（下次等待时长 = multiplier * 上次等待时间）
          max-attempts: 3 # 最大重试次数
          stateless: true # true无状态；false有状态（如果业务中包含事务，这里改为false）
```