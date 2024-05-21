import type { Room } from '@/types/pusher/room'
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
