<template>
  <div class="page_bg">
    <Loading v-if="loading"> </Loading>
    <div class="body_bg" v-else>
      <topHeader></topHeader>
      <div class="main_body_qd1 anim_box">
        <div class="t_container_item leftanim">
          <!-- @mouseenter="onMouseEnter"
          @mouseleave="onMouseLeave"
          :class="isAnimBox ? 'anim_box_left' : ''" -->
          <div
            class="t_t_view_item anim_in_left1"
            @mouseenter="onMouseEnter('l1')"
            @mouseleave="onMouseLeave('l1')"
            :class="isAnimBox_l1 ? 'anim_box_left' : ''"
          >
            <boxContainer title="园区信息">
              <yqxx></yqxx>
            </boxContainer>
          </div>
          <div
            class="t_t_view_item anim_in_left2"
            @mouseenter="onMouseEnter('l2')"
            @mouseleave="onMouseLeave('l2')"
            :class="isAnimBox_l2 ? 'anim_box_left' : ''"
          >
            <boxContainer title="园区存栏出栏排名">
              <yqclclpm></yqclclpm>
            </boxContainer>
          </div>
          <div
            class="t_t_view_item anim_in_left3"
            @mouseenter="onMouseEnter('l3')"
            @mouseleave="onMouseLeave('l3')"
            :class="isAnimBoxl_3 ? 'anim_box_left' : ''"
          >
            <boxContainer title="养殖信息">
              <yzxx></yzxx>
            </boxContainer>
          </div>
        </div>
        <div class="t_container_center_map"></div>
        <div class="t_container_item rightanim">
          <div
            class="t_t_view_item anim_in_right1"
            @mouseenter="onMouseEnter('r1')"
            @mouseleave="onMouseLeave('r1')"
            :class="isAnimBox_r1 ? 'anim_box_right' : ''"
          >
            <boxContainer title="单元排名">
              <dypm></dypm>
              <!-- <test3D></test3D> -->
            </boxContainer>
          </div>
          <div
            class="t_t_view_item anim_in_right2"
            @mouseenter="onMouseEnter('r2')"
            @mouseleave="onMouseLeave('r2')"
            :class="isAnimBox_r2 ? 'anim_box_right' : ''"
          >
            <boxContainer title="资源占比">
              <div style="display: flex; width: 100%; height: 100%">
                <div style="width: 60%; height: 100%">
                  <echarts_3dpie :optionData="peiData"></echarts_3dpie>
                </div>
                <div style="width: 40%; height: 100%" class="zyzb_box">
                  <div
                    class="zyzb_box_item"
                    :class="item.select ? 'zyzb_box_item_active' : ''"
                    v-for="(item, index) in listpeiData"
                    :key="index"
                    @click="testPai(item)"
                  >
                    <div class="zyzb_box_item_info">
                      <div class="zyzb_yuan" :style="{ borderColor: item.itemStyle.color }"></div>
                      {{ item.name }}
                    </div>
                    <div>
                      <span>{{ item.value }}</span>
                      <span>%</span>
                    </div>
                  </div>
                </div>
              </div>
            </boxContainer>
          </div>
          <div
            class="t_t_view_item anim_in_right3"
            @mouseenter="onMouseEnter('r3')"
            @mouseleave="onMouseLeave('r3')"
            :class="isAnimBox_r3 ? 'anim_box_right' : ''"
          >
            <boxContainer title="预警信息">
              <yjxx></yjxx>
            </boxContainer>
          </div>
        </div>

        <!-- 地图部分start -->
        <div class="main_view" ref="main_3d">
          <div
            class="zhezhao"
            ref="testmap"
            @mousedown="mousedown"
            @mousemove="mousemove"
            @mouseup="mouseup"
            @mouseleave="mouseleave"
          ></div>
          <!-- <img class="h_3d_bg" @load="imgOnLoadingr" src="@/assets/newPage/model.png" /> -->
          <img class="h_3d_bg" @load="imgOnLoadingr" src="@/assets/qd1/model.png" />
          <!-- <img
            class="h_3d_bg"
            v-if="!iconshow"
            style="position: absolute; top: 0; left: 50%; transform: translateX(-50%)"
            src="@/assets/qd1/model-fake.png"
          /> -->

          <div v-for="(item, index) in unitpoilist" :key="index">
            <el-popover placement="top" :show-arrow="false" :visible-arrow="0" trigger="click" popper-class="popoverBackB">
              <div class="popover_class">
                <div style="font-size: 18px; font-weight: bold">
                  {{ item.unitname }}
                </div>
                <div>包含圈舍：24个</div>
                <div>牛只数量：750只</div>
                <div>设备数量：12个</div>
              </div>
              <template v-slot:reference>
                <div style="position: absolute" :style="{ top: item.position[0], left: item.position[1] }">
                  <div class="div_unit_3d" v-if="iconshow">
                    {{ item.deviceName }}
                  </div>
                </div>
              </template>
            </el-popover>
          </div>

          <div v-for="(item, index) in sxtlist" :key="'poi2' + index">
            <!-- <el-popover placement="top" :visible-arrow="0" trigger="hover" popper-class="popoverBackB" v-if="item.playBackAddress"> -->
            <el-popover placement="top" :show-arrow="false" :visible-arrow="0" trigger="hover" popper-class="popoverBackB">
              <div class="popover_class">
                <div style="font-size: 18px; font-weight: bold">直播监控</div>
                <div>设备名称：{{ item.deviceName }}</div>
                <div>设备编号：{{ item.deviceId }}</div>
              </div>
              <template v-slot:reference>
                <div style="position: absolute" :style="{ top: item.position[0], left: item.position[1] }">
                  <div class="div_3d" v-if="iconshow && sxtshow">
                    <img
                      class="allimg anim_auto"
                      @click="imgclick('sxt', item.playBackAddress)"
                      src="@/assets/qd1/icon_sxt.png"
                    />
                    <img
                      :style="{
                        top: item.position[2],
                        left: item.position[3],
                        transform: `rotateZ(${item.position[4]})`
                      }"
                      src="@/assets/qd1/guang5.png"
                      class="guangzhao gzdh"
                      v-if="iconshow && sxtshow"
                    />
                  </div>
                </div>
              </template>
            </el-popover>
          </div>

          <div v-for="(item, index) in jczpoilist" :key="'poi3' + index">
            <el-popover placement="top" :show-arrow="false" :visible-arrow="0" trigger="hover" popper-class="popoverBackB">
              <div class="popover_class">
                <div style="font-size: 18px; font-weight: bold">圈舍传感器</div>
                <div>设备编号：{{ item.deviceId }}</div>
                <div>温度：{{ item.temperature }}(℃)</div>
                <div>湿度：{{ item.humidity }}(%)</div>
              </div>
              <template v-slot:reference>
                <div style="position: absolute" :style="{ top: item.position[0], left: item.position[1] }">
                  <div class="div_3d poi3 anim_poi3" v-if="iconshow && cgqshow" @click="imgclick()"></div>
                </div>
              </template>
            </el-popover>
          </div>

          <div v-for="(item, index) in slpoilist" :key="'poi4' + index">
            <el-popover placement="top" :show-arrow="false" :visible-arrow="0" trigger="hover" popper-class="popoverBackB">
              <div class="popover_class">
                <div style="font-size: 18px; font-weight: bold">智能水帘</div>
                <div>正向水流量：{{ item.flowRate || 0 }}(m³)</div>
                <div>反向水流量：{{ item.fanRate || 0 }}(m³)</div>
              </div>
              <template v-slot:reference>
                <div style="position: absolute" :style="{ top: item.position[0], left: item.position[1] }">
                  <div class="div_3d poi4 anim_poi4" v-if="iconshow && slshow" @click="imgclick()"></div>
                </div>
              </template>
            </el-popover>
          </div>

          <div v-for="(item, index) in qxypoilist" :key="'poi5' + index">
            <el-popover placement="top" :show-arrow="false" :visible-arrow="0" trigger="hover" popper-class="popoverBackB">
              <div class="popover_class">
                <div style="font-size: 18px; font-weight: bold">智能风机</div>
                <div>设备编号：{{ item.deviceId }}</div>
                <div>co2：{{ item.co || 0 }}</div>
                <div>光照：{{ item.illumination || 0 }}(lux)</div>
                <div>硫化氢：{{ item.hs || 0 }}(ppm)</div>
                <div>氨气：{{ item.an || 0 }}(ppm)</div>
              </div>
              <template v-slot:reference>
                <div style="position: absolute" :style="{ top: item.position[0], left: item.position[1] }">
                  <div class="div_3d poi2 anim_poi2" v-if="iconshow && jcyshow" @click="imgclick()"></div>
                  <!-- <img src="@/assets/newPage/fjfx.gif" class="fengjifx fjdh" v-if="iconshow && jcyshow" /> -->
                  <img src="@/assets/qd1/fjfx.gif" class="fengjifx fjdh" v-if="iconshow && jcyshow" />
                </div>
              </template>
            </el-popover>
          </div>

          <div v-for="(item, index) in cgqcenterList" :key="'poi6' + index">
            <el-popover placement="top" :show-arrow="false" :visible-arrow="0" trigger="hover" popper-class="popoverBackB">
              <div class="popover_class">
                <div style="font-size: 18px; font-weight: bold">环境传感器</div>
                <div>设备编号：{{ item.deviceId }}</div>
              </div>
              <template v-slot:reference>
                <div style="position: absolute" :style="{ top: item.position[0], left: item.position[1] }">
                  <div class="div_3d poi51 anim_poi5" v-if="iconshow && cgqzxshow" @click="imgclick()"></div>
                </div>
              </template>
            </el-popover>
          </div>
        </div>

        <div class="new_bg_bottom">
          <img src="@/assets/qd1/bg_bottom.jpg" alt="" />
          <div class="new_bg_bottom_map_box">
            <div
              class="new_bg_bottom_map_text"
              :class="jcyshow ? 'new_bg_bottom_map_text_active' : ''"
              @click="fjShowClick"
            >
              <img src="@/assets/qd1/znfj_a.png" alt="" class="new_bg_bottom_map_text_img" />
              智能风机
            </div>
            <div
              class="new_bg_bottom_map_text"
              :class="cgqshow ? 'new_bg_bottom_map_text_active' : ''"
              @click="cgqShowClick"
            >
              <img
                style="width: 1.25rem; height: 1.25rem"
                src="@/assets/qd1/qsgcq_a.png"
                alt=""
                class="new_bg_bottom_map_text_img"
              />

              圈舍传感器
            </div>
            <div
              class="new_bg_bottom_map_text"
              :class="sxtshow ? 'new_bg_bottom_map_text_active' : ''"
              @click="sxtShowClick"
            >
              <img src="@/assets/qd1/zbjk_a.png" alt="" class="new_bg_bottom_map_text_img" />

              直播监控
            </div>
            <div
              class="new_bg_bottom_map_text"
              :class="slshow ? 'new_bg_bottom_map_text_active' : ''"
              @click="slShowClick"
            >
              <img src="@/assets/qd1/znsl_a.png" alt="" class="new_bg_bottom_map_text_img" />

              智能水帘
            </div>
            <div
              class="new_bg_bottom_map_text"
              :class="cgqzxshow ? 'new_bg_bottom_map_text_active' : ''"
              @click="hjShowClick"
            >
              <img src="@/assets/qd1/hjcgq_a.png" alt="" class="new_bg_bottom_map_text_img" />

              环境传感器
            </div>
          </div>
        </div>
        <!-- 地图部分end -->
      </div>

      <!-- 底座 -->
      <!-- <div class="body_bottom">
        <img class="body_bottom_img" src="@/assets/global/body_bottom.png" alt="" />
      </div> -->
      <!-- 底部的按钮 -->
      <div class="body_bottom_map_bg">
        <!-- <div
          class="body_bottom_map_text"
          :class="jcyshow ? 'body_bottom_map_text_active' : ''"
          style="top: 50%; left: 9%"
          @click="fjShowClick"
        >
          <img src="@/assets/qd1/znfj_a.png" alt="" class="body_bottom_map_text_img" />
          智能风机
        </div>
        <div
          class="body_bottom_map_text"
          :class="cgqshow ? 'body_bottom_map_text_active' : ''"
          style="top: 25%; left: 26%"
          @click="cgqShowClick"
        >
          <img
            style="width: 1.25rem; height: 1.25rem"
            src="@/assets/qd1/qsgcq_a.png"
            alt=""
            class="body_bottom_map_text_img"
          />

          圈舍传感器
        </div>
        <div
          class="body_bottom_map_text"
          :class="sxtshow ? 'body_bottom_map_text_active' : ''"
          style="top: 0%; left: 48%"
          @click="sxtShowClick"
        >
          <img src="@/assets/qd1/zbjk_a.png" alt="" class="body_bottom_map_text_img" />

          直播监控
        </div>
        <div
          class="body_bottom_map_text"
          :class="slshow ? 'body_bottom_map_text_active' : ''"
          style="top: 25%; right: 26%"
          @click="slShowClick"
        >
          <img src="@/assets/qd1/znsl_a.png" alt="" class="body_bottom_map_text_img" />

          智能水帘
        </div>
        <div
          class="body_bottom_map_text"
          :class="cgqzxshow ? 'body_bottom_map_text_active' : ''"
          style="top: 50%; right: 9%"
          @click="hjShowClick"
        >
          <img src="@/assets/qd1/hjcgq_a.png" alt="" class="body_bottom_map_text_img" />

          环境传感器
        </div> -->
        <img class="body_bottom_map_bg_img" src="@/assets/global/bottom_bg.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script setup>
