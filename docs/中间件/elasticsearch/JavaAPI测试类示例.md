---
title: Elasticsearch-JavaAPI测试类示例
date: 2023-12-26
categories:
  - 中间件
tags:
  - Elasticsearch
---

## 测试类代码

```java
package com.king;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.*;
import lombok.extern.slf4j.Slf4j;
import org.apache.http.HttpHost;
import org.elasticsearch.action.admin.indices.delete.DeleteIndexRequest;
import org.elasticsearch.action.admin.indices.get.GetIndexRequest;
import org.elasticsearch.action.admin.indices.get.GetIndexResponse;
import org.elasticsearch.action.bulk.BulkItemResponse;
import org.elasticsearch.action.bulk.BulkRequest;
import org.elasticsearch.action.bulk.BulkResponse;
import org.elasticsearch.action.delete.DeleteRequest;
import org.elasticsearch.action.delete.DeleteResponse;
import org.elasticsearch.action.get.GetRequest;
import org.elasticsearch.action.get.GetResponse;
import org.elasticsearch.action.index.IndexRequest;
import org.elasticsearch.action.index.IndexResponse;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.action.support.master.AcknowledgedResponse;
import org.elasticsearch.action.update.UpdateRequest;
import org.elasticsearch.action.update.UpdateResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.client.indices.AnalyzeRequest;
import org.elasticsearch.client.indices.AnalyzeResponse;
import org.elasticsearch.client.indices.CreateIndexRequest;
import org.elasticsearch.client.indices.CreateIndexResponse;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.aggregations.AggregationBuilders;
import org.elasticsearch.search.aggregations.bucket.terms.ParsedStringTerms;
import org.elasticsearch.search.aggregations.bucket.terms.Terms;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.elasticsearch.search.suggest.SuggestBuilder;
import org.elasticsearch.search.suggest.SuggestBuilders;
import org.elasticsearch.xcontent.XContentType;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

/**
 * @author: wk
 * @Date: 2023年12月25日 16:27
 * @Description:
 */
@SpringBootTest
@Slf4j
public class ElasticSearchTest {

    private RestHighLevelClient client;

    private static final String INDEX = "hotel";

    @BeforeEach
    public void beforeEach() {
        client = new RestHighLevelClient(
                RestClient.builder(HttpHost.create("http://192.168.1.6:9200"))
        );
    }

    @AfterEach
    @SneakyThrows
    public void afterEach() {
        client.close();
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Hotel {
        private Integer id;

        private String name;

        private String brand;

        private Address address;

        private List<String> suggestion;

        @Data
        @AllArgsConstructor
        @NoArgsConstructor
        public static class Address {
            private String province;

            private String city;

            private String distinct;
        }
    }

    /**
     * 获取索引的 alias、mappings、settings
     */
    @Test
    @SneakyThrows
    public void getAllIndexTest() {
        // 发送 GET _cat/indices 请求
        GetIndexRequest request = new GetIndexRequest();
        request.indices("_all"); // "_all" 表示所有索引
        request.local(false); // 设置为 false，以获取集群级别的信息

        // 添加额外的参数以模拟 _cat API 的行为
        request.humanReadable(true); // 等同于 _cat API 中的 ?v 参数

        // 执行请求并获取响应
        GetIndexResponse response = client.indices().get(request, RequestOptions.DEFAULT);

//        // 打印索引信息
//        for (String index : response.getIndices()) {
//            System.out.println(index);
//        }
        System.out.println(response);

    }

    /**
     * {
     *   "mappings": {
     *     "properties": {
     *       "id": {
     *         "type": "integer"
     *       },
     *       "name": {
     *         "type": "text",
     *         "analyzer": "king_word"
     *       },
     *       "brand": {
     *         "type": "keyword"
     *       },
     *       "address": {
     *         "properties": {
     *           "province": {
     *             "type": "keyword"
     *           },
     *           "city": {
     *             "type": "keyword"
     *           },
     *           "distinct": {
     *             "type": "keyword"
     *           }
     *         }
     *       },
     *       "search_suggestion": {
     *           "type": "completion",
     *           "analyzer": "king_completion"
     *       }
     *     }
     *   },
     *   "settings": {
     *     "analysis": {
     *       "analyzer": {
     *         "king_word": {
     *           "tokenizer": "ik_max_word",
     *           "filter": [
     *             "custom_pinyin_filter"
     *           ]
     *         },
     *         "king_completion": {
     *             "tokenizer": "keyword",
     *             "filter": [
     *                 "custom_pinyin_filter"
     *             ]
     *         }
     *       },
     *       "filter": {
     *         "custom_pinyin_filter": {
     *           "type": "pinyin",
     *           "keep_joined_full_pinyin": true,
     *           "keep_original": true,
     *           "remove_duplicated_term": true,
     *           "none_chinese_pinyin_tokenize": false
     *         }
     *       }
     *     }
     *   },
     * }
     *
     *
     * king_word: {
     *     tokenizer: ik_max_word,
     *     filter: pinyin
     * }
     *
     * king_completion: {
     *     tokenizer: keyword,
     *     filter: pinyin
     * }
     */

    /**
     * 创建索引
     */
    @Test
    @SneakyThrows
    public void createIndexTest() {
        String jsonSettingsAndMappings = "{\n" +
                "  \"mappings\": {\n" +
                "    \"properties\": {\n" +
                "      \"id\": {\n" +
                "        \"type\": \"integer\"\n" +
                "      },\n" +
                "      \"name\": {\n" +
                "        \"type\": \"text\"\n" +
                "      },\n" +
                "      \"brand\": {\n" +
                "        \"type\": \"keyword\"\n" +
                "      },\n" +
                "      \"address\": {\n" +
                "        \"properties\": {\n" +
                "          \"province\": {\n" +
                "            \"type\": \"keyword\"\n" +
                "          },\n" +
                "          \"city\": {\n" +
                "            \"type\": \"keyword\"\n" +
                "          },\n" +
                "          \"distinct\": {\n" +
                "            \"type\": \"keyword\"\n" +
                "          }\n" +
                "        }\n" +
                "      }\n" +
                "    }\n" +
                "  }\n" +
                "}";

        // 解析 JSON 字符串为 Map 对象

        // 创建一个 CreateIndexRequest 对象
        CreateIndexRequest request = new CreateIndexRequest(INDEX);

        // 设置索引的设置和映射
        request.source(jsonSettingsAndMappings, XContentType.JSON);

        // 执行请求并获取响应
        CreateIndexResponse response = client.indices().create(request, RequestOptions.DEFAULT);

        // 打印响应信息
        System.out.println("Index created: " + response.isAcknowledged());
    }

    /**
     * 删除索引
     */
    @Test
    @SneakyThrows
    public void deleteIndexTest() {
        // 创建一个 DeleteIndexRequest 对象
        DeleteIndexRequest request = new DeleteIndexRequest(INDEX);

        // 执行请求并获取响应
        AcknowledgedResponse response = client.indices().delete(request, RequestOptions.DEFAULT);

        // 打印响应信息
        System.out.println("Index deletion acknowledged: " + response.isAcknowledged());
    }

    /**
     * 查询文档
     */
    @Test
    @SneakyThrows
    public void simpleSearchTest() {
        SearchRequest request = new SearchRequest(INDEX);
        SearchResponse response = client.search(request, RequestOptions.DEFAULT);
        System.out.println(response);
    }

    /**
     * 插入文档（覆盖更新）
     */
    @Test
    @SneakyThrows
    public void insertDocumentTest() {
        // 创建一个 IndexRequest 对象
        IndexRequest request = new IndexRequest(INDEX);
//        request.id("your_document_id");

        Hotel hotel = Hotel.builder()
                .id(1)
                .brand("如家")
                .name("深圳宝安沙井如家酒店")
                .address(new Hotel.Address("广东省", "深圳市", "宝安区")).build();

        ObjectMapper mapper = new ObjectMapper();
        String documentJson = mapper.writeValueAsString(hotel);

        request.id("1")
                .source(documentJson, XContentType.JSON);

        // 执行请求并获取响应
        IndexResponse response = client.index(request, RequestOptions.DEFAULT);

        System.out.println("Indexed document with ID: " + response.getId());
        System.out.println("Version: " + response.getVersion());
        System.out.println("Result: " + response.getResult());
    }

    /**
     * 批量插入文档
     */
    @Test
    @SneakyThrows
    public void batchInsertDocumentTest() {
        // 创建一个 BulkRequest 对象
        BulkRequest request = new BulkRequest();

        List<Hotel> hotelList = HotelDataGenerator.generator(100);

        for (Hotel hotel : hotelList) {
            IndexRequest indexRequest = new IndexRequest(INDEX);

            ObjectMapper mapper = new ObjectMapper();
            String documentJson = mapper.writeValueAsString(hotel);

            // es 如果不指定id， 默认会自动生成 文档id，eg：Go6CoIwBwtYu8PFG4FG7， 对应查询结果的字段为 _id
            indexRequest.id(String.valueOf(hotel.getId()))
                    .source(documentJson, XContentType.JSON);

            request.add(indexRequest);
        }

        // 执行请求并获取响应
        BulkResponse response = client.bulk(request, RequestOptions.DEFAULT);

        // 打印响应信息
        if (response.hasFailures()) {
            for (BulkItemResponse itemResponse : response.getItems()) {
                if (itemResponse.isFailed()) {
                    System.out.println("Failed to insert document with ID: " + itemResponse.getItemId());
                    System.out.println("Error message: " + itemResponse.getFailure().getMessage());
                }
            }
        } else {
            System.out.println("All documents inserted successfully.");
        }

    }

    /**
     * 修改文档 （增量更新）
     */
    @Test
    @SneakyThrows
    public void updateDocumentTest() {
        String documentId = "1";
        // 创建一个 UpdateRequest 对象
        UpdateRequest request = new UpdateRequest(INDEX, documentId);

        // 设置要更新的文档内容和内容类型
        String updatedJson = "{\"brand\":\"新品牌\"}";
        request.doc(updatedJson, XContentType.JSON);

        // 执行请求并获取响应
        UpdateResponse response = client.update(request, RequestOptions.DEFAULT);

        // 打印响应信息
        System.out.println("Updated document with ID: " + response.getId());
        System.out.println("Version: " + response.getVersion());
    }

    /**
     * 删除文档
     */
    @Test
    @SneakyThrows
    public void deleteDocumentTest() {
        String documentId = "1";
        // 创建一个 DeleteRequest 对象
        DeleteRequest request = new DeleteRequest(INDEX, documentId);

        // 执行请求并获取响应
        DeleteResponse response = client.delete(request, RequestOptions.DEFAULT);

        // 打印响应信息
        System.out.println("Deleted document with ID: " + response.getId());
        System.out.println("Version: " + response.getVersion());

    }

    /**
     * id查询文档
     */
    @Test
    @SneakyThrows
    public void idSearchTest() {
        // 创建一个 GetRequest 对象
        GetRequest request = new GetRequest(INDEX, "1");

        // 执行请求并获取响应
        GetResponse response = client.get(request, RequestOptions.DEFAULT);

        // 打印文档信息
        if (response.isExists()) {
            System.out.println("Document ID: " + response.getId());
            System.out.println("Document Source: " + response.getSourceAsString());
        } else {
            System.out.println("Document not found.");
        }
    }

    /**
     * 条件查询文档
     */
    @Test
    @SneakyThrows
    public void matchSearchTest() {
        SearchRequest request = new SearchRequest(INDEX);

        SearchSourceBuilder ssb = new SearchSourceBuilder();

        ssb.query(QueryBuilders.matchQuery("id", 1));

        // 如果不想全字段返回，可以指定某些字段
//        ssb.fetchSource(new String[]{"name", "brand"}, null);

        request.source(ssb);

        SearchResponse response = client.search(request, RequestOptions.DEFAULT);
        System.out.println(response);
    }

    /**
     * 复合查询
     */
    @Test
    @SneakyThrows
    public void composedSearchTest() {
        SearchRequest request = new SearchRequest(INDEX);

        SearchSourceBuilder ssb = new SearchSourceBuilder();

        BoolQueryBuilder bool = QueryBuilders.boolQuery();
        bool.must(QueryBuilders.termQuery("brand", "汉庭"));
        bool.should(QueryBuilders.matchQuery("address.city", "北京市"));
        bool.should(QueryBuilders.matchQuery("address.city", "成都市"));
        // should 为应该匹配的选项，默认情况下should可以不必匹配成功，如果要求至少一条匹配成功，需要添加如下配置
        bool.minimumShouldMatch(1);
        ssb.query(bool);

        request.source(ssb);

        SearchResponse response = client.search(request, RequestOptions.DEFAULT);
        System.out.println(response);

    }

    /**
     * 聚合查询
     */
    @Test
    @SneakyThrows
    public void aggSearchTest() {
        // 创建一个 SearchRequest 对象
        SearchRequest request = new SearchRequest(INDEX);

        // 设置搜索源构建器，并添加聚合
        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();
        searchSourceBuilder.aggregation(AggregationBuilders.terms("by_province")
                .field("address.province"));  // 按照 address.province 字段进行分组
        // 如果只需要聚合数据不需查询数据，可以设置为0
        searchSourceBuilder.size(0);
        request.source(searchSourceBuilder);


        // 执行请求并获取响应
        SearchResponse response = client.search(request, RequestOptions.DEFAULT);

        // 获取聚合结果
        ParsedStringTerms provinceAggregation = response.getAggregations().get("by_province");

        List<? extends Terms.Bucket> buckets = provinceAggregation.getBuckets();
        for (Terms.Bucket bucket : buckets) {
            log.info("{} : {}", bucket.getKey(), bucket.getDocCount());
        }
    }

    /**
     * 文本分词测试
     */
    @Test
    @SneakyThrows
    public void analyzerTest() {
        String text = "蜡笔小新很搞笑";
        String analyzer = "ik_max_word";
        AnalyzeRequest request = AnalyzeRequest.withIndexAnalyzer(INDEX, analyzer, text);
        AnalyzeResponse response = client.indices().analyze(request, RequestOptions.DEFAULT);

        List<AnalyzeResponse.AnalyzeToken> tokens = response.getTokens();
        for (AnalyzeResponse.AnalyzeToken token : tokens) {
            System.out.println(token.getTerm() + " : " + token.getPosition());
        }
    }

    /**
     * 自动补全: 一般为关键字补全，因此为一组 keyword， 通过前缀匹配 keyword 进行补全
     */
    @Test
    @SneakyThrows
    public void suggestSearchTest() {
        // 创建一个 SearchRequest 对象
        SearchRequest request = new SearchRequest(INDEX);

        // 添加搜索提示到搜索请求中
        request.source()
                .suggest(
                        new SuggestBuilder().addSuggestion("suggestions",
                                SuggestBuilders
                                        .completionSuggestion("suggestion")
                                        .prefix("如家")
                                        .skipDuplicates(true)
                                        .size(10)
                        ))
                .fetchSource(false);  // 不需要获取搜索数据，提高搜索提示效率

        // 执行请求并获取响应
        SearchResponse response = client.search(request, RequestOptions.DEFAULT);

        System.out.println(response);

    }

}

```

