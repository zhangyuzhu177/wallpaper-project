import dayjs from 'dayjs'
import IsBetween from 'dayjs/plugin/isBetween'
import IsSameOrBefore from 'dayjs/plugin/isSameOrBefore'

import type { DateInterval } from '.'

dayjs.extend(IsBetween)
dayjs.extend(IsSameOrBefore)

/**
 * 生成指定日期范围的数组
 * @param startDate 开始日期
 * @param endDate 结束日期
 * @param unit 日期单位
 * @returns 生成的指定日期范围的数组
 */
export function generateDateRange(
  startDate: Date | string | number,
  endDate: Date | string | number,
  unit: DateInterval,
) {
  const start = dayjs(startDate)
  const end = dayjs(endDate)

  const range: string[] = []

  // 根据不同的单位进行处理
  if (unit === 'quarter') {
    let quarterStart = start.startOf('year').add(Math.floor(start.month() / 3) * 3, 'month').startOf('month')
    while (quarterStart.isSameOrBefore(end)) {
      const year = quarterStart.year()
      const quarter = Math.ceil(quarterStart.month() / 3) + 1
      range.push(`${year}-Q${quarter}`)
      quarterStart = quarterStart.add(3, 'month')
    }
  }
  else {
    for (let day = start.startOf(unit); day.isSameOrBefore(end); day = day.add(1, unit)) {
      range.push(day.format(
        unit === 'year'
          ? 'YYYY'
          : unit === 'month'
            ? 'YYYY-MM'
            : 'YYYY-MM-DD',
      ))
    }
  }

  return range
}
