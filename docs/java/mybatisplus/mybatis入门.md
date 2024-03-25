---
title: Mybatis-入门
date: 2023-12-13
categories:
  - mybatis
---


## 导入依赖

```xml
 <dependencies>
    <!-- https://mvnrepository.com/artifact/org.mybatis/mybatis -->
    <dependency>
        <groupId>org.mybatis</groupId>
        <artifactId>mybatis</artifactId>
        <version>3.5.7</version>
    </dependency>

    <!-- https://mvnrepository.com/artifact/org.projectlombok/lombok -->
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
        <version>1.18.24</version>
        <scope>provided</scope>
    </dependency>

    <!-- https://mvnrepository.com/artifact/com.mysql/mysql-connector-j -->
    <dependency>
        <groupId>com.mysql</groupId>
        <artifactId>mysql-connector-j</artifactId>
        <version>8.0.33</version>
    </dependency>
</dependencies>
```

## 编写配置文件

> mybatis-config.xml

:::tip

关于`mybatis-config.xml` 配置解析，可以查看 `XMLConfigBuilder`

:::

![mybatis-config.xml配置解析](https://raw.githubusercontent.com/378752389/image-bed/main/king-note/mybatis-config%E9%85%8D%E7%BD%AE%E8%A7%A3%E6%9E%90.png)

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "https://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
    <!--    <properties>-->
    <!--        <property name="driver" value="com.mysql.cj.jdbc.Driver"/>-->
    <!--        <property name="url" value="jdbc:mysql://192.168.1.6:3306/appmgr"/>-->
    <!--        <property name="username" value="root"/>-->
    <!--        <property name="password" value="root"/>-->
    <!--    </properties>-->

    <!--    引用外部资源配置文件  parse 方法查看-->
    <properties resource="application.properties"/>

    <environments default="development">
        <environment id="development">
            <transactionManager type="JDBC"/>
            <dataSource type="POOLED">
                <property name="driver" value="${driver}"/>
                <property name="url" value="${url}"/>
                <property name="username" value="${username}"/>
                <property name="password" value="${password}"/>
            </dataSource>
        </environment>
    </environments>
    <mappers>
        <mapper resource="mapper/SysConfigMapper.xml"/>
    </mappers>
</configuration>
```

## 定义实体类、Dao接口、Mapper.xml

### 实体类

```java
@Data
public class SysConfig {

    private Integer id;

    private String key;

    private String value;

    private String description;

    private String name;

    private Integer inputType;
}
```

### Dao接口

```java
public interface SysConfigMapper {

    SysConfig selectOne(Integer id);
}
```

### Mapper.xml

```java
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "https://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="org.example.mapper.SysConfigMapper">
    <select id="selectOne" resultType="org.example.entity.SysConfig">
        select * from sys_config where id = #{id}
    </select>
</mapper>
```


## 引导类

```java
public class App {
    public static void main(String[] args) throws IOException {
        String resource = "mybatis-config.xml";
        InputStream inputStream = Resources.getResourceAsStream(resource);
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);

        try (SqlSession sqlSession = sqlSessionFactory.openSession();) {
            SysConfigMapper mapper = sqlSession.getMapper(SysConfigMapper.class);
            SysConfig sysConfig = mapper.selectOne(2);
            System.out.println(sysConfig);
        }

    }
}
```


## 使用java代码 构建 SqlSessionFactory

```java
public class App {
    public static void main(String[] args) throws IOException {

        Configuration configuration = new Configuration();
        JdbcTransactionFactory jdbcTransactionFactory = new JdbcTransactionFactory();
        MysqlConnectionPoolDataSource datasource = new MysqlConnectionPoolDataSource();

        datasource.setURL("jdbc:mysql://192.168.1.6:3306/appmgr");
        datasource.setUser("root");
        datasource.setPassword("root");

        configuration.setEnvironment(new Environment("dev", jdbcTransactionFactory, datasource));
        SqlSessionFactory sqlSessionFactory = new DefaultSqlSessionFactory(configuration);
        configuration.addMapper(SysConfigMapper.class);

        String resource = "mapper/SysConfigMapper.xml";
        InputStream inputStream = Resources.getResourceAsStream(resource);
        configuration.addMappers(resource);
        XMLMapperBuilder mapperParser = new XMLMapperBuilder(inputStream, configuration, resource, configuration.getSqlFragments());
        mapperParser.parse();

        try (SqlSession sqlSession = sqlSessionFactory.openSession();) {
            SysConfigMapper mapper = sqlSession.getMapper(SysConfigMapper.class);
            SysConfig sysConfig = mapper.selectOne(2);
            System.out.println(sysConfig);
        }

    }
}
```