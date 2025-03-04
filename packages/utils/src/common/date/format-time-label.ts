import dayjs from 'dayjs'

import type { DateTimeInterval } from '.'

/**
 * 将传入的时间转换为指定的格式
 * @param time 待转换的时间
 * @param format 指定的时间格式
 * @returns 转换后的时间
 */
export function formatTimeLabel(
  time: Date | string | number,
  format: DateTimeInterval,
) {
  const date = dayjs(time)

  if (format === 'year') {
    return date.format('YYYY')
  }
  else if (format === 'quarter') {
    const quarter = Math.ceil((date.month() + 1) / 3)
    return `${date.format('YYYY')}-Q${quarter}`
  }
  else if (format === 'month') {
    return date.format('YYYY-MM')
  }
  else if (format === 'day') {
    return date.format('YYYY-MM-DD')
  }
  else if (format === 'hour') {
    return date.format('YYYY-MM-DD HH')
  }
  else if (format === 'minute') {
    return date.format('YYYY-MM-DD HH:mm')
  }
  else if (format === 'second') {
    return date.format('YYYY-MM-DD HH:mm:ss')
  }
}
