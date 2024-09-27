<template>
  <div class="scroll_page">
    <div class="scroll_top">
      <div>养殖主体</div>
      <div>牛只编号</div>
      <div>饲料</div>
      <div>时间</div>
    </div>
    <Vue3SeamlessScroll :list="OrderList" class="scroll_bottom" :step="0.3" :limitMoveNum="5" :hover="true">
      <div class="scroll_item" v-for="(item, index) in OrderList" :key="index">
        <div class="scroll_active">{{ item.sdsds || '融汇润达' }}</div>
        <div>{{ item.deernum || 'EC0200402490' }}</div>
        <div>{{ item.siliao }}</div>
        <div>{{ item.status == 1 ? '2024-07-23' : '2024-07-23' }}</div>
      </div>
    </Vue3SeamlessScroll>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Vue3SeamlessScroll } from 'vue3-seamless-scroll'

const OrderList = ref([
  { status: '1', deernum: 'ED020040223', wd: '36℃', siliao: '粗饲料' },
  { deernum: 'EGs24200342314', siliao: '蛋白质饲料' },
  { deernum: 'Esa3404022314', siliao: '能量饲料' },
  { status: '1', deernum: 'E1342004022', wd: '36℃', siliao: '粗饲料' },
  { status: '1', deernum: 'E685322314', wd: '37℃', siliao: '蛋白质饲料' }
])
</script>

<style scoped lang="scss">
.scroll_page {
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding: 0 3%;
}

.scroll_top {
  width: 100%;
  height: 1.875rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: #596670;
  line-height: 30px;
  font-size: 0.75rem;
}
.scroll_active {
  // background-color: #635534;

  background: url('@/assets/qd1/yjxx-bg-a.png') no-repeat 100% 100%;
  background-size: cover;
  border-bottom: 2px solid #af9063;
  color: rgba(255, 255, 255, 0.8);
}
.scroll_top > div,
.scroll_item > div {
  flex: 1;
  padding: 5px 0;
  text-align: center;
}
.scroll_bottom {
  height: 90%;
  overflow: hidden;
  font-size: 0.625rem;
}
.scroll_item {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 5px 0;
  // background-color: #202e3a;
  background: url('@/assets/qd1/yjxx-bg.png') no-repeat 100% 100%;
  background-size: cover;
  color: rgba(255, 255, 255, 0.8);
  // font-size: calc(100vw * 14 / 1920);
  color: #8998a6;
}
.scroll_item:hover {
  background-color: rgba(86, 168, 216, 0.2);
}
</style>
