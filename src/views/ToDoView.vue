<script setup lang="ts">
import UiTypography from "@/components/ui/UiTypography.vue"
import { useRoute, useRouter } from "vue-router"
import { useTodosStore } from "@/stores/useTodosStore"
import { computed } from "vue"
import UiContainer from "@/components/ui/UiContainer.vue"
import ToDoItem from "@/components/todo/ToDoItem.vue"
import type { ToDoItemType } from "@/types/ToDoItemType"

const todoStore = useTodosStore()
const route = useRoute()
const router = useRouter()

const todoItem = computed(() => {
  return todoStore.toDoList.find((el) => el.id === route.params.id)
})

const onClickRemoveTodo = (item: ToDoItemType) => {
  todoStore.onClickRemoveTodo(item)

  router.push("/")
}
</script>

<template>
  <UiContainer>
    <ToDoItem
      v-if="todoItem"
      :to-do="todoItem"
      @on-click-remove-todo="onClickRemoveTodo"
      @handle-status="todoStore.handleToDoStatus"
    />
    <UiTypography
      v-else
      variant="title2"
    >
      Не найдено
    </UiTypography>
  </UiContainer>
</template>

<style module lang="scss">

</style>
