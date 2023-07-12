---
title: Kibana环境搭建
date: 2023-07-11
categories:
  - 中间件
tags:
  - elk
---



```shell

wget https://artifacts.elastic.co/downloads/kibana/kibana-7.17.9-linux-x86_64.tar.gz

#修改kibana.yml配置问价
vim /config/kibana.yml

# 服务端口
server.port: 5601
# 服务器ip  本机
server.host: "0.0.0.0"
# Elasticsearch 服务地址
elasticsearch.hosts: ["http://localhost:9200"]
# 设置语言为中文
i18n.locale: "zh-CN"
```