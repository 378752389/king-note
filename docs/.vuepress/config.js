module.exports = {
    title: '文金的个人博客',
    description: '文金的个人博客',

    // seo 相关配置
    head: [
        // http://favicon.io  favicon 搜索网站
        ['link', {rel: 'icon', href: '/favicon.ico'}],
        ['meta', {name: 'author', content: '文金'}],
        ['meta', {name: 'keywords', content: 'vuepress, 个人博客, king'}]
    ],

    lastUpdated: 'Last Updated', // string | boolean



    themeConfig: {
        logo: '/assets/img/logo.png',

        nav: [
            {text: 'Home', link: '/'},
            {
                text: 'Java',
                items: [
                    {text: 'JUC', link: '/java/juc/'},
                    {text: 'JVM', link: '/java/jvm/'},
                    {text: 'Spring', link: '/java/spring/'},
                ]
            },
            {text: 'About', link: '/about/'},
            {
                text: 'Language',
                items: [
                    {text: 'Chinese', link: '/language/chinese/'},
                    {text: 'Japanese', link: '/language/japanese/'}
                ]
            },
            {text: 'External', link: 'https://google.com'},
        ],

        // 只有文章标题
        // sidebar: 'auto',

        // 所有配置的文章标题
        // sidebar: [
        //     '/',
        //     '/about/'
        // ],

        sidebar: {

            '/about/': [
                ''
            ],

            // '/java/': [
            //     'juc',
            //     'jvm',
            //     'spring'
            // ],

            '/java/spring/': [
                '/',
                'spring核心概念',
                'spring生命周期',
            ],

            '/': [
                ''
            ]
        }

        // 最后更新时间
    }
}
