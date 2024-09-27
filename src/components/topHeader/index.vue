<template>
  <div class="top_header">
    <div
      class="route_link_item"
      :class="item.name == routerName ? 'active_route' : ''"
      :style="{ top: item.top, left: item.left }"
      v-for="(item, index) in leftrouteList"
      :key="index"
      @click="toRouter(item.url)"
    >
      {{ item.title }}
      <img v-if="item.name == routerName" class="active_route_img" src="@/assets/global/active_route.png" alt="" />
    </div>
    <div
      class="route_link_item"
      :class="item.name == routerName ? 'active_route' : ''"
      :style="{ top: item.top, right: item.right }"
      v-for="(item, index) in rightrouteList"
      :key="index"
      @click="toRouter(item.url)"
    >
      {{ item.title }}
      <img v-if="item.name == routerName" class="active_route_img" src="@/assets/global/active_route.png" alt="" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const routerName = ref()
const leftrouteList = ref([
  { url: '/index1', name: 'index1', title: '园区概况', left: '6%', top: '10%' },
  {
    url: '/index2',
    name: 'index2',
    title: '资源数据',
    left: '21%',
    top: '31%'
  }
])
const rightrouteList = ref([
  {
    url: '/index3',
    name: 'index3',
    title: '养殖专题',
    right: '21%',
    top: '31%'
  },
  {
    url: '/index4',
    name: 'index4',
    title: '监管专题',
    right: '6%',
    top: '10%'
  }
])
onMounted(() => {
  // console.log(route);
  routerName.value = route.name
})
const toRouter = url => {
  router.push(url)
}
</script>

<style scoped lang="scss">
.top_header {
  position: relative;
  background: url('@/assets/global/header-img.png') 0 0 / 100% 100% no-repeat;
  overflow: hidden;
  width: 100%;
  height: var(--header-height);
  align-items: center;
  display: flex;
  color: #fff;
  // font-size: 20px;
  font-size: 1.25rem;
  z-index: 30;
}
.route_link_item {
  color: #436690;
  cursor: pointer;
  position: absolute;
  font-weight: 700;
  transform: skew(-10deg);
}
.active_route {
  color: #fff;
}
.active_route_img {
  user-select: none;
  pointer-events: none;
  position: absolute;
  bottom: -53%;
  left: 50%;
  transform: translateX(-50%);
  width: 4.875rem;
  height: 1.25rem;
}
</style>
