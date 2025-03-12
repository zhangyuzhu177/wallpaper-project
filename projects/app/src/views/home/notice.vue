<script setup lang="ts">
import type { INotice } from 'types'

/** 公告列表 */
const noticeList = ref<INotice[]>()

/**
 * 获取公告列表
 */
async function getNoticeList() {
  noticeList.value = await getNoticeListApi()
}

onLoad(getNoticeList)
</script>

<template>
  <view class="home_notice">
    <view class="home_notice_title">
      <uni-icons
        type="sound-filled"
        color="$uni-color-primary"
        size="24"
      />
      <view v-text="'公告'" />
    </view>

    <view class="home_notice_content">
      <swiper autoplay vertical circular disable-touch>
        <swiper-item v-for="{ id, title } in noticeList" :key="id">
          <navigator
            :url="`/pages/notice/detail?id=${id}`"
            v-text="title"
          />
        </swiper-item>
      </swiper>
    </view>

    <uni-icons
      class="home_notice_btn" type="right"
      color="$uni-color-grey-7" size="16"
    />
  </view>
</template>

<style lang="scss" scoped>
.home_notice{
  display: flex;
  gap: 24rpx;
  align-items: center;
  justify-content: space-between;
  padding: 16rpx 24rpx;
  border-radius: 50rpx;
  background-color: $uni-color-grey-2;
  white-space: nowrap;

  .home_notice_title {
    height: 100%;
    display: flex;
    align-items: center;
    gap: 8rpx;
    color: $uni-color-primary;
  }

  .home_notice_content{
    flex: 1;

    swiper {
      height: 40rpx;
      width: 100%;

      &-item {
        height: 100%;
        color: $uni-color-grey-6;
        display: flex;
        align-items: center;

        navigator {
          display: block;
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }

  .home_notice_btn{
    color: $uni-color-grey-7;
  }
}
</style>
