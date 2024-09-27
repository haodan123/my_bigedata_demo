<template>
  <div class="page_bg">
    <Loading v-if="loading"></Loading>
    <div class="body_bg" v-else>
      <topHeader></topHeader>
      <div class="main_body anim_box">
        <div class="t_container_item" @click="changeAnim">
          <div
            class="t_t_view_item anim_in_left1"
            @mouseenter="onMouseEnter('l1')"
            @mouseleave="onMouseLeave('l1')"
            :class="isAnimBox_l1 ? 'anim_box_left' : ''"
          >
            <boxContainer title="产奶量趋势">
              <lineEcharts
                :x-axis-data="nnData.xData"
                :y-axis-data="nnData.yData"
                :xname="nnData.xName"
                :yname="nnData.yName"
                :areaColor="nnData.color"
              ></lineEcharts>
            </boxContainer>
          </div>
          <div
            class="t_t_view_item anim_in_left2"
            @mouseenter="onMouseEnter('l2')"
            @mouseleave="onMouseLeave('l2')"
            :class="isAnimBox_l2 ? 'anim_box_left' : ''"
          >
            <boxContainer title="养殖过程信息列表">
              <yzgcxxlb></yzgcxxlb>
            </boxContainer>
          </div>
          <div
            class="t_t_view_item anim_in_left3"
            @mouseenter="onMouseEnter('l3')"
            @mouseleave="onMouseLeave('l3')"
            :class="isAnimBox_l3 ? 'anim_box_left' : ''"
          >
            <boxContainer title="耳标牛只预警">
              <ebnzyj></ebnzyj>
            </boxContainer>
          </div>
        </div>
        <div class="t_container_center_map">
          <tMap></tMap>
        </div>
        <div class="t_container_item" @click="changeAnim">
          <div
            class="t_t_view_item anim_in_right1"
            @mouseenter="onMouseEnter('r1')"
            @mouseleave="onMouseLeave('r1')"
            :class="isAnimBox_r1 ? 'anim_box_right' : ''"
          >
            <boxContainer title="检测合格及检测项">
              <jchgjjcx></jchgjjcx>
            </boxContainer>
          </div>
          <div
            class="t_t_view_item anim_in_right2"
            @mouseenter="onMouseEnter('r2')"
            @mouseleave="onMouseLeave('r2')"
            :class="isAnimBox_r2 ? 'anim_box_right' : ''"
          >
            <boxContainer title="圈舍预警">
              <qsyj></qsyj>
            </boxContainer>
          </div>
          <div
            class="t_t_view_item anim_in_right3"
            @mouseenter="onMouseEnter('r3')"
            @mouseleave="onMouseLeave('r3')"
            :class="isAnimBox_r3 ? 'anim_box_right' : ''"
          >
            <boxContainer title="检测信息列表">
              <jcxxlb></jcxxlb>
            </boxContainer>
          </div>
        </div>

        <div class="body_bottom">
          <img class="body_bottom_img" src="@/assets/global/body_bottom.png" alt="" />
        </div>
      </div>

      <div class="body_bottom_map_bg">
        <img class="body_bottom_map_bg_img" src="@/assets/global/bottom_bg.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script setup>
import Loading from '@/components/myLoading/index.vue'
import topHeader from '@/components/topHeader/index.vue'
import lineEcharts from '@/components/lineEcharts/index.vue'
import boxContainer from '@/components/boxContainer/index.vue'

import yzgcxxlb from './components/yzgcxxlb.vue'
import ebnzyj from './components/ebnzyj.vue'
import qsyj from './components/qsyj.vue'
import jcxxlb from './components/jcxxlb.vue'
import jchgjjcx from './components/jchgjjcx.vue'
import tMap from './components/tMap.vue'
import { onMounted, ref } from 'vue'

// 切换动画 start
const isAnimBox = ref(false)
const changeAnim = () => {
  console.log('点击')
  isAnimBox.value = !isAnimBox.value
}

const isAnimBox_l1 = ref(true)
const isAnimBox_l2 = ref(true)
const isAnimBox_l3 = ref(true)

const isAnimBox_r1 = ref(true)
const isAnimBox_r2 = ref(true)
const isAnimBox_r3 = ref(true)

const onMouseEnter = type => {
  if (type == 'l1') {
    isAnimBox_l1.value = false
  } else if (type == 'l2') {
    isAnimBox_l2.value = false
  } else if (type == 'l3') {
    isAnimBox_l3.value = false
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
    isAnimBox_l3.value = true
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

const loading = ref(true)
const nnData = ref({
  xData: ['1月', '2月', '3月', '4月', '5月', '6月'],
  yData: [1540, 1650, 1650, 1450, 1540, 1456],
  xName: '',
  // yName:'(%)'
  yName: '(吨)',
  color: '#1D87F0'
})
onMounted(() => {
  cancelLoading()
})

const cancelLoading = () => {
  setTimeout(() => {
    loading.value = false
  }, 500)
}
</script>

<style scoped lang="scss"></style>
