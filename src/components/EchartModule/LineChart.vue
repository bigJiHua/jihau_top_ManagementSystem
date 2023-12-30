<template>
  <div ref="ChartTemplate" class="echarts-box"></div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue'
import * as echarts from 'echarts';

const ChartTemplate = ref<any>(null)

const props = defineProps({
  seriesData: {
    type: Array,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  xAxisData: {
    type: Object,
    required: true
  },
  yAxisData:{
    type: Object,
    requied: true
  },
  legendData: {
    type: Object,
    required: true
  },
  toolboxData: {
    type: Object,
    required: true
  }
})

const myChart: any = ref(null)

const option = {
  title: {
    text: props.title
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: props.legendData
  },
  grid: {
    top: '8%',
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  toolbox: props.toolboxData,
  xAxis: props.xAxisData,
  yAxis: props.yAxisData,
  series: props.seriesData
}

const StackedAreaChart = () => {
  option.title.text = props.title
  option.legend.data = props.legendData
  option.xAxis = props.xAxisData
  option.yAxis = props.yAxisData
  option.series = props.seriesData
  myChart.value.setOption(option)
}

watch([props.seriesData, props.title, props.xAxisData, props.legendData], () => {
  StackedAreaChart()
})

onMounted(() => {
  myChart.value = echarts.init(ChartTemplate.value) // 使用 ChartTemplate.value[0] 引用第一个元素
  StackedAreaChart()
  window.onresize = () => {
    setTimeout(() => {
      //TODO 解决这个问题，使数据更新同时不让页面进行刷新 
      location.reload()
      myChart.value.resize()
    }, 1000)
  }
})
</script>

<style lang="less" scoped>
.echarts-box {
  border-radius: 8px;
  max-width: 42vw;
  max-height: 45vh;
  height: 100%;
  width: 100%;
  padding: 20px;
  margin-bottom: 20px;
  background-color: #fff;
}
</style>
