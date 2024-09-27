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
// 颜色列表
const colorList = [
  'rgba(76, 139, 241, 0.9)',
  'rgba(101, 193, 241, 0.9)',
  'rgba(249, 215, 114, 0.9)',
  'rgba(179, 186, 195, 0.9)',
  'rgba(255, 255, 255,  0.9)',
  'rgba(145, 186, 217, 0.9)'
]

const initChart = async () => {
  chartInstance.value = markRaw(echarts.init(chartRef.value))
  const data = [
    {
      name: '奶牛',
      value: 60
    },
    {
      name: '种母牛',
      value: 14
    },
    {
      name: '肉牛',
      value: 14
    },
    {
      name: '种公牛',
      value: 12
    }
  ]

  const serData = data.map((dItem, index) => {
    return {
      ...dItem,
      value: Number(dItem.value),
      itemStyle: {
        color: colorList[index]
      }
    }
  })

  // let initOption = {}
  let initOption = getPie3D(serData, 0.7)

  chartInstance.value.setOption(initOption)
}

// 生成扇形的曲面参数方程，用于 series-surface.parametricEquation
function getParametricEquation(startRatio, endRatio, isSelected, isHovered, k, h) {
  // 计算
  let midRatio = (startRatio + endRatio) / 2
  let startRadian = startRatio * Math.PI * 2
  let endRadian = endRatio * Math.PI * 2
  let midRadian = midRatio * Math.PI * 2

  // 如果只有一个扇形，则不实现选中效果。
  // if (startRatio === 0 && endRatio === 1) {
  //     isSelected = false;
  // }
  isSelected = false
  // 通过扇形内径/外径的值，换算出辅助参数 k（默认值 1/3）
  k = typeof k !== 'undefined' ? k : 1 / 3

  // 计算选中效果分别在 x 轴、y 轴方向上的位移（未选中，则位移均为 0）
  let offsetX = isSelected ? Math.sin(midRadian) * 0.1 : 0
  let offsetY = isSelected ? Math.cos(midRadian) * 0.1 : 0

  // 计算高亮效果的放大比例（未高亮，则比例为 1）
  let hoverRate = isHovered ? 1.05 : 1

  // 返回曲面参数方程
  return {
    u: {
      min: -Math.PI,
      max: Math.PI * 3,
      step: Math.PI / 32
    },

    v: {
      min: 0,
      max: Math.PI * 2,
      step: Math.PI / 20
    },

    x: function (u, v) {
      if (u < startRadian) {
        return offsetX + Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate
      }
      if (u > endRadian) {
        return offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate
      }
      return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate
    },

    y: function (u, v) {
      if (u < startRadian) {
        return offsetY + Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate
      }
      if (u > endRadian) {
        return offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate
      }
      return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate
    },

    z: function (u, v) {
      if (u < -Math.PI * 0.5) {
        return Math.sin(u)
      }
      if (u > Math.PI * 2.5) {
        return Math.sin(u) * h * 0.1
      }
      return Math.sin(v) > 0 ? 1 * h * 0.1 : -1
    }
  }
}

