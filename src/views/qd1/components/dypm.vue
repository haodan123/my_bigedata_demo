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
  let alldata = [
    {
      name: '一单元',
      value: 301
    },
    {
      name: '二单元',
      value: 304
    },
    {
      name: '三单元',
      value: 402
    },
    {
      name: '四单元',
      value: 206
    },
    {
      name: '五单元',
      value: 0
    }
  ]
  const datavalue = alldata.map(item => item.value)
  var virtualData = []

  // 创建虚拟柱子的数据
  for (var i = 0; i < datavalue.length; i++) {
    if (datavalue[i] === 0) {
      virtualData.push({
        value: 500, // 虚拟柱子的高度
        itemStyle: {
          color: 'rgba(255, 255, 255, 0.05)', // 虚拟柱子的颜色和透明度
          // borderType: 'dashed',
          borderWidth: 2
          // borderColor: 'rgba(220, 220, 220, 0.8)'
        }
      })
    } else {
      virtualData.push({
        value: datavalue[i]
      })
    }
  }

  let initOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      formatter: function (params) {
        // var result = params[0].name + '<br/>'
        var result = ''
        params.forEach(function (item) {
          // console.log(item.value,item);
          if (item.value != 500) {
            result += item.name + ': ' + item.value+'头' + ' <br/>'
          } else {
            result += item.name + ': ' + 0+'头' + ' <br/>'
          }
        })

        return result
      }
    },
    grid: {
      top: '20%',
      right: '0%',
      left: '0%',
      bottom: '0%',
      containLabel: true
    },
    legend: {
      show: false,
      textStyle: {
        color: '#fff'
      }
    },
    xAxis: [
      {
        type: 'category',
        data: alldata.map(item => item.name),
        axisLine: {
          lineStyle: {
            color: 'rgba(66, 192, 255, .3)'
          }
        },
        axisLabel: {
          interval: 0,
          margin: 10,
          color: '#5B6873',
          fontSize: 11
        },
        axisTick: {
          //刻度
          show: false
        }
      }
    ],
    yAxis: [
      {
        name: '(头)',
        nameLocation: 'end',
        nameTextStyle: {
          color: '#5B6873'
        },
        axisLine: {
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.5)' // 分割线颜色透明
          }
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: '#0a3256'
          }
        },
        axisTick: {
          show: false
        }
      }
    ],
    series: [
      {
        // name: '月K',
        type: 'bar',
        data: virtualData,
        // barWidth: '5',
        barWidth: '10%',
        // itemStyle: {
        //   color: '#C19E61',
        //   // shadowColor: 'rgba(5, 213, 255, 1)',
        //   shadowBlur: 4
        // }
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
