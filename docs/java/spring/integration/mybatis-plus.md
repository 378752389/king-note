---
title: Mybatis-plus
---

### 导入依赖

```xml
 <dependency>
     <groupId>mysql</groupId>
     <artifactId>mysql-connector-java</artifactId>
     <version>5.1.49</version>
</dependency>

<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus-boot-starter</artifactId>
    <version>3.5.1</version>
</dependency>

<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>druid</artifactId>
    <version>1.1.18</version>
</dependency>

<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
</dependency>
```



### yaml配置文件

```yaml
spring: 
    datasource:
        type: com.alibaba.druid.pool.DruidDataSource
        driver-class-name: com.mysql.cj.jdbc.Driver
        url: jdbc:mysql://127.0.0.1:3306/mysql?useUnicode=true&characterEncoding=utf-8&autoReconnect=true&useSSL=false
        username: root
        password: root
        initialSize: 5    # 初始化大小
        minIdle: 5        # 最小
        maxActive: 20     # 最大
        maxWait: 60000    # 获取连接等待超时的时间
        timeBetweenEvictionRunsMillis: 60000    # 配置间隔多久才进行一次检测，检测需要关闭的空闲连接，单位是毫秒
        minEvictableIdleTimeMillis: 300000      # 配置一个连接在池中最小生存的时间，单位是毫秒
        validationQuery: SELECT 1 FROM DUAL
        testWhileIdle: true
        testOnBorrow: false
        testOnReturn: false
        poolPreparedStatements: true                    # 打开PSCache
        maxPoolPreparedStatementPerConnectionSize: 20   # 指定每个连接上PSCache的大小
        # filters: stat,wall,log4j                        # 配置监控统计拦截的filters，去掉后监控界面sql无法统计，'wall'用于防火墙
        # connectionProperties: druid.stat.mergeSql=true;druid.stat.slowSqlMillis=5000  # 通过connectProperties属性来打开mergeSql功能；慢SQL记录

mybatis-plus:
  mapper-locations:
    - classpath*:mapper/bss/*.xml              # 定义 xml 存放位置

logging:
  file: ./log/xxpay4dubbo-service.log         # 定义 log 日志存放位置
```



### 服务编写



#### 1.主程序

```java
@SpringBootApplication
public class ConsumerApp implements ApplicationRunner {

    @Autowired
    private AccountMapper accountMapper;

    public static void main(String[] args) {
        SpringApplication.run(ConsumerApp.class, args);
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        System.out.println(accountMapper.selectList(null).stream().limit(10).collect(Collectors.toList()));
    }
}
```

#### 2.实体类

```java
@Data
@TableName("t_account")
public class Account {
    //........
}
```

#### 3.mapper接口

```java
@Mapper
public interface AccountMapper extends BaseMapper<Account> {

}
```

#### 4.xml文件

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.example.consumer.mapper.bss.AccountMapper">

    <resultMap id="ChannelWithSource" type="com.example.consumer.entity.Account">
        <id column="id" property="id"/>
        <result column="create_time" property="createTime" />
        <result column="active_time" property="activeTime" />
        <result column="last_login_time" property="lastLoginTime" />
        <result column="product_id" property="productId" />
    </resultMap>
    
</mapper>
```

#### 5.服务类

```java
// -------------------------------------------------------接口类-----------------------------------------------------------------
public interface AccountService {
    List<Account> getAccount();
}


// -------------------------------------------------------实现类-----------------------------------------------------------------
@Service
public class AccountServiceImpl extends ServiceImpl<AccountMapper, Account> implements AccountService {

    @Override
    public List<Account> getAccount() {
        return this.list().stream().limit(10).collect(Collectors.toList());
    }
}
```

#### 6.配置类

```java
@Configuration
@EnableTransactionManagement
@MapperScan(basePackages = "com.example.consumer.mapper")          // 定义mapper接口文件存放位置
public class DruidDataSourceConfig  {

    //注册dataSource
    @Bean(initMethod = "init", destroyMethod = "close")
    @ConfigurationProperties(prefix = "spring.datasource")
    public DruidDataSource dataSource() throws SQLException {
        return new DruidDataSource();
    }
    
    //  开启事务管理
    @Bean
    public PlatformTransactionManager transactionManager() throws SQLException {
        return new DataSourceTransactionManager(dataSource());
    }
    
    
    // 开启分页插件
    @Bean
    public MybatisPlusInterceptor mybatisPlusInterceptor() {
        MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
        interceptor.addInnerInterceptor(new PaginationInnerInterceptor(DbType.MARIADB));
        return interceptor;
    }
    
    // druid数据源监控相关配置
    @Bean
    public ServletRegistrationBean statViewServlet() {
        ServletRegistrationBean<StatViewServlet> bean = new ServletRegistrationBean<>(new StatViewServlet(), "/druid/*");
        Map<String, String> initParams = new HashMap<>();
        initParams.put("loginUsername", "admin");
        initParams.put("loginPassword", "123456");
        /* 默认就是允许所有访问 */
//        initParams.put("allow", "");
        bean.setInitParameters(initParams);
        return bean;
    }

    
    // 通过   http://localhost:8080/druid/api.html 进行访问
    @Bean
    public FilterRegistrationBean webStatFilter() {
        Map<String, String> initParams = new HashMap<>();
        initParams.put("exclusions", "*.js,*.css,/druid/*");

        FilterRegistrationBean bean = new FilterRegistrationBean();
        bean.setFilter(new WebStatFilter());
        bean.setInitParameters(initParams);
        bean.setUrlPatterns(Arrays.asList("/*"));

        return bean;
    }
    
}
```

