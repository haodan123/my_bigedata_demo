<template>
  <div class="box_video">
    <img class="video_img" src="@/assets/global/video_bg.png" mode="scaleToFill" />
    <div class="hello">
      <div class="loading" v-show="isloading">
        <div class="donut" v-if="!nosxt"></div>
        <div style="margin-top: 40px">
          {{ nosxt ? '园区无摄像头' : '网络延迟画面加载中，请稍候。。。' }}
        </div>
      </div>

      <div class="video-div">
        <video
          muted
          ref="myVideo"
          id="singleVideo1"
          class="video video-js vjs-default-skin"
          style="object-fit: fill"
          src=""
          controls="controls"
        ></video>
      </div>
    </div>
  </div>
</template>
<script setup>
import 'video.js/dist/video-js.css'
import videojs from 'video.js'
// import 'videojs-contrib-hls'
import { onMounted, ref, nextTick, onUnmounted } from 'vue'
const isloading = ref(false) //true显示 遮罩加载
const nosxt = ref(false) //true 显示无摄像头
const myVideo = ref()
const singlePlayer = ref(null)
onMounted(() => {
  initData()
})

onUnmounted(() => {
  if (singlePlayer.value) {
    singlePlayer.value.dispose()
  }
})
const initData = async () => {
  const url = 'https://qn.krzhibo.com:447/2xenzwjkkngdt/31011500991320050313.m3u8'
  nextTick(() => {
    playVideo(url)
  })
}
const playVideo = async url => {
  setTimeout(async () => {
    // this.singlePlayer = videojs('singleVideo1', {
    singlePlayer.value = videojs(myVideo.value, {
      sources: [
        {
          src: url,
          type: 'application/x-mpegURL'
        }
      ],
      autoplay: true, //自动播放
      controls: true, //控件显示
      width: '100%', //视频框宽度
      height: '100%' //视频框高度
    })
    let res = url
    if (res) {
      // singlePlayer.value.src({ src: res, type: 'application/x-mpegURL' })
      singlePlayer.value.play()
    }

    singlePlayer.value.on('playing', () => {
      if (isloading.value && !nosxt.value) {
        isloading.value = false
      }
    })
    singlePlayer.value.on('error', () => {
      console.log('zhibo1event - error 获取视频失败')
      if (!isloading.value) {
        isloading.value = true
      }
    })
  }, 1000)
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

.video-div img {
  width: 100%;
}

.video-div::after {
  content: '';
  margin: auto;
  width: 40px;
  height: 40px;
  /*background: url('course_ic_play@2x.png');*/
  background-size: 100%;
  position: absolute;
  z-index: 999;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.vjs-default-skin .vjs-big-play-button {
  left: 40% !important;
  top: 40%;
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
