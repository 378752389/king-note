---
title: docker进阶
date: 2023-07-19
categories:
  - 容器
tags:
  - docker
---

## `/var/run/docker.sock`文件作用

:::tip

首先docker是基于cs架构的，我们shell中输入的命令，最终会被 Docker daemon解析并执行，默认情况下，Docker daemon监听的套接字为 `/var/run/docker.sock`，我们可以通过如下命令进行查看和配置：`/usr/lib/systemd/system/docker.socket`；`/var/run`是`/run`的软连接

:::

![docker.sock文件配置位置](https://raw.githubusercontent.com/378752389/image-bed/main/king-note/docker.sock%E7%9A%84%E8%BD%AF%E8%BF%9E%E6%8E%A5%E9%85%8D%E7%BD%AE%E4%BD%8D%E7%BD%AE.png)



有时候我们的容器需要和`Docker daemon`进行通信，比如使用 portainer 进行容器管理，此时我们是通过浏览器操作和`portainer`容器进行通信的，而`portainer`容器则通过 `/var/run/docker.sock`和 `Docker daemon`进行通信， 最终，命令被 `Docker daemon`所执行。


## cgroup

linux系统对进程资源限额配置，目录位置为`/sys/fs/cgroup/`

* cpu: `/sys/fs/cgroup/cpu`
* memory: `/sys/fs/cgroup/memory`
* block io: `/sys/fs/cgroup/blkio`