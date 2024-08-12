---
title: docker常用命令
date: 2023-07-11
categories:
  - 容器
tags:
  - docker
---

## 容器启动命令
```shell
# 进入容器
docker exec -it [容器id] /bin/bash

# 启动容器
docker run -d -p 8080:80 --name myredis redis 

# 强烈建议创建具名卷存储数据中间件：redis、mysql等
# 默认情况下 启动 redis服务的时候如果我们没有用 -v 命令指定容器挂载目录时，都会在 /var/lib/docker/volumes 目录下创建一个随机字符串的目录存放容器运行时保存的数据，
# 此时如果我们不小心把容器删除了，我们可能需要一个一个的到 /var/lib/docker/volumes 去找容器数据，而我们创建具名卷后 则可以更好的确认卷的用途，之后重启容器指定该卷数据任然存在
# 具体镜像暴露出来的卷可以通过 docker inspect 镜像名 进行查看
# -v 宿主机路径:容器路径
docker volumn create redis_vol
docker run -d -p 6379:6379 --name myredis -v redis_vol:/data redis

# docker 重启容器， 运行此命令我们不需要重新 输入容器启动参数，他会使用第一次的参数 
# restart : stop + start
docker restart/start [容器id]

# 暂停和恢复 容器
docker pause [容器id]
docker unpause [容器id]
```

## 容器和宿主机文件传输
```shell
# 从容器里面拷文件到宿主机  前：容器文件路径  后：宿主机路径
docker cp 容器ID/容器名:容器文件路径 宿主机文件路径

# 从宿主机拷文件到容器里面  前：宿主机文件路径 后：容器路径
docker cp 宿主机文件路径 容器ID/容器名:容器文件路径

# 从容器`mynginx`里面拷文件到宿主机  前：容器文件路径  后：宿主机路径
docker cp mynginx:/etc/nginx .

# 从宿主机拷文件到容器`mynginx`里面  前：宿主机文件路径 后：容器路径
docker cp nginx mynginx:/etc/nginx
```

## 容器管理命令

```shell
# 查看下载镜像
docker images

#  查看正在运行的容器
# -a 查看所用启动的容器
docker ps -a

# 查看容器、镜像内容
docker inspect [容器id]/[镜像id]

# 给某个镜像打上标签
docker tag [镜像id] [tagName]
```



## 关联阿里云镜像仓库

```shell
# 登录个人的镜像仓库
docker login --username=用户名 registry.cn-shenzhen.aliyuncs.com

# 从个人镜像仓库中拉取镜像
docker pull registry.cn-shenzhen.aliyuncs.com/wenking/centos:[镜像版本号]

# 从本地镜像仓库中推送镜像
docker tag [ImageId] registry.cn-shenzhen.aliyuncs.com/wenking/centos:[镜像版本号]
docker push registry.cn-shenzhen.aliyuncs.com/wenking/centos:[镜像版本号]
```