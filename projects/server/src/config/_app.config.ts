import { validatePath } from 'utils'
import { registerAs } from '@nestjs/config'

export interface AppConfig {
  /** 服务基础路径 */
  basePath: string
  /** 应用名称 */
  name: string
  /** 客户端部署地址 */
  clientUrl: string
  /** 管理后台部署地址 */
  adminUrl: string
}

export default registerAs('app', (): AppConfig => {
  const {
    SERVER_BASE_PATH,
    APP_NAME, APP_URL,
    VITE_CLIENT_BASE, VITE_ADMIN_BASE,
  } = process.env

  return {
    basePath: SERVER_BASE_PATH || '/',
    name: APP_NAME,
    clientUrl: validatePath(`${APP_URL}/${VITE_CLIENT_BASE}`),
    adminUrl: validatePath(`${APP_URL}/${VITE_ADMIN_BASE}`),
  }
})
