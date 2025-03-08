import type {
  IChangeStatusBodyDto,
  IChangeUserDownloadConfigBodyDto,
  ICreateUserBodyDto,
  IQueryDto,
  IQueryPaginatedResData,
  IRelationRawDto,
  IUpdateUserBodyDto,
  IUser,
} from 'types'
import { useRequest } from '../hooks/request'

const { $get, $post } = useRequest()

/**
 * 获取当前登入个人用户的信息
 */
export function userOwnGetProfileApi(query?: IRelationRawDto) {
  return $get<IUser>('/user/own', query)
}

/**
 * 查询个人用户列表
 */
export function userQueryApi(body: IQueryDto<IUser>) {
  return $post<IQueryPaginatedResData<IUser>>('/user/query', body)
}

/**
 * 创建个人用户
 */
export function userCreateApi(body: ICreateUserBodyDto, notify = true) {
  return $post<string>(
    '/user/create',
    body,
    notify ? undefined : { headers: { notify: false } },
  )
}

/**
 * 更新指定个人用户
 */
export function userUpdateApi(userId: string, body: IUpdateUserBodyDto) {
  return $post<string>(`/user/update/${userId}`, body)
}

/**
 * 批量修改个人用户状态
 */
export function userChangeStatusApi(body: IChangeStatusBodyDto) {
  return $post<number>('/user/status', body)
}

/**
 * 批量修改个人用户数据表格可申请限制
 */
export function userDownloadConfigApi(body: IChangeUserDownloadConfigBodyDto) {
  return $post<number>('/user/download/config', body)
}
