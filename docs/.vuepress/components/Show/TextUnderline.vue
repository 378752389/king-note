<script>
export default {
  name: "TextUnderline",
  data() {
    return {}
  },
  methods: {}
}
</script>

<template>
  <div class="text-underline pointer-select">
    <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aliquam, amet aspernatur, consequuntur cupiditate deleniti excepturi illum laudantium molestias natus recusandae rem rerum, soluta tempora ullam velit vitae voluptatem voluptates!</span>
  </div>
</template>

<style scoped lang="stylus">
.text-underline
  width 600px
  font-size 26px
  line-height 1.5

  & > span
    background linear-gradient(to right, #1aee44, #e2a5a4) no-repeat
    background-size 0 2px
    background-position right bottom
    transition background-size 1s

  &:hover span
    background-size 100% 2px
    background-position left bottom
</style>