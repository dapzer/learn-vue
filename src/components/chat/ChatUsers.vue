<script setup lang="ts">
import { useChatStore } from "@/stores/useChatStore"
import ChatUserItem from "@/components/chat/ChatUserItem.vue"
import UiTypography from "@/components/ui/UiTypography.vue"

const chatStore = useChatStore()
</script>

<template>
  <div
    :class="$style.body"
  >
    <template v-if="chatStore.selectedChat && chatStore.users.length">
      <ChatUserItem
        v-for="user in chatStore.users"
        :key="user.id"
        :user="user"
        :chat-id="chatStore.selectedChat.id"
        :chat-users="chatStore.selectedChat.users"
        @on-click-add="chatStore.addUserToChat"
        @on-click-remove="chatStore.removeUserFromChat"
      />
    </template>
    <UiTypography v-else>
      Список пользователей пуст
    </UiTypography>
  </div>
</template>

<style module lang="scss">
.body {
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow-y: auto;
  overflow-x: clip;
  width: 100%;
  height: 100%;
  flex-grow: 1;
  border-left: 1px solid var(--c-text);
  padding: 12px 16px;
}
</style>
