---
title: docker
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
docker login --username=transmorphme registry.cn-shenzhen.aliyuncs.com

# 从个人镜像仓库中拉取镜像
docker pull registry.cn-shenzhen.aliyuncs.com/wenking/centos:[镜像版本号]

# 从本地镜像仓库中推送镜像
docker tag [ImageId] registry.cn-shenzhen.aliyuncs.com/wenking/centos:[镜像版本号]
docker push registry.cn-shenzhen.aliyuncs.com/wenking/centos:[镜像版本号]
```


## dcker-compose

```shell
# 下载docker-compose 可执行二进制文件
# 地址： https://github.com/docker/compose/releases

sudo curl -L "https://github.com/docker/compose/releases/download/v2.2.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```



```yaml
version: '3'
services:
  gitaction-test:
      image: registry.cn-shenzhen.aliyuncs.com/wenking/helloworld:v1
      container_name: gitaction-helloworld
      restart: always
      ports:
        - 5080:8080
```

