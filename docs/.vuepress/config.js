const moment = require('moment')
const navbarConf = require('./conf/navbar')

module.exports = {
    title: 'Kingの博客',
    description: '记录学习、工作中碰到有趣技术',
    theme: 'reco',

    base: '/king-note/',

    head: [
        // http://favicon.io  favicon 搜索网站
        ['link', {rel: 'icon', href: '/favicon.ico'}],

        // seo 相关配置
        ['meta', {name: 'author', content: 'King'}],
        ['meta', {name: 'keywords', content: 'vuepress, 个人博客, King'}]
    ],

    markdown: {
        lineNumbers: true
    },

    // 导入插件
    plugins: [
        // 修改最后更新日期插件
        [

            '@vuepress/last-updated',
            {
                transformer: (timestamp, lang) => {
                    // 不要忘了安装 moment
                    const moment = require('moment')
                    // moment.locale(lang)
                    moment.locale('zh-CN')
                    // return moment(timestamp).fromNow()
                    return moment(timestamp).format('LLLL')
                }
            },

        ],

        [
            "vuepress-plugin-auto-sidebar",
            {
                // options
            }
        ],

        [
            'vuepress-plugin-code-copy',
            {
                align: "top"
            }
        ]

        // 导入 pwa 插件
        // 搜索 manifest icons generator  or  https://manifest-gen.netlify.app/
        // [
        //     '@vuepress/pwa',
        //     {
        //         serviceWorker: true,
        //         updatePopup: {
        //             message: '有新内容更新',
        //             buttonText: '刷新'
        //             // '/': {
        //             //
        //             // }
        //         }
        //     }
        // ]
    ],


    themeConfig: {
        logo: '/assets/img/logo.png',

        // 显示文章最后更新时间
        lastUpdated: '更新时间', // string | boolean

        // nav: navConf,
        nav: navbarConf,

        // 只有文章标题
        // sidebar: 'auto',

        // 每篇问文章的子菜单配置
        subSidebar: 'auto',

        blogConfig: {
            category: {
                location: 6,     // 在导航栏菜单中所占的位置，默认2
                text: 'Category' // 默认文案 “分类”
            },
            tag: {
                location: 7,     // 在导航栏菜单中所占的位置，默认3
                text: 'Tag'      // 默认文案 “标签”
            }
        }

    }
}
