<route lang="json5">
{
  "style": {
    "navigationStyle": "custom",
  },
}
</route>

<script setup lang="ts">
import NoticeDetail from '@/views/notice/detail.vue'
</script>

<template>
  <view class="w-full h-full">
    <view class="w-full">
      <ZNavbar fixed safe-area-inset-top :capsule="true">
        公告详情
      </ZNavbar>
    </view>
    <NoticeDetail />
  </view>
</template>
