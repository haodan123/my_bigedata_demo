<template>
  <div class="main-box" style="width: 100%; height: 100%">
    <!-- haha -->
    <div class="main-content" ref="chartRef" style="width: 100%; height: 100%"></div>
  </div>
</template>

<script setup>
import { debounce } from '@/utils/index.js'
import { hexToRgba } from '@/utils/color.js'

import { requestGet } from '@/api/index.js'
import { ref, onMounted, onUnmounted, markRaw, watch } from 'vue'
import * as echarts from 'echarts'

const props = defineProps({
  xAxisData: {
    type: Array,
    // required: true,
    default: () => [0, 0, 0, 0, 0, 0, 0]
  },
  wdyAxisData: {
    type: Array,
    // required: true,
    default: () => [0, 0, 0, 0, 0, 0, 0]
  },
  sdyAxisData: {
    type: Array,
    // required: true,
    default: () => [0, 0, 0, 0, 0, 0, 0]
  },
  areaColor: {
    type: String,
    default: 'rgba(22, 142, 253,1)'
  },
  xname: {
    type: String
  },
  wdyname: {
    type: String
  },
  sdyname: {
    type: String
  }
})

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

watch(
  () => [props.xAxisData],
  () => {
    updateChart()
  }
)

const initChart = async () => {
  // console.log(props.areaColor)
  chartInstance.value = markRaw(echarts.init(chartRef.value))
  let initOption = {
    grid: {
      top: '20%',
      left: '1%',
      right: '1%',
      bottom: '0%',
      containLabel: true
    },
    legend: {
      show: true,
      // right: '10%',
      itemGap: 50,
      textStyle: {
        color: '#f9f9f9',
        borderColor: '#fff'
      }
    },
    legend: {
      // type: 'plain',
      top: '0%',
      icon: 'circle', // 将图标设置为圆形
      backgroundColor: 'rgba(128, 128, 128, 0.5)', // 设置图例的背景颜色
      itemWidth: 8,
      itemHeight: 8,
      itemGap: 50, // 设置图例项之间的间距
      textStyle: {
        color: '#ffffff',
        fontSize: 12
      },
      // selectedMode: false, // 禁用图例点击
      data: ['温度', '湿度']
    },
    tooltip: {
      // trigger: 'item'
      trigger: 'axis', //坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: 'line' // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    xAxis: [
      {
        name: props.xname,
        nameGap: 5,
        // name: '(h)',
        nameTextStyle: {
          show: true,
          fontFamily: '微软雅黑',
          color: props.areaColor,
          fontSize: '12'
        },
        type: 'category',
        boundaryGap: true,
        axisLine: {
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.5)' // 分割线颜色透明
          }
        },
        axisLabel: {
          // color: props.areaColor
          color: '#8998a6'
        },
        axisTick: {
          show: false
        }
      }
    ],
    yAxis: [
      {
        name: props.wdyname,
        type: 'value',
        min: 0,
        splitNumber: 7,
        nameTextStyle: {
          show: true,
          fontFamily: '微软雅黑',
          // color: props.areaColor,
          color: '#8998a6',
          fontSize: '12',
          // padding: [0, 0, 0, 55] // 上右下左与原位置距离
          padding: [0, 0, 0, 10] // 上右下左与原位置距离
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed',
            color: '#27313A'
          }
        },

        axisLabel: {
          // color: props.areaColor
          color: '#8998a6'
        },
        axisLine: {
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.5)' // 分割线颜色透明
          }
        },
        axisTick: {
          show: false
        }
      },
      {
        name: props.sdyname,
        type: 'value',
        min: 0,
        splitNumber: 7,
        nameTextStyle: {
          show: true,
          fontFamily: '微软雅黑',
          // color: props.areaColor,
          color: '#8998a6',
          fontSize: '12',
          // padding: [0, 0, 0, 55] // 上右下左与原位置距离
          padding: [0, 0, 0, 10] // 上右下左与原位置距离
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed',
            color: '#27313A'
          }
        },

        axisLabel: {
          // color: props.areaColor
          color: '#8998a6'
        },
        axisLine: {
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.5)' // 分割线颜色透明
          }
        },
        axisTick: {
          show: false
        }
      }
    ],
    series: [
      {
        yAxisIndex: 0,

        name: '温度',
        type: 'line',
        smooth: true, //是否平滑曲线显示
        symbol: 'circle',
        // symbolSize: 6,
        symbolSize: 0,
        lineStyle: {
          color: props.areaColor, // 线条颜色
          borderColor: '#f0f'
        },
        label: {
          show: false,
          position: 'top',
          color: '#fff'
        },
        itemStyle: {
          color: props.areaColor
        },
        areaStyle: {
          //区域填充样式
          //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                // color:props.areaColor
                color: hexToRgba(props.areaColor, 0.6)
              },
              {
                offset: 1,
                // color: 'rgba(0,0,0, 0)'
                color: hexToRgba(props.areaColor, 0.2)
              }
            ],
            false
          ),
          // shadowColor: props.areaColor, //阴影颜色
          // shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
          shadowColor: 'rgba(0, 0, 0, 0.1)',
          shadowBlur: 10
        }
      },
      {
        yAxisIndex: 1,
        name: '湿度',
        type: 'line',
        smooth: true, //是否平滑曲线显示
        symbol: 'circle',
        // symbolSize: 6,
        symbolSize: 0,
        lineStyle: {
          color: '#8FDEFD', // 线条颜色
          borderColor: '#f0f'
        },
        label: {
          show: false,
          position: 'top',
          color: '#fff'
        },
        itemStyle: {
          color: '#8FDEFD'
        },
        areaStyle: {
          //区域填充样式
          //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                // color:props.areaColor
                color: hexToRgba('#8FDEFD', 0.6)
              },
              {
                offset: 1,
                // color: 'rgba(0,0,0, 0)'
                color: hexToRgba('#8FDEFD', 0.2)
              }
            ],
            false
          ),
          // shadowColor: props.areaColor, //阴影颜色
          // shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
          shadowColor: 'rgba(0, 0, 0, 0.1)',
          shadowBlur: 10
        }
      }
    ]
  }
  chartInstance.value.setOption(initOption)
  readData()
}
const readData = async () => {
  updateChart()
}
const updateChart = () => {
  const dataOption = {
    xAxis: {
      data: props.xAxisData
    },
    series: [
      {
        data: props.wdyAxisData
      },
      {
        data: props.sdyAxisData
      }
    ]
  }
  chartInstance.value.setOption(dataOption)
}

const screenAdapter = debounce(() => {
  const titleFontSize = (chartRef.value.offsetWidth / 100) * 3.6
  // props.titleFontSize = titleFontSize;
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
