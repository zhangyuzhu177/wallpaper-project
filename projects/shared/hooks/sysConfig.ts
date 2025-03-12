import { ref } from 'vue'
import { randomId } from 'utils'
import { cloneDeep } from 'lodash'
import type { IConfigDto } from 'types'
import {
  Config,
  WALLPAPER_DOWNLOAD_LIMIT,
} from 'types'

import { sysConfigGetApi } from '../api/sysConfig'

export interface IBannerConfigItem {
  id: string
  categoryId?: string
  url?: string
  tempImage?: File | File[]
}

/** 加载中 */
const loading = ref(false)

/** 壁纸下载次数配置 */
const wallpaperDownload = ref<Required<IConfigDto>[Config.DOWNLOAD_LIMIT]>({})
/** 轮播图配置 */
const bannerConfig = ref<IBannerConfigItem[]>([])
/** 轮播图原始数据 */
const bannerData = ref<IBannerConfigItem[]>([])

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

  /**
   * 获取轮播图配置
   */
  async function getBannerConfig() {
    loading.value = true
    try {
      const res = await sysConfigGetApi(Config.BANNER_CONFIG)
        ?? [{
          id: randomId(),
          categoryId: '',
          url: '',
        }]
      bannerData.value = res as IBannerConfigItem[]
      bannerConfig.value = cloneDeep(bannerData.value)
    }
    finally {
      loading.value = false
    }
  }

  return {
    loading,
    wallpaperDownload,
    bannerConfig,
    bannerData,

    getWallpaperDownloadConfig,
    getBannerConfig,
  }
}
