module.exports = {
    text: '中间件',
    items: [
        {
            text: '存储',
            items: [
                {text: 'mysql', link: '/中间件/mysql/环境搭建/'},
                {text: 'redis', link: '/中间件/redis/环境搭建/'},
                {text: 'hbase', link: '/中间件/hbase/环境搭建/'},
            ]
        },
        {
            text: '消息',
            items: [
                {text: 'kafka', link: '/中间件/kafka/环境搭建/'},
            ]
        },
        {
            text: '其他',
            items: [
                {text: 'nginx', link: '/中间件/nginx/环境搭建/'},
                {text: 'seata', link: '/中间件/seata/环境搭建/'},
                // {text: 'elk', link: '/中间件/elk/'},
            ]
        },
    ]
}