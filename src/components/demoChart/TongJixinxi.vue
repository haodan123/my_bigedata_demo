<template>
  <div class="main-box" style="width: 100%; height: 100%">
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
  chartInstance.value = markRaw(echarts.init(chartRef.value))
  let initOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{b} : {c}头 ({d}%)'
      // formatter: "{b} :  ({d}%)",
    },
    legend: {
      // data: ["男", "女"],
      orient: 'vertical',
      left: '5%',
      bottom: '5%',
      icon: 'roundRect',
      show: true,
      itemWidth: 25,
      itemHeight: 8,
      padding: [60, 0, 0, 0],
      textStyle: {
        color: '#7cc4ec'
      }
    },
    visualMap: {
      show: false,
      min: 500,
      max: 600,
      inRange: {
        //colorLightness: [0, 1]
      }
    },
    series: [
      {
        // name: "人力投入",
        type: 'pie',
        radius: '70%',
        center: ['55%', '50%'],
        color: ['#00bdff', '#5ae1ea', '#4A4DED', '#547CF3', '#ffea51', '#ffa74d', '#ff4949'], //'#FBFE27','rgb(11,228,96)','#FE5050'
        data: [
          {
            value: 10,
            name: '种公牛'
          },
          {
            value: 173,
            name: '种母牛'
          },
          {
            value: 849,
            name: '奶牛'
          },
          {
            value: 182,
            name: '肉牛'
          }
        ].sort(function (a, b) {
          return a.value - b.value
        }),
        // roseType: "radius", //南丁格尔玫瑰图
        label: {
          formatter: ['{c|{d}%}', '{b|{b}}'].join('\n'),
          rich: {
            c: {
              color: '#0bffff',
              fontSize: 14,
              fontWeight: 'bold',
              lineHeight: 5
            },
            b: {
              color: '#fff',
              fontSize: 13,
              height: 40
            }
          }
        },
        labelLine: {
          lineStyle: {
            color: 'rgb(98,137,169)'
          },
          smooth: 0.2,
          length: 10,
          length2: 10
        },
        itemStyle: {
          shadowColor: 'rgba(6, 85, 208, 0.8)',
          shadowBlur: 40
        }
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
  // chartInstance.value.resize();
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
