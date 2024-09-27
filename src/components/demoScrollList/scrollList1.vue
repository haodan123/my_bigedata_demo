<template>
  <div class="moudule_box">
    <div class="header">
      <span>工序名称</span>
      <span>图片展示</span>
      <span>加工人员</span>
      <span>加工时间</span>
    </div>
    <div class="scroll-container">
      <ul class="scroll-list" ref="scrollList">
        <li v-for="(item, index) in items" :key="index" class="list-item" ref="listItem">
          <span>{{ item.standardName || '暂无' }}</span>
          <span>
            <el-image
              style="width: calc(100vw / 1920 * 40); height: calc(100vw / 1920 * 40); border-radius: 4px"
              :src="item.picture"
              :preview-src-list="[item.picture]"
            >
            </el-image>
          </span>
          <span>{{ item.operatorName || '暂无' }}</span>

          <span>{{ item.addtime || '暂无' }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup>
import { nextTick, onMounted, onUnmounted, ref } from 'vue'
import { requestGet } from '@/api/index.js'

const items = ref([1, 3, 2, 3, 4, 3, 2])
const timer = ref(null)
const scrollList = ref(null)
const listItem = ref(null)
onMounted(() => {
  initData()
  // timer.value = setInterval(() => {
  //     initData()
  // }, 1000 * 60 * 5)
  // startAutoScroll()
})
onUnmounted(() => {
  clearInterval(timer.value)
  timer.value = null
})
const initData = async () => {
  const res = await requestGet('jggc')
  items.value = res.data
  startAutoScroll()
}

const startAutoScroll = () => {
  nextTick(() => {
    const scrollList1 = scrollList.value
    const listItem1 = listItem.value[0]
    const itemHeight = listItem1.clientHeight // 获取单个item的高度
    let scrollAmount = 0
    const delay = 2000 // 每次滚动的时间间隔（毫秒）

    //如果子条目超出盒子
    if (items.value.length > 5) {
      const scroll = () => {
        scrollAmount -= itemHeight
        if (Math.abs(scrollAmount) >= scrollList1.scrollHeight / 2) {
          scrollAmount = 0
        }
        scrollList1.style.transform = `translateY(${scrollAmount}px)`
        setTimeout(scroll, delay)
      }

      scroll()
    }
  })
}
</script>

<style scoped lang="scss">
.moudule_box {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  color: #fff;
}

.scroll-container {
  height: calc(100% - 40px);
  overflow: hidden;
  position: relative;
}

.scroll-list {
  width: 100%;
  list-style: none;
  padding: 0;
  margin: 0;
  transition: transform 1s;
}

.scroll-list li:nth-child(odd) {
  background: rgba(255, 255, 255, 0.1);
}

.header {
  height: 40px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  background: rgba(32, 142, 252, 0.1);
  color: #00ffff;
  font-size: calc(100vw / 1920 * 16);
  span {
    text-align: center;
    flex: 1;
  }
}

.list-item {
  padding: 10px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: calc(100vw / 1920 * 14);
}

.list-item > span {
  text-align: center;
  overflow: hidden;
  text-align: center;
  flex: 1;

  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2; /* 显示两行 */
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  /* white-space: nowrap;
  text-overflow: ellipsis; */
}

.nxx {
  display: flex;
  gap: 8px;
}

.ebbh {
  color: rgba(255, 255, 255, 0.7);
}

.rulan {
  background: rgba(29, 208, 157, 0.3);
  border-radius: 4px;
  border: 1px solid rgba(29, 208, 157, 1);
  color: rgba(29, 208, 157, 1);
  padding: 2px 5px;
}

.chulan {
  background: rgba(6, 183, 197, 0.3);
  border-radius: 4px;
  border: 1px solid rgba(6, 183, 197, 1);
  color: rgba(6, 183, 197, 1);
  padding: 2px 5px;
}
</style>
