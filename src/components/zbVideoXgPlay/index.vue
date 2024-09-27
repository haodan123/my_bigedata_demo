<template>
  <div class="box_video">
    <img class="video_img" src="@/assets/global/video_bg.png" mode="scaleToFill" />
    <div class="hello">
      <!-- <div class="loading" v-show="isloading">
        <div class="donut" v-if="!nosxt"></div>
        <div style="margin-top: 40px">
          {{ nosxt ? '园区无摄像头' : '网络延迟画面加载中，请稍候。。。' }}
        </div>
      </div> -->

      <div class="video-div">
        <div ref="myVideo" class="video" style="object-fit: fill"></div>
        <!-- <video
          muted
          ref="myVideo"
          class="video"
          style="object-fit: fill"
          src="http://sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/hls/xgplayer-demo.m3u8"
          controls="controls"
        ></video> -->
      </div>
    </div>
  </div>
</template>
<script setup>
import Player from 'xgplayer'
import 'xgplayer/dist/index.min.css'
import HlsPlayer from 'xgplayer-hls'

import { onMounted, ref, nextTick, onUnmounted } from 'vue'
const isloading = ref(false) //true显示 遮罩加载
const nosxt = ref(false) //true 显示无摄像头
const myVideo = ref()
const singlePlayer = ref(null)
onMounted(() => {
  initData()
})

onUnmounted(() => {
  // if (singlePlayer.value) {
  //   singlePlayer.value.dispose()
  // }
})
const initData = async () => {
  // const url = 'http://sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/hls/xgplayer-demo.m3u8'
  const url = 'https://qn.krzhibo.com:447/2xenzwjkkngdt/31011500991320050313.m3u8'
  // nextTick(() => {
  playVideo(url)
  // })
}
const playVideo = async url => {
  singlePlayer.value = new Player({
    el: myVideo.value,
    // volume: 0.3,
    volume: 0,
    // 自动播放
    autoplay: true,
    url: url,
    playsinline: true,
    width: '100%', //视频框宽度
    height: '100%', //视频框高度
    plugins: [HlsPlayer]
  })
  // 开始
  singlePlayer.value.on('play', e => {
    // console.log(e)
  })
  // 结束
  singlePlayer.value.on('ended', e => {})
  // 暂停
  singlePlayer.value.on('pause', e => {
    //事件名称可以在上述查询
    // console.log(e)
  })
  // 报错
  singlePlayer.value.on('error', e => {
    //事件名称可以在上述查询
    // console.log(e)
  })
  singlePlayer.value.play()
  // console.log(singlePlayer.value)
}
</script>
<style scoped>
.box_video {
  width: 100%;
  height: 100%;
  position: relative;
}
.video_img {
  width: 88%;
  height: 90%;
  position: absolute;
  top: 5%;
  left: 50%;
  transform: translateX(-50%);
}

.hello {
  width: 80%;
  height: 80%;
  position: relative;
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
}

.video-div {
  width: 100%;
  height: 100%;
}

.video {
  width: 100%;
  height: 100%;
  object-fit: fill;
}


.loading {
  width: 100%;
  height: 100%;
  background: #000000;
  z-index: 999;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 15px;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.6);
}

@keyframes donut-spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.donut {
  display: inline-block;
  z-index: 9999;
  border: 5px solid rgba(0, 0, 0, 0.1);
  border-left-color: rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: donut-spin 1.2s linear infinite;
}
</style>
