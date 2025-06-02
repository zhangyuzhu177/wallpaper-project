<script setup lang="ts">
import Swiper from './swiper.vue'
import Notify from './notify.vue'
import SelectedTopics from './selectedTopics.vue'
import Recommend from './recommend.vue'
</script>

<template>
  <div class="flex flex-col gap6 p4">
    <!-- 轮播图 -->
    <Swiper />

    <!-- 公告 -->
    <Notify />

    <!-- 专题精选 -->
    <SelectedTopics />

    <!-- 每日推荐 -->
    <Recommend />
  </div>
</template>
