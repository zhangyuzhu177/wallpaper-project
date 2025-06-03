<!-- 使用 type="home" 属性设置首页，其他页面不需要设置，默认为page；推荐使用json5，更强大，且允许注释 -->
<route lang="json5" type="home">
{
  "layout":false,
  "style": {
    "navigationStyle": "custom",
  },
}
</route>

<script lang="ts" setup>
import Home from '@/views/home/index.vue'
</script>

<template>
  <uni-layout name="home">
    <template #title>
      <view class="px-5 text-5 font-600">
        推荐
      </view>
    </template>
    <Home />
  </uni-layout>
</template>
