<script lang="ts" setup>
import moment from 'moment'
import type { INotice } from 'types'

/** 公告 */
const notice = ref<INotice>()

/**
 * 返回上一页
 */
function jumpBack() {
  uni.navigateBack()
}

/**
 * 获取公告详情
 */
async function getNoticeDetail(id: string) {
  notice.value = await getNoticeDetailApi(id)
}

onLoad((e) => {
  if (e?.id)
    getNoticeDetail(e.id)
})
</script>

<template>
  <view class="detail_layout page_bg">
    <Header>
      <view class="title">
        <view class="icon" @click="jumpBack">
          <uni-icons type="arrow-left" size="20" />
        </view>
        <text v-text="'公告详情'" />
        <view class="icon" style="opacity: 0;">
          <uni-icons type="arrow-left" size="20" />
        </view>
      </view>
    </Header>
    <view class="detail_content">
      <view class="header">
        <view class="header_title" v-text="notice?.title" />
        <view class="info">
          <text v-text="notice?.adminName" />
          <text v-text="moment(notice?.createdAt).format('YYYY-MM-DD HH:mm:ss')" />
        </view>
      </view>
      <view v-html="notice?.content" />
    </view>
  </view>
</template>

<style lang="scss" scoped>
.detail_layout{
  height: 100vh;

  .title {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .detail_content{
    padding: 30rpx;
    display: flex;
    flex-direction: column;
    gap: 30rpx;

    .header{
      display: flex;
      flex-direction: column;
      gap: 16rpx;

      .header_title{
        font-size: 38rpx;
      }

      .info {
        display: flex;
        gap: 16rpx;
        align-items: center;
        color: $uni-color-grey-5;
      }
    }
  }
}
</style>
