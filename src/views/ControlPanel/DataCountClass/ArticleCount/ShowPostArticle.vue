<template>
  <div id="" class="ShowPostArticle">
    <EchartsModule :seriesData="seriesData" :title="'文章统计表'" :toolboxData="toolboxData" :xAxisData="xAxisData"
      :yAxisData="yAxisData" :legendData="legendData">
    </EchartsModule>
  </div>
</template>

<script lang="ts" setup>
import EchartsModule from '@/components/EchartModule/LineChart.vue'
import { onMounted, ref, reactive } from 'vue';
const seriesData = [
  {
    name: 'Highest',
    type: 'line',
    data: [10, 11, 13, 11, 12, 12, 9],
    markPoint: {
      data: [
        { type: 'max', name: 'Max' },
        { type: 'min', name: 'Min' }
      ]
    },
    markLine: {
      data: [{ type: 'average', name: 'Avg' }]
    }
  },
  {
    name: 'Lowest',
    type: 'line',
    data: [1, -2, 2, 5, 3, 2, 0],
    markPoint: {
      data: [{ name: '周最低', value: -2, xAxis: 1, yAxis: -1.5 }]
    },
    markLine: {
      data: [
        { type: 'average', name: 'Avg' },
        [
          {
            symbol: 'none',
            x: '90%',
            yAxis: 'max'
          },
          {
            symbol: 'circle',
            label: {
              position: 'start',
              formatter: 'Max'
            },
            type: 'max',
            name: '最高点'
          }
        ]
      ]
    }
  }
]
const xAxisData = {
  type: 'category',
  boundaryGap: false,
  data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
}
const yAxisData = {
  type: 'value',
  axisLabel: {
    formatter: '{value} °C'
  }
}
const legendData = {}
const toolboxData = {
  show: true,
  feature: {
    dataZoom: {
      yAxisIndex: 'none'
    },
    dataView: { readOnly: false },
    magicType: { type: ['line', 'bar'] },
    restore: {},
    saveAsImage: {}
  }
}
</script>

<style lang="less" scoped>
.ShowPostArticle {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  height: 45vh;
  width: 42vw;
}

</style>
