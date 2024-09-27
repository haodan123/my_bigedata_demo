<template>
  <div class="scroll_page">
    <div class="scroll_top">
      <div>养殖主体</div>
      <div>牛只编号</div>
      <div>检测项目</div>
      <div>检测结果</div>
    </div>
    <Vue3SeamlessScroll :list="OrderList" class="scroll_bottom" :step="0.3" :limitMoveNum="5" :hover="true">
      <div class="scroll_item" v-for="(item, index) in OrderList" :key="index">
        <div class="scroll_active">{{ item.sdsds || '融汇润达' }}</div>
        <div>{{ item.deernum || '133424' }}</div>
        <div>{{ item.xianmgu }}</div>
        <div>{{ item.status == 1 ? '合格' : '合格' }}</div>
      </div>
    </Vue3SeamlessScroll>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Vue3SeamlessScroll } from 'vue3-seamless-scroll'
const OrderList = ref([
  { status: '1', deernum: 'ED020040223', wd: '36℃', xianmgu: '口蹄疫' },
  { deernum: 'EGs24200342314', xianmgu: '小反刍兽疫' },
  { deernum: 'Esa3404022314', xianmgu: '炭疽' },
  { status: '1', deernum: 'E1342004022', wd: '36℃', xianmgu: '小反刍兽疫' },
  { status: '1', deernum: 'E685322314', wd: '37℃', xianmgu: '布鲁斯菌病' }
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
  background-color: rgba(255, 255, 255, 0.1);

  border-left: 0.1875rem solid #f5c680;
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
  border: 1px solid #3c444b;
  color: rgba(255, 255, 255, 0.8);
  color: #8998a6;
}
.scroll_item:hover {
  background-color: rgba(86, 168, 216, 0.2);
}
</style>
