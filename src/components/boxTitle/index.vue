<template>
  <div class="box_title">
    <img
      src="@/assets/global/kg-border-title.png"
      alt=""
      class="box_title_img"
    />
    <div class="box_title_text">{{ title }}</div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: "",
    require: true,
  },
});
</script>

<style scoped lang="scss">
.box_title {
  width: 100%;
  height: var(--box-title-height);
  position: relative;
}

.box_title_img {
  user-select: none;
  pointer-events: none;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 9;
}
.box_title_text {
  position: absolute;
  z-index: 10;
  color: aqua;
  font-size: 0.88rem;
  top: 12%;
  left: 50%;
  transform: translateX(-50%);
}
</style>
