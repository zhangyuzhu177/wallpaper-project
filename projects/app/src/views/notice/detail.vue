<script setup lang="ts">
import dayjs from 'dayjs'
import type { INotice } from 'types'
import { getNoticeDetailApi } from '@/api/notice'

/** 公告详情 */
const notice = ref<INotice>()

/**
 * 获取公告详情
 */
async function getNoticeDetail(noticeId?: string) {
  if (!noticeId)
    return

  const { data } = await getNoticeDetailApi(noticeId)
  notice.value = data
}

onLoad((options: { noticeId: string }) => {
  const { noticeId } = options
  getNoticeDetail(noticeId)
})
</script>

<template>
  <view class="p4 flex flex-col gap-6">
    <view class="flex flex-col gap2">
      <view class="text-xl font-bold" v-text="notice?.title" />
      <view
        class="text-sm text-gray-4"
        v-text="dayjs(notice?.createdAt).format('YYYY-MM-DD hh:mm')"
      />
    </view>

    <view v-text="notice?.content" />
  </view>
</template>
