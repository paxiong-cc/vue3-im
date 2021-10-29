<template>
  <!-- 图表数据 -->
  <div class="scope" :style="{ height: height + 'px' }">
    <div class="scope-title">
      <slot name="title"></slot>
    </div>
    <div class="scope-body">
      <slot name="body"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    height: {
      type: Number,
      default: 310
    }
  }
}
</script>

<style lang="scss" scoped>
$screen-theme: #23C5F3; // 主题色

.scope {
  display: flex;
  flex: 1;
  flex-direction: column;
  padding-top: 13px;
  padding-left: 13px;
  box-sizing: border-box;
  background: url('../../homePic/rectangle.png') no-repeat center/100% 100%;

  &-title {
    box-sizing: border-box;
    padding-left: 8px;
    width: 164px;
    height: 28px;
    font-size: 14px;
    letter-spacing: 1px;
    line-height: 28px;
    color: $screen-theme;
    background: url('../../homePic/view_rect.png') no-repeat center/100% 100%;
  }

  &-body {
    display: flex;
    flex-direction: column;
    flex: 1;
    margin: 10px 20px;
    box-sizing: border-box;
    height: 100%;
  }
}
</style>
