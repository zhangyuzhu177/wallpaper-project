<script setup lang="ts">
import { ref } from 'vue'
import RegisterPopup from './registerPopup.vue'
import { useUserStore } from '@/store/user'
import { isMpWeixin } from '@/utils/platform'
import { showToast, toast } from '@/utils/toast'
import { isTableBar } from '@/utils/index'

// 获取环境变量
const appTitle = ref(import.meta.env.VITE_APP_TITLE || 'Unibest Login')
const appLogo = ref(import.meta.env.VITE_APP_LOGO || '/static/logo.png')

// 初始化store
const userStore = useUserStore()
// 路由位置
const redirectRoute = ref('')
// 注册对话框
const registerDialog = ref(false)
// 登录表单数据
const loginForm = ref({
  account: '',
  password: '',
})
// 隐私协议勾选状态
const agreePrivacy = ref(false)

const disabled = computed(() => {
  const { account, password } = loginForm.value
  return !account || !password
})

// 页面加载完毕时触发
onLoad((option) => {
  // 一进来就刷新验证码
  // captcha.value.captchaEnabled && refreshCaptcha()
  // 获取跳转路由
  if (option.redirect)
    redirectRoute.value = decodeURIComponent(option.redirect)
})

// 账号密码登录
async function handleAccountLogin() {
  if (!agreePrivacy.value)
    return toast.error('请阅读同意协议')

  // 表单验证
  if (!loginForm.value.account)
    return toast.error('请输入账号')

  if (!loginForm.value.password)
    return toast.error('请输入密码')

  // 执行登录
  await userStore.login(loginForm.value)
  jumpRedirect()
}

// 微信登录
async function handleWechatLogin() {
  if (!isMpWeixin) {
    toast.info('请在微信小程序中使用此功能')
    return
  }

  // 验证是否同意隐私协议
  if (!agreePrivacy.value) {
    toast.error('请先阅读并同意用户协议和隐私政策')
    return
  }
  // 微信登录
  await userStore.wxLogin()
  jumpRedirect()
}

/**
 * 跳转重定向地址
 */
function jumpRedirect() {
  // 跳转到首页或重定向页面
  const targetUrl = redirectRoute.value || '/pages/home/index'

  if (isTableBar(targetUrl))
    uni.switchTab({ url: targetUrl })
  else
    uni.redirectTo({ url: targetUrl })
}

// 刷新验证码
// function refreshCaptcha() {
//   // 获取验证码
//   getCode().then((res) => {
//     const { data } = res
//     loginForm.value.uuid = data.uuid
//     captcha.value = data
//   })
// }

// 处理协议点击
function handleAgreement(type: 'user' | 'privacy') {
  const title = type === 'user' ? '用户协议' : '隐私政策'
  showToast(`查看${title}`)
  // 实际项目中可以跳转到对应的协议页面
  // uni.navigateTo({
  //   url: `/pages/agreement/${type}`
  // })
}
</script>

