<template>
  <div id="numbers" class="main"></div>
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
      echarts.init(document.getElementById("numbers")).setOption({
        tooltip: {
          trigger: "item",
          formatter: "{b} : {c} ({d}%)",
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: "50%",
            data: [
              { value: 1048, name: "上海" },
              { value: 735, name: "北京" },
              { value: 580, name: "广州" },
              { value: 484, name: "湖南" },
              { value: 300, name: "四川" },
              { value: 200, name: "其他" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
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
  left: 20%;
}
</style>
