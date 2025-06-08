<script setup lang="ts">
import Avatar from './components/avatar/Avatar.vue'
import { toast } from '@/utils/toast'
import { useUserStore } from '@/store'
import { USER_MENU } from '@/constants/userMenu'
import { USER_AUTH_TOKEN_KEY } from '@/constants/storage'

const userStore = useUserStore()

const isLogined = ref(false)

const userInfo = computed(() => userStore.userInfo)

const icons = [
  'i-mingcute:star-line',
  'i-mingcute:download-2-line',
  'i-mingcute:user-4-line',
  'i-mingcute:document-2-line',
]

onShow(() => {
  isLogined.value = !!uni.getStorageSync(USER_AUTH_TOKEN_KEY)

  if (!isLogined.value)
    userStore.userInfo = undefined

  isLogined.value && useUserStore().getUserInfo()
})

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
  <view class="h-full flex flex-col gap6  py16">
    <!-- 用户信息区域 -->
    <view class="px-4 py-4 flex gap4 items-center rounded-2 bg-grey-1">
      <Avatar />
      <view v-if="userInfo" class="flex justify-between items-center flex-1">
        <view class="flex flex-col">
          <view class="text-xl" v-text="userInfo?.name" />
          <view
            v-if="userInfo?.account" class="text-sm text-grey-5"
            v-text="`ID: ${userInfo?.account}`"
          />
        </view>
        <view class="flex items-center" @click="jump('/pages/user/settings?title=编辑资料')">
          <view class="text-sm text-grey-6">
            编辑资料
          </view>
          <view class="i-carbon:chevron-right icon" />
        </view>
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
        <view class="flex items-center justify-between p-4">
          <view class="flex gap3 items-center">
            <!-- <wd-img :src="item.icon" width="20px" height="20px" /> -->
            <view :class="`${icons[i]} size-6 text-grey-9`" />
            <view v-text="item.label" />
          </view>
          <view class="i-carbon:chevron-right w-[16px] h-[16px] text-grey-6" />
        </view>
        <view class="h-[1px] w-full bg-[#F0F0F0]" />
      </view>
    </view>

    <!--  退出登录按钮 -->
    <view class="btns px-4">
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
