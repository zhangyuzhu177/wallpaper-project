<script lang="ts" setup>
import { browser } from 'utils'
import { computed, ref, watch } from 'vue'
import { Cropper } from 'vue-advanced-cropper'
import type { Coordinates } from 'vue-advanced-cropper'

import ZInput from '../input/ZInput.vue'

import 'vue-advanced-cropper/dist/style.css'
import 'vue-advanced-cropper/dist/theme.compact.css'

interface ZImgCropperProps {
  /**
   * 裁剪图片绑定的值
   */
  modelValue?: File | File[]
  /**
   * 完成裁剪后的回调函数
   */
  onCallback?: (value: File[]) => void
}

const props = defineProps<ZImgCropperProps>()
const emits = defineEmits<{
  /**
   * 更新裁剪图片绑定的值
   */
  'update:modelValue': [ZImgCropperProps['modelValue']]
}>()

const cropperRef = ref<InstanceType<typeof Cropper>>()

/** 待处理的图片 */
const images = ref<{
  name: string
  url: string
  type: string
}[]>()
/** 当前图片的索引 */
const index = ref(0)
/** 裁剪比例 */
const ratio = ref<number>()

/** 已裁剪的文件列表 */
const files = ref<File[]>([])

/** 对话框 */
const dialog = computed({
  get() {
    return !!images.value?.length
  },
  set() {
    emits('update:modelValue', undefined)
  },
})

watch(
  () => props.modelValue,
  (newVal) => {
    if (!newVal) {
      images.value = undefined
    }
    else if (Array.isArray(newVal)) {
      images.value = newVal.map(v => ({
        name: v.name,
        url: browser.fileToUrl(v),
        type: v.type,
      }))
    }
    else {
      images.value = [{
        name: newVal.name,
        url: browser.fileToUrl(newVal),
        type: newVal.type,
      }]
    }
    index.value = 0
    ratio.value = undefined
    files.value = []
  },
)

/**
 * 调整裁剪区域的尺寸
 */
function resize(width = 1, height = 1) {
  let startCoordinates: Coordinates
  cropperRef.value?.setCoordinates([
    ({ coordinates }) => {
      startCoordinates = coordinates
      return {
        width: coordinates.width * width,
        height: coordinates.height * height,
      }
    },
    ({ coordinates }) => ({
      left: startCoordinates.left + (startCoordinates.width - coordinates.width) / 2,
      top: startCoordinates.top + (startCoordinates.height - coordinates.height) / 2,
    }),
  ])
}

/**
 * 剪切图片
 */
function cropperImage() {
  if (!cropperRef.value || !images.value?.length)
    return

  const image = images.value[index.value]
  const { canvas } = cropperRef.value.getResult()
  canvas?.toBlob((blob) => {
    if (!blob)
      return

    files.value[index.value] = new File(
      [blob],
      image.name,
      { type: image.type },
    )

    if (index.value < images.value!.length - 1) {
      index.value++
    }
    else {
      dialog.value = false
      props.onCallback?.(files.value)
    }
  }, image?.type)
}
</script>

