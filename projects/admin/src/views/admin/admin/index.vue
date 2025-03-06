<script setup lang="ts">
import moment from 'moment'
import { Like } from 'typeorm'
import { Notify } from 'quasar'
import { PermissionType } from 'types'
import type { QTableColumn, QTableProps } from 'quasar'
import ZTable from 'shared/components/table/ZTable.vue'
import type { IAdmin, IAdminRole, IQueryDto } from 'types'

import AdminRoleDialog from '../role/AdminRole.dialog.vue'

import AdminDialog from './Admin.dialog.vue'

const zTable = ref<InstanceType<typeof ZTable>>()

const { hasPermission } = useAdmin()

/** 是否可创建 */
const isCreate = hasPermission(PermissionType.ADMIN_CREATE)
/** 是否可更新 */
const isUpdate = hasPermission(PermissionType.ADMIN_UPDATE)
/** 是否可删除 */
const isDelete = hasPermission(PermissionType.ADMIN_DELETE)
/** 是否可修改账号状态 */
const isChangeStatus = hasPermission(PermissionType.ADMIN_CHANGE_STATUS)
/** 是否可分配管理员角色 */
const isAssignRole = hasPermission(PermissionType.ADMIN_ASSIGN_ROLE)

/** 加载中 */
const loading = ref(false)

/** 管理员角色列表 */
const adminRoles = ref<IAdminRole[]>()

/** 管理员对话框类型 */
const dialogType = ref<DialogType>()
/** 管理员 */
const admin = ref<IAdmin>()
/** 管理员角色 */
const adminRole = ref<IAdminRole>()

/** 修改状态对话框 */
const changeDialog = ref(false)
/** 管理员账号状态 */
const adminStatus = ref(true)

/** 分配角色对话框 */
const assignDialog = ref(false)
/** 管理员角色 id */
const adminRoleId = ref<string>()
/** 过滤管理员角色筛选文本 */
const filterRole = ref('')

/** 删除管理员对话框 */
const deleteDialog = ref(false)

/** 表格行 */
const rows = ref<IAdmin[]>()
/** 表格列 */
const cols: QTableColumn<IAdmin>[] = [
  {
    name: 'name',
    label: '姓名',
    field: 'name',
    sortable: true,
  },
  {
    name: 'phone',
    label: '手机号',
    field: 'phone',
    sortable: true,
  },
  {
    name: 'email',
    label: '邮箱',
    field: 'email',
    sortable: true,
  },
  {
    name: 'adminRole',
    label: '管理员角色',
    field: row => row.adminRole?.name,
    sortable: true,
  },
  {
    name: 'createdAt',
    label: '注册时间',
    field: row => moment(row.createdAt).format('YYYY-MM-DD HH:mm'),
    sortable: true,
  },
  {
    name: 'updatedAt',
    label: '更新时间',
    field: row => moment(row.updatedAt).format('YYYY-MM-DD HH:mm'),
    sortable: true,
  },
  {
    name: 'status',
    label: '状态',
    field: row => row.status ? '正常' : '禁用',
    sortable: true,
  },
]
/** 表格分页信息 */
const pagination = TABLE_PAGINATION('createdAt', true)
/** 当前选中的管理员（多选） */
const selected = ref<IAdmin[]>()
/** 表格筛选文本 */
const filterText = ref()

onBeforeMount(async () => {
  adminRoles.value = (await adminRoleQueryApi({
    pagination: {
      pageSize: 'all',
    },
  })).data
})

/**
 * 查询管理员
 */
const queryAdmin: QTableProps['onRequest'] = async (props) => {
  const { filter } = props
  const { page, rowsPerPage, sortBy, descending } = props.pagination
  loading.value = true

  try {
    const body: IQueryDto<IAdmin> = {
      pagination: {
        page,
        pageSize: rowsPerPage,
      },
      relations: {
        adminRole: {
          permissions: true,
        },
      },
    }

    if (filter) {
      const where = Like(`%${filter}%`)
      body.where = { name: where }
    }
    if (sortBy) {
      const sort = descending ? 'desc' : 'asc'
      if (sortBy === 'adminRole')
        body.order = { adminRole: { name: sort } }
      else
        body.order = { [sortBy]: sort }
    }

    const { total, data } = await adminQueryApi(body)
    pagination.value.rowsNumber = total
    rows.value = data
  }
  catch (_) {
    rows.value = undefined
  }
  finally {
    pagination.value = {
      ...props.pagination,
      rowsNumber: pagination.value.rowsNumber,
    }
    selected.value = undefined
    loading.value = false
  }
}

/**
 * 回调函数，重新查询管理员
 */
function callback() {
  zTable.value?.tableRef?.requestServerInteraction()
}

/**
 * 修改管理员账号状态
 */
