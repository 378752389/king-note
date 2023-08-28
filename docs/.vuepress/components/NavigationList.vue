<script>
export default {
  data() {
    return {
      pageData: [
        {
          head: "画图软件",
          recommendSites: [
            {
              title: "excalidraw",
              url: "https://excalidraw.com/",
              icon: ""
            },
          ]
        },
        {
          head: "Java开发常用网址",
          recommendSites: [
            {
              title: "hutool",
              url: "https://www.hutool.cn/docs/#/",
              icon: ""
            },
            {
              title: "maven",
              url: "https://mvnrepository.com/",
              icon: ""
            },
            {

              title: "redis命令速查",
              url: "https://www.redis.net.cn/order/",
              icon: ""
            },
            {
              title: "站长工具",
              url: "https://tool.chinaz.com/",
              icon: ""
            }
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
              icon: ""
            },
            {
              title: "阿里镜像站",
              url: "https://developer.aliyun.com/mirror/",
              icon: ""
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
              icon: ""
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
  },
  methods: {
    getOneColor() {
      let size = this.colors.length;
      let index = Math.floor(Math.random() * size);
      let nextIndex = (index + 1) % size;
      return [this.colors[index], this.colors[nextIndex]];
    }
  }
}
</script>

<template>
  <div>
    <div v-for="types in pageData">
      <h3 class="header">{{ types.head }}</h3>

      <ul class="card-container">
        <li class="card-item"
            :key="site.title" v-for="(site, index) in types.recommendSites">

          <a class="content-wrapper" :href="site.url" target="_blank" :title="site.title">
            <img class="content-icon" alt="" height="30" width="30"
                 :src="site.icon || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAb1BMVEX////4+Pi3ubtvcnZNUVU+Q0cpLjLr6+x3en0sMTYkKS59gIORk5aUl5n8/Pzw8PFTV1tbX2Pc3d5DSEzn5+g3PECLjpFKTlKFh4qxs7XCxMUwNTq/wcLh4uPV1tZzd3o/Q0jOz9CmqKpjZ2qfoaSrd37mAAABPUlEQVR4AW3TBZKEMBAF0B8GCHzcnbW5/xm30qEyknklcU/DgQpuYRTHUXgLFHw6SemkmcYrlcd8kRYlnlQ1PU0Fp434Qde75Qd+1FUQKiRZjyGfTGNjKhWMmSQXYO3Ibao3MlqBnSRzADhk/ycAdcqclSSHnEUD+KLt8KalMQMqpl3izU5jKxHQGCq8Ud80fq4VfuFZaIyQO4wVPEre5g+RrIAPJrkQSL8OPjv3htQmH8guU5uwgseeP7ITMYBnpdFgvlJPcx0zoLjjzS/FDrVRvH6xsqDYlLx29huRUaFx6YuI1mhKMbddf9trEzca7rmRk/FxpiRXiJO8FDBURyb4yfO7glC8TOpacmAc4ElMEWlc2oGckjwvYVFEB5wjouE6uLBwquypQym/scKrM4njElYaJy182q15aDj/oQMZkS8JH3IAAAAASUVORK5CYII='">
            <span class="content-text">{{ site.title }}</span>
          </a>
        </li>
      </ul>

      <!--      <div class="container">-->
      <!--        <a class="item"-->
      <!--           :href="site.url"-->
      <!--           target="_blank"-->
      <!--           :style="{background: 'linear-gradient(' + colors[index % colors.length] + ',' +  colors[(index + 1) % colors.length] + ')'}"-->
      <!--           :key="site.title" v-for="(site, index) in types.recommendSites">-->
      <!--          <p class="title">{{ site.title }}</p>-->
      <!--        </a>-->
      <!--      </div>-->

    </div>
  </div>
</template>

<style scoped>

* {
  margin: 0;
  padding: 0;
}

.header {
  margin-bottom: 30px;
  padding-top: 20px;
}

.card-container {
  overflow: hidden;

  .card-item {
    float: left;
    width: 180px;
    height: 50px;
    margin: 5px 10px;
    list-style: none;
    background-color: rgb(246, 246, 246);

    &:hover {
      background-color: #55a532;

      .content-text {
        color: white;
      }
    }

    .content-wrapper {
      height: 100%;
      text-decoration: none;
      display: flex;
      align-items: center;

      .content-icon {
        margin: 0 10px;

      }

      .content-text {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
    }
  }
}
</style>