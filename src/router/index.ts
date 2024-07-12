import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: Array<typeof RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    component: () => import('@/view/login/login.vue'),
  },
  {
    path: '/main',
    component: () => import('@/view/main/main.vue'),
  },
  {
    path: '/DraggableTable',
    component: () => import('@components/DraggableTable/example.vue'),
  },
]

const router = createRouter({
  routes,
  history: createWebHashHistory(),
})

export default router
