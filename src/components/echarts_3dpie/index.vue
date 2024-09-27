<template>
  <div class="main">
    <div class="pie-charts" :id="chartId" ref="chartPei" />
  </div>
</template>
<script>
import * as echarts from 'echarts'

export default {
  props: {
    mapTitle: [String, Array],
    divideBy: [Number, String],
    // 视角到主体的距离
    distance: {
      type: Number,
      default: 260
    },
    // 旋转角度
    alpha: {
      type: Number,
      default: 16
    },
    beta: {
      type: Number,
      default: 60
    },
    pieDataFlag: {
      type: Boolean,
      default: false
    },
    optionData: {
      type: Array,
      default: () => []
    },
    chartId: {
      type: [String, Number],
      default: () => new Date().getTime()
    },
    unit: {
      type: String,
      default: () => ''
    },
    chart: {
      type: String,
      default: () => null
    },
    eventName: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
      myChart: null,
      localChartId: this.chartId,
      localEventName: this.eventName,
      isUpdating: false // 新增标志位
    }
  },
  watch: {
    optionData: {
      handler(newValue, oldValue) {
        // 注意：在嵌套的变更中，
        // 只要没有替换对象本身，
        // 那么这里的 `newValue` 和 `oldValue` 相同
        this.setPie(newValue, this.chartId, this.eventName)
      },
      deep: true
    }
  },
  mounted() {
    // remoteEvent.on("mapClick", () => {
    //   this.setPie(this.optionData, this.chartId, this.eventName);
    // });
    this.setPie(this.optionData, this.chartId, this.eventName)
  },
  methods: {
    setPie(pieData, id, eventName) {
      if (this.myChart) this.myChart.dispose()
      var option = this.getPie3D(pieData)
      //是否需要label指引线，如果要就添加一个透明的2d饼状图并调整角度使得labelLine和3d的饼状图对齐，并再次setOption
      option.series.push({
        backgroundColor: 'transparent',
        name: 'pie2d',
        type: 'pie',
        label: { opacity: 1, overflow: 'none' },
        itemStyle: { opacity: 0.02 },
        labelLine: { length: 20, length2: 10 },
        startAngle: -60, // 起始角度，支持范围[0, 360]。
        clockwise: false, // 饼图的扇区是否是顺时针排布。上述这两项配置主要是为了对齐3d的样式
        radius: ['30%', '55%'],
        center: ['50%', '50%'],
        data: pieData, // 与之前的series数据一致
        tooltip: {
          show: false
        }
      })

      // this.myChart = echarts.init(document.getElementById(id))
      this.myChart = echarts.init(this.$refs.chartPei)

      this.myChart.setOption(option)
      this.myChart.off('click') // 防止重复绑定点击事件
      // 添加点击事件
      // this.myChart.on('click', params => eventName(params, this.mapTitle))
      window.addEventListener('resize', () => this.myChart.resize())
    },
    getPie3D(pieData) {
      // internalDiameterRatio:透明的空心占比
      let series = []
      let sumValue = 0
      let startValue = 0
      let endValue = 0
      let k = 1
      pieData.sort((a, b) => {
        return b.value - a.value
      })
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
            k: k
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
        series[i].parametricEquation = this.getParametricEquation(
          series[i].pieData.startRatio,
          series[i].pieData.endRatio,
          false,
          false,
          k,
          series[i].pieData.value
        )
        startValue = endValue
      }
      let boxHeight = this.getHeight3D(series, 30) //通过传参设定3d饼/环的高度，26代表26px
      // 准备待返回的配置项，把准备好的 legendData、series 传入。
      let option = {
        // 引导线配置
        labelLine: {
          show: true,
          lineStyle: {
            // color: '#fff',//显示线
            color: 'rgba(0,0,0,0)', //不显示线
            normal: {}
          }
        },
        label: {
          show: true,
          position: 'outside',
          // formatter: function (params) {
          //   return `{d|${params.percent?.toFixed(2)}}{c|${"%"}}\n\n{b|${params.name}}`;
          // },
          formatter: params => {
            // return `${params.name
            // }<br/><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${params.color
            // };"></span>${params.value}(亩)`;
            // return `{d|${params.value}}{c|(%)} \n {c|${params.name}} `
            return ` `
          },
          rich: {
            d: {
              fontSize: 22,
              lineHeight: 18,
              fontFamily: 'Source Han Sans',
              fontWeight: 'bold',
              color: '#6DC1F9',
              marginBottom: 10
            },
            c: {
              fontSize: 12,
              color: '#B4CAD1'
            }
          }
        },
        // 提示框
        tooltip: {
          position: 'right', // 将提示框显示在鼠标右侧
          textStyle: { color: '#fff', fontSize: 14 },
          borderWidth: 1,
          borderColor: '#1495F4',
          backgroundColor: 'rgba(20, 149, 244, 0.5)', // 提示框背景颜色
          boxShadow: '0 0 3px rgba(0, 0, 0, 0.3)', // 提示框阴影
          extraCssText: 'box-shadow: inset 0px 0px 10px 0px rgba(1, 30, 18, 0.302);',
          // 格式化提示框，添加单位
          formatter: params => {
            return `${params.seriesName}<br/>${option.series[params.seriesIndex].pieData.value}(%)`
          }
          // formatter: (params) => {
          //   if (params.seriesName !== "mouseoutSeries" && params.seriesName !== "pie2d") {
          //     let bfb = 0;
          //     if (this.pieDataFlag) {
          //       let findItem = pieData.find((item) => item.name === params.seriesName);
          //       bfb = this.divideBy ? findItem.value / this.divideBy : findItem.value;
          //     }
          //     const unit = ["万个", "万户"];
          //     const format = unit.includes(this.unit) ? 2 : 0;
          //     return (
          //       "<div style='color: #fff''>" +
          //       `${params.seriesName}<br/>` +
          //       `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${params.color};"></span>` +
          //       `${this.unit}` +
          //       "</div>"
          //     );
          //   }
          // },
        },
        xAxis3D: {
          min: -1,
          max: 1
        },
        yAxis3D: {
          min: -1,
          max: 1
        },
        zAxis3D: {
          min: -1,
          max: 1
        },
        grid3D: {
          show: false,
          boxHeight: boxHeight, //圆环的高度
          left: 0,
          top: 0, //3d饼图的位置
          viewControl: {
            // autoRotate: true ,// 自动旋转
            //3d效果可以放大、旋转等，请自己去查看官方配置
            alpha: this.alpha, //角度
            // 饼块开始得角度
            beta: this.beta || 60,
            distance: this.distance, //调整视角到主体的距离，类似调整zoom
            rotateSensitivity: 0, //设置为0无法旋转
            zoomSensitivity: 0, //设置为0无法缩放
            panSensitivity: 0 //设置为0无法平移
            // autoRotate: true //自动旋转
          }
        },
        series: series
      }
      return option
    },
    //获取3d丙图的最高扇区的高度
    getHeight3D(series, height) {
      series.sort((a, b) => {
        return b.pieData.value - a.pieData.value
      })
      return (height * 25) / series[0].pieData.value
    },
    // 生成扇形的曲面参数方程，用于 series-surface.parametricEquation
    getParametricEquation(startRatio, endRatio, isSelected, isHovered, k, h) {
      // 计算
      let midRatio = (startRatio + endRatio) / 2
      let startRadian = startRatio * Math.PI * 2
      let endRadian = endRatio * Math.PI * 2
      let midRadian = midRatio * Math.PI * 2
      // 如果只有一个扇形，则不实现选中效果。
      if (startRatio === 0 && endRatio === 1) {
        isSelected = true
      }
      // 通过扇形内径/外径的值，换算出辅助参数 k（默认值 1/3）
      k = typeof k !== 'undefined' ? k : 1 / 3
      // 计算选中效果分别在 x 轴、y 轴方向上的位移（未选中，则位移均为 0）
      let offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0
      let offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0
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
  }
}
</script>
<style lang="scss" scoped>
.main {
  width: 100%;
  height: 100%;
  .pie-charts {
    width: 100%;
    height: 100%;
    color: rgb(199, 200, 202);
  }
}
</style>
