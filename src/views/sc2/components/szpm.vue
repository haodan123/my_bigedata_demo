<template>
  <div class="main-box" style="width: 100%; height: 100%; display: flex">
    <div class="main-content" ref="chartRef" style="width: 100%; height: 100%"></div>
  </div>
</template>

<script setup>
import { debounce } from '@/utils/index.js'

import { requestGet } from '@/api/index.js'
import { ref, onMounted, onUnmounted, markRaw } from 'vue'
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
  chartInstance.value = markRaw(echarts.init(chartRef.value))
  let data = [20, 15, 12, 5, 26, 23, 25]
  let className = ['1号', '2号', '3号', '4号', '5号', '6号', '7号']
  let initOption = {
    tooltip: {
      trigger: 'item'
      // formatter: '{b} :  ({c}%)'
    },
    legend: {
      show: false
    },
    // backgroundColor: '#000',
    grid: {
      left: 0,
      right: 0,
      bottom: 0,
      top: '5%',
      containLabel: true
    },
    xAxis: [
      {
        show: true,
        type: 'category',
        data: className,
        axisTick: {
          show: false
        },
        //   x轴名称
        axisLabel: {
          show: true,
          color: 'rgba(194, 194, 194, 1)',
          fontSize: 12
        },
        //   横轴的线
        axisLine: {
          show: true,
          lineStyle: {
            color: 'rgba(255,255,255,0.3)',
            type: 'solid'
          }
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        axisLabel: {
          show: false
        },
        splitLine: {
          show: false,
          lineStyle: {
            color: 'rgba(255,255,255,0.1)',
            type: 'solid'
          }
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        }
      }
    ],
    series: [
      {
        name: '水质排名',
        type: 'bar',
        zlevel: 1,
        showBackground: true,
        label: {
          show: false
        },
        itemStyle: {
          // normal: {
          color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
            {
              offset: 0,
              color: '#8BD2FB'
            },
            {
              offset: 1,
              color: '#8BD2FB'
            }
          ])
          // }
        },
        barWidth: 6, //柱宽
        data: data
      }
    ]
  }
  chartInstance.value.setOption(initOption)
  readData()
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
