<script setup lang="ts">
import type { ChatTypes } from "@/types/ChatTypes"
import UiUser from "@/components/ui/UiUser.vue"

const props = defineProps<{
  chat: ChatTypes.ChatInfo
  isActiveChat?: boolean
}>()

const emits = defineEmits<{
  (event: "onClickChat", chatId: string): void
}>()

</script>

<template>
  <div
    :class="[$style.body, {
      [$style.active]: props.isActiveChat
    }]"
    @click="emits('onClickChat', props.chat.id)"
  >
    <UiUser
      :title="props.chat.title"
      :avatar="props.chat.avatar"
    />
  </div>
</template>

<style module lang="scss">
.body {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  width: 100%;
  max-width: 250px;
  cursor: pointer;
  border: 1px solid var(--c-text);

  p {
    line-height: 1;
  }

  &.active,
  &:hover {
    border-color: var(--c-highlight);
  }
}
</style>
