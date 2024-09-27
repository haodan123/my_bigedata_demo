// 单元数组
const unitpoilist = [
  {
    deviceName: "1",
    unitname: "一单元",

    position: ["36%", "26%"],
  },
  {
    deviceName: "2",
    unitname: "二单元",
    position: ["30%", "29%"],
  },
  {
    deviceName: "3",
    unitname: "三单元",
    position: ["27%", "37%"],
  },
  {
    deviceName: "4",
    unitname: "四单元",
    position: ["58%", "78%"],
  },
  {
    deviceName: "5",
    unitname: "五单元",
    position: ["68%", "69%"],
  },
];
// 摄像头数组
const sxtlist = [
  {
    unit: "左左上",
    deviceName: "摄像头一",
    shedId: 237,
    position: ["21.8%", "32.2%", "-6px", "-33px", "436deg"], //第一个参数是标点的top 第二个是标点的left 第三个是光照的top 第四个是光照的left 第五个是 光照的方向
  },
  {
    unit: "左左上",
    deviceName: "摄像头二",
    shedId: 238,
    position: ["20.8%", "33.2%", "7px", "-12px", "0deg"],
  },
  {
    unit: "左左上",
    deviceName: "摄像头二",
    shedId: 238,
    position: ["21.8%", "35.2%", "-7px", "3px", "-55deg"],
  },
  {
    unit: "左右上",
    deviceName: "摄像头三",
    shedId: 239,
    position: ["31.8%", "55.2%", "-13px", "-34px", "108deg"],
  },
  {
    unit: "左右上",
    deviceName: "摄像头四",
    shedId: 240,
    position: ["32.8%", "57.2%", "1px", "-27px", "49deg"],
  },
  {
    unit: "左右上",
    deviceName: "摄像头四",
    shedId: 240,
    position: ["34.8%", "58.2%", "-2px", "2px", "-56deg"],
  },
  {
    unit: "右左上",
    deviceName: "摄像头五",
    shedId: 237,
    position: ["39.8%", "57.2%", "5px", "-11px", "-9deg"],
  },

  {
    unit: "右左上",
    deviceName: "摄像头六",
    shedId: 242,
    position: ["39.8%", "59.2%", "-5px", "-2px", "-59deg"],
  },
  {
    unit: "右右上",
    deviceName: "摄像头七",
    shedId: 243,
    position: ["50.8%", "77.5%", "-3px", "-31px", "55deg"],
  },
  {
    unit: "右右上",
    deviceName: "摄像头八",
    shedId: 244,
    position: ["51%", "79.5%", "-11px", "1px", "-81deg"],
  },
  {
    unit: "右右下",
    deviceName: "摄像头九",
    shedId: 245,
    position: ["59%", "75.5%", "-26px", "-27px", "140deg"],
  },
  {
    unit: "右右下",
    deviceName: "摄像头十",
    shedId: 246,
    position: ["60%", "77.5%", "8px", "-8px", "-24deg"],
  },
  {
    unit: "右右下",
    deviceName: "摄像头十",
    shedId: 246,
    position: ["61%", "75.5%", "5px", "-28px", "55deg"],
  },
  {
    unit: "右左下",
    deviceName: "摄像头十一",
    shedId: 247,
    position: ["41.8%", "55.5%", "5px", "-28px", "55deg"],
  },
  {
    unit: "右左下",
    deviceName: "摄像头十二",
    shedId: 248,
    position: ["43.8%", "56.5%", "-7px", "-2px", "-91deg"],
  },
  {
    unit: "右左下",
    deviceName: "摄像头十二",
    shedId: 248,
    position: ["45.8%", "55.5%", "7px", "-12px", "-10deg"],
  },
  {
    unit: "左右下",
    deviceName: "摄像头十二",
    shedId: 249,
    position: ["47.8%", "46.5%", "-26px", "-21px", "170deg"],
  },
  {
    unit: "左右下",
    deviceName: "摄像头十二",
    shedId: 250,
    position: ["48.8%", "47.3%", "-21px", "2px", "241deg"],
  },
  {
    unit: "左右下",
    deviceName: "摄像头十二",
    shedId: 249,
    position: ["50.5%", "47.3%", "6px", "-15px", "369deg"],
  },
  {
    unit: "左右下",
    deviceName: "摄像头十二",
    shedId: 250,
    position: ["49.8%", "46.3%", "-3px", "-33px", "447deg"],
  },
  {
    unit: "左左下",
    deviceName: "摄像头十三",
    shedId: 251,
    position: ["32.8%", "21.2%", "-30px", "-16px", "205deg"],
  },
  {
    unit: "左左下",
    deviceName: "摄像头十四",
    shedId: 252,
    position: ["31.8%", "23.2%", "-9px", "3px", "278deg"],
  },
  {
    unit: "左左下",
    deviceName: "摄像头十四",
    shedId: 252,
    position: ["34.8%", "22.2%", "5px", "-14px", "348deg"],
  },
  {
    unit: "办公室",
    deviceName: "摄像头十四",
    shedId: 253,
    position: ["60.8%", "62.2%", "-30px", "-28px", "153deg"],
  },
  {
    unit: "办公室",
    deviceName: "摄像头十五",
    shedId: 254,
    position: ["62.8%", "63.25%", "-17px", "4px", "272deg"],
  },
];
// 传感器的数组
const jczpoilist = [
  {
    unit: "左11",
    deviceName: "传感器一",
    position: ["24.5%", "34.5%"],
  },
  {
    unit: "左12",
    deviceName: "传感器二",
    position: ["25.5%", "37.5%"],
  },
  {
    unit: "左13",
    deviceName: "传感器三",
    position: ["27.5%", "41%"],
  },
  {
    unit: "左14",
    deviceName: "传感器四",
    position: ["28.5%", "43.5%"],
  },
  {
    unit: "左15",
    deviceName: "传感器二",
    position: ["30.5%", "46.5%"],
  },
  {
    unit: "左16",
    deviceName: "传感器三",
    position: ["31.5%", "49.5%"],
  },
  {
    unit: "左17",
    deviceName: "传感器四",
    position: ["33.5%", "52.5%"],
  },
  {
    unit: "左21",
    deviceName: "传感器一",
    position: ["31.5%", "27.5%"],
  },
  {
    unit: "左22",
    deviceName: "传感器二",
    position: ["34.5%", "30.5%"],
  },
  {
    unit: "左23",
    deviceName: "传感器三",
    position: ["35.5%", "33.5%"],
  },
  {
    unit: "左24",
    deviceName: "传感器四",
    position: ["37.5%", "36.5%"],
  },
  {
    unit: "左25",
    deviceName: "传感器二",
    position: ["439.5%", "39.5%"],
  },
  {
    unit: "左26",
    deviceName: "传感器三",
    position: ["41.5%", "42.5%"],
  },
  {
    unit: "左27",
    deviceName: "传感器四",
    position: ["43.5%", "45.5%"],
  },
  {
    unit: "右11",
    deviceName: "传感器一",
    position: ["42.5%", "59.5%"],
  },
  {
    unit: "右12",
    deviceName: "传感器二",
    position: ["44.5%", "62.5%"],
  },
  {
    unit: "右13",
    deviceName: "传感器三",
    position: ["45.5%", "65.5%"],
  },
  {
    unit: "右14",
    deviceName: "传感器四",
    position: ["47.5%", "67.5%"],
  },
  {
    unit: "右15",
    deviceName: "传感器二",
    position: ["48.5%", "70.5%"],
  },
  {
    unit: "右16",
    deviceName: "传感器三",
    position: ["49.5%", "72.5%"],
  },
  {
    unit: "右17",
    deviceName: "传感器四",
    position: ["51.5%", "74.5%"],
  },
];

