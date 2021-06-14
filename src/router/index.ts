import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'
import Home from '@/views/common/home.vue'

import RoleRouter from './role'

const routes: Array<RouteRecordRaw> = [
  // 公共模块
  {
    path: '',
    name: 'Common',
    component: Layout,
    children: [
      {
        path: '',
        name: '首页',
        component: Home
      },
      {
        path: 'notFound',
        name: '404',
        component: () => import('@/views/common/notFound.vue')
      }
    ]
  },

  // 子模块模板
  ...RoleRouter,

  {
    path: '/:catchAll(.*)',
    redirect: '/notFound'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
