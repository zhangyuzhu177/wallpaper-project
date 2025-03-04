<script setup lang="ts">
import banner1 from '~/static/images/banner1.jpg'
import banner2 from '~/static/images/banner2.jpg'
import banner3 from '~/static/images/banner3.jpg'

const list = [
  {
    img: banner1,
  },
  {
    img: banner2,
  },
  {
    img: banner3,
  },
]
</script>

<template>
  <view class="home_banner">
    <swiper
      class="swiper"
      indicator-color="#ffffff3a"
      indicator-active-color="#fff"
      circular indicator-dots autoplay
    >
      <swiper-item v-for="{ img } in list" :key="img">
        <image :src="img" />
      </swiper-item>
    </swiper>
  </view>
</template>

<style lang="scss" scoped>
.home_banner {
  .swiper {
    width: 100%;
    height: 340rpx;

    swiper-item {
      display: flex;
      justify-content: center;

      image {
        width: 90%;
        height: 100%;
        border-radius: 24rpx;
      }
    }
  }
}
</style>
