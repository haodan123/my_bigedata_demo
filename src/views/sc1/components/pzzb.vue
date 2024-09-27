<template>
  <div class="main-box" style="width: 100%; height: 100%; display: flex">
    <div class="box-content">
      <div class="main-content" ref="chartRef" style="width: 100%; height: 100%"></div>
      <img src="@/assets/sc1/imgcenter.png" alt="" class="centerImg" />
    </div>
    <div class="rightContainer">
      <div class="cityItem">
        <span class="dot" style="background-color: #f4ba66"></span>
        <span>鲤鱼占比</span>
        <span style="color: #71dcfe">20%</span>
      </div>
      <div class="cityItem">
        <span class="dot" style="background-color: #fef77f"></span>
        <span>草鱼占比</span>
        <span style="color: #71dcfe">20%</span>
      </div>
      <div class="cityItem">
        <span class="dot" style="background-color: #ee7ea1"></span>
        <span>河虾占比</span>
        <span style="color: #71dcfe">20%</span>
      </div>
      <div class="cityItem">
        <span class="dot" style="background-color: #9aea9f"></span>
        <span>河蟹占比</span>
        <span style="color: #71dcfe">20%</span>
      </div>
      <div class="cityItem">
        <span class="dot" style="background-color: #6687f7"></span>
        <span>其他占比</span>
        <span style="color: #71dcfe">20%</span>
      </div>
    </div>
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
  let initOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{b} :  ({c}%)'
    },
    legend: {
      bottom: '5%',
      right: '5%',
      icon: 'roundRect',
      show: false,
      itemWidth: 25,
      itemHeight: 10,
      padding: [60, 0, 0, 0],
      textStyle: {
        color: '#7cc4ec'
      }
    },
    visualMap: {
      show: false,
      min: 500,
      max: 600,
      inRange: {
        //colorLightness: [0, 1]
      }
    },
    series: [
      {
        data: [
          {
            name: '鲤鱼占比',
            value: 20
          },
          {
            name: '草鱼占比',
            value: 20
          },
          {
            name: '河虾占比',
            value: 20
          },
          {
            name: '河蟹占比',
            value: 20
          },
          {
            name: '其他占比',
            value: 20
          }
        ],
        type: 'pie',
        radius: ['70%', '65%'],
        center: ['50%', '50%'],
        color: ['#FAE15F', '#ED6C93', '#73D88A', '#547CF3', '#ffea51', '#ffa74d', '#ff4949'], //'#FBFE27','rgb(11,228,96)','#FE5050'
        label: {
          show: false,
          formatter: ['{c|{c}%}', '{b|{b}}'].join('\n'),
          rich: {
            c: {
              color: '#0bffff',
              fontSize: 14,
              // fontWeight: "bold",
              lineHeight: 5
            },
            b: {
              // color: "#fff",
              color: '#0bffff',

              fontSize: 14,
              height: 40
            }
          }
        },
        label: {
          show: false
        },
        labelLine: {
          show: false,
         
        },

        // labelLine: {
        //   show: false,
        //     lineStyle: {
        //       color: 'rgb(98,137,169)'
        //     },
        //     smooth: 0.2,
        //     length: 10,
        //     length2: 20
        // },
        itemStyle: {
          borderRadius: '10px'
        }
      }
    ]
  }
  chartInstance.value.setOption(initOption)
  readData()
}
const readData = async () => {
  const {
    data: res
  } = await requestGet(`breeding-purchase/`)
  const resData = res
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
.box-content {
  width: 50%;
  height: 100%;
  display: flex;
  position: relative;
}
.centerImg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  height: 6.25rem;
  width: 6.25rem;
}

.rightContainer {
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.cityItem {
  // width: calc(100vw * 300 / 1920);
  width: 90%;
  height: 2.5rem;
  padding: 0 1.875rem;
  display: flex;
  font-size: 12px;
  align-items: center;
  color: #8ca3ac;
  justify-content: space-between;
  border-bottom: 1px solid #265762;
  background-color: rgba(29, 90, 118, 0.5);
  border-radius: 30px;
  position: relative;
}
.dot {
  position: absolute;
  width: 5px;
  top: 40%;
  left: 10px;
  transform: translate(-50%);
  height: 5px;
  border-radius: 50%;
}
</style>
