<template>
  <div class="page_bg">
    <Loading v-if="loading"></Loading>
    <div class="body_bg" v-else>
      <topHeader_sc :textImg="jktextimg"></topHeader_sc>
      <div class="main_body">
        <view style="width: 75%"></view>
        <div class="sc1_container_item">
          <div class="sc1_view_item anim_in_right1">
            <boxContainer_sc :img="spicon" title="视频1">
              <div style="position: absolute; top: -30px; right: 0">
                <mySelect :dataList="dataList" @change="onChange" v-model="testValue"></mySelect>
              </div>
              <zbVideoVideojs></zbVideoVideojs>
            </boxContainer_sc>
          </div>
          <div class="sc1_view_item anim_in_right2">
            <boxContainer_sc :img="spicon" title="视频2">
              <div style="position: absolute; top: -30px; right: 0">
                <mySelect :dataList="dataList" @change="onChange" v-model="testValue"></mySelect>
              </div>
              <zbVideoVideojs></zbVideoVideojs>
            </boxContainer_sc>
          </div>
          <div class="sc1_view_item anim_in_right3">
            <boxContainer_sc :img="spicon" title="视频3">
              <div style="position: absolute; top: -30px; right: 0">
                <mySelect :dataList="dataList" @change="onChange" v-model="testValue"></mySelect>
              </div>
              <zbVideoVideojs></zbVideoVideojs>
            </boxContainer_sc>
          </div>
        </div>
      </div>
      <div class="map_main_view">
        <tMap></tMap>
      </div>
    </div>
  </div>
</template>

<script setup>
import Loading from '@/components/myLoading/index.vue'
import topHeader_sc from '@/components/topHeader_sc/index.vue'
// import topHeader from '@/components/topHeader/index.vue'
import lineEcharts from '@/components/lineEcharts/index.vue'
import boxContainer_sc from '@/components/boxContainer_sc/index.vue'
import mySelect from '@/components/mySelect/index.vue'
import zbVideoVideojs from '@/components/zbVideoVideojs/index.vue'

import tMap from './components/tMap.vue'
import { onMounted, ref } from 'vue'
import spicon from '@/assets/sc3/spicon.png'
import jktextimg from '@/assets/global_sc/jktextimg.png'

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

const cancelLoading = () => {
  setTimeout(() => {
    loading.value = false
  }, 500)
}
</script>

<style scoped lang="scss"></style>
