module.exports = [
    // require("./modules/java"),
    // require("./modules/linux"),
    // require("./modules/front"),
    // require("./modules/middleComponents"),
    // require("./modules/nav"),
    {
        text: 'Java',
        icon: 'iconfont icon-redis',
        link: '/java/基础/JavaSE常用类合集'
    },
    {
        text: 'Linux',
        icon: 'iconfont icon-linux',
        items: [
            {text: '命令', link: '/linux/命令/命令集合', icon: 'iconfont icon-command',},
            {text: '容器', link: '/linux/容器/docker常用命令', icon: 'iconfont icon-docker',},
            {text: '系统', link: '/linux/系统/linux环境变量', icon: 'iconfont icon-system',},
            {text: '配置', link: '/linux/配置/ssh', icon: 'iconfont icon-setting',}
        ]
    },
    {
        text: '前端', link: '/front/基础/html标签/',
        icon: 'iconfont icon-web',
    },
    {
        text: '中间件',
        link: '/中间件/mysql/环境搭建/',
        icon: 'iconfont icon-component',
        items: [
            {text: 'mysql', link: '/中间件/mysql/环境搭建/', icon: 'iconfont icon-mysql',},
            {text: 'redis', link: '/中间件/redis/环境搭建/', icon: 'iconfont icon-redis',},
            // {text: 'hbase', link: '/中间件/hbase/环境搭建/', icon: 'iconfont icon-HBASE',},
            {text: 'kafka', link: '/中间件/kafka/环境搭建/', icon: 'iconfont icon-shujujieruKafkajiqun',},
            {text: 'nginx', link: '/中间件/nginx/Location路径配置', icon: 'iconfont icon-nginx',},
            // {text: 'seata', link: '/中间件/seata/环境搭建/', icon: 'iconfont icon-SEATA',},
            {text: 'elasticsearch', link: '/中间件/elasticsearch/JavaAPI/', icon: 'iconfont icon-elasticsearch'},
        ]
    },
    {
        text: '其他',
        link: '/其他/idea',
        icon: 'iconfont icon-menu',
    },
    {
        text: '站点推荐',
        link: '/其他/推荐站点导航',
        icon: 'iconfont icon-menu2',
    },
    {
        text: "时间线",
        link: "/timeline/",
        icon: 'iconfont icon-timeline',
    }
]
