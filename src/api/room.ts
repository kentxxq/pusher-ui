import type { Channel } from '@/types/pusher/channel'
import type { Room, RoomMessageHistorySO, UpdateRoomChannelRO } from '@/types/pusher/room'
import { HttpMethod } from '@/utils/enums'
import { http } from '@/utils/request'

export function roomGetRoomsApi() {
  return http<Array<Room>>({
    url: '/Room/GetRooms',
    method: HttpMethod.GET
  })
}

export function roomCreateRoomApi(roomName: string) {
  return http<Array<Room>>({
    url: '/Room/CreateRoom',
    method: HttpMethod.GET,
    params: { roomName }
  })
}

export function roomDeleteRoomApi(roomIdList: Array<number>) {
  return http<Array<Room>>({
    url: '/Room/DeleteRoom',
    method: HttpMethod.POST,
    data: roomIdList
  })
}

export function roomSendMessageByGetApi(roomCode: string, customContent: string) {
  return http<string>({
    url: `/Room/SendMessageByGet/${roomCode}`,
    method: HttpMethod.GET,
    params: { content: customContent }
  })
}

export function roomGetRoomChannelsApi(roomId: number) {
  return http<Array<Channel>>({
    url: '/Room/GetRoomChannels',
    method: HttpMethod.GET,
    params: { roomid: roomId }
  })
}

export function roomUpdateRoomChannelApi(updateRoomChannelRO: UpdateRoomChannelRO) {
  return http<number>({
    url: '/Room/UpdateRoomChannel',
    method: HttpMethod.POST,
    data: updateRoomChannelRO
  })
}

export function roomGetRoomMessageHistoryApi(roomId: number) {
  return http<RoomMessageHistorySO[]>({
    url: '/Room/GetRoomMessageHistory',
    method: HttpMethod.GET,
    params: { roomid: roomId }
  })
}
