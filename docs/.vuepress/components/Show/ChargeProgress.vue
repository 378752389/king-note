<script>
export default {
  name: "ChargeProgress",
  data() {
    return {
      percent: 0
    }
  },
  mounted() {
    const power = document.querySelector('.power')
    const range = document.querySelector('#range')
    range.addEventListener('input', (e) => {
      this.percent = e.target.value;
      power.style.setProperty('--power', this.percent)
    })
  }
}
</script>

<template>
  <div class="charge-progress">
    <div class="power">
      {{ percent }}%
    </div>
    <input id="range" type="range" min="0" max="100" value="0"/>
  </div>
</template>

<style scoped lang="stylus">

.charge-progress
  .power
    --power: 0;
    margin: 30px;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid;
    position: relative;
    overflow: hidden;

    &::after
      content: "";
      position: absolute;
      display: block;
      width: 100%;
      height: 100%;
      border-radius: 30%;
      background: aqua;
      animation: rotate 4s linear infinite;
      z-index: -1;


@keyframes rotate
  0%
    transform: translateY(calc(100% - var(--power) * 1%)) rotate(0);

  100%
    transform: translateY(calc(100% - var(--power) * 1%)) rotate(360deg);


</style>