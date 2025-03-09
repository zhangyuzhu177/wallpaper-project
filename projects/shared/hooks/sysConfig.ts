import { ref } from 'vue'
import type { IConfigDto, IUpsertSysConfigBodyDto } from 'types'
import {
  Config,
  WALLPAPER_DOWNLOAD_LIMIT,
} from 'types'

import { cloneDeep } from 'lodash'
import { sysConfigGetApi } from '../api/sysConfig'

/** 加载中 */
const loading = ref(false)

/** 壁纸下载次数配置 */
const wallpaperDownload = ref<Required<IConfigDto>[Config.DOWNLOAD_LIMIT]>({})
/** 轮播图配置 */
const bannerConfig = ref<IUpsertSysConfigBodyDto[Config.BANNER_CONFIG]>([])
/** 轮播图原始数据 */
const bannerData = ref<IUpsertSysConfigBodyDto[Config.BANNER_CONFIG]>([])

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
          categoryId: '',
          url: '',
        }]
      bannerData.value = res
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
