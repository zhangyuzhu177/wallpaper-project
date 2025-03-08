import { registerAs } from '@nestjs/config'
import { parseBoolRaw } from 'utils'

export interface OssConfig {
  /** OSS 服务 AK */
  accessKeyId: string
  /** OSS 服务 SK */
  accessKeySecret: string
  /** OSS 服务数据存储地区 */
  region: string
  /** OSS 服务是否使用安全模式连接 */
  secure: boolean
  /** OSS 桶名称 */
  bucket: string
}

export default registerAs('oss', (): OssConfig => {
  const {
    OSS_AK, OSS_SK, OSS_REGION, OSS_SECURE,
    OSS_BUCKET_PUBLIC,
  } = process.env

  return {
    accessKeyId: OSS_AK,
    accessKeySecret: OSS_SK,
    region: OSS_REGION,
    secure: parseBoolRaw(OSS_SECURE, true),
    bucket: OSS_BUCKET_PUBLIC,
  }
})
