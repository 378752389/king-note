---
title: RestAPI
date: 2023-12-19
categories:
  - 中间件
tags:
  - Elasticsearch
---

## 集群

#### 集群健康状态

```http request

### 列出所有索引
GET http://localhost:9200/_cat/indices?v

### 查看集群健康状态
GET http://localhost:9200/_cluster/health
```

## 查询

查询指定索引库

```http request
###
GET http://localhost:9200/hotel/_search
Content-Type: application/json

{
  "query": {
    "match_all": {}
  }
}
```

