<template>
  <div class="page_bg">
    <Loading v-if="loading"></Loading>
    <div class="body_bg" v-else>
      <topHeader_sc :textImg="yztextimg"></topHeader_sc>
      <div class="main_body">
        <div class="sc1_container_item" v-if="popState">
          <div class="sc1_view_item anim_in_left1">
            <boxContainer_sc :img="zytjimg" title="资源统计">
              <zytj></zytj>
            </boxContainer_sc>
          </div>
          <div class="sc1_view_item anim_in_left2">
            <boxContainer_sc :img="tkcmpmimg" title="塘口存苗排名">
              <tkcmpm></tkcmpm>
            </boxContainer_sc>
          </div>
          <div class="sc1_view_item anim_in_left3">
            <boxContainer_sc :img="cyxsimg" title="成鱼销售">
              <cyxs></cyxs>
            </boxContainer_sc>
          </div>
        </div>
        <view style="width: 50%" v-if="popState"></view>
        <div class="sc1_container_item" v-if="popState">
          <div class="sc1_view_item anim_in_right1">
            <boxContainer_sc :img="pzzbimg" title="品种占比">
              <pzzb></pzzb>
            </boxContainer_sc>
          </div>
          <div class="sc1_view_item anim_in_right2">
            <boxContainer_sc :img="shfximg" title="损耗分析">
              <shfx></shfx>
            </boxContainer_sc>
          </div>
          <div class="sc1_view_item anim_in_right3">
            <boxContainer_sc :img="dbtrimg" title="动保投入">
              <dbtr></dbtr>
            </boxContainer_sc>
          </div>
        </div>
        <!-- 弹窗的组件 start -->
        <ytPopBox @close="closePop" :open="!popState" v-if="!popState"></ytPopBox>
        <!-- 弹窗的组件 end -->
      </div>
      <div class="map_main_view">
        <tMap @openThePop="openThePop"></tMap>
      </div>
    </div>
  </div>
</template>

<script setup>
import Loading from '@/components/myLoading/index.vue'
import topHeader_sc from '@/components/topHeader_sc/index.vue'
import lineEcharts from '@/components/lineEcharts/index.vue'
import boxContainer_sc from '@/components/boxContainer_sc/index.vue'
import mySelect from '@/components/mySelect/index.vue'
import tkcmpm from './components/tkcmpm.vue'
import shfx from './components/shfx.vue'
import pzzb from './components/pzzb.vue'
import dbtr from './components/dbtr.vue'
import cyxs from './components/cyxs.vue'
import tMap from './components/tMap.vue'
import ytPopBox from './components/ytPopBox.vue'
import zytj from './components/zytj.vue'
import { onMounted, ref } from 'vue'

import yztextimg from '@/assets/global_sc/yztextimg.png'
import cyxsimg from '@/assets/sc1/cyxs.png'
import dbtrimg from '@/assets/sc1/dbtr.png'
import pzzbimg from '@/assets/sc1/pzzb.png'
import shfximg from '@/assets/sc1/shfx.png'
import tkcmpmimg from '@/assets/sc1/tkcmpz.png'
import zytjimg from '@/assets/sc1/zytj.png'

const loading = ref(true)
const nnData = ref({
  xData: ['1月', '2月', '3月', '4月', '5月', '6月'],
  yData: [1540, 1650, 1650, 1450, 1540, 1456],
  xName: '',
  // yName:'(%)'
  yName: '(吨)',
  color: '#1D87F0'
})

const testValue = ref('')
const dataList = ref([
  { lable: '选项1', value: 1 },
  { lable: '选项2', value: 2 },
  { lable: '选项3', value: 3 },
  { lable: '选项4', value: 4 },
  { lable: '选项5', value: 5 }
])
const onChange = e => {
  console.log(e, testValue.value)
}
onMounted(() => {
  cancelLoading()
})

const popState = ref(true)

// 打开弹窗
const openThePop = () => {
  // popState.value = false
  popState.value = !popState.value
}
// 关闭弹窗
const closePop = () => {
  popState.value = true
}

const cancelLoading = () => {
  setTimeout(() => {
    loading.value = false
  }, 500)
}
</script>

<style scoped lang="scss"></style>
