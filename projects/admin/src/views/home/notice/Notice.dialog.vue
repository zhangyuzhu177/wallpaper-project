<script lang="ts" setup>
import moment from 'moment'
import { Notify } from 'quasar'
import { cloneDeep } from 'lodash'
import { objectPick } from 'utils'
import type { INotice, IUpsertNoticeBodyDto } from 'types'

interface NoticeDialogProps {
  /**
   * 公告对话框的操作类型
   */
  type?: DialogType
  /**
   * 公告信息
   */
  notice?: INotice
  /**
   * 在更新插入公告后的回调
   */
  onCallback?: () => void
}

const props = defineProps<NoticeDialogProps>()
const emits = defineEmits<{
  /**
   * 更新公告对话框的操作类型
   */
  'update:type': [NoticeDialogProps['type']]
}>()

/** 对话框 */
const dialog = computed({
  get() {
    const { type, notice } = props
    return type === '添加' || (!!type && !!notice)
  },
  set() {
    emits('update:type', undefined)
  },
})
/** 是否只读 */
const readonly = computed(() => props.type === '查看')
/** 公告初始化数据 */
const initData: IUpsertNoticeBodyDto = {
  title: '',
  content: '',
  date: moment().format('YYYY-MM-DD HH:mm'),
  status: true,
}
/** 公告表单 */
const form = ref(cloneDeep(initData))

watch(
  dialog,
  (newVal) => {
    if (newVal) {
      const { type, notice } = props
      if (type === '添加') {
        form.value = cloneDeep(initData)
      }
      else if (notice) {
        form.value = objectPick(notice, 'title', 'content', 'order', 'date', 'status')
        form.value.date = moment(form.value.date).format('YYYY-MM-DD HH:mm')
      }
    }
  },
)

/** 禁用提交 */
const disable = computed(() => {
  const { title, content, date } = form.value
  return !title || !content || !date
})

/**
 * 创建/更新公告
 */
async function upsertNotice() {
  if (disable.value)
    return

  const { type, notice, onCallback } = props

  if (type === '添加')
    await noticeCreateApi(form.value)
  else if (type === '编辑')
    await noticeUpdateApi(notice!.id, form.value)

  Notify.create({
    type: 'success',
    message: `${type}成功`,
  })
  onCallback?.()
}
</script>

<template>
  <ZDialog
    v-model="dialog"
    :title="`${type}公告`"
    confirm-text="保存"
    :footer="!readonly" scroll
    :disable-confirm="disable"
    :wrapper-style="{
      width: '900px',
      maxWidth: '900px',
      maxHeight: `${type === '查看' ? 752 : 812}px`,
    }"
    @ok="upsertNotice"
  >
    <div flex="~ col gap1">
      <ZInput
        v-model="form.title"
        label="标题"
        placeholder="请输入公告标题"
        required :readonly
        :rules="[
          val => (!val && '请输入公告标题') || true,
        ]"
      />
      <ZInput
        v-model="form.content"
        label="内容"
        placeholder="请输入公告内容"
        required :readonly
        type="textarea"
        :rules="[
          val => (!val && '请输入公告内容') || true,
        ]"
      />
      <ZInput
        v-model="form.order"
        label="排序"
        placeholder="请输入排序"
        type="number"
        :min="1" :max="9999"
        :readonly mb5
      />
      <ZDate
        v-model="form.date"
        label="日期"
        placeholder="请选择公告日期"
        required :readonly
        type="dateTime" mb5
        :params="{ teleport: true }"
      />
      <div flex="~ col gap1">
        <ZLabel
          label="公告状态"
        />
        <div flex="~ gap10" my3>
          <ZRadio
            :model-value="form.status?.toString()"
            label="正常" val="true" :disable="readonly"
            @update:model-value="form.status = true"
          />
          <ZRadio
            :model-value="form.status?.toString()"
            label="禁用" val="false" :disable="readonly"
            @update:model-value="form.status = false"
          />
        </div>
      </div>
    </div>
  </ZDialog>
</template>
