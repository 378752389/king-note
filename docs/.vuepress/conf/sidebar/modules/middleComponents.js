module.exports = [
    {
        title: 'mysql', children: [
            '/中间件/mysql/环境搭建',
            '/中间件/mysql/SQL与优化',
            '/中间件/mysql/运维',
            '/中间件/mysql/权限管理',
        ]
    },
    {
        title: 'redis', children: [
            '/中间件/redis/环境搭建',
            '/中间件/redis/缓存一致性',
        ]
    },
    {
        title: 'kafka', children: [
            '/中间件/kafka/环境搭建',
            '/中间件/kafka/理论',
            '/中间件/kafka/客户端命令',
            '/中间件/kafka/Kafka生产者JavaAPI',
            '/中间件/kafka/Kafka消费者JavaAPI',
        ]
    },
    {
        title: 'nginx', children: [
            '/中间件/nginx/环境搭建',
            '/中间件/nginx/Location路径配置',
            '/中间件/nginx/静态服务配置',
            '/中间件/nginx/动态代理配置',
            '/中间件/nginx/SSL证书配置',
            '/中间件/nginx/防盗链',
            '/中间件/nginx/路径重写',
            '/中间件/nginx/线上处理',

        ]
    },
    // {
    //     title: 'seata', children: [
    //         '/中间件/seata/环境搭建',
    //         '/中间件/seata/理论',
    //     ]
    // },
    // {
    //     title: 'elk', children: [
    //         '/中间件/elk/elasticsearch',
    //         '/中间件/elk/elk',
    //         '/中间件/elk/kibana',
    //         '/中间件/elk/logstash',
    //         '/中间件/elk/efk',
    //     ]
    // },
    // {
    //     title: 'hbase', children: [
    //         '/中间件/hbase/环境搭建',
    //     ]
    // },
    {
        title: 'elasticsearch', children: [
            '/中间件/elasticsearch/JavaAPI',
            '/中间件/elasticsearch/RestAPI',
            '/中间件/elasticsearch/DSL查询',
            '/中间件/elasticsearch/JavaAPI测试类示例',
            '/中间件/elasticsearch/高级用法',
        ]
    },
    {
        title: 'zookeeper', children: [
            '/中间件/zookeeper/环境搭建',
            '/中间件/zookeeper/核心概念',
            '/中间件/zookeeper/客户端命令',
            '/中间件/zookeeper/Java客户端操作',
        ]
    }
]