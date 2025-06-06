<script setup lang="ts">
import { pathExtName, randomString } from 'utils'
import { toast } from '@/utils/toast'
import { useUserStore } from '@/store'
import { uploadFileUrl, useUpload } from '@/utils/uploadFile'

const userStore = useUserStore()

const defaultAvatar = '/static/images/default-avatar.png'

const userInfo = computed(() => userStore.userInfo)
const userId = computed(() => userStore.userInfo.id)

// #ifndef MP-WEIXIN
// 上传头像
const { run } = useUpload(
  // `${uploadFileUrl.USER_AVATAR}?path=/avatar/${userId.value}/${randomString(24, 24, '')}`,
  `http://localhost:9000/api/file/upload?path=/avatar/${userId.value}/${randomString(24, 24, '')}`,
  {},
  {
    onSuccess: (res) => {
      const { data } = res
      userStore.updateUserAvatar(data)
      toast.success('上传成功')
    },
  },
)
// #endif

// 微信小程序下选择头像事件
function onChooseAvatar(e: any) {
  if (!userId.value)
    return
  const { avatarUrl } = e.detail

  const { run } = useUpload(
    `${uploadFileUrl.USER_AVATAR}?path=/avatar/${userId.value}/${randomString(24, 24, '')}${pathExtName(avatarUrl)}`,
    {},
    {
      onSuccess: (res) => {
        const { data } = res
        userStore.updateUserAvatar(data)
        toast.success('上传成功')
      },
    },
    avatarUrl,
  )
  run()
}

/**
 * 跳转登录页
 */
function jumpLogin() {
  const redirectRoute = `/pages/login/index?redirect=${encodeURIComponent('/pages/user/index')}`

  uni.navigateTo({
    url: redirectRoute,
  })
}
</script>

<template>
  <view class="px-4 py-4 flex gap4 items-center rounded-2 bg-grey-1">
    <!-- #ifdef MP-WEIXIN -->
    <button
      class="p0 m0 w-[80px] h-[80px] rounded-full" open-type="chooseAvatar"
      @chooseavatar="onChooseAvatar"
    >
      <wd-img :src="userInfo?.avatar ?? defaultAvatar" width="100%" height="100%" radius="100%" />
    </button>
    <!-- #endif -->
    <!-- #ifndef MP-WEIXIN -->
    <view class="w-[80px] h-[80px] rounded-full" @click="run">
      <wd-img
        :src="userInfo?.avatar ?? defaultAvatar"
        width="100%" height="100%" radius="100%"
      />
    </view>
    <!-- #endif -->
    <view v-if="userInfo" class="flex flex-col gap1">
      <view class="text-xl" v-text="userInfo?.name" />
      <view
        v-if="userInfo?.account" class="text-grey-5"
        v-text="`ID: ${userInfo?.account}`"
      />
    </view>
    <view v-else class="text-grey-5 " @click="jumpLogin" v-text="'登录/注册'" />
  </view>
</template>
