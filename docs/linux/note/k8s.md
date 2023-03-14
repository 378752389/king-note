---
title: k8s
---

## Pod

为什么需要 pod

容器是为单个进程服务的，目的是为了更好的管理，为了让多个关系密切的容器进程绑定在一起， 需要pod这样的更高级别的结构

同一pod中的容器之间是部分隔离

他们共享同一个名称空间（主机名和网络接口）

pod之间可以通过pod的ip地址进行通信，他们之间没有NAT网关

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: kubia
  labels:
    create_method: manual
    env: prod
spec:
  nodeSelector: # 节点选择器， 给节点打上标签后，可以指定部署到某个节点上
    gpu: "true"
  containers:
    - images: kubia
      name: kubia
      ports:
        - containerPort: 8080
          protocel: TCP
```

label

app: 指定pod 属于哪个应用，组件或微服务

rel: 在pod中运行的应用程序版本， stable， beta， canary

namespace

```yaml
apiVersion: v1
kind: Namespace
metatada:
  name: customer-namespace
```

### 存活探针

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: kubia-liveness
spec:
  containers:
    - image: kubia
      name: kubia
      livenessProbe:
        httpGet:
          path: /
          port: 8080
      initialDelaySeconds: 15
```

当容器被强行终止时，会创建一个全新的容器—-而不是重启原来的容器

```shell
kubectl get po kubia-liveness --previous
```

### ReplicationController

可以确保它的pod始终保持运行状态。如果pod因任何原因消失（例如节点从集群中消失或由于该pod已从节点中逐出）或者变多， 则ReplicationController
会注意到缺少或者增加的pod并创建新的/删除现有pod，使其始终维持一个稳定的数值。

主要组成包含： 标签选择器、副本个数、pod模板

```yaml
apiVersion: v1
kind: ReplicationController
metadata:
  name: kubia-rc
spec:
  replicas: 3
  selector:
    app: kubia
  template:
    metadata:
      labels:
        app: kubia
    spec:
      containers:
        - name: kubia
          image: kubia
          ports:
            - containerPort: 8080
```

## Service（服务）

### 服务介绍和基础

需要服务的原因：

1. pod是短暂的， 随时会启动或者关闭
2. k8s到pod启动前会给已经调度到节点的pod分配ip地址，因此客户端不能提前知道提供服务的pod的ip地址
3. 水平伸缩，多个pod可能提供相同的服务，客户端无须关心后端pod的数量以及各自对应的ip地址， 所有pod通过单一的ip地址进行访问

服务：

定义：为一组功能相同的pod提供单一不变的接入点资源 是一种资源类型。

服务的后端可以有不止一个pod，服务的连接对所有的后端pod是负载均衡的，需要准确定义哪些pod属于服务，哪些不属于。

服务创建示例

```yaml
apiVersion: v1
kind: Service
metadata:
  name: kubia
spec:
  ports: # 同一个服务可以暴露多个端口
    - port: 80                      # 指定服务端口
      targetPort: 8080              # 指定服务转发到容器的端口
  selector:
    app: kubia                      # 具有 app=kubia标签的pod都属于该服务
```

查看服务创建命令

```shell
# 在命名空间下列出所有服务
kubectl get svc
```

内部集群测试服务

* 创建一个pod，然后将请求发送到服务的集群ip并记录响应
* ssh登录到其中一个k8s的node上，然后使用curl命令
* 使用 kubectl exec 在一个已经运行的pod上执行 curl 命令

```shell
kubectl exec kubia-7nogl -- curl -s http: //10 .111. 249 .153
```

> 提示： 双横杠（--） 表示 kubectl命令项结束， 后面的内容是指在pod中需要执行的命令

服务的会话亲和性

通常服务将每个请求随机指向后端pod中的一个，如果希望客户端所有请求每次指向同一个pod，可以设置服务 的sessionAffinity属性为ClientIP（None 为默认值）

```yaml
apiVersion: vl
kind: Service
spec:
sessionAffini七y: Clien七IP
```

