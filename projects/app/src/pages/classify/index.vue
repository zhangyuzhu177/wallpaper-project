<route lang="json5">
{
  "layout":false,
  "style": {
    "navigationStyle": "custom",
  },
}
</route>

<script lang="ts" setup>
</script>

<template>
  <uni-layout name="home">
    <template #title>
      <view class="px-5 text-5 font-600">
        分类
      </view>
    </template>
    <view class="btn">
      <wd-button custom-class="text-btn">
        测试
      </wd-button>
    </view>
  </uni-layout>
</template>

<style lang="scss">
.btn {
  :deep() {
    .text-btn {
      background-color: pink !important;
    }
  }
}
</style>
