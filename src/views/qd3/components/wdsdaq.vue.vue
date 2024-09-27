<template>
  <div class="main-box" style="width: 100%; height: 100%">
    <div class="main-content" ref="chartRef" style="width: 100%; height: 100%"></div>
  </div>
</template>

<script setup>
import { debounce } from '@/utils/index.js'

import { requestGet } from '@/api/index.js'
import { ref, onMounted, onUnmounted,markRaw } from 'vue'
import * as echarts from 'echarts'
const chartRef = ref()
const chartInstance = ref()
onMounted(() => {
  initChart()
  window.addEventListener('resize', screenAdapter)
})
onUnmounted(() => {
  chartInstance.value.dispose()
  window.removeEventListener('resize', screenAdapter)
})

const initChart = async () => {
  // console.log(chartRef.value);
  chartInstance.value =markRaw(echarts.init(chartRef.value)) 
  let initOption = {
    title: {
      // text: '单位：(万元)',
      textStyle: {
        color: 'rgba(131, 162, 192, 1)',
        fontSize: 12
      },
      top: '4%',
      left: '2%'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['湿度', '温度','氨气'],
      icon: 'rich',
      show: true,
      itemWidth: 18,
      itemHeight: 2,
      textStyle: {
        color: '#AFBDD1',
        fontSize: '12px'
      },
      top: '0%',
      right: 10,
      itemGap: 34
    },
    grid: {
      left: '4%',
      right: '4%',
      bottom: '10%',
      top: '16%',
      containLabel: true
    },
    xAxis: {
      data: [2016, 2018, 2020, 2022, 2024],
      type: 'category',
      boundaryGap: false,
      axisLine: {
        symbol: 'none',
        lineStyle: {
          color: '#50637A'
        }
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        interval: 0,
        color: '#6071A9',
        fontSize: 12,
        padding: [10, 0, 0, 0]
      }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: '#6071A9',
        fontSize: 12,
        padding: [0, 10, 0, 0]
      },
      splitLine: {
        lineStyle: {
          color: '#50637A',
          type: 'dashed'
        }
      }
    },
    series: [
      {
        name: '温度',
        type: 'line',
        data: [ 7, 7, 8, 9, 2],
        smooth: true,
        color: '#1D87F0',
        lineStyle: {
          width: 2
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: 'rgba(29, 135, 240, 0.6)'
              },
              {
                offset: 0.8,
                color: 'rgba(29, 135, 240, 0.2)'
              }
            ],
            false
          ),
          shadowColor: 'rgba(0, 0, 0, 0.1)',
          shadowBlur: 10
        },
        symbol: 'circle',
        symbolSize: 6
      },
      {
        name: '湿度',
        data: [1, 2, 3, 4,  20],
        type: 'line',
        smooth: true,
        color: '#00F7FF',
        lineStyle: {
          width: 2
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: 'rgba(0, 247, 255, .6)'
              },
              {
                offset: 0.8,
                color: 'rgba(0, 247, 255, .2)'
              }
            ],
            false
          ),
          shadowColor: 'rgba(0, 0, 0, 0.1)',
          shadowBlur: 10
        },
        symbol: 'circle',
        symbolSize: 6
      },
      {
        name: '氨气',
        data: [2,  7, 8, 4, 10],
        type: 'line',
        smooth: true,
        color: '#CFAC69',
        lineStyle: {
          width: 2
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: 'rgba(207, 172, 105, .6)'
              },
              {
                offset: 0.8,
                color: 'rgba(207, 172, 105, .2)'
              }
            ],
            false
          ),
          shadowColor: 'rgba(0, 0, 0, 0.1)',
          shadowBlur: 10
        },
        symbol: 'circle',
        symbolSize: 6
      }
    ]
  }

  chartInstance.value.setOption(initOption)
  // readData()
}
const readData = async () => {
  // const {
  //   data: res
  // } = await requestGet(`cl?jid=0`)
  // const resData = res
  // // // 对数据进行赋值
  // updateChart(resData)
}
const updateChart = resData => {
  const timeArr = resData.map(item => item.year)
  const chulan = resData.map(item => item.cl)
  const cunlan = resData.map(item => item.cl)
  const dataOption = {
    xAxis: {
      data: timeArr
    },
    series: [
      {
        data: chulan
      },
      {
        data: cunlan
      }
    ]
  }
  chartInstance.value.setOption(dataOption)
}

const screenAdapter = debounce(() => {
  const titleFontSize = (chartRef.value.offsetWidth / 100) * 3.6
  // this.titleFontSize = titleFontSize;
  const adapterOption = {
    title: {
      fontSize: titleFontSize
    },
    // 图例的大小
    legend: {
      itemWidth: titleFontSize / 2,
      itemHeight: titleFontSize / 2,
      itemGap: titleFontSize / 2,
      fontSize: titleFontSize / 2,
      color: '#FFFFFF'
    }
  }
  chartInstance.value.setOption(adapterOption)
  chartInstance.value.resize()
})
</script>

<style scoped lang="scss">
.main-box {
  width: 100%;
  height: 100%;
}

.main-content {
  width: 100%;
  height: 100%;

}
</style>
