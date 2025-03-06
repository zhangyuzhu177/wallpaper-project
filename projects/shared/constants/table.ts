import { ref } from 'vue'
import type { QTableProps } from 'quasar'
import { PAGINATION_SIZE_DFT } from 'utils'

/**
 * 返回表格分页配置
 */
export function TABLE_PAGINATION(sortBy?: string, descending?: boolean) {
  return ref<Exclude<QTableProps['pagination'], undefined>>({
    page: 1,
    rowsPerPage: PAGINATION_SIZE_DFT,
    rowsNumber: 0,
    sortBy,
    descending,
  })
}
