<script lang="ts" setup>
import UiContainer from "@/components/ui/UiContainer.vue"
import { computed, ref, watch } from "vue"
import type { ToDoItemType } from "@/types/ToDoItemType"
import { getUuid } from "@/utils/getUuid"
import ToDoItem from "@/components/todo/ToDoItem.vue"
import UiButton from "@/components/ui/UiButton.vue"
import UiInput from "@/components/ui/UiInput.vue"
import type { FiltrationModelType } from "@/types/FiltrationModelType"
import ToDoFilters from "@/components/todo/ToDoFilters.vue"

const loadToDos = () => {
  const todos = localStorage.getItem("todos")
  if (!todos) return []

  return JSON.parse(todos)
}

const toDoList = ref<ToDoItemType[]>(loadToDos())
const currentToDoText = ref<string>("")
const filters = ref<FiltrationModelType.FiltrationModel>({
  filtration: {
    isCompleted: false
  },
  sorting: "ASC"
})

const filteredTodos = computed(() => {
  let filteredArr = toDoList.value.filter((el) => {
    for (const key in filters.value.filtration) {
      if (filters.value.filtration[key] && !el[key as keyof ToDoItemType]) {
        return false
      }
    }
    return true
  })

  filteredArr.sort((a, b) => {
    return filters.value.sorting === "ASC" ? a.text.localeCompare(b.text) : b.text.localeCompare(a.text)
  })

  return filteredArr
})

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
    <ToDoFilters
      v-model:is-completed="filters.filtration.isCompleted"
      v-model:sorting="filters.sorting"
    />
    <div :class="$style.todos">
      <ToDoItem
        v-for="todo in filteredTodos"
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
