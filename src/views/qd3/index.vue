<template>
  <div class="page_bg">
    <Loading v-if="loading"> </Loading>
    <div class="body_bg" v-else>
      <topHeader></topHeader>
      <div class="main_body anim_box">
        <div class="two_two_container_item" @click="changeAnim">
          <div
            class="two_two_view_item anim_in_left1"
            @mouseenter="onMouseEnter('l1')"
            @mouseleave="onMouseLeave('l1')"
            :class="isAnimBox_l1 ? 'anim_box_left' : ''"
          >
            <boxContainer title="湿度/温度/氨气走势">
              <wdsdaq></wdsdaq>
            </boxContainer>
          </div>
          <div
            class="two_two_view_item anim_in_left2"
            @mouseenter="onMouseEnter('l2')"
            @mouseleave="onMouseLeave('l2')"
            :class="isAnimBox_l2 ? 'anim_box_left' : ''"
          >
            <boxContainer title="各单元牛只概况列表">
              <gdynzgklb></gdynzgklb>
            </boxContainer>
          </div>
        </div>
        <div class="two_two_container_center_map">
          <tMap></tMap>
        </div>
        <div class="two_two_container_item" @click="changeAnim">
          <div
            class="two_two_view_item anim_in_right1"
            @mouseenter="onMouseEnter('r1')"
            @mouseleave="onMouseLeave('r1')"
            :class="isAnimBox_r1 ? 'anim_box_right' : ''"
          >
            <boxContainer title="投入占比分析">
              <trpzbfx></trpzbfx>
            </boxContainer>
          </div>
          <div
            class="two_two_view_item anim_in_right2"
            @mouseenter="onMouseEnter('r2')"
            @mouseleave="onMouseLeave('r2')"
            :class="isAnimBox_r2 ? 'anim_box_right' : ''"
          >
            <boxContainer title="监控画面">
              <zbVideo></zbVideo>
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
import zbVideo from '@/components/zbVideoXgPlay/index.vue' //西瓜视频
// import zbVideo from '@/components/zbVideoVideojs/index.vue' //videojs
import boxContainer from '@/components/boxContainer/index.vue'
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

const isAnimBox_l1 = ref(true)
const isAnimBox_l2 = ref(true)

const isAnimBox_r1 = ref(true)
const isAnimBox_r2 = ref(true)

const onMouseEnter = type => {
  if (type == 'l1') {
    isAnimBox_l1.value = false
  } else if (type == 'l2') {
    isAnimBox_l2.value = false
  } else if (type == 'r1') {
    isAnimBox_r1.value = false
  } else if (type == 'r2') {
    isAnimBox_r2.value = false
  }
  isAnimBox.value = false
}
const onMouseLeave = type => {
  if (type == 'l1') {
    isAnimBox_l1.value = true
  } else if (type == 'l2') {
    isAnimBox_l2.value = true
  } else if (type == 'r1') {
    isAnimBox_r1.value = true
  } else if (type == 'r2') {
    isAnimBox_r2.value = true
  }
  isAnimBox.value = true
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
