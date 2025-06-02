<script setup lang="ts">
const { loginByPassword, loginByWeixin } = useUser()

/** 用户协议 */
const checked = ref(false)
/** 是否显示其他登录方式 */
const show = ref(false)
/** 是否显示用户协议 */
const showModal = ref(false)
/** 账号+密码登录表单 */
const form = ref({
  account: '',
  password: '',
})

const disabled = computed(() => {
  const { account, password } = form.value
  return !account || !password
})

async function login() {
  if (!checked.value) {
    showModal.value = true
    return
  }

  uni.login({
    provider: 'weixin', // 使用微信登录
    success: async (loginRes) => {
      const { code } = loginRes
      await loginByWeixin(code)
    },
  })
}

/**
 * 账号+密码登录
 */
async function loginByPwd() {
  if (disabled.value)
    return
  await loginByPassword(form.value)
}
</script>

<template>
  <view class="login_layout page_bg">
    <view class="content">
      <button class="btn" @click="login">
        <uni-icons type="weixin" color="$uni-color-grey-1" size="20" />
        <text>微信一键登录</text>
      </button>

      <view class="other_login">
        <view
          @click="() => {
            if (checked)
              show = true
          }"
        >
          其他登录方式
        </view>
        <view>暂不登录</view>
      </view>

      <view class="checkbox_group">
        <up-checkbox
          v-model:checked="checked"
          :custom-style="{ marginBottom: '8px' }"
          label="同意用户协议与隐私条款"
          name="agree"
          used-alone
          active-color="#25a57f"
        />
      </view>

      <up-action-sheet
        :show="show"
        title="账号密码登录"
        safe-area-inset-bottom
        :round="10"
        @close="show = false"
      >
        <view class="login_form">
          <view class="login_form_item">
            <label>账号</label>
            <up-input
              v-model="form.account"
              placeholder="请输入账号 / 手机号 / 邮箱"
            />
          </view>
          <view class="login_form_item">
            <label>密码</label>
            <up-input
              v-model="form.password"
              type="password"
              placeholder="请输入密码"
            />
          </view>

          <up-button
            class="login_btn" color="#25a57f"
            :disabled="disabled"
            :style="{
              marginTop: '100rpx',
              width: '100%',
            }"
            text="登录"
            @click="loginByPwd"
          />
        </view>
      </up-action-sheet>

      <up-modal
        :show="showModal" show-cancel-button
        confirm-text="同意" confirm-color="#25a57f"
        @cancel="showModal = false" @confirm="() => {
          checked = true
          showModal = false
          login()
        }"
      >
        同意用户协议
      </up-modal>
    </view>
  </view>
</template>

<style scoped lang="scss">
.login_layout{
  width: 750rpx;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  .content{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 24rpx;

    .btn{
      padding: 0 100rpx;
      background-color: $uni-color-primary;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 10rpx;
      gap: 10rpx;
      color: $uni-color-grey-1;
    }

    .other_login{
      width: 100%;
      color: $uni-color-grey-4;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .checkbox_group{
      width: 100%;
      display: flex;
      align-items: center;
      gap: 16rpx;
      font-size: 14px;
      line-height: 20px;

      :deep(.uni-checkbox-input) {
        width: 18px;
        height: 18px;
        margin: 0;
      }
    }
  }

  .login_form {
    padding: 30rpx 30rpx 60rpx 30rpx;
    display: flex;
    flex-direction: column;
    gap: 20rpx;

    .login_form_item{
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 8rpx;

      label {
        width: 100%;
        text-align: left;
        font-size: 14px;
        color: $uni-color-grey-6;
      }

      input {
        width: 100%;
      }
    }
  }
}
</style>
