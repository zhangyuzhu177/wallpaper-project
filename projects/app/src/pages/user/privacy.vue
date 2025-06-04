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
        <ZNavbar title="隐私政策" :capsule="true" />
      </view>
    </template>
    <view>
      隐私政策
    </view>
  </uni-layout>
</template>
