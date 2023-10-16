<script lang="ts" setup>
interface UiButtonProps {
  variant?: "default" | "danger"
}

const props = withDefaults(defineProps<UiButtonProps>(), {
  variant: "default"
})
</script>
<template>
  <button
    :class="[ $style.body,{
      [$style.default]: props.variant === 'default',
      [$style.danger]: props.variant === 'danger'
    }]"
  >
    <slot />
  </button>
</template>

<style lang="scss" module>
.body {
  cursor: pointer;
  padding: 8px 16px;
  border: 1px solid var(--c-secondary);
  color: var(--c-secondary);
  background: none;
  font-size: var(--fs-span);
  border-radius: var(--s-border-radius);
  transition-property: color, border;
  transition-duration: .2s;
  transition-timing-function: linear;

  &:disabled {
    cursor: default;
    opacity: var(--s-disabled-opacity);
  }
}

.default {
  &:hover:not(:disabled) {
    color: var(--c-highlight);
    border-color: var(--c-highlight);
  }
}

.danger {
  color: var(--c-danger);
  border-color: var(--c-danger);

  &:hover {
    color: var(--c-danger-hovered);
    border-color: var(--c-danger-hovered);
  }
}
</style>
