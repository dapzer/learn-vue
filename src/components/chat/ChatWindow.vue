<script lang="ts" setup>

import type { ChatTypes } from "@/types/ChatTypes"
import ChatHeader from "@/components/chat/ChatHeader.vue"
import { useChatStore } from "@/stores/useChatStore"
import type { VNodeRef } from "vue"
import { nextTick, ref, watch } from "vue"
import ChatMessage from "@/components/chat/ChatMessage.vue"
import ChatUsers from "@/components/chat/ChatUsers.vue"

const props = defineProps<{
  chat: ChatTypes.Chat
}>()

const chatStore = useChatStore()

const isShowChatUsers = ref(false)
const messagesWrapper = ref<VNodeRef | null>(null)
let isFirstChatScroll = true

const handleShowChatUsers = () => {
  if (!isShowChatUsers.value) {
    chatStore.getUsers()
  }
  isShowChatUsers.value = !isShowChatUsers.value
}

const scrollToBottom = () => {
  if (!messagesWrapper.value) {
    return
  }
  const el = messagesWrapper.value as HTMLDivElement
  const scrollFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight

  if (scrollFromBottom < el.clientHeight || isFirstChatScroll) {
    el.scroll({ top: el.scrollHeight, behavior: undefined })
    isFirstChatScroll = false
  }
}

watch(() => props.chat.messages.length, async () => {
  await nextTick()
  scrollToBottom()
}, { immediate: true })

watch(() => props.chat.id, () => {
  isFirstChatScroll = true
})
</script>

<template>
  <div :class="$style.body">
    <ChatHeader
      :title="props.chat.title"
      :avatar="props.chat.avatar"
      @handle-show-chat-users="handleShowChatUsers"
    />
    <div
      ref="messagesWrapper"
      :class="$style.messages"
    >
      <ChatMessage
        v-for="msg in props.chat.messages"
        :key="msg.id"
        :message="msg"
      />
    </div>
  </div>
  <ChatUsers v-if="isShowChatUsers" />
</template>

<style lang="scss" module>
.body {
  height: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.messages {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 24px;
  overflow: auto;
}
</style>
