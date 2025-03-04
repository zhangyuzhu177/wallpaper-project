<script setup lang="ts">
import img from '~/static/images/cover.jpg'
</script>

<template>
  <div class="classify_layout page_bg">
    <view class="classify_content">
      <Item
        v-for="item in 10" :key="item"
        :title="item" :url="img"
      />
    </view>
  </div>
</template>

<style lang="scss" scoped>
.classify_layout {
  padding: 30rpx 38rpx;

  .classify_content {
    gap:15rpx;
    display: grid;
    grid-template-columns: repeat(3,1fr);
  }
}
</style>
