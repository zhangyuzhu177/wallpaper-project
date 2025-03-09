<script setup lang="ts">
import { Notify } from 'quasar'
import { Config, PermissionType } from 'types'
import menuIcon from '~/assets/icons/menu.svg?raw'

const { width } = useWindowSize()
const { hasPermission } = useAdmin()
const {
  bannerConfig,
  bannerData,
  loading,
  getBannerConfig,
} = useSysConfig()

/**
 * 是否可更新
 */
const isEdit = hasPermission(PermissionType.CONFIG_UPSERT)

/** 底部操作栏按钮尺寸 */
const size = computed(() => width.value < 600 ? 'small' : 'big')

const disable = computed(() => {
  if (!bannerConfig.value?.length)
    return true
  for (const config of bannerConfig.value) {
    if (!config.url || !config.categoryId)
      return true
  }

  if (JSON.stringify(bannerData.value) === JSON.stringify(bannerConfig.value))
    return true

  return false
})

/**
 * 更新配置
 */
async function upsert() {
  if (disable.value)
    return

  loading.value = true
  try {
    await sysConfigUpsertApi(
      Config.BANNER_CONFIG,
      {
        [Config.BANNER_CONFIG]: bannerConfig.value!,
      },
    )
    Notify.create({
      type: 'success',
      message: '修改成功',
    })

    await getBannerConfig()
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <div
    w112 min-w-76
    pt2 pr2 pb="4 lg:2" pl="4 lg:2"
    bg-grey-1 rounded-r-10px b="1 grey-3"
    lg="rounded-l-10px shadow-none!"
    flex="~ col gap2"
    :style="{
      height: width < 1240 ? 'calc(100vh - 80px)' : '100%',
      maxWidth: 'calc(100vw - 16px)',
      boxShadow: '4px 0px 12px -2px #0000001F, 2px 0px 8px -2px #0000000A',
    }"
  >
    <!-- 收起菜单按钮 -->
    <ZIconBtn
      v-if="width < 1240"
      v-close-popup
      :svg="menuIcon"
      self-start
    />

    <div flex="~ 1 col gap4" full>
      <div flex="~ 1 col gap2">
        <div subtitle-2 b-rd-1 p2 bg-primary-4>
          轮播图
        </div>
      </div>
      <div v-if="isEdit" flex="~ justify-end gap4">
        <ZBtn
          v-if="isEdit"
          label="更新" :size
          type="secondary"
          :disable
          flex-1 max-w="28 sm:35"
          @click="upsert"
        />
      </div>
    </div>
  </div>
</template>
