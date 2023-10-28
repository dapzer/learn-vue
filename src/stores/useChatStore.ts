import { defineStore } from "pinia"
import { WebSocketController } from "@/controllers/WebSocketController"
import { ref } from "vue"
import type { ChatTypes } from "@/types/ChatTypes"

export const useChatStore = defineStore("chat", () => {
  const ws = new WebSocketController("ws://localhost:8080/ws")
  const chats = ref<ChatTypes.ChatInfo[]>([])
  const users = ref<ChatTypes.User[]>([])
  const selectedChat = ref<ChatTypes.Chat | null>(null)

  const onNewMessage = (message: ChatTypes.Message) => {
    if (message.chat === selectedChat.value?.id) {
      selectedChat.value.messages.push(message)
    }
  }

  ws.connect(onNewMessage).then(() => {
    getChats()
  })


  const getChats = () => {
    ws.sendWithResponse("listChats").then((res) => {
      chats.value = (res as ChatTypes.ChatListResponse).list
    })
  }

  const getUsers = () => {
    ws.sendWithResponse("listUsers").then((res) => {
      users.value = (res as ChatTypes.UsersListResponse).list
    })
  }

  const createChat = () => {
    ws.sendWithResponse("newChat").then(() => {
      getChats()
    })
  }

  const createUser = () => {
    ws.sendWithResponse("newUser").then(() => {
      getUsers()
    })
  }

  const addUserToChat = (chatId: string, userId: string) => {
    ws.sendWithResponse("addUserToChat", { chatId, userId }).then(() => {
      onClickChat(chatId)
    })
  }

  const removeUserFromChat = (chatId: string, userId: string) => {
    ws.sendWithResponse("removeUserFromChat", { chatId, userId }).then(() => {
      onClickChat(chatId)
    })
  }

  const onClickChat = (chatId: string) => {
    ws.sendWithResponse("getChat", { chatId }).then((res) => {
      selectedChat.value = (res as ChatTypes.ChatResponse).chat
    })
  }

  return {
    chats,
    selectedChat,
    users,
    getChats,
    createChat,
    createUser,
    addUserToChat,
    removeUserFromChat,
    onClickChat,
    getUsers
  }
})
