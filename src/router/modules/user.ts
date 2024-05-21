import type { RouteRecordRaw } from 'vue-router'

export const userRoutes: Array<RouteRecordRaw> = [
  {
    path: '/user',
    name: 'user',
    component: () => import('@/components/layouts/index.vue'),
    redirect: { name: 'user-index' },
    meta: {
      title: '用户管理',
      roles: ['Admin'],
      order: 104,
      icon: 'user'
    },
    children: [
      {
        path: '/user/index',
        name: 'user-index',
        component: () => import('@/pages/user/index.vue')
      }
    ]
  }
]
