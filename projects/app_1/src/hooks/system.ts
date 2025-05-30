/** 状态栏高度 */
const statusBarHeight = computed(() => {
  return uni.getSystemInfoSync().statusBarHeight || 0
})
/** 标题栏高度 */
const titleBarHeight = computed(() => {
  if (!uni.getMenuButtonBoundingClientRect)
    return 40

  const { height, top } = uni.getMenuButtonBoundingClientRect()
  return height + (top - statusBarHeight.value) * 2
})
export function useSystem() {
  return {
    statusBarHeight,
    titleBarHeight,
  }
}
