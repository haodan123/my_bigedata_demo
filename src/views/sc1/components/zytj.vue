<template>
  <div class="zytjPage">
    <div class="zytjbox">
      <div class="zytjitem">
        <img src="@/assets/sc1/zytj_lan.png" alt="" class="zytjbg" />
        <div class="center_text">
          <div class="lan_text">{{resData.farm||2153}}</div>
          <div>养殖基地</div>
        </div>
      </div>
      <div class="zytjitem">
        <img src="@/assets/sc1/zytj_lv.png" alt="" class="zytjbg" />
        <div class="center_text">
          <div class="lv_text">{{resData.pond||2153}}</div>
          <div>养殖塘口</div>
        </div>
      </div>
      <div class="zytjitem">
        <img src="@/assets/sc1/zytj_lan.png" alt="" class="zytjbg" />
        <div class="center_text">
          <div class="lan_text">{{resData.warehouse||2153}}</div>
          <div>仓库</div>
        </div>
      </div>
      <div class="zytjitem">
        <img src="@/assets/sc1/zytj_lv.png" alt="" class="zytjbg" />
        <div class="center_text">
          <div class="lv_text">{{resData.person||2153}}</div>
          <div>养殖人员</div>
        </div>
      </div>
      <div class="zytjitem">
        <img src="@/assets/sc1/zytj_lan.png" alt="" class="zytjbg" />
        <div class="center_text">
          <div class="lan_text">{{resData.supplier||2153}}</div>
          <div>供应商</div>
        </div>
      </div>
      <div class="zytjitem">
        <img src="@/assets/sc1/zytj_lv.png" alt="" class="zytjbg" />
        <div class="center_text">
          <div class="lv_text">{{resData.customer||2153}}</div>
          <div>客户</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { requestGet } from '@/api/index.js'
import { onMounted, ref } from 'vue'
const resData = ref({})
onMounted(() => {
  getData()
})
const getData = async () => {
  const res = await requestGet('breeding-subject/')
  // console.log(res);
  resData.value = res.data
}
</script>

<style scoped lang="scss">
.zytjPage {
  width: 100%;
  height: 100%;
  position: relative;
}
.zytjbox {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(3, 31%);
  grid-template-rows: repeat(2, 50%);
  color: #fff;
  gap: 10px;
}
.zytjitem {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 95%;
  position: relative;
  justify-content: center;
  align-items: center;
}
.zytjbg {
  width: 80%;
  height: 90%;
}
.center_text {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  font-size: 0.625rem;
  text-align: center;
}
.lan_text {
  color: #7ac4e6;
  font-size: 1rem;
}
.lv_text {
  color: #91f8b3;
  font-size: 1rem;
}
</style>
