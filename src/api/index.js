import request from "@/utils/request";

export const requestPost = (url, data) => {
  return request({
    method: "post",
    url: url,
    data: data,
  });
};
export const requestGet = (url) => {
  return request({
    method: "get",
    url: url,
  });
};
