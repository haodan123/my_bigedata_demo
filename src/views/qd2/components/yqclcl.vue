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
  // console.log(chartRef.value);
  chartInstance.value = markRaw(echarts.init(chartRef.value))
  let myData = ['1月', '2月', '3月', '4月', '5月', '6月']
  let data1 = [2, 2, 3, 10, 5, 6]
  let data2 = [2, 2, 3, 4, 5, 6]
  let initOption = {
    baseOption: {
      // backgroundColor: '#080b30',
      timeline: {
        show: false,
        top: 0,
        data: []
      },
      tooltip: {
        trigger: 'item',
        backgroundColor: 'rgba(0,0,0,0.6)',
        borderColor: 'rgba(0,0,0,0.6)',
        textStyle: {
          color: '#fff'
        },
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      legend: {
        // type: 'plain',
        top: '0%',
        icon: 'circle', // 将图标设置为圆形
        backgroundColor: 'rgba(128, 128, 128, 0.5)', // 设置图例的背景颜色
        itemWidth: 8,
        itemHeight: 8,
        itemGap: 20, // 设置图例项之间的间距
        textStyle: {
          color: '#ffffff',
          fontSize: 12
        },
        // selectedMode: false, // 禁用图例点击

        data: ['存栏量', '出栏量']
      },
      grid: [
        {
          left: '5%',
          top: '10%',
          bottom: '15%',
          width: '38%'
        },
        {
          show: false,
          left: '50.5%',
          top: '10%',
          bottom: '15%'
        },
        // right
        {
          show: false,
          right: '5%',
          top: '10%',
          bottom: '15%',
          width: '38%'
        }
      ],
      xAxis: [
        {
          type: 'value',
          inverse: true,
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          position: 'bottom',
          axisLabel: {
            show: true,
            color: '#B4B4B4',
            fontSize: '12'
          },
          splitLine: {
            lineStyle: {
              // 使用深浅的间隔色
              color: ['#B5B5B5'],
              type: 'dashed',
              opacity: 0.1
            }
          }
        },
        {
          gridIndex: 1,
          show: false
        },
        {
          gridIndex: 2,
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          position: 'bottom',
          axisLabel: {
            show: true,
            interval: 0,
            color: '#B4B4B4',
            fontSize: '12'
          },
          splitLine: {
            lineStyle: {
              // 使用深浅的间隔色
              color: ['#B5B5B5'],
              type: 'dashed',
              opacity: 0.1
            }
          }
        }
      ],
      yAxis: [
        {
          type: 'category',
          inverse: true,
          position: 'right',
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false,
            color: '#fff',
            fontSize: 12
          },

          data: myData
        },
        {
          gridIndex: 1,
          type: 'category',
          inverse: true,
          position: 'left',
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: true,
            color: '#ffffff',
            fontSize: 12
          },
          offset: -10, // 设置 y 轴的偏移量，负值表示向左偏移

          data: myData.map(function (value) {
            return {
              value: value,
              textStyle: {
                align: 'center'
              }
            }
          })
        },
        {
          gridIndex: 2,
          type: 'category',
          inverse: true,
          position: 'left',
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          },
          data: myData
        }
      ],
      series: []
    },
    options: [
      {
        series: [
          {
            name: '存栏量',
            type: 'bar',
            xAxisIndex: 0,
            yAxisIndex: 0,
            // barWidth: 6,
            barWidth: '15%',
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
            data: data1
          },
          {
            name: '出栏量',
            type: 'bar',
            xAxisIndex: 2,
            yAxisIndex: 2,
            // barWidth: 6,
            barWidth: '15%',
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
            data: data2
          }
        ]
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
