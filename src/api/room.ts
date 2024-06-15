import type { Channel } from '@/types/pusher/channel'
import type {
  CreateRoomRO,
  Room,
  RoomMessageHistorySO,
  UpdateRoomChannelRO,
  UpdateRoomRO
} from '@/types/pusher/room'
import { HttpMethod } from '@/utils/enums'
import { http } from '@/utils/request'

export function roomGetRoomsApi() {
  return http<Array<Room>>({
    url: '/Room/GetRooms',
    method: HttpMethod.GET
  })
}

export function roomCreateRoomApi(createRoomRO: CreateRoomRO) {
  return http<number>({
    url: '/Room/CreateRoom',
    method: HttpMethod.POST,
    data: createRoomRO
  })
}

export function roomUpdateRoomApi(updateRoomRO: UpdateRoomRO) {
  return http<string>({
    url: '/Room/UpdateRoom',
    method: HttpMethod.POST,
    data: updateRoomRO
  })
}

export function roomDeleteRoomApi(roomIdList: Array<number>) {
  return http<Array<Room>>({
    url: '/Room/DeleteRoom',
    method: HttpMethod.POST,
    data: roomIdList
  })
}

export function roomSendMessageByGetApi(
  roomCode: string,
  customContent: string,
  roomKey: string = ''
) {
  return http<string>({
    url: `/Room/SendMessageByGet/${roomCode}`,
    method: HttpMethod.GET,
    params: { content: customContent, roomKey }
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
