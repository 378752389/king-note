<script>
export default {
  name: "FontMixBlend",
  data() {
    return {
      videoSrc: "https://raw.githubusercontent.com/378752389/image-bed/main/king-note/hailang.mp4"
    }
  }
}
</script>

<template>
  <div>
    <div class="wrapper">
      <video
          autoplay
          muted
          loop
          class="video-bg"
          :src="videoSrc"
      ></video>
      <div class="title">Knowledge is power</div>
    </div>
  </div>
</template>

<style scoped lang="stylus">
$bgHeight = 600px
.wrapper
  position relative
  height $bgHeight

  .title
    font-size 10em
    color white
    padding-top 0.8em
    text-align center
    mix-blend-mode difference


  .video-bg
    width 960px
    height $bgHeight
    position absolute
    left 0
    top 0
    right 0
    z-index -1
    object-fit cover


</style>