<template>
  <q-dialog
    v-model="dialog"
    class="z-img-cropper-dialog"
    no-backdrop-dismiss
    no-route-dismiss
    no-refocus no-shake
    transition-duration="0"
    maximized
  >
    <div overflow="hidden!">
      <Cropper
        ref="cropperRef"
        :src="images?.[index]?.url"
        :default-size="(e: any) => e.imageSize"
        image-restriction="stencil"
        :stencil-props="{
          aspectRatio: ratio,
        }"
        full
      />

      <div
        absolute top-5 left-5 p="y1 x2"
        text="sm grey-1" b="1 grey-3"
        cursor-pointer
        @click="dialog = false"
      >
        按下 Esc 或点此关闭
      </div>

      <div
        class="checked button"
        @click="cropperImage"
      >
        <div i-mingcute:check-line />
      </div>

      <div class="options">
        <div>
          <div
            class="option button"
            @click="resize(2, 2)"
          >
            <div i-mingcute:fullscreen-line />
          </div>
          <div
            class="option button"
            @click="resize(0.5, 0.5)"
          >
            <div i-mingcute:fullscreen-exit-line />
          </div>
          <div
            class="option button"
            @click="cropperRef?.setCoordinates(({ coordinates, imageSize }) => ({
              left: imageSize.width / 2 - coordinates.width / 2,
              top: imageSize.height / 2 - coordinates.height / 2,
            }))"
          >
            <div i-mingcute:aiming-line />
          </div>
          <div
            class="option button"
            @click="resize(1, 2)"
          >
            <div i-mingcute:unfold-vertical-line />
          </div>
          <div
            class="option button"
            @click="resize(2, 1)"
          >
            <div i-mingcute:unfold-horizontal-line />
          </div>

          <ZInput
            v-model="ratio"
            placeholder="比例"
            type="number"
            size="small"
            :min="0.1"
            :max="10"
            :decimal="2"
            w20 mx0.5
          />
        </div>

        <div>
          <div
            class="option button"
            @click="cropperRef?.zoom(1.2)"
          >
            <svg class="base-icon">
              <use xlink:href="#icon-large" />
            </svg>
          </div>
          <div
            class="option button"
            @click="cropperRef?.zoom(0.8)"
          >
            <svg class="base-icon">
              <use xlink:href="#icon-small" />
            </svg>
          </div>
          <div
            class="option button"
            @click="cropperRef?.rotate(-90)"
          >
            <svg class="base-icon">
              <use xlink:href="#icon-turn-left" />
            </svg>
          </div>
          <div
            class="option button"
            @click="cropperRef?.reset()"
          >
            <svg class="base-icon">
              <use xlink:href="#icon-ratio" />
            </svg>
          </div>
          <div
            class="option button"
            @click="cropperRef?.rotate(90)"
          >
            <svg class="base-icon">
              <use xlink:href="#icon-turn-right" />
            </svg>
          </div>
          <div
            class="option button"
            @click="cropperRef?.flip(false, true)"
          >
            <svg class="base-icon" text-4>
              <use xlink:href="#icon-flip-v" />
            </svg>
          </div>
          <div
            class="option button"
            @click="cropperRef?.flip(true, false)"
          >
            <svg class="base-icon" text-4>
              <use xlink:href="#icon-flip-h" />
            </svg>
          </div>
        </div>
      </div>

      <div
        v-if="images?.length && images.length > 1"
        absolute-x-center bottom-10 text="sm grey-1"
      >
        {{ index + 1 }} / {{ images.length }}
      </div>
    </div>
  </q-dialog>
</template>

<style lang="scss">
.z-img-cropper-dialog {
  .q-dialog__inner {
    .checked {
      position: absolute;
      top: 20px;
      right: 20px;
      width: 30px;
      height: 30px;
      font-size: 16px;
    }

    .button {
      background-color: #6e6e6eb3;
      cursor: pointer;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 6px;
      font-size: 18px;
    }

    .base-icon {
      width: 1em;
      height: 1em;
      vertical-align: -.15em;
      fill: currentColor;
      overflow: hidden;
    }

    .options {
      position: absolute;
      bottom: 80px;
      left: 50%;
      transform: translate(-50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;

      > div {
        display: flex;
        gap: 4px;

        .option {
          width: 36px;
          height: 36px;
          margin-left: 2px;
          margin-right: 2px;
          font-size: 20px;
        }
      }
    }

    .vue-advanced-cropper {
      .vue-advanced-cropper__background {
        background-color: transparent;
      }
    }

    .z-input {
      .q-field__control {
        background-color: #6e6e6eb3;

        &::before, &::after {
          display: none;
        }

        input {
          color: var(--grey-1);

          &::-webkit-input-placeholder {
            color: var(--grey-4);
          }
        }

        .number-input-controller {
          > div {
            background-color: var(--grey-4);

            &:hover {
              background-color: var(--grey-3);
            }

            &:active {
              background-color: var(--grey-2);
            }
          }
        }
      }
    }
  }
}
</style>
