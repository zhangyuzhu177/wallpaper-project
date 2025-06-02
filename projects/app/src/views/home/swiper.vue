<script setup lang="ts">
import type { Config, IConfigDto } from 'types'
import { getBannerConfigApi } from '@/api/config'

const current = ref<number>(0)

const swiperList = ref<IConfigDto[Config.BANNER_CONFIG]>()

/**
 * 获取轮播图 列表
 */
async function getBannerConfig() {
  const res = await getBannerConfigApi()
  swiperList.value = res.data
}

onLoad(() => {
  getBannerConfig()
})
</script>

<template>
  <wd-swiper
    v-model:current="current"
    value-key="url"
    :list="swiperList"
    autoplay
    :indicator="{ type: 'dots-bar' }"
  />
</template>
