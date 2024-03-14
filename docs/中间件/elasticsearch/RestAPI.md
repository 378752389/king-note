---
title: Elasticsearch-RestAPI
date: 2023-12-19
categories:
  - 中间件
tags:
  - Elasticsearch
---

## 集群

### 集群健康状态

```http request
### 查看集群健康状态
GET http://localhost:9200/_cluster/health
```

## 索引操作

### 查询索引

#### 列出所有的索引列表

```http request
GET http://localhost:9200/_cat/indices?v
```

#### 获取索引映射

```http
GET http://localhost:9200/hotel/_mapping 
Content-Type: application/json
```

#### 获取索引配置

```http
GET http://localhost:9200/hotel/_settings 
Content-Type: application/json
```



### 删除索引

```http
DELETE http://localhost:9200/hotel
```



### 创建索引

```http
PUT http://localhost:9200/hotel
Content-Type: application/json

{
  "mappings": {
    "properties": {
      "id": {
        "type": "integer"
      },
      "name": {
        "type": "keyword"
      },
      "location": {
        "type": "nested",
        "properties": {
          "address": {
            "type": "text"
          },
          "street": {
            "type": "text"
          },
          "city": {
            "type": "keyword"
          }
        }
      }
    }
  },
}
```





一些索引创建可选项：

```json
{
    "mappings":{
        ....
    },
    "settings": {
        // 指定索引分片数量
        "number_of_shards": 3,
        "number_of_replicas": 2,
        
        "analysis": {
            "analyzer": {
              "my_analyzer": {
                "type": "custom",
                "tokenizer": "standard",           // 使用标准分词器
                "filter": ["lowercase", "my_stopwords"],  // 应用小写过滤器和自定义停用词过滤器
                "char_filter": ["html_strip"]     // 预处理阶段应用 HTML 去除过滤器
              }
            },
            "filter": {
              "my_stopwords": {
                "type": "stop",
                "stopwords": ["and", "the", "a"]
              }
           }
      }
        
   },
}
```



:::tip

在 Elasticsearch 中，分析器（Analyzer）是一个组件，它负责将文本字段分解成单个词汇（tokens），这些词汇用于搜索和索引。

设置分析器时，通常需要配置以下参数:

* **tokenizer**：负责将输入文本分割成一个或多个词汇。
* **filter**：在分词器之后应用的处理步骤，它们可以对生成的词汇进行进一步的处理，例如转换为小写、删除停用词、词干提取等。
* **char_filter**：在分词器之前应用，用于对输入文本中的字符进行预处理，例如去除HTML标签、转义特殊字符等。(html_strip`、`mapping)
* **language**：对于特定语言的文本，Elasticsearch 提供了语言分析器，它们包含了特定于语言的分词器和过滤器。
* **type**：指定分析器的类型，如 `standard`（标准分析器）
* **stopwords**：如果使用了 `stop` 过滤器，可以在这里指定一个停用词列表，这些词在分析过程中会被忽略。

:::



### 修改索引

elasticsearch中是不能直接修改索引的，因此当我们需要添加新的映射或修改映射的时候，推荐使用 `reindex API`

```http
POST http://localhost:9200/_reindex
Content-Type: application/json

{
  "source": {
    "index": "old_index"
  },
  "dest": {
    "index": "new_index"
  }
}
```



## 数据类型



### 文本类型

* `text`：用于全文搜索和分析的字段。
* `keyword`：用于精确值、排序和聚合的字段。



### 数值类型

* `long`
* `integer`
* `short`
* `byte`
* `double`
* `float`



### 范围类型

* `integer_range`
* `float_range`
* `long_range`
* `double_range`
* `date_range`



### 其他常见类型

* `date`
* `boolean`



### 其他类型

* binary
* `geo_point`
* `geo_shape`
* `ip`
* 数组（Array）：虽然 Elasticsearch 中没有专门的数组数据类型，但任何字段都可以存储一个值的数组。所有数组元素必须是同一类型。






## 文档操作

### 插入和修改

#### 往索引库中插入单条数据

```http request
POST http://localhost:9200/hotel/_doc
Content-Type: application/json

{
  "id": "1",
  "name": "Shop A",
  "location": {
    "address": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zip": "10001"
  },
  "category": "Electronics",
  "rating": 4.5
}
```

#### 往索引库中批量插入数据

