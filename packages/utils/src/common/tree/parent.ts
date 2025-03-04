/**
 * 从树节点中拼接所有父节点的指定字段值，返回一个数组
 * @param node 当前节点
 * @param labelFieldName 指定节点的值字段名
 * @param parentFieldName 指定父节点的字段名
 * @default
 *  labelFieldName = 'label'
 *  parentFieldName = 'parent'
 * @return 拼接所有 parent 节点字段值的数组
 */
export function collectParentValues<T>(
  node: T,
  labelFieldName = 'label' as keyof T,
  parentFieldName = 'parent' as keyof T,
): any[] {
  const values: any[] = []

  // 遍历所有 parent 节点
  while (node) {
    values.push(node[labelFieldName]) // 添加当前节点的值
    node = node[parentFieldName] as T // 向上追溯到父节点
  }

  return values
}
