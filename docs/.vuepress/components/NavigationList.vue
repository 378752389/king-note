<script>
export default {
  data() {
    return {
      pageData: [
        {
          head: "Java开发",
          recommendSites: [
            {
              title: "hutool",
              url: "https://www.hutool.cn/docs/#/",
              icon: "https://plus.hutool.cn/images/logo.jpg"
            },
            {
              title: "maven",
              url: "https://mvnrepository.com/",
              icon: "https://mvnrepository.com/img/8152945916bbc1ec8c179d03d0c986db"
            },
            {

              title: "redis命令速查",
              url: "https://www.redis.net.cn/order/",
              icon: "https://www.redis.net.cn/Application/Home/View/Public/img/redis-white.png"
            },
            {
              title: "通义千问",
              url: "https://tongyi.aliyun.com/qianwen/",
              icon: "https://img.alicdn.com/imgextra/i3/O1CN01sffRIx1nb3dXCKdFC_!!6000000005107-2-tps-1024-1024.png",
            },
            {
              title: "quick reference",
              url: "http://ref.laoleng.vip/",
              icon: "data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20height%3D%221em%22%20width%3D%221em%22%3E%20%3Cpath%20d%3D%22m21.66%2010.44-.98%204.18c-.84%203.61-2.5%205.07-5.62%204.77-.5-.04-1.04-.13-1.62-.27l-1.68-.4c-4.17-.99-5.46-3.05-4.48-7.23l.98-4.19c.2-.85.44-1.59.74-2.2%201.17-2.42%203.16-3.07%206.5-2.28l1.67.39c4.19.98%205.47%203.05%204.49%207.23Z%22%20fill%3D%22%23c9d1d9%22%2F%3E%20%3Cpath%20d%3D%22M15.06%2019.39c-.62.42-1.4.77-2.35%201.08l-1.58.52c-3.97%201.28-6.06.21-7.35-3.76L2.5%2013.28c-1.28-3.97-.22-6.07%203.75-7.35l1.58-.52c.41-.13.8-.24%201.17-.31-.3.61-.54%201.35-.74%202.2l-.98%204.19c-.98%204.18.31%206.24%204.48%207.23l1.68.4c.58.14%201.12.23%201.62.27Zm2.43-8.88c-.06%200-.12-.01-.19-.02l-4.85-1.23a.75.75%200%200%201%20.37-1.45l4.85%201.23a.748.748%200%200%201-.18%201.47Z%22%20fill%3D%22%23228e6c%22%20%2F%3E%20%3Cpath%20d%3D%22M14.56%2013.89c-.06%200-.12-.01-.19-.02l-2.91-.74a.75.75%200%200%201%20.37-1.45l2.91.74c.4.1.64.51.54.91-.08.34-.38.56-.72.56Z%22%20fill%3D%22%23228e6c%22%20%2F%3E%20%3C%2Fsvg%3E",
              desc: "常用命令速查网站"
            },
            {
              title: "overapi",
              url: "https://overapi.com/",
              icon: "https://overapi.com/static/images/overapi-logo.png",
              desc: "api速查网站"
            }
          ]
        },
        {
          head: "前端开发",
          recommendSites: [
            {
              title: "Vue官网",
              url: "https://vuejs.org/",
              icon: "https://vuejs.org/logo.svg"
            },
            {
              title: "ElementPlus",
              url: "https://element-plus.org/zh-CN/",
              icon: "https://element-plus.org/images/element-plus-logo.svg",
              desc: "基于Vue3的后台管理UI框架"
            },
            {
              title: "uniapp",
              url: "https://uniapp.dcloud.net.cn/",
              icon: "https://240e03b060230cedd2a638815e9b7ad6.qnqcdn.net:22443/qn-EZgB35KGnOztcKgEuGTAkfEMtBSkeOmQ8Vzc.web-ext-storage.dcloud.net.cn/uni-app-x/logo.ico",
            },
            {
              title: "picsum",
              url: "https://picsum.photos/",
              icon: "data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjMUExQTFBIiB4bWxuczp4PSJodHRwOi8vbnMuYWRvYmUuY29tL0V4dGVuc2liaWxpdHkvMS4wLyIgeG1sbnM6aT0iaHR0cDovL25zLmFkb2JlLmNvbS9BZG9iZUlsbHVzdHJhdG9yLzEwLjAvIiB4bWxuczpncmFwaD0iaHR0cDovL25zLmFkb2JlLmNvbS9HcmFwaHMvMS4wLyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDEwMCAxMDA7IiB4bWw6c3BhY2U9InByZXNlcnZlIj48c3dpdGNoPjxmb3JlaWduT2JqZWN0IHJlcXVpcmVkRXh0ZW5zaW9ucz0iaHR0cDovL25zLmFkb2JlLmNvbS9BZG9iZUlsbHVzdHJhdG9yLzEwLjAvIiB4PSIwIiB5PSIwIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIj48L2ZvcmVpZ25PYmplY3Q+PGcgaTpleHRyYW5lb3VzPSJzZWxmIj48Zz48cGF0aCBkPSJNODYuNSwyOC42aC04LjFsLTEtNy4xYy0wLjQtMi45LTEuOS01LjUtNC4yLTcuM2MtMi4zLTEuOC01LjItMi41LTguMS0yLjFMMTIsMTkuNWMtNiwwLjgtMTAuMiw2LjQtOS40LDEyLjRsNSwzNyAgICAgYzAuOCw1LjUsNS41LDkuNSwxMC45LDkuNWMwLjUsMCwxLDAsMS41LTAuMWwyLjEtMC4zYzAuNSw1LjYsNS4yLDEwLDEwLjksMTBoNTMuNmM2LDAsMTEtNC45LDExLTExVjM5LjYgICAgIEM5Ny41LDMzLjYsOTIuNiwyOC42LDg2LjUsMjguNnogTTkxLjUsMzkuNlY3MUw3NS43LDUyLjljLTIuNi0zLTcuNC0zLTEwLDBMNTIuMSw2OC41bC00LjktNS40Yy0yLjUtMi43LTYuOC0yLjctOS4yLDBMMjgsNzQgICAgIFYzOS42YzAtMi43LDIuMi01LDUtNWg1My42Qzg5LjMsMzQuNiw5MS41LDM2LjksOTEuNSwzOS42eiBNMjIsMzkuNnYzMi4ybC0yLjgsMC40Yy0yLjcsMC40LTUuMi0xLjUtNS42LTQuM0w4LjUsMzEgICAgIGMtMC40LTIuNywxLjUtNS4yLDQuMy01LjZsNTMuMS03LjNjMC4yLDAsMC41LDAsMC43LDBjMi40LDAsNC42LDEuOCw0LjksNC4zbDAuOSw2LjNIMzNDMjYuOSwyOC42LDIyLDMzLjYsMjIsMzkuNnoiPjwvcGF0aD48Y2lyY2xlIGN4PSI0Mi41IiBjeT0iNDcuOCIgcj0iNiI+PC9jaXJjbGU+PC9nPjwvZz48L3N3aXRjaD48L3N2Zz4=",
              desc: "模拟图片生成站点"
            },
            {
              title: "iconfont",
              url: "https://www.iconfont.cn/",
              icon: "https://img.alicdn.com/imgextra/i4/O1CN01Z5paLz1O0zuCC7osS_!!6000000001644-55-tps-83-82.svg",
              desc: "alibaba图标字体库"
            },
            {
              title: "路径裁剪",
              url: "https://techbrood.com/tool?p=css-clip-path",
              icon: "https://techbrood.com/themes/techbrood/image/favicon.ico",
              desc: "css3路径裁剪在线网站"
            },
            {
              title: "贝塞尔曲线",
              url: "https://cubic-bezier.com/",
              icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAASFJREFUOE9jZFi5s4GBkamegVTAyPCT4d+/DkaGVbv/k6oXrp6R4SfJBmQoyzDUaCoyyGw5DDaHKAOYGRkZfKVEGFZa6DIobTvK8PT7TyRH4PACCyMjg5OYEFjx1U9fGP6GuDAwr9mD4VusLqjXUmJovHYPrrhUXZ5hxt0nDJ///CXOAHRV/0NdGBhXY9pOdBi88bdnENl4EGtkEQxEDmYmhgoNBYaGqwgvIZtE0IAOXRWGist3cCYVgga883dgENp4gDwDfgY7MbCv3QfXLM3JzmAqxMcQJC3GEHfqKvaEpMfPw7DcQpfhw+/fDFWX7zIIsrEwnH3/meHxtx/4A/GulzUDHwsLQ9a5Gwyrn7wkOnsQDANCJjGSnZ1BJv//1wgAPm9vR0vA5jMAAAAASUVORK5CYII=",
              desc: "贝塞尔曲线在线调试网站"
            },
            {
              title: "BootCDN",
              url: "https://www.bootcdn.cn/",
              icon: "https://www.bootcdn.cn/assets/ico/favicon.ico?1694658481677",
              desc: "免费快速的CDN网站"
            },
          ]
        },
        {
          // https://ubuntu.pkgs.org/
          head: "Linux运维",
          recommendSites: [
            {
              title: "pkg.org",
              url: "https://pkgs.org/",
              icon: "https://assets.pkgs.org/img/favicon.svg?v1",
              desc: "Linux三方包站点集合"
            },]
        },
        {
          head: "工具站",
          recommendSites: [
            {
              title: "蜻蜓工具",
              url: "https://33tool.com/",
              icon: "https://33tool.com/_nuxt/icons/icon_512x512.4510fe.png",
              desc: "常用的工具站集合/idea激活码",
            },
            {
              title: "icyberchef",
              url: "https://icyberchef.com/",
              icon: "https://icyberchef.com/assets/aecc661b69309290f600.ico",
              desc: "非常好用的数据加解密网站"
            },
            {
              title: "excalidraw",
              url: "https://excalidraw.com/",
              icon: "https://excalidraw.com/og-image-2.png",
              desc: "免费在线的画图网站"
            },
            {
              title: "idea激活码",
              url: "https://key.words.run/cn/",
              desc: "可能有用"
            },
          ]
        },
        {
          head: "刷题",
          recommendSites: [
            {
              title: "力扣",
              url: "https://leetcode.cn/problemset/",
              icon: "https://th.bing.com/th?id=ODLS.9f91cf01-60a5-4b07-9970-5ab9c4c7d1d7&w=32&h=32&qlt=90&pcl=fffffa&o=6&pid=1.2",
            },
            {
              title: "牛客",
              url: "https://www.nowcoder.com/",
              icon: "https://static.nowcoder.com/fe/file/images/nowpick/web/www-favicon.ico",
            },
          ]
        },
        {
          head: "镜像站点",
          recommendSites: [
            {
              title: "清华镜像站",
              url: "https://mirrors.tuna.tsinghua.edu.cn/",
              icon: "https://mirrors.tuna.tsinghua.edu.cn/static/img/logo-small@2x.png"
            },
            {
              title: "阿里镜像站",
              url: "https://developer.aliyun.com/mirror/",
              icon: "https://img.alicdn.com/tfs/TB13DzOjXP7gK0jSZFjXXc5aXXa-212-48.png"
            },
          ]
        },
        {
          head: "推荐博客",
          recommendSites: [
            {
              title: "星空小屋",
              url: "https://www.xk857.com/",
              icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAfCAMAAACxiD++AAAAYFBMVEVHcEwAHckAHskAHskAHskAHskAHskAHskAHskAHskAHskAHskAHskAHskAHskAHcnoESPoECLoESPoESMAHsnoESPoESPoECLoECPoESPoESPoESPoESPoESPoESPoESNoVtKkAAAAIHRSTlMAC1+n0uziwZdPNf9uQ4gZeB9g//ZIuQ8yx6hS75B95Oe73cIAAAEwSURBVHgBXdEFEsMwDATACzMqjP//Ze34pmq6AwGDzjKU5wdhFMVJmkGpPClU6uGPp8NOiZeqUJRAwefPoMwqv44Kq4LKCititqawfKDt8PsnfX3VQC/CGfEr1MDZoxgMwPWczYBiTTAiWx8UFkYIYxZrAfJvZC+IokJnL2KsQG1+DTC8gjw4m0uRMAECjjegToz9ieCzvJXj6zATTjACuEMGdP2iNTZoRrZj4/GA83kbWMLwfY/RZNQJobaJP61LSwTumNSKM4IhW2SM9ujFWWF0bGWhW4xiHcf52yjUvB42V/rfPj1TC87oGI9uMWaA15Xx+k7Qql8oTYM4vsGZn/U3qEzdmdhBdoMFtKKxXvu4X6s4HVR3yL9jhuKplaZVyypq0+VQc7+t932v5wj1AUpcIew07dayAAAAAElFTkSuQmCC"
            },
            {
              title: "ES6入门教程",
              url: "https://es6.ruanyifeng.com/",
              icon: "/king-note/assets/img/other/laughyouth.png"
            },
            {
              title: "现代 JavaScript 教程",
              url: "https://zh.javascript.info/",
              icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADF0lEQVR4Ac1WA5AcQRTtGOcdnG+mpxTbtlmIbZZiOylEpaAQ2062dmZj2ywEpdjWf7U9mzNnrvIOXf0bv//7mM8ywiFPfMI2llCCOQDc4/XEJebwECtkqcZy05NUhuUBPkkr7VeNFTMZK8xyCrDgV4wnpsIHslzAUvT+OJ+59ZmjAF1wgCz4Q2xs3CvLYdliT1FCLZWvxzlLMQ7hHpZbHAqNUSyF38dlpqqPZ9kAKR8rlD/whkarLK8wZaOnuPBRVhfuD4uTibWHAdZ4b+YEVjJWxFT5bGLip1/m0zL3O5+CffQ3F+eYk7AkXsOv8B0ZpedqphfHus+j12I5BQLMJ+kdLUlr4o1KLGeG8GikYhqKWVzJjFITcqynliMFj8harBnFK5iS0cySeXs8lqXG7kg9kqgbTVb8hg8xUvQPTze/ZaMt+foi/X3AiHm6rMn6jOB9Kv9CewcgSzIrQEXBBG1eRJsviWA6byp6q+TKIU/9l/wRtL8rPf5GwBDjFAXwAr+itSE2CrLsAq4gutYFLuDbTIXXhxwWi6x4RuMsjJhDLpS3ov37yPJjtLbaiuQacwJgByNoF1bPwhwj5pAH97kJmwEaX5CVRzEmY8B1oDC1yzwG3Adov5VcOQXcbZZfQE5bCv8FxQhOO2Uhzx8XqMYIO+jwqU32mFEsP0Cp5RdpuDPgDn5OsHCMuQ3xef4ZLFAor7I+HXMwgRLubvDJfEgw+OxyrfDj9pxK7zCX6edeofiqJWtVKPp3BWo9/ygeYboX/eEJHgq8H4LuOajrqPkUC/dJ/l7If6Ipccl6vb9NtalqaFDui1j4aMp8zz838EFuleADdrAJN7wBE2ZYvBRoRI2vQn6EOQ1flBFBCr4lD76jCr+CB1iqVgfNCxSL+vD9QERSlLPFR+K9ghRLxlK06UT9y2QPem33DwGW9H7MSZDC3aLmf7M7GgShV9JrkmwmaoLtGsHCAeYUoBDtlPC/N7MiZX+k8FC4zaFuWOuMS7NT7xET9l6kKHMCKLeodmSVBSsz3RuRZNDeE+SCkz5Fq8z+d/wFbvfHWf586qAAAAAASUVORK5CYII="
            },
            {
              title: "阮一峰的网络日志",
              url: "https://www.ruanyifeng.com/blog/",
              icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAARVBMVEVHcEz7+/v///+0tLRNTU2Xl5fl5eX6+vrMzMwsLCwAAAA+Pj6BgYGMjIzx8fG/v79mZmaoqKhaWlpycnIbGxva2tqfn5+Px28AAAAAAnRSTlMAD+Ys0KkAAAEISURBVHgBddJXYgUhCAXQF0TUq2Kf/S81PZnK77HQXq+353i90X8YtiLi6DcO6ANiykZvkQy4+CTk7tChts7ZjnKDhFQA4AHnDNbr9VnnfET1d9nq2mplxIAgJ5SSeOQUgTlOpUjjuW0jbIzQPmmHMlD96khUkfwRNcWiZLi5FRCDdXsUI5+5UuEJYChds5UE9DAXOXdBmejWhOh7zHpGH62sCIDHdkG3tAUgm3X3pzaMHj7/u6KaULVmIm+TOaKMPFkkuhIjT/Q9rgDwosJ1GqIM3mND/czDglVkdcget/6ZiPSglHhguD2K0Ecsro7G5wc326e1qgFg6A6HF4DL/VI7ItV9G94BM3wQx6/kxRMAAAAASUVORK5CYII="
            },
            {
              title: "鑫空间",
              url: "https://www.zhangxinxu.com/wordpress/",
              icon: "https://favicon.yandex.net/favicon/v2/www.zhangxinxu.com?size=32",
            }
          ]
        },
      ]
    }
  }
}
</script>

