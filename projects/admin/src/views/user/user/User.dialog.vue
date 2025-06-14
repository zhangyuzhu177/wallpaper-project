<script setup lang="ts">
import { Notify } from 'quasar'
import { cloneDeep } from 'lodash'
import type { IUpdateUserBodyDto, IUser } from 'types'
import { validateName } from 'shared/utils/validator/name'
import {
  browser,
  objectOmit,
  objectPick,
  validateAccount,
  validateEmail,
  validatePassword,
  validatePhone,
} from 'utils'

interface InitForm extends IUpdateUserBodyDto {
  /** 账号 */
  account: string
  /** 昵称 */
  name: string
}

interface UserDialogProps {
  /**
   * 用户对话框的操作类型
   */
  type?: DialogType
  /**
   * 用户信息
   */
  user?: IUser
  /**
   * 在更新、插入、审核用户认证后的回调
   */
  onCallback?: () => void
}

const props = defineProps<UserDialogProps>()
const emits = defineEmits<{
  /**
   * 更新用户对话框的操作类型
   */
  'update:type': [UserDialogProps['type']]
}>()

/** 对话框 */
const dialog = computed({
  get() {
    const { type, user } = props
    return type === '添加' || (!!type && !!user)
  },
  set() {
    emits('update:type', undefined)
  },
})
/** 是否只读 */
const readonly = computed(() => props.type === '查看')
/** 加载中 */
const loading = ref(false)
/** 个人用户初始化数据 */
const initData: InitForm = {
  account: '',
  name: '',
  status: true,
}
/** 个人用户表单 */
const form = ref(cloneDeep(initData))

watch(
  dialog,
  (newVal) => {
    if (newVal) {
      const { type, user } = props
      if (type === '添加') {
        form.value = cloneDeep(initData)
      }
      else if (user) {
        form.value = {
          ...objectPick(
            user,
            'account', 'name', 'phone', 'email', 'status',
          ),
        }
      }
    }
  },
)

/** 禁用提交 */
const disable = computed(() => {
  const { type } = props
  const {
    account, name, phone, email, password,
  } = form.value
  return !!validateAccount(account)
    || !!validateName(name)
    || (phone && !!validatePhone(phone))
    || (email && !!validateEmail(email))
    || ((type === '添加' || !!password) && !!validatePassword(password))
})

/**
 * 创建/更新个人用户
 */
async function upsertUser() {
  if (disable.value)
    return

  const { type, user, onCallback } = props
  let { password } = form.value
  password = password ? await browser.rsaEncrypt(form.value.password!, RSA_KEY) : undefined

  if (type === '添加') {
    await userCreateApi({
      ...form.value,
      password: password!,
    })
  }
  else if (type === '编辑') {
    await userUpdateApi(
      user!.id,
      {
        ...objectOmit(form.value, 'account'),
        password,
      },
    )
  }

  Notify.create({
    type: 'success',
    message: `${type}成功`,
  })
  onCallback?.()
}
</script>

<template>
  <ZDialog
    v-model="dialog"
    :title="`${type}用户`"
    confirm-text="保存"
    :footer="!readonly"
    :loading scroll
    :disable-confirm="disable"
    :wrapper-style="{
      width: '900px',
      maxWidth: '900px',
      maxHeight: `${type === '查看' ? 688 : 804}px`,
    }"
    @ok="upsertUser"
  >
    <div flex="~ col gap1">
      <ZInput
        v-model="form.account"
        label="账号"
        placeholder="请输入账号"
        explain="注册后账号不可更改"
        required
        :readonly="type === '编辑' || readonly"
        :rules="[
          val => validateAccount(val) || true,
        ]"
      />
      <ZInput
        v-model="form.name"
        label="姓名"
        placeholder="请输入姓名"
        required :readonly
        :rules="[
          val => validateName(val) || true,
        ]"
      />
      <ZInput
        v-model="form.phone"
        label="手机号"
        placeholder="请输入手机号"
        :readonly
        :rules="[
          val => validatePhone(val) || true,
        ]"
      />
      <ZInput
        v-model="form.email"
        label="邮箱"
        placeholder="请输入邮箱"
        :readonly
        :rules="[
          val => validateEmail(val) || true,
        ]"
      />
      <ZInput
        v-model="form.password"
        label="密码"
        placeholder="请输入密码"
        :explain="type === '编辑' ? '输入该字段将修改用户密码，否则用户密码不变' : undefined"
        :required="type === '添加'"
        :rules="[
          val => (type === '添加' || !!val) && (validatePassword(val, form.account) || true) || true,
        ]"
        reactive-rules
        type="password"
      />

      <div flex="~ col gap1">
        <ZLabel
          label="用户状态"
        />
        <div flex="~ gap10" my3>
          <ZRadio
            :model-value="form.status?.toString()"
            label="正常" val="true" :disable="readonly"
            @update:model-value="form.status = true"
          />
          <ZRadio
            :model-value="form.status?.toString()"
            label="禁用" val="false" :disable="readonly"
            @update:model-value="form.status = false"
          />
        </div>
      </div>
    </div>
  </ZDialog>
</template>
