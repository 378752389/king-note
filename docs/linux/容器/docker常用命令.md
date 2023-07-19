---
title: docker常用命令
date: 2023-07-11
categories:
  - 容器
tags:
  - docker
---

## 命令
```shell
# 进入容器
docker exec -it [容器id] /bin/bash

# 给某个镜像打上标签
docker tag [容器id] [tagName]

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