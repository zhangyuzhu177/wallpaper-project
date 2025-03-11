<script lang="ts" setup>
interface ItemProps {
  /**
   * 标题
   */
  title?: string | number
  /**
   * 图片
   */
  url?: string
  /**
   * 更多
   *
   * 默认为 false 当值为 true 时，title、url将失效
   *
   */
  isMore?: boolean
}

defineProps<ItemProps>()
</script>

<template>
  <view class="item">
    <navigator v-if="!isMore" url="/pages/classify/classlist" class="box">
      <image class="pic" :src="url" mode="aspectFill" />
      <view class="mask" v-text="title" />
    </navigator>

    <navigator v-else url="/pages/classify/classify" open-type="reLaunch" class="box more">
      <image class="pic" src="../../static//images/cover.jpg" mode="aspectFill" />
      <view class="mask">
        <uni-icons type="more-filled" size="34" color="#fff" />
        <view class="text">
          更多
        </view>
      </view>
    </navigator>
  </view>
</template>

<style lang="scss" scoped>
.item {
  .box {
    height: 340rpx;
    border-radius: 10rpx;
    overflow: hidden;
    position: relative;

    .pic {
      width: 100%;
      height: 100%;
    }

    .mask {
      width: 100%;
      height: 70rpx;
      position: absolute;
      bottom: 0;
      left: 0;
      background: rgba(0, 0, 0, 0.2);
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      backdrop-filter: blur(20rpx);
      font-weight: 600;
      font-size: 30rpx;
    }
  }

  .box.more {
    .mask {
      width: 100%;
      height: 100%;
      flex-direction: column;
    }

    .text {
      font-size: 28rpx;
    }
  }
}
</style>
