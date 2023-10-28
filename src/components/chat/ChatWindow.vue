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
  const el = messagesWrapper.value.$el as HTMLDivElement
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
    <TransitionGroup
      ref="messagesWrapper"
      name="messagesWrapper"
      tag="div"
      :class="$style.messages"
    >
      <ChatMessage
        v-for="msg in props.chat.messages"
        :key="msg.id"
        :message="msg"
      />
    </TransitionGroup>
  </div>
  <Transition name="usersWrapper">
    <div
      v-if="isShowChatUsers"
      :class="$style.usersWrapper"
    >
      <ChatUsers />
    </div>
  </Transition>
</template>

<style lang="scss">
.usersWrapper-enter-active,
.usersWrapper-leave-active {
  overflow: hidden;
  transition: all .3s linear;
}

.usersWrapper-leave-to,
.usersWrapper-enter-from {
  width: 0;
}

.usersWrapper-leave-from,
.usersWrapper-enter-to {
  width: var(--s-users-list-width);
}

.messagesWrapper-move,
.messagesWrapper-enter-active,
.messagesWrapper-leave-active {
  transition: all .2s linear;
}

.messagesWrapper-leave-to,
.messagesWrapper-enter-from {
  transform: translateX(-100%);
}

.messagesWrapper-leave-from,
.messagesWrapper-enter-to {
  transform: translateX(0%);
}
</style>

<style lang="scss" module>
:root {
  --s-users-list-width: 250px
}

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

.usersWrapper {
  & > div {
    width: var(--s-users-list-width);
  }
}
</style>
