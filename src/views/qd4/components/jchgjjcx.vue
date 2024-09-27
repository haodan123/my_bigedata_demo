<template>
  <div class="yqxx_page">
    <div class="flex_container">
      <div class="yqxx_item" v-for="(item, index) in data" :key="index">
        <!-- <div style="display: flex; gap: 5px; align-items: center"> -->
        <div class="img_box">
          <img :src="hg_icon" alt="" class="yqxx_img" />
        </div>
        <div class="yqxx_item_info">
          <div style="color: #fff">{{ item.name }}</div>
          <div>检测时间</div>
          <div class="yqxx_item_info_btm">
            <div>2024-07-13</div>
            <div class="info_btn">合格</div>
          </div>
        </div>
        <!-- {{ item.name }} -->
        <!-- </div> -->
        <!-- <div class="text_Grey">{{ item.info }}</div> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import hg_icon from '@/assets/qd1/yznz.png'
import { onMounted, ref } from 'vue'
// import('@/assets/qd1/yzmj.png').then(res=>{
//   console.log(res.default);
// })
let data = ref()
onMounted(async () => {
  data.value = [
    {
      img: await import('@/assets/qd1/yzmj.png').then(res => res.default),
      name: '口蹄疫',
      info: '200亩'
    },
    {
      img: await import('@/assets/qd1/yzqs.png').then(res => res.default),
      name: '小反刍兽疫',
      info: '140个'
    },
    {
      img: await import('@/assets/qd1/yznz.png').then(res => res.default),
      name: '炭疽',
      info: '1214头'
    },
    {
      img: await import('@/assets/qd1/yzdy.png').then(res => res.default),
      name: '布鲁斯菌病',
      info: '5个'
    }
  ]
})
</script>

<style scoped lang="scss">
.yqxx_page {
  width: 100%;
  height: 100%;
}
.flex_container {
  // gap: 1.25rem;
  border-top: 0.25rem solid #4b3722;
  display: grid;
  height: 95%;
  width: 95%;
  margin: 0 auto;
  // margin-top: 5%;
  grid-template-columns: repeat(2, 50%);
  grid-template-rows: repeat(2, 50%);
  gap: 2%;
  padding: 2%;
  padding-top: 0;
}
.yqxx_item {
  position: relative;
  display: flex;
  align-items: center;
  font-size: 0.75rem;
  color: #deb377;
  width: 100%;
  height: 100%;
  // padding: .5rem;
  background: url('@/assets/qd4/hg_bg.png') no-repeat 100% 100%;
  background-size: cover;
  // gap: 0.3125rem;
}
.yqxx_item_info {
  flex: 1;
  display: flex;
  flex-direction: column;
  // gap: 0.625rem;
}
.yqxx_item_info_btm {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #838c91;
}
.info_btn {
  border: 1px solid #838c91;
  padding: 0.1875rem;
  color: #fff;
}
.img_box {
  height: 100%;
  width: 1.875rem;
  position: relative;
}
.yqxx_img {
  position: absolute;
  left: 0;
  top: 15%;
  width: 1.875rem;
  height: 1.875rem;
}
.text_Grey {
  color: #838c91;
}
</style>
