module.exports = [
    // require("./modules/java"),
    // require("./modules/linux"),
    // require("./modules/front"),
    // require("./modules/middleComponents"),
    // require("./modules/nav"),
    {
        text: 'Java',
        link: '/java/基础/JavaSE常用类合集'
    },
    {
        text: 'Linux',
        items: [
            {text: '命令', link: '/linux/命令/命令集合'},
            {text: '容器', link: '/linux/容器/docker常用命令'},
            {text: '部署', link: '/linux/部署/zookeeper'}
        ]
    },
    {
        text: '前端', link: '/front/基础/html标签/'
    },
    {
        text: '中间件',
        items: [
            {text: 'mysql', link: '/中间件/mysql/环境搭建/'},
            {text: 'redis', link: '/中间件/redis/环境搭建/'},
            {text: 'hbase', link: '/中间件/hbase/环境搭建/'},
            {text: 'kafka', link: '/中间件/kafka/环境搭建/'},
            {text: 'nginx', link: '/中间件/nginx/环境搭建/'},
            {text: 'seata', link: '/中间件/seata/环境搭建/'},
        ]
    },
    {
        text: '站点推荐',
        link: '/其他/推荐站点导航',
    },
    {
        text: "时间线",
        link: "/timeline/"
    }
]