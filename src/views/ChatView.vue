<script setup lang="ts">
import UiContainer from "@/components/ui/UiContainer.vue"
import UiTypography from "@/components/ui/UiTypography.vue"
import UiButton from "@/components/ui/UiButton.vue"
import { useChatStore } from "@/stores/useChatStore"
import ChatItem from "@/components/chat/ChatItem.vue"
import ChatWindow from "@/components/chat/ChatWindow.vue"
import { useRoute } from "vue-router"
import { watch } from "vue"

const chatStore = useChatStore()
const route = useRoute()

watch(() => chatStore.isConnected, () => {
  if (!chatStore.isConnected) return
  const chatId = route.query.chatId

  if (chatId) {
    chatStore.onClickChat(chatId as string)
  }
})
</script>

<template>
  <UiContainer>
    <UiTypography variant="title2">
      Chat
    </UiTypography>

    <div :class="$style.content">
      <div :class="$style.chats">
        <ChatItem
          v-for="chat in chatStore.chats"
          :key="chat.id"
          :chat="chat"
          :is-active-chat="chatStore.selectedChat?.id === chat.id"
          @on-click-chat="chatStore.onClickChat"
        />
      </div>
      <ChatWindow
        v-if="chatStore.selectedChat"
        :chat="chatStore.selectedChat"
      />
    </div>

    <UiButton @click="chatStore.getChats">
      Get Chats
    </UiButton>
    <UiButton @click="chatStore.createChat">
      Create Chat
    </UiButton>
    <UiButton @click="chatStore.createUser">
      Create User
    </UiButton>
  </UiContainer>
</template>

<style module lang="scss">
.content {
  display: flex;
  height: 600px;
  border: 1px solid var(--c-text);
  margin-bottom: 12px;
}

.chats {
  display: flex;
  flex-direction: column;
  overflow: auto;
  height: 100%;
  border-right: 1px solid var(--c-text);
}
</style>
