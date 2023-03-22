---
title: seata 部署
permalink: /linux/deploy/seata
---

## 概述

一、seata 中角色分为 TC、TM、RM， TC（server）为单独服务端部署， TM和RM（client）由业务系统集成

* client：存放client端sql脚本 (包含 undo_log表) ，参数配置
* config-center：各个配置中心参数导入脚本，config.txt(包含server和client，原名nacos-config.txt)为通用参数文件
* server：server端数据库脚本 (包含 lock_table、branch_table 与 global_table) 及各个容器配置

> 资源脚本位置： https://github.com/seata/seata/tree/master/script

二、Seata TC Server 目前有三种存储模式

* file模式： 适合单机部署，全局事务会话信息在内存中读写，并持久化本地文件 root.data, 效率较高
* db模式： 适合集群部署，全局事务会话信息通过db共享
* redis模式： 性能较高,存在事务信息丢失风险,请提前配置合适当前场景的redis持久化配置.

三、客户端配置注意事项：

* seata-spring-boot-starter

  内置GlobalTransactionScanner自动初始化功能，若外部实现初始化，请参考SeataAutoConfiguration保证依赖加载顺序
  默认开启数据源自动代理，可配置seata.enable-auto-data-source-proxy: false关闭
* spring-cloud-starter-alibaba-seata

  2.1.0内嵌seata-all 0.7.1，2.1.1内嵌seata-all 0.9.0，2.2.0内嵌seata-spring-boot-starter 1.0.0, 2.2.1内嵌seata-spring-boot-starter
  1.1.0

四、为什么需要分布式事务

* 如果 A 调用 B ，C 之前报错，A 被事务回滚 ，B ，C 没有调用， 这没问题。
* 如果是 A 调用 了 B，C 以后 A 抛出异常， 那么 A 回滚了 ，B ，C 执行了 就提交了。 数据 不一致了
* 如果 A 调用 B ，然后调用 C ，C 报错了 ，C 回滚，C 调用异常 被 A 感知，A 也会回滚，B 执行完就自己提交了，不会跟着一起回滚，数据不一致。
* 如果 A 调用 B， B 处理了请求， 然后返回时超时了，A 超时异常， 进行回滚， 但 B 已经执行完提交了， 数据 不一致了

五、seata事务流程

1. 在有注解`@GlobalTransactional`方法上的服务A开启全局事务，向TC注册TM事务，TC返回XID
2. TM携带XID调用服务B
3. 服务B携带XID注册分支事务BID
4. 事务执行成功，提交事务，通知TC，并且记录回滚记录写入数据库； 如果事务执行失败，事务回滚，也会通知TC
5. TM携带XID调用服务C
6. 服务C携带XID注册分支事务BID
7. 事务执行成功，提交事务，通知TC，并且记录回滚记录写入数据库； 如果事务执行失败，事务回滚，也会通知TC
8. 方法调用成功，TM通知TC； 方法调用失败，TM也会通知TC
9. 如果方法调用失败，TC通知各个分支事务进行回滚

同时seata中还提供了4个定时线程池，检测是否有： 超时事务、异步提交事务、回滚重试事务、重试提交事务

如果发现了有这四类事务，则从全局事务中获取所有的分支事务，分别调用各个分支事务完成对应的操作，依次来确保事务的一致性。

> springcloud版本依赖关系： https://github.com/alibaba/spring-cloud-alibaba/wiki/%E7%89%88%E6%9C%AC%E8%AF%B4%E6%98%8E

# 部署

## 准备工作

1. 下载 seata 对应版本的软件包， 下载地址： https://github.com/seata/seata/tags

2. 上传软件包并解压目录

> 区别：
>
> 1.5及以上的版本： 配置文件为 conf 目录下的 application.yml
>
> 1.5一下的版本： 配置文件为 conf 下的 file.conf 和 registry.conf

## 单机部署

### file模式部署

1. file 模式 TC 无需修改，直接启动即可， 启动方式如下

* 1.5及以上 启动脚本：

```shell
seata-server.sh -h 127.0.0.1 -p 8091 -m db
```

* 1.5以下 启动脚本：

```shell
seata-server.sh -h 127.0.0.1 -p 8091 -m db -n 1 -e test
```

> -e： 多环境配置； -n： 服务节点，多个节点需要进行区分，用于生成不同节点区间的transactionid，避免冲突

2. 客户端进行如下配置

```yaml
seata:
  service:
    grouplist:
      default: localhost:8091
    vgroup-mapping:
      shop-tx-group: default
  tx-service-group: shop-tx-group
```

