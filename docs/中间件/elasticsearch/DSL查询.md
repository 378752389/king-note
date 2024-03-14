---
title: Elasticsearch-DSL查询
date: 2023-12-19
categories:
  - 中间件
tags:
  - Elasticsearch
---


查询、过滤、聚合、排序

## 简单查询

### Match Query

Match Query用于全文搜索，可以匹配包含指定词汇的字段

```json
{
  "query": {
    "match": {
      "field_name": "search_term"
    }
  }
}
```

### Term Query

Term Query用于精确匹配一个或多个不分析（not analyzed）的值。

```json
{
  "query": {
    "term": {
      "field_name": "exact_value"
    }
  }
}
```

### Prefix Query

Prefix Query用于查找字段值以特定前缀开始的文档。

```json
{
  "query": {
    "prefix": {
      "field_name": "prefix_value"
    }
  }
}
```

### Wildcard Query

Wildcard Query用于使用通配符（*和?）进行字段值的匹配。

```json
{
  "query": {
    "wildcard": {
      "field_name": "prefix*"
    }
  }
}
```


### Range Query

Range Query用于查找字段值在特定范围内的文档。

```json
{
  "query": {
    "range": {
      "field_name": {
        "gte": "lower_bound",
        "lte": "upper_bound"
      }
    }
  }
}
```

### Exists Query

Exists Query用于查找具有指定字段的文档。

```json
{
  "query": {
    "exists": {
      "field": "field_name"
    }
  }
}
```

### Missing Query

Missing Query用于查找未包含指定字段的文档。

```json
{
  "query": {
    "missing": {
      "field": "field_name"
    }
  }
}
```


## 复合查询

