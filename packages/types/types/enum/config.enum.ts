/**
 * 系统全局配置
 */
export enum Config {
  /** 轮播图配置 */
  BANNER_CONFIG = 'banner-config',
  /** 壁纸下载次数限制 */
  DOWNLOAD_LIMIT = 'download-limit',
}

/**
 * 系统全局配置的描述
 */
export const configDescriptions: Record<Config, string> = {
  [Config.BANNER_CONFIG]: '轮播图配置',
  [Config.DOWNLOAD_LIMIT]: '下载次数限制',
}
