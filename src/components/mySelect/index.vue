<template>
  <div class="custom-select">
    <select class="mySelect" v-model="selectedValue" @change="handleChange">
      <option value="" disabled selected>{{ placeholder }}</option>
      <option :value="item.value" v-for="(item, index) in dataList" :key="index">{{ item.lable }}</option>
    </select>
    <div class="triangle"></div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const emit = defineEmits(['update:modelValue', 'input', 'change'])
const props = defineProps({
  dataList: {
    type: Array,
    default: () => []
  },
  placeholder: {
    type: String,
    default: '请选择'
  },
  modelValue: {
    type: [String, Number],
    default: ''
  }
})

const selectedValue = ref(props.modelValue)

watch(
  () => props.modelValue,
  newr => {
    selectedValue.value = newr
  }
)

const handleChange = () => {
  emit('update:modelValue', selectedValue.value)
  emit('input', selectedValue.value)
  emit('change', selectedValue.value)
}
</script>

<style scoped>
/* 自定义下拉箭头 */
.custom-select {
  position: relative;
  /* display: inline-block; */
  display: flex;
  align-items: center;
}

.custom-select select {
  width: 100%;
}
/* 实体三角 */
.triangle {
  content: '';
  position: absolute;
  top: 50%;
  right: 0px;
  transform: translateY(-50%);
  color: white; /* 将箭头颜色设置为白色 */
  /* 创建一个边框的倒三角形 */
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid white; /* 改为你需要的颜色 */
  pointer-events: none;
}

/* 两条线的三角 */
.ddddd {
  content: '';
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%) rotate(45deg); /* 旋转角度形成倒三角 */
  pointer-events: none;
  /* 使用两条线创建倒三角形 */
  width: 8px;
  height: 8px;
  border-bottom: 2px solid white; /* 下边框的颜色和粗细 */
  border-right: 2px solid white; /* 右边框的颜色和粗细 */
}

.mySelect {
  color: #fff;
  border: none;
  height: 20px;
  /*很关键：将默认的select选择框样式清除*/
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  width: 95%;
  background: transparent;
  /*为下拉小箭头留出一点位置，避免被文字覆盖*/
  padding-right: 9px;
}
.mySelect:focus {
  outline: 0px;
}
.mySelect::-ms-expand {
  display: none;
  /* display: none; */
}
</style>
