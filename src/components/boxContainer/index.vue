<template>
  <div class="box_container_page">
    <boxTitle :title="title"></boxTitle>
    <div class="container_content_view" @click.stop>
      <img src="@/assets/global/kg-border-content.png" alt="" />
      <div class="real_content">
        <slot></slot>
      </div>
    </div>
    <div class="container_bottom_view">
      <img src="@/assets/global/kg-border-bottom.png" alt="" />
    </div>
  </div>
</template>

<script setup>
import boxTitle from '@/components/boxTitle/index.vue'
defineProps({
  title: {
    type: String,
    default: '',
    require: true
  }
})
</script>

<style scoped lang="scss">
.box_container_page {
  position: relative;
  width: 100%;
  height: 100%;
}

.container_content_view {
  height: calc(100% - var(--box-title-height) - var(--box-bottom-height));
  width: 100%;
  position: relative;
  .real_content {
    position: absolute;
    inset: 0;
    right: 2%;
    left: 2%;
  }
  img {
    user-select: none;
    pointer-events: none;

    width: 100%;
    height: 100%;
  }
}

.container_bottom_view {
  height: var(--box-bottom-height);
  width: 100%;
  position: relative;
  img {
    user-select: none;
    pointer-events: none;

    width: 100%;
    height: 100%;
  }
}
</style>
