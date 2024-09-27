<template>
  <div style="width: 50px;height: 50px;">
    <VPSwitch :aria-checked="isDark" :isDark="isDark" @click="toggleAppearance">
    <!-- vpi-sun 到时候可以更换成图标 -->
    <span class="vpi-sun sun" />
    <span class="vpi-moon moon" />
  </VPSwitch>
  </div>
 
</template>

<script setup>
import VPSwitch from '@/components/VPSwitch/index.vue'
import { ref } from 'vue'

const isDark = ref(false)
const toggleAppearance = () => {
  isDark.value = !isDark.value
  console.log(isDark.value)
}
</script>

<style scoped lang="scss">
.sun {
  opacity: 1;
}

.moon {
  opacity: 0;
}

.dark .sun {
  opacity: 0;
}

.dark .moon {
  opacity: 1;
}

.dark :deep(.check) {
  /*rtl:ignore*/
  transform: translateX(18px);
}
</style>