```http request
POST http://192.168.1.6:9200/_bulk
Content-Type: application/x-ndjson

{ "index": { "_index": "shops", "_id": "1" } }
{ "id": "1", "name": "Shop A", "location": { "address": "123 Main St", "city": "New York", "state": "NY", "zip": "10001" }, "category": "Electronics", "rating": 4.5 }
{ "index": { "_index": "shops", "_id": "2" } }
{ "id": "2", "name": "Shop B", "location": { "address": "456 Market St", "city": "San Francisco", "state": "CA", "zip": "94101" }, "category": "Clothing", "rating": 4.2 }
{ "index": { "_index": "shops", "_id": "3" } }
{ "id": "3", "name": "Shop C", "location": { "address": "789 Park Ave", "city": "Los Angeles", "state": "CA", "zip": "90001" }, "category": "Books", "rating": 4.8 }

```



```curl
curl -X POST "localhost:9200/_bulk" -H 'Content-Type: application/x-ndjson' --data-binary @-
<< EOF
{ "index": { "_index": "shops", "_id": "1" } }
{ "id": "1", "name": "Shop A", "location": { "address": "123 Main St", "city": "New York", "state": "NY", "zip": "10001" }, "category": "Electronics", "rating": 4.5 }
{ "index": { "_index": "shops", "_id": "2" } }
{ "id": "2", "name": "Shop B", "location": { "address": "456 Market St", "city": "San Francisco", "state": "CA", "zip": "94101" }, "category": "Clothing", "rating": 4.2 }
{ "index": { "_index": "shops", "_id": "3" } }
{ "id": "3", "name": "Shop C", "location": { "address": "789 Park Ave", "city": "Los Angeles", "state": "CA", "zip": "90001" }, "category": "Books", "rating": 4.8 }
EOF
```





#### 修改文档数据

* 通过文档id更新文档（推荐使用，建议覆盖）

  ```http
  PUT http://localhost:9200/hotel/_doc/document_id 
  Content-Type: application/json
  
  {
    "field_name": "new_value",
    ...
  }
  ```

* 通过条件更新文档(慎用)

  ```http
  POST http://localhost:9200/hotel/_update_by_query
  Content-Type: application/json
  
  {
    "script": {
      "source": "if (ctx._source.field_name == 'old_value') { ctx._source.field_name = 'new_value' }"
    },
    "query": {
      "match": {
        "another_field": "some_value"
      }
    }
  }
  
  ```

  



### 删除

* 通过文档id删除文档

  ```http
  DELETE http://localhost:9200/hotel/_doc/document_id   // document_id: VtLEkIwB7hZsTptPW2Ap
  ```

* 通过查询条件删除文档

  ```http
  POST http://localhost:9200/hotel/_delete_by_query
  Content-Type: application/json
  
  {
    "query": {
      "match": {
        "field_name": "value"
      }
    }
  }
  ```

  





### 查询

#### 查询指定索引库数据

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



## 数据迁移



### `reindex`

将数据导出到另外一个索引中

```http
POST http://localhost:9200/hotel/_search
Content-Type: application/json

{
  "source": {
    "index": "source_index"
  },
  "dest": {
    "index": "target_index"
  }
}
```



### 快照

#### 数据导出

创建快照仓库在原集群上

```http
PUT http://localhost:9200/_snapshot/my_repository
Content-Type: application/json

{
  "type": "fs",
  "settings": {
    "location": "/path/to/your/snapshot/repo",
    "compress": true
  }
}
```



:::tip

创建仓库的前提需要在`elasticsearch.yml`配置文件中指定如下配置：

```yaml
path.repo: ["/path/to/your/snapshot/repo"]
```



:::



将数据导出到快照中

```http
PUT http://localhost:9200/_snapshot/my_repository/my_snapshot?wait_for_completion=true
Content-Type: application/json

{
  "indices": "source_index",
  "ignore_unavailable": true,
  "include_global_state": false
}
```





#### 数据导入

创建快照仓库在目标集群上

```http
PUT http://localhost:9200/_snapshot/my_repository
Content-Type: application/json

{
  "type": "fs",
  "settings": {
    "location": "/path/to/your/snapshot/repo"
  }
}
```



从快照中导入数据到目标集群上

```http
PUT http://localhost:9200/_snapshot/my_repository/my_snapshot/_restore
Content-Type: application/json

{
  "indices": "source_index",
  "include_aliases": false,
  "rename_pattern": "(.+)",
  "rename_replacement": "target_index_$1"
}
```

## 测试

### 分词器

作用：可以使用分词器对输入内容进行分词测试

```http request
POST /_analyze

{
  "text": ["es真好学"],
  "analyzer": "pinyin"
}
```

如果存在自定义分词器在某个索引下，想使用该分词器进行测试，默认是找不到的。使用分词器时需要指定索引库名称。

```http request
POST /hotel/_analyze

{
  ...
}
```