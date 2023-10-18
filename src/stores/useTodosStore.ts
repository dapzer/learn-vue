import { defineStore } from "pinia"
import { computed, ref, watch } from "vue"
import type { ToDoItemType } from "@/types/ToDoItemType"
import { getUuid } from "@/utils/getUuid"
import type { FiltrationModelType } from "@/types/FiltrationModelType"

const loadToDos = () => {
  const todos = localStorage.getItem("todos")
  if (!todos) return []

  return JSON.parse(todos)
}

export const useTodosStore = defineStore("todos", () => {
  const toDoList = ref<ToDoItemType[]>(loadToDos())
  const currentToDoText = ref<string>("")
  const filters = ref<FiltrationModelType.FiltrationModel>({
    filtration: {
      isCompleted: false
    },
    sorting: "ASC"
  })

  watch(() => toDoList.value, () => {
    localStorage.setItem("todos", JSON.stringify(toDoList.value))
  }, { deep: true })

  const filteredTodos = computed(() => {
    const filteredArr = toDoList.value.filter((el) => {
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

  return {
    currentToDoText,
    filters,
    filteredTodos,
    createTodo,
    handleToDoStatus,
    onClickRemoveTodo
  }
})
