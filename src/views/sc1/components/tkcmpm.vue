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
  let data = [
    {
      name: '塘口一',
      value: '234'
    },
    {
      name: '塘口二',
      value: '204'
    },
    {
      name: '塘口三',
      value: '134'
    },
    {
      name: '塘口四',
      value: '104'
    }
  ]
  let maxValue = 250
  let yData = data.map(it => it.name)
  let xData = data.map(it => it.value)
  let salvProMax = Array(xData.length).fill(maxValue * 1.2)
  let initOption = {
    // backgroundColor: '#01102e',
    tooltip: {
      trigger: 'axis',
      borderColor: '#62FFFF',
      formatter: ' {b}     {c}',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '',
      top: '7%',
      right: '',
      bottom: '',
      containLabel: false
    },
    xAxis: {
      type: 'value',
      show: false,
      max: maxValue * 1.2
    },
    legend: {
      show: false
    },
    yAxis: {
      type: 'category',
      inverse: true,
      axisLabel: {
        show: true,
        margin: 15,
        color: '#fff',
        fontSize: 12,
        // 调整左侧文字的3个属性，缺一不可
        verticalAlign: 'bottom',
        align: 'top',
        //调整文字上右下左
        padding: [0, 0, 15, 15],
        formatter: function (name, idx) {
          return `${name}`
        }
      },
      splitLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      },
      data: yData
    },
    series: [
      {
        name: '存苗排名',
        type: 'bar',
        barWidth: 6,
        zlevel: 2,
        // showBackground: false,
        label: {
          show: false
        },
        data: xData,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            1,
            0,
            [
              {
                offset: 0,
                color: 'rgba(45,240,255,0)' // 0% 处的颜色
              },
              {
                offset: 1,
                color: '#2DF0FF' // 100% 处的颜色
              }
            ],
            false
          )
        }
      },
      {
        zlevel: 1,
        name: '',
        type: 'bar',
        barWidth: 14,
        barGap: '-160%',
        data: salvProMax,
        itemStyle: {
          color: 'rgba(131, 132, 132, 0)',
          // barBorderRadius: [7, 7, 7, 7],
          borderColor: 'rgba(160, 160, 160,0.5)',
          backgroundColot: '#fff'
        },
        backgroundStyle: {
          // color: 'rgba(0,0,0,0.8)'
          color: '#fff',
          // borderWidth: 2,
          borderColor: '#ffbc20'
          // shadowColor: '#ffbc20',
          // shadowBlur: 30,
          // shadowOffsetX: 0,
          // shadowOffsetY: 0,
          // opacity: 0.9
        }
      }
    ]
  }
  chartInstance.value.setOption(initOption)
  readData()
}
const readData = async () => {
  const { data: res } = await requestGet(`breeding-pond/`)
  const resData = res
  // // // 对数据进行赋值
  updateChart(resData)
}
const updateChart = resData => {
  const xData = resData.map(item => item.stockedTailQuantity)
  const yData = resData.map(item => item.pondName)
  const maxValue = Math.ceil(Math.max(...xData)) //最大值
  let salvProMax = Array(xData.length).fill(maxValue * 1.2)

  console.log(maxValue)
  const dataOption = {
    yAxis: {
      data: yData
    },
    xAxis: {
      max: Math.ceil(maxValue * 1.2)
    },
    series: [
      {
        data: xData
      },
      {
        data: salvProMax
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
