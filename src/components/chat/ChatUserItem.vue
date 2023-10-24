<script setup lang="ts">
import type { ChatTypes } from "@/types/ChatTypes"
import UiUser from "@/components/ui/UiUser.vue"
import UiButton from "@/components/ui/UiButton.vue"
import { IconUserMinus, IconUserPlus } from '@tabler/icons-vue';
import { computed } from "vue"

const props = defineProps<{
  user: ChatTypes.User
  chatId: string
  chatUsers: ChatTypes.User[]
}>()

const emits = defineEmits<{
  (event: "onClickAdd", chatId: string, userId: string): void
  (event: "onClickRemove", chatId: string, userId: string): void
}>()

const isChatMember = computed(() => {
  return props.chatUsers.some((el) => el.id === props.user.id)
})

</script>

<template>
  <div :class="$style.body">
    <UiUser
      size="30"
      :avatar="props.user.avatar"
      :title="props.user.username"
    />
    <UiButton
      v-if="!isChatMember"
      variant="clear"
      @click="emits('onClickAdd', props.chatId ,props.user.id)"
    >
      <IconUserPlus />
    </UiButton>
    <UiButton
      v-else
      variant="clear"
      @click="emits('onClickRemove', props.chatId ,props.user.id)"
    >
      <IconUserMinus />
    </UiButton>
  </div>
</template>

<style module lang="scss">
.body {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: center;
  width: 100%;

  p {
    max-width: 127px;
  }
}
</style>
