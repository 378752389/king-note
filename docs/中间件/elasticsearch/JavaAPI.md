---
title: Elasticsearch-JavaAPI
date: 2023-12-19
categories:
  - 中间件
tags:
  - Elasticsearch
---

## 准备阶段

1. 导入依赖

```xml
<!-- https://mvnrepository.com/artifact/org.elasticsearch.client/elasticsearch-rest-high-level-client -->
<dependency>
    <groupId>org.elasticsearch.client</groupId>
    <artifactId>elasticsearch-rest-high-level-client</artifactId>
    <version>7.14.0</version>
</dependency>
```

2. 客户端对象创建

```java

RestHighLevelClient client = new RestHighLevelClient(
        RestClient.builder(HttpHost.create("http://localhost:9200"))
    );


try {
    // ...
} finally {
    client.close();
}
```


## 索引操作

### 1. 创建索引

```java
// 索引库 mapping 映射
String MAPPING_TEMPLATE = "";

CreateIndexRequest request = new CreateIndexRequest("person");
// 设置创建索引库mappings模版内容
request.source(MAPPING_TEMPLATE, XContentType.JSON);
client.indices().create(request, RequestOptions.DEFAULT);
```

### 2. 删除索引

```java
DeleteIndexRequest request = new DeleteIndexRequest("person");
client.indices().delete(request, RequestOptions.DEFAULT);
```


### 3. 查询索引

```java
GetIndexRequest request = new GetIndexRequest("person");
boolean isExists = client.indices().exists(request, RequestOptions.DEFAULT);
```

## 文档操作

### 1. 创建文档

```java
Person person = new Person();

IndexRequest request = new IndexRequest("person").id(String.valueOf(person.getId()));
request.source(JSON.toJSONString(person));
client.index(request, RequestOptions.DEFAULT);
```

### 2. 删除文档

```java
DeleteRequest request = new DeleteRequest("person", "1");
client.delete(request, RequestOptions.DEFAULT);
```

### 3. 修改文档

#### 方式一： 全量更新


```java
Person person = new Person();

IndexRequest request = new IndexRequest("person").id("1");
request.source(JSON.toJSONString(person));
client.index(request, RequestOptions.DEFAULT);
```

#### 方式二： 局部更新


```java
UpdateRequest request = new UpdateRequest("person", "1");

request.doc(
  "age", 22,
  "name", "liu"
);

client.update(request, RequestOptions.DEFAULT);
```


### 4. 批量导入

```java
List<Person> personList = new ArrayList<>();

BulkRequest request = new BulkRequest();
for (Person person : personList) {
  request.add(new IndexRequest("person")
              .id(String.valueOf(person.getId()))
              .source(JSON.toJSONString(person), XContentType.JSON));
}

client.bulk(request, RequestOptions.DEFAULT);
```


## 查询操作

### 1. 查询请求与响应结构解析

#### 查询请求

```java
SearchRequest request = new SearchRequest("hotel");
request.source()
  .query(QueryBuilders.matchAllQuery());

SearchResponse response = client.search(request, RequestOptions.DEFAULT);
```

#### 响应结构

```json
{
  "took" : 2,
  "timed_out" : false,
  "_shards" : {
    "total" : 1,
    "successful" : 1,
    "skipped" : 0,
    "failed" : 0
  },
  "hits" : {
    "total" : {
      "value" : 30,
      "relation" : "eq"
    },
    "max_score" : 4.214521,
    "hits" : [
      {
        "_index" : "hotel",
        "_type" : "_doc",
        "_id" : "415600",
        "_score" : 4.214521,
        "_source" : {
          "id" : 415600,
          "name" : "如家酒店(北京朝阳北路传媒大学褡裢坡地铁站店)",
          "address" : "三间房乡褡裢坡村青年沟西侧558号",
          "price" : 259,
          "score" : 47,
          "brand" : "如家",
          "city" : "北京",
          "star_name" : "二钻",
          "business" : "传媒大学/管庄地区",
          "latitude" : "39.923212",
          "longitude" : "116.560023",
          "pic" : "https://m.tuniucdn.com/fb3/s1/2n9c/3NezpxNZWQMdNXibwbMkQuAZjDyJ_w200_h200_c1_t0.jpg"
        }
      },
    ]
  }
}

```

#### 响应结构解析

```java
SearchHits searchHits = response.getHits();
long total = searchHits.getTotalHits().value;
SearchHit[] hits = searchHits.getHits();
for (SearchHit hit : hits) {
  String source = hit.getSourceAsString();
  System.out.println(source);
}
```


### 2. 全文检索查询

#### match_all

```java
request.source()
  .query(QueryBuilders.matchAllQuery());
```

#### match

```java
request.source()
  .query(QueryBuilders.matchQuery("name", "如家"));
```

#### multi_match

```java
// 多个字段（brand、name、address）中查询包含 如家信息
request.source()
  .query(QueryBuilders.multiMatchQuery("如家", "brand", "name", "address"));
```

### 3. 精确查询

```java
request.source().query(QueryBuilders.termQuery("brand", "如家"));
```

### 4. 范围查询

```java
request.source().query(QueryBuilders.rangeQuery("price").lt(200).gt(100));
```

### 5. 复合查询

```java
request.source()
  .query(
    QueryBuilders.boolQuery()
      .must(QueryBuilders.matchQuery("brand", "如家"))
      .must(QueryBuilders.rangeQuery("price").lt(300))
      .filter(QueryBuilders.termQuery("city", "深圳"))
      .mustNot(QueryBuilders.termQuery("star_name", "二钻"))
      .should(QueryBuilders.matchQuery("business", "龙岗中心区"))
);
```

### 6. 排序与分页

```java
request.source().sort("price", SortOrder.ASC);

request.source().from(1).size(10);
```


### 7. 高亮

#### 高亮请求

```java
request.source().highlighter(new HighlightBuilder().field("name").requireFieldMatch(Boolean.FALSE));
```

#### 高亮结果解析

```java
Map<String, HighlightField> fields = hit.getHighlightFields();
HighlightField name = fields.get("name");
if (name != null) {
  String highName = name.getFragments()[0].string();
  System.out.println(highName);
}
```

:::tip

高亮结果是和 _source 一个层级的，因此可以解析到结果

:::


## 数据聚合