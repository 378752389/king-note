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
              path: '/中间件/mysql/',
              pic: 'icon-mysql',
              title: 'MySQL',
              desc: 'MySQL是目前IT行业最流行的开源数据库管理系统，本栏目记录数据库设计思想、设计方式以及常见问题及解决方案、主从数据库的搭建等'
            },
            {
              pic: 'icon-redis',
              title: 'Redis',
              desc: 'MySQL是目前IT行业最流行的开源数据库管理系统，本栏目记录数据库设计思想、设计方式以及常见问题及解决方案、主从数据库的搭建等'
            },
            {
              pic: 'icon-shujujieruKafkajiqun',
              title: 'Kafka',
              desc: 'MySQL是目前IT行业最流行的开源数据库管理系统，本栏目记录数据库设计思想、设计方式以及常见问题及解决方案、主从数据库的搭建等'
            },
            {
              pic: 'icon-elasticsearch',
              title: 'Elasticsearch',
              desc: 'MySQL是目前IT行业最流行的开源数据库管理系统，本栏目记录数据库设计思想、设计方式以及常见问题及解决方案、主从数据库的搭建等'
            },
            {
              pic: 'icon-springboot',
              title: 'SpringBoot',
              desc: 'MySQL是目前IT行业最流行的开源数据库管理系统，本栏目记录数据库设计思想、设计方式以及常见问题及解决方案、主从数据库的搭建等'
            },
            {
              pic: 'icon-fenbushi',
              title: '分布式/微服务',
              desc: 'MySQL是目前IT行业最流行的开源数据库管理系统，本栏目记录数据库设计思想、设计方式以及常见问题及解决方案、主从数据库的搭建等'
            },
            {
              pic: 'icon-linux',
              title: 'Linux',
              desc: 'MySQL是目前IT行业最流行的开源数据库管理系统，本栏目记录数据库设计思想、设计方式以及常见问题及解决方案、主从数据库的搭建等'
            },
          ],
        },
        {
          index: 1,
          list: [
            {
              pic: 'icon-redis',
              title: 'Redis',
              desc: 'MySQL是目前IT行业最流行的开源数据库管理系统，本栏目记录数据库设计思想、设计方式以及常见问题及解决方案、主从数据库的搭建等'
            },
          ]
        },
        {
          index: 2,
          list: [
            {
              pic: 'icon-redis',
              title: 'Redis',
              desc: 'MySQL是目前IT行业最流行的开源数据库管理系统，本栏目记录数据库设计思想、设计方式以及常见问题及解决方案、主从数据库的搭建等'
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
@import "http://at.alicdn.com/t/c/font_4461289_xhehbickwg.css";

@font-face
  font-family: 'iconfont';  /* Project id 4461289 */
  src: url('http://at.alicdn.com/t/c/font_4461289_xhehbickwg.woff2?t=1710128193485') format('woff2'),
      url('http://at.alicdn.com/t/c/font_4461289_xhehbickwg.woff?t=1710128193485') format('woff'),
      url('http://at.alicdn.com/t/c/font_4461289_xhehbickwg.ttf?t=1710128193485') format('truetype');


@keyframes extend {
  to {
    width: 80%;
  }
}

.iconfont
  font-size: 80px;

themeColor = green;

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