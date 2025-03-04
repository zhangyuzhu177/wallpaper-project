import { registerAs } from '@nestjs/config'

export interface SysConfig {
  /** 预置系统管理员 */
  admin: {
    name: string
    password: string
  }[]
}

export default registerAs('sa', (): SysConfig => {
  const { SYS_ADMIN } = process.env
  return {
    admin: SYS_ADMIN.replace(/\s+/g, '').split(',').map((item) => {
      const [name, password] = item.trim().split('@')
      return { name, password }
    }),
  }
})
