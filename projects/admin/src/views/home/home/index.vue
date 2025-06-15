<script setup lang="ts">
import ChartCategoryDowCount from './analyse/ChartCategoryDowCount.vue'
import ChartCategoryWallCount from './analyse/ChartCategoryWallCount.vue'
import ChartUserActionCount from './analyse/ChartUserActionCount.vue'
</script>

<template>
  <div class="flex flex-col gap-4 full">
    <div flex="~ gap4 1 sm:row col">
      <ChartCategoryDowCount />
      <ChartCategoryWallCount />
    </div>
    <ChartUserActionCount />
  </div>
</template>
