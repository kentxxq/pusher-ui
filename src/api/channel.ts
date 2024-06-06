import type {
  Channel,
  ChannelJoinedRoomsSO,
  CreateChannelRO,
  UpdateChannelRO
} from '@/types/pusher/channel'
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

export function channelUpdateChannelApi(updateChannelRO: UpdateChannelRO) {
  return http<boolean>({
    url: '/Channel/UpdateChannel',
    method: HttpMethod.POST,
    data: updateChannelRO
  })
}

export function channelGetChannelJoinedRoomsApi(channelId: number) {
  return http<ChannelJoinedRoomsSO[]>({
    url: '/Channel/GetChannelJoinedRooms',
    method: HttpMethod.GET,
    params: { channelId }
  })
}