<template>
  <view class="login-container">
    <!-- 背景装饰元素 -->
    <view class="bg-decoration bg-circle-1" />
    <view class="bg-decoration bg-circle-2" />
    <view class="bg-decoration bg-circle-3" />

    <!-- 标题 -->
    <view class="login-header">
      <image class="login-logo" :src="appLogo" mode="aspectFit" />
      <view class="login-title" v-text="appTitle" />
    </view>
    <!-- 表单 -->
    <view class="login-form flex flex-col gap6">
      <view class="flex flex-col center gap2">
        <view class="text-[48rpx]" v-text="'欢迎登录'" />
        <view class="text-[28rpx]" v-text="'请输入您的账号和密码'" />
      </view>
      <!-- login-input-group -->
      <view class="flex flex-col gap4">
        <view class="input-wrapper">
          <wd-input
            v-model="loginForm.account"
            placeholder="请输入账号"
            clearable
            custom-class="login-input"
            :border="false"
            required
          >
            <template #prefix>
              <view class="i-mingcute:user-3-line size-5 text-[#9CA3AF]" />
            </template>
          </wd-input>
          <!-- <view class="input-bottom-line" /> -->
        </view>
        <view class="input-wrapper">
          <wd-input
            v-model="loginForm.password"
            placeholder="请输入密码"
            clearable
            show-password
            custom-class="login-input"
            :border="true"
            required
          >
            <template #prefix>
              <view class="i-mingcute:lock-line size-5 text-[#9CA3AF]" />
            </template>
          </wd-input>
          <!-- <view class="input-bottom-line" /> -->
        </view>
        <view class="text-grey-4" @click="registerDialog = true" v-text="'立即注册'" />
        <!-- 验证码区域 -->
        <!-- <view class="input-wrapper captcha-wrapper">
          <wd-input
            v-if="captcha.captchaEnabled"
            v-model="loginForm.code"
            prefix-icon="secured"
            placeholder="请输入验证码"
            clearable
            class="login-input captcha-input"
            :border="false"
            required
          >
            <template #suffix>
              <image
                class="captcha-image"
                :src="`data:image/gif;base64,${captcha.image}`"
                mode="aspectFit"
                @click="refreshCaptcha"
              />
            </template>
          </wd-input>
          <view class="input-bottom-line" />
        </view> -->
      </view>
      <!-- 登录按钮组 -->
      <view class="flex flex-col gap4">
        <!-- 账号密码登录按钮 -->
        <wd-button
          type="primary"
          size="large"
          :round="false"
          :disabled="disabled"
          :loading="userStore.loading"
          custom-class="account-login-btn"
          @click="handleAccountLogin"
        >
          <wd-icon name="right" size="18px" class="login-icon" />
          登录
        </wd-button>
        <!-- 微信小程序一键登录按钮 -->
        <!-- #ifdef MP-WEIXIN -->
        <view class="flex items-center gap6">
          <view class="h-[1px] bg-grey-3 flex-1" />
          <view class="text-grey-6">
            其他登录方式
          </view>
          <view class="h-[1px] bg-grey-3 flex-1" />
        </view>
        <wd-button
          type="success"
          size="large"
          :round="false"
          block
          :loading="userStore.wxLoading"
          class="wechat-login-btn"
          @click="handleWechatLogin"
        >
          <view class="flex gap2 items-center">
            <view class="i-mingcute:wechat-fill" />
            <view>微信一键登录</view>
          </view>
        </wd-button>
        <!-- #endif -->
      </view>
    </view>
    <!-- 隐私协议勾选 -->
    <view class="privacy-agreement">
      <wd-checkbox
        v-model="agreePrivacy"
        shape="square"
        class="privacy-checkbox"
        active-color="var(--wot-color-theme, #1989fa)"
      >
        <view class="agreement-text">
          我已阅读并同意
          <text class="agreement-link" @click.stop="handleAgreement('user')">
            《用户协议》
          </text>
          和
          <text class="agreement-link" @click.stop="handleAgreement('privacy')">
            《隐私政策》
          </text>
        </view>
      </wd-checkbox>
    </view>
    <view class="login-footer" />
    <RegisterPopup v-model="registerDialog" />
  </view>
</template>

<style lang="scss" scoped>
.input-wrapper {
  :deep() {
    .login-input {
      border-radius: 8px;
      padding: 4px 16px;
      background-color: #F7F9FC;
      border: 1px solid #E4E7EC;

      &::after {
        height: 0;
      }

      input {
        font-size: 16px;
      }

      .wd-icon {
        background-color: #F9FAFB;
        font-size: 20px;
      }
    }
  }
}

/* 验证码输入框样式 */
.captcha-wrapper {
  .captcha-input {
    :deep(.wd-input__suffix) {
      margin-right: 0;
      padding-right: 0;
    }
  }

  .captcha-image {
    width: 100px;
    height: 36px;
    margin-left: 10px;
    border-radius: 8px;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(to bottom, rgba(255, 255, 255, 0.1), transparent);
      pointer-events: none;
    }

    &:active {
      opacity: 0.8;
      transform: scale(0.96);
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
    }
  }
}

.login-container {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 0 60rpx;
  background-color: #ffffff;
  background-image: linear-gradient(
    135deg,
    rgba(25, 137, 250, 0.05) 0%,
    rgba(255, 255, 255, 0) 100%
  );
  position: relative;
  overflow: hidden;
}

