<script>
export default {
  data() {
    return {
      colors: ["#845EC2", "#D65DB1", "#FF6F91", "#FF9671", "#FFC75F", "#F9F871"],
      pageData: [
        {
          head: "画图软件",
          recommendSites: [
            {
              title: "excalidraw",
              url: "https://excalidraw.com/"
            },
          ]
        },
        {
          head: "Java开发常用网址",
          recommendSites: [
            {
              title: "hutool",
              url: "https://www.hutool.cn/docs/#/"
            },
            {
              title: "maven",
              url: "https://mvnrepository.com/"
            },
            {

              title: "redis命令速查",
              url: "https://www.redis.net.cn/order/"
            },
            {
              title: "站长工具",
              url: "https://tool.chinaz.com/"
            }
          ]
        },
        {
          head: "命令速查",
          recommendSites: [
            {
              title: "quick reference",
              url: "http://ref.laoleng.vip/docs/nginx.html"
            },
            {
              title: "overapi",
              url: "https://overapi.com/"
            }
          ]
        },
        {
          head: "镜像站点",
          recommendSites: [
            {
              title: "清华镜像站",
              url: "https://mirrors.tuna.tsinghua.edu.cn/"
            },
            {
              title: "阿里镜像站",
              url: "https://developer.aliyun.com/mirror/"
            },
          ]
        },
        {
          head: "推荐博客",
          recommendSites: [
            {
              title: "星空小屋",
              url: "https://www.xk857.com//"
            },
            {
              title: "程序员大彬",
              url: "https://topjavaer.cn/"
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
          <p class="title">{{ site.title }}</p>
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
    margin: 5px 20px;
    text-align: center;
    text-decoration: none;
    line-height: 2em;
    height: 2em;
    width: 10em;

    .title {
      flex: 1;
      text-align: center;
      color: #f6f6f6;
    }
  }
}
</style>