> seata.tx-service-group: 事务组，多个关联服务可以共用一个事务组；
>
> seata.service.vgroup-mapping: 事务组到seata集群之间的映射， seata默认集群为 default， 可以在TC端进行配置
>
> seata.service.grouplist: seata集群服务列表，该配置只对注册中心为file模式有效， 其他模式从配置中心读取

3. 客户端执行如下sql脚本

```sql
-- for AT mode you must to init this sql for you business database. the seata server not need it.
CREATE TABLE IF NOT EXISTS `undo_log`
(
    `branch_id`     BIGINT       NOT NULL COMMENT 'branch transaction id',
    `xid`           VARCHAR(128) NOT NULL COMMENT 'global transaction id',
    `context`       VARCHAR(128) NOT NULL COMMENT 'undo_log context,such as serialization',
    `rollback_info` LONGBLOB     NOT NULL COMMENT 'rollback info',
    `log_status`    INT(11)      NOT NULL COMMENT '0:normal status,1:defense status',
    `log_created`   DATETIME(6)  NOT NULL COMMENT 'create datetime',
    `log_modified`  DATETIME(6)  NOT NULL COMMENT 'modify datetime',
    UNIQUE KEY `ux_undo_log` (`xid`, `branch_id`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 1
  DEFAULT CHARSET = utf8mb4 COMMENT ='AT transaction mode undo table';
```

**注意**

* 当我们导入的是 `spring-boot-starter-seata` 依赖时， 在进行跨服务调用是不会开启分布式事务的，因为TM默认在 发起http请求时，是不会发送xid，因此传递 xid 逻辑需要我们自己实现。

通常情况下，我们会在发送请求时进行请求拦截，并通过将xid的内容设置到请求头中，实现如下

```
String xid = RootContext.getXID();
if(xid != null) {
    requestTemplate.header(RootContext.getXID(), xid);
}
```

同时，在接收方需要进行请求过滤，如果请求头中包含xid，需要提取出来，并设置到上下文中

```
HttpServletRequest req = (javax.servlet.http.HttpServletRequest) request;
String xid = req.getHeader(RootContext.KEY_XID.toLowerCase());
boolean isBind = false;
if (StringUtils.isNotBlank(xid)) {
    RootContext.bind(xid);
    isBind = true;
}
try {
    chain.doFilter(request, response);
} finally {
    if (isBind) {
        RootContext.unbind();
    }
}
```

* 当我们导入的是 `spring-cloud-starter-seata` 依赖时, seata已经为我们封装了xid传递逻辑，因此可以直接调用

## 集群部署

Seata 的高可用依赖于注册中心、配置中心和数据库来实现

本次集群部署数据库采用mysql、注册中心使用nacos，配置中心也使用nacos

1. 创建服务端数据库, 并执行如下脚本

```sql
-- -------------------------------- The script used when storeMode is 'db' --------------------------------
-- the table to store GlobalSession data
CREATE TABLE IF NOT EXISTS `global_table`
(
  `xid`                       VARCHAR(128) NOT NULL,
  `transaction_id`            BIGINT,
  `status`                    TINYINT      NOT NULL,
  `application_id`            VARCHAR(32),
  `transaction_service_group` VARCHAR(32),
  `transaction_name`          VARCHAR(128),
  `timeout`                   INT,
  `begin_time`                BIGINT,
  `application_data`          VARCHAR(2000),
  `gmt_create`                DATETIME,
  `gmt_modified`              DATETIME,
  PRIMARY KEY (`xid`),
  KEY `idx_status_gmt_modified` (`status` , `gmt_modified`),
  KEY `idx_transaction_id` (`transaction_id`)
  ) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

-- the table to store BranchSession data
CREATE TABLE IF NOT EXISTS `branch_table`
(
  `branch_id`         BIGINT       NOT NULL,
  `xid`               VARCHAR(128) NOT NULL,
  `transaction_id`    BIGINT,
  `resource_group_id` VARCHAR(32),
  `resource_id`       VARCHAR(256),
  `branch_type`       VARCHAR(8),
  `status`            TINYINT,
  `client_id`         VARCHAR(64),
  `application_data`  VARCHAR(2000),
  `gmt_create`        DATETIME(6),
  `gmt_modified`      DATETIME(6),
  PRIMARY KEY (`branch_id`),
  KEY `idx_xid` (`xid`)
  ) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

-- the table to store lock data
CREATE TABLE IF NOT EXISTS `lock_table`
(
  `row_key`        VARCHAR(128) NOT NULL,
  `xid`            VARCHAR(128),
  `transaction_id` BIGINT,
  `branch_id`      BIGINT       NOT NULL,
  `resource_id`    VARCHAR(256),
  `table_name`     VARCHAR(32),
  `pk`             VARCHAR(36),
  `status`         TINYINT      NOT NULL DEFAULT '0' COMMENT '0:locked ,1:rollbacking',
  `gmt_create`     DATETIME,
  `gmt_modified`   DATETIME,
  PRIMARY KEY (`row_key`),
  KEY `idx_status` (`status`),
  KEY `idx_branch_id` (`branch_id`),
  KEY `idx_xid` (`xid`)
  ) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

CREATE TABLE IF NOT EXISTS `distributed_lock`
(
  `lock_key`       CHAR(20) NOT NULL,
  `lock_value`     VARCHAR(20) NOT NULL,
  `expire`         BIGINT,
  primary key (`lock_key`)
  ) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

INSERT INTO `distributed_lock` (lock_key, lock_value, expire) VALUES ('AsyncCommitting', ' ', 0);
INSERT INTO `distributed_lock` (lock_key, lock_value, expire) VALUES ('RetryCommitting', ' ', 0);
INSERT INTO `distributed_lock` (lock_key, lock_value, expire) VALUES ('RetryRollbacking', ' ', 0);
INSERT INTO `distributed_lock` (lock_key, lock_value, expire) VALUES ('TxTimeoutCheck', ' ', 0);
```

