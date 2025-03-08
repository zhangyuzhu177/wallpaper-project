<script setup lang="ts">
import moment from 'moment'
import { Like } from 'typeorm'
import { Notify } from 'quasar'
import { PermissionType } from 'types'
import type { INotice, IQueryDto } from 'types'
import type { QTableColumn, QTableProps } from 'quasar'
import ZTable from 'shared/components/table/ZTable.vue'

import NoticeDialog from './Notice.dialog.vue'

const zTable = ref<InstanceType<typeof ZTable>>()

const { hasPermission } = useAdmin()

/** 是否可创建 */
const isCreate = hasPermission(PermissionType.NOTICE_CREATE)
/** 是否可更新 */
const isUpdate = hasPermission(PermissionType.NOTICE_UPDATE)
/** 是否可删除 */
const isDelete = hasPermission(PermissionType.NOTICE_DELETE)
/** 是否可修改状态 */
const isChangeStatus = hasPermission(PermissionType.NOTICE_CHANGE_STATUS)

/** 加载中 */
const loading = ref(false)
/** 公告对话框类型 */
const dialogType = ref<DialogType>()
/** 公告 */
const notice = ref<INotice>()

/** 修改状态对话框 */
const changeDialog = ref(false)
/** 公告账号状态 */
const noticeStatus = ref(true)

/** 删除对话框 */
const deleteDialog = ref(false)

/** 表格行 */
const rows = ref<INotice[]>()
/** 表格列 */
const cols: QTableColumn<INotice>[] = [
  {
    name: 'title',
    label: '标题',
    field: 'title',
    sortable: true,
  },
  {
    name: 'order',
    label: '排序',
    field: 'order',
  },
  {
    name: 'date',
    label: '日期',
    field: row => moment(row.date).format('YYYY-MM-DD HH:mm'),
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
const pagination = TABLE_PAGINATION('date', true)
/** 表格筛选文本 */
const filterText = ref()
/** 当前选中的个人用户（多选） */
const selected = ref<INotice[]>()

/**
 * 查询公告
 */
const queryNotice: QTableProps['onRequest'] = async (props) => {
  const { filter } = props
  const { page, rowsPerPage, sortBy, descending } = props.pagination
  loading.value = true

  try {
    const body: IQueryDto<INotice> = {
      pagination: {
        page,
        pageSize: rowsPerPage,
      },
    }
    if (filter)
      body.where = { title: Like(`%${filter}%`) }

    if (sortBy) {
      const sort = descending ? 'desc' : 'asc'
      body.order = { [sortBy]: sort }
    }
    const { total, data } = await noticeQueryApi(body)
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
 * 修改公告状态
 */
async function changeNoticeStatus() {
  if (!selected.value?.length)
    return

  loading.value = true
  let res
  try {
    res = await noticeChangeStatusApi({
      ids: selected.value.map(v => v.id),
      status: noticeStatus.value,
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
 * 删除公告
 */
async function deleteNotice() {
  if (!selected.value?.length)
    return

  loading.value = true
  let res
  try {
    res = await noticeDeleteApi(selected.value.map(v => v.id))
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
          label="添加公告"
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
            noticeStatus = true
            changeDialog = true
          }"
        />
        <ZBtn
          v-if="isDelete"
          label="删除公告"
          icon="delete"
          type="secondary"
          :disable="!selected?.length"
          @click="deleteDialog = true"
        />
      </div>
      <div flex-action>
        <ZInput
          v-model="filterText"
          placeholder="搜索公告标题"
          debounce="500"
          size="small"
        >
          <template #prepend>
            <div icon i-mingcute:search-line />
          </template>
        </ZInput>
      </div>
    </div>

    <!-- 公告信息 -->
    <ZTable
      ref="zTable"
      v-model:pagination="pagination"
      v-model:selected="selected"
      :rows :cols :filter="filterText"
      selection="multiple"
      no-data-label="暂无公告"
      flex-1 h0
      fixed-first-col
      action
      @request="queryNotice"
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
                notice = row
              }"
            />
            <template v-if="isUpdate">
              <div h3 w1px bg-grey-3 />
              <ZTextBtn
                label="编辑"
                weight="400"
                @click="() => {
                  dialogType = '编辑'
                  notice = row
                }"
              />
            </template>
          </div>
        </q-td>
      </template>
    </ZTable>

    <!-- 修改公告状态 -->
    <ZDialog
      v-model="changeDialog"
      title="修改状态"
      footer
      @ok="changeNoticeStatus"
    >
      <div flex="~ gap10">
        <ZRadio
          :model-value="noticeStatus.toString()"
          label="正常" val="true"
          @update:model-value="noticeStatus = true"
        />
        <ZRadio
          :model-value="noticeStatus.toString()"
          label="禁用" val="false"
          @update:model-value="noticeStatus = false"
        />
      </div>
    </ZDialog>

    <!-- 删除公告 -->
    <ZDialog
      v-model="deleteDialog"
      title="删除公告"
      footer
      @ok="deleteNotice"
    >
      此操作将删除已选的公告，是否继续？
    </ZDialog>

    <!-- 更新插入公告 -->
    <NoticeDialog
      v-model:type="dialogType"
      :notice
      @callback="callback"
    />
  </div>
</template>
