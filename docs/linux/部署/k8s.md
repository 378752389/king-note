---
title: k8s集群搭建
date: '2023-07-11 12:00:00'
categories:
  - 容器
tags:
  - k8s
---

## 用 kubeadm 进行 安装

### 准备三台机器， 配置要求如下

* 内存：2GB或更多RAM
* CPU: 2核CPU或更多CPU
* 硬盘: 30GB或更多

### 环境准备工作 (所有node)

关闭防火墙

```shell
systemctl stop firewalld && systemctl disable firewalld && iptables -F
```

关闭selinux

```shell
systemctl stop firewalld && systemctl disable firewalld && iptables -F
```

关闭swap分区

```shell
# 临时关闭
swapoff -a

# 永久关闭
sed -ri 's/.*swap.*/#&/' /etc/fstab
```

修改主机名字

```shell
hostnamectl set-hostname master
hostnamectl set-hostname node01
hostnamectl set-hostname node02
```

修改本地hosts配置文件

`vim /etc/hosts`

```shell
192.168.1.210 master
192.168.1.220 node01
192.168.1.221 node02
```

修改内核参数

```shell
cat > /etc/sysctl.d/k8s.conf << EOF
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
net.ipv4.ip_forward = 1
EOF
```

`sysctl --system`

### 安装docker (所有node)

```shell
wget https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo -O /etc/yum.repos.d/docker-ce.repo
yum -y install docker-ce-19.03.9-3.el7 docker-ce-cli-19.03.9-3.el7
```

修改docker 配置， 添加国内镜像站

```shell
cat > /etc/docker/daemon.json << EOF
{
"registry-mirrors": ["https://gqs7xcfd.mirror.aliyuncs.com","https://hub-mirror.c.163.com"],
"exec-opts": ["native.cgroupdriver=systemd"],
"log-driver": "json-file",
"log-opts": {
"max-size": "100m"
},
"storage-driver": "overlay2"
}
EOF
```

重启服务

```shell
systemctl daemon-reload && systemctl enable docker && systemctl start docker
```

> note: 如果docker 版本 冲突， 可以执行如下命令 卸载 docker
>
> yum list installed | grep docker | awk '{print $1}' | xargs yum -y remove

### 安装k8s

配置 阿里k8s 仓库源 （所有 node）

```shell
cat > /etc/yum.repos.d/kubernetes.repo << EOF
[kubernetes]
name=Kubernetes
baseurl=https://mirrors.aliyun.com/kubernetes/yum/repos/kubernetes-el7-x86_64/
enabled=1
gpgcheck=1
repo_gpgcheck=1
gpgkey=https://mirrors.aliyun.com/kubernetes/yum/doc/yum-key.gpg https://mirrors.aliyun.com/kubernetes/yum/doc/rpm-package-key.gpg
EOF
```

安装指定版本的kubeadm, kubelet, kubectl, 开机自动启动 （所有 node）

```shell
yum install -y kubelet-1.18.8 kubeadm-1.18.8 kubectl-1.18.8

systemctl enable kubelet
```

初始化 master 节点 （仅master）

```shell
kubeadm init \
  --kubernetes-version 1.18.8 \
  --apiserver-advertise-address=0.0.0.0 \
  --service-cidr=10.96.0.0/16 \
  --pod-network-cidr=10.245.0.0/16 \
  --image-repository registry.aliyuncs.com/google_containers
  
  
mkdir -p $HOME/.kube
cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
chown $(id -u):$(id -g) $HOME/.kube/config
```

nodes 节点 加入集群  (仅 从节点)

master节点初始化完成后， 最后会打印一条命令， 复制该命令并在 所有 node 节点中执行该条命令

```shell
kubeadm join 192.168.68.106:6443 --token 1quyaw.xa7yel3xla129kfw \
    --discovery-token-ca-cert-hash sha256:470410e1180b119ebe8ee3ae2842e7a4a852e590896306ec0dab26b168d99197
```

安装 flannel 插件
```shell
wget https://raw.githubusercontent.com/coreos/flannel/master/Documentation/kube-flannel.yml
```

修改 128 行 `"Network": "10.245.0.0/16"`, 该内容需要与 master 初始化集群中 `--pod-network-cidr` 内容一致

```shell
kubectl apply -f kube-flannel.yaml
```

查看运行结果

```shell
kubectl -n kube-system get pods -o wide

kubectl get nodes
```

修改kube-proxy的模式为iptables
```shell
kubectl get cm kube-proxy -n kube-system -o yaml | sed 's/mode: ""/mode: "iptables"/' | kubectl apply -f -
kubectl -n kube-system rollout restart  daemonsets.apps  kube-proxy
kubectl -n kube-system rollout restart  daemonsets.apps  kube-flannel-ds
```


### 安装参考文档

[安装k8s无坑版](https://www.cnblogs.com/Sunzz/p/15184167.html)
