---
title: pinpoint环境搭建
date: '2023-07-11 11:00:00'
categories:
  - 中间件
tags:
  - pinpoint
---


## hbase安装

### 单机部署， 使用自带的zk， 使用文件存储


修改 `conf/hbase-env.sh` 文件， 文件末尾添加如下内容
```shell
# 配置 java 环境变量
export JAVA_HOME=/root/services/jdk8

# 不使用 自带的 zk
export HBASE_MANAGES_ZK=false
```


修改`conf/hbase-site.xml`文件， 添加如下内容
```xml
<configuration>
    
<!--    如果为 false，表示 hbase单机允许， 依然会使用内部的zk-->
    <property>
        <name>hbase.cluster.distributed</name>
        <value>true</value>
    </property>

<!--    hbase数据存储的位置-->
    <property>
        <name>hbase.rootdir</name>
        <value>file:////root/data/hbase</value>
    </property>

<!--    zk 服务器的主机名 或 域名-->
    <property>
        <name>hbase.zookeeper.quorum</name>
        <value>localhost.localdomain</value>
    </property>

<!--    zk服务器的端口号-->
    <property>
        <name>hbase.zookeeper.property.clientPort</name>
        <value>2181</value>
    </property>
    
</configuration>

```

执行启动脚本
```shell
./bin/start-hbase.sh
```



## pinpoint下载

>官网部署教程： https://pinpoint-apm.gitbook.io/pinpoint/getting-started/installation#3.-pinpoint-collector


note： 请一定严格按照对应的版本下载，否则部署时会出现兼容问题； 此处选择的版本pinpoint为2.3.3， hbase版本为1.4.9

>版本兼容问题，查看官网： https://github.com/pinpoint-apm/pinpoint


1. hbase 环境安装好

执行hbase 初始化脚本， 安装数据表
```shell
/root/services/hbase-pinpoint/bin/hbase shell hbase-create.hbase
```

>脚本位置：https://github.com/pinpoint-apm/pinpoint/blob/master/hbase/scripts/hbase-create.hbase

2. 下在pinpoint依赖包
```shell

# collector 下载
wget https://github.com/pinpoint-apm/pinpoint/releases/download/v2.3.3/pinpoint-collector-boot-2.3.3.jar

# web 下载
wget https://github.com/pinpoint-apm/pinpoint/releases/download/v2.3.3/pinpoint-web-boot-2.3.3.jar

# 探针下载
wget https://github.com/pinpoint-apm/pinpoint/releases/download/v2.3.3/pinpoint-agent-2.3.3.tar.gz
```

3. agent和web部署

```shell

# 启动收集 项目
java -jar -Dpinpoint.zookeeper.address=localhost pinpoint-collector-boot-2.3.3.jar
# or
java -jar -Dspring.profiles.active=release -Dpinpoint.zookeeper.address=localhost -Dhbase.client.port=1234 pinpoint-collector-boot-2.3.3.jar
# 可以指定额外的配置， eg：eg： --spring.config.additional-location=/pinpoint/config/web.config，默认配置如下， 可以通过覆盖默认配置
# https://github.com/pinpoint-apm/pinpoint/blob/master/collector/src/main/resources/pinpoint-collector-root.properties
# https://github.com/pinpoint-apm/pinpoint/blob/master/collector/src/main/resources/profiles/local/pinpoint-collector-grpc.properties
# https://github.com/pinpoint-apm/pinpoint/blob/master/collector/src/main/resources/profiles/local/hbase.properties

# 启动web 项目
java -jar -Dpinpoint.zookeeper.address=localhost pinpoint-web-boot-2.3.3.jar
# 可以指定额外的配置， eg： --spring.config.additional-location=/pinpoint/config/web.config， 默认配置如下， 可以通过覆盖默认配置
# https://github.com/pinpoint-apm/pinpoint/blob/master/web/src/main/resources/pinpoint-web-root.properties
# https://github.com/pinpoint-apm/pinpoint/blob/master/web/src/main/resources/profiles/release/hbase.properties
```

4. 探针配置
```shell
tar -zxvf pinpoint-agent-2.3.3.tar.gz

# pinpoint 默认的profile为 release， 修改下面的配置文件
vim /pinpoint-agent-2.3.3/profiles/release/pinpoint.config
```

>如果需要指定其他profiles，项目启动时，添加如下参数:
>
> -Dpinpoint.profiler.profiles.active=release

修改如下内容：
```shell
profiler.collector.ip=[hbase 项目ip地址]
profiler.transport.grpc.collector.ip=[collector 项目ip地址]
```


5. 项目部署

```shell
java -javaagent:/pinpoint-agent-2.3.3/pinpoint-bootstrap-$VERSION.jar -Dpinpoint.agentId=test-service1 -Dpinpoint.applicationName=test-service -jar test-service.jar
```

>agentId 为服务实例的唯一标识， 用于区分同一服务不同实例； applicationName 为服务标识， 用于区别不同服务；