import BigNumber from 'bignumber.js'

import Loading from '@/components/myLoading/index.vue'
import topHeader from '@/components/topHeader/index.vue'
import echarts_3dpie from '@/components/echarts_3dpie/index.vue'
import boxContainer from '@/components/boxContainer/index.vue'
import yjxx from './components/yjxx.vue'
import test3D from './components/test3D.vue'
import yzxx from './components/yzxx.vue'
import dypm from './components/dypm.vue'
import yqclclpm from './components/yqclclpm.vue'
import yqxx from './components/yqxx.vue'
import { computed, onMounted, ref } from 'vue'
import alldata from './home.js'

// 切换动画 start
const isAnimBox = ref(true)

const isAnimBox_l1 = ref(true)
const isAnimBox_l2 = ref(true)
const isAnimBoxl_3 = ref(true)

const isAnimBox_r1 = ref(true)
const isAnimBox_r2 = ref(true)
const isAnimBox_r3 = ref(true)

const onMouseEnter = type => {
  if (type == 'l1') {
    isAnimBox_l1.value = false
  } else if (type == 'l2') {
    isAnimBox_l2.value = false
  } else if (type == 'l3') {
    isAnimBoxl_3.value = false
  } else if (type == 'r1') {
    isAnimBox_r1.value = false
  } else if (type == 'r2') {
    isAnimBox_r2.value = false
  } else if (type == 'r3') {
    isAnimBox_r3.value = false
  }
  isAnimBox.value = false
}
const onMouseLeave = type => {
  if (type == 'l1') {
    isAnimBox_l1.value = true
  } else if (type == 'l2') {
    isAnimBox_l2.value = true
  } else if (type == 'l3') {
    isAnimBoxl_3.value = true
  } else if (type == 'r1') {
    isAnimBox_r1.value = true
  } else if (type == 'r2') {
    isAnimBox_r2.value = true
  } else if (type == 'r3') {
    isAnimBox_r3.value = true
  }
  isAnimBox.value = true
}
// 切换动画 end

