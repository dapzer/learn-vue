<script setup lang="ts">
import type { ChatTypes } from "@/types/ChatTypes"
import UiTypography from "@/components/ui/UiTypography.vue"

const props = defineProps<{
  message: ChatTypes.Message
}>()
</script>

<template>
  <div :class="$style.wrapper">
    <UiTypography>
      {{ props.message.content }}
    </UiTypography>
    <UiTypography
      :class="$style.date"
      variant="textSmall"
      as="span"
    >
      {{ new Date(props.message.time).toLocaleString() }}
    </UiTypography>
  </div>
</template>

<style module lang="scss">
.wrapper {
  padding: 8px;
  border-radius: var(--s-border-radius);
  background: var(--c-accent);
  max-width: 500px;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
}

.date {
  align-self: flex-end;
  width: fit-content;
  opacity: var(--s-disabled-opacity);
}
</style>
