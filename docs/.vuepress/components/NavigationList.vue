<script>
export default {
  data() {
    return {
      colors: ["#845EC2", "#D65DB1", "#FF6F91", "#FF9671", "#FFC75F", "#F9F871"],
      pageData: [
        {
          head: "推荐博客",
          recommendSites: [
            {
              icon: "icon-link",
              title: "星空小屋",
              url: "https://www.xk857.com//"
            },
            {
              icon: "icon-link",
              title: "程序员大彬",
              url: "https://topjavaer.cn/"
            },
          ]
        },
        {
          head: "画图软件",
          recommendSites: [
            {
              icon: "icon-link",
              title: "excalidraw",
              url: "https://excalidraw.com/"
            },
          ]
        },
        {
          head: "Java开发常用网址",
          recommendSites: [
            {
              icon: "icon-link",
              title: "hutool",
              url: "https://www.hutool.cn/docs/#/"
            },
            {
              icon: "icon-link",
              title: "maven",
              url: "https://mvnrepository.com/"
            },
            {
              icon: "icon-link",
              title: "redis命令速查",
              url: "https://www.redis.net.cn/order/"
            },
            {
              icon: "icon-link",
              title: "站长工具",
              url: "https://tool.chinaz.com/"
            }
          ]
        },
        {
          head: "命令速查",
          recommendSites: [
            {
              icon: "icon-link",
              title: "quick reference",
              url: "http://ref.laoleng.vip/docs/nginx.html"
            },
            {
              icon: "icon-link",
              title: "overapi",
              url: "https://overapi.com/"
            }
          ]
        },
        {
          head: "镜像站点",
          recommendSites: [
            {
              icon: "icon-link",
              title: "清华镜像站",
              url: "https://mirrors.tuna.tsinghua.edu.cn/"
            },
            {
              icon: "icon-link",
              title: "阿里镜像站",
              url: "https://developer.aliyun.com/mirror/"
            },
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

      <div class="container">
        <a class="item"
           :href="site.url"
           target="_blank"
           :style="{background: 'linear-gradient(' + colors[index % colors.length] + ',' +  colors[(index + 1) % colors.length] + ')'}"
           :key="site.title" v-for="(site, index) in types.recommendSites">
          <h3 class="title">{{ site.title }}</h3>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>

.header {
  padding-left: 0.5rem;
  border-left: #3eaf7c solid 5px;
}

.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: start;


  .item {
    padding: 5px;
    margin: 10px 5px;
    height: 150px;
    flex: 0 1 31%;
    box-shadow: 2px 0 2px 2px #f6f6f6,
    -2px 0 2px 2px #f6f6f6,
    0 2px 2px 2px #f6f6f6,
    0 -2px 2px 2px #f6f6f6;
    text-decoration: none;

    display: flex;

    &:hover {

    }

    .title {
      flex: 1;
      text-align: center;
      line-height: 150px;
      color: #f6f6f6;
    }
  }
}

.iconfont {
  line-height: 48px;
  text-align: center;
  font-size: 25px;
}
</style>