// 3d饼图start
const listpeiData = ref([
  {
    name: '奶牛',
    value: 60,
    select: true,
    impoConsSort: '0101',
    itemStyle: { color: 'rgba(160, 128, 64,0.7)' }
  },
  {
    name: '种母牛',
    value: 14,
    select: true,
    impoConsSort: '0101',
    itemStyle: { color: 'rgba(199, 200, 202,0.7)' }
  },
  {
    name: ' 肉牛',
    value: 14,
    select: true,
    impoConsSort: '0101',
    itemStyle: { color: 'rgba(237, 115, 46,0.7)' }
  },
  {
    name: '种公牛',
    value: 12,
    select: true,
    impoConsSort: '0101',
    itemStyle: { color: 'rgba(123, 149, 165,0.7)' }
  }
])
const peiData = computed(() => {
  return listpeiData.value.filter(item => item.select)
})
const testPai = item => {
  // item.select = !item.select
}
// 3d饼图end

const unitpoilist = ref(alldata.unitpoilist)
const sxtlist = ref(alldata.sxtlist)
const jczpoilist = ref(alldata.jczpoilist)
const slpoilist = ref(alldata.slpoilist)
const qxypoilist = ref(alldata.qxypoilist)
const cgqcenterList = ref(alldata.cgqcenterList)

