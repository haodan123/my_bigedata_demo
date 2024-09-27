<template>
  <div class="page_bg">
    <Loading v-if="loading"> </Loading>
    <div class="body_bg" v-else>
      <topHeader></topHeader>
      <div class="main_body anim_box anim_box">
        <div class="two_container_item" @click="changeAnim">
          <div
            class="two_t_view_item anim_in_left1"
            @mouseenter="onMouseEnter('l1')"
            @mouseleave="onMouseLeave('l1')"
            :class="isAnimBox_l1 ? 'anim_box_left' : ''"
          >
            <boxContainer title="园区存栏/出栏量">
              <yqclcl></yqclcl>
            </boxContainer>
          </div>
          <div
            class="two_t_view_item anim_in_left2"
            @mouseenter="onMouseEnter('l2')"
            @mouseleave="onMouseLeave('l2')"
            :class="isAnimBox_l2 ? 'anim_box_left' : ''"
          >
            <boxContainer title="园区奶牛产奶量">
              <lineEcharts
                :x-axis-data="nnData.xData"
                :y-axis-data="nnData.yData"
                :xname="nnData.xName"
                :yname="nnData.yName"
                :areaColor="nnData.color"
              ></lineEcharts>
            </boxContainer>
          </div>
        </div>
        <div class="two_container_center_map">
          <MapIndex></MapIndex>
        </div>

        <div class="body_bottom" style="transform: translateX(-27%)">
          <img class="body_bottom_img" src="@/assets/global/body_bottom.png" alt="" />
        </div>
      </div>
      
    </div>
  </div>
</template>

<script setup>
import Loading from '@/components/myLoading/index.vue'
import topHeader from '@/components/topHeader/index.vue'
import boxContainer from '@/components/boxContainer/index.vue'
import MapIndex from './components/MapIndex.vue'
import yqclcl from './components/yqclcl.vue'
import lineEcharts from '@/components/lineEcharts/index.vue'
import { onMounted, ref } from 'vue'

// 切换动画 start
const isAnimBox = ref(false)
const isAnimBox_l1 = ref(true)
const isAnimBox_l2 = ref(true)
const changeAnim = () => {
  console.log('点击')
  isAnimBox.value = !isAnimBox.value
}

const onMouseEnter = type => {
  if (type == 'l1') {
    isAnimBox_l1.value = false
  } else if (type == 'l2') {
    isAnimBox_l2.value = false
  } 
  isAnimBox.value = false
}
const onMouseLeave = type => {
  if (type == 'l1') {
    isAnimBox_l1.value = true
  } else if (type == 'l2') {
    isAnimBox_l2.value = true
  } 
  isAnimBox.value = true
}
// 切换动画 end

const nnData = ref({
  xData: ['1月', '2月', '3月', '4月', '5月', '6月'],
  yData: [1540, 1650, 1650, 1450, 1540, 1456],
  xName: '',
  // yName:'(%)'
  yName: '(吨)',
  color: '#F5C37E'
})
const loading = ref(true)
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
