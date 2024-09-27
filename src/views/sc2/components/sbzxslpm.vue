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
  // 绘制左侧面
  const CubeLeft = echarts.graphic.extendShape({
    shape: {
      x: 0,
      y: 0
    },
    buildPath: function (ctx, shape) {
      const xAxisPoint = shape.xAxisPoint
      const c0 = [shape.x, shape.y]
      const c1 = [shape.x - 8, shape.y - 8]
      const c2 = [xAxisPoint[0] - 8, xAxisPoint[1] - 8]
      const c3 = [xAxisPoint[0], xAxisPoint[1]]
      ctx.moveTo(c0[0], c0[1]).lineTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).closePath()
    }
  })
  // 绘制右侧面
  const CubeRight = echarts.graphic.extendShape({
    shape: {
      x: 0,
      y: 0
    },
    buildPath: function (ctx, shape) {
      const xAxisPoint = shape.xAxisPoint
      const c1 = [shape.x, shape.y]
      const c2 = [xAxisPoint[0], xAxisPoint[1]]
      const c3 = [xAxisPoint[0] + 13, xAxisPoint[1] - 4]
      const c4 = [shape.x + 13, shape.y - 4]
      ctx.moveTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).lineTo(c4[0], c4[1]).closePath()
    }
  })
  // 绘制顶面
  const CubeTop = echarts.graphic.extendShape({
    shape: {
      x: 0,
      y: 0
    },
    buildPath: function (ctx, shape) {
      const c1 = [shape.x, shape.y]
      const c2 = [shape.x + 13, shape.y - 4]
      const c3 = [shape.x + 5, shape.y - 12]
      const c4 = [shape.x - 8, shape.y - 8]
      ctx.moveTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).lineTo(c4[0], c4[1]).closePath()
    }
  })
  // 注册三个面图形
  echarts.graphic.registerShape('CubeLeft', CubeLeft)
  echarts.graphic.registerShape('CubeRight', CubeRight)
  echarts.graphic.registerShape('CubeTop', CubeTop)
  // 数据
  const VALUE = [210.9, 260.8, 204.2, 504.9, 740.5, 600.3, 119.0]

  let initOption = {
    //你的代码
    // backgroundColor: 'rgba(17, 42, 62, 1)', //"#012366",
    tooltip: {
      trigger: 'axis'
      // axisPointer: {
      //   type: 'shadow'
      // },
      // formatter: function (params) {
      //   const item = params[1]
      //   return item.name + '\n' + item.value
      // }
    },
    grid: {
      left: '0',
      right: '0',
      bottom: 0,
      top: '5%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      axisLine: {
        show: false,
        lineStyle: {
          color: 'white'
        }
      },
      // offset: 25,
      axisTick: {
        show: false,
        length: 9,
        alignWithLabel: true,
        lineStyle: {
          color: '#7DFFFD'
        }
      },
      axisLabel: {
        show: true,
        fontSize: 12
        // rotate: 45
      }
    },
    yAxis: [
      {
        min: 0,
        max: 1200,
        interval: 200,
        type: 'value',
        // name: '%',
        axisLine: {
          show: false,
          lineStyle: {
            color: 'white'
          }
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed',
            color: 'rgba(255,255,255,0.1)'
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: true,
          fontSize: 12
        },
        boundaryGap: ['20%', '20%']
      }
    ],
    series: [
      {
        type: 'custom',
        renderItem: (params, api) => {
          const location = api.coord([api.value(0), api.value(1)])
          var color =
            api.value(1) > 10000
              ? 'red'
              : new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: '#5cc4eb'
                  },
                  {
                    offset: 0.8,
                    color: '#21658c'
                  }
                ])
          // console.log(color)
          return {
            type: 'group',
            children: [
              {
                type: 'CubeLeft',
                shape: {
                  api,
                  xValue: api.value(0),
                  yValue: api.value(1),
                  x: location[0],
                  y: location[1],
                  xAxisPoint: api.coord([api.value(0), 0])
                },
                style: {
                  fill: (color =
                    api.value(1) > 10000
                      ? 'red'
                      : new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                          {
                            offset: 0,
                            color: '#5cc4eb'
                          },
                          {
                            offset: 0.8,
                            color: '#21658c'
                          }
                        ]))
                }
              },
              {
                type: 'CubeRight',
                shape: {
                  api,
                  xValue: api.value(0),
                  yValue: api.value(1),
                  x: location[0],
                  y: location[1],
                  xAxisPoint: api.coord([api.value(0), 0])
                },
                style: {
                  fill: (color =
                    api.value(1) > 10000
                      ? 'red'
                      : new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                          {
                            offset: 0,
                            color: '#048fd4'
                          },
                          {
                            offset: 0.8,
                            color: '#195684'
                          }
                        ]))
                }
              },
              {
                type: 'CubeTop',
                shape: {
                  api,
                  xValue: api.value(0),
                  yValue: api.value(1),
                  x: location[0],
                  y: location[1],
                  xAxisPoint: api.coord([api.value(0), 0])
                },
                style: {
                  fill: (color =
                    api.value(1) > 10000
                      ? 'red'
                      : new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                          {
                            offset: 0,
                            color: '#65c7ec'
                          },
                          {
                            offset: 1,
                            color: '#65c7ec'
                          }
                        ]))
                }
              }
            ]
          }
        },
        data: VALUE
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
