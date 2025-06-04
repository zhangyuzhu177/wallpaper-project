<script setup lang="ts">
import Swiper from './swiper.vue'
import Notice from './notice.vue'
import SpecialPicked from './specialPicked.vue'
import Recommend from './recommend.vue'

const { getHomeData } = useHome()

onLoad(() => {
  getHomeData()
})
</script>

<template>
  <div class="flex flex-col gap6 p4">
    <!-- 轮播图 -->
    <Swiper />

    <!-- 公告 -->
    <Notice />

    <!-- 专题精选 -->
    <SpecialPicked />

    <!-- 每日推荐 -->
    <Recommend />
  </div>
</template>
