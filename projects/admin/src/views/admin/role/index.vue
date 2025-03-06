<script lang="ts" setup>
import { Like } from 'typeorm'
import { Notify } from 'quasar'
import { PermissionType } from 'types'
import type { IAdminRole, IQueryDto } from 'types'
import type { QTableColumn, QTableProps } from 'quasar'
import ZTable from 'shared/components/table/ZTable.vue'

import AdminRoleDialog from './AdminRole.dialog.vue'

const zTable = ref<InstanceType<typeof ZTable>>()

const { getMenu } = useMenu()
const { hasPermission } = useAdmin()

/** 是否可创建 */
const isCreate = hasPermission(PermissionType.ADMIN_ROLE_CREATE)
/** 是否可更新 */
const isUpdate = hasPermission(PermissionType.ADMIN_ROLE_UPDATE)
/** 是否可删除 */
const isDelete = hasPermission(PermissionType.ADMIN_ROLE_DELETE)

/** 加载中 */
const loading = ref(false)

/** 管理员角色对话框类型 */
const dialogType = ref<DialogType>()
/** 管理员角色 */
const adminRole = ref<IAdminRole>()

/** 复制管理员角色对话框 */
const copyDialog = ref(false)

/** 删除管理员角色对话框 */
const deleteDialog = ref(false)

/** 表格行 */
const rows = ref<IAdminRole[]>()
/** 表格列 */
const cols: QTableColumn<IAdminRole>[] = [
  {
    name: 'name',
    label: '角色名称',
    field: 'name',
  },
  {
    name: 'desc',
    label: '描述',
    field: 'desc',
  },
  {
    name: 'permission',
    label: '管理权限',
    field: (row) => {
      return getMenu(row.permissions?.map(v => v.name))
        .map(v => v.name)
        .join('、') || undefined
    },
  },
]
/** 表格分页信息 */
const pagination = TABLE_PAGINATION()
/** 表格筛选文本 */
const filterText = ref()
/** 当前选中的管理员角色（多选） */
const selected = ref<IAdminRole[]>()

/**
 * 查询管理员角色
 */
const queryAdminRole: QTableProps['onRequest'] = async (props) => {
  const { filter } = props
  const { page, rowsPerPage } = props.pagination
  loading.value = true

  try {
    const body: IQueryDto<IAdminRole> = {
      pagination: {
        page,
        pageSize: rowsPerPage,
      },
      relations: {
        permissions: true,
      },
    }
    if (filter)
      body.where = { name: Like(`%${filter}%`) }
    const { total, data } = await adminRoleQueryApi(body)
    pagination.value.rowsNumber = total
    rows.value = data
  }
  catch (_) {
    rows.value = undefined
  }
  finally {
    pagination.value.page = page
    pagination.value.rowsPerPage = rowsPerPage
    selected.value = undefined
    loading.value = false
  }
}

/**
 * 回调函数，重新查询管理员角色
 */
function callback() {
  zTable.value?.tableRef?.requestServerInteraction()
}

/**
 * 复制管理员角色
 */
async function copyAdminRole() {
  if (!selected.value?.length)
    return

  loading.value = true
  let res
  try {
    res = await adminRoleCopyApi(selected.value.map(v => v.id))
    Notify.create({
      type: 'success',
      message: '复制成功',
    })
  }
  finally {
    if (res) {
      callback()
    }
    else {
      selected.value = undefined
      loading.value = false
    }
  }
}

/**
 * 删除管理员角色
 */
async function deleteAdminRole() {
  if (!selected.value?.length)
    return

  loading.value = true
  let res
  try {
    res = await adminRoleDeleteApi(selected.value.map(v => v.id))
    Notify.create({
      type: 'success',
      message: '删除成功',
    })
  }
  finally {
    if (res) {
      callback()
    }
    else {
      selected.value = undefined
      loading.value = false
    }
  }
}
</script>

<template>
  <div full flex="~ col gap4" relative>
    <ZLoading :model-value="loading" />

    <!-- 操作栏 -->
    <div flex="action justify-between">
      <div flex-action>
        <ZBtn
          v-if="isCreate"
          label="添加角色"
          icon="plus"
          @click="dialogType = '添加'"
        />
        <ZBtn
          v-if="isDelete"
          label="删除角色"
          icon="delete"
          type="secondary"
          :disable="!selected?.length"
          @click="deleteDialog = true"
        />
      </div>

      <div flex-action>
        <ZInput
          v-model="filterText"
          placeholder="搜索管理员角色"
          debounce="500"
          size="small"
        >
          <template #prepend>
            <div icon i-mingcute:search-line />
          </template>
        </ZInput>
      </div>
    </div>

    <!-- 管理员角色表格 -->
    <ZTable
      ref="zTable"
      v-model:pagination="pagination"
      v-model:selected="selected"
      :rows :cols :filter="filterText"
      selection="multiple"
      no-data-label="暂无管理员角色"
      flex-1 h0
      fixed-first-col
      action
      @request="queryAdminRole"
    >
      <template #body-cell-action="{ row }">
        <q-td auto-width>
          <div flex="~ items-center gap2">
            <ZTextBtn
              label="查看"
              weight="400"
              @click="() => {
                dialogType = '查看'
                adminRole = row
              }"
            />
            <template v-if="isUpdate">
              <div h3 w1px bg-grey-3 />
              <ZTextBtn
                label="编辑"
                weight="400"
                @click="() => {
                  dialogType = '编辑'
                  adminRole = row
                }"
              />
            </template>
          </div>
        </q-td>
      </template>
    </ZTable>

    <!-- 复制管理员角色 -->
    <ZDialog
      v-model="copyDialog"
      title="复制角色"
      footer
      @ok="copyAdminRole"
    >
      此操作将复制已选的管理员角色，是否继续？
    </ZDialog>

    <!-- 删除管理员角色 -->
    <ZDialog
      v-model="deleteDialog"
      title="删除角色"
      footer
      @ok="deleteAdminRole"
    >
      此操作将删除已选的管理员角色，是否继续？
    </ZDialog>

    <!-- 更新插入管理员角色 -->
    <AdminRoleDialog
      v-model:type="dialogType"
      :admin-role
      @callback="callback"
    />
  </div>
</template>
