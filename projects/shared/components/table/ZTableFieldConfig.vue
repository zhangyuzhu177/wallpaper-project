<script lang="ts" setup>
import type { QTableColumn } from 'quasar'
import { computed, ref, watch } from 'vue'

import ZBtn from '../btn/ZBtn.vue'
import ZDialog from '../dialog/ZDialog.vue'
import ZCheckbox from '../checkbox/ZCheckbox.vue'

export interface ZTableFieldConfigProps {
  /**
   * 表格字段配置绑定的值
   */
  modelValue?: string[]
  /**
   * 表格列
   */
  cols?: QTableColumn[]
  /**
   * 需要排除的字段名
   */
  exclude?: string[]
}

const props = defineProps<ZTableFieldConfigProps>()
const emits = defineEmits<{
  /**
   * 更新表格字段配置绑定的值
   */
  'update:modelValue': [ZTableFieldConfigProps['modelValue']]
}>()

/** 对话框 */
const dialog = ref(false)
/** 已选字段 */
const selected = ref<string[]>()

watch(
  dialog,
  (value) => {
    if (value) {
      const { modelValue, exclude } = props
      selected.value = modelValue?.filter(v => !exclude?.includes(v))
    }
  },
)

/** 表格列 */
const columns = computed(() => {
  const { cols, exclude } = props
  return cols?.filter(({ name }) => !exclude?.includes(name))
})

/**
 * 更新字段
 */
function updateFields() {
  const { modelValue, exclude } = props
  const fields = modelValue?.filter(v => exclude?.includes(v)) ?? []
  emits('update:modelValue', [...(selected.value ?? []), ...fields])
}
</script>

<template>
  <div class="z-table-field-config">
    <ZBtn
      label="字段配置"
      icon="set"
      type="third"
      @click="dialog = true"
    />

    <ZDialog
      v-model="dialog"
      title="字段配置"
      footer
      :disable-confirm="!selected?.length"
      :wrapper-style="{
        width: '640px',
        maxWidth: '640px',
      }"
      @ok="updateFields"
    >
      <div flex="~ col gap4">
        <ZCheckbox
          :model-value="
            columns?.every(col => selected?.includes(col.name))
              ? true
              : columns?.some(col => selected?.includes(col.name))
                ? null
                : false
          "
          label="全选" self-start
          @update:model-value="(val) => {
            if (val)
              selected = columns?.map(col => col.name)
            else
              selected = []
          }"
        />
        <div
          grid gap="x6 y4"
          cols="2 sm:3 md:4"
        >
          <div
            v-for="col in columns"
            :key="col.name"
          >
            <ZCheckbox
              v-model="selected"
              :label="col.label"
              :val="col.name"
              max-w-full
            />
          </div>
        </div>
      </div>
    </ZDialog>
  </div>
</template>
