<script lang="ts" setup>
import type { FiltrationModelType } from "@/types/FiltrationModelType"
import { computed } from "vue"
import UiCheckbox from "@/components/ui/UiCheckbox.vue"

const sortingOptions: FiltrationModelType.SortingOption[] = ["ASC", "DESC"]

const props = defineProps<{
  isCompleted: boolean
  sorting: FiltrationModelType.SortingOption
}>()
const emits = defineEmits<{
  (event: "update:isCompleted", value: boolean): void
  (event: "update:sorting", value: string): void
}>()

const isCompletedModel = computed({
  get: () => props.isCompleted,
  set: (newValue) => emits("update:isCompleted", newValue)
})
</script>

<template>
  <div :class="$style.wrapper">
    <select
      :value="props.sorting"
      @change="emits('update:sorting', ($event.target as HTMLSelectElement).value)"
    >
      <option
        v-for="(option, index) in sortingOptions"
        :key="index"
        :value="option"
      >
        {{ option }}
      </option>
    </select>
    <UiCheckbox
      v-model="isCompletedModel"
      label="Показывать только выполненные"
    />
  </div>
</template>

<style lang="scss" module>
.wrapper {
  display: flex;
  align-items: center;
  gap: 16px;
}
</style>
