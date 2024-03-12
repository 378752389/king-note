<template>
  <div class="wrapper">

    <div class="main">
      <div class="tab">
        <div class="switch">
          <div :class="[{active: currentColumn === 0}]" @click="currentColumn=0">
            <div>Java后端技术</div>
          </div>
          <div :class="[{active: currentColumn === 1}]" @click="currentColumn=1">
            <div>前端技术</div>
          </div>
          <div :class="[{active: currentColumn === 2}]" @click="currentColumn=2">
            <div>运维与自动化技术</div>
          </div>
        </div>

        <div class="container" :key="column.index" v-for="column in columns">
          <div class="card" v-show="column.index === currentColumn" :key="index" v-for="(item, index) in column?.list" @click="onCardClick(item.path || '/')">
            <i :class="['iconfont', 'card-pic', item.pic]"></i>
            <div class="card-title">{{ item.title }}</div>
            <p class="card-desc overflow-truncate">{{ item.desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "KingHome",
  data() {
    return {
      currentColumn: 0,
      columns: [
        {
          index: 0,
          list: [
            {
              path: '/中间件/mysql/环境搭建',
              pic: 'icon-mysql',
              title: 'MySQL',
              desc: 'MySQL是目前IT行业最流行的开源数据库管理系统，本栏目记录数据库设计思想、设计方式以及常见问题及解决方案、主从数据库的搭建等'
            },
            {
              pic: 'icon-redis',
              path: '/中间件/redis/环境搭建',
              title: 'Redis',
              desc: 'Redis是一款内存键值存储系统，兼具数据库和缓存功能，支持数据持久化、多种数据结构及高速读写。'
            },
            {
              path: '/中间件/kafka/环境搭建',
              pic: 'icon-shujujieruKafkajiqun',
              title: 'Kafka',
              desc: 'Kafka是一个高吞吐量的分布式消息队列系统，常用于构建实时数据管道和流处理平台。'
            },
            {
              pic: 'icon-elasticsearch',
              path: '/中间件/elasticsearch/RestAPI',
              title: 'Elasticsearch',
              desc: 'Elasticsearch是基于Lucene的分布式全文搜索引擎，支持实时检索、分析和大规模数据处理。'
            },
            {
              pic: 'icon-springboot',
              title: 'SpringBoot',
              desc: 'Spring Boot简化了Spring应用开发，提供自动配置、起步依赖和内置服务器，加速构建微服务应用。'
            },
            {
              pic: 'icon-fenbushi',
              title: '分布式/微服务',
              desc: '分布式系统通过网络互联多个独立服务，微服务架构则将其细化为小型自治服务，增强可扩展性和维护性。'
            },
          ],
        },
        {
          index: 1,
          list: [
            {
              pic: 'icon-H',
              title: '前端基础',
              path: "/front/基础/html标签",
              desc: "HTML5是最新一代超文本标记语言标准，集成了多媒体元素、图形绘制、离线存储等功能。它使得开发者能创建富互联网应用，跨平台兼容性更强，同时强化了Web应用的功能性和互动体验。",
            },
            {
              pic: 'icon-vuejs',
              title: 'Vue',
              path: "/front/vue/vue",
              desc: "Vue是一款流行的渐进式JavaScript框架，用于构建用户界面。它易于上手且高度可组件化，通过声明式的数据绑定和响应式系统简化了前后端交互与动态网页开发。"
            },
            {
              pic: 'icon-style',
              title: '常用样式效果',
              path: "/front/样式效果/flex两栏布局",
              desc: "CSS即层叠样式表，负责网页布局、外观美化，实现内容与表现分离，支持响应式设计和动画效果。",
            },
            {
              pic: 'icon-component',
              title: '通用组件',
              path: "/front/通用组件/前端数据下载",
              desc: "Vue组件是可复用UI模块，封装HTML/CSS/JS，实现独立逻辑和样式，通过组件化开发提升效率。",
            },
          ]
        },
        {
          index: 2,
          list: [
            {
              path: "/linux/命令/命令集合",
              pic: 'icon-linux',
              title: 'Linux',
              desc: 'Linux是一种开源操作系统内核，支持多种发行版如Ubuntu、Red Hat等。以其稳定性、安全性、灵活性著称，广泛应用于服务器、嵌入式设备及桌面计算环境。'
            },
            {
              path: "/linux/容器/docker安装",
              pic: 'icon-docker',
              title: '容器化',
              desc: 'Docker是一个容器化平台，通过轻量级虚拟化技术打包应用及其依赖，形成可移植、隔离性强的容器。开发者和运维人员可以快速构建、部署和运行分布式应用，实现持续集成和交付。'
            },
            {
              path: "/linux/配置/ssh",
              pic: 'icon-peizhi-xitongpeizhi',
              title: '系统配置',
              desc: 'Linux系统配置涵盖网络、服务、安全等方面的个性化设定，通过修改配置文件和命令行工具优化系统性能和服务行为。'
            },
          ]
        },
      ]
    }
  },
  methods: {
    onCardClick(path) {
      this.$router.replace({
        path,
      })
    }
  }
}
</script>


<style lang="stylus" scoped>
@import "https://at.alicdn.com/t/c/font_4461289_fqauwuwxaev.css";

@font-face
  font-family: 'iconfont';  /* Project id 4461289 */
  src: url('https://at.alicdn.com/t/c/font_4461289_xhehbickwg.woff2?t=1710128193485') format('woff2'),
      url('https://at.alicdn.com/t/c/font_4461289_xhehbickwg.woff?t=1710128193485') format('woff'),
      url('https://at.alicdn.com/t/c/font_4461289_xhehbickwg.ttf?t=1710128193485') format('truetype');


@keyframes extend {
  to {
    width: 80%;
  }
}

.iconfont
  font-size: 80px;

themeColor = #3eaf7c;

.overflow-truncate
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 6;
  overflow: hidden;


.wrapper
  margin-top: 60px;
  overflow hidden;
  background: url("https://gzfhsw.oss-cn-guangzhou.aliyuncs.com/typora/2022/07/section2-bg.png") no-repeat fixed 0 150px;

  .main
    width: 1200px;
    margin: auto;

    .switch
      margin: 30px auto;
      width: fit-content;
      font-size: 32px;
      display: flex;
      height: 50px;

      & > div
        cursor: pointer;
        position: relative;
        margin: 0 30px;


      & > div:hover:not(.active) > div
        transform: scale(1.1);
        border-bottom: 2px solid themeColor;


      & > .active > div
        transform: scale(1.1);
        border-bottom: 2px solid themeColor;


      & > div:not(:last-child)::after
        content: "/";
        display: inline;
        position: absolute;
        top: 0;
        right: -40px;


    .container
      display: flex;
      justify-content: center;
      flex-wrap: wrap;


      .card
        height: 450px;
        width: 240px;
        border: 1px solid rgba(108, 135, 135, .2);
        position: relative;
        margin: 20px 10px;

        display: flex;
        flex-direction: column;
        align-items: center;

        &::after
          content: "";
          display: block;
          height: 3px;
          position: absolute;
          bottom: 5px;

          align-self: center;
          background-color: themeColor;
          width: 0;


        &:hover
          cursor: pointer;
          box-shadow: 0 10px 20px 0 rgba(108, 135, 135, .2);

          .iconfont
            color themeColor;

          &::after
            animation: extend 0.5s forwards;

          .card-title
            color: themeColor;

        .card-title
          font-size 30px;
          font-weight 700;

        .card-pic
          margin: 30px 0;

        .card-desc
          margin-top: 30px;
          padding: 0 20px;

          letter-spacing: 3px;
          line-height: 2;

</style>