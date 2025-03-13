<script setup lang="ts">
const { isLogin, userInfo, logout, getOwnProfile } = useUser()
const { titleBarHeight, statusBarHeight } = useSystem()

onLoad(() => {
  if (!isLogin.value) {
    uni.navigateTo({
      url: '/pages/auth/login',
    })
  }
})

const menuList = [
  { title: '收藏', icon: 'heart', url: '/pages/preview/preview' },
  { title: '下载', icon: 'download', url: '/pages/preview/preview' },
]

/**
 * 跳转
 */
function jump(url: string) {
  uni.navigateTo({ url })
}

/**
 * 退出登录
 */
function handleLogout() {
  uni.showModal({
    title: '提示',
    content: '确定要退出登录吗？',
    success: (res) => {
      if (res.confirm) {
        logout()
        uni.navigateTo({
          url: '/pages/auth/login',
        })
      }
    },
  })
}

async function onChooseAvatar(e: any) {
  const { avatarUrl } = e.detail
  if (!avatarUrl)
    return

  uni.showLoading({
    title: '上传中...',
  })

  try {
    const res = await userUpdateAvatarApi({ avatar: avatarUrl })
    if (res) {
      userInfo.value!.avatar = avatarUrl
      await getOwnProfile()
    }
  }
  finally {
    uni.hideLoading()
  }
}
</script>

<template>
  <view
    class="user_layout page_bg"
    :style="{ paddingTop: `${titleBarHeight + statusBarHeight}px` }"
  >
    <!-- 用户信息区域 -->
    <view class="user-info">
      <button open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
        <image class="avatar" :src="userInfo?.avatar" mode="aspectFill" />
      </button>
      <view class="info">
        <text class="nickname">
          {{ userInfo?.name || '未登录' }}
        </text>
        <text class="account">
          账号: {{ userInfo?.account }}
        </text>
      </view>
    </view>

    <!-- 功能菜单 -->
    <view class="menu-list">
      <view
        v-for="(item, index) in menuList"
        :key="index"
        class="menu-item"
        @click="jump(item.url)"
      >
        <uni-icons :type="item.icon" size="24" color="#666" />
        <text class="menu-title">
          {{ item.title }}
        </text>
        <uni-icons type="right" size="16" color="#999" />
      </view>
    </view>

    <!-- 退出登录按钮 -->
    <view class="logout-btn" @click="handleLogout">
      <button type="button">
        退出登录
      </button>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.user_layout {
  padding: 30rpx;
}

.user-info {
  display: flex;
  gap: 30rpx;
  align-items: center;
  border-radius: 20rpx;
  margin-bottom: 30rpx;
  padding-top: 100rpx;

  button {
    width: 150rpx;
    height: 150rpx;
    border-radius: 50%;
    margin: 0;
    padding: 0;
    &::after {
      display: none;
    }
  }

  .avatar {
    width: 150rpx;
    height: 150rpx;
    border-radius: 60rpx;
    margin-right: 30rpx;
  }

  .info {
    display: flex;
    flex-direction: column;
    justify-content: center;

    .nickname {
      font-size: 32rpx;
      font-weight: bold;
      color: #333;
      margin-bottom: 10rpx;
    }

    .account {
      font-size: 24rpx;
      color: #999;
    }
  }
}

.menu-list {
  background: #fff;
  border-radius: 20rpx;
  margin-bottom: 30rpx;

  .menu-item {
    display: flex;
    align-items: center;
    padding: 30rpx;
    border-bottom: 1rpx solid #f5f5f5;

    &:last-child {
      border-bottom: none;
    }

    .menu-title {
      flex: 1;
      margin-left: 20rpx;
      font-size: 28rpx;
      color: #333;
    }
  }
}

.logout-btn {
  padding: 30rpx;

  button {
    width: 100%;
    height: 80rpx;
    line-height: 80rpx;
    text-align: center;
    background: #ff4d4f;
    color: #fff;
    border-radius: 40rpx;
    font-size: 28rpx;
  }
}
</style>
