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
}

export interface CreateChannelRO {
  channelName: string
  channelType: ChannelEnum
  channelUrl: string
  channelProxyUrl: string | null
}
