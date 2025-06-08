<script setup lang="ts">
import { browser, validatePassword } from 'utils'
import { useToast } from 'wot-design-uni'
import { useUserStore } from '@/store'
import { RSA_KEY } from '@/constants/encrypt'

const userStore = useUserStore()
const toast = useToast()

/** 对话框 */
const popup = ref(false)
/** 密码 */
const password = ref('')
/** 确认密码 */
const passwordConfirm = ref('')

const disabled = computed(() => {
  return !password.value || !passwordConfirm.value
})

function handleClose() {
  popup.value = false
  password.value = ''
  passwordConfirm.value = ''
}

/**
 * 修改密码
 */
async function updatePassword() {
  const verify = validatePassword(password.value)
  if (verify)
    return toast.show(verify)
  if (password.value !== passwordConfirm.value)
    return toast.show('两次密码不一致')
  userStore.updateOwnUser({
    password: await browser.rsaEncrypt(password.value, RSA_KEY),
  })
}

/**
 * 注销账号
 */
function handleStatus() {
  uni.showModal({
    title: '提示',
    content: '注销后您将无法登录，是否继续？',
    success: (res) => {
      if (res.confirm) {
        userStore.updateOwnUser({
          name: '用户已注销',
          status: false,
          avatar: '',
        })
      }
    },
  })
}
</script>

<template>
  <view class="p4 flex flex-col gap4">
    <view class="flex flex-col b-rd-2 bg-grey-1">
      <view class="p4 flex items-center gap4">
        <view class="i-mingcute:lock-fill icon" />
        <view class="flex-1 flex items-center justify-between" @click="popup = true">
          <view>修改密码</view>
          <view class="i-mingcute:right-line icon" />
        </view>
      </view>
    </view>

    <view class="b-rd-2 bg-grey-1 p4 flex items-center gap4">
      <wd-img src="/static/icons/warning.svg" width="20px" height="20px" />
      <view class="flex-1 flex items-center justify-between" @click="handleStatus">
        <view class="text-[#FF3B30]">
          注销账号
        </view>
        <view class="i-mingcute:right-line icon" />
      </view>
    </view>

    <wd-popup
      v-model="popup"
      close-on-click-modal
      custom-class="z-popup"
      @close="handleClose"
    >
      <view class="flex flex-col gap-4 p4 b-rd-2">
        <!-- 标题 -->
        <view class="flex items-center gap-2 justify-between">
          <view class="subtitle-1">
            修改密码
          </view>
          <view class="i-mingcute:close-line icon" @click="handleClose" />
        </view>
        <view class="flex flex-col gap-6">
          <!-- 内容 -->
          <view>
            <wd-cell-group border>
              <wd-input
                v-model="password"
                label="新密码"
                label-width="60px"
                show-password
                clearable
                placeholder="请输入密码"
              />
              <wd-input
                v-model="passwordConfirm"
                label="确认密码"
                label-width="60px"
                show-password
                clearable
                placeholder="请输入密码"
              />
            </wd-cell-group>
          </view>
          <!-- 提交 -->
          <wd-button :disabled="disabled" @click="updatePassword">
            提交
          </wd-button>
        </view>
      </view>
    </wd-popup>

    <wd-toast />
  </view>
</template>

<style lang="scss">
:deep() {
  .z-popup {
    border-radius: 8px;
    width: 90%;
  }
}
</style>
