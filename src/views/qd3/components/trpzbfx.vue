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

  let trafficWay = [
    {
      // name: '种公牛',
      name: '饲料成本',
      value: 60
    },
    {
      // name: '种母牛',
      name: '疫苗和药品成本',
      value: 15
    },
    {
      // name: '奶牛',
      name: '人工成本',
      value: 10
    },
    {
      name: '设备和维护成本',
      value: 5
    }
  ]

  let data = []
  let color = ['#00ffff', '#00cfff', '#006ced', '#ffe000', '#ffa800', '#ff5b00', '#ff3000']
  for (let i = 0; i < trafficWay.length; i++) {
    data.push(
      {
        value: trafficWay[i].value,
        name: trafficWay[i].name,
        itemStyle: {
          borderWidth: 2, //圆弧宽度
          shadowBlur: 2, // 圆弧阴影
          borderColor: color[i],
          shadowColor: color[i]
        }
      },
      {
        value: 2, //圆弧间的间距
        name: '',
        itemStyle: {
          label: {
            show: false
          },
          labelLine: {
            show: false
          },
          color: 'rgba(0, 0, 0, 0)',
          borderColor: 'rgba(0, 0, 0, 0)',
          borderWidth: 0
        }
      }
    )
  }

  let seriesOption = [
    {
      name: '',
      type: 'pie',
      // radius: [75, 79],
      radius: ['55%', '59%'],
      // radius: '70%',
      center: ['50%', '50%'],
      label: {
        // formatter: ['{c|{d}%}', '{b|{b}}'].join('\n'),
        formatter: params => {
          // console.log(params)
          if (params.name !== '') {
            return [`{c|${params.percent}%}`, `{b|${params.name}}`].join('\n')
          }
        },
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
      itemStyle: {
        labelLine: {
          length: 10,
          length2: 20,
          show: true,
          color: '#00ffff'
        }
      },
      data: data
    },
    {
      name: '外边框',
      type: 'pie',
      clockWise: false, //顺时加载
      hoverAnimation: false, //鼠标移入变大
      center: ['50%', '50%'],
      radius: ['68%', '68%'],
      label: {
        normal: {
          show: false
        }
      },
      data: [
        {
          value: 0,
          name: '',
          itemStyle: {
            normal: {
              borderWidth: 1,
              borderColor: 'rgba(181,221,216,.38)'
            }
          }
        }
      ]
    }
  ]

  let initOption = {
    color: color,
    title: {
      text: '投入占比分析',
      top: '48%',
      textAlign: 'center',
      left: '49%',
      textStyle: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '400'
      }
    },
    tooltip: {
      show: true,
      trigger: 'item',
      textStyle: {
        color: '#fff'
      },
      backgroundColor: 'rgba(16, 32, 40, 0.88)',
      borderRadius: 4,
      borderColor: '#20749e',
      formatter: params => {
        // return params.marker + params.name + ': ' + params.value
        return `${params.name}:${params.percent}%`
      }
    },
    legend: {
      show: false,
      icon: 'circle',
      orient: 'vertical',
      right: 340,
      bottom: 150,
      align: 'right',
      textStyle: {
        color: '#fff'
      },
      itemGap: 30
    },
    toolbox: {
      show: false
    },
    series: seriesOption
  }

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
}
</style>
