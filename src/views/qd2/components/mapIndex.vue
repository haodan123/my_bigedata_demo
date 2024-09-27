<template>
  <div class="main-box" style="width: 100%; height: 100%; position: relative">
    <div class="main-content" style="width: 100%; height: 100%" ref="map_ref"></div>
  </div>
</template>
<script setup>
import { requestPost } from '@/api/index.js'
import { mapUrl } from '@/config/global_config.js'
import { ref, onMounted, onUnmounted,markRaw } from 'vue'
import * as echarts from 'echarts'
import axios from 'axios'
import { debounce } from '@/utils/index.js'

const map_ref = ref()
const chartInstance = ref()
onMounted(() => {
  initChart()
  window.addEventListener('resize', screenAdapter)
})
onUnmounted(() => {
  chartInstance.value.dispose()
  window.removeEventListener('resize', screenAdapter)
})
// http://localhost:5173/static/mapJson/jiazhou.json

const initChart = async () => {
  chartInstance.value = markRaw(echarts.init(map_ref.value))
  // 获取中国地图的矢量数据
  // axios请求地图
  const res = await axios.get(`${mapUrl}/static/mapJson/jiaozhou.json`)
  echarts.registerMap('jiaozhou', res.data)
  const initOption = {
    // backgroundColor: '#070827',
    tooltip: {
      formatter: function (e) {
        isNaN(e.value) ? (e.value = 0) : e.value
        // return '存栏量' + '<br />' + e.name + '：' + e.value + '头'
        return ''
      }
    },
    geo: {
      type: 'map',
      map: 'jiaozhou',
      roam: true,
      // center: [107.26, 24.14],
      // zoom: 16,
      zoom: 0.9,
      label: {
        show: true,
        // color: "#2B4695",
        fontSize: 10,
        // color: 'rgba(0, 0, 0,0.7)'
        color: '#fff'
      },
      itemStyle: {
        areaColor: '#21479a',
        borderColor: '#59c0fa',
        borderWidth: 1,
        shadowColor: '#59c0fa',
        shadowBlur: 30
      },
      emphasis: {
        label: {
          show: true,
          color: '#fff',
          fontSize: 15
        },
        itemStyle: {
          areaColor: '#29adf7',
          borderColor: '#fff',
          borderWidth: 1
        }
      }
    },
    visualMap: {
      left: '3%',
      bottom: '5%',
      textStyle: {
        color: '#fff' // 设置Visual Map的字体颜色，这里将字体颜色设置为黑色
      },
      pieces: [
        {
          gte: 1000,
          lte: 10000,
          label: '1000 - 10000 头',
          color: 'gold'
        }
      ],
      show: false
    },
    series: [
      {
        selectedMode: false,

        // name: "确诊病例",
        type: 'map',
        geoIndex: 0
        // data: []
      }
    ]
  }
  chartInstance.value.setOption(initOption)
  chartInstance.value.on('click', res => {
    console.log(res)
    // this.$router.push(`/ydj2?id=${res.data.id}&address=${res.data.address}`)
  })
  // 左侧的点击事件禁用
  chartInstance.value.on('datarangeselected', e => {
    const selected = {
      0: true,
      1: true,
      2: true,
      3: true,
      4: true
    } //* 因为这边只分了五段，故写死
    // console.log(this.chartInstance)
    if (JSON.stringify(selected) !== JSON.stringify(e.selected)) {
      //* 判断是否为全部选中，全部选中则不用设置。如果不判断则会死循环
      this.chartInstance.dispatchAction({
        //* 调用action方法将图例重新设置为全部选中
        type: 'selectDataRange',
        // 连续型 visualMap 和 离散型 visualMap 不一样
        // 连续型的是一个表示数值范围的数组。
        // 离散型的是一个对象，键值是类目或者分段的索引。值是`true`或`false`
        selected: {
          0: true,
          1: true,
          2: true,
          3: true,
          4: true
        }
      })
    }
  })
  readData()
}
const readData = async () => {
  // const { data: res } = await requestPost(`mapdis2`, {})
  const resData = []
  // res.data.forEach(item => {
  //   let obj = {}
  //   obj.value = [item.jid, item.wid]
  //   obj = {
  //     ...obj,
  //     ...item
  //   }

  // })
  // 对数据进行赋值
  updateChart(resData)
}

const updateChart = resData => {
  let dataList = []
  // 假数据
  let morkArr = [
    {
      mingc: '洋河镇',
      num: 1001
    }
  ]
  dataList = morkArr.map(item => {
    return {
      name: item.mingc,
      value: item.num
    }
  })
  // console.log(dataList)
  const dataOption = {
    series: [
      {
        data: dataList
      }
    ]
  }

  chartInstance.value.setOption(dataOption)
}

const screenAdapter = debounce(() => {
  const titleFontSize = (map_ref.value.offsetWidth / 100) * 3.6
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
<style lang="scss">
.shebei-box {
  position: absolute;
  top: 4%;
  width: 80%;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(12, 23, 29, 0.5);
  height: 80px;
  display: flex;
  justify-content: space-around;
  align-items: center;

  .shebei-item {
    width: 150px;
    height: 60px;
    position: relative;

    .p1 {
      font-size: 16px;
    }

    .img-big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }

    .img-small {
      display: block;
      position: absolute;
      width: 1.7rem;
      height: 1.7rem;
      left: -10px;
      bottom: 10px;
    }

    div {
      color: #fff;
      position: absolute;
      left: 25%;
      top: 25%;
    }
  }
}

.tcontent {
  width: 270px;
  height: 400px;
  line-height: 25px;
  font-size: 14px;
  background: url('http://snow.shidongvr.com/static/maptip2.png') no-repeat;
  // background-size: cover;
  color: white;
}

.map_tip {
  position: absolute;
  bottom: 20px;
  right: 20px;
  z-index: 9999;
  font-size: calc(100vw * 18 / 1920);
  color: aliceblue;
  display: flex;
  color: #51aa38;
  align-items: center;
}

.map_tip img {
  width: 30px;
  height: 30px;
  margin-right: 10px;
}
</style>
