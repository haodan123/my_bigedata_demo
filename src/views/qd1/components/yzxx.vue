<template>
  <div class="scroll_page">
    <Vue3SeamlessScroll :list="OrderList" class="scroll_box" :step="0.3" :limitMoveNum="5" :hover="true">
      <div class="scroll_item" v-for="(item, index) in OrderList" :key="index">
        <div class="scroll_item_left">
          <!-- <img src="@/assets/qd1/model-fake.png" class="scroll_item_left_img" /> -->
          <img src="@/assets/qd1/yjxx-bg-a.png" class="scroll_item_left_img" />
          <div class="scroll_item_left_box">
            <div class="scroll_wtext">融汇润达</div>
            <div class="scroll_gtext">牛只编号:{{ item.deernum }}</div>
          </div>
        </div>
        <div class="scroll_item_right">
          <div class="scroll_wtext">2027.07.02</div>
          <div class="scroll_gtext">状态:存栏</div>
        </div>
      </div>
    </Vue3SeamlessScroll>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Vue3SeamlessScroll } from 'vue3-seamless-scroll'
const OrderList = ref([
  { status: '1', deernum: 'EC020040223', wd: '36℃', dyname: '五号单元' },
  { deernum: 'EC0200342314', dyname: '二号单元' },
  { deernum: 'E43404022314', dyname: '三号单元' },
  { status: '1', deernum: 'E3452004022', wd: '36℃', dyname: '五号单元' },
  { status: '1', deernum: 'EC03231322314', wd: '37℃', dyname: '一号单元' }
])
</script>

<style scoped lang="scss">
.scroll_page {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.scroll_box {
  height: 100%;
  overflow: hidden;
  font-size: 0.75rem;
}
.scroll_item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5px 0;
  padding: 0 10px;
  // background-color: #202e3a;
  color: rgba(255, 255, 255, 0.8);
  // font-size: 0.75rem;
  font-size: .625rem;
  color: #8998a6;
}
.scroll_wtext {
  color: rgba(255, 255, 255, 0.8);
}
.scroll_gtext {
  color: #8998a6;
}
.scroll_item_left {
  display: flex;
  align-items: center;
  .scroll_item_left_img {
    width: 3.125rem;
    height: 3.125rem;
    margin-right: 10px;
  }
  .scroll_item_left_box {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
}
.scroll_item_right {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
