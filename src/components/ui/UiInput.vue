<script lang="ts" setup>
import { computed } from "vue"

const props = defineProps<{
  modelValue: string | boolean | number
}>()

const emits = defineEmits<{
  (event: "update:modelValue", value: string | boolean | number): void
}>()

const proxyModel = computed({
  get: () => props.modelValue,
  set: (newValue) => emits("update:modelValue", newValue)
})
</script>

<template>
  <input
    v-model="proxyModel"
    :class="$style.body"
  >
</template>

<style lang="scss" module>
.body {
  background: none;
  border: none;
  border-bottom: 1px solid var(--c-text);
  padding: 8px 16px;
  outline: none;
  color: var(--c-secondary);
  font-size: var(--fs-p);
}
</style>
