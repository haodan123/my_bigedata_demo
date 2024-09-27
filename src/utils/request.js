import axios from "axios";
import { apiUrl } from "@/config/global_config";
const service = axios.create({
  baseURL: apiUrl,
  timeout: 5000, // 请求超时时间
});
service.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token && config.headers.Authorization === undefined) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);
service.interceptors.response.use(
  (response) => {
    const data = response.data;
    if (data.code === 200) {
      return Promise.resolve(data);
    } else {
      let err = {};
      let messInfo = data.message ? err.info + " " + data.message : err.info;
      return Promise.reject(new Error(messInfo || "Error"));
    }
  },
  (err) => {
    console.log("响应错误：" + err);
    return Promise.reject(err); //请求错误时，直接结束
  }
);
export default (options) => {
  return service({
    method: options.method || "GET",
    url: options.url,
    [options.method.toUpperCase() === "GET" ? "params" : "data"]: options.data,
  });
};
