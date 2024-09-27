<template>
  <div class="scroll_page">
    <div class="scroll_top">
      <div>单元名称</div>
      <div>牛只编号</div>
      <div>预警时间</div>
      <div>预警情况</div>
    </div>
    <Vue3SeamlessScroll :list="OrderList" class="scroll_bottom" :step="0.3" :limitMoveNum="5" :hover="true">
      <div class="scroll_item" v-for="(item, index) in OrderList" :key="index">
        <div class="scroll_active">{{ item.dyname || '五号单元' }}</div>
        <div>{{ item.deernum || '1342424' }}</div>
        <div>{{ item.time }}</div>
        <div>{{ item.status == 1 ? '温度偏低' : '温度偏高' }}</div>
      </div>
    </Vue3SeamlessScroll>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Vue3SeamlessScroll } from 'vue3-seamless-scroll'
const OrderList = ref([
  { status: '1', deernum: 'ED020040223', wd: '36℃', dyname: '五号单元', time: '2024-07-21' },
  { deernum: 'EGs24200342314', dyname: '三号单元', time: '2024-07-11' },
  { deernum: 'Esa3404022314', dyname: '四号单元', time: '2024-07-22' },
  { status: '1', deernum: 'E1342004022', wd: '36℃', dyname: '一号单元', time: '2024-07-23' },
  { status: '1', deernum: 'E685322314', wd: '37℃', dyname: '三号单元', time: '2024-07-24' }
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
  font-size: .75rem;
}
.scroll_active {
  background-color: rgba(255, 255, 255, 0.1);

  border-left: .1875rem solid #F5C680;
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
  font-size: .625rem;
}
.scroll_item {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 5px 0;
  // background-color: #202e3a;
  border: 1px solid #3C444B;
  color: rgba(255, 255, 255, 0.8);
  color: #8998a6;
}
.scroll_item:hover {
  background-color: rgba(86, 168, 216, 0.2);
}
</style>
