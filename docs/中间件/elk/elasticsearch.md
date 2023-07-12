---
title: Elasticsearch环境搭建
date: 2023-07-11
categories:
  - 中间件
tags:
  - elasticsearch
  - elk
---

## elasticsearch集群搭建

默认情况下，每个节点都会自动分配一个唯一标识，用于管理

* data nodes - 存储数据并执行数据相关操作（搜索、聚合）
* master nodes - 负责集群范围的管理和配置操作 （添加、删除节点）
* client nodes - 将集群请求转发给主节点， 将数据相关请求转发给数据节点
* ingest nodes - 在索引之前预处理文档

### master节点配置

```yml
# 集群名称，三台集群，要配置相同的集群名称！！！
cluster.name: my-application
# 节点名称
node.name: node-1
# 是否有资格被选举为master，ES默认集群中第一台机器为主节点
node.master: true
# 是否存储数据
node.data: true
#最⼤集群节点数，为了避免脑裂，集群节点数最少为 半数+1
node.max_local_storage_nodes: 3
# 数据目录
path.data: /usr/local/node-1/data
# log目录
path.logs: /usr/local/node-1/logs
# 修改 network.host 为 0.0.0.0，表示对外开放，如对特定ip开放则改为指定ip
network.host: 0.0.0.0
# 设置对外服务http端口，默认为9200
http.port: 9200
# 内部节点之间沟通端⼝
transport.tcp.port: 9300
# 写⼊候选主节点的设备地址，在开启服务后可以被选为主节点
discovery.seed_hosts: [ "localhost:9300", "localhost:9301", "localhost:9302" ]
# 初始化⼀个新的集群时需要此配置来选举master
cluster.initial_master_nodes: [ "node-1", "node-2","node-3" ]
# 设置集群中N个节点启动时进行数据恢复，默认为1
gateway.recover_after_nodes: 3


# 下面的两个配置在安装elasticsearch-head的时候会用到
# 开启跨域访问支持，默认为false
http.cors.enabled: true
# 跨域访问允许的域名地址，(允许所有域名)以上使用正则
http.cors.allow-origin: "*"

#关闭xpack
xpack.security.enabled: false
```

### slave节点配置

```yml

# 集群名称，三台集群，要配置相同的集群名称！！！
cluster.name: my-application
# 节点名称
node.name: node-2
# 是否有资格被选举为master，ES默认集群中第一台机器为主节点
node.master: true
# 是否存储数据
node.data: true
#最⼤集群节点数，为了避免脑裂，集群节点数最少为 半数+1
node.max_local_storage_nodes: 3
# 数据目录
path.data: /usr/local/node-1/data
# log目录
path.logs: /usr/local/node-1/logs
# 修改 network.host 为 0.0.0.0，表示对外开放，如对特定ip开放则改为指定ip
network.host: 0.0.0.0
# 设置对外服务http端口，默认为9200
http.port: 9200
# 内部节点之间沟通端⼝
transport.tcp.port: 9300
# 写⼊候选主节点的设备地址，在开启服务后可以被选为主节点
discovery.seed_hosts: [ "192.168.73.66:9300", "192.168.73.66:9301", "192.168.73.66:9302" ]
# 初始化⼀个新的集群时需要此配置来选举master
cluster.initial_master_nodes: [ "node-1", "node-2","node-3" ]
# 设置集群中N个节点启动时进行数据恢复，默认为1
gateway.recover_after_nodes: 3


# 下面的两个配置在安装elasticsearch-head的时候会用到
# 开启跨域访问支持，默认为false
http.cors.enabled: true
# 跨域访问允许的域名地址，(允许所有域名)以上使用正则
http.cors.allow-origin: "*"

#关闭xpack
xpack.security.enabled: false
```

### 配置调整

#### 避免脑裂

脑裂： 集群中节点之间的**通信**由于网路故障，或者其中某个节点故障而失败。可能会有多个节点认为自己是主节点，从而导致数据不一致。为避免这一情况，
需要修改如下配置

```properties
# 确定需要多少票来选举主节点， 最佳配置数为： N/2 + 1
discovery.zen.minimum_master_nodes: 2
```

#### JVM堆调整

确保elasticsearch有足够的操作内存，建议最大和最小堆大小的值相同。根据经验，最大堆大小应设置为 RAM 的 50%

config/vm.options

```
-Xms2g
-Xmx2g
```

#### 禁用交换分区

换出未使用的内存是一种通用行为，但在 Elasticsearch 的上下文中可能会导致断开连接、性能不佳以及一般情况下 — 不稳定的集群。

可以选择禁用交换分区， 或者修改 配置文件内容：

```yaml
bootstrap.mlockall: true
```

#### 调整虚拟内存

为避免耗尽虚拟内存，需要增加对 mmap 计数的限制：

vim /etc/sysctl.conf

```properties
vm.max_map_count=262144
```

sysctl -p

#### 调整文件描述符限制

由于 Elasticsearch 使用了大量的文件描述符，您必须确保定义的限制足够，否则最终可能会丢失数据。

vim /etc/security/limits.conf

```
*               soft    nofile          65536
*               hard    nofile          65536
```

切换一下账号， 即可配置成功

### 启动集群

* 对每个集群实例， 执行命令： `elasticsearch\bin\elasticsearch`
* 验证：`http://localhost:9200/_cluster/state?pretty`

## 安全配置

* 生成证书： `bin/elasticsearch-certutil ca`

* 生成密钥： `bin/elasticsearch-certutil cert --ca ca.p12`

* 将凭证移动到config目录下， 并修改权限为
  755 `mkdir config/cert; mv cert.p12 ca.p12 config/cert/; chmod 755 cert.p12 ca.p12`

* 修改 `config/elasticsearch.yml`配置文件：

  ```yml
  http.cors.enabled: true
  http.cors.allow-origin: "*"
  http.cors.allow-headers: Authorization,X-Requested-With,Content-Type,Content-Length
  
  xpack.security.enabled: true
  xpack.security.authc.accept_default_password: true
  xpack.security.transport.ssl.enabled: true
  xpack.security.transport.ssl.verification_mode: certificate
  xpack.security.transport.ssl.keystore.path: 【es的安装路径】/config/cert/cert.p12
  xpack.security.transport.ssl.truststore.path: 【es的安装路径】/config/cert/cert.p12
  ```

* 每台集群节点上执行如下命令, 密码为创建证书输入内容

  ```shell
  bin/elasticsearch-keystore add xpack.security.transport.ssl.keystore.secure_password
  bin/elasticsearch-keystore add xpack.security.transport.ssl.truststore.secure_password
  
  # 初始化账户密码
  bin/elasticsearch-setup-passwords  interactive
  ```

elasticsearch_head 连接配置

```
http://192.168.1.129:9200/?auth_user=elastic&auth_password=123123
```



