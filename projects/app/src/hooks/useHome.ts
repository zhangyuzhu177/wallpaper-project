import type { Config, ICategory, IConfigDto, INotice, IWallpaper } from 'types'

import { getNoticeListApi } from '@/api/notice'
import { getBannerConfigApi } from '@/api/config'
import { getSelectedPickedApi } from '@/api/classify'
import { getRecommendWallpaperApi } from '@/api/wallpaper'

/** 轮播图列表 */
const swiperList = ref<IConfigDto[Config.BANNER_CONFIG]>()
/** 公告列表 */
const noticeList = ref<INotice[]>()
/** 专题精选列表 */
const pickedList = ref<ICategory[]>()
/** 每日推荐列表 */
const recommendList = ref<IWallpaper[]>()

export function useHome() {
  /**
   * 获取首页数据
   */
  async function getHomeData() {
    try {
      const [
        swiperListRes,
        noticeListRes,
        pickedListRes,
        recommendListRes,
      ] = await Promise.all([
        getBannerConfigApi(),
        getNoticeListApi(),
        getSelectedPickedApi(),
        getRecommendWallpaperApi(),
      ])

      // 设置轮播图数据
      swiperList.value = swiperListRes.data
      // 设置公告数据
      noticeList.value = noticeListRes.data
      // 设置专题精选数据
      pickedList.value = pickedListRes.data
      // 设置每日推荐数据
      recommendList.value = recommendListRes.data
    }
    catch (error) {

    }
  }

  return {
    swiperList,
    noticeList,
    pickedList,
    recommendList,

    getHomeData,
  }
}
