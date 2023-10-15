import { createRouter, createWebHistory } from 'vue-router'
import ToDoView from "@/views/ToDoView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ToDoView
    },
  ]
})

export default router
