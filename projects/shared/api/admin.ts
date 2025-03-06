import type {
  IAdmin,
  IAssignAdminRoleBodyDto,
  IChangeStatusBodyDto,
  ICreateAdminBodyDto,
  IQueryDto,
  IQueryPaginatedResData,
  IRelationRawDto,
  IUpdateAdminBodyDto,
} from 'types'
import { useRequest } from '../hooks/request'

const { $get, $post } = useRequest()

/**
 * 获取当前登入管理员的信息
 */
export function adminOwnGetProfileApi(query?: IRelationRawDto) {
  return $get<IAdmin>('/admin/entity/own', query)
}

/**
 * 查询管理员列表
 */
export function adminQueryApi(body: IQueryDto<IAdmin>) {
  return $post<IQueryPaginatedResData<IAdmin>>('/admin/entity/query', body)
}

/**
 * 创建管理员
 */
export function adminCreateApi(body: ICreateAdminBodyDto) {
  return $post<string>('/admin/entity/create', body)
}

/**
 * 更新管理员
 */
export function adminUpdateApi(adminId: string, body: IUpdateAdminBodyDto) {
  return $post<string>(`/admin/entity/update/${adminId}`, body)
}

/**
 * 批量删除管理员
 */
export function adminDeleteApi(ids: string[]) {
  return $post<number>('/admin/entity/delete', { ids })
}

/**
 * 删除指定管理员
 */
export function adminDeleteByIdApi(adminId: string) {
  return $post<boolean>(`/admin/entity/delete/${adminId}`)
}

/**
 * 批量修改管理员账号状态
 */
export function adminChangeStatusApi(body: IChangeStatusBodyDto) {
  return $post<number>('/admin/entity/status', body)
}

/**
 * 批量分配管理员角色
 */
export function adminAssignRoleApi(body: IAssignAdminRoleBodyDto) {
  return $post<number>('/admin/entity/assign', body)
}
