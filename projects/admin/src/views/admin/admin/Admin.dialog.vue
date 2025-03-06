<script lang="ts" setup>
import { cloneDeep } from 'lodash'
import { Notify } from 'quasar'
import { validateName } from 'shared/utils/validator/name'
import type { IAdmin, IAdminRole, IUpdateAdminBodyDto } from 'types'
import {
  browser,
  objectPick,
  validateEmail,
  validatePassword,
  validatePhone,
} from 'utils'

interface AdminDialogProps {
  /**
   * 管理员对话框的操作类型
   */
  type?: DialogType
  /**
   * 管理员信息
   */
  admin?: IAdmin
  /**
   * 管理员角色列表
   */
  adminRoles?: IAdminRole[]
  /**
   * 在更新插入管理员后的回调
   */
  onCallback?: () => void
}

const props = defineProps<AdminDialogProps>()
const emits = defineEmits<{
  /**
   * 更新管理员对话框的操作类型
   */
  'update:type': [AdminDialogProps['type']]
}>()

/** 对话框 */
const dialog = computed({
  get() {
    const { type, admin } = props
    return type === '添加' || (!!type && !!admin)
  },
  set() {
    emits('update:type', undefined)
  },
})
/** 是否只读 */
const readonly = computed(() => props.type === '查看')
/** 管理员初始化数据 */
const initData: IUpdateAdminBodyDto = {
  name: '',
  phone: '',
  email: '',
  status: true,
}
/** 管理员表单 */
const form = ref(cloneDeep(initData))

/** 过滤管理员角色筛选文本 */
const filterRole = ref('')

watch(
  dialog,
  (newVal) => {
    if (newVal) {
      const { type, admin } = props
      if (type === '添加')
        form.value = cloneDeep(initData)
      else if (admin)
        form.value = objectPick(admin, 'name', 'phone', 'email', 'adminRoleId', 'status')
    }
  },
)

/** 禁用提交 */
const disable = computed(() => {
  const { type } = props
  const { name, phone, email, password } = form.value
  return !!validateName(name)
    || !!validatePhone(phone)
    || !!validateEmail(email)
    || ((type === '添加' || !!password) && !!validatePassword(password, name))
})

/**
 * 创建/更新管理员
 */
async function upsertAdmin() {
  if (disable.value)
    return

  const { type, admin, onCallback } = props
  let { password } = form.value
  password = password ? await browser.rsaEncrypt(form.value.password!, RSA_KEY) : undefined

  if (type === '添加') {
    await adminCreateApi({
      ...form.value,
      password: password!,
    })
  }
  else if (type === '编辑') {
    await adminUpdateApi(
      admin!.id,
      {
        ...form.value,
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
    :title="`${type}管理员`"
    confirm-text="保存"
    :footer="!readonly" scroll
    :disable-confirm="disable"
    :wrapper-style="{
      width: '900px',
      maxWidth: '900px',
      maxHeight: `${type === '查看' ? 668 : 804}px`,
    }"
    @ok="upsertAdmin"
  >
    <div flex="~ col gap1">
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
        required :readonly
        :rules="[
          val => validatePhone(val) || true,
        ]"
      />
      <ZInput
        v-model="form.email"
        label="邮箱"
        placeholder="请输入邮箱"
        required :readonly
        :rules="[
          val => validateEmail(val) || true,
        ]"
      />
      <ZInput
        v-model="form.password"
        label="密码"
        placeholder="请输入密码"
        :explain="type === '编辑' ? '输入该字段将修改管理员密码，否则管理员密码不变' : undefined"
        :required="type === '添加'"
        :rules="[
          val => (type === '添加' || !!val) && (validatePassword(val, form.name) || true) || true,
        ]"
        reactive-rules
        type="password"
      />
      <ZSelect
        v-model="form.adminRoleId"
        v-model:filter-text="filterRole"
        label="管理员角色"
        placeholder="请选择管理员角色"
        :options="adminRoles?.filter(v => (
          !filterRole
          || v.name.toLowerCase().includes(filterRole.toLowerCase())
        ))"
        option-label="name"
        option-value="id"
        is-filter
        :readonly clearable mb5
      />
      <div flex="~ col gap1">
        <ZLabel
          label="账号状态"
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
