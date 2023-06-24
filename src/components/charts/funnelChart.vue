<template>
  <div id="rank" class="main"></div>
</template>

<script>
import * as echarts from "echarts";

export default {
  data() {
    return {};
  },
  mounted() {
    this.echartsInit();
  },
  methods: {
    echartsInit() {
      echarts.init(document.getElementById("rank")).setOption({
        tooltip: {
          trigger: "item",
          formatter: "{b} : {c}%",
        },
        grid:{
            x:25,
            y:45,
            x2:5,
            y2:20,
            borderWidth:1
        },
        series: [
          {
            name: "Funnel",
            type: "funnel",
            left: "10%",
            //top: 60,
            //bottom: 60,
            width: "80%",
            min: 0,
            minSize: "0%",
            maxSize: "100%",
            sort: "descending",
            gap: 2,
            label: {
              show: true,
              fontSize: 14,
            },
            labelLine: {
              length: 10,
              lineStyle: {
                width: 1,
                type: "solid",
              },
            },
            itemStyle: {
              borderColor: "#fff",
              borderWidth: 1,
            },
            emphasis: {
              label: {
                fontSize: 20,
              },
            },
            data: [
              { value: 25776, name: "上海海昌海洋公园" },
              { value: 13257, name: "峨眉山" },
              { value: 11682, name: "自贡·中华彩灯大世界" },
              { value: 11333, name: "南山文化旅游区" },
              { value: 10337, name: "上海迪士尼乐园" },
              { value: 8396, name: "武隆仙女山国家森林公园" },
              { value: 8305, name: "毕棚沟" },
            ],
          },
          //两层数据实现中间数值外部标签
          {
            name: "Funnel",
            type: "funnel",
            left: "10%",
            top: 60,
            bottom: 60,
            width: "80%",
            min: 0,
            minSize: "0%",
            maxSize: "100%",
            sort: "descending",
            gap: 2,
            label: {
              show: true,
              position: "inside",
              formatter: "{c}",
              color: "#fff",
              fontSize: 13,
            },
            itemStyle: {
              borderColor: "#fff",
              borderWidth: 1,
            },
            emphasis: {
              label: {
                fontSize: 20,
              },
            },
            data: [
              { value: 25776, name: "上海海昌海洋公园" },
              { value: 13257, name: "峨眉山" },
              { value: 11682, name: "自贡·中华彩灯大世界" },
              { value: 11333, name: "南山文化旅游区" },
              { value: 10337, name: "上海迪士尼乐园" },
              { value: 8396, name: "武隆仙女山国家森林公园" },
              { value: 8305, name: "毕棚沟" },
            ],
          },
        ],
      });
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.main {
  height: 300px;
  width: 600px;
}
</style>
