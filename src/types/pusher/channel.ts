enum ChannelEnum {
  DingTalk,
  ComWechat,
  Lark
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
