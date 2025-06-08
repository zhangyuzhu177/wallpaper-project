<script setup lang="ts">
import { pathExtName, randomString } from 'utils'

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
      userStore.updateOwnUser({ avatar: data })
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
        userStore.updateOwnUser({ avatar: data })
      },
    },
    avatarUrl,
  )
  run()
}
</script>

<template>
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
</template>
