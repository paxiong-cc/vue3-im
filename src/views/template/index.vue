<template>
  <div class="work-detail-container">
    1232131
    <!-- <a-row type="flex" justify="center" v-if="detail">
      <a-col :span="4" class="cover-img">
        <img :src="detail.coverImg" alt="">
      </a-col>
      <a-col :span="8">
        <h2>{{detail.title}}</h2>
        <p>{{detail.title}}</p>
      <div class="author">
        <a-avatar>V</a-avatar>
        该模版由 <b>{{detail.author}}</b> 创作
      </div>
      <div class="bar-code-area" >
        <span>扫一扫，手机预览</span>
        <div ref="container"></div>
      </div>
      <div class="use-button">
        <router-link to="/editor">
          <a-button
            type="primary"
            size="large"
          >
            使用模版
          </a-button>
        </router-link>
        <a-button
          size="large"
        >
          下载图片海报
        </a-button>
      </div>
      </a-col>
    </a-row> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { TemplateProps, GlobalDataProps } from '@/store/interfaces'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const route = useRoute()
    const store = useStore<GlobalDataProps>()
    const id = route.params.id
    const detail = computed<TemplateProps>(() => store.getters.getElementById(Number(id)))

    return {
      detail
    }
  }
})
</script>

<style lang="scss" scoped>
.work-detail-container {
  margin-top: 50px;
}
.cover-img {
  margin-right: 30px;
}
.cover-img img {
  width: 100%;
}
.use-button {
  margin: 30px 0;
}
.ant-avatar {
  margin-right: 10px;
}
.bar-code-area {
  margin: 20px 0;
}
</style>
