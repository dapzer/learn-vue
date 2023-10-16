<script lang="ts" setup>
import UiContainer from "@/components/ui/UiContainer.vue"
import { ref, watch } from "vue"
import type { ToDoItemType } from "@/types/ToDoItemType"
import { getUuid } from "@/utils/getUuid"
import ToDoItem from "@/components/todo/ToDoItem.vue"
import UiButton from "@/components/ui/UiButton.vue"
import UiInput from "@/components/ui/UiInput.vue"

const loadToDos = () => {
  const todos = localStorage.getItem("todos")
  if (!todos) return []

  return JSON.parse(todos)
}

const toDoList = ref<ToDoItemType[]>(loadToDos())
const currentToDoText = ref<string>("")

watch(() => toDoList.value, () => {
  localStorage.setItem("todos", JSON.stringify(toDoList.value))
}, { deep: true })

const createTodo = () => {
  toDoList.value.unshift({
    createdAt: Date.now(),
    updatedAt: Date.now(),
    text: currentToDoText.value,
    isCompleted: false,
    id: getUuid()
  })

  currentToDoText.value = ""
}
const handleToDoStatus = (id: string) => {
  const toDoItem = toDoList.value.find((el) => el.id === id)
  if (!toDoItem) return

  toDoItem.isCompleted = !toDoItem.isCompleted
  toDoItem.updatedAt = Date.now()
}

const onClickRemoveTodo = (todoItem: ToDoItemType) => {
  const toDoIndex = toDoList.value.indexOf(todoItem)

  toDoList.value.splice(toDoIndex, 1)
}
</script>

<template>
  <UiContainer :class="$style.wrapper">
    <div :class="$style.createForm">
      <UiInput
        v-model="currentToDoText"
        placeholder="Текст для новой задачи"
        type="text"
      />
      <UiButton
        :disabled="!currentToDoText.length"
        @click="createTodo"
      >
        Создать задачу
      </UiButton>
    </div>
    <div :class="$style.todos">
      <ToDoItem
        v-for="todo in toDoList"
        :key="todo.id"
        :to-do="todo"
        @handle-status="handleToDoStatus"
        @on-click-remove-todo="onClickRemoveTodo"
      />
    </div>
  </UiContainer>
</template>

<style lang="scss" module>
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.todos {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.createForm {
  display: flex;
  gap: 16px;
}
</style>
