<script>
export default {
  data() {
    return {
      pageData: [
        {
          head: "Java开发常用网址",
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
          ]
        },
        {
          head: "前端开发常用网址",
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
            }
          ]
        },
        {
          head: "资源站推荐",
          recommendSites: [
            {
              title: "iconfont",
              url: "https://www.iconfont.cn/",
              icon: "https://img.alicdn.com/imgextra/i4/O1CN01Z5paLz1O0zuCC7osS_!!6000000001644-55-tps-83-82.svg",
              desc: "alibaba图标字体库"
            },
            {
              title: "excalidraw",
              url: "https://excalidraw.com/",
              icon: ""
            },
            {
              title: "站长工具",
              url: "https://tool.chinaz.com/",
              icon: ""
            },
          ]
        },
        {
          head: "命令速查",
          recommendSites: [
            {
              title: "quick reference",
              url: "http://ref.laoleng.vip/docs/nginx.html",
              icon: ""
            },
            {
              title: "overapi",
              url: "https://overapi.com/",
              icon: ""
            }
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
            }
          ]
        },
      ]
    }
  }
}
</script>

<template>
  <div class="wrapper">
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
.wrapper


  .card
    border-radius 10px;
    margin 30px 0;
    background-color #eaecef;
    padding 20px; 30px;

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