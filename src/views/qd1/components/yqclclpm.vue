<template>
  <div class="main-box" style="width: 100%; height: 100%">
    <div class="main-content" ref="chartRef" style="width: 100%; height: 100%"></div>
  </div>
</template>

<script setup>
import { debounce } from '@/utils/index.js'

import { requestGet } from '@/api/index.js'
import { ref, onMounted, onUnmounted ,markRaw} from 'vue'
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
  let dateArr = ['一单元', '二单元', '三单元', '四单元']
  let wzArr = [457, 424, 520, 359]
  let gzhArr = [57, 24, 20, 59]
  let initOption = {
    grid: {
      left: '15%',
      right: '12%',
      top: '5%',
      bottom: '5%'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      show: false,
      left: 'center',
      top: 10,
      color: '#fff',
      fontSize: 12
    },
    xAxis: {
      type: 'value',
      // "max": max,
      show:false,
      splitLine: {
        show: true,
        lineStyle: {
          color: '#232e32'
        }
      },
      axisLine: {
        show: false
      },
      axisLabel: {
        show: true,
        color: '#fff',
      fontSize: 12,
      },
    
      axisTick: {
        show: false
      }
    },
    yAxis: [
      {
        type: 'category',
        inverse: true,
        data: dateArr,
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          // "margin": 10,
          color: '#fff',
          fontSize: 12,
          padding: [0, 0, 0, 100] // 上右下左与原位置距离
        },
        textStyle: {
       
        }
      }
    ],
    series: [
      {
        //内
        type: 'bar',
        // barWidth: 5,
        barWidth: '15%',
        barGap: 0.5,
        name: '存栏',
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [
              {
                offset: 0,
                color: '#777777' // 0% 处的颜色
              },
              {
                offset: 1,
                color: '#DDDDDD' // 100% 处的颜色
              }
            ],
            globalCoord: false // 缺省为 false
          } //底色
        },
        data: wzArr
      },
      {
        //内2
        type: 'bar',
        // barWidth: 5,
        barWidth: '15%',

        name: '出栏',
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [
              {
                offset: 0,
                color: '#442D1E' // 0% 处的颜色
              },
              {
                offset: 1,
                color: '#E6C175' // 100% 处的颜色
              }
            ],
            globalCoord: false // 缺省为 false
          } //底色
        },
        data: gzhArr
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
