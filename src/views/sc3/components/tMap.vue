<template>
  <div class="map_box">
    <!-- <div style="width: 100%; height: 100%; position: relative"> -->
    <div id="tMapId" ref="tmapRef"></div>
    <div class="overlay"></div>
    <!-- </div> -->
    <!-- <div class="overlay"></div> -->
    <!-- <img src="@/assets/global/black_border.png" class="overlay"></img> -->
    <!-- <div class="drawbutton" @click="mapclick">开启绘制</div> -->
  </div>
</template>
<script setup>
import nslicon from '@/assets/qd4/nslicon.png'
import { onMounted, ref } from 'vue'

const timer = ref(null)
const tmapRef = ref()

const tMapKey = ref('acc1e58eaf724afef01413fd5fde9d11')
const tdtMap = ref(null)
const infoWindow = ref(null)
const polygonTool = ref(null) //标注工具对象
const markers = ref([
  {
    lnglat: [104.571, 27.916742],
    content: `弹出弹出弹出弹出弹出弹出弹出`
  }
])
const polygons = ref([
  {
    polygons: [
      [104.57179, 27.91694],
      [104.57194, 27.91705],
      [104.57294, 27.91652],
      [104.57358, 27.91594],
      [104.57202, 27.91581],
      [104.57199, 27.91629]
    ],
    color: '#088a65',
    borderColor: '#07f6b2',
    content: '烟叶'
  }
])
onMounted(() => {
  initMap()
  document.getElementsByClassName('tdt-control-copyright tdt-control')[0].style.display = 'none'
})
//初始化地图
const initMap = () => {
  tdtMap.value = new window.T.Map(tmapRef.value, {
    layers: [
      new window.T.TileLayer(
        'http://t0.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=' +
          tMapKey.value,
        { minZoom: 1, maxZoom: 18 }
      )
    ]
  })
  // tdtMap.value.centerAndZoom(new window.T.LngLat(119.93418, 36.13462), 17)
  // 出场动画
  tdtMap.value.centerAndZoom(new window.T.LngLat(119.93428, 36.13166), 10)
  timer.value = setInterval(() => {
    if (tdtMap.value.getZoom() < 17) {
      tdtMap.value.zoomIn()
    }
    if (tdtMap.value.getZoom() == 17) {
      clearInterval(timer.value)
    }
  }, 100)

  //添加地图点击事件
  tdtMap.value.addEventListener('click', e => {
    console.log(e.lnglat.getLng() + ',' + e.lnglat.getLat())
  })

  var config = {
    showLabel: true,
    color: 'blue',
    weight: 3,
    opacity: 0.5,
    fillColor: '#FFFFFF',
    fillOpacity: 0.5
  }
  //创建标注工具对象
  polygonTool.value = new window.T.PolygonTool(tdtMap.value, config)

  polygonTool.value.addEventListener('draw', e => {
    var polygon = e.currentLnglats.map(item => {
      return [item.lng, item.lat]
    })
    console.log(polygon)
  })
  infoWindow.value = new window.T.InfoWindow()

  // 气象传感器
  const qxcgqList = [
    {
      lnglat: [119.93428, 36.13166],
      yqmc: '融汇润达奶牛养殖示范园',
      fr: '崔总',
      lxfs: '13086429696',
      yzgm: '2000',
      mj: '103',
      yqjs: '融汇润达奶牛养殖示范园青岛嘉祥奶牛专业合作市'
    }
  ]

  qxcgqList.forEach(item => {
    addMarker(item.lnglat, item, nslicon)
  })

  polygons.value.forEach(item => {
    addRectangle(item.polygons, item.content, item.color, item.borderColor)
  })
}
const mapclick = () => {
  polygonTool.value.open()
}

//添加点标记
/**
 * 添加标注到地图上
 *
 * @param lnglat 经纬度坐标，数组格式，例如：[116.4074, 39.9092]
 * @param infoContent 信息窗口内容，可选，默认为"<div class='info_content'>信息窗口文本</div>"
 * @param iconParms 图标参数，可选，默认为{ url: position3, size: [30, 40], off: [15, 20] }
 *                    url：图标url
 *                    size：图标大小，数组格式，例如：[30, 40]
 *                    off：图标偏移量，数组格式，例如：[15, 20]
 */