//传感器中心
const cgqcenterList = [
  {
    unit: "左1",
    deviceName: "中心",
    position: ["37.5%", "40.5%"],
  },
];

// 水帘的数组
const slpoilist = [
  {
    unit: "左1",
    deviceName: "水帘",
    position: ["38%", "54.5%"],
  },
  {
    unit: "左2",
    deviceName: "水帘",
    // position: ["34.5%", "52.5%"],
    position: ["41%", "52.5%"],
  },
  {
    unit: "左3",
    deviceName: "水帘",
    position: ["44%", "50%"],
  },
  {
    unit: "左4",
    deviceName: "水帘",
    position: ["47.5%", "48%"],
  },
  {
    unit: "右1",
    deviceName: "水帘",
    position: ["44%", "59.5%"],
  },
  {
    unit: "右2",
    deviceName: "水帘",
    position: ["48%", "57.5%"],
  },
];

// 风机数组
const qxypoilist = [
  {
    unit: "左11",
    deviceName: "风机",
    position: ["28.5%", "34.2%"],
  },
  {
    unit: "左12",
    deviceName: "风机",
    position: ["31.5%", "38.2%"],
  },
  {
    unit: "左13",
    deviceName: "风机",
    position: ["33.5%", "42.2%"],
  },
  {
    unit: "左14",
    deviceName: "风机",
    position: ["36.5%", "46.2%"],
  },
  {
    unit: "左15",
    deviceName: "风机",
    position: ["38.5%", "51.2%"],
  },
  {
    unit: "左21",
    deviceName: "风机",
    position: ["30.5%", "32.2%"],
  },
  {
    unit: "左22",
    deviceName: "风机",
    position: ["33.5%", "37.2%"],
  },
  {
    unit: "左23",
    deviceName: "风机",
    position: ["35.5%", "41.2%"],
  },
  {
    unit: "左24",
    deviceName: "风机",
    position: ["38.5%", "45.2%"],
  },
  {
    unit: "左25",
    deviceName: "风机",
    position: ["40.5%", "50.2%"],
  },
  {
    unit: "左31",
    deviceName: "风机",
    // position: ["32.5%", "27.2%"],
    position: ["32.5%", "31.2%"],
  },
  {
    unit: "左32",
    deviceName: "风机",
    // position: ["35.5%", "31.2%"],
    position: ["35.5%", "36.2%"],
  },
  {
    unit: "左33",
    deviceName: "风机",
    position: ["38.5%", "40.2%"],
  },
  {
    unit: "左34",
    deviceName: "风机",
    position: ["40.5%", "44.2%"],
  },
  {
    unit: "左35",
    deviceName: "风机",
    position: ["43.5%", "48.2%"],
  },
  {
    unit: "左41",
    deviceName: "风机",
    position: ["34.5%", "28.2%"],
  },
  {
    unit: "左42",
    deviceName: "风机",
    position: ["37.5%", "33.2%"],
  },
  {
    unit: "左43",
    deviceName: "风机",
    position: ["40.5%", "37.2%"],
  },
  {
    unit: "左44",
    deviceName: "风机",
    position: ["43.5%", "42.2%"],
  },
  {
    unit: "左45",
    deviceName: "风机",
    position: ["45.5%", "45.2%"],
  },
  {
    unit: "右11",
    deviceName: "风机",
    position: ["47.5%", "62.2%"],
  },
  {
    unit: "右12",
    deviceName: "风机",
    position: ["49.5%", "65.2%"],
  },
  {
    unit: "右13",
    deviceName: "风机",
    position: ["51.5%", "69.2%"],
  },
  {
    unit: "右14",
    deviceName: "风机",
    position: ["53.5%", "73.2%"],
  },
  {
    unit: "右15",
    deviceName: "风机",
    position: ["55.5%", "77.2%"],
  },
  {
    unit: "右21",
    deviceName: "风机",
    position: ["50.5%", "60.2%"],
  },
  {
    unit: "右22",
    deviceName: "风机",
    position: ["52.5%", "63.2%"],
  },
  {
    unit: "右23",
    deviceName: "风机",
    position: ["54.5%", "67.2%"],
  },
  {
    unit: "右24",
    deviceName: "风机",
    position: ["57.5%", "72.2%"],
  },
  {
    unit: "右25",
    deviceName: "风机",
    position: ["59.5%", "75.2%"],
  },
];

export default {
  unitpoilist,
  sxtlist,
  jczpoilist,
  slpoilist,
  qxypoilist,
  cgqcenterList,
};
