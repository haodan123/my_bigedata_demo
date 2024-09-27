<template>
  <div class="page_bg">
    <Loading v-if="loading"> </Loading>
    <div class="body_bg" v-else>
      <topHeader></topHeader>
      <div class="main_body anim_box anim_box">
        <div class="two_container_item" :class="isAnimBox ? 'anim_box_left' : ''" @click="changeAnim">
          <div class="two_t_view_item">
            <boxTitle title="园区存栏/出栏量"></boxTitle>
            <div class="t_t_view_item_container container_bg_border" @click.stop>
              <div class="inner">
                <div class="inner_box">
                  <yqclcl></yqclcl>
                </div>
              </div>
            </div>
          </div>
          <div class="two_t_view_item">
            <boxTitle title="园区奶牛产奶量"></boxTitle>
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
import boxTitle from '@/components/boxTitle/index.vue'
import MapIndex from './components/MapIndex.vue'
import yqclcl from './components/yqclcl.vue'
import lineEcharts from '@/components/lineEcharts/index.vue'
import { onMounted, ref } from 'vue'

// 切换动画 start
const isAnimBox = ref(false)
const changeAnim = () => {
  console.log('点击')
  isAnimBox.value = !isAnimBox.value
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
