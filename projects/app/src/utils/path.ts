/**
 * 拼接路径与参数
 * @param route 路径
 * @param params 参数
 * @returns 路径与参数
 */
export function getRouteWithParams(route: string, params?: Record<string, any>): string {
  if (!params || Object.keys(params).length === 0)
    return `/${route}`

  const paramStr = Object.keys(params)
    .map(key => `${key}=${encodeURIComponent(params[key])}`)
    .join('&')

  return `/${route}?${paramStr}`
}