async function changeAdminStatus() {
  if (!selected.value?.length)
    return

  loading.value = true
  let res
  try {
    res = await adminChangeStatusApi({
      ids: selected.value.map(v => v.id),
      status: adminStatus.value,
    })
    Notify.create({
      type: 'success',
      message: '修改成功',
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
 * 分配管理员角色
 */
async function assignAdminRole() {
  if (!selected.value?.length)
    return

  loading.value = true
  let res
  try {
    res = await adminAssignRoleApi({
      ids: selected.value.map(v => v.id),
      adminRoleId: adminRoleId.value,
    })
    Notify.create({
      type: 'success',
      message: '分配成功',
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
 * 删除管理员
 */
async function deleteAdmin() {
  if (!selected.value?.length)
    return

  loading.value = true
  let res
  try {
    res = await adminDeleteApi(selected.value.map(v => v.id))
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
          label="添加管理员"
          icon="plus"
          @click="dialogType = '添加'"
        />
        <template v-if="isDelete && isChangeStatus && isAssignRole">
          <ZBtn
            v-if="isChangeStatus"
            label="修改状态"
            type="secondary"
            :disable="!selected?.length"
            icon="edit"
            @click="() => {
              adminStatus = true
              changeDialog = true
            }"
          />
          <ZBtn
            v-if="isAssignRole"
            label="分配角色"
            type="secondary"
            icon="assign"
            :disable="!selected?.length"
            @click="() => {
              adminRoleId = undefined
              assignDialog = true
            }"
          />
          <ZBtn
            v-if="isDelete"
            label="删除管理员"
            type="secondary"
            icon="delete"
            :disable="!selected?.length"
            @click="deleteDialog = true"
          />
        </template>
      </div>

      <div flex-action>
        <ZInput
          v-model="filterText"
          placeholder="搜索管理员姓名"
          debounce="500"
          size="small"
        >
          <template #prepend>
            <div icon i-mingcute:search-line />
          </template>
        </ZInput>
      </div>
    </div>

    <!-- 管理员表格 -->
    <ZTable
      ref="zTable"
      v-model:pagination="pagination"
      v-model:selected="selected"
      :rows :cols :filter="filterText"
      selection="multiple"
      no-data-label="暂无管理员"
      flex-1 h0
      fixed-first-col
      action
      @request="queryAdmin"
    >
      <!-- 微信 -->
      <template #body-cell-weixinId="{ value }">
        <q-td text-center>
          <ZStatus
            :model-value="value"
            true-label="已绑定"
            false-label="未绑定"
          />
        </q-td>
      </template>

      <!-- 管理员角色 -->
      <template #body-cell-adminRole="{ row, value }">
        <q-td text-center max-w="none!" class="group">
          <div v-if="!value" text-center v-text="'-'" />
          <div v-else px20 text-center>
            {{ value }}
            <div
              flex="~ items-center gap2"
              text="grey-6 hover:primary-1"
              absolute-y-center right-4
              cursor-pointer select-none
              invisible group-hover:visible
              @click="adminRole = row.adminRole"
            >
              <div size-4 i-mingcute:fullscreen-2-line />
              详情
            </div>
          </div>
        </q-td>
      </template>

      <!-- 账号状态 -->
      <template #body-cell-status="{ value }">
        <q-td text-center>
          <ZStatus :model-value="value" />
        </q-td>
      </template>

      <!-- 操作 -->
      <template #body-cell-action="{ row }">
        <q-td auto-width>
          <div flex="~ items-center gap2">
            <ZTextBtn
              label="查看"
              weight="400"
              @click="() => {
                dialogType = '查看'
                admin = row
              }"
            />
            <template v-if="isUpdate">
              <div h3 w1px bg-grey-3 />
              <ZTextBtn
                label="编辑"
                weight="400"
                @click="() => {
                  dialogType = '编辑'
                  admin = row
                }"
              />
            </template>
          </div>
        </q-td>
      </template>
    </ZTable>

    <!-- 修改管理员账号状态 -->
    <ZDialog
      v-model="changeDialog"
      title="修改状态"
      footer
      @ok="changeAdminStatus"
    >
      <div flex="~ gap10">
        <ZRadio
          :model-value="adminStatus.toString()"
          label="正常" val="true"
          @update:model-value="adminStatus = true"
        />
        <ZRadio
          :model-value="adminStatus.toString()"
          label="禁用" val="false"
          @update:model-value="adminStatus = false"
        />
      </div>
    </ZDialog>

    <!-- 分配管理员角色 -->
    <ZDialog
      v-model="assignDialog"
      title="分配角色"
      footer
      @ok="assignAdminRole"
    >
      <ZSelect
        v-model="adminRoleId"
        v-model:filter-text="filterRole"
        :options="adminRoles?.filter(v => (
          !filterRole
          || v.name.toLowerCase().includes(filterRole.toLowerCase())
        ))"
        placeholder="请选择管理员角色"
        option-label="name"
        option-value="id"
        is-filter clearable
      />
    </ZDialog>

    <!-- 删除管理员 -->
    <ZDialog
      v-model="deleteDialog"
      title="删除管理员"
      footer
      @ok="deleteAdmin"
    >
      此操作将删除已选的管理员，是否继续？
    </ZDialog>

    <!-- 更新插入管理员 -->
    <AdminDialog
      v-model:type="dialogType"
      :admin :admin-roles
      @callback="callback"
    />

    <!-- 管理员角色 -->
    <AdminRoleDialog
      type="查看"
      :admin-role
      @update:type="adminRole = undefined"
    />
  </div>
</template>