/* 背景装饰元素 */
.bg-decoration {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(25, 137, 250, 0.05), rgba(25, 137, 250, 0.1));
  z-index: 0;
  pointer-events: none;
}

.bg-circle-1 {
  width: 500rpx;
  height: 500rpx;
  top: -200rpx;
  right: -200rpx;
  opacity: 0.6;
}

.bg-circle-2 {
  width: 400rpx;
  height: 400rpx;
  bottom: 10%;
  left: -200rpx;
  opacity: 0.4;
}

.bg-circle-3 {
  width: 300rpx;
  height: 300rpx;
  bottom: -100rpx;
  right: 10%;
  opacity: 0.3;
  background: linear-gradient(135deg, rgba(7, 193, 96, 0.05), rgba(7, 193, 96, 0.1));
}

.login-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 120rpx;
  animation: fadeInDown 0.8s ease-out;

  .login-logo {
    width: 200rpx;
    height: 200rpx;
    border-radius: 36rpx;
    box-shadow: 0 10rpx 30rpx rgba(0, 0, 0, 0.12);
    transition: all 0.3s ease;

    &:active {
      transform: scale(0.95);
      box-shadow: 0 6rpx 15rpx rgba(0, 0, 0, 0.1);
    }
  }

  .login-title {
    margin-top: 30rpx;
    font-size: 46rpx;
    font-weight: bold;
    color: #333333;
    letter-spacing: 3rpx;
    text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.05);
  }
}

.login-form {
  flex: 1;
  margin-top: 70rpx;
  animation: fadeIn 0.8s ease-out 0.2s both;

  .welcome-text {
    margin-bottom: 16rpx;
    font-size: 48rpx;
    font-weight: bold;
    color: #333333;
    text-align: center;
    letter-spacing: 1rpx;
  }

  .login-desc {
    margin-bottom: 70rpx;
    font-size: 28rpx;
    color: #888888;
    text-align: center;
  }

  .login-input-group {
    margin-bottom: 60rpx;
    position: relative;
    z-index: 1;

    .input-wrapper {
      position: relative;
      margin-bottom: 50rpx;
      transition: all 0.3s ease;
      border-radius: 16rpx;
      overflow: hidden;

      &:last-child {
        margin-bottom: 0;
      }

      .login-input {
        border:1px solid #000;
        padding: 12rpx 20rpx;
        border-radius: 16rpx;
        transition: all 0.3s ease;

        :deep(.wd-input__inner) {
          font-size: 30rpx;
          color: #333333;
        }

        :deep(.wd-input__placeholder) {
          font-size: 28rpx;
          color: #aaaaaa;
        }

        &:focus-within {
          background-color: rgba(245, 247, 250, 0.95);
          box-shadow: 0 6rpx 16rpx rgba(0, 0, 0, 0.06);
          transform: translateY(-3rpx);
        }
      }

      .input-bottom-line {
        position: absolute;
        bottom: -2rpx;
        left: 5%;
        width: 90%;
        height: 2rpx;
        background: linear-gradient(
          to right,
          transparent,
          var(--wot-color-theme, #1989fa),
          transparent
        );
        transition: transform 0.4s ease;
        transform: scaleX(0);
        opacity: 0.8;
      }

      &:focus-within .input-bottom-line {
        transform: scaleX(1);
      }

      .input-icon {
        margin-right: 16rpx;
        color: #666666;
        transition: color 0.3s ease;
      }

      &:focus-within .input-icon {
        color: var(--wot-color-theme, #1989fa);
      }
    }
  }
}

.privacy-agreement {
  display: flex;
  justify-content: center;
  margin: 30rpx 0 30rpx;
  animation: fadeIn 0.8s ease-out 0.4s both;

  .privacy-checkbox {
    display: flex;
    align-items: center;
  }

  .agreement-text {
    font-size: 26rpx;
    line-height: 1.6;
    color: #666666;

    .agreement-link {
      padding: 0 4rpx;
      font-weight: 500;
      color: var(--wot-color-theme, #1989fa);
      transition: all 0.3s ease;

      &:active {
        opacity: 0.8;
        transform: scale(0.98);
      }
    }
  }
}

.login-footer {
  padding: 50rpx 0;
  margin-top: auto;
}

/* 添加动画效果 */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
