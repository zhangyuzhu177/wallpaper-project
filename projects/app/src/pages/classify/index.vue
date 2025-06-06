<route lang="json5">
{
  "layout":false,
  "style": {
    "navigationStyle": "custom",
  },
}
</route>

<script lang="ts" setup>
import Classify from '@/views/classify/index.vue'
</script>

<template>
  <uni-layout name="home">
    <template #title>
      <view class="w-full flex items-center px-5 text-[48rpx] font-600">
        分类
      </view>
    </template>
    <Classify />
  </uni-layout>
</template>
