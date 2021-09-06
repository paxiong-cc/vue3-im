<template>
  <section class="manage-container">
    <!-- 顶部 -->
    <a-layout :style="{background: '#fff'}">
      <a-layout-header class="header">
        <!-- <div class="page-title">
          <router-link to="/">
            <span>怕熊乐高</span>
          </router-link>
        </div>
        <a-button
          v-if="!user.isLogin"
          class="login"
          shape="round"
          type="primary"
          @click="login"
        >登录</a-button>
        <div v-else>
          <a-dropdown-button class="user-profile-component">
            <router-link to="/setting">{{ user.userName }}</router-link>
            <template v-slot:overlay>
              <a-menu class="user-profile-dropdown">
                <a-menu-item key="0" @click="logout">登出</a-menu-item>
              </a-menu>
            </template>
          </a-dropdown-button>
        </div> -->
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
import { computed, defineComponent, PropType } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import { UserProps } from '@/store/interfaces'

export default defineComponent({
  setup() {
    const store = useStore()
    const router = useRouter()

    const user = computed<UserProps>(() => {
      return {
        isLogin: store.state.user.isLogin,
        userName: store.state.user.userName
      }
    })

    const login = () => {
      store.commit('login')
      message.success('登录成功', 2)
    }
    const logout = () => {
      store.commit('logout')
      message.success('退出登录成功，2秒后跳转到首页', 2)
      setTimeout(() => {
        router.push('/')
      }, 2000)
    }
    return {
      user,
      login,
      logout
    }
  }
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
