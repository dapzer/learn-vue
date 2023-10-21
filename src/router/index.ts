import { createRouter, createWebHistory } from 'vue-router'
import ToDoView from "@/views/ToDoView.vue"
import ToDoListView from "@/views/ToDoListView.vue"
import NotFoundView from "@/views/NotFoundView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    { path: '/:pathMatch(.*)*', name: 'NotFoundPage', component: NotFoundView },
    {
      path: '/',
      name: 'HomePage',
      component: ToDoListView
    },
    {
      path: '/todo/:id',
      name: 'ToDoPage',
      component: ToDoView
    },
  ]
})

export default router
