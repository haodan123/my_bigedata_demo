<template>
  <div class="page_bg">
    <Loading v-if="loading"> </Loading>
    <div class="body_bg" v-else>
      <topHeader></topHeader>
      <div class="main_body anim_box">
        <div class="t_container_item" :class="isAnimBox ? 'anim_box_left' : ''" @click="changeAnim">
          <div class="t_t_view_item">
            <boxTitle title="产奶量趋势"></boxTitle>
            <div class="t_t_view_item_container container_bg_border" @click.stop>
              <div class="inner">
                <div class="inner_box">
                  <lineEcharts
                    :x-axis-data="nnData.xData"
                    :y-axis-data="nnData.yData"
                    :xname="nnData.xName"
                    :yname="nnData.yName"
                    :areaColor="nnData.color"
                  ></lineEcharts>
                </div>
              </div>
            </div>
          </div>
          <div class="t_t_view_item">
            <boxTitle title="养殖过程信息列表"></boxTitle>
            <div class="t_t_view_item_container container_bg_border" @click.stop>
              <div class="inner">
                <div class="inner_box">
                  <yzgcxxlb></yzgcxxlb>
                </div>
              </div>
            </div>
          </div>
          <div class="t_t_view_item">
            <boxTitle title="耳标牛只预警"></boxTitle>
            <div class="t_t_view_item_container container_bg_border" @click.stop>
              <div class="inner">
                <div class="inner_box">
                  <ebnzyj></ebnzyj>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="t_container_center_map">
          <tMap></tMap>
        </div>
        <div class="t_container_item" :class="isAnimBox ? 'anim_box_right' : ''" @click="changeAnim">
          <div class="t_t_view_item">
            <boxTitle title="检测合格及检测项"></boxTitle>
            <div class="t_t_view_item_container container_bg_border" @click.stop>
              <div class="inner">
                <div class="inner_box">
                  <jchgjjcx></jchgjjcx>
                </div>
              </div>
            </div>
          </div>
          <div class="t_t_view_item">
            <boxTitle title="圈舍预警"></boxTitle>
            <div class="t_t_view_item_container container_bg_border" @click.stop>
              <div class="inner">
                <div class="inner_box">
                  <qsyj></qsyj>
                </div>
              </div>
            </div>
          </div>
          <div class="t_t_view_item">
            <boxTitle title="检测信息列表"></boxTitle>
            <div class="t_t_view_item_container container_bg_border" @click.stop>
              <div class="inner">
                <div class="inner_box">
                  <jcxxlb></jcxxlb>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="body_bottom">
          <img class="body_bottom_img" src="@/assets/global/body_bottom.png" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Loading from '@/components/myLoading/index.vue'
import topHeader from '@/components/topHeader/index.vue'
import boxTitle from '@/components/boxTitle/index.vue'

import lineEcharts from '@/components/lineEcharts/index.vue'

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
