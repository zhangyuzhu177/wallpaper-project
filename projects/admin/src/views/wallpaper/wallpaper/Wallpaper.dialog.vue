<script setup lang="ts">
import { cloneDeep } from 'lodash'
import { Notify } from 'quasar'
import type { ICategory, IUpsertWallpaperBodyDto, IWallpaper } from 'types'
import { formatFileSize, objectPick, pathExtName } from 'utils'

interface WallpaperDialogProps {
  /**
   * 分类对话框的操作类型
   */
  type?: DialogType
  /**
   * 壁纸
   */
  wallpaper?: IWallpaper
  /**
   * 分类
   */
  categorys?: ICategory[]
  /**
   * 在更新插入壁纸后的回调
   */
  onCallback?: () => void
}

const props = defineProps<WallpaperDialogProps>()
const emits = defineEmits<{
  /**
   * 更新壁纸对话框的操作类型
   */
  'update:type': [WallpaperDialogProps['type']]
}>()

/** 对话框 */
const dialog = computed({
  get() {
    const { type, wallpaper } = props
    return type === '添加' || (!!type && !!wallpaper)
  },
  set() {
    emits('update:type', undefined)
  },
})
/** 是否只读 */
const readonly = computed(() => props.type === '查看')
/** 壁纸初始化数据 */
const initData: IUpsertWallpaperBodyDto = {
  name: '',
  size: 0,
  url: '',
  categoryId: '',
}
/** 分类表单 */
const form = ref(cloneDeep(initData))
/** 加载中 */
const loading = ref(false)
/** 待裁剪的图片 */
const images = ref<File | File[]>()
/** 大小 */
const size = ref()

watch(
  dialog,
  (newVal) => {
    if (newVal) {
      const { type, wallpaper } = props
      if (type === '添加')
        form.value = cloneDeep(initData)

      else if (wallpaper)
        form.value = objectPick(wallpaper, 'name', 'url', 'categoryId', 'size')
      size.value = formatFileSize(form.value.size)
    }
  },
)

/** 禁用提交 */
const disable = computed(() => {
  const { name, url, categoryId } = form.value
  return !name || !url || !categoryId
})

/**
 * 创建/更新壁纸
 */
async function upsertWallpaper() {
  if (disable.value)
    return

  const { type, wallpaper, onCallback } = props

  if (type === '添加')
    await wallpaperCreateApi(form.value)
  else if (type === '编辑')
    await wallpaperUpdateApi(form.value, wallpaper!.id)

  Notify.create({
    type: 'success',
    message: `${type}成功`,
  })
  onCallback?.()
}

/**
 * 上传文件
 */
async function uploadFile(file?: File | File[]) {
  if (!file)
    return
  if (Array.isArray(file))
    file = file[0]

  if (!form.value.name || !form.value.categoryId) {
    return Notify.create({
      type: 'error',
      message: '请先填写名称和分类',
    })
  }

  loading.value = true
  size.value = formatFileSize(file.size)
  form.value.size = file.size

  try {
    const url = await fileUploadApi(
      { path: `wallpaper/${form.value.categoryId}/${form.value.name}${pathExtName(file.name)}` },
      file,
    )
    if (url)
      form.value.url = url
  }
  catch (_) { }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <ZDialog
    v-model="dialog"
    :title="`${type}壁纸`"
    confirm-text="保存"
    :footer="!readonly" scroll
    :disable-confirm="disable"
    :wrapper-style="{
      width: '900px',
      maxWidth: '900px',
      maxHeight: `${type === '查看' ? 752 : 812}px`,
    }"
    @ok="upsertWallpaper"
  >
    <div flex="~ col gap1">
      <ZInput
        v-model="form.name"
        label="名称"
        placeholder="请输入壁纸名称"
        required :readonly
        :rules="[
          val => (!val && '请输入壁纸名称') || true,
        ]"
      />
      <ZSelect
        v-model="form.categoryId"
        label="分类"
        placeholder="请选择分类"
        required :readonly
        :options="categorys"
        option-label="name"
        option-value="id"
        :rules="[
          val => (!val && '请选择分类') || true,
        ]"
      />
      <div flex="~ col gap1" mb5>
        <ZLabel required label="壁纸" />
        <div v-if="!readonly || !(form.name && form.categoryId)">
          <ZUpload
            v-model="images"
            type="secondary"
            :params="{
              readonly,
            }"
            :multiple="false"
            w-30
          >
            <div
              v-if="!form.url"
              flex="~ col gap2 center"
              w-30 h-40 b-rd-2
              border="1px dashed gray-5"
            >
              <div text="6 grey-5" i-ph:plus />
              <div text="grey-5" v-text="'上传壁纸'" />
            </div>
            <div
              v-else flex="~ col gap2 center" w-30 h-40 relative overflow-hidden b-rd-2
            >
              <q-img loading="lazy" full :src="form.url" />
            </div>
          </ZUpload>
          <ZImgCropper
            v-model="images"
            @callback="uploadFile"
          />
        </div>
        <div
          v-else flex="~ col gap2 center" w-30 h-40
          relative overflow-hidden b-rd-2
        >
          <q-img loading="lazy" full :src="form.url" />
        </div>
      </div>
      <ZInput
        v-model="size"
        label="大小"
        placeholder="请输上传壁纸"
        readonly
      />
    </div>
  </ZDialog>
</template>
