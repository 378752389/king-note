---
title: EFK环境搭建
date: 2023-09-03
categories:
  - 中间件
tags:
  - elk
---

## 安装

首先下载 ElasticSearch、Kibana、FileBeat
对应的软件包，要求三者版本必须一致。[传送门](https://www.elastic.co/cn/downloads/past-releases)

```shell
# ElasticSearch
https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-7.17.12-linux-x86_64.tar.gz
# Kibana
https://artifacts.elastic.co/downloads/kibana/kibana-7.17.12-linux-x86_64.tar.gz
# FileBeat
https://artifacts.elastic.co/downloads/beats/filebeat/filebeat-7.17.12-linux-x86_64.tar.gz
```

并将下载的软件包上传到服务器上

## ElasticSearch部署

1. 软件包部署es，不能用root的身份运行，因此我们需要做一些预操作

```shell
#创建用户
# -m: 指定用户家目录
# -s：指定登录shell
useradd -m -s /bin/bash efk

su efk

# 修改文件拥有者和属组
chown -R efk:efk elasticsearch
```

2. 修改配置文件

```yaml
# 集群名
cluster.name: log-system
# 集群唯一
node.name: node-1



# 供外网连接的地址
network.host: 192.168.1.128

# 数据路径
path.data: /home/efk/data/es-data
# 日志路径
path.logs: /home/efk/logs/es-logs

discovery.seed_hosts: [ "192.168.1.128" ]

cluster.initial_master_nodes: [ "node-1" ]


xpack.security.enabled: true
xpack.license.self_generated.type: basic
xpack.security.transport.ssl.enabled: true

xpack.security.transport.ssl.verification_mode: certificate
xpack.security.transport.ssl.client_authentication: required
xpack.security.transport.ssl.keystore.path: certs/elastic-certificates.p12
xpack.security.transport.ssl.truststore.path: certs/elastic-certificates.p12
```

3. 运行程序

```shell
./bin/elasticsearch -d
```

出现报错：
![es启动报错](https://raw.githubusercontent.com/378752389/image-bed/main/king-note/es%E5%90%AF%E5%8A%A8%E6%8A%A5%E9%94%99.png)

对于报错一：

修改linux系统参数：

```shell
# 查看前用户保持的最大文件句柄数量
ulimit -Hn
```

修改配置文件`vim /etc/security/limits.conf`, 添加如下内容：

```
efk	soft	nofile	65536
efk	hard	nofile	65536
```

断开当前连接然后重新ssh，查看当前文件的最大文件句柄数量：

```shell
ulimit -Hn
```

对于报错二：

修改配置文件`vim /etc/sysctl.conf`, 添加如下内容：

```
vm.max_map_count=262144
```

应用配置

```shell
sysctl -p
```

再次运行：

```shell
./bin/elasticsearch -d
```

## Kibana部署

解压kibana，然后修改配置文件：

```yaml
server.port: 5601
server.host: "localhost"
elasticsearch.hosts: [ "http://172.16.52.7:9200" ]
#elasticsearch.username: "elastic"
#elasticsearch.password: "asadasdasdas"
i18n.locale: "zh-CN"
```

启动kibana:

```shell
.bin/kibana
```

## FileBeat部署

解压filebeat，备份之前配置

```shell
mv filebeat.yml filebeat.yml.bak
```

新建配置文件`vim filebeat.yml`：

```yaml
filebeat.inputs:
  - type: filestream
    id: demo-info
    enabled: true
    paths:
      - /root/logs/demo/info*.log
    fields:
      name: demo-info   # 自定义字段，主要用于区分多个input来创建索引库
  - type: filestream
    id: demo-error
    enabled: true
    paths:
      - /root/logs/demo/error*.log
    fields:
      name: demo-error

# 指定索引库前缀名
setup.template.name: "log-"
# 应用索引库
setup.template.pattern: "log-*"
# 禁用es自动管理索引库，否则 output 中自定义的索引名称将会失效
setup.ilm.enabled: false

output.elasticsearch:
  hosts: [ "172.16.52.7:9200" ]
  index: "log-demo-%{[fields][name]}_%{+yyy-MM-dd}"
  # 如果 es 有配置密码，则打开该处注释
  #  username: "elastic"
  #  password: "asdaasdadas
```

运行filebeat：

```shell
./filebeat
```

## ElasticSearch安全配置

### basic认证

修改配置文件，并添加如下内容：

```yaml
xpack.security.enabled: true
xpack.license.self_generated.type: basic
xpack.security.transport.ssl.enabled: true

#跨域配置（可选）
#http.cors.enabled: true
#http.cors.allow-origin: "*"
#http.cors.allow-headers: Authorization,X-Requested-With,Content-Length,Content-Type
```

运行es:

```shell
./bin/elasticsearch
```

设置es的用户名和密码：

```shell
# 交互方式配置
./bin/elasticsearch-setup-passwords interactive

# 自动配置
./bin/elasticsearch-setup-passwords auto
```

测试访问es,修改username和password变量为生成的用户名和密码：

```shell
username=elastic
password=123
curl -H 'Content-Type: application/json' -u elastic:WEY8PqqgPfdzVkZFKV86 http://172.16.52.7:9200
```

## kibana进行索引配置

打开左侧侧边栏，点击 `Stack Management` 菜单, 然后点击 `索引管理`，即可看到系统中包含哪些索引

![索引管理页](https://raw.githubusercontent.com/378752389/image-bed/main/king-note/%E7%B4%A2%E5%BC%95%E7%AE%A1%E7%90%86%E9%A1%B5.png)

由于索引是按照日期进行递增创建的，为了按照系统进行划分，并且可以查看到日志详情内容，我们需要创建索引模式，将相同类型的索引进行聚合

点击 `Stack Management` 菜单, 然后点击 `索引模式`，即可看到系统中包含哪些索引，我们可以点击右上角创建索引模式

![创建索引模式](https://raw.githubusercontent.com/378752389/image-bed/main/king-note/%E5%88%9B%E5%BB%BA%E7%B4%A2%E5%BC%95%E6%A8%A1%E5%BC%8F.png)

打开左侧侧边栏，然后我们可以去 `Discover` 菜单查看创建的索引模式，

![查看索引内容](https://raw.githubusercontent.com/378752389/image-bed/main/king-note/%E6%9F%A5%E7%9C%8B%E7%B4%A2%E5%BC%95%E6%A8%A1%E5%BC%8F%E4%B8%8B%E7%9A%84%E7%B4%A2%E5%BC%95%E5%86%85%E5%AE%B9.png)

## 定时删除索引脚本

```shell
#!/bin/bash

reserved_day=7
username=elastic
password=123
log_prefix=log-

function delete_indices() {
    cpt_date=`date -d "${reserved_day} day ago" +"%Y-%m-%d"`

    t1=`date -d "$1" +%s`
    t2=`date -d "$cpt_date" +%s`


    if [ $t1 -le $t2 ]; then
        echo "$1时间早于$comp_date，进行索引删除"
        curl -XDELETE -u $username:$password http://172.16.52.7:9200/log-*$1
    fi
}

curl  -u $username:$password http://172.16.52.7:9200/_cat/indices | grep $log_prefix | awk -F" " '{print $3}' | awk -F "_" '{print $NF}' | sort | uniq | while read line
do
  delete_indices $line
done
```