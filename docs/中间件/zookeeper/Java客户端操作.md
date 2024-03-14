---
title: Zookeeper-java客户端操作
date: 2023-03-14
categories:
  - 中间件
tags:
  - zookeeper
---

## 导入依赖

[maven仓库传送门](https://mvnrepository.com/)

```xml
<project>
    <properties>
        <curator.framework.version>5.2.0</curator.framework.version>
        <curator.recipes.version>5.2.0</curator.recipes.version>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.apache.curator</groupId>
            <artifactId>curator-framework</artifactId>
            <version>${curator.framework.version}</version>
        </dependency>

        <dependency>
            <groupId>org.apache.curator</groupId>
            <artifactId>curator-recipes</artifactId>
            <version>${curator.recipes.version}</version>
        </dependency>
    </dependencies>
</project>
```

- framework为curator的核心框架，包含操作zk的一些基础API封装
- recipes 是基于zookeeper特性封装的一些方法，比如分布式锁、leader选举等

## 连接建立和销毁

```java
public class CuratorAPITest {
    public static void main(String[] args) {
        CuratorFramework curator = CuratorFrameworkFactory
                .builder()
                .connectionTimeoutMs(10000)  // 这个值要大于一个心跳时间，否则很有可能连接超时
                .connectString("test.king.com:2181")  // 直接用ip去连接zk会特别慢，原因是zk会用ip换域名；解决方案是在hosts中添加ip映射，然后用域名访问
                /**
                 * RetryNTimes 指定最大重试次数
                 * RetryUntilElapsed 一直重试，直到达到规定时间
                 * RetryOneTime 只重试一次
                 * ExponentialBackoffRetry 指数退避重试 失败n次后 1000 * 2**（n-1） ms 后重试
                 */
                .retryPolicy(new ExponentialBackoffRetry(1000, 3))  // 指数退避重试： 连接失败后 1000 ms 重试，失败后n次 1000 * 2**（n-1） ms 后重试
                .sessionTimeoutMs(150000)
                .build();

        curator.start();

        try {
           // api 操作
           curatorOperation(curator);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            curator.close();
        }
    }
}
```


## 基本操作

### 创建节点

```java
public class CuratorAPITest {
    public static void curatorOperation(CuratorFramework curator) {
        // acl 权限配置， 可选项
        ArrayList<ACL> acls = Lists.newArrayList(new ACL(ZooDefs.Perms.ALL, new Id("digest", DigestAuthenticationProvider.generateDigest("admin:123"))));

        // 节点创建成功后会返回节点路径 /test
        String nodePath = curator.create()
                // 如果父节点不存在则创建
                .creatingParentsIfNeeded()
                // 节点类型
                .withMode(CreateMode.PERSISTENT)
                .withACL(acls, false)
                // 节点路径[和数据]
                .forPath("/test", "for test".getBytes(StandardCharsets.UTF_8));
    }
}
```

### 获取节点数据/信息

```java
public class CuratorAPITest {
    public static void curatorOperation(CuratorFramework curator) {
        public static void curatorOperation(CuratorFramework curator) throws Exception {
        // zk的授权在会话层面，因此当节点需要认证，在创建会话时就应该指定会话授权信息 .authorization("digest", "admin:123".getBytes(StandardCharsets.UTF_8))
        
        Stat stat = new Stat();
        byte[] bytes = curator.getData().storingStatIn(stat).forPath("/zk_test");
        String s = new String(bytes);
        System.out.println("结果：" + s);
        System.out.println("节点信息：" + stat);
    }
}
```

### 设置节点


```java
public class CuratorAPITest {
    public static void curatorOperation(CuratorFramework curator) {
        curator.setData()
            // .withVersion()  可以使用乐观锁更新数据
            .forPath("/zk_test", "for test2".getBytes(StandardCharsets.UTF_8));
        byte[] bytes = curator.getData().forPath("/zk_test");
        System.out.println("结果：" + new String(bytes));
    }
}
```

### 获取子节点信息

```java
public class CuratorAPITest {
    public static void curatorOperation(CuratorFramework curator) {
        List<String> children = curator.getChildren().forPath("/zk_test");
    }
}
```

### 删除节点

```java
public class CuratorAPITest {
    public static void curatorOperation(CuratorFramework curator) {
        curator.delete().forPath(/zk_test);
    }
}
```

### 判断节点是否存在

```java
public class CuratorAPITest {
    public static void curatorOperation(CuratorFramework curator) {
        curator.checkExists().forPath(/zk_test);
    }
}
```


## 异步操作

```java
public class CuratorAPITest {
    public static void curatorOperation(CuratorFramework curator) {
        curator.create().creatingParentsIfNeeded().inBackground((session, event) -> {
            String path = event.getPath();
        }).forPath("/zk_test");
    }
}
```


## Watch监听机制

> 3.6 版本之前，由于 watcher 只能监听一次变化，因此如果需要重复监听，需要在watcher执行完成后再次进行watcher注册

```java
public class CuratorAPITest {
    public static void curatorOperation(CuratorFramework curator) throws Exception {
        CuratorWatcher watcher = new CuratorWatcher() {
            @Override
            public void process(WatchedEvent event) throws Exception {
                System.out.println("监听到的事件" + event.toString());
                // 3.6之前，由于zk watcher是一次性的，因此监听到数据变化之后需要重新进行注册
                curator.checkExists().usingWatcher(this).forPath(event.getPath());
            }
        };

        String path = "/watcher1";
        // 创建节点
        curator.create().forPath(path, "set date 0".getBytes(StandardCharsets.UTF_8));
        // 注册事件监听
        curator.getData().usingWatcher(watcher).forPath(path);

        // 第一次修改数据
        curator.setData().forPath(path, "set date 1".getBytes(StandardCharsets.UTF_8));
        // 确保 watcher 执行完成，并且重新注册 watcher 成功
        Thread.sleep(1000);
        // 第二次修改数据
        curator.setData().forPath(path, "set date 2".getBytes(StandardCharsets.UTF_8));

    }
}
```

> 3.6 版本之后，持久化订阅

```java
public class CuratorAPITest {
    public static void curatorOperation(CuratorFramework curator) {
        String node = "/node";
        CuratorCache curatorCache = CuratorCache.
            build(curator, node, CuratorCache.Options.SINGLE_NODE_CACHE);
        CuratorCacheListener listener = CuratorCacheListener
                .builder()
                .forAll(new ZookeeperWatcherListener())
                .build();
        curatorCache.listenable().addListener(listener);
        curatorCache.start();
    }
}


public static class ZookeeperWatcherListener implements CuratorCacheListener {

    @Override
    public void event(Type type, ChildData oldData, ChildData data) {
        System.out.println("事件类型：" + type + ":oldData:" + oldData + ":data" + data);
    }
}
```