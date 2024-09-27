<template>
  <div class="mouduleBox" :style="[bgStyle]">
    <div class="moudule_title" :style="[titleBigHeight]">{{ title || '' }}</div>
    <div class="moudule_content" :style="[contentBigHeight]">
      <slot></slot>
    </div>
  </div>
</template>
<script setup>

import { computed } from 'vue'
import containerbg_big from '@/assets/global_nncs/containerbg_big.png'
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  bg: {
    type: String,
    default: ''
  },
  bigContainer: {
    type: Boolean,
    default: false
  }
})
const titleBigHeight = computed(() => {
  let style
  if (props.bigContainer) {
    style = {
      // height: '8vh'
    }
  }
  return style
})

const contentBigHeight = computed(() => {
  let style
  if (props.bigContainer) {
    style = {
      marginTop: '2%',
      // height: ' calc(96% - 8vh)'
    }
  }
  return style
})
const bgStyle = computed(() => {
  // let style
  // if (props.bg) {
  //   style = {
  //     // 动画样式 forwards 动画结束后保持最后一帧
  //     background: `url("${props.bg}") no-repeat`,
  //     backgroundSize: '100% 100%'
  //   }
  // }

  // return style

  let style
  if (props.bigContainer) {
      style = {
        // 动画样式 forwards 动画结束后保持最后一帧
        background: `url(${containerbg_big}) no-repeat`,
        backgroundSize: '100% 100%'
      }
  }
  return style
})
</script>

<style lang="scss">
.mouduleBox {
  width: 100%;
  height: 100%;
  background: url('@/assets/global_nncs/containerbg.png') no-repeat;
  background-size: 100% 100%;
  // overflow: hidden;
  z-index: 9;
}

.moudule_title {
  width: 100%;
  height: 4vh;
  color: #fff;
  font-size: calc(100vw * 18 / 1920);
  display: flex;
  padding-left: 10%;
  align-items: flex-end;
}

.moudule_content {
  position: relative;
  padding: 0.625rem;
  width: 100%;
  height: calc(96% - 4vh);
  // overflow: hidden;
}

@keyframes tranLeftStyle {
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(0);
  }
}

@keyframes tranRightStyle {
  0% {
    transform: translateX(100%);
  }

  100% {
    transform: translateX(0);
  }
}
</style>
