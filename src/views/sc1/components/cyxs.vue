<template>
  <div class="scroll_page">
    <div class="scroll_top">
      <div></div>
      <div>客户</div>
      <div>数量</div>
      <div>金额</div>
      <div>时间</div>
    </div>
    <Vue3SeamlessScroll :list="OrderList" class="scroll_bottom" :step="0.3" :limitMoveNum="5" :hover="true">
      <div class="scroll_item" v-for="(item, index) in OrderList" :key="index">
        <div class="scroll_active">{{ item.pondName || '1号塘口' }}</div>
        <div>{{ item.customerName || '001' }}</div>
        <div>{{ item.totalTailCount || '28' }}</div>
        <div>{{ item.totalAmount || '29' }}</div>
        <div>{{ item.createTime || '13:51' }}</div>
      </div>
    </Vue3SeamlessScroll>
  </div>
</template>

<script setup>
import { Vue3SeamlessScroll } from 'vue3-seamless-scroll'

import { requestGet } from '@/api/index.js'
import { onMounted, ref } from 'vue'
const OrderList = ref([
  { status: '1', deernum: 'EC020040223', wd: '36℃' },
  { deernum: 'EC0200342314' },
  { deernum: 'E43404022314' },
  { status: '1', deernum: 'E3452004022', wd: '36℃' },
  { status: '1', deernum: 'EC03231322314', wd: '37℃' }
])
onMounted(() => {
  getData()
})
const getData = async () => {
  const res = await requestGet('prevention/fishsale?isAsc=desc&pageNum=1&pageSize=9')
  console.log(res);
  OrderList.value = res.rows
}

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

  background: url('@/assets/sc1/lb_bg.png') no-repeat 100% 100%;
  background-size: cover;
  border-bottom: 2px solid #7CBFDF;
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
