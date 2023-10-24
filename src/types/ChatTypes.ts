export module ChatTypes {
  export type MessageType =
    "newChat"
    | "getChat"
    | "newUser"
    | "addUserToChat"
    | "removeUserFromChat"
    | "listUsers"
    | "listChats"

  export type User = {
    id: string,
    username: string,
    avatar: string
    chats: {}
  }

  export type Message = {
    chat: string,
    user: string,
    time: number,
    id: string,
    content: string
  }

  export type ChatInfo = {
    id: string,
    title: string,
    avatar: string,
  }

  export interface Chat extends ChatInfo {
    messages: Message[],
    users: User[],
  }

  export type DefaultResponse = {
    requestId: string
    success: boolean
    type: string
  }

  export interface ChatListResponse extends DefaultResponse {
    list: ChatInfo[]
  }

  export interface UsersListResponse extends DefaultResponse {
    list: User[]
  }

  export interface ChatResponse extends DefaultResponse {
    chat: Chat
  }

  export interface ChatMessageResponse {
    type: string
    data: Message
  }
}
