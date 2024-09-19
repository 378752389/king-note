const moment = require('moment')
const navbarConf = require('./conf/navbar')
const sidebarConf = require('./conf/sidebar')

module.exports = {
    title: 'KingのNote',
    description: 'Java全栈的成长之路！',

    // base: '/king-note/',

    head: [
        // http://favicon.io  favicon 搜索网站
        // ['link', {rel: 'icon', href: '/favicon.ico'}],
        ['link', { rel: 'icon', href: '/icon-256x256.png' }],
        ['link', { rel: 'manifest', href: '/manifest.json' }],
        ['meta', { name: 'theme-color', content: '#3eaf7c' }],
        ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
        ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
        ['link', { rel: 'apple-touch-icon', href: '/icon-192x192.png' }],
        ['link', { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#3eaf7c' }],
        ['meta', { name: 'msapplication-TileImage', content: '/icon-192x192.png' }],
        ['meta', { name: 'msapplication-TileColor', content: '#000000' }],

        ['link', {rel: 'stylesheet', href: '/assets/icon-font/iconfont.css'}],

        // seo 相关配置
        ['meta', {name: 'author', content: 'King'}],
        ['meta', {name: 'keywords', content: 'vuepress, 个人博客, King'}]
    ],

    markdown: {
        lineNumbers: true,
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
            'vuepress-plugin-code-copy',
            {
                align: "top"
            }
        ],
        [
            '@vuepress/pwa',
            {
                serviceWorker: true,
                updatePopup: {
                    message: "网站有更新，可刷新获取最新内容",
                    buttonText: "立即刷新",
                }
            }
        ]
    ],

    theme: 'reco',
    themeConfig: {
        // 文章作者信息配置
        author: 'wenking',
        // 主题类型
        type: 'KingHome',
        // logo
        logo: '/assets/img/logo.png',
        // 显示文章最后更新时间
        lastUpdated: '最后更新时间', // string | boolean
        // 其他: navConf,
        nav: navbarConf,
        // 只有文章标题
        sidebar: sidebarConf,
        // 每篇问文章的子菜单配置
        subSidebar: 'auto',

        // 暂时 取消取色选项
        modePicker: false,

        blogConfig: {
            // category: {
            //     location: 6,     // 在导航栏菜单中所占的位置，默认2
            //     text: 'Category' // 默认文案 “分类”
            // },
            tag: {
                location: 7,     // 在导航栏菜单中所占的位置，默认3
                text: 'Tag'      // 默认文案 “标签”
            },
            socialLinks: [     // 信息栏展示社交信息
                { icon: 'reco-github', link: 'https://github.com/378752389' },
            ]
        }

    }
}