const main_3d = ref()
const testmap = ref() //地图的ref 用来绑定拖动函数  因为直接在标签总绑定会有一些浏览器报错

const loading = ref(true)
onMounted(() => {
  cancelLoading()

  onwheellister()

  // setTimeout(() => {
  // drawswitch()
  //   testmap.value.addEventListener('mousedown', mousedown, { passive: true })
  // testmap.value.addEventListener('mousemove', mousemove, { passive: true })
  // testmap.value.addEventListener('mouseup', mouseup, { passive: true })
  // testmap.value.addEventListener('mouseleave', mouseleave, { passive: true })
  // }, 1000)
})

const cancelLoading = () => {
  setTimeout(() => {
    loading.value = false
  }, 500)
}

// 中间的地图 start
const startmove = ref(false)
const drawshow = ref(false)
const iconshow = ref(false)
const sxtshow = ref(true) //摄像头显示
const slshow = ref(true) //水帘显示
const cgqshow = ref(true) //传感器显示
const jcyshow = ref(true) //风机显示
const cgqzxshow = ref(true) //传感器中间的点
const movex = ref(0)
const movey = ref(0)
const scale = ref(new BigNumber(1))
// 风机显示
const fjShowClick = () => {
  jcyshow.value = !jcyshow.value
}
// 摄像头显示
const sxtShowClick = () => {
  sxtshow.value = !sxtshow.value
}
// 水帘显示
const slShowClick = () => {
  slshow.value = !slshow.value
}
// 传感器显示
const cgqShowClick = () => {
  cgqshow.value = !cgqshow.value
}
// 环境显示
const hjShowClick = () => {
  cgqzxshow.value = !cgqzxshow.value
}

