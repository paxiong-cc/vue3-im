<template>
  <section class="manage-container">
    <!-- 顶部 -->
    <a-layout :style="{background: '#fff'}">
      <a-layout-header class="header">
        <div class="page-title">
          <router-link to="/">
            <span>怕熊乐高</span>
          </router-link>
        </div>
        <a-button shape="round" type="primary">登录</a-button>
      </a-layout-header>
      <!-- 内容 -->
      <a-layout-content class="content">
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
    <!-- 底部 -->
    <a-layout-footer style="text-align: center">
      © 怕熊（paxiong.com）版权所有 | 蜀ICP备2021006541号
    </a-layout-footer>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({

})
</script>

<style lang="scss" scoped>
.manage-container {
  @include flex($dr: column);
}

.header {
  @include flex($row: space-between, $align: center);
}

.manage-container /deep/.ant-layout {
  min-height: auto !important;
}

.page-title {
  color: #fff;
}
</style>
