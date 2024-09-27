<template>
  <div class="main-box" style="width: 100%; height: 100%">
    <div class="main-content" ref="chartRef" style="width: 100%; height: 100%"></div>
  </div>
</template>

<script setup>
import { debounce } from '@/utils/index.js'
import { hexToRgba } from '@/utils/color.js'

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
  var attaData = [61, 52, 33, 64]
  //十六进制颜色转RBG 拼接为rgba返回

  //渐变底色
  var attackSourcesColor1 = ['#DFBB71', '#DADADA', '#C46026', '#D5D5D5', '#F76F1C', '#EC6D6D']
  //拼接itemStyle
  function attackSourcesDataFmt(sData) {
    var sss = []
    sData.forEach(function (item, i) {
      let itemStyle = {
        // borderRadius: [0, 20, 20, 0],
        borderRadius: [0, 0, 0, 0],
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
          {
            offset: 0,
            color: hexToRgba(attackSourcesColor1[i], 0.6)
          },
          {
            offset: 1,
            color: attackSourcesColor1[i]
          }
        ])
      }
      sss.push({
        value: item,
        itemStyle: itemStyle
      })
    })
    return sss
  }
  let initOption = {
    
    tooltip: {
      trigger: 'axis',
      borderColor: '#62FFFF',
      formatter: ' {b}     {c}头',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      top: '10%',
      left: '5%',
      bottom: '5%',
      right: '3%'
    },
    xAxis: {
      axisLine: {
        lineStyle: {
          color: '#44A0B7'
        }
      },
      axisLabel: {
        color: '#fff'
      },
      show: false,
      type: 'value',
      axisTick: {
        show: false
      },
      splitLine: {
        show: false
      }
    },
    yAxis: {
      // name: '单位:户',
      type: 'category',
      inverse: true,
      data: ['一单元', '二单元', '三单元', '四单元'],
      axisLine: {
        show: false,
        lineStyle: {
          color: '#44A0B7'
        }
      },
      axisLabel: {
        show: true,
        margin: 15,
        color: 'rgb(188,217,230)',
        fontSize: 12,
        // 调整左侧文字的3个属性，缺一不可
        verticalAlign: 'bottom',
        align: 'top',
        //调整文字上右下左
        padding: [-20, 0, 15, 20]
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: false
      }
    },
    series: [
      {
        name: '',
        type: 'bar',
        // barWidth: 6,
        barWidth: '10%',
        data: attackSourcesDataFmt(attaData),
        label: {
          show: true, //开启显示
          formatter: '{c}头',
          lineHeight: 10,
          offset: [50, 0],
          position: 'insideRight', //在上方显示
          color: '#FFFFFF',
          fontSize: 12,
          fontWeight: 600
        }
      },
      {
        zlevel: 1,
        name: '背景',
        type: 'bar',
        // barWidth: 14,
        barWidth: '21%',
        barGap: '-160%',
        data: [100, 100, 100, 100, 100],
        itemStyle: {
          normal: {
            color: 'rgba(131, 132, 132, 0)',
            // barBorderRadius: [7, 7, 7, 7],
            barBorderRadius: [0, 0, 0, 0],
            borderColor: 'rgba(160, 160, 160,0.5)'
          }
        }
      }
    ]
  }
  // console.log(attackSourcesDataFmt(attaData))
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
  color: rgba(160, 160, 160, 0.5);
}
</style>
