<script lang="ts" setup>
import { Notify } from 'quasar'
import { objectPick } from 'utils'
import type { IAdminRole, IUpsertAdminRoleBodyDto } from 'types'
import { validateRoleDesc, validateRoleName } from 'shared/utils/validator/role'

import AdminRolePermission from './AdminRolePermission.vue'

interface AdminRoleDialogProps {
  /**
   * 管理员角色对话框的操作类型
   */
  type?: DialogType
  /**
   * 管理员角色信息
   */
  adminRole?: IAdminRole
  /**
   * 在更新插入管理员角色后的回调
   */
  onCallback?: () => void
}

const props = defineProps<AdminRoleDialogProps>()
const emits = defineEmits<{
  /**
   * 更新管理员角色对话框的操作类型
   */
  'update:type': [AdminRoleDialogProps['type']]
}>()

/** 对话框 */
const dialog = computed({
  get() {
    const { type, adminRole } = props
    return type === '添加' || (!!type && !!adminRole)
  },
  set() {
    emits('update:type', undefined)
  },
})
/** 是否只读 */
const readonly = computed(() => props.type === '查看')
/** 管理员角色表单 */
const form = ref<IUpsertAdminRoleBodyDto>({
  name: '',
})

watch(
  dialog,
  (newVal) => {
    if (newVal) {
      const { type, adminRole } = props
      if (type === '添加') {
        form.value = {
          name: '',
        }
      }
      else if (adminRole) {
        form.value = {
          ...objectPick(adminRole, 'name', 'desc'),
          permissions: adminRole.permissions?.map(v => v.name),
        }
      }
    }
  },
)

/** 禁用提交 */
const disable = computed(() => {
  const { name, desc } = form.value
  return !!validateRoleName(name)
    || !!validateRoleDesc(desc)
})

/**
 * 创建/更新管理员角色
 */
async function upsertAdminRole() {
  if (disable.value)
    return

  const { type, adminRole, onCallback } = props

  if (type === '添加')
    await adminRoleCreateApi(form.value)
  else if (type === '编辑')
    await adminRoleUpdateApi(adminRole!.id, form.value)

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
    :title="`${type}角色`"
    confirm-text="保存"
    :footer="!readonly" scroll
    :disable-confirm="disable"
    :wrapper-style="{
      width: '900px',
      maxWidth: '900px',
      maxHeight: `${type === '查看' ? 1000 : 1108}px`,
    }"
    @ok="upsertAdminRole"
  >
    <div flex="~ col gap1">
      <ZInput
        v-model="form.name"
        label="角色名称"
        placeholder="请输入角色名称（50 字以内）"
        required :readonly
        :rules="[
          val => validateRoleName(val) || true,
        ]"
      />
      <ZInput
        v-model="form.desc"
        label="描述"
        placeholder="请输入描述信息（200 字以内）"
        type="textarea" :readonly
        :rules="[
          val => validateRoleDesc(val) || true,
        ]"
      />
      <div flex="~ col gap1">
        <ZLabel label="权限" />
        <div p2 rounded-2 bg-grey-2 overflow-x-auto>
          <AdminRolePermission
            v-model="form.permissions"
            :readonly
          />
        </div>
      </div>
    </div>
  </ZDialog>
</template>
