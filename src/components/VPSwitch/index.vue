<template>
  <button class="VPSwitch" type="button" role="switch" :class="isDark ? 'dark' : ''"> 
    <span class="check" >
      <span class="icon" v-if="$slots.default">
        <slot />
      </span>
    </span>
  </button>
</template>

<script setup>
const props = defineProps({
  isDark: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.VPSwitch {
  position: relative;
  border-radius: 11px;
  display: block;
  width: 40px;
  height: 22px;
  flex-shrink: 0;
  border: 1px solid #c2c2c4;
  background-color: rgba(101, 117, 133, 0.16);
  transition: border-color 0.25s !important;
}

.VPSwitch:hover {
  border-color: #3451b2;
}

.check {
  position: absolute;
  top: 1px;
  /*rtl:ignore*/
  left: 1px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: #ffffff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06);
  transition: transform 0.25s !important;
}

.icon {
  position: relative;
  display: block;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  overflow: hidden;
}

.icon :deep([class^='vpi-']) {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 12px;
  height: 12px;
  color: rgba(60, 60, 67, 0.78);
}

.dark .icon :deep([class^='vpi-']) {
  color: rgba(60, 60, 67);
  transition: opacity 0.25s !important;
}
</style>