// 生成模拟 3D 饼图的配置项
function getPie3D(pieData, internalDiameterRatio) {
  let series = []
  let sumValue = 0
  let startValue = 0
  let endValue = 0
  let legendData = []
  let k =
    typeof internalDiameterRatio !== 'undefined' ? (1 - internalDiameterRatio) / (1 + internalDiameterRatio) : 1 / 3

  // 为每一个饼图数据，生成一个 series-surface 配置
  for (let i = 0; i < pieData.length; i++) {
    sumValue += pieData[i].value

    let seriesItem = {
      name: typeof pieData[i].name === 'undefined' ? `series${i}` : pieData[i].name,
      type: 'surface',
      parametric: true,
      wireframe: {
        show: false
      },
      pieData: pieData[i],
      pieStatus: {
        selected: false,
        hovered: false,
        k: 1 / 10
      },
      radius: '50%',
      center: ['10%', '10%']
    }

    if (typeof pieData[i].itemStyle != 'undefined') {
      let itemStyle = {}

      typeof pieData[i].itemStyle.color != 'undefined' ? (itemStyle.color = pieData[i].itemStyle.color) : null
      typeof pieData[i].itemStyle.opacity != 'undefined' ? (itemStyle.opacity = pieData[i].itemStyle.opacity) : null

      seriesItem.itemStyle = itemStyle
    }
    series.push(seriesItem)
  }

  // 使用上一次遍历时，计算出的数据和 sumValue，调用 getParametricEquation 函数，
  // 向每个 series-surface 传入不同的参数方程 series-surface.parametricEquation，也就是实现每一个扇形。
  for (let i = 0; i < series.length; i++) {
    endValue = startValue + series[i].pieData.value
    series[i].pieData.startRatio = startValue / sumValue
    series[i].pieData.endRatio = endValue / sumValue
    series[i].parametricEquation = getParametricEquation(
      series[i].pieData.startRatio,
      series[i].pieData.endRatio,
      false,
      false,
      k,
      series[i].pieData.value
    )
    startValue = endValue
    legendData.push(series[i].name)
  }
  series.push({
    name: 'mouseoutSeries',
    type: 'surface',

    parametric: true,
    wireframe: {
      show: false
    },
    itemStyle: {
      opacity: 0.2,
      color: 'rgba(165, 247, 253, 1)'
    },
    parametricEquation: {
      u: {
        min: 0,
        max: Math.PI * 2,
        step: Math.PI / 20
      },
      v: {
        min: 0,
        max: Math.PI / 4,
        step: Math.PI / 20
      },
      x: function (u, v) {
        return ((Math.sin(v) * Math.sin(u) + Math.sin(u)) / Math.PI) * 2.5
      },
      y: function (u, v) {
        return ((Math.sin(v) * Math.cos(u) + Math.cos(u)) / Math.PI) * 2.5
      },
      z: function (u, v) {
        return Math.cos(v) > 0 ? -3 : -3
      }
    }
  })

  // 准备待返回的配置项，把准备好的 legendData、series 传入。
  let option = {
    legend: {
      // 空心圆形的icon
      icon: 'path://M512 0C229.230769 0 0 229.230769 0 512s229.230769 512 512 512 512-229.230769 512-512S794.769231 0 512 0zM512 896C317.538462 896 128 706.461538 128 512S317.538462 128 512 128s384 189.538462 384 384S706.461538 896 512 896z',
      right: '5%',
      top: 'middle', // 垂直居中
      orient: 'vertical', // 图例垂直显示
      itemGap: 5,
      // itemWidth: 12,
      // itemHeight: 12,
      selectedMode: true, // 是否可以点击
      textStyle: {
        color: '#fff',
        fontSize: 10,
        rich: {
          name: {
            color: '#FFF',
            fontSize: 10,
            width: 50
            // padding: [0, 0, 0, 10]
          },
          value: {
            color: '#2BDFD4',
            fontSize: 10,
            // width: 50,
            padding: [0, 0, 0, 20]
          },
          percent: {
            // color: '#2BDFD4',
            fontSize: 10
          },
          unit: {
            color: '#ACDCE4',
            fontSize: 10
          }
        }
      },
      formatter: name => {
        let obj = pieData.find(item => item.name === name)
        let datas = pieData
        let total = 0
        if (!obj?.value) return ''
        let target = obj.value
        for (let i = 0; i < datas.length; i++) {
          total += Number(datas[i].value)
        }
        // const arr = [`{name|${name}}{value|${''}}{percent|${((target / total) * 100).toFixed(0)}}{unit|%}`]
        const arr = [`{name|${name}}{value|${''}}{percent|${((target / total) * 100).toFixed(0)}}{unit|%}`]
        return arr.join('')
      }
    },
    xAxis3D: {},
    yAxis3D: {},
    zAxis3D: {},
    grid3D: {
      viewControl: {
        autoRotate: true // 自动旋转
      },
      // left: '4%',
      width: '55%',
      show: false,
      boxHeight: 30,
      // boxHeight: '30%',
      // boxWidth和boxDepth这两个属性值保持一致，才可以在调整饼图宽度的时候保持水平，不然就会歪歪扭扭
      boxWidth: 200,
      boxDepth: 200
      // boxWidth: 130,
      // boxDepth: 130
    },
    series: series
  }
  return option
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
