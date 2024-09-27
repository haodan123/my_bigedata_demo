<template>
  <!-- 阿里的请求下钻 -->
  <div class="main-box" style="width: 100vw; height: 100vh; display: flex; position: relative">
    <div class="back" @click="back">返回</div>
    <div class="main-content" ref="chartRef" style="width: 100%; height: 100%"></div>
    <div class="mapChoose">
      <span v-for="(item, index) in parentInfo" :key="item.code">
        <span class="title" @click="chooseArea(item, index)">{{
          item.cityName == '全国' ? '中国' : item.cityName
        }}</span>
        <span class="icon" v-show="index + 1 != parentInfo.length">></span>
      </span>
    </div>
    <!-- <div class="overlay"></div> -->
  </div>
</template>

<script setup>
import axios from 'axios'
import { debounce } from '@/utils/index.js'
import { mapUrl } from '@/config/global_config.js'
import imgicon from '@/assets/nncs1/mapicon.png'
import { ElMessage } from 'element-plus'

import { requestGet } from '@/api/index.js'
import { ref, onMounted, onUnmounted, markRaw } from 'vue'
import * as echarts from 'echarts'
const chartRef = ref()
const chartInstance = ref()

const mapOver = ref(false)

const geoJson = ref({})
const parentInfo = ref([
  {
    cityName: '全国',
    code: 100000
  }
])
onMounted(() => {
  init(100000)

  // initChart()
  window.addEventListener('resize', screenAdapter)
})
onUnmounted(() => {
  chartInstance.value.dispose()
  window.removeEventListener('resize', screenAdapter)
})

// 返回
const back = () => {
  if (parentInfo.value.length === 1) {
    return
  }
  mapOver.value = false

  parentInfo.value.pop()
  init(parentInfo.value[parentInfo.value.length - 1].code)
}

const init = async adcode => {
  const data = await getGeoJson(adcode)
  // console.log('错误', data)
  if (!data) return
  geoJson.value = data
  getMapData()
}

// 获取地图的json
const getGeoJson = (adcode, childAdcode = '') => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data: mapJson } = await axios.get(
        `https://geo.datav.aliyun.com/areas_v3/bound/geojson?code=${adcode}_full`
      )
      // console.log(mapJson)
      resolve(mapJson)
    } catch (error) {
      ElMessage({
        message: '下面没有更多数据',
        type: 'warning'
      })
      mapOver.value = true //没有更多数据了
      reject(false)
    }
  })
}

//获取数据
const getMapData = () => {
  let mapData = [],
    pointData = [],
    sum = 0

  geoJson.value.features.forEach(item => {
    // console.log(item.properties.name)
    if (!item.properties.center) return
    let value = Math.random() * 3000
    mapData.push({
      name: item.properties.name,
      value: value,
      cityCode: item.properties.adcode
    })
    pointData.push({
      name: item.properties.name,
      value: [item.properties.center[0], item.properties.center[1], value],
      cityCode: item.properties.adcode
    })
    sum += value
  })
  mapData = mapData.sort(function (a, b) {
    return b.value - a.value
  })

  initEchartMap(mapData, sum, pointData)
}

