<script lang="ts" setup>
import { Config } from 'types'
import { Notify } from 'quasar'
import { cloneDeep } from 'lodash'
import { isExist, objectPick } from 'utils'
import type { IConfigDto, IUser } from 'types'
import { validateDownloadLimit } from 'shared/utils/validator/permission'

export type DownloadConfigDialogType = '下载' | '全局'

interface DownloadConfigDialogProps {
  /**
   * 下载配置对话框的操作类型
   */
  type?: DownloadConfigDialogType
  /**
   * 已选的用户列表
   */
  users?: IUser[]
  /**
   * 修改用户下载配置后的回调
   */
  onCallback?: () => void
}

const props = defineProps<DownloadConfigDialogProps>()
const emits = defineEmits<{
  /**
   * 更新下载配置对话框的操作类型
   */
  'update:type': [DownloadConfigDialogProps['type']]
}>()

const { wallpaperDownload } = useSysConfig()

/** 对话框 */
const dialog = computed({
  get() {
    const { type, users } = props
    return type === '全局' || (!!type && !!users?.length)
  },
  set() {
    emits('update:type', undefined)
  },
})
/** 下载配置表单 */
const form = ref<Required<IConfigDto>[Config.DOWNLOAD_LIMIT
]>({})

watch(
  dialog,
  async (newVal) => {
    if (newVal) {
      const { type, users } = props
      if (type === '全局') {
        form.value = cloneDeep(wallpaperDownload.value)
      }
      else {
        if (users?.length === 1)
          form.value = objectPick(users[0], 'downloadLimit')
        else
          form.value = {}
      }
    }
  },
)

/** 禁用提交 */
const disable = computed(() => {
  const { type } = props
  const { downloadLimit } = form.value
  return ((type === '全局' || typeof downloadLimit === 'number') && !!validateDownloadLimit(downloadLimit))
})

/**
 * 创建/更新数据表格下载配置
 */
async function upsertDownloadConfig() {
  if (disable.value)
    return

  const { type, users, onCallback } = props
  if (type === '下载') {
    const { downloadLimit } = form.value
    await userDownloadConfigApi({
      ids: users!.map(v => v.id),
      downloadLimit,
    })
    onCallback?.()
  }
  else if (type === '全局') {
    await sysConfigUpsertApi(
      Config.DOWNLOAD_LIMIT,
      {
        [Config.DOWNLOAD_LIMIT]: form.value,
      },
    )
    wallpaperDownload.value = form.value
  }

  Notify.create({
    type: 'success',
    message: '修改成功',
  })
}
</script>

<template>
  <ZDialog
    v-model="dialog"
    :title="`${type}配置`"
    confirm-text="保存"
    footer
    :disable-confirm="disable"
    @ok="upsertDownloadConfig"
  >
    <ZInput
      v-model="form.downloadLimit"
      label="下载壁纸次数限制"
      placeholder="请输入下载次数限制"
      explain="该用户下载次数超过该值时，将无法再次下载"
      type="number"
      :min="0" :max="100"
      :required="type === '全局'"
      :rules="[
        val => type === '下载' && !isExist(val) || validateDownloadLimit(val) || true,
      ]"
    />
  </ZDialog>
</template>