<template>
  <div class="nav-wrapper">
    <div class="card" :key="card.head" v-for="card in pageData">
      <div class="head">{{ card.head }}</div>
      <div class="body">
        <a class="item" :href="site.url" target="_blank" :key="index" v-for="(site, index) in card.recommendSites">
          <img class="pic" :src="site.icon || '/king-note/assets/img/other/laughyouth.png'" :alt="site.title"/>
          <div>
            <div class="title">{{ site.title }}</div>
            <div class="desc">{{ site.desc || site.title }}</div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.nav-wrapper

  .card
    border-radius 10px;
    margin 30px 0;
    background-color #eaecef;
    padding 20px;
    30px;

    .head
      font-size 28px;
      font-weight 700;
      line-height 2;
      border-bottom 1px solid rgba(0, 0, 0, 0.3);
      margin-bottom 10px;

    .body
      display flex;
      flex-wrap wrap;

      .item
        display flex;
        padding 20px 10px;
        text-decoration none;
        color black;
        margin 0 5px;

        &:hover
          box-shadow 0 5px 5px 0 rgba(108, 135, 135, .2);

        .pic
          margin-top 8px;
          margin-right 10px;
          width 30px;
          height 30px;

        .title
          font-weight 700;
          line-height 1.5;
          font-size 20px;

        .desc
          margin-top 10px;
          font-size 10px;
</style>