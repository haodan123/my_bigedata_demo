<template>
  <div class="page_bg">
    <Loading v-if="loading"></Loading>
    <div class="body_bg" v-else>
      <topHeader_sc :textImg="hktextimg"></topHeader_sc>
      <div class="main_body" style="flex-direction: column">
        <div class="sc2_container_item_top">
          <div style="width: 75%"></div>
          <div class="sc2_view_top">
            <div class="sc2_view_item_top anim_in_right1">
              <boxContainer_sc title="温湿度走势" :img="wsdcgqimg">
                <div style="position: absolute; top: -30px; right: 0">
                  <mySelect :dataList="dataList" @change="onChange" v-model="testValue"></mySelect>
                </div>
                <wsdzs
                  :xAxisData="wsdData.xData"
                  :wdyAxisData="wsdData.wdyAxisData"
                  :sdyAxisData="wsdData.sdyAxisData"
                  :wdyname="wsdData.wdyname"
                  :sdyname="wsdData.sdyname"
                  :xname="wsdData.xName"
                  :areaColor="wsdData.color"
                ></wsdzs>
              </boxContainer_sc>
            </div>
            <div class="sc2_view_item_top anim_in_right2" >
              <boxContainer_sc title="二氧化碳走势" :img="eyhdimg">
                <div style="position: absolute; top: -30px; right: 0">
                  <mySelect :dataList="dataList" @change="onChange" v-model="testValue"></mySelect>
                </div>
                <!-- <lineEcharts
                  :x-axis-data="eyData.xData"
                  :y-axis-data="eyData.yData"
                  :xname="eyData.xName"
                  :yname="eyData.yName"
                  :areaColor="eyData.color"
                ></lineEcharts> -->
                <lineEcharts_nobg
                  :x-axis-data="eyData.xData"
                  :y-axis-data="eyData.yData"
                  :xname="eyData.xName"
                  :yname="eyData.yName"
                  :areaColor="eyData.color"
                ></lineEcharts_nobg>
              </boxContainer_sc>
            </div>
          </div>
        </div>
        <div class="sc2_container_item_btm">
          <div class="sc2_view_item_btm anim_in_top1" >
            <boxContainer_sc title="设备控制" :img="sbkzimg">
              <sbkz></sbkz>
            </boxContainer_sc>
          </div>
          <div class="sc2_view_item_btm anim_in_top2" >
            <boxContainer_sc title="水质排名" :img="szpmimg">
              <szpm></szpm>
            </boxContainer_sc>
          </div>
          <div class="sc2_view_item_btm anim_in_top2" >
            <boxContainer_sc title="设备在线数量排名" :img="sbzxslpmimg">
              <sbzxslpm></sbzxslpm>
            </boxContainer_sc>
          </div>
          <div class="sc2_view_item_btm anim_in_top1" >
            <boxContainer_sc title="氮气走势" :img="dqcgqimg">
              <div style="position: absolute; top: -30px; right: 0">
                <mySelect :dataList="dataList" @change="onChange" v-model="testValue"></mySelect>
              </div>
              <lineEcharts_nobg
                :x-axis-data="nnData.xData"
                :y-axis-data="nnData.yData"
                :xname="nnData.xName"
                :yname="nnData.yName"
                :areaColor="nnData.color"
              ></lineEcharts_nobg>
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
import lineEcharts_nobg from '@/components/lineEcharts_nobg/index.vue'
import boxContainer_sc from '@/components/boxContainer_sc/index.vue'
import mySelect from '@/components/mySelect/index.vue'

import hktextimg from '@/assets/global_sc/hktextimg.png'
import yzgcxxlb from './components/yzgcxxlb.vue'
import wsdzs from './components/wsdzs.vue'
import szpm from './components/szpm.vue'
import sbzxslpm from './components/sbzxslpm.vue'
import tMap from './components/tMap.vue'
import sbkz from './components/sbkz.vue'

import eyhdimg from '@/assets/sc2/eyhd.png'
import sbkzimg from '@/assets/sc2/sbkz.png'
import sbzxslpmimg from '@/assets/sc2/sbzxslpm.png'
import szpmimg from '@/assets/sc2/szpm.png'
import wsdcgqimg from '@/assets/sc2/wsdcgq.png'
import dqcgqimg from '@/assets/sc2/dqcgq.png'
import { onMounted, ref } from 'vue'

const loading = ref(true)
const nnData = ref({
  xData: ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00'],
  yData: [1540, 1650, 1650, 1450, 1540, 1456],
  xName: '',
  // yName:'(%)'
  yName: '(%)',
  color: 'rgba(110, 110, 110,1)'
})
const eyData = ref({
  xData: ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00'],
  yData: [540, 650, 650, 450, 540, 456],
  xName: '',
  // yName:'(%)'
  yName: '(mmHg)',
  color: 'rgba(110, 110, 110,1)'
})
const wsdData = ref({
  xData: ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00'],
  wdyAxisData: [540, 650, 650, 450, 540, 456],
  sdyAxisData: [340, 750, 450, 550, 240, 556],
  xName: '',
  // yName:'(%)'
  wdyname: '(℃)',
  sdyname: '(%RH)',
  color: '#717070'
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
