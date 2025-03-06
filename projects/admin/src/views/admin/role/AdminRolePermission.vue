<script lang="ts" setup>
import type { PermissionType } from 'types'
import { arrayDistinct, arrayHasIntersection, arrayIsFullIncludes } from 'utils'

import type { PermissionItem } from '~/constants/admin'

interface AdminRolePermissionProps {
  /**
   * 管理员角色的权限
   */
  modelValue?: PermissionType[]
  /**
   * 是否只读
   */
  readonly?: boolean
}

const props = defineProps<AdminRolePermissionProps>()
defineEmits<{
  /**
   * 更新管理员角色的权限
   */
  'update:modelValue': [AdminRolePermissionProps['modelValue']]
}>()

/** 管理员角色的权限 */
const permission = useVModel(props, 'modelValue')
const { getPermission } = useMenu()

/** 当前选中的权限 */
const selected = ref<Partial<PermissionItem>[]>([{
  children: ADMIN_MENU_LIST,
}])

/**
 * 选中权限
 */
function handleSelect(flag: boolean | null, item: Partial<PermissionItem>) {
  if (flag || flag === null) {
    const arr = getPermission(item)
    permission.value = arrayDistinct([
      ...(permission.value ?? []),
      ...arr,
    ])
  }
  else if (!flag && permission.value) {
    const arr = getPermission(item)
    for (let i = permission.value.length - 1; i >= 0; i--) {
      if (arr.includes(permission.value[i]))
        permission.value.splice(i, 1)
    }
  }
}
</script>

<template>
  <div flex="~ gap2">
    <div
      v-for="(data, index) in selected.filter(v => v.children?.length || v.readonly)"
      :key="data.name"
      flex="~ col gap2"
    >
      <div
        v-for="item in [
          ...(
            data.readonly
              ? [{
                name: `只读访问${data.name}`,
                value: [data.readonly],
              }]
              : []
          ),
          ...(data.children ?? []),
        ]"
        :key="item.name"
        flex="~ items-center justify-between gap5"
        p2 rounded-6px cursor-default
        :text="item.name === selected[index + 1]?.name ? 'primary-1' : 'grey-9'"
        hover:bg-primary-4
        @click="() => {
          selected.splice(index + 1, selected.length - index)
          if (item.children?.length || item.readonly)
            selected.push(item)
        }"
      >
        <div flex="~ items-center gap2">
          <ZCheckbox
            :model-value="
              arrayIsFullIncludes(permission, getPermission(item))
                || (!!item.children?.length && arrayHasIntersection(permission, getPermission(item)) && null)
            "
            :disable="readonly"
            toggle-indeterminate
            @update:model-value="val => handleSelect(val, item)"
          />
          <div
            subtitle-3
            whitespace-nowrap
          >
            {{ item.name }}
            <span
              v-if="item.desc"
              font-400 text-grey-6
              v-text="`（${item.desc}）`"
            />
          </div>
        </div>
        <div
          v-if="item.children?.length || item.readonly"
          i-mingcute:right-line icon
        />
      </div>
    </div>
  </div>
</template>
