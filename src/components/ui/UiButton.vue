<script lang="ts" setup>
interface UiButtonProps {
  variant?: "default"
}

const props = withDefaults(defineProps<UiButtonProps>(), {
  variant: "default"
})
</script>

<template>
  <button
    :class="{
      body: props.variant === 'default'
    }"
  >
    <slot />
  </button>
</template>

<style scoped lang="scss">
.body {
  cursor: pointer;
  padding: 8px 16px;
  border: 1px solid var(--c-secondary);
  background: none;
  font-size: var(--fs-span);
  border-radius: var(--s-border-radius);
  color: var(--c-secondary);

  &:hover:not(:disabled) {
    color: var(--c-highlight);
    border-color: var(--c-highlight);
  }

  &:disabled {
    cursor: default;
    opacity: var(--s-disabled-opacity);

  }
}
</style>
