export type DateInterval = 'year' | 'quarter' | 'month' | 'week' | 'day'
export type TimeInterval = 'hour' | 'minute' | 'second'
export type DateTimeInterval = DateInterval | TimeInterval

export * from './format-time-label'
export * from './generate-date-range'
