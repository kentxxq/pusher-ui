import type { Channel, CreateChannelRO } from '@/types/pusher/channel'
import type { UpdateRoomChannelRO } from '@/types/pusher/room'
import { HttpMethod } from '@/utils/enums'
import { http } from '@/utils/request'

export function channelGetUserChannelsApi() {
  return http<Array<Channel>>({
    url: '/Channel/GetUserChannels',
    method: HttpMethod.GET
  })
}

export function channelCreateChannelApi(createChannelRO: CreateChannelRO) {
  return http<Array<Channel>>({
    url: '/Channel/CreateChannel',
    method: HttpMethod.POST,
    data: createChannelRO
  })
}

export function channelDeleteChannelApi(channelIdList: Array<number>) {
  return http<Array<Channel>>({
    url: '/Channel/DeleteChannel',
    method: HttpMethod.POST,
    data: channelIdList
  })
}

export function channelSendTestMessageToChannelApi(channelId: number) {
  return http<boolean>({
    url: '/Channel/SendTestMessageToChannel',
    method: HttpMethod.GET,
    params: { channelId }
  })
}
