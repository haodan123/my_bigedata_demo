<template>
  <div class="yqxx_page">
    <div class="flex_container">
      <div class="yqxx_item" v-for="(item, index) in data" :key="index">
        <div style="display: flex; gap: 5px; align-items: center">
          <img :src="item.img" alt="" class="yqxx_img" />
          {{ item.name }}
        </div>
        <div class="text_Grey">{{ item.info }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import yzmj from '@/assets/qd1/yzmj.png'
import yzqs from '@/assets/qd1/yzqs.png'
import yznz from '@/assets/qd1/yznz.png'
import yzdy from '@/assets/qd1/yzdy.png'
import yzry from '@/assets/qd1/yzry.png'
import wlsb from '@/assets/qd1/wlsb.png'
import { onMounted, ref } from 'vue'
// import('@/assets/qd1/yzmj.png').then(res=>{
//   console.log(res.default);
// })
let data = ref()
onMounted(async () => {
  data.value = [
    {
      img: await import('@/assets/qd1/yzmj.png').then(res => res.default),
      name: '养殖面积',
      info: '200亩'
    },
    {
      img: await import('@/assets/qd1/yzqs.png').then(res => res.default),
      name: '养殖圈舍',
      info: '140个'
    },
    {
      img: await import('@/assets/qd1/yznz.png').then(res => res.default),
      name: '存栏牛只',
      info: '1214头'
    },
    {
      img: await import('@/assets/qd1/yzdy.png').then(res => res.default),
      name: '养殖单元',
      info: '5个'
    },
    {
      img: await import('@/assets/qd1/yzry.png').then(res => res.default),
      name: '养殖人员',
      info: '6名'
    },
    {
      img: await import('@/assets/qd1/wlsb.png').then(res => res.default),
      name: '物联设备',
      info: '88台'
    },
    {
      img: await import('@/assets/qd1/yzry.png').then(res => res.default),
      name: '养殖人员',
      info: '6名'
    },
    {
      img: await import('@/assets/qd1/wlsb.png').then(res => res.default),
      name: '物联设备',
      info: '88台'
    }
  ]
})
// const data = [
//   {
//     img: await import('@/assets/qd1/yzmj.png').then(res => res.default),
//     name: '养殖面积',
//     info: '200亩'
//   },
//   {
//     img: yzqs,
//     name: '养殖圈舍',
//     info: '140个'
//   },
//   {
//     img: yznz,
//     name: '存栏牛只',
//     info: '1214头'
//   },
//   {
//     img: yzdy,
//     name: '养殖单元',
//     info: '5个'
//   },
//   {
//     img: yzry,
//     name: '养殖人员',
//     info: '6名'
//   },
//   {
//     img: wlsb,
//     name: '物联设备',
//     info: '88台'
//   }
// ]
</script>

<style scoped lang="scss">
.yqxx_page {
  width: 100%;
  height: 100%;
}
.flex_container {
  // gap: 1.25rem;
  border-top: 2px solid #4B3722;
  display: grid;
  height: 95%;
  width: 95%;
  margin: 0 auto;
  margin-top: 5%;
  grid-template-columns: repeat(2, 50%);
  grid-template-rows: repeat(4, 23%);
  // grid-gap: 2%;
  gap: 2%;
  padding: 2%;
}
.yqxx_item {
  display: flex;
  font-size: 0.875rem;
  align-items: center;
  justify-content: space-between;
  color: #deb377;
  width: 100%;
  height: 100%;
  padding: 0 0.625rem;
  background: rgb(37, 51, 63);
  background: linear-gradient(
    0deg,
    rgba(37, 51, 63, 0.9360337885154062) 12%,
    rgba(27, 44, 58, 0.8772102591036415) 100%
  );
}
.yqxx_img {
  width: 1.875rem;
  height: 1.875rem;
}
.text_Grey {
  color: #838c91;
}
</style>
