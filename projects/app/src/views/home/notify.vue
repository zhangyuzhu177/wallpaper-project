<script setup lang="ts">
import type { INotice } from 'types'
import { getNoticeListApi } from '@/api/notice'

const notifys = ref<INotice[]>()

/**
 * 获取公告 列表
 */
async function getNoticeList() {
  const res = await getNoticeListApi()
  notifys.value = res.data
}

onLoad(() => {
  getNoticeList()
})
</script>

<template>
  <view class="flex gap2 items-center p3 b-rd-2 bg-grey-2">
    <view class="i-mingcute:volume-line text-grey-6 size-5" />
    <view class="notice_content flex-1">
      <swiper autoplay vertical circular disable-touch>
        <swiper-item v-for="{ id, title } in notifys" :key="id">
          <navigator
            :url="`/pages/notice/detail?id=${id}`"
            class="text-grey-6 truncate"
            v-text="title"
          />
        </swiper-item>
      </swiper>
    </view>
    <view class="i-mingcute:right-line text-grey-6 size-5" />
  </view>
</template>

<style lang="scss" scoped>
.notice_content{
  swiper {
    height: 40rpx;
    width: 100%;

    &-item {
      height: 100%;
      display: flex;
      align-items: center;
    }
  }
}
</style>
