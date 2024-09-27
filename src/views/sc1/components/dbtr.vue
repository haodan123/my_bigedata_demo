<template>
  <div class="main-box" style="width: 100%; height: 100%; position: relative">
    <div class="main-content" ref="chartRef" style="width: 100%; height: 100%"></div>
  </div>
</template>

<script setup>
import { debounce } from '@/utils/index.js'

import { requestGet } from '@/api/index.js'
import { ref, markRaw, onMounted, onUnmounted } from 'vue'
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
  var legendData = ['农资占比1', '农资占比2'] //图例
  var indicator = [
    {
      name: '农资占比1',
      max: 5000
    },
    {
      name: '农资占比2',
      max: 5000
    },
    {
      name: '农资占比3',
      max: 5000
    },
    {
      name: '农资占比4',
      max: 5000
    },
    {
      name: '农资占比5',
      max: 5000
    },
    {
      name: '农资占比6',
      max: 5000
    }
  ]
  var dataArr = [
    {
      value: [4300, 4700, 3600, 3900, 3800, 4200],
      name: legendData[0],
      lineStyle: {
        width: 1 // 这里设置线条的宽度，比如设置为1使其变细
      },
      itemStyle: {
        width: 5,
        lineStyle: {
          color: '#rgba(74, 153, 255,1)'
          // shadowColor: '#rgba(74, 153, 255,1)',
          // shadowBlur: 10,
        },
        shadowColor: '#rgba(74, 153, 255,1)',
        shadowBlur: 10
      },
      areaStyle: {
        // 单项区域填充样式
        color: {
          type: 'linear',
          x: 0, //右
          y: 0, //下
          x2: 1, //左
          y2: 1, //上
          colorStops: [
            {
              offset: 0,
              // color: '#rgba(74, 153, 255,1)'
              color:'rgba(74, 153, 255,1)'
            },
            {
              offset: 0.5,
              // color: 'rgba(0,0,0,0)'
              color:'rgba(74, 153, 255,0.1)'
            },
            {
              offset: 1,
              // color: '#rgba(74, 153, 255,1)'
              color:'rgba(74, 153, 255,1)'
            }
          ],
          globalCoord: false
        },
        opacity: 1 // 区域透明度
      }
    },
    {
      value: [3200, 3000, 3400, 2000, 3900, 2000],
      name: legendData[1],
      lineStyle: {
        width: 1 // 这里设置线条的宽度，比如设置为1使其变细
      },
      itemStyle: {
        lineStyle: {
          color: 'rgba(75, 255, 252,1)'
          // shadowColor: 'rgba(75, 255, 252,1)',
          // shadowBlur: 10,
        },
        shadowColor: 'rgba(75, 255, 252,1)',
        shadowBlur: 10
      },
      areaStyle: {
        // 单项区域填充样式
        color: {
          type: 'linear',
          x: 0, //右
          y: 0, //下
          x2: 1, //左
          y2: 1, //上
          colorStops: [
            {
              offset: 0,
              color: 'rgba(75, 255, 252,1)'
            },
            {
              offset: 0.5,
              // color: 'rgba(0,0,0,0)'
              color: 'rgba(75, 255, 252,0.1)'
            },
            {
              offset: 1,
              color: 'rgba(75, 255, 252,1)'
            }
          ],
          globalCoord: false
        },
        opacity: 1 // 区域透明度
      }
    }
  ]
  var colorArr = ['#rgba(74, 153, 255,1)', 'rgba(75, 255, 252,1)'] //颜色
  const initOption = {
    // backgroundColor: '#013A54',
    color: colorArr,

    legend: {
      show: false,
      orient: 'vertical',
      icon: 'circle', //图例形状
      data: legendData,
      bottom: '5%',
      right: '5%',
      itemWidth: 14, // 图例标记的图形宽度。[ default: 25 ]
      itemHeight: 14, // 图例标记的图形高度。[ default: 14 ]
      itemGap: 21, // 图例每项之间的间隔。[ default: 10 ]横向布局时为水平间隔，纵向布局时为纵向间隔。
      textStyle: {
        fontSize: 14,
        color: '#00E4FF'
      }
    },
    radar: {
      // shape: 'circle',
      // 调整雷达图的位置
      center: ['50%', '50%'], // 雷达图的中心点，默认在容器的中心
      radius: '70%', // 雷达图的半径，默认占容器大小的 70%
      axisName: {
        color: '#B5BDC8',
        fontSize: 10
      },
      axisNameGap: 5, // 值越小，文字越靠近雷达图
      indicator: indicator,
      splitArea: {
        // 坐标轴在 grid 区域中的分隔区域，默认不显示。
        show: false, // 关闭背景填充区域
        areaStyle: {
          // 分隔区域的样式设置。
          color:'#5F6568',
          // color: ['rgba(255,255,255,0)', 'rgba(255,255,255,0)'] // 分隔区域颜色。分隔区域会按数组中颜色的顺序依次循环设置颜色。默认是一个深浅的间隔色。
        }
      },
      axisLine: {
        //指向外圈文本的分隔线样式
        show: true,
        lineStyle: {
          color: '#1D6B86'
        }
      },
      splitLine: {
        show: true, // 关闭背景网格线
        lineStyle: {
          color: '#1D6B86', // 分隔线颜色
          width: 1 // 分隔线线宽
        }
      }
    },
    series: [
      {
        type: 'radar',
        symbolSize: 4,
        // symbol: 'angle',
        data: dataArr
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
  // const resData = res.data
  // // // 对数据进行赋值
  // updateChart(resData)
}
const updateChart = resData => {
  const timeArr = resData.map(item => item.year)
  const chulan = resData.map(item => item.cl)
  const cunlan = resData.map(item => item.cl)
  // 处理数据
  // 类目轴的数据
  // const timeArr = this.allData.timeArr
  // // y轴的数据，series下的数据
  // const seriesArr = this.allData.dataArr
  // console.log('aaaaaa',timeArr,seriesArr)
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
    title: {},
    // 图例的大小
    legend: {
      itemWidth: titleFontSize / 2,
      itemHeight: titleFontSize / 2,
      itemGap: titleFontSize / 2
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
  color: rgba(75, 255, 252,1);
}

.main-content {
  width: 100%;
  height: 100%;
}
</style>
