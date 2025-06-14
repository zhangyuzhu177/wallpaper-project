<script setup lang="ts">
import moment from 'moment'
import type { QTableColumn, QTableProps } from 'quasar'
import { Like } from 'typeorm'
import type { ICollection, IQueryDto } from 'types'

/** 加载中 */
const loading = ref(false)
/** 查看图片 */
const preview = ref(false)
/** 下载记录 */
const record = ref<ICollection>()

/** 表格行 */
const rows = ref<ICollection[]>()
/** 表格列 */
const cols: QTableColumn<ICollection>[] = [
  {
    name: 'account',
    label: '账号',
    field: row => row.user?.account,
  },
  {
    name: 'name',
    label: '昵称',
    field: row => row.user?.name,
  },
  {
    name: 'category',
    label: '壁纸分类',
    field: row => row.wallpaper?.category?.name,
  },
  {
    name: 'wallpaperName',
    label: '壁纸名称',
    field: row => row.wallpaper?.name,
  },
  {
    name: 'createdAt',
    label: '收藏时间',
    field: row => moment(row.createdAt).format('YYYY-MM-DD HH:mm'),
    sortable: true,
  },
]

/** 表格分页信息 */
const pagination = TABLE_PAGINATION('createdAt', true)
/** 表格筛选文本 */
const filterText = ref()

/**
 * 查询下载记录
 */
const queryCollectionRecord: QTableProps['onRequest'] = async (props) => {
  const { filter } = props
  const { page, rowsPerPage, sortBy, descending } = props.pagination
  loading.value = true

  try {
    const body: IQueryDto<ICollection> = {
      relations: {
        user: true,
        wallpaper: {
          category: true,
        },
      },
      pagination: {
        page,
        pageSize: rowsPerPage,
      },
    }
    if (filter)
      body.where = { user: { account: Like(`%${filter}%`) } }

    if (sortBy) {
      const sort = descending ? 'desc' : 'asc'
      body.order = { [sortBy]: sort }
    }
    const { total, data } = await getCollectionLogApi(body)
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
    loading.value = false
  }
}
</script>

<template>
  <div full flex="~ col gap4" relative>
    <ZLoading :model-value="loading" />

    <!-- 操作栏 -->
    <div flex="action justify-end">
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

    <!-- 收藏日志记录 -->
    <ZTable
      v-model:pagination="pagination"
      :rows :cols :filter="filterText"
      selection="multiple"
      no-data-label="暂无收藏记录"
      flex-1 h0
      fixed-first-col
      action
      @request="queryCollectionRecord"
    >
      <!-- 操作 -->
      <template #body-cell-action="{ row }">
        <q-td auto-width>
          <ZTextBtn
            label="查看"
            weight="400"
            @click="() => {
              preview = true
              record = row
            }"
          />
        </q-td>
      </template>
    </ZTable>

    <ZDialog
      v-model="preview"
      title="查看图片"
      :scroll="false"
      :wrapper-style="{
        width: '400px',
        maxWidth: '400px',
        maxHeight: '800px',
      }"
    >
      <div w-full h-700px flex overflow-hidden>
        <q-img full :src="record?.wallpaper?.url" />
      </div>
    </ZDialog>
  </div>
</template>
