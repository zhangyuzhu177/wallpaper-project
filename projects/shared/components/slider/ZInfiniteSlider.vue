<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useVModel, useWindowSize } from '@vueuse/core'

export interface ZInfiniteSliderProps {
  /**
   * 无限滑块绑定的值
   */
  modelValue?: number
  /**
   * 移动多少像素触发一个 step
   *
   * 默认值：`10`
   */
  stepPixel?: number
  /**
   * 每个 step 的值
   *
   * 默认值：`1`
   */
  step?: number
  /**
   * 最小值
   */
  min?: number
  /**
   * 最大值
   */
  max?: number
  /**
   * 保留小数的位数（0 ~ 100）
   */
  decimal?: number
  /**
   * 滑动方向
   *
   * 可选值：`horizontal` | `vertical`
   *
   * 默认值：`horizontal`
   */
  direction?: 'horizontal' | 'vertical'
  /**
   * 拖动时是否隐藏元素
   */
  hidden?: boolean
}

const props = withDefaults(defineProps<ZInfiniteSliderProps>(), {
  stepPixel: 10,
  step: 1,
  direction: 'horizontal',
})
defineEmits<{
  /**
   * 更新无限滑块绑定的值
   */
  'update:modelValue': [ZInfiniteSliderProps['modelValue']]
}>()

const trigger = ref<HTMLElement>()
const id = 'z-infinite-slider__cursor'

const value = useVModel(props, 'modelValue')
const { width, height } = useWindowSize()

/** 是否在拖拽中 */
const dragging = ref(false)

/** 水平移动 */
let moveX = 0
/** 垂直移动 */
let moveY = 0

/** 图标名称 */
const faIconName = computed(() => {
  return props.direction === 'horizontal'
    ? 'fas fa-arrows-left-right'
    : 'fas fa-arrows-up-down'
})

/**
 * 切换 body 光标
 */
function toggleBodyCursor(showResize: boolean) {
  const body = document.body
  if (showResize)
    body.style.cursor = props.direction === 'horizontal' ? 'ew-resize' : 'ns-resize'
  else
    body.style.cursor = 'default'
}

/**
 * 移除指针锁定
 */
function removePointerLock() {
  document.exitPointerLock()
  document.removeEventListener('pointerlockchange', onPointLockChange, false)
  document.removeEventListener('mousemove', onMousemove, false)
}

/**
 * 添加指针锁定
 */
function addPointerLock() {
  const cursor = createFakeCursor()

  const tRect = trigger.value!.getBoundingClientRect()
  const cRect = cursor.getBoundingClientRect()
  cursor.style.left = `${tRect.left - (cRect.width - tRect.width) / 2}px`
  cursor.style.top = `${tRect.top - (cRect.height - tRect.height) / 2}px`
  cursor.style.zIndex = '999999'

  moveX = 0
  moveY = 0

  document.addEventListener('pointerlockchange', onPointLockChange, false)
  document.addEventListener('mouseup', onMouseUp, {
    capture: false,
    once: true,
  })

  cursor.requestPointerLock()
}

/**
 * 监听指针锁定变化
 */
function onPointLockChange() {
  const cursor = document.getElementById(id)
  if (document.pointerLockElement === cursor)
    document.addEventListener('mousemove', onMousemove, false)
  else
    document.removeEventListener('mousemove', onMousemove, false)
}

/**
 * 监听鼠标移动事件
 */
function onMousemove(e: MouseEvent) {
  dragging.value = true
  const cursor = document.getElementById(id)
  if (!cursor)
    return

  const rect = cursor.getBoundingClientRect()
  const { stepPixel, step, direction, min, max, decimal } = props

  moveX += e.movementX
  moveY -= e.movementY
  if (direction === 'horizontal') {
    const newLeft = (width.value * 2 + rect.left + e.movementX) % width.value
    cursor.style.left = `${newLeft}px`
  }
  else {
    const newTop = (height.value * 2 + rect.top + e.movementY) % height.value
    cursor.style.top = `${newTop}px`
  }

  const distance = direction === 'horizontal' ? moveX : moveY

  if (Math.abs(distance) >= stepPixel) {
    const num = Math.floor(Math.abs(distance) / stepPixel)
    let val = (value.value ?? 0) + (distance > 0 ? num * step : -num * step)
    if (typeof min === 'number' && val < min)
      val = min
    else if (typeof max === 'number' && val > max)
      val = max
    if (typeof decimal === 'number' && decimal >= 0 && decimal <= 100)
      val = Number(val.toFixed(decimal))
    value.value = val

    moveX = 0
    moveY = 0
  }
}

/**
 * 监听鼠标抬起事件
 */
function onMouseUp() {
  dragging.value = false
  removePointerLock()
  toggleBodyCursor(false)

  const cursor = document.getElementById(id)
  if (cursor)
    cursor.remove()
}

/**
 * 监听鼠标按下事件
 */
function onMouseDown() {
  dragging.value = true
  removePointerLock()
  toggleBodyCursor(true)
  addPointerLock()
}

/**
 * 创建指针
 */
function createFakeCursor() {
  const fakeCursor = document.createElement('div')
  fakeCursor.setAttribute('id', id)
  fakeCursor.style.position = 'fixed'
  const icon = document.createElement('i')
  icon.classList.add('q-icon', ...faIconName.value.split(/\s+/))
  icon.style.fontSize = '16px'
  fakeCursor.appendChild(icon)
  document.body.appendChild(fakeCursor)
  return fakeCursor
}
</script>

<template>
  <div
    class="z-infinite-slider"
    @mousedown.prevent.stop="onMouseDown"
  >
    <div
      ref="trigger"
      cursor-grab flex-center
      :opacity="dragging && hidden ? 0 : 100"
      :title="`${direction === 'horizontal' ? '水平' : '垂直'}拖动调整数值`"
    >
      <slot>
        <q-icon
          transition hover:text-grey-9
          :hover:scale="direction === 'horizontal' ? 'x-124' : 'y-125'"
          :name="faIconName"
        />
      </slot>
    </div>
  </div>
</template>
