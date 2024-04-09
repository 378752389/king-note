<script>
export default {
  name: "SvgStrokeAnimation",
  mounted() {
    // 计算路径的总长度
    this.init()
    // 播放动画
    this.replay()

  },
  methods: {
    init() {
      const svgEl = document.querySelector('.svg-icon')
      traver(svgEl)

      function traver(dom) {
        if (dom.children.length === 0) {
          return;
        }

        for (let i = 0; i < dom.children.length; i++) {
          let el = dom.children[i];
          if (el.tagName === 'g') {
            traver(el)
          } else {
            el.style.setProperty('--l', el.getTotalLength())
          }
        }
      }
    },
    replay() {
      const svgEl = document.querySelector('.svg-icon');
      traver(svgEl)

      function traver(dom) {
        if (dom.children.length === 0) {
          return;
        }

        for (let i = 0; i < dom.children.length; i++) {
          let el = dom.children[i];
          if (el.tagName === 'g') {
            traver(el)
          } else {
            console.log(111)
            el.classList.remove('stroke-animation');
            requestAnimationFrame(() => {
              el.classList.add('stroke-animation')
            })
          }
        }
      }
    }
  }
}
</script>

<template>
  <div>
    <svg class="svg-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
         stroke="#000000"
         stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <g class="path" fill="none" fill-rule="evenodd">
        <path class="path" d="M18 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8c0-1.1.9-2 2-2h5M15 3h6v6M10 14L20.2 3.8"/>
      </g>
    </svg>

    <button @click="replay">重新播放</button>
  </div>
</template>

<style scoped lang="stylus">
.svg-icon
  width: 24px;
  height: 24px;
  fill: none;
  stroke: #000000;
  stroke-width: 2;

  .path
    --l: 0;
    stroke-dasharray: calc(var(--l) * 1px);
    stroke-dashoffset: calc(var(--l) * 1px);

.stroke-animation
  animation: stroke 2s forwards;

@keyframes stroke
  0%
    stroke-dashoffset: calc(var(--l) * 1px);
  100%
    stroke-dashoffset: 0;


</style>