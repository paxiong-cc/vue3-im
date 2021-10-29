import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'
// import Home from '@/views/common/home.vue'

const routes: Array<RouteRecordRaw> = [
  // 公共模块
  {
    path: '',
    name: 'Common',
    component: Layout,
    children: [
      {
        path: '',
        name: '编辑海报',
        component: () => import('@/views/editor/index.vue')
      },
      {
        path: 'screen',
        name: '大屏可视化',
        component: () => import('@/views/tt/homeScreen.vue')
      },
      {
        path: 'home',
        name: '模板',
        component: () => import('@/views/common/home.vue')
      }
      // {
      //   path: 'notFound',
      //   name: '404',
      //   component: () => import('@/views/common/notFound.vue')
      // }
    ]
  },

  // 模板
  // {
  //   path: '',
  //   name: 'Template',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'template/:id',
  //       name: '模板',
  //       component: () => import('@/views/template/index.vue')
  //     }
  //   ]
  // },

  // // 编辑器
  // {
  //   path: '',
  //   name: 'Editor',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'editor',
  //       name: '模板',
  //       component: () => import('@/views/editor/index.vue')
  //     }
  //   ]
  // },

  {
    path: '/:catchAll(.*)',
    redirect: '/notFound'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.name as string
  next()
})

export default router
