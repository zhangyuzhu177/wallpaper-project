<route lang="json5">
{
  "layout":false,
  "style": {
    "navigationStyle": "custom",
  },
}
</route>

<script setup lang="ts">
import NoticeDetail from '@/views/notice/detail.vue'
</script>

<template>
  <uni-layout name="home">
    <template #title>
      <view class="w-full">
        <ZNavbar title="公告详情" :capsule="true" />
      </view>
    </template>
    <NoticeDetail />
  </uni-layout>
</template>
