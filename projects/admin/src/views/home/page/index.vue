<script setup lang="ts">
import ElementList from './ElementList.vue'
import Config from './Config.vue'
import menuIcon from '~/assets/icons/menu.svg?raw'

const { width } = useWindowSize()
const { loading, getBannerConfig } = useSysConfig()

onBeforeMount(getBannerConfig)
</script>

<template>
  <div
    full relative
    flex="~ col gap4 md:row"
  >
    <ZLoading v-model="loading" />

    <ZIconBtn v-if="width < 1240" self-start>
      <div v-html="menuIcon" />
      <q-popup-proxy
        anchor="top left"
        :offset="[16, 8]"
        :breakpoint="0"
        transition-show="slide-right"
        transition-hide="slide-left"
        shadow-none overflow-visible
        bg-transparent z-998
      >
        <ElementList />
      </q-popup-proxy>
    </ZIconBtn>
    <ElementList v-else />

    <Config />
  </div>
</template>
