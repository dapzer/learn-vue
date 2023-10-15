<script lang="ts" setup>
const props = defineProps<{
  modelValue: string
}>()

const emits = defineEmits<{
  (event: "update:modelValue", value: string): void
}>()
</script>

<template>
  <input
    :value="props.modelValue"
    :class="$style.body"
    @input="emits('update:modelValue', ($event.target as HTMLInputElement).value)"
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
