import type { MessageEnum } from './room'

enum ChannelEnum {
  DingTalk,
  ComWechat,
  Lark,
  Telegram,
  Bark,
  Email
}

export interface Channel {
  id: number
  channelName: string
  channelType: ChannelEnum
  channelUrl: string
  channelProxyUrl: string | null
  userId: number
}

export interface CreateChannelRO {
  channelName: string
  channelType: ChannelEnum
  channelUrl: string
  channelProxyUrl: string | null
}

export interface UpdateChannelRO {
  id: number
  channelName: string
  channelType: ChannelEnum
  channelUrl: string
  channelProxyUrl: string | null
}

export interface ChannelJoinedRoomsSO {
  id: number
  roomName: string
  roomCode: string
  userId: number
  createDate: Date
}

export enum ChannelMessageStatus {
  Todo,
  Done
}

export interface ChannelMessageHistorySO {
  id: number
  messageType: MessageEnum
  content: string
  recordTime: Date
  status: ChannelMessageStatus
  success: boolean
  result?: string | null
}
