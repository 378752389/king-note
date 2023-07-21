---
title: docker快速部署常见应用
date: 2023-07-19
categories:
  - 容器
tags:
  - docker
---

常见应用使用容器部署，方便开发和测试

<!-- more -->


:::warning
运行容器后需要开放对应的端口，linux下开放端口对应的命令如下
:::

```shell
firewall-cmd --zone=public --add-port=端口号/tcp --permanent

# 开放mysql的端口号
firewall-cmd --zone=public --add-port=3306/tcp --permanent
firewall-cmd --reload
```

## nginx

容器常用文件存放位置
```
日志文件位置：/var/log/nginx
配置文件位置: /etc/nginx
静态资源存放的位置: /usr/share/nginx/html
```

```shell
# 拉取 nginx 镜像
docker pull nginx

docker run -d -p 80:80 --name mynginx nginx
```



## mysql

容器常用文件存放位置
```
数据存放位置：/var/lib/mysql
```

```shell
# 拉取 mysql 镜像
docker pull mysql

# 参数解析
# -d 后台运行
# -p 主机端口3306映射到容器端口3306
# -e 设置环境变量 root用户的密码
# --name 设置容器名称
# -v 设置 docker managed volumn 卷
docker run -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=root --name mymysql -v /var/log/mysql -v /etc/mysql mysql


```

## redis

```shell
# 拉取 redis 镜像
docker pull redis

# 启动实例
docker run -d -p 6379:6379 --name myredis redis
```



## zookeeper

```shell
# 拉取 zookeeper 镜像
docker pull zookeeper

# 创建数据卷
docker volume create zk_vol

# 参数解析
# -e 设置环境变量 zk集群的唯一id
# -v zk挂载的卷，可以通过 docker inspect zookeeper 进行查看
docker run -d -p 2181:2181 --name myzk -e ZOO_MY_ID=1 -v zk_vol:/data -v zk_vol:/datalog -v zk_vol:/logs zookeeper
```



## kafka

```shell
# 拉取 kafka 镜像
# kafka 没有官方 镜像， 因此使用 star 数较高的 个人库
docker pull wurstmeister/kafka

# 参数解析
# --link 连接网络，本质就是在容器的 /etc/hosts文件中添加 被链接容器的容器名(myzk)，之后可以通过 ping 容器名(myzk) 进行访问
# KAFKA_ADVERTISED_HOST_NAME  发布到注册中心的地址，供其他客户端进行连接
# KAFKA_ADVERTISED_PORT  发布到注册中心的端口号，供其他客户端进行连接
docker run -d --name mykafka -p 9092:9092 \
--link myzk \
--env KAFKA_ZOOKEEPER_CONNECT=myzk:2181 \
--env KAFKA_ADVERTISED_HOST_NAME=宿主机ip \
--env KAFKA_ADVERTISED_PORT=9092  \
--env KAFKA_LOG_DIRS=/kafka/logs \
-v kafka_vol:/kafka  \
wurstmeister/kafka


docker run -d --name mykafka -p 9092:9092 \
--link myzk_v2 \
--env KAFKA_ZOOKEEPER_CONNECT=myzk_v2:2181 \
--env KAFKA_ADVERTISED_HOST_NAME=192.168.1.128 \
--env KAFKA_ADVERTISED_PORT=9092  \
--env KAFKA_LOG_DIRS=/kafka/logs \
-v kafka_vol:/kafka  \
wurstmeister/kafka
```



