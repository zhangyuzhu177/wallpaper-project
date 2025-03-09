<script lang="ts" setup>
import moment from 'moment'
import { Like } from 'typeorm'
import { Notify } from 'quasar'
import { PermissionType } from 'types'
import { formatFileSize } from 'utils'
import type { QTableColumn, QTableProps } from 'quasar'
import ZTable from 'shared/components/table/ZTable.vue'
import type { ICategory, IQueryDto, IWallpaper } from 'types'

import WallpaperDialog from './Wallpaper.dialog.vue'

const zTable = ref<InstanceType<typeof ZTable>>()

const { hasPermission } = useAdmin()

/** 是否可创建 */
const isCreate = hasPermission(PermissionType.WALLPAPER_CREATE)
/** 是否可更新 */
const isUpdate = hasPermission(PermissionType.WALLPAPER_UPDATE)
/** 是否可删除 */
const isDelete = hasPermission(PermissionType.WALLPAPER_DELETE)

/** 加载中 */
const loading = ref(false)
/** 壁纸对话框类型 */
const dialogType = ref<DialogType>()
/** 壁纸 */
const wallpaper = ref<IWallpaper>()
/** 分类列表 */
const categorys = ref<ICategory[]>()

/** 删除对话框 */
const deleteDialog = ref(false)

/** 表格行 */
const rows = ref<IWallpaper[]>()
/** 表格列 */
const cols: QTableColumn<IWallpaper>[] = [
  {
    name: 'name',
    label: '壁纸名称',
    field: 'name',
    sortable: true,
  },
  {
    name: 'category',
    label: '壁纸分类',
    field: row => row.category?.name,
    sortable: true,
  },
  {
    name: 'size',
    label: '壁纸大小',
    field: row => formatFileSize(row.size),
    sortable: true,
  },
  {
    name: 'url',
    label: 'url 地址',
    field: 'url',
    sortable: true,
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
/** 当前选中的壁纸（多选） */
const selected = ref<IWallpaper[]>()

onBeforeMount(async () => {
  categorys.value = (await categoryQueryApi({
    pagination: {
      pageSize: 'all',
    },
    order: {
      order: 'desc',
    },
  })).data
})

/**
 * 查询壁纸
 */
const queryWallpaper: QTableProps['onRequest'] = async (props) => {
  const { filter } = props
  const { page, rowsPerPage, sortBy, descending } = props.pagination
  loading.value = true

  try {
    const body: IQueryDto<IWallpaper> = {
      pagination: {
        page,
        pageSize: rowsPerPage,
      },
      relations: {
        category: true,
      },
    }
    if (filter)
      body.where = { name: Like(`%${filter}%`) }

    if (sortBy) {
      const sort = descending ? 'desc' : 'asc'
      if (sortBy === 'category')
        body.order = { category: { name: sort } }
      else
        body.order = { [sortBy]: sort }
    }

    const { total, data } = await wallpaperQueryApi(body)
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
 * 回调函数，重新查询壁纸
 */
function callback() {
  zTable.value?.tableRef?.requestServerInteraction()
}

/**
 * 删除分类
 */
async function deleteWallpaper() {
  if (!selected.value?.length)
    return

  loading.value = true
  let res
  try {
    res = await wallpaperDeleteApi({
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
          label="添加壁纸"
          icon="plus"
          @click="dialogType = '添加'"
        />
        <ZBtn
          v-if="isDelete"
          label="删除壁纸"
          icon="delete"
          type="secondary"
          :disable="!selected?.length"
          @click="deleteDialog = true"
        />
      </div>
      <div flex-action>
        <ZInput
          v-model="filterText"
          placeholder="搜索壁纸名称"
          debounce="500"
          size="small"
        >
          <template #prepend>
            <div icon i-mingcute:search-line />
          </template>
        </ZInput>
      </div>
    </div>

    <!-- 壁纸信息 -->
    <ZTable
      ref="zTable"
      v-model:pagination="pagination"
      v-model:selected="selected"
      :rows :cols :filter="filterText"
      selection="multiple"
      no-data-label="暂无壁纸信息"
      flex-1 h0
      fixed-first-col
      action
      @request="queryWallpaper"
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
                wallpaper = row
              }"
            />
            <template v-if="isUpdate">
              <div h3 w1px bg-grey-3 />
              <ZTextBtn
                label="编辑"
                weight="400"
                @click="() => {
                  dialogType = '编辑'
                  wallpaper = row
                }"
              />
            </template>
          </div>
        </q-td>
      </template>
    </ZTable>

    <!-- 删除壁纸 -->
    <ZDialog
      v-model="deleteDialog"
      title="删除壁纸"
      footer
      @ok="deleteWallpaper"
    >
      此操作将删除已选的壁纸，是否继续？
    </ZDialog>

    <!-- 更新/插入壁纸 -->
    <WallpaperDialog
      v-model:type="dialogType"
      :categorys :wallpaper
      @callback="callback"
    />
  </div>
</template>