2. 启动配置中心和注册中心，此处采用nacos， nacos配置请参考。。。


3. 修改seata TC 配置文件，修改配置后的内容如下：
``` yaml {41-48,55-64,71-86}
#  Copyright 1999-2019 Seata.io Group.
#
#  Licensed under the Apache License, Version 2.0 (the "License");
#  you may not use this file except in compliance with the License.
#  You may obtain a copy of the License at
#
#  http://www.apache.org/licenses/LICENSE-2.0
#
#  Unless required by applicable law or agreed to in writing, software
#  distributed under the License is distributed on an "AS IS" BASIS,
#  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#  See the License for the specific language governing permissions and
#  limitations under the License.

server:
  port: 7091

spring:
  application:
    name: seata-server

logging:
  config: classpath:logback-spring.xml
  file:
    path: ${user.home}/logs/seata
  extend:
    logstash-appender:
      destination: 127.0.0.1:4560
    kafka-appender:
      bootstrap-servers: 127.0.0.1:9092
      topic: logback_to_logstash

console:
  user:
    username: seata
    password: seata

seata:
  config:
    # support: nacos, consul, apollo, zk, etcd3
    type: nacos
    nacos:
      server-addr: 192.168.1.125:8848
      namespace:
      group: SEATA_GROUP
      username: nacos
      password: nacos
      context-path:
      ##if use MSE Nacos with auth, mutex with username/password attribute
      #      #access-key:
      #            #secret-key:
      #                  data-id: seataServer.properties
  registry:
    # support: nacos, eureka, redis, zk, consul, etcd3, sofa
    type: nacos
    nacos:
      application: seata-server
      server-addr: 192.168.1.125:8848
      group: SEATA_GROUP
      namespace:
      cluster: default
      username: nacos
      password: nacos
      context-path:
      ##if use MSE Nacos with auth, mutex with username/password attribute
      #      #access-key:
      #            #secret-key:
      #
  store:
    # support: file 、 db 、 redis
    mode: db
    db:
      datasource: druid
      db-type: mysql
      driver-class-name: com.mysql.jdbc.Driver
      url: jdbc:mysql://192.168.1.125:3306/seata?rewriteBatchedStatements=true
      user: root
      password: root
      min-conn: 10
      max-conn: 100
      global-table: global_table
      branch-table: branch_table
      lock-table: lock_table
      distributed-lock-table: distributed_lock
      query-limit: 1000
      max-wait: 5000

  #  server:
  #    service-port: 8091 #If not configured, the default is '${server.port} + 1000'
  security:
    secretKey: SeataSecretKey0c382ef121d778043159209298fd40bf3850a017
    tokenValidityInMilliseconds: 1800000
    ignore:
      urls: /,/**/*.css,/**/*.js,/**/*.html,/**/*.map,/**/*.svg,/**/*.png,/**/*.ico,/console-fe/public/**,/api/v1/auth/login
```

