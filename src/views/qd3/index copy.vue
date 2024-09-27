<template>
  <div class="page_bg">
    <Loading v-if="loading"> </Loading>
    <div class="body_bg" v-else>
      <topHeader></topHeader>
      <div class="main_body anim_box">
        <div class="two_two_container_item" :class="isAnimBox ? 'anim_box_left' : ''" @click="changeAnim">
          <div class="two_two_view_item">
            <boxTitle title="湿度/温度/氨气走势"></boxTitle>
            <div class="t_t_view_item_container container_bg_border" @click.stop>
              <div class="inner">
                <div class="inner_box">
                  <wdsdaq></wdsdaq>
                </div>
              </div>
            </div>
          </div>
          <div class="two_two_view_item">
            <boxTitle title="各单元牛只概况列表"></boxTitle>
            <div class="t_t_view_item_container container_bg_border" @click.stop>
              <div class="inner">
                <div class="inner_box">
                  <gdynzgklb></gdynzgklb>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="two_two_container_center_map">
          <tMap></tMap>
        </div>
        <div class="two_two_container_item" :class="isAnimBox ? 'anim_box_right' : ''" @click="changeAnim">
          <div class="two_two_view_item">
            <boxTitle title="投入占比分析"></boxTitle>
            <div class="t_t_view_item_container container_bg_border" @click.stop>
              <div class="inner">
                <div class="inner_box">
                  <trpzbfx></trpzbfx>
                </div>
              </div>
            </div>
          </div>
          <div class="two_two_view_item">
            <boxTitle title="监控画面        "></boxTitle>
            <div class="t_t_view_item_container container_bg_border" @click.stop>
              <div class="inner">
                <div class="inner_box">
                  <zbVideo></zbVideo>
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
import zbVideo from '@/components/zbVideo/index.vue'
// import zbVideo from '@/components/zbVideo/ZhiBoK.vue'
import wdsdaq from './components/wdsdaq.vue.vue'
import tMap from './components/tMap.vue'
import trpzbfx from './components/trpzbfx.vue'
import gdynzgklb from './components/gdynzgklb.vue'
import { onMounted, ref } from 'vue'

// 切换动画 start
const isAnimBox = ref(false)
const changeAnim = () => {
  console.log('点击')
  isAnimBox.value = !isAnimBox.value
}
// 切换动画 end

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
