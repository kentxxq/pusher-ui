import type {
  CreateStringTemplateRO,
  StringTemplate,
  UpdateStringTemplateRO
} from '@/types/pusher/stringTemplate'
import { HttpMethod } from '@/utils/enums'
import { http } from '@/utils/request'

export function StringTemplateGetUserStringTemplatesApi() {
  return http<Array<StringTemplate>>({
    url: '/StringTemplate/GetUserStringTemplates',
    method: HttpMethod.GET
  })
}

export function StringTemplateCreateStringTemplateApi(
  createStringTemplateRo: CreateStringTemplateRO
) {
  return http<Array<StringTemplate>>({
    url: '/StringTemplate/CreateStringTemplate',
    method: HttpMethod.POST,
    data: createStringTemplateRo
  })
}

export function StringTemplateUpdateStringTemplateApi(
  updateStringTemplateRO: UpdateStringTemplateRO
) {
  return http<boolean>({
    url: '/StringTemplate/UpdateStringTemplate',
    method: HttpMethod.POST,
    data: updateStringTemplateRO
  })
}

export function StringTemplateDeleteStringTemplatesApi(deleteIdList: number[]) {
  return http<number>({
    url: '/StringTemplate/DeleteStringTemplates',
    method: HttpMethod.POST,
    data: deleteIdList
  })
}
