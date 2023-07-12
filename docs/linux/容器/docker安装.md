---
title: cfssl生成自签名证书
date: 2023-07-11
categories:
  - 容器
tags:
  - docker
---


## 安装

[参考教程](https://www.cnblogs.com/xiao987334176/p/11771657.html)

```shell
# 安装epel更新源
yum install -y vim wget epel-release

# 使用docker仓库进行安装
sudo yum install -y yum-utils device-mapper-persistent-data lvm2
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo

#---------------------------------------------------------------------------------------------------------------------------------
# 安装最新版  Docker Engine-Community
sudo yum install -y docker-ce docker-ce-cli containerd.io
# or 
#---------------------------------------------------------------------------------------------------------------------------------
# 安装指定版  Docker Engine-Community
yum list docker-ce --showduplicates | sort -r
sudo yum install -y docker-ce-<VERSION_STRING> docker-ce-cli-<VERSION_STRING> containerd.io
#---------------------------------------------------------------------------------------------------------------------------------

# 设置docker 镜像加速
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
    "registry-mirrors": [
        "https://1nj0zren.mirror.aliyuncs.com",
        "https://docker.mirrors.ustc.edu.cn",
        "http://f1361db2.m.daocloud.io",
        "https://registry.docker-cn.com"
    ]
}
EOF


# 启动docker， 设置开机启动
sudo systemctl daemon-reload
sudo systemctl start docker
sudo systemctl enable docker


# 安装docker命令补全工具
yum install -y bash-completion
```