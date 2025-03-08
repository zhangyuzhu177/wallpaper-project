import { ref } from 'vue'
import type { IConfigDto } from 'types'
import {
  Config,
  WALLPAPER_DOWNLOAD_LIMIT,
} from 'types'

import { sysConfigGetApi } from '../api/sysConfig'

/** 加载中 */
const loading = ref(false)

/** 壁纸下载次数配置 */
const wallpaperDownload = ref<Required<IConfigDto>[Config.DOWNLOAD_LIMIT]>({})

export function useSysConfig() {
  /**
   * 获取壁纸下载次数配置
   */
  async function getWallpaperDownloadConfig() {
    loading.value = true
    try {
      const {
        downloadLimit = WALLPAPER_DOWNLOAD_LIMIT,
      } = await sysConfigGetApi(Config.DOWNLOAD_LIMIT) ?? {}
      wallpaperDownload.value = {
        downloadLimit,
      }
    }
    finally {
      loading.value = false
    }
  }

  return {
    loading,
    wallpaperDownload,

    getWallpaperDownloadConfig,
  }
}
