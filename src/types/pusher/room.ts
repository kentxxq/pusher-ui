export interface Room {
  id: number
  roomName: string
  roomCode: string
  roomKey?: string | null
  customRoomName?: string | null
  createDate: Date | null
}

export interface UpdateRoomChannelRO {
  roomId: number
  channelIds: number[]
}
