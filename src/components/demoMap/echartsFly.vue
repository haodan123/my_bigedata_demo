<template>
  <div class="main-box" style="width: 100%; height: 100%; display: flex">
    <div class="main-content" ref="chartRef" style="width: 100%; height: 100%"></div>
    <div class="overlay"></div>
  </div>
</template>

<script setup>
import axios from 'axios'
import mapbg from '@/assets/mapImg/mapbg1.png'
import { debounce } from '@/utils/index.js'
import { mapUrl } from '@/config/global_config.js'
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
  chartInstance.value = markRaw(echarts.init(chartRef.value, null, { renderer: 'canvas' }))
  const res = await axios.get(mapUrl + '/static/mapJson/china.json')
  const res2 = await axios.get(mapUrl + '/static/mapJson/chinaoutline.json')
  echarts.registerMap('china', res.data)
  echarts.registerMap('chinaoutline', res2.data)
  let initOption = {
    legend: {
      show: false,
      right: '5%',
      bottom: '10%',
      orient: 'vertical',
      itemWidth: 30,
      itemHeight: 5,
      backgroundColor: 'rgba(14, 82, 172,0.5)',
      // backgroundColor: "rgba(14, 82, 172,0)",

      padding: 15
    },
    tooltip: {
      show:false,

      trigger: 'item',
      formatter: function (params, ticket, callback) {
        console.log(params)
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
        map: 'chinaoutline',
        aspectScale: 1,
        roam: false, // 是否允许缩放
        zoom: 0.95, // 默认显示级别
        silent: true,
        layoutSize: '90%',
        layoutCenter: ['48%', '48%'],
        itemStyle: {
          // borderColor: 'rgba(68, 173, 254,1)',
          borderColor: 'aqua',
          borderWidth: 3,
          // shadowColor: 'rgba(68, 173, 254,1)',
          areaColor: 'rgba(0,0,0,0)',
          // shadowColor: 'rgba(0, 0, 0,1)',
          shadowColor: '#000',
          shadowOffsetY: 10,
          shadowOffsetX: 0,
          shadowBlur: 20
        },
        zlevel: -1,
       
      },
       // 高亮虚影层2
       {
        map: 'chinaoutline',
        aspectScale: 1,
        roam: false, // 是否允许缩放
        zoom: 0.95, // 默认显示级别
        silent: true,
        layoutSize: '90%',
        layoutCenter: ['48%', '48.7%'],
        itemStyle: {
          // borderColor: 'rgba(68, 173, 254,1)',
          borderColor: 'aqua',
          borderWidth: 3,
          areaColor: 'rgba(0,0,0,0)',
          // shadowColor: 'rgba(68, 173, 254,1)',
          // areaColor: 'rgba(0,0,0,0)',
          shadowColor: '#000',
          shadowOffsetY: 10,
          shadowOffsetX: 0,
          shadowBlur: 20
        },
        zlevel: -1,
       
      },
       // 高亮虚影层2
       {
        map: 'chinaoutline',
        aspectScale: 1,
        roam: false, // 是否允许缩放
        zoom: 0.95, // 默认显示级别
        silent: true,
        layoutSize: '90%',
        layoutCenter: ['48%', '49.4%'],
        itemStyle: {
          // borderColor: 'rgba(68, 173, 254,1)',
          borderColor: 'aqua',
          borderWidth: 3,
          areaColor: 'rgba(0,0,0,0)',
          // shadowColor: 'rgba(68, 173, 254,1)',
          shadowColor: '#000',
          shadowOffsetY: 10,
          shadowOffsetX: 0,
          shadowBlur: 20
        },
        zlevel: -1,
       
      },
      // 实际层
      {
        map: 'china',
        aspectScale: 1,
        roam: false, // 是否允许缩放
        zoom: 0.95, // 默认显示级别
        // silent: true,
        layoutSize: '90%',
        layoutCenter: ['48%', '48%'],
        itemStyle: {
          // borderColor: 'rgba(68, 173, 254,.5)',
          // borderColor: 'rgb(50, 217, 217)',
          // borderColor: '#71C5E1',
          borderColor: 'aqua',
          // borderColor: '#68BEDA',
          borderWidth: 1,
          areaColor: hexToRgba('#6BC2DF',0.5),
          // areaColor: {
          //   image: mapbg, //配置图片
          //   repeat: 'repeat' //可选值repeat、no-repeat、repeat-x、repeat-y
          // }
      
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
      }
    ]
    // series: [

    // ]
  }
  chartInstance.value.setOption(initOption, { lazyUpdate: true })
  readData()
}
const readData = async () => {
  // const { data: res } = await requestGet(`breeding-pond/`)
  // const resData = res
  // // // 对数据进行赋值
  updateChart()
}
const updateChart = resData => {
  let points = [
    { value: [87.628579, 43.793301], itemStyle: { color: '#FFFA00' } },
    { value: [104.076452, 30.651696], itemStyle: { color: '#FFFA00' } },
    { value: [103.826777, 36.060634], itemStyle: { color: '#FFFA00' } },
    { value: [102.709372, 25.046432], itemStyle: { color: '#FFFA00' } },
    { value: [108.327537, 22.816659], itemStyle: { color: '#FFFA00' } },
    { value: [112.982951, 28.116007], itemStyle: { color: '#FFFA00' } },
    { value: [117.020725, 36.670201], itemStyle: { color: '#FFFA00' } },
    { value: [113.753094, 34.767052], itemStyle: { color: '#FFFA00' } },
    { value: [112.578781, 37.813948], itemStyle: { color: '#FFFA00' } },
    { value: [119.296194, 26.101082], itemStyle: { color: '#FFFA00' } },
    { value: [120.152575, 30.266619], itemStyle: { color: '#FFFA00' } },
    { value: [118.763563, 32.061377], itemStyle: { color: '#FFFA00' } },
    { value: [116.407387, 39.904179], itemStyle: { color: '#FFFA00' } },
    { value: [108.953939, 34.266611], itemStyle: { color: '#FFFA00' } },
    { value: [102.74895, 27.04009], itemStyle: { color: '#FFFA00' } }
  ]
  let series = [
    {
      type: 'effectScatter',
      coordinateSystem: 'geo',
      showEffectOn: 'render',
      zlevel: 1,
      rippleEffect: {
        number: 3, // 波纹的数量。
        period: 5, // 动画的周期，秒数。
        scale: 17, // 动画中波纹的最大缩放比例。
        brushType: 'fill' // 波纹的绘制方式，可选 'stroke' 和 'fill'。
      },
      symbolSize: 2,
      data: points
    }, // 地图线的动画效果
    {
      type: 'effectScatter',
      coordinateSystem: 'geo',
      showEffectOn: 'render',
      zlevel: 1,
      rippleEffect: {
        number: 4,
        period: 5,
        scale: 21,
        brushType: 'fill'
      },
      symbolSize: 3,
      data: [{ value: [102.74895, 27.04009], itemStyle: { color: '#FFFA00' } }]
    },
    {
      type: 'lines',
      zlevel: 2,
      effect: {
        show: true,
        period: 4, // 箭头指向速度，值越小速度越快
        trailLength: 0.4, // 特效尾迹长度[0,1]值越大，尾迹越长重
        symbol: 'pin', // 箭头图标
        symbolSize: 6 // 图标大小
      },
      lineStyle: {
          color: '#1DE9B6',
          width: 1, // 线条宽度
          opacity: 0.1, // 尾迹线条透明度
          curveness: 0.3 // 尾迹线条曲直度
      },
      data: [
        {
          coords: [
            [102.74895, 27.04009],
            [87.628579, 43.793301]
          ],
          lineStyle: { color: '#FFFA00' }
        },
        {
          coords: [
            [102.74895, 27.04009],
            [104.076452, 30.651696]
          ],
          lineStyle: { color: '#FFFA00' }
        },
        {
          coords: [
            [102.74895, 27.04009],
            [103.826777, 36.060634]
          ],
          lineStyle: { color: '#FFFA00' }
        },
        {
          coords: [
            [102.74895, 27.04009],
            [102.709372, 25.046432]
          ],
          lineStyle: { color: '#FFFA00' }
        },
        {
          coords: [
            [102.74895, 27.04009],
            [108.327537, 22.816659]
          ],
          lineStyle: { color: '#FFFA00' }
        },
        {
          coords: [
            [102.74895, 27.04009],
            [112.982951, 28.116007]
          ],
          lineStyle: { color: '#FFFA00' }
        },
        {
          coords: [
            [102.74895, 27.04009],
            [117.020725, 36.670201]
          ],
          lineStyle: { color: '#FFFA00' }
        },
        {
          coords: [
            [102.74895, 27.04009],
            [113.753094, 34.767052]
          ],
          lineStyle: { color: '#FFFA00' }
        },
        {
          coords: [
            [102.74895, 27.04009],
            [112.578781, 37.813948]
          ],
          lineStyle: { color: '#FFFA00' }
        },
        {
          coords: [
            [102.74895, 27.04009],
            [119.296194, 26.101082]
          ],
          lineStyle: { color: '#FFFA00' }
        },
        {
          coords: [
            [102.74895, 27.04009],
            [120.152575, 30.266619]
          ],
          lineStyle: { color: '#FFFA00' }
        },
        {
          coords: [
            [102.74895, 27.04009],
            [118.763563, 32.061377]
          ],
          lineStyle: { color: '#FFFA00' }
        },
        {
          coords: [
            [102.74895, 27.04009],
            [116.407387, 39.904179]
          ],
          lineStyle: { color: '#FFFA00' }
        },
        {
          coords: [
            [102.74895, 27.04009],
            [108.953939, 34.266611]
          ],
          lineStyle: { color: '#FFFA00' }
        }
      ]
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
  background: radial-gradient(rgba(17, 109, 100, 0.1) 40%, rgba(0, 0, 0, 1) 70%);
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
    // transform: scale(0) translate(-50%, -50%);
    transform: scale(0) ;
  }

  100% {
    transform: scale(1) translate(0, 0);
  }
}
</style>
