import type { ICategory } from '../../entities/category.interface'

/**
 * 创建/更新壁纸
 * 请求参数
 */
export interface IUpsertCategoryBodyDto
  extends
  Pick<
    ICategory,
    'name' | 'url' | 'desc' | 'order' | 'status'
  > {}
