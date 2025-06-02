const system = uni.getSystemInfoSync()

export function useSystem() {
  /** 状态栏高度 */
  const statusBarHeight = computed(() => {
    return system.statusBarHeight || 0
  })
  /** 标题栏高度 */
  const titleBarHeight = computed(() => {
    if (!uni.getMenuButtonBoundingClientRect)
      return 40

    const { height, top } = uni.getMenuButtonBoundingClientRect()
    return height + (top - statusBarHeight.value) * 2
  })

  return {
    system,
    statusBarHeight,
    titleBarHeight,
  }
}
