<route lang="json5">
{
  "layout":false,
  "style": {
    "navigationStyle": "custom",
  },
}
</route>

<script setup lang="ts">
import Settings from '@/views/user/settings/index.vue'
</script>

<template>
  <view class="w-full h-full flex flex-col">
    <ZNavbar fixed safe-area-inset-top :capsule="true">
      账户设置
    </ZNavbar>
    <Settings />
  </view>
</template>
