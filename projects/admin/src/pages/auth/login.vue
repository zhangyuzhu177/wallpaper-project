<script setup lang="ts">
import { browser, validatePassword } from 'utils'
import ZCaptchaInput from 'shared/components/input/ZCaptchaInput.vue'

const $router = useRouter()
const { width } = useWindowSize()
const { loading, loginByPassword } = useAdmin()

/** 输入框的尺寸 */
const size = computed(() => width.value < 600 ? 'small' : 'big')

/** 登录表单 */
const form = reactive({
  /** 账号 */
  account: '',
  /** 密码 */
  password: '',
  /** 记住账号密码 */
  remember: false,
})
/** 验证码 */
const code = ref('')
/** 邮箱验证校验码 */
const bizId = ref('')

/** 验证码输入框 */
const captchaInput = ref<InstanceType<typeof ZCaptchaInput>>()

/** 禁用登录 */
const disable = computed(() => {
  const { account, password } = form
  return !account || !(code.value.length === 6) || !!validatePassword(password)
})

onBeforeMount(() => {
  // 自动填入记住的账号密码
  try {
    const { account, password } = JSON.parse(browser.aesDecrypt(
      localStorage.getItem(ADMIN_REMEMBER_LOGIN_INFO_KEY) || '',
      AES_KEY,
    ))
    form.account = account
    form.password = password
    if (account && password)
      form.remember = true
  }
  catch (_) {}
})

/**
 * 登录
 */
async function login() {
  try {
    await loginByPassword(
      form,
      {
        code: code.value,
        bizId: bizId.value,
      },
    )
  }
  catch (_) {
    code.value = ''
    captchaInput.value?.getCaptchaImg()
  }
}
</script>

<template>
  <div flex="~ col gap10">
    <h2 text-center>
      登录
    </h2>

    <div flex="~ col gap10">
      <div flex="~ col" gap="0 sm:1">
        <ZInput
          v-model="form.account"
          label="姓名/邮箱/手机号"
          placeholder="请输入管理员账号"
          required :size
          :rules="[
            val => !!val || '请输入管理员账号',
          ]"
        />
        <ZInput
          v-model="form.password"
          type="password"
          label="密码"
          placeholder="请输入管理员密码"
          required :size
          :rules="[
            val => validatePassword(val) || true,
          ]"
          @keydown.enter="() => {
          }"
        />
        <ZCaptchaInput
          ref="captchaInput"
          v-model="code"
          v-model:biz-id="bizId"
          @keydown.enter="login"
        />
        <div flex="~ items-center justify-between">
          <ZCheckbox
            v-model="form.remember"
            label="记住账号密码"
          />
        </div>
      </div>

      <ZBtn
        label="登录" size="big"
        :disable
        @click="login"
      />
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: auth
</route>
