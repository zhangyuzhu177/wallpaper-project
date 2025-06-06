<script setup lang="ts">
import UserInfo from '../UserInfo.vue'
import { useUserStore } from '@/store'

const userStore = useUserStore()

const userInfo = computed(() => userStore.userInfo)
</script>

<template>
  <div class="p4 bg-grey-2 h-full flex flex-col gap4">
    <UserInfo />

    <view class="flex flex-col bg-grey-1 b-rd-2">
      <view class="p4 flex items-center justify-between">
        <view class="flex items-center gap1">
          <view class="i-mingcute:user-heart-fill icon" />
          <view>修改账号</view>
        </view>
        <view class="flex items-center">
          <view v-text="userInfo?.account" />
          <view class="i-mingcute:right-line icon" />
        </view>
      </view>
      <view class="h-[1px] w-full bg-[#F0F0F0]" />
      <view class="p4 flex items-center justify-between">
        <view class="flex items-center gap1">
          <view class="i-mingcute:user-3-fill icon" />
          <view>修改昵称</view>
        </view>
        <view class="flex items-center">
          <view v-text="userInfo?.name" />
          <view class="i-mingcute:right-line icon" />
        </view>
      </view>
    </view>

    <view class="flex flex-col bg-grey-1 b-rd-2">
      <view class="p4 flex items-center justify-between">
        <view class="flex items-center gap1">
          <view class="i-mingcute:lock-fill icon" />
          <view>修改密码</view>
        </view>
        <view class="flex items-center">
          <view class="i-mingcute:right-line icon" />
        </view>
      </view>
    </view>
  </div>
</template>
