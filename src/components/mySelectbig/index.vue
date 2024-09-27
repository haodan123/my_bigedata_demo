<template>
  <div class="customSelect">
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
.customSelect {
  position: relative;
  /* display: inline-block; */
  display: flex;
  align-items: center;
  width: 150px;
}

.customSelect select {
  width: 100%;
}
/* 实体三角 */
.triangle {
  content: '';
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  color: 30707c; /* 将箭头颜色设置为白色 */
  /* 创建一个边框的倒三角形 */
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid #30707c; /* 改为你需要的颜色 */
  pointer-events: none;
}

.mySelect {
  color: #fff;
  border: 1px solid #30707c;
  border-radius: 8px;
  /* height: 20px; */
  /*很关键：将默认的select选择框样式清除*/
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  padding: 8px 10px;
  background-color: rgba(0, 0, 0, 0.6);

  /*为下拉小箭头留出一点位置，避免被文字覆盖*/
  padding-right: 9px;
}
.mySelect:focus {
  outline: 1px;
}
.mySelect::-ms-expand {
  display: none;
}
</style>
