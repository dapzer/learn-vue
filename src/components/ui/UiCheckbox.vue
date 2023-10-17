<script setup lang="ts">
import { computed } from "vue"

const props = defineProps<{
  modelValue: boolean
  label?: string
}>()

const emits = defineEmits<{
  (event: "update:modelValue", value: boolean): void
}>()

const proxyModel = computed({
  get: () => props.modelValue,
  set: (newValue) => emits("update:modelValue", newValue)
})
</script>

<template>
  <label>
    <input
      v-bind="$attrs"
      v-model="proxyModel"
      :class="$style.checkbox"
      type="checkbox"
    >
    {{ props.label }}
  </label>
</template>

<style module lang="scss">
label {
  font-size: var(--fs-m-p);
  text-align: center;
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

.checkbox {
  width: var(--fs-m-p);
  height: var(--fs-m-p);
}
</style>
