<script setup lang="ts">
import img from '~/static/images/cover.jpg'
</script>

<template>
  <div class="classify_layout page_bg">
    <Header title="分类" />
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
  width: 750rpx;
  display: flex;
  flex-direction: column;
  gap: 36rpx;
  padding-bottom: 30rpx;

  .classify_content {
    padding: 0 30rpx;
    gap:15rpx;
    display: grid;
    grid-template-columns: repeat(3,1fr);
  }
}
</style>
