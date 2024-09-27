<template>
  <div class="ytPage">
    <div class="close" @click="close"></div>
    <div class="ytContainer anim_in_right1">
      <div class="yt_left_box">
        <div class="yt_lbox_top">
          <boxContainer_sc2 :noBtmline="true" :img="nrjjicon" title="内容简介"></boxContainer_sc2>
        </div>
        <div class="yt_lbox_btm">
          <div class="yt_lbox_btm_item">养殖基地:xxx渔业公司</div>
          <div class="yt_lbox_btm_item">塘口名称:1号草鱼</div>
          <div class="yt_lbox_btm_item">池塘口编号:CY20232424</div>
          <div class="yt_lbox_btm_item">养殖品种:草鱼</div>
          <div class="yt_lbox_btm_item">塘口面积:21亩塘口</div>
        </div>
      </div>
      <div class="yt_right_box">
        <div class="titlebox">
          <div class="title_left">
            <div class="title_item">
              <img src="@/assets/sc1/tmjlicon.png" class="title_icon" alt="" />
              投苗记录
            </div>
            <div class="title_item">
              <img src="@/assets/sc1/twglicon.png" class="title_icon" alt="" />
              投喂管理
            </div>
          </div>
          <div class="title_right">
            <div class="title_item"><img src="@/assets/sc1/dbglicon.png" class="title_icon" alt="" /> 动保管理</div>
            <div class="title_item"><img src="@/assets/sc1/shglicon.png" class="title_icon" alt="" /> 损耗管理</div>
          </div>
        </div>
        <el-table :data="tableData" height="100%" :style="{ backgroundColor: 'rgba(0, 0, 0, 0)', width: '100%' }">
          <el-table-column prop="date" label="Date" width="180" />
          <el-table-column prop="name" label="Name" width="180" />
          <el-table-column prop="address" label="Address" />
        </el-table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import boxContainer_sc2 from '@/components/boxContainer_sc2/index.vue'
import nrjjicon from '@/assets/sc1/nrjjicon.png'
const emit = defineEmits(['close'])
const props = defineProps({
  open: {
    type: Boolean,
    default: false
  }
})
const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-08',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-06',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-07',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  }
]
const close = () => {
  emit('close')
}
onMounted(() => {
  console.log('dddd', props.open)
})
</script>

<style scoped lang="scss">
.ytPage {
  width: 100%;
  height: 100%;
  z-index: 5;
}
.ytContainer {
  width: 100%;
  height: 100%;
  display: flex;
  gap: 1.25rem;
}
.yt_left_box {
  width: 25%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  .yt_lbox_top {
    width: 100%;
    height: 33%;
  }
  .yt_lbox_btm {
    width: 100%;
    flex: 1;
  }
}
.yt_lbox_btm {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  color: #d0d9e4;
}
.yt_lbox_btm_item {
  font-size: 1.25rem;
}
.yt_right_box {
  width: 75%;
  height: 100%;
  position: relative;
  background: url('@/assets/sc1/border_big.png') no-repeat;
  background-size: 100% 100%;
  padding-inline: 0.625rem;
}
.titlebox {
  width: 100%;
  height: 2.5rem;
  display: flex;
  justify-content: space-between;
}
.title_left {
  width: 40%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.title_right {
  width: 40%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.title_item {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.625rem;
  color: #fff;
  font-size: 0.75rem;
  cursor: pointer;
}
.title_icon {
  width: 1.25rem;
  height: 1.25rem;
}

/*叉的图标*/
.close {
  position: absolute;
  right: 5%;
  top: 1%;
  z-index: 10;
  width: 30px;
  height: 30px;
  cursor: pointer;
}

.close::before,
.close::after {
  position: absolute;
  content: ' ';
  background-color: #eee;
  left: 20px;
  width: 1px;
  height: 20px;
}

.close::before {
  transform: rotate(45deg);
}

.close::after {
  transform: rotate(-45deg);
}
:deep(.el-table) {
  --el-table-row-hover-bg-color: rgba(0, 0, 0, 0.8);
}
:deep(.el-table th.el-table__cell) {
  background-color: rgba(0, 0, 0, 0.2);
  color: #fff;
}

:deep(.el-table tr) {
  background-color: rgba(0, 0, 0, 0.2);
  color: #fff;
}
:deep(.el-table tr:hover) {
  background-color: rgba(0, 0, 0, 0.2);
  color: #fff;
}
</style>
