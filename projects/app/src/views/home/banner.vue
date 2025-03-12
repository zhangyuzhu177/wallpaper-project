<script setup lang="ts">
import { randomId } from 'utils'
import type { Config, IConfigDto } from 'types'

import cover from '~/static/images/cover.jpg'

const DEFAULT: IConfigDto[Config.BANNER_CONFIG] = [
  {
    id: randomId(),
    url: cover,
  },
]

/** 轮播图列表 */
const bannerList = ref<IConfigDto[Config.BANNER_CONFIG]>(DEFAULT)

/**
 * 获取轮播图配置
 */
async function getBannerConfig() {
  bannerList.value = await getBannerConfigApi() || DEFAULT
}

/**
 * 跳转详情
 */
function jumpInfo(to?: string) {
  if (!to)
    return
  uni.navigateTo({
    url: `/pages/classify/classlist?id=${to}`,
  })
}

onLoad(getBannerConfig)
</script>

<template>
  <view class="home_banner">
    <swiper
      class="swiper"
      indicator-color="#ffffff3a"
      indicator-active-color="#fff"
      circular indicator-dots autoplay
    >
      <swiper-item
        v-for="item in bannerList"
        :key="item.id"
      >
        <image
          :src="item.url"
          mode="aspectFill"
          @click="jumpInfo(item.categoryId)"
        />
      </swiper-item>
    </swiper>
  </view>
</template>

<style lang="scss" scoped>
.home_banner {
  .swiper {
    width: 100%;
    height: 340rpx;

    swiper-item {
      display: flex;
      justify-content: center;

      image {
        width: 90%;
        height: 100%;
        border-radius: 24rpx;
      }
    }
  }
}
</style>
