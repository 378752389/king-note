---
title: 整合caffeine本地缓存
date: 2023-11-14
categories:
  - SpringBoot整合
---

项目开发经常会使用缓存，对于一些数据量不大，并且一致性要求不高的场景，可以使用基于内存的缓存

<!-- more -->

## 导入依赖
```xml
<dependency>
    <groupId>com.github.ben-manes.caffeine</groupId>
    <artifactId>caffeine</artifactId>
</dependency>
```


## 编写java配置代码

```java
@Configuration
@EnableCaching
public class CacheConfig {

    @Bean("caffeineCache")
    @Primary
    public CacheManager caffeineCacheManager() {
        CaffeineCacheManager cacheManager = new CaffeineCacheManager();
        cacheManager.setCaffeine(Caffeine.newBuilder()
                .expireAfterWrite(5, TimeUnit.MINUTES)
                .initialCapacity(100)
                .maximumSize(200));
        return cacheManager;
    }
}
```


## 使用本地缓存

### 定义缓存服务

```java
@Service
public class CategoryCache {

    @Autowired
    private WebCategoryDao webCategoryDao;
    
    //  缓存接口
    @Cacheable(cacheNames = "content", key = "'category:' + #id")
    public List<CategoryResp> getCategoryList(int id) {
        return webCategoryDao.getCategoryPackageTree(id);
    }

    // 清除缓存接口
    @CacheEvict(cacheNames = "content", key = "'category:' + #id")
    public List<CategoryResp> evictCategoryList(int id) {
        return null;
    }
}
```


### 使用缓存

```java
@GetMapping
public Result getCategory() {
    List<CategoryResp> categoryList = categoryCache.getCategoryList(1);
    return Result.ok(categoryList);
}
```

