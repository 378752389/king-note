<script>
export default {
  name: "ScrollTopLoadingData",
  data() {
    return {
      idx: 5,
      boxList: [5, 4, 3, 2, 1],
      loadingText: 'loading...',
      showLoading: false,
      beforeScrollHeight: 0,
    }
  },
  mounted() {
    this.$refs.scrollTopLoadingDataRef.scrollTop = this.$refs.scrollTopLoadingDataRef.scrollHeight
  },
  methods: {
    onScroll: async (e) => {
      let scrollTopLoadingDataRef = document.querySelector("#scroll-top-loading-data")
      if (e.target.scrollTop === 0 && !this.showLoading) {
        console.log("开始加载数据。。。")
        this.beforeScrollHeight = scrollTopLoadingDataRef.scrollHeight
        this.showLoading = true
        try {
          const result = await this.getBoxes()
          console.log("result", result)
          if (result.length === 0) {
            this.loadingText = '没有更多数据了'
            // 如果没有数据，不应该修改 scrollTop 属性，否则又会立即触发 onScroll事件，导致进入死循环
            return
          }
          this.boxList.unshift(...result)
        } catch (e) {
          console.log(e)
        } finally {
          // 无论如何最总都会执行
          this.showLoading = false
        }
        scrollTopLoadingDataRef.scrollTop = scrollTopLoadingDataRef.scrollHeight - this.beforeScrollHeight
      }
    },
    getBoxes: () => {
      return new Promise((resolve) => {
        let result = []
        setTimeout(() => {
          // 模拟没有更多数据
          if (this.idx > 10) {
            resolve(result)
            return
          }
          for (let i = this.idx + 9; i >= this.idx; i--) {
            result.push(i)
          }
          // 更新索引记录
          this.idx = this.idx + 10
          resolve(result)
        }, 2000)
      })
    }
  }
}
</script>

<template>
  <div @scroll="onScroll" ref="scrollTopLoadingDataRef" id="scroll-top-loading-data">
    <div v-if="showLoading" class="loading">{{ loadingText }}</div>
    <div class="box" :key="item" v-for="item in boxList">{{ item }}</div>
  </div>
</template>

<style scoped lang="stylus">
#scroll-top-loading-data
  height 400px
  overflow scroll

  .box
    margin 10px
    height 100px
    width 100px
    background-color #9a6e3a
    display flex
    justify-content center
    align-items center

.loading
  padding 10px
  text-align center
  margin auto
</style>