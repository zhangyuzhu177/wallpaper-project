<script lang="ts" setup>
import moment from 'moment'
import { Like } from 'typeorm'
import { Notify } from 'quasar'
import { PermissionType } from 'types'
import type { ICategory, IQueryDto } from 'types'
import type { QTableColumn, QTableProps } from 'quasar'
import ZTable from 'shared/components/table/ZTable.vue'

import CategoryDialog from './Category.dialog.vue'

const zTable = ref<InstanceType<typeof ZTable>>()

const { hasPermission } = useAdmin()

/** 是否可创建 */
const isCreate = hasPermission(PermissionType.CATEGORY_CREATE)
/** 是否可更新 */
const isUpdate = hasPermission(PermissionType.CATEGORY_UPDATE)
/** 是否可删除 */
const isDelete = hasPermission(PermissionType.CATEGORY_DELETE)

/** 加载中 */
const loading = ref(false)
/** 类型对话框类型 */
const dialogType = ref<DialogType>()
/** 类型 */
const category = ref<ICategory>()

/** 删除对话框 */
const deleteDialog = ref(false)

/** 表格行 */
const rows = ref<ICategory[]>()
/** 表格列 */
const cols: QTableColumn<ICategory>[] = [
  {
    name: 'name',
    label: '分类名称',
    field: 'name',
    sortable: true,
  },
  {
    name: 'desc',
    label: '描述',
    field: 'desc',
  },
  {
    name: 'wallpaper',
    label: '壁纸数',
    field: row => row.wallpapers?.length,
  },
  {
    name: 'createdAt',
    label: '创建时间',
    field: row => moment(row.createdAt).format('YYYY-MM-DD HH:mm'),
    sortable: true,
  },
  {
    name: 'createdAt',
    label: '更新时间',
    field: row => moment(row.createdAt).format('YYYY-MM-DD HH:mm'),
    sortable: true,
  },
]
/** 表格分页信息 */
const pagination = TABLE_PAGINATION('createdAt', true)
/** 表格筛选文本 */
const filterText = ref()
/** 当前选中的分类（多选） */
const selected = ref<ICategory[]>()

/**
 * 查询分类
 */
const queryCategory: QTableProps['onRequest'] = async (props) => {
  const { filter } = props
  const { page, rowsPerPage, sortBy, descending } = props.pagination
  loading.value = true

  try {
    const body: IQueryDto<ICategory> = {
      pagination: {
        page,
        pageSize: rowsPerPage,
      },
      relations: {
        wallpapers: true,
      },
    }
    if (filter)
      body.where = { name: Like(`%${filter}%`) }

    if (sortBy) {
      const sort = descending ? 'desc' : 'asc'
      body.order = { [sortBy]: sort }
    }
    const { total, data } = await categoryQueryApi(body)
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
 * 回调函数，重新查询分类
 */
function callback() {
  zTable.value?.tableRef?.requestServerInteraction()
}

/**
 * 删除分类
 */
async function deleteCategory() {
  if (!selected.value?.length)
    return

  loading.value = true
  let res
  try {
    res = await categoryDeleteApi({
      ids: selected.value.map(v => v.id),
    })
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
          label="添加分类"
          icon="plus"
          @click="dialogType = '添加'"
        />
        <ZBtn
          v-if="isDelete"
          label="删除分类"
          icon="delete"
          type="secondary"
          :disable="!selected?.length"
          @click="deleteDialog = true"
        />
      </div>
      <div flex-action>
        <ZInput
          v-model="filterText"
          placeholder="搜索分类名称"
          debounce="500"
          size="small"
        >
          <template #prepend>
            <div icon i-mingcute:search-line />
          </template>
        </ZInput>
      </div>
    </div>

    <!-- 分类信息 -->
    <ZTable
      ref="zTable"
      v-model:pagination="pagination"
      v-model:selected="selected"
      :rows :cols :filter="filterText"
      selection="multiple"
      no-data-label="暂无分类信息"
      flex-1 h0
      fixed-first-col
      action
      @request="queryCategory"
    >
      <!-- 操作 -->
      <template #body-cell-action="{ row }">
        <q-td auto-width>
          <div flex="~ items-center gap2">
            <ZTextBtn
              label="查看"
              weight="400"
              @click="() => {
                dialogType = '查看'
                category = row
              }"
            />
            <template v-if="isUpdate">
              <div h3 w1px bg-grey-3 />
              <ZTextBtn
                label="编辑"
                weight="400"
                @click="() => {
                  dialogType = '编辑'
                  category = row
                }"
              />
            </template>
          </div>
        </q-td>
      </template>
    </ZTable>

    <!-- 删除分类 -->
    <ZDialog
      v-model="deleteDialog"
      title="删除分类"
      footer
      @ok="deleteCategory"
    >
      此操作将删除已选的分类，是否继续？
    </ZDialog>

    <!-- 更新插入分类 -->
    <CategoryDialog
      v-model:type="dialogType"
      :category
      @callback="callback"
    />
  </div>
</template>
