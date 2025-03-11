<script setup lang="ts">
import img from '~/static/images/cover.jpg'

/**
 * 返回上一页
 */
function jumpBack() {
  uni.navigateBack()
}

/**
 * 返回首页
 */
function jumpHome() {
  uni.reLaunch({
    url: '/pages/home/home',
  })
}
</script>

<template>
  <view class="classlist_layout page_bg">
    <Header>
      <view class="title">
        <view class="title_icon">
          <view class="icon" @click="jumpBack">
            <uni-icons type="arrow-left" size="20" />
          </view>
          <view class="icon" @click="jumpHome">
            <uni-icons type="home" size="20" />
          </view>
        </view>
        <text v-text="123" />
        <view class="title_icon" style="opacity: 0;">
          <view class="icon">
            <uni-icons type="arrow-left" size="20" />
          </view>
          <view class="icon">
            <uni-icons type="home" size="20" />
          </view>
        </view>
      </view>
    </Header>
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
  display: flex;
  flex-direction: column;

  .title{
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title_icon{
      display: flex;
      gap: 16rpx;

      .icon {
        display: flex;
        align-items: center;
        justify-content: center;

        :deep(.uni-icons) {
          width: 20px;
          height: 20px;
          color: $uni-color-grey-9 !important;
        }
      }
    }
  }

  .content {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16rpx;
    padding: 16rpx 30rpx;

    .item {
      height: 400rpx;

      image {
        width: 100%;
        height: 100%;
        display: block;
        border-radius: 8rpx;
      }
    }
  }
}
</style>
