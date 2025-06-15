<script setup lang="ts">
import type { ECharts } from 'echarts/core'
import type { ICategoryDownloadCountResData } from 'shared/api/log'

const { init } = useECharts()

const chartEl = ref<HTMLElement>()
let instance: ECharts | undefined

/** 加载中 */
const loading = ref(false)
/** 空状态 */
const empty = ref(true)
/** 图表数据 */
const chartData = ref<ICategoryDownloadCountResData>()

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
    tooltip: {
      ...ECHARTS_TOOLTIP,
      trigger: 'axis',
    },
    grid: ECHARTS_GRID,
    dataZoom: ECHARTS_DATA_ZOOM,
    xAxis: ECHARTS_X_AXIS,
    yAxis: ECHARTS_Y_AXIS,
    series: [],
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
        text: '各分类壁纸下载次数统计',
      },
      xAxis: {
        data: chartData.value?.header,
        name: '分类',
      },
      yAxis: {
        name: '下载次数',
      },
      series: [{
        type: 'bar',
        data: chartData.value?.data,
        itemStyle: {
          borderRadius: [4, 4, 0, 0],
        },
      }],
    },
  )
}

/**
 * 获取数据
 */
async function loadData() {
  loading.value = true
  try {
    const res = await getCategoryDownloadCountApi()
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
    flex="~ sm:2 1" b="1 grey-3"
    relative b-rd-2 overflow-hidden p-4
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
