<template>
  <div class="footer_header">
    <div class="routerBox">
      <div
        v-for="(item, index) in navRouter"
        :key="item.name"
        :class="item.url === tabselect ? 'active' : ''"
        class="router_item"
        @click="tabclick(item.url)"
      >
        <img class="router_img" :src="item.icon" alt="" />
        {{ item.name }}
      </div>
    </div>
    <div class="textContainer">
      <div class="weather_text">
        <img src="@/assets/global_nncs/wenter.png" class="weatherimg" alt="" />
        <span style="margin-inline: 10px">多云</span>
        <span>26°C</span>
      </div>
      <div class="time_text">
        <span style="margin-right: 10px">{{ day }}</span>
        <span>{{ time }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getTimeDate } from '@/utils/time.js'
import btmicon1 from '@/assets/global_nncs/btmicon1.png'
import btmicon2 from '@/assets/global_nncs/btmicon2.png'
import btmicon3 from '@/assets/global_nncs/btmicon3.png'

import { onMounted, ref, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const tabselect = ref()
const navRouter = ref([
  {
    url: '/index1',
    name: '产地分布大数据',
    icon: btmicon1
  },
  {
    url: '/index2',
    name: '销售大数据',
    icon: btmicon2
  },
  {
    url: '/index3',
    name: '生产量大数据',
    icon: btmicon3
  }
])

const day = ref('')
const time = ref('')
let timerID
onMounted(() => {
  tabselect.value = route.path
  getDay()
  timerID = setInterval(() => {
    getDay()
  }, 1000)
})
onUnmounted(() => {
  clearInterval(timerID)
})
const tabclick = url => {
  router.push(url)
}
const getDay = () => {
  const { year, month, day: tian, hours, min, second } = getTimeDate()
  day.value = `${year}年${month}月${tian}`
  time.value = `${hours}:${min}:${second}`
}
</script>

<style scoped lang="scss">
.footer_header {
  z-index: 10;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 9%;
  background: url('@/assets/global_nncs/bottom_title.png') center center no-repeat;
  background-size: 100% 100%;
  animation: slidetop 2s forwards;
  display: flex;
  justify-content: center;
  align-items: center;
}

@keyframes slidetop {
  0% {
    transform: translateY(100%);
  }

  100% {
    transform: translateY(0);
  }
}

.routerBox {
  width: 40vw;
  height: 35%;
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  top: -30%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
}
.router_img {
  width: 1.5625rem;
  height:  1.5625rem;
}
.router_item {
  cursor: pointer;
  width: 27%;
  padding: 8px 0;
  // height: 100%;
  background-color: rgba(22, 48, 63, 0.5);
  border-radius: 25px;
  font-weight: 700;
  color: #558799;
  
  text-align: center;
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;
  border: 2px solid #395c6a;
}
.active {
  // color: #8EE6E9;
  color: aqua;
}
.router_item:hover {
  // color: #90e5f9;
  color: aqua;
}

.textContainer {
  width: 25vw;
  height: 30%;
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
  // color: #90e5f9;
  color: #8BD8E9;

  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1rem;
  font-weight: 500;
}
.weather_text{
  display: flex;
  align-items: center;
}
.weatherimg {
  width: 1.875rem;
  height: 1.25rem;
}
</style>