## 测试数据辅助类

```java
package com.king;

import com.king.ElasticSearchTest;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

/**
 * @author: wk
 * @Date: 2023年12月25日 18:29
 * @Description:
 */
public class HotelDataGenerator {

    public static List<ElasticSearchTest.Hotel> generator(int count) {
        List<ElasticSearchTest.Hotel> hotels = new ArrayList<>();

        for (int i = 1; i <= count; i++) {
            ElasticSearchTest.Hotel hotel = ElasticSearchTest.Hotel.builder()
                    .id(i)
                    .brand(generateBrand())
                    .name(generateName())
                    .address(new ElasticSearchTest.Hotel.Address(generateProvince(), generateCity(), generateDistrict()))
                    .build();
            hotel.setSuggestion(Collections.singletonList(hotel.getName()));
            hotels.add(hotel);
        }

        return hotels;
    }

    private static String generateBrand() {
        String[] brands = {"如家", "汉庭", "锦江之星", "7天连锁", "格林豪泰", "维也纳", "全季", "速8", "布丁酒店", "都市118"};
        int randomIndex = (int) (Math.random() * brands.length);
        return brands[randomIndex];
    }

    private static String generateName() {
        String[] cities = {"北京", "上海", "广州", "深圳", "成都", "杭州", "重庆", "天津", "武汉", "南京"};
        String[] areas = {"市中心", "新区", "老城区", "商业区", "风景区"};

        String city = cities[(int) (Math.random() * cities.length)];
        String area = areas[(int) (Math.random() * areas.length)];

        return city + " " + area + " " + generateBrand() + "酒店";
    }

    private static String generateProvince() {
        String[] provinces = {"北京市", "上海市", "广东省", "江苏省", "浙江省", "四川省", "湖北省", "天津市", "重庆市", "湖南省"};
        int randomIndex = (int) (Math.random() * provinces.length);
        return provinces[randomIndex];
    }

    private static String generateCity() {
        String[] cities = {"北京市", "上海市", "广州市", "深圳市", "成都市", "杭州市", "重庆市", "天津市", "武汉市", "南京市"};
        int randomIndex = (int) (Math.random() * cities.length);
        return cities[randomIndex];
    }

    private static String generateDistrict() {
        String[] districts = {"东城区", "西城区", "朝阳区", "海淀区", "宝安区", "南山区", "福田区", "罗湖区", "龙岗区", "盐田区",
                "黄浦区", "徐汇区", "长宁区", "静安区", "普陀区", "虹口区", "杨浦区", "闵行区", "宝山区", "嘉定区",
                "天河区", "海珠区", "越秀区", "荔湾区", "白云区", "黄埔区", "番禺区", "花都区", "增城区", "从化区",
                "武侯区", "成华区", "金牛区", "青羊区", "锦江区", "龙泉驿区", "新都区", "温江区", "双流区", "郫都区",
                "余杭区", "西湖区", "江干区", "滨江区", "萧山区", "拱墅区", "上城区", "下城区", "临平区", "钱塘区",
                "渝中区", "江北区", "南岸区", "沙坪坝区", "九龙坡区", "大渡口区", "渝北区", "巴南区", "北碚区", "两江新区",
                "和平区", "河东区", "河西区", "南开区", "河北区", "红桥区", "滨海新区", "东丽区", "西青区", "津南区",
                "北辰区", "武昌区", "洪山区", "江汉区", "硚口区", "汉阳区", "青山区", "蔡甸区", "江夏区", "东西湖区",
                "黄陂区", "新洲区", "鼓楼区", "秦淮区", "建邺区", "栖霞区", "雨花台区", "江宁区", "浦口区", "六合区"};
        int randomIndex = (int) (Math.random() * districts.length);
        return districts[randomIndex];
    }
}

```