> 问题： 为什么亲和性不能指定为cookie
>
> 答： k8s服务不是工作在http层，服务处理TCP和UDP包，并不关心其中的载荷


同一个服务可以暴露多个端口

```yaml
apiVersion: vl
kind: Service
metadata:
  name: kubia
spec:
  ports:
    - name: http
      port: 80
      targetPort: 8080
    - name: https
      port: 443
      targetPort: 8443
  selector:
    app: kubia
```

> 在创建一个有多个端口的服务的时候，必须给每个端口指定名字。

给端口号命名

好处： 即使更换端口号，无需更改服务的spec

pod 端口号命名

```yaml
kind: Pod
spec:
  containers:
    - name: kubia
      ports:
        - name: http
          containerPort: 8080
        - name: https
          containerPort: 8443
```

服务中引用命名的端口号

```yaml
apiVersion: vl
kind: Service
metadata:
  name: kubia
spec:
  ports:
    - name: http
      port: 80
      targetPort: http
    - name: https
      port: 443
      targetPort: https
  selector:
    app: kubia
```

### 服务发现

问题： 客户端 pod 是如何知道服务的 IP 和 端口？

1.通过环境变量发现服务

pod开始运行时， k8s会初始化一系列的环境变量指向现存服务。

如果服务早于pod创建，可以通过环境变量发现，如果服务晚于pod创建，则需要删除之前的pod

2.通过DNS服务发现

kube-system命名空间下有个 kube-dns的 pod，集群中的其他pod（k8s修改容器的 /etc/resolv.conf文件实现） 在进行dns查询都会被k8s自身的DNS服务响应，该服务器知道系统中运行的所有服务。

通过pod中的spec的dnsPolicy属性决定是否使用内部的DNS服务器。

3.通过全限定域名（FQDN）

服务名.名称空间.集群本地服务名称

### 连接外部服务

endpoint

Service不是和Pod直接相连的，中间存在Endpoint资源。在服务的spec定义了pod选择器，选择器用于 构建IP和端口列表，然后存储在Endpoint资源中

如果创建了不包含pod选择器的服务，k8s将不会创建Endpoint资源，需要手动指定服务的 Endpoint列表

```yaml
apiVersion: vl
kind: Service
metadata:
  name: ex-svc
spec:
  ports:
    - name: http
      port: 80
```

```yaml
apiVersion: vl
kind: Endpoint
metadata:
  name: ex-svc     # Endpoint名称必须和服务的名称相匹配
subsets:
  - addresses:
      - ip: 1.1.1.1
      - ip: 2.2.2.2
    ports:
      - port: 80
```

将外部服务添加到当前的 Endpoint 资源中

外部服务创建别名

```yaml
apiVersion: vl
kind: Service
metadata:
  name: ex-svc
spec:
  type: ExternalName
  externalName: someapi.somecompany.com
  ports:
    - port: 80
```

### 将服务暴露给外部客户端

* 服务类型设置为NodePort: 每个集群节点都会打开一个端口，并将在该端口接收到的流量重定向到基础服务
* 服务类型设置为LoadBalance
* 创建一个Ingress资源： 通过一个IP地址公开多个服务

NodePort

```yaml
apiVersion: vl
kind: Service
metadata:
  name: kubia-nodeport
spec:
  type: NodePort
  ports:
    - port: 80
      targetPort: 8080
      nodePort: 30123
  selector:
    app: kubia
```

防止不必要的跳数

当外部客户端通过节点端口连接到服务时，**随机选择的pod**并不一定在接收连接的同一**节点**上运行， 需要额外的网络跳转才能到达pod。可以通过将服务设置为仅将外部通信重定向到接收连接的节点上运行的pod来 阻止此额外跳数。
如果本地没有pod存在，则连接将会挂起，因此需要确保负载均衡器 将连接转发到只有具有 1个pod 的节点上

```yaml
spec:
  externalTrafficPolicy: Local
```

使用local外部流量策略的服务可能会导致跨pod的负载分布不均衡 eg： node1上有1个pod， node2上有2个pod， 则 node1: pod1 -> 50% , node2: pod1 -> 25%, node2: pod2
-> 25%

