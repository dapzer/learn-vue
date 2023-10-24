<script setup lang="ts">
import { computed } from "vue"

interface UiAvatarProps {
  src: string
  size?: string | number
}

const props = withDefaults(defineProps<UiAvatarProps>(), {
  size: 50
})

const avatarSize = computed(() => {
  return `${props.size}px`
})

</script>

<template>
  <img
    :class="$style.avatar"
    :src="props.src"
    :alt="$attrs['alt'] as string ?? 'Avatar'"
  >
</template>

<style module lang="scss">
.avatar {
  width: v-bind(avatarSize);
  height: v-bind(avatarSize);
  border-radius: 50%;
}
</style>
