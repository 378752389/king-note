<script>
export default {
  name: "SlideBox",
  data() {
    return {}
  },
  methods: {
    onSelectBtn1() {
      const slide = document.querySelector('.slide1')
      slide.style.height = 'auto'
      const {height} = slide.getBoundingClientRect()
      slide.style.height = '0'
      requestAnimationFrame(() => {
        slide.style.height = height + 'px'
      })
    },
    onUnselectBtn1() {
      const slide = document.querySelector('.slide1')
      slide.style.height = '0'
    },
    onSelectBtn2() {
      const slide = document.querySelector('.slide2')
      slide.style.width = 'auto'
      const {width} = slide.getBoundingClientRect()
      slide.style.width = '0'
      requestAnimationFrame(() => {
        slide.style.width = width + 'px'
      })
    },
    onUnselectBtn2() {
      const slide = document.querySelector('.slide2')
      slide.style.width = '0'
    }
  }
}
</script>

<template>
  <div class="slide-box pointer-select">
    <button class="btn" @mouseenter="onSelectBtn1" @mouseleave="onUnselectBtn1">选择我（纵向）</button>


    <div class="slide1">
      <div class="content">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus alias, cum cumque, dolorum eveniet,
        exercitationem expedita facilis fugit id impedit nisi reiciendis sapiente sed sit tempore voluptate voluptates
        voluptatibus. Aliquid, aperiam atque autem beatae deserunt dolores eligendi ex facilis, ipsam magni quae
        quisquam recusandae sed sit, soluta! Architecto consectetur debitis deserunt dignissimos facere illum, iure
        labore modi nemo nostrum obcaecati quaerat ullam voluptatum? A ab animi asperiores assumenda consequuntur
        dignissimos distinctio eos fugiat in, ipsam nam natus nisi numquam obcaecati odio praesentium quas quo rem
        repellendus reprehenderit soluta suscipit tempore unde veritatis voluptates. Animi corporis dignissimos ea, iste
        nobis tempora?
      </div>
    </div>


    <button class="btn" @mouseenter="onSelectBtn2" @mouseleave="onUnselectBtn2">选择我（横向）</button>

    <div class="slide2">
      <div class="content">
        <p>consectetur adipisicing elit. Necessitatibus, nesciunt.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.odio quia recusandae rerum</p>
        <p> numquam obcaecati odio quia recusandae rerum voluptas! Aliquam commodi facilis ipsum
          pariatur voluptatem?</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="stylus">
.slide-box
  padding 20px

  .btn
    width 150px
    height 60px
    padding 5px
    margin 20px 0

  .content
    padding 10px
    font-size 20px

  .slide1
    width 500px
    height 0
    overflow hidden
    transition 1s

  .slide2
    width 1px
    text-wrap nowrap
    overflow hidden
    height 200px
    transition 1s
</style>