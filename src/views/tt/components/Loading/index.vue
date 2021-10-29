<template>
  <div class="mask">
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="display: block;" width="80px" height="80px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
      <circle cx="50" cy="50" r="32" stroke-width="8" stroke="#1283d3" stroke-dasharray="50.26548245743669 50.26548245743669" fill="none" stroke-linecap="round">
        <animateTransform attributeName="transform" type="rotate" dur="2s" repeatCount="indefinite" keyTimes="0;1" values="0 50 50;360 50 50"></animateTransform>
      </circle>
      <circle cx="50" cy="50" r="23" stroke-width="8" stroke="#1283d3" stroke-dasharray="36.12831551628262 36.12831551628262" stroke-dashoffset="36.12831551628262" fill="none" stroke-linecap="round">
        <animateTransform attributeName="transform" type="rotate" dur="2s" repeatCount="indefinite" keyTimes="0;1" values="0 50 50;-360 50 50"></animateTransform>
      </circle>
    </svg>

    <div class="tips">
      <span>正在加载</span>
      <div class="ellipsis">
        <span>.</span>
        <span class="ellipsis-2">.</span>
        <span class="ellipsis-3">.</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timer: null
    }
  },

  mounted() {
    this.animate()

    this.timer = setInterval(() => {
      this.animate()
    }, 2400)
  },

  beforeUnmount() {
    clearInterval(this.timer)
  },

  methods: {
    // 右侧动画
    animate() {
      const ellipsis2 = document.querySelector('.ellipsis-2')
      const ellipsis3 = document.querySelector('.ellipsis-3')

      setTimeout(() => {
        ellipsis2.style.visibility = 'visible'
      }, 700)

      setTimeout(() => {
        ellipsis3.style.visibility = 'visible'
      }, 1400)

      setTimeout(() => {
        ellipsis2.style.visibility = 'hidden'
        ellipsis3.style.visibility = 'hidden'
      }, 2200)
    }
  }
}
</script>

<style lang="scss" scoped>
.mask {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  background: rgba(21, 37, 65, 1);
}

.tips {
  display: flex;
  position: relative;
  font-size: 16px;
  letter-spacing: 3px;
  color: #fff;

  .ellipsis {
    position: absolute;
    right: -20px;
    width: 20px;

    .ellipsis-2, .ellipsis-3 {
      visibility: hidden;
    }
  }
}
</style>
