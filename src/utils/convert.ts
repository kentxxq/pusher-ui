export function dateStringFormat(data: string): string {
  const date = new Date(data)
  const result = date.toISOString().replace('T', ' ').split('.')[0] // 将日期对象转换成 ISO 格式的字符串，并替换 "T" 为 " "，然后去掉毫秒部分
  return result
}

export function dateStringToDateString(data: string): string {
  const result = data.split('T')[0]
  return result
}
