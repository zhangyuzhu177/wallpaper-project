<route lang="json5">
{
  "layout":false,
  "style": {
    "navigationStyle": "custom",
  },
}
</route>

<script setup lang="ts">

</script>

<template>
  <uni-layout name="home">
    <template #title>
      <view class="w-full">
        <ZNavbar title="账号设置" :capsule="true" />
      </view>
    </template>
    <view>
      账号设置
    </view>
  </uni-layout>
</template>
