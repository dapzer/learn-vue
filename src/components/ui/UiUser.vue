<script setup lang="ts">

import UiAvatar from "@/components/ui/UiAvatar.vue"
import UiTypography from "@/components/ui/UiTypography.vue"

const props = defineProps<{
  title: string
  avatar: string
  size?: string | number
}>()
</script>

<template>
  <div :class="$style.info">
    <UiAvatar
      :size="props.size"
      :src="props.avatar"
    />
    <UiTypography>
      {{ props.title }}
    </UiTypography>
  </div>
</template>

<style module lang="scss">
.info {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;

  p {
    color: var(--c-secondary);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
