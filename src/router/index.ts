import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    { path: '/:pathMatch(.*)*', name: 'NotFoundPage', component: () => import('@/views/NotFoundView.vue') },
    {
      path: '/',
      name: 'HomePage',
      component: () => import('@/views/ToDoListView.vue')
    },
    {
      path: '/todo/:id',
      name: 'ToDoPage',
      component: () => import('@/views/ToDoView.vue')
    },
    {
      path: '/chat',
      name: 'ChatPage',
      component: () => import('@/views/ChatView.vue')
    }
  ]
})

export default router