const addMarker = (lnglat, infoContent, imgUrl, iconParms = { url: nslicon, size: [30, 30], off: [15, 40] }) => {
  //创建图片对象
  var icon = new window.T.Icon({
    iconUrl: imgUrl,
    iconSize: new window.T.Point(iconParms.size[0], iconParms.size[1]),
    iconAnchor: new window.T.Point(iconParms.off[0], iconParms.off[1])
  })

  //向地图上添加自定义标注
  var marker = new window.T.Marker(new window.T.LngLat(lnglat[0], lnglat[1]), { icon: icon })
  // 创建自定义信息窗口内容
  const infoWindowHtml = `
        <div class="custom-info-window">
            <div class='tc_item'> 
              <div>园区名称</div>:
              <div class="text_color">${infoContent.yqmc}</div>
            </div>
            <div class='tc_item'> 
              <div>法人</div>:
              <div class="text_color">${infoContent.fr}</div>
            </div>
            <div class='tc_item'> 
              <div>联系方式</div>:
              <div class="text_color">${infoContent.lxfs}</div>
            </div>
            <div class='tc_item'> 
              <div>养殖规模(头)</div>:
              <div class="text_color">${infoContent.yzgm}</div>
            </div>
            <div class='tc_item'> 
              <div>面积(亩)</div>:
              <div class="text_color">${infoContent.mj}</div>
            </div>
            <div class='tc_item'> 
              <div class="tc_item_1">园区介绍</div>:
              <div class="text_color">${infoContent.yqjs}</div>
            </div>
           
        </div>
      `

  // 创建信息窗口对象
  const infoWindow = new T.InfoWindow(infoWindowHtml, {
    offset: new T.Point(0, -30) // 信息窗口偏移量
  })
  setTimeout(() => {
    tdtMap.value.openInfoWindow(infoWindow, marker.getLngLat())
  }, 3000)
  // 绑定点击事件，打开信息窗口
  marker.addEventListener('mouseover', () => {
    tdtMap.value.openInfoWindow(infoWindow, marker.getLngLat())
  })

  marker.addEventListener('mouseout', () => {
    tdtMap.value.closeInfoWindow()
  })

  // 将标注添加到地图中
  tdtMap.value.addOverLay(marker)
}
const addRectangle = (points, content, color = '#12af82', borderColor) => {
  var pol = points.map(item => {
    return new window.T.LngLat(item[0], item[1])
  })

  //创建面对象
  var polygon = new window.T.Polygon(pol, {
    color: borderColor, // 边框颜色
    weight: 2, // 边框宽度
    // fillColor: color, // 填充颜色
    fillColor: borderColor, // 填充颜色
    fillOpacity: 0.3 // 填充透明度
  })

  //计算多边形的中心点 添加文本
  const center = calculatePolygonCenter(points)
  const label = new window.T.Label({
    text: content,
    position: new window.T.LngLat(center[0], center[1]),
    offset: new window.T.Point(-20, 0)
  })

  // 创建自定义信息窗口内容
  const infoWindowHtml = `
        <div class="custom-info-window">
          <div class='tc_item'> 
              <div>地块名称</div>:
              <div class="text_color">${content}种植一号地块</div>
            </div>
            <div class='tc_item'> 
              <div>地块品种</div>:
              <div class="text_color">${content}</div>
            </div>
            <div class='tc_item'> 
              <div>预估产值</div>:
              <div class="text_color">20吨</div>
            </div>
            <div class='tc_item'> 
              <div>地块负责人</div>:
              <div class="text_color">李某</div>
            </div>
            <div class='tc_item'> 
              <div>联系人电话</div>:
              <div class="text_color">15874295436</div>
            </div>
           
        </div>
      `
  // 创建信息窗口对象
  const infoWindow = new T.InfoWindow(infoWindowHtml, {
    offset: new T.Point(0, -10) // 信息窗口偏移量
  })

  // 绑定点击事件，打开信息窗口
  label.addEventListener('mouseover', () => {
    tdtMap.value.openInfoWindow(infoWindow, label.getLngLat())
  })

  label.addEventListener('mouseout', () => {
    tdtMap.value.closeInfoWindow()
  })

  label.setBackgroundColor('#00000000')
  label.setBorderColor('#00000000')
  label.setBorderColor('#00000000')
  label.setFontSize(10)
  label.setFontColor('#fffac9')
  tdtMap.value.addOverLay(label)
  tdtMap.value.addOverLay(polygon)
}
//计算多边形的中心点
const calculatePolygonCenter = vertices => {
  const len = vertices.length
  let x = 0
  let y = 0
  for (let i = 0; i < len; i++) {
    x += vertices[i][0]
    y += vertices[i][1]
  }
  x /= len
  y /= len
  return [x, y]
}
</script>

<style lang="scss">
.map_box {
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 3;
  // padding: 1.0625rem;
}
.map_border {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.gradient_mask {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99 !important;
  pointer-events: none;
  box-shadow: 0 0 50px 50px rgba(0, 0, 0, 0.5) inset;
}

#tMapId {
  width: 100%;
  height: 100%;
  position: relative;
  width: 100%;
  display: inline-block;
  position: relative;
  z-index: 1;
  border-radius: 10px;
}
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 10;
  background: url('@/assets/global_sc/black_border.png') no-repeat 100% 100%;
  background-size: cover;
}

.info_content {
  color: #fff;
  margin-top: 30px;
}

/*信息窗体样式 */
.tdt-infowindow-content-wrapper {
  min-width: 200px;
  min-height: 100px;
  background: url('@/assets/qd4/tan_box.png') center center no-repeat;
  background-size: 100% 100%;
  box-shadow: none;
  overflow: hidden;
}

.tc_item {
  display: flex;
  gap: 5px;
  color: #fff;
}
.tc_item_1 {
  width: 60px;
}
.text_color {
  color: #e7b555;
}

.tdt-marker-icon {
  // animation-name: showicon;
  transition: all 0.3s;
  animation-timing-function: ease-in-out;
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}
@keyframes showicon {
  0% {
    opacity: 0.5;
    transform: scale(0.9);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}

/* 信息窗体倒三角 */
.tdt-infowindow-tip {
  opacity: 0;
}

/* 信息窗体关闭按钮 */
.tdt-container a.tdt-infowindow-close-button {
  color: rgba(255, 255, 255, 0.8);
  right: 10px;
  top: 10px;
  /* visibility: hidden; */
}

.tdt-label {
  box-shadow: none;
  -webkit-box-shadow: none;
}

.drawbutton {
  width: 100px;
  height: 30px;
  background: #3285f9;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 50px;
  top: 50px;
  z-index: 9999;
}
</style>
