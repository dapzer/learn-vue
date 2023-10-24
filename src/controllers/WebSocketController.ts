import { getUuid } from "@/utils/getUuid"
import type { ChatTypes } from "@/types/ChatTypes"

type PromiseCallback = (value: unknown) => void
type Request = { resolve: PromiseCallback, reject: PromiseCallback }
type OnNewMessageCallback = (message: ChatTypes.Message) => void

export class WebSocketController {
  private readonly serverUrl: string = ""
  private connection: null | WebSocket = null
  private requestsAtProcess = new Map<string, Request>()
  private onNewMessageCallback: OnNewMessageCallback | null = null

  private messageHandler = {
    result: (message: Record<string, unknown>) => {
      this.requestsAtProcess.get(message.requestId as string)?.resolve(message)
    },
    "new-message": (message: ChatTypes.ChatMessageResponse) => {
      if (this.onNewMessageCallback) {
        this.onNewMessageCallback(message.data)
      }
    },
    connected: () => {
      console.log("connected")
    }
  }

  constructor(url: string) {
    this.serverUrl = url
  }

  public connect(onNewMessage: OnNewMessageCallback) {
    return new Promise((resolve, reject) => {
      this.connection = new WebSocket(this.serverUrl)

      this.connection.onopen = () => {
        console.log("opened")
        this.onNewMessageCallback = onNewMessage
        resolve(true)
      }

      this.connection.onerror = () => {
        console.log("error")
        reject()
      }

      this.connection.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)
          const messageType = data.type as keyof typeof this.messageHandler

          if (this.messageHandler[messageType]) {
            this.messageHandler[messageType](data)
          } else {
            console.error(`Unknown message type: ${messageType}`)
          }
        } catch (e) {
          console.error(e)
        }
      }
    })
  }

  send(type: string, message?: unknown) {
    if (!this.connection) {
      return
    }

    const messageData = {
      requestId: getUuid(),
      type,
      data: message
    }

    this.connection.send(JSON.stringify(messageData))
  }

  sendWithResponse(type: ChatTypes.MessageType, message?: unknown) {
    return new Promise((resolve, reject) => {
      if (!this.connection) {
        return
      }

      const messageData = {
        requestId: getUuid(),
        type,
        data: message
      }

      this.connection.send(JSON.stringify(messageData))

      this.requestsAtProcess.set(messageData.requestId, {
        resolve: (msg: unknown) => {
          this.requestsAtProcess.delete(messageData.requestId)
          resolve(msg)
        },
        reject: (data: unknown) => {
          this.requestsAtProcess.delete(messageData.requestId)
          reject(data)
        }
      })
    })
  }
}
