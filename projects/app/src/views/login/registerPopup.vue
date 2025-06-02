<script setup lang="ts">
import { cloneDeep } from 'lodash'
import type { ICreateUserBodyDto } from 'types'
import { browser, randomString, validateAccount, validatePassword } from 'utils'
import type { FormRules } from 'wot-design-uni/components/wd-form/types'
import { registerApi } from '@/api/login'
import { RSA_KEY } from '@/constants/encrypt'
import { toast } from '@/utils/toast'

interface RegisterForm extends ICreateUserBodyDto {
  passwordConfirm: string
}

interface RegisterPopupProps {
  modelValue: boolean
}

const props = defineProps<RegisterPopupProps>()
const emits = defineEmits<{
  'update:modelValue': [RegisterPopupProps['modelValue']]
}>()

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
const form = ref()
const model = ref<RegisterForm>(cloneDeep(initData))

const disabled = computed(() => {
  const { account, password, passwordConfirm } = model.value
  return !account || !password || !passwordConfirm
})

/**
 * 表单校验
 */
const rules: FormRules = {
  account: [
    {
      required: true,
      message: '请输入账号',
      validator: (val) => {
        const validate = validateAccount(val)
        if (validate)
          return Promise.reject(validate)
        return Promise.resolve()
      },
    },
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      validator: (val) => {
        const { password, passwordConfirm } = model.value
        const validate = validatePassword(val)
        if (validate)
          return Promise.reject(new Error(validate))
        else if (password && passwordConfirm && password !== passwordConfirm)
          return Promise.reject(new Error('两次密码不一致'))
        else return Promise.resolve()
      },
    },
  ],
  passwordConfirm: [
    {
      required: true,
      message: '请输入密码',
      validator: (val) => {
        const { password, passwordConfirm } = model.value
        const validate = validatePassword(val)
        if (validate)
          return Promise.reject(new Error(validate))
        else if (password && passwordConfirm && password !== passwordConfirm)
          return Promise.reject(new Error('两次密码不一致'))
        else return Promise.resolve()
      },
    },
  ],
}

/**
  * 关闭回调
  */
function handleClose() {
  model.value = cloneDeep(initData)
}

/**
 * 提交表单
 */
function handleSubmit() {
  form.value
    .validate()
    .then(({ valid }) => {
      if (valid)
        register()
    })
}

/**
 * 注册
 */
async function register() {
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
  <wd-popup v-model="dialog" position="bottom" closable :safe-area-inset-bottom="true" custom-style="height: 400px;" @close="handleClose">
    <view class="px-4 py-2 text-[20px]" v-text="'注册账号'" />
    <wd-form ref="form" class="flex flex-col gap8 pt-4" :model="model" :rules="rules">
      <wd-cell-group border>
        <wd-input
          v-model="model.account"
          label="账号"
          label-width="100px"
          clearable
          prop="account"
          placeholder="请输入账号"
        />
        <wd-input
          v-model="model.password"
          label="密码"
          label-width="100px"
          show-password
          clearable
          prop="password"
          placeholder="请输入密码"
        />
        <wd-input
          v-model="model.passwordConfirm"
          label="确认密码"
          label-width="100px"
          show-password
          clearable
          prop="passwordConfirm"
          placeholder="请输入密码"
        />
      </wd-cell-group>
      <view class="footer px-6">
        <wd-button :loading="loading" :disabled="disabled" type="primary" size="large" block @click="handleSubmit">
          立即注册
        </wd-button>
      </view>
    </wd-form>
  </wd-popup>
</template>
