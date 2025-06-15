<script setup lang="ts">
import type { ECharts } from 'echarts/core'
import type { ICategoryWallCountResData } from 'shared/api/log'

const { init } = useECharts()

const chartEl = ref<HTMLElement>()
let instance: ECharts | undefined

/** 加载中 */
const loading = ref(false)
/** 空状态 */
const empty = ref(true)
/** 图表数据 */
const chartData = ref<ICategoryWallCountResData[]>()

useResizeObserver(
  document?.body,
  useDebounceFn(() => {
    instance?.resize()
  }, 500),
)

/**
 * 初始化图表
 */
function initChart() {
  instance?.setOption({
    legend: ECHARTS_LEGEND,
    tooltip: ECHARTS_TOOLTIP,
  })
}

/**
 * 渲染图表
 */
function renderChart() {
  if (empty.value || !chartData.value)
    return
  instance?.setOption(
    {
      title: {
        text: '分类壁纸占比分布',
        left: 'center',
      },
      legend: {
        orient: 'vertical',
        left: 'left',
      },
      series: {
        ...ECHARTS_PIE,
        data: chartData.value.map(item => ({
          name: item.label,
          value: item.value,
        })),
      },
    },
  )
}

/**
 * 获取数据
 */
async function loadData() {
  loading.value = true
  try {
    const res = await getCategoryWallCountApi()
    chartData.value = res
    empty.value = false
  }
  catch (_) {
    empty.value = true
  }
  finally {
    loading.value = false
    if (!empty.value)
      renderChart()
  }
}

onMounted(() => {
  instance = init(chartEl.value, 'default')
  nextTick(initChart)
  loadData()
})
</script>

<template>
  <div
    flex="~ 1" b="1 grey-3" b-rd-2
    relative overflow-hidden p-4
  >
    <ZLoading v-model="loading" />

    <div
      v-if="empty"
      absolute inset-0
      bg-grey-1 z-1
    >
      <ZEmpty
        label="暂无数据"
        absolute-center
      />
    </div>

    <div ref="chartEl" flex-1 />
  </div>
</template>
