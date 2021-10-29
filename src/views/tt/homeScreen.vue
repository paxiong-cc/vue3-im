<template>
  <section ref="docker" class="home-screen-container">
    <!-- 顶部导航 -->
    <Nav />

    <div class="content-box">
      <!-- 基础数据 -->
      <BasicData class="basic-data" />
      <!-- 折线图 -->
      <BrokenLine class="broken-data" />
      <!-- 统计图 -->
      <Rank class="broken-data" />
    </div>

    <!-- 加载动画 -->
    <Loading v-if="showLoading" />
  </section>
</template>

<script>
import Loading from './components/Loading'
import Nav from './components/Nav'
import BasicData from './components/BasicData'
import BrokenLine from './components/BrokenLine'
import Rank from './components/Rank'

export default {
  name: 'HomeScreen',

  components: {
    Loading,
    Nav,
    BasicData,
    BrokenLine,
    Rank
  },

  data() {
    return {
      // 容器初始可视区域
      docker: {
        clientWidth: 1920,
        clientHeight: 969
      },
      showLoading: true // 是否展示动画效果
    }
  },

  created() {
    setTimeout(() => {
      this.showLoading = false
    }, 3000)
  },

  mounted() {
    this.updateSize()
    this.updateScale()

    const update = () => {
      this.updateSize()
      this.updateScale()
    }

    window.onresize = update
  },

  beforeUnmount() {
    window.onresize = null
  },

  methods: {
    // 修改宽高比
    updateScale() {
      const dom = this.$refs.docker

      // 获取当前真实的视口尺寸
      const currentWidth = document.body.clientWidth
      const currentHeight = document.body.clientHeight

      // 获取之前的视口尺寸
      const initWidth = this.docker.clientWidth
      const initHeight = this.docker.clientHeight

      // 缩放
      const widthScale = currentWidth / initWidth
      const heightScale = currentHeight / initHeight

      // console.log(heightScale)
      // 修改缩放比
      dom.style.transform = `scale(${widthScale}, ${heightScale})`
    },

    // 修改尺寸
    updateSize() {
      const dom = this.$refs.docker
      dom.style.width = this.docker.clientWidth + 'px'
      dom.style.height = this.docker.clientHeight + 'px'
    }
  }
}
</script>

<style lang="scss" scoped>
$screen-theme: #23C5F3; // 主题色

.home-screen-container {
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  box-sizing: border-box;
  padding: 22px 20px 20px;
  width: 100%;
  height: 100%;
  background: url('./homePic/bg.png') no-repeat center/100% 100%;
  transform-origin: left top;
  user-select: none;

  .content-box {
    position: relative;
    top: -60px;
  }

  .broken-data {
    margin-top: 25px;
  }
}
</style>