const imgOnLoadingr = e => {
  iconshow.value = true
}

const mousedown = () => {
  startmove.value = true
}
const mouseup = () => {
  startmove.value = false
}
const mouseleave = () => {
  startmove.value = false
}
const mousemove = e => {
  if (startmove.value) {
    // var wheel = document.getElementById('main_3d')
    var wheel = main_3d.value
    movex.value += e.movementX
    movey.value += e.movementY
    wheel.style.transform =
      `scale(` + scale.value.toString() + `) translate(` + movex.value + `px,` + movey.value + `px)`
  }
}
const onwheellister = () => {
  window.addEventListener(
    'mousewheel',
    e => {
      // var wheel = document.getElementById('main_3d')
      var wheel = main_3d.value
      if (e.deltaY <= 0) {
        if (scale.value < 5) {
          scale.value = scale.value.plus(0.1)
          wheel.style.transform =
            `scale(` + scale.value.toString() + `) translate(` + movex.value + `px,` + movey.value + `px)`
        }
      } else {
        if (scale.value > 0.1) {
          scale.value = scale.value.minus(0.1)

          wheel.style.transform =
            `scale(` + scale.value.toString() + `) translate(` + movex.value + `px,` + movey.value + `px)`
        }
      }
    },
    { passive: true }
  )
}

// 地图end
</script>

<style  lang="scss">
@import './index.scss';
.zyzb_box {
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%;
  padding-right: 2%;
  justify-content: center;

  .zyzb_box_item {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #62758a;
    font-size: 0.75rem;
  }
  .zyzb_box_item_active {
    color: #fff;
  }
  .zyzb_box_item_info {
    display: flex;
    gap: 10px;
  }
  .zyzb_yuan {
    border-radius: 50%;
    width: 15px;
    height: 15px;
    border: 3px solid;
  }
}
</style>
