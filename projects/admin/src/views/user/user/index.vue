<script setup lang="ts">
import moment from 'moment'
import { Like } from 'typeorm'
import { Notify } from 'quasar'
import { PermissionType } from 'types'
import type { IQueryDto, IUser } from 'types'
import type { QTableColumn, QTableProps } from 'quasar'
import ZTable from 'shared/components/table/ZTable.vue'

import UserDialog from './User.dialog.vue'
import DownloadConfigDialog from './DownloadConfig.dialog.vue'
import type { DownloadConfigDialogType } from './DownloadConfig.dialog.vue'

const zTable = ref<InstanceType<typeof ZTable>>()

const { hasPermission } = useAdmin()

/** 是否可创建 */
const isCreate = hasPermission(PermissionType.USER_CREATE)
/** 是否可更新 */
const isUpdate = hasPermission(PermissionType.USER_UPDATE)
/** 是否可修改用户状态 */
const isChangeStatus = hasPermission(PermissionType.USER_CHANGE_STATUS)
/** 是否可修改用户下载次数配置 */
const isChangeDownloadConfig = hasPermission(PermissionType.USER_CHANGE_DOWNLOAD_LIMIT)

/** 加载中 */
const loading = ref(false)

/** 个人用户对话框类型 */
const dialogType = ref<DialogType>()
/** 个人用户 */
const user = ref<IUser>()

/** 修改状态对话框 */
const changeDialog = ref(false)
/** 个人用户账号状态 */
const userStatus = ref(true)

/** 试用配置对话框类型 */
const downloadDialog = ref<DownloadConfigDialogType>()

/** 表格行 */
const rows = ref<IUser[]>()
/** 表格列 */
const cols: QTableColumn<IUser>[] = [
  {
    name: 'account',
    label: '账号',
    field: 'account',
    sortable: true,
  },
  {
    name: 'name',
    label: '账号',
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
/** 表格筛选文本 */
const filterText = ref()
/** 当前选中的个人用户（多选） */
const selected = ref<IUser[]>()

/**
 * 查询个人用户
 */
const queryUser: QTableProps['onRequest'] = async (props) => {
  const { filter } = props
  const { page, rowsPerPage, sortBy, descending } = props.pagination
  loading.value = true

  try {
    const body: IQueryDto<IUser> = {
      pagination: {
        page,
        pageSize: rowsPerPage,
      },
    }
    if (filter)
      body.where = { account: Like(`%${filter}%`) }

    if (sortBy) {
      const sort = descending ? 'desc' : 'asc'
      body.order = { [sortBy]: sort }
    }
    const { total, data } = await userQueryApi(body)
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
 * 回调函数，重新查询个人用户
 */
function callback() {
  zTable.value?.tableRef?.requestServerInteraction()
}

/**
 * 修改个人用户状态
 */
async function changeUserStatus() {
  if (!selected.value?.length)
    return

  loading.value = true
  let res
  try {
    res = await userChangeStatusApi({
      ids: selected.value.map(v => v.id),
      status: userStatus.value,
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
</script>

<template>
  <div full flex="~ col gap4" relative>
    <ZLoading :model-value="loading" />

    <!-- 操作栏 -->
    <div flex="action justify-between">
      <div flex-action>
        <ZBtn
          v-if="isCreate"
          label="添加用户"
          icon="plus"
          @click="dialogType = '添加'"
        />
        <ZBtn
          v-if="isChangeStatus"
          label="修改状态"
          icon="edit"
          type="secondary"
          :disable="!selected?.length"
          @click="() => {
            userStatus = true
            changeDialog = true
          }"
        />
        <ZBtn
          v-if="isChangeDownloadConfig"
          label="修改配置"
          icon="set2"
          type="secondary"
          :disable="!selected?.length"
          @click="downloadDialog = '下载'"
        />
        <ZBtn
          v-if="isChangeDownloadConfig"
          label="全局配置"
          icon="set2"
          type="secondary"
          @click="downloadDialog = '全局'"
        />
      </div>
      <div flex-action>
        <ZInput
          v-model="filterText"
          placeholder="搜索用户账号"
          debounce="500"
          size="small"
        >
          <template #prepend>
            <div icon i-mingcute:search-line />
          </template>
        </ZInput>
      </div>
    </div>

    <!-- 个人用户 -->
    <ZTable
      ref="zTable"
      v-model:pagination="pagination"
      v-model:selected="selected"
      :rows :cols :filter="filterText"
      selection="multiple"
      no-data-label="暂无用户"
      flex-1 h0
      fixed-first-col
      action
      @request="queryUser"
    >
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
                user = row
              }"
            />
            <template v-if="isUpdate">
              <div h3 w1px bg-grey-3 />
              <ZTextBtn
                label="编辑"
                weight="400"
                @click="() => {
                  dialogType = '编辑'
                  user = row
                }"
              />
            </template>
          </div>
        </q-td>
      </template>
    </ZTable>

    <!-- 修改个人用户状态 -->
    <ZDialog
      v-model="changeDialog"
      title="修改状态"
      footer
      @ok="changeUserStatus"
    >
      <div flex="~ gap10">
        <ZRadio
          :model-value="userStatus.toString()"
          label="正常" val="true"
          @update:model-value="userStatus = true"
        />
        <ZRadio
          :model-value="userStatus.toString()"
          label="禁用" val="false"
          @update:model-value="userStatus = false"
        />
      </div>
    </ZDialog>

    <!-- 下载次数配置配置 -->
    <DownloadConfigDialog
      v-model:type="downloadDialog"
      :users="selected"
      @callback="callback"
    />

    <!-- 查看个人用户 -->
    <UserDialog
      v-model:type="dialogType"
      :user
      @callback="callback"
    />
  </div>
</template>
