<script lang="ts" setup>
import type { ToDoItemType } from "@/types/ToDoItemType"
import UiTypography from "@/components/ui/UiTypography.vue"
import { computed } from "vue"
import UiButton from "@/components/ui/UiButton.vue"

const props = defineProps<{
  toDo: ToDoItemType
}>()

const emits = defineEmits<{
  (event: "handleStatus", id: string): void
}>()

const createdDate = new Date(props.toDo.createdAt).toLocaleDateString()

const updateDate = computed(() => new Date(props.toDo.updatedAt).toLocaleString())

const currentStatusText = computed(() => {
  return props.toDo.isCompleted ? "Выполнена" : "Не выполнена"
})

const currentHandleButtonText = computed(() => {
  return props.toDo.isCompleted ? "Переоткрыть" : "Выполнить"
})
</script>

<template>
  <div :class="$style.body">
    <div :class="$style.info">
      <UiTypography
        :class="[
          { [$style.completedText]: props.toDo.isCompleted }, $style.text
        ]"
      >
        {{ props.toDo.text }}
      </UiTypography>
      <ul>
        <li>
          Статус:
          <UiTypography
            as="span"
            variant="listItem"
          >
            {{ currentStatusText }}
          </UiTypography>
        </li>
        <li>
          Дата создания:
          <UiTypography
            as="span"
            variant="listItem"
          >
            {{ createdDate }}
          </UiTypography>
        </li>
        <li>
          Дата обновления:
          <UiTypography
            as="span"
            variant="listItem"
          >
            {{ updateDate }}
          </UiTypography>
        </li>
      </ul>
    </div>
    <UiButton @click="emits('handleStatus', props.toDo.id)">
      {{ currentHandleButtonText }}
    </UiButton>
  </div>
</template>

<style lang="scss" module>
.body {
  border: 1px solid var(--c-highlight);
  border-radius: var(--s-border-radius);
  padding: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.text {
  color: var(--c-secondary);
}

.completedText {
  text-decoration: line-through;
}
</style>

