<script setup lang="ts">
import { pathExtName, randomString } from 'utils'
import { toast } from '@/utils/toast'
import { useUserStore } from '@/store'
import { uploadFileUrl, useUpload } from '@/utils/uploadFile'
import { USER_MENU } from '@/constants/userMenu'
import { USER_AUTH_TOKEN_KEY } from '@/constants/storage'

const userStore = useUserStore()
const { statusBarHeight, titleBarHeight } = useSystem()

const isLogined = ref(false)
const defaultAvatar = '/static/images/default-avatar.png'

const userInfo = computed(() => userStore.userInfo)
const userId = computed(() => userStore.userInfo.id)

onShow(() => {
  isLogined.value = !!uni.getStorageSync(USER_AUTH_TOKEN_KEY)

  if (!isLogined.value)
    userStore.userInfo = undefined

  isLogined.value && useUserStore().getUserInfo()
})

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

/**
 * 跳转指定页面
 */
function jump(to: string) {
  if (!isLogined.value) {
    return uni.showToast({
      icon: 'none',
      title: '请先登录!',
    })
  }

  uni.navigateTo({ url: to })
}

/**
 * 退出登录
 */
function handleLogout() {
  if (!isLogined)
    return

  uni.showModal({
    title: '提示',
    content: '确定要退出登录吗？',
    success: (res) => {
      if (res.confirm) {
        // 清空用户信息
        useUserStore().logout()
        // 执行退出登录逻辑
        toast.success('退出登录成功')
        // #ifdef MP-WEIXIN
        uni.reLaunch({ url: '/pages/home/index' })
        // 微信小程序，去首页
        // #endif
        // #ifndef MP-WEIXIN
        // 非微信小程序，去登录页
        uni.reLaunch({ url: '/pages/login/index' })
        // #endif
      }
    },
  })
}
</script>

<template>
  <view
    class="flex flex-col gap6 bg-grey-2 p4"
    :style="{
      height: `calc(100vh - var(--window-bottom) - var(--window-top) - ${statusBarHeight + titleBarHeight + 40}px)`,
    }"
  >
    <!-- 用户信息区域 -->
    <view class="px-4 py-6 flex gap4 items-center rounded-2 bg-grey-1">
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

    <!-- 功能区块 -->
    <view class="flex flex-col b-rd-2 bg-grey-1">
      <view
        v-for="(item, i) in USER_MENU" :key="item.to"
        class="flex flex-col"
        @click="jump(item.to)"
      >
        <view class="flex items-center justify-between px-4 py-3">
          <view class="flex gap2 items-center">
            <wd-img :src="item.icon" width="20px" height="20px" />
            <view v-text="item.label" />
          </view>
          <view class="i-carbon:chevron-right w-[16px] h-[16px] text-grey-6" />
        </view>
        <view v-if="!(i === USER_MENU.length - 1)" class="h-[1px] w-full bg-[#F0F0F0]" />
      </view>
    </view>

    <!--  退出登录按钮 -->
    <view class="btns">
      <wd-button
        v-if="!isLogined"
        size="large"
        block :round="false"
        style="width: 100%;"
        @click="jumpLogin"
      >
        登录
      </wd-button>
      <wd-button
        v-else
        size="large"
        custom-class="logout-btn"
        block :round="false"
        style="width: 100%;"
        @click="handleLogout"
      >
        <view class="text-[#FA4350]">
          退出登录
        </view>
      </wd-button>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.btns {
  :deep() {
    .logout-btn {
      background-color: #FBEAE9 !important;
    }
  }
}
</style>
