<script setup lang="ts">
import { cloneDeep } from 'lodash'
import type { ICreateUserBodyDto } from 'types'
import { browser, randomString, validateAccount, validatePassword } from 'utils'
import { useToast } from 'wot-design-uni'
import { registerApi } from '@/api/login'
import { RSA_KEY } from '@/constants/encrypt'

const props = defineProps<RegisterPopupProps>()

const emits = defineEmits<{
  'update:modelValue': [RegisterPopupProps['modelValue']]
}>()

const toast = useToast()

interface RegisterForm extends ICreateUserBodyDto {
  passwordConfirm: string
}

interface RegisterPopupProps {
  modelValue: boolean
}

const dialog = computed({
  get() {
    return props.modelValue
  },
  set() {
    emits('update:modelValue', !props.modelValue)
  },
})

const initData: RegisterForm = {
  name: randomString(6, 8, ''),
  account: '',
  password: '',
  passwordConfirm: '',
}

const loading = ref(false)
const model = ref<RegisterForm>(cloneDeep(initData))

const disabled = computed(() => {
  const { account, password, passwordConfirm } = model.value
  return !account || !password || !passwordConfirm
})

/**
  * 关闭回调
  */
function handleClose() {
  dialog.value = false
  model.value = cloneDeep(initData)
}

/**
 * 注册
 */
async function register() {
  const verifyAccount = validateAccount(model.value.account)
  if (verifyAccount)
    return toast.show(verifyAccount)
  const verifyPassword = validatePassword(model.value.password)
  if (verifyPassword)
    return toast.show(verifyPassword)
  if (model.value.password !== model.value.passwordConfirm)
    return toast.show('两次密码不一致')

  loading.value = true
  try {
    await registerApi({
      account: model.value.account,
      name: model.value.name,
      password: await browser.rsaEncrypt(model.value.password, RSA_KEY),
    })
    toast.success('注册成功')
    dialog.value = false
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <wd-popup
    v-model="dialog"
    close-on-click-modal
    custom-class="z-popup"
    @close="handleClose"
  >
    <view class="flex flex-col gap-4 p4 b-rd-2">
      <view class="flex items-center gap-2 justify-between">
        <view class="subtitle-1" v-text="'注册账号'" />
        <view class="i-mingcute:close-line icon" @click="handleClose" />
      </view>
      <view class="flex flex-col gap6">
        <wd-cell-group border>
          <wd-input
            v-model="model.account"
            label="账号"
            label-width="60px"
            clearable
            prop="account"
            placeholder="请输入账号"
          />
          <wd-input
            v-model="model.password"
            label="密码"
            label-width="60px"
            show-password
            clearable
            prop="password"
            placeholder="请输入密码"
          />
          <wd-input
            v-model="model.passwordConfirm"
            label="确认密码"
            label-width="60px"
            show-password
            clearable
            prop="passwordConfirm"
            placeholder="请输入密码"
          />
        </wd-cell-group>
        <wd-button
          :loading="loading"
          :disabled="disabled"
          type="primary"
          size="large"
          block
          :round="false"
          @click="register"
        >
          立即注册
        </wd-button>
      </view>
    </view>
  </wd-popup>
  <wd-toast />
</template>

<style lang="scss">
:deep() {
  .z-popup {
    border-radius: 8px;
    width: 90%;
  }
}
</style>
