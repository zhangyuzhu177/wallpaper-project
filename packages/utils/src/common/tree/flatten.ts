/**
 * 把任意标准树形数据转换为一维数组
 * @param sourceTree 原树型数据
 * @param childrenPaths 子节点字段路径
 * @param parentFieldName 自定义父节点字段名
 * @param depthFieldName 自定义深度字段名
 * @default
 *  childrenPaths = 'children'
 *  parentFieldName = 'parent'
 *  depthFieldName = 'depth'
 * @return 转换后的一维数组
 */
export function treeFlatten<T>(
  sourceTree: T[],
  childrenPaths: string | string[] = 'children',
  parentFieldName = 'parent',
  depthFieldName = 'depth',
): (T & Record<string, any>)[] { // 使用可变字段名
  const result: ReturnType<typeof treeFlatten<T>> = []

  function traverse(node: T, parent?: T, depth = 1) {
    // 添加 parent 引用和 depth 字段
    const extendedNode = {
      ...node,
      [parentFieldName]: parent,
      [depthFieldName]: depth,
    }
    result.push(extendedNode)

    // 如果当前深度已经超出 childrenPaths 的范围，则停止遍历
    if (Array.isArray(childrenPaths) && depth > childrenPaths.length)
      return

    // 处理子节点字段
    let childrenField: string
    if (Array.isArray(childrenPaths))
      childrenField = childrenPaths[depth - 1] || childrenPaths[childrenPaths.length - 1]
    else
      childrenField = childrenPaths

    const children = (node as any)[childrenField]
    if (Array.isArray(children))
      children.forEach((child: T) => traverse(child, extendedNode, depth + 1))
  }

  // 遍历根节点
  sourceTree.forEach(rootNode => traverse(rootNode))

  return result
}
