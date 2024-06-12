import type { DateCountSO } from '@/types/pusher/dashboard'
import { HttpMethod } from '@/utils/enums'
import { http } from '@/utils/request'

export function dashboardGetRecentMessageCountGroupByDayApi(days: number = 7) {
  return http<Array<DateCountSO>>({
    url: '/Dashboard/GetRecentMessageCountGroupByDay',
    method: HttpMethod.GET,
    params: { days }
  })
}
