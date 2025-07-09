<script setup lang="ts">
import { cloneDeep } from 'lodash'
import { Notify } from 'quasar'
import type { ICategory, IUpsertCategoryBodyDto } from 'types'
import { objectPick, pathExtName, randomString } from 'utils'
import { validateDesc } from 'shared/utils/validator/order'

interface CategoryDialogProps {
  /**
   * 分类对话框的操作类型
   */
  type?: DialogType
  /**
   * 分类信息
   */
  category?: ICategory
  /**
   * 在更新插入分类后的回调
   */
  onCallback?: () => void
}

const props = defineProps<CategoryDialogProps>()
const emits = defineEmits<{
  /**
   * 更新分类对话框的操作类型
   */
  'update:type': [CategoryDialogProps['type']]
}>()

/** 对话框 */
const dialog = computed({
  get() {
    const { type, category } = props
    return type === '添加' || (!!type && !!category)
  },
  set() {
    emits('update:type', undefined)
  },
})
/** 是否只读 */
const readonly = computed(() => props.type === '查看')
/** 分类初始化数据 */
const initData: IUpsertCategoryBodyDto = {
  name: '',
  url: '',
  status: true,
}
/** 分类表单 */
const form = ref(cloneDeep(initData))
/** 加载中 */
const loading = ref(false)
/** 待裁剪的图片 */
const images = ref<File | File[]>()

watch(
  dialog,
  (newVal) => {
    if (newVal) {
      const { type, category } = props
      if (type === '添加')
        form.value = cloneDeep(initData)

      else if (category)
        form.value = objectPick(category, 'name', 'url', 'order', 'desc', 'status')
    }
  },
)

/** 禁用提交 */
const disable = computed(() => {
  const { name, url, desc } = form.value
  return !name || !url || (!desc && !!validateRoleDesc(desc))
})

/**
 * 创建/更新分类
 */
async function upsertCategory() {
  if (disable.value)
    return

  const { type, category, onCallback } = props

  if (type === '添加')
    await categoryCreateApi(form.value)
  else if (type === '编辑')
    await categoryUpdateApi(form.value, category!.id)

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

  loading.value = true

  try {
    const url = await fileUploadApi(
      { path: `category_cover/${randomString(24, 24, '')}${pathExtName(file.name)}` },
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
    :title="`${type}分类`"
    confirm-text="保存"
    :loading="loading"
    :footer="!readonly" scroll
    :disable-confirm="disable"
    :wrapper-style="{
      width: '900px',
      maxWidth: '900px',
      maxHeight: `${type === '查看' ? 752 : 812}px`,
    }"
    @ok="upsertCategory"
  >
    <div flex="~ col gap1">
      <ZInput
        v-model="form.name"
        label="名称"
        placeholder="请输入分类名称"
        required :readonly
        :rules="[
          val => (!val && '请输入分类名称') || true,
        ]"
      />
      <div flex="~ col gap1" mb5>
        <ZLabel required label="封面" />
        <div flex="~ gap4">
          <ZImg v-model="form.url" :readonly width="120" height="160" />
          <div v-if="!readonly">
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
                flex="~ col gap2 center"
                w-30 h-40 b-rd-2
                border="1px dashed gray-5"
              >
                <div text="6 grey-5" i-mingcute:add-line />
                <div text="grey-5" v-text="'上传封面'" />
              </div>
            </ZUpload>
            <ZImgCropper
              v-model="images"
              @callback="uploadFile"
            />
          </div>
        </div>
      </div>
      <ZInput
        v-model="form.order"
        label="排序"
        placeholder="请输入排序"
        type="number"
        :min="1" :max="9999"
        :readonly mb5
      />
      <div flex="~ col gap1">
        <ZLabel
          label="专题精选"
        />
        <div flex="~ gap10" my3>
          <ZRadio
            :model-value="form.status?.toString()"
            label="是" val="true" :disable="readonly"
            @update:model-value="form.status = true"
          />
          <ZRadio
            :model-value="form.status?.toString()"
            label="否" val="false" :disable="readonly"
            @update:model-value="form.status = false"
          />
        </div>
      </div>
      <ZInput
        v-model="form.desc"
        label="描述"
        placeholder="请输入描述（200字以内）"
        :readonly
        type="textarea"
        :rules="[
          val => val && validateDesc(val) || true,
        ]"
      />
    </div>
  </ZDialog>
</template>
