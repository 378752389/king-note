module.exports = [
    {
        text: 'Java',
        items: [
            {
                text: '基础',
                items: [
                    {text: 'Java核心', link: '/java/基础/'}
                ]
            },
            {
                text: 'Spring',
                items: [
                    {text: 'spring笔记', link: '/java/spring/note/'},
                    {text: 'spring整合', link: '/java/spring/integration/'},
                ]
            },
            {
                text: '开发工具',
                items: [
                    {text: 'Maven', link: '/java/devkits/maven/'},
                    {text: 'Git', link: '/java/devkits/git/'},
                    {text: 'Idea', link: '/java/devkits/idea/'},
                ]
            },
            {
                text: '安全',
                items: [
                    {text: '安全', link: '/java/security/'}
                ]
            },
        ]
    },
    {
        text: 'Linux',
        items: [
            {text: '命令', link: '/linux/command/'},
            {text: '笔记', link: '/linux/note/'},
            // {text: '部署', link: '/linux/deploy/'},
        ]
    },
    {
        text: '前端',
        items: [
            {text: '基础', link: '/front/html标签/'},
            {text: 'Vue', link: '/front/vue/'},
        ]
    },
    {
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
    },
    {
        text: '分布式',
        link: '/distributed/'
    },
    {
        text: '导航',
        link: '/nav/',
    }
]
