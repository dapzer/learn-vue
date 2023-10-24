<script setup lang="ts">
import UiButton from "@/components/ui/UiButton.vue"
import { IconDotsVertical } from '@tabler/icons-vue';
import UiUser from "@/components/ui/UiUser.vue"

const props = defineProps<{
  avatar: string
  title: string
}>()

const emits = defineEmits<{
  (event: "handleShowChatUsers"): void
}>()
</script>

<template>
  <div :class="$style.body">
    <UiUser
      :title="props.title"
      :avatar="props.avatar"
      size="30"
    />
    <div :class="$style.controls">
      <UiButton
        variant="clear"
        @click="emits('handleShowChatUsers')"
      >
        <IconDotsVertical />
      </UiButton>
    </div>
  </div>
</template>

<style module lang="scss">
.body {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding: 12px 16px;
  top: 0;
  position: sticky;
  width: 100%;
  border-bottom: 1px solid var(--c-text);
}
</style>