同时 nodeport 是不记录客户端ip 的，因为： 当节点端口收到连接时， 对数据包执行了（SNAT）

Ingress

客户端向 Ingress发送 http 请求时， Ingress会根据请求的主机名和路径决定请求转发到的服务

```yaml
apiVersion: extension/v1beta1
kind: Ingress
metaname:
  name: kubia
spec:
  tls:
    - hosts:
        - kubia.example.com
      secretName: tls-secret            # 冲 Secret 中 获取 主机的 TLS 配置

  rules:
    - host: kubia.example.com           # 将域名 映射到服务
      http:
        paths:
          - path: /
            backend:
              serviceName: kubia-nodeport   # 将所有请求转发到 kubia-nodeport 服务的80端口号
              servicePort: 80
```

### 就绪探针

就绪探针类型

* Exec探针，执行进程的地方，程序的状态由进程的退出码确定
* Http GET 探针， 根据返回的状态码确认容器是否准备好
* TCP Socket探针， 连接容器指定端口，如果连接建立成功，则准备就绪

容器启动可以为 k8s 配置一个等待时间， 等待时间过后开始执行第一次就绪检查。 之后会周期性的调用就绪探针， 如果pod未就绪，则会从服务中删除pod， 如果pod就绪，则会重新添加pod

```yaml
spec:
  containers:
    - name: kubia
      image: luska/kubia
      readinessProbe:
        exec:
          command:
            - ls
            - /var/ready   
```

### headless服务

客户端 需要连接 所有 ip

```yaml
apiVersion: v1
kind: Service
metadata:
  name: kubia-headless
spec:
  clusterIP: None                   # 指定为 headless服务
  ports:
    - port: 80
      targetPort: 8080
  selector:
    app: kubia
```

headless 服务任然提供跨pod的负载平衡，但是是通过dns轮询机制而不是客户端代理

## 配置Pod

### 为容器设置环境变量

环境变量无法在pod创建后被修改

```yaml
apiVersion: v1
kind: Pod
spec:
  containers:
    - image: kubia-env
      env:
        - name: INTERVAL
          value: "30"
        - name: TEXT
          value: "hello, k8s"

```

> k8s 会暴露相同命名空间下每个service对应的环境变量。

### configmap

```shell
# 使用指令创建 configmap
kubectl create configmap kubia-cfg --from-literal=interval=20 --from-literal=text="hello,k8s"

# 从文件中创建 config.conf configmap条目 key ：config.conf 内容为 文件内容
kubectl create configmap my-cfg --from-file=config.conf
```


pod中使用 configmap
```yaml
apiVersion: v1
kind: Pod
spec:
  containers:
    - image: kubia-cfg
      name: INTERVAL
      valueFrom:
        configMapKeyRef:
          # optional: true         # 容器是 启动如果缺少 configmap 会启动失败， 加上该配置 可以 忽略 configmap
          name: kubia-cfg
          key: interval
```






```yaml
apiVersion: v1
kind: Pod
spec:
  
```

## 命令

```shell


# 删除所有pod
kubectl delete po --all

# 查看 pod 中的环境变量
kubectl exec kubia env

# 进入容器执行命令
kubectl exec -it kuia bash

# 查看 endpoint
kubectl get endpoints kubia

kubectl get po --all-namespaces 

kubectl get ingresses

kubectl create secret tls tls-secret --cert=tls.cert --key=tls.key

kubectl get pods -o wide

kubectl get po kubia -o yaml

kubectl get po --show-labels

kubectl get po -l create_method=manual  # env, '!env', env!=prod, env in/notin (prod, dev)

kubectl get po -L env,create_method    #-L 指定标签名称

kubectl label po kubia create_method=auto  # 添加标签， 如需修改， 添加 --overwrite 选项

kubectl annotation po kubia create_by=wenking

kubectl explain pods.spec

kubectl logs kubia -c kubia1  # -c 指定 pod 中的容器（pod中有多个容器时使用）

kubectl get ns

kubectl get po -n kube-system # -n == --namespaces

kubectl apply -f kubia.yml -n my-customer

```
