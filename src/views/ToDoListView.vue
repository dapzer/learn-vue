<script lang="ts" setup>
import UiContainer from "@/components/ui/UiContainer.vue"
import ToDoItem from "@/components/todo/ToDoItem.vue"
import UiButton from "@/components/ui/UiButton.vue"
import UiInput from "@/components/ui/UiInput.vue"
import ToDoFilters from "@/components/todo/ToDoFilters.vue"
import { useTodosStore } from "@/stores/useTodosStore"

const todoStore = useTodosStore()
</script>

<template>
  <UiContainer :class="$style.wrapper">
    <div :class="$style.createForm">
      <UiInput
        v-model="todoStore.currentToDoText"
        placeholder="Текст для новой задачи"
        type="text"
      />
      <UiButton
        :disabled="!todoStore.currentToDoText.length"
        @click="todoStore.createTodo"
      >
        Создать задачу
      </UiButton>
    </div>
    <ToDoFilters
      v-model:is-completed="todoStore.filters.filtration.isCompleted"
      v-model:sorting="todoStore.filters.sorting"
    />
    <div :class="$style.todos">
      <ToDoItem
        v-for="todo in todoStore.filteredTodos"
        :key="todo.id"
        :to-do="todo"
        @handle-status="todoStore.handleToDoStatus"
        @on-click-remove-todo="todoStore.onClickRemoveTodo"
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
