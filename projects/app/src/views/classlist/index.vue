<script setup lang="ts">
import img from '~/static/images/cover.jpg'
</script>

<template>
  <view class="classlist_layout">
    <view class="content">
      <navigator
        v-for="item in 10" :key="item"
        url="/pages/preview/preview" class="item"
      >
        <image :src="img" mode="aspectFill" />
      </navigator>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.classlist_layout {
  .content {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 5rpx;
    padding: 5rpx;

    .item {
      height: 440rpx;

      image {
        width: 100%;
        height: 100%;
        display: block;
      }
    }
  }
}
</style>
