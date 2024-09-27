<template>
  <div class="main-box" style="width: 100%; height: 100%; display: flex">
    <div class="main-content" ref="chartRef" style="width: 100%; height: 100%"></div>
    <div class="overlay"></div>
  </div>
</template>

<script setup>
import axios from 'axios'
import mapbg from '@/assets/mapImg/mapbg.png'
import { debounce } from '@/utils/index.js'
import { mapUrl } from '@/config/global_config.js'
import imgicon from '@/assets/nncs1/mapicon.png'

import { requestGet } from '@/api/index.js'
import { ref, onMounted, onUnmounted, markRaw } from 'vue'
import * as echarts from 'echarts'
const chartRef = ref()
const chartInstance = ref()
const labelList = ref([])

onMounted(() => {
  initChart()
  window.addEventListener('resize', screenAdapter)
})
onUnmounted(() => {
  chartInstance.value.dispose()
  window.removeEventListener('resize', screenAdapter)
})

const initChart = async () => {
  chartInstance.value = markRaw(echarts.init(chartRef.value, null, { renderer: 'canvas' }))
  const res = await axios.get(mapUrl + '/static/mapJson/china.json')
  echarts.registerMap('china', res.data)
  res.data.features.forEach(function (item, index) {
    labelList.value.push({
      name: item.properties.name,
      value: item.properties.center
    })
  })

  let initOption = {
    legend: {
      show: true,
      right: '28%',
      bottom: '20%',
      orient: 'vertical',
      itemWidth: 30,
      itemHeight: 40,
      icon: 'image://' + imgicon,
      // backgroundColor: 'rgba(14, 82, 172,0.5)',
      // backgroundColor: "rgba(14, 82, 172,0)",
      padding: 15,
      textStyle: {
        color: '#fff', // 设置字体颜色为红色
        fontSize: 14, // 设置字体大小
        fontWeight: 'bold' // 设置字体加粗
      }
    },
    tooltip: {
      // show: false, // 禁用 tooltip
      trigger: 'item',
      formatter: function (params, ticket, callback) {
        // console.log(params)
        if (params.seriesType == 'effectScatter') {
          // return "线路：" + params.data.name + "" + params.data.value[2];
          return '线路：' + params.data.name
        } else if (params.seriesType == 'lines') {
          // return params.data.fromName + ">" + params.data.toName + "<br />" + params.data.value;
          return params.data.fromName + '>' + params.data.toName + '<br />'
        } else {
          return params.name
        }
      }
    },
    geo: [
      // 高亮虚影层
      {
        map: 'china',
        aspectScale: 1,
        roam: false, // 是否允许缩放
        zoom: 0.95, // 默认显示级别
        silent: true,
        layoutSize: '80%',
        layoutCenter: ['48%', '50%'],
        itemStyle: {
          borderColor: 'rgba(68, 173, 254,1)',
          borderWidth: 4,
          shadowColor: 'rgba(68, 173, 254,1)',
          shadowOffsetY: 0,
          shadowBlur: 4
        },
        zlevel: -1
      },
      // 实际层
      {
        map: 'china',
        aspectScale: 1,
        roam: false, // 是否允许缩放
        zoom: 0.95, // 默认显示级别
        // silent: true,
        layoutSize: '80%',
        layoutCenter: ['48%', '50%'],
        itemStyle: {
          borderColor: 'rgba(68, 173, 254,.5)',
          // borderColor: '#68BEDA',
          borderWidth: 2,
          // areaColor: '#094987',
          areaColor: {
            image: mapbg, //配置图片
            repeat: 'repeat' //可选值repeat、no-repeat、repeat-x、repeat-y
          }
        },
        emphasis: {
          itemStyle: {
            areaColor: '#5FA8E8'
          },
          label: {
            show: 0,
            color: '#fff'
          }
        },
        label: {
              show: true,
              color: "#fff",
              fontSize: 10,
            },
        zlevel: 1
      },
      // 底部重影层
      {
        map: 'china',
        aspectScale: 1,
        roam: false, // 是否允许缩放
        zoom: 0.95, // 默认显示级别
        silent: true,
        layoutSize: '80%',
        layoutCenter: ['48%', '51.2%'],
        itemStyle: {
          borderColor: 'rgba(68, 173, 254,.2)',
          borderWidth: 1,
          areaColor: '#094987'
        },
        zlevel: -2
      }
    ]
    // series: [

    // ]
  }
  chartInstance.value.setOption(initOption, { lazyUpdate: true })
  readData()
}
const readData = async () => {
  const { data: res } = await requestGet(`cdzb`)
  const resData = res
  // // // 对数据进行赋值
  updateChart(resData)
}
const updateChart = resData => {
  const seriesData = resData.map(item=>{
    return {
      name:item.origin,
      value:[item.lng,item.lat]
    }
  })
  const series = [
    {
      type: 'scatter',
      name: '产地',
      // type: 'effectScatter',//闪烁的动画效果
      // rippleEffect: {
      //   period: 0.3, // 控制闪烁的速度
      //   scale: 1.3, // 控制波纹大小
      //   brushType: 'stroke' // 仅显示波纹边框
      // },
      // silent: true,  // 禁用鼠标事件
      coordinateSystem: 'geo',
      // data: labelList.value,
      data: seriesData,
      symbol: 'image://' + imgicon,
      symbolSize: 30,
      zlevel: 2,

      label: {
        show: false
      }
    }
  ]

  // console.log(series)
  const dataOption = {
    series: series
  }
  chartInstance.value.setOption(dataOption)
}

const screenAdapter = debounce(() => {
  const titleFontSize = (chartRef.value.offsetWidth / 100) * 3.6
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
  background: url('@/assets/mapImg/mapbg.png') center center no-repeat;
  background-size: cover;
  color: rgb(119, 173, 195);
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 10;
  // background: url('@/assets/global_sc/black_border.png') no-repeat 100% 100%;
  background-size: 100% 100%;
  background: radial-gradient(rgba(17, 109, 100, 0.1) 40%, rgba(0, 0, 0, 1) 80%);
  z-index: 99 !important;
  pointer-events: none;
}

.main-content {
  width: 100%;
  height: 100%;
  position: relative;
  /* transition:  all 1s; */
  transform: scale(0);
  animation: scaleStyle 2s forwards;
}

@keyframes scaleStyle {
  0% {
    transform: scale(0) translate(-50%, -50%);
  }

  100% {
    transform: scale(1) translate(0, 0);
  }
}
</style>
