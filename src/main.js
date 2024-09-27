import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
// import "@/styles/main.scss";
import "@/styles/index.scss";
// 不让浏览器报错滚动
import 'default-passive-events'
// echarts的3d
import 'echarts-gl'

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

const app = createApp(App);
app.use(ElementPlus);

app.use(router);

app.mount("#app");
