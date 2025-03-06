import type {
  IAdminRole,
  IQueryDto,
  IQueryPaginatedResData,
  IUpsertAdminRoleBodyDto,
} from 'types'
import { useRequest } from '../hooks/request'

const { $post } = useRequest()

/**
 * 查询管理员角色列表
 */
export function adminRoleQueryApi(body: IQueryDto<IAdminRole>) {
  return $post<IQueryPaginatedResData<IAdminRole>>('/admin/role/query', body)
}

/**
 * 创建管理员角色
 */
export function adminRoleCreateApi(body: IUpsertAdminRoleBodyDto) {
  return $post<string>('/admin/role/create', body)
}

/**
 * 批量复制管理员角色
 */
export function adminRoleCopyApi(ids: string[]) {
  return $post<number>('/admin/role/copy', { ids })
}

/**
 * 更新管理员角色
 */
export function adminRoleUpdateApi(adminRoleId: string, body: IUpsertAdminRoleBodyDto) {
  return $post<string>(`/admin/role/update/${adminRoleId}`, body)
}

/**
 * 批量删除管理员角色
 */
export function adminRoleDeleteApi(ids: string[]) {
  return $post<number>('/admin/role/delete', { ids })
}

/**
 * 删除指定管理员角色
 */
export function adminRoleDeleteByIdApi(adminRoleId: string) {
  return $post<boolean>(`/admin/role/delete/${adminRoleId}`)
}
