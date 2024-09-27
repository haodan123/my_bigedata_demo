<template>
  <div class="zbkzPage">
    <div class="zbkzbox">
      <div class="sbkzitem" >
        <img src="@/assets/sc2/bsicon.png" class="sbkz_top_img" ></img>
        <div class="sbkz_btm">
          <div class="sbkz_text">补水设备</div>
          <img src="@/assets/sc2/sbkz_btm.png" class="sbkz_btm_img"></img>
        </div>
      </div>
      <div class="sbkzitem" >
        <img src="@/assets/sc2/zyjicon.png" class="sbkz_top_img" ></img>
        <div class="sbkz_btm">
          <div class="sbkz_text">增氧机</div>
          <img src="@/assets/sc2/sbkz_btm.png" class="sbkz_btm_img"></img>
        </div>
      </div>
      <div class="sbkzitem" >
        <img src="@/assets/sc2/tejicon.png" class="sbkz_top_img" ></img>
        <div class="sbkz_btm">
          <div class="sbkz_text">投饵机</div>
          <img src="@/assets/sc2/sbkz_btm.png" class="sbkz_btm_img"></img>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
.zbkzPage {
  width: 100%;
  height: 100%;
  position: relative;
}
.zbkzbox {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(3, 31%);
  grid-template-rows: repeat(1, 100%);
  color: #A2ABB3;
  gap: 10px;
}
.sbkzitem {
  position: relative;
  height: 95%;
  display: flex; flex-direction: column;
align-items: center;
justify-content: space-around;
}
.sbkz_top_img{
  width: 3.75rem;
  height: 3.75rem;
}
.sbkz_btm{
  width: 80%;
  height: 20%;
  position: relative;
}
.sbkz_btm_img{
 width: 100%;
 height: 100%;
}
.sbkz_text{
  position: absolute;
  font-size: .75rem;
top: -10%;
  text-align: center;
  width: 100%;
}
</style>