//渲染echarts
function initEchartMap(mapData, sum, pointData) {
  // chartInstance.value = echarts.init(chartRef.value)
  chartInstance.value = markRaw(echarts.init(chartRef.value, null, { renderer: 'canvas' }))

  //这里做个切换，全国的时候才显示南海诸岛  只有当注册的名字为china的时候才会显示南海诸岛
  echarts.registerMap(parentInfo.value.length === 1 ? 'china' : 'map', geoJson.value)
  var option = {
    baseOption: {
      backgroundColor: '#012248',

      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      // grid: {
      //   right: '2%',
      //   top: '12%',
      //   bottom: '8%',
      //   width: '20%'
      // },
      geo: {
        zlevel: 1,
        map: parentInfo.value.length === 1 ? 'china' : 'map',
        zoom: 1.1,
        roam: true,
        left: '10%',
        top: '15%',
        tooltip: {
          trigger: 'item',
          formatter: p => {
            let val = p.value[2]
            if (window.isNaN(val)) {
              val = 0
            }
            let txtCon = "<div style='text-align:left'>" + p.name + ':<br />销售额：' + val.toFixed(2) + '万</div>'
            return txtCon
          }
        },
        label: {
          show: true,
          color: 'rgb(249, 249, 249)', //省份标签字体颜色
          formatter: p => {
            switch (p.name) {
              case '内蒙古自治区':
                p.name = '内蒙古'
                break
              case '西藏自治区':
                p.name = '西藏'
                break
              case '新疆维吾尔自治区':
                p.name = '新疆'
                break
              case '宁夏回族自治区':
                p.name = '宁夏'
                break
              case '广西壮族自治区':
                p.name = '广西'
                break
              case '香港特别行政区':
                p.name = '香港'
                break
              case '澳门特别行政区':
                p.name = '澳门'
                break
            }
            return p.name
          }
        },
        emphasis: {
          show: true,
          color: '#f75a00'
        },
        itemStyle: {
          areaColor: '#24CFF4',
          borderColor: '#53D9FF',
          borderWidth: 1.3,
          shadowBlur: 15,
          shadowColor: 'rgb(58,115,192)',
          shadowOffsetX: 7,
          shadowOffsetY: 6
        },
        emphasis: {
          areaColor: '#8dd7fc',
          borderWidth: 1.6,
          shadowBlur: 25
        }
      },

      series: [
        {
          name: '年销售额度',
          type: 'map',
          geoIndex: 0,
          map: parentInfo.value.length === 1 ? 'china' : 'map',
          roam: true,
          zoom: 1.3,
          tooltip: {
            trigger: 'item',
            formatter: p => {
              let val = p.value
              if (p.name == '南海诸岛') return
              if (window.isNaN(val)) {
                val = 0
              }
              let txtCon = "<div style='text-align:left'>" + p.name + ':<br />销售额：' + val.toFixed(2) + '万</div>'
              return txtCon
            }
          },
          label: {
            show: false
          },
          emphasis: {
            show: false
          },
          data: mapData
        },
        {
          name: '散点',
          type: 'effectScatter',
          coordinateSystem: 'geo',
          rippleEffect: {
            brushType: 'fill'
          },
          itemStyle: {
            color: '#F4E925',
            shadowBlur: 10,
            shadowColor: '#333'
          },
          data: pointData,

          symbolSize: function (val) {
            let value = val[2]
            return 10
          },
          showEffectOn: 'render' //加载完毕显示特效
        }
      ]
    }
  }

  chartInstance.value.setOption(option, true)

  //点击前解绑，防止点击事件触发多次
  chartInstance.value.off('click')
  chartInstance.value.on('click', echartsMapClick)
  // readData()
}
const echartsMapClick = params => {
  // console.log('点击', params.data)
  if (mapOver.value) return

  if (!params.data) {
    return
  } else {
    console.log(params.data)
    //如果当前是最后一级，那就直接return
    if (parentInfo.value[parentInfo.value.length - 1].code == params.data.cityCode) {
      return
    }
    let data = params.data
    parentInfo.value.push({
      cityName: data.name,
      code: data.cityCode
    })
    init(data.cityCode)
  }
}

const readData = async () => {
  const { data: res } = await requestGet(`cdzb`)
  const resData = res
  // // // 对数据进行赋值
  updateChart(resData)
}
const updateChart = resData => {
  const seriesData = resData.map(item => {
    return {
      name: item.origin,
      value: [item.lng, item.lat]
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

  color: rgb(119, 173, 195);
}
.back {
  position: absolute;
  left: 25px;
  top: 25px;
  color: rgb(179, 239, 255);
  font-size: 16px;
  cursor: pointer;
  z-index: 100;
}

.mapChoose {
  position: absolute;
  left: 20px;
  top: 55px;
  color: #eee;

  .title {
    padding: 5px;
    border-top: 1px solid rgba(147, 235, 248, 0.8);
    border-bottom: 1px solid rgba(147, 235, 248, 0.8);
    cursor: pointer;
  }

  .icon {
    font-family: 'simsun';
    font-size: 25px;
    margin: 0 11px;
  }
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 10;
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
