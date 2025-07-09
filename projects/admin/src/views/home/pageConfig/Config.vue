<script setup lang="ts">
import type { ICategory } from 'types'
import { pathExtName, randomId, randomString } from 'utils'

const { loading, bannerConfig } = useSysConfig()

/** 分类列表 */
const categorys = ref<ICategory[]>()

onBeforeMount(async () => {
  categorys.value = (await categoryQueryApi({
    pagination: {
      pageSize: 'all',
    },
    order: {
      order: 'desc',
    },
  })).data
})

/**
 * 上传图片
 */
async function uploadFile(file: File | File[], id: string) {
  if (!file)
    return
  if (Array.isArray(file))
    file = file[0]

  loading.value = true

  try {
    const url = await fileUploadApi(
      { path: `sys-config/banner/${randomString(24, 24, '')}${pathExtName(file.name)}` },
      file,
    )
    if (url && bannerConfig.value?.length) {
      const targetBanner = bannerConfig.value.find(item => item.id === id)
      if (targetBanner)
        targetBanner.url = url
    }
  }
  catch (_) { }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <div
    flex="~ 1 col gap4"
    rounded-10px
    bg-grey-1
    h="0 md:full"
    w="full md:0"
  >
    <div flex="~ justify-end">
      <ZTextBtn
        label="添加项"
        @click="bannerConfig?.push({
          id: randomId(),
          categoryId: '',
          url: '',
          tempImage: undefined,
        })"
      />
    </div>
    <div flex="~ col 1 gap4" p-2 h-0 overflow-auto>
      <div
        v-for="(item, index) in bannerConfig" :key="item.id"
        flex="~ col gap1" p-2 b-rd-1
        :style="{
          boxShadow: '4px 0px 12px -2px #0000001F, 2px 0px 8px -2px #0000000A',
        }"
      >
        <div flex="~ justify-between">
          <div subtitle-2 v-text="`列表项 ${index + 1}`" />
          <ZIconBtn
            icon="i-mingcute:close-line"
            :disable="bannerConfig!.length === 1"
            @click="() => {
              if (bannerConfig!.length !== 1)
                bannerConfig?.splice(index, 1)
            }"
          />
        </div>
        <div>
          <ZSelect
            v-model="item.categoryId"
            label="分类"
            placeholder="请选择分类"
            required
            :options="categorys"
            option-label="name"
            option-value="id"
            :rules="[
              val => (!val && '请选择分类') || true,
            ]"
          />
          <div flex="~ col gap1" mb1>
            <ZLabel required label="壁纸" />
            <div flex="~ gap4">
              <ZImg
                v-model="item.url"
                width="200"
                height="120"
              />
              <div>
                <ZUpload
                  v-model="item.tempImage"
                  type="secondary"
                  :multiple="false"
                  w-30
                >
                  <div
                    flex="~ col gap2 center"
                    w-50 h-30 b-rd-2
                    border="1px dashed gray-5"
                  >
                    <div text="6 grey-5" i-mingcute:add-line />
                    <div text="grey-5" v-text="'上传壁纸'" />
                  </div>
                </ZUpload>
                <ZImgCropper
                  v-model="item.tempImage"
                  @callback="(val) => uploadFile(val, item.id)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
