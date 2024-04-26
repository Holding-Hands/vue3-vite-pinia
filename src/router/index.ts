import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: Array<typeof RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login',
  },
]

const router = createRouter({
  routes,
  history: createWebHashHistory(),
})

export default router
