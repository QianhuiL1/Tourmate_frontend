<template>
  <div id="money" class="main"></div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  data() {
    return {};
  },
  mounted() {
    this.echartsInit();
  },
  methods: {
    echartsInit() {
      echarts.init(document.getElementById("money")).setOption({
        xAxis: {
          type: "category",
          data: [
            "一月",
            "二月",
            "三月",
            "四月",
            "五月",
            "六月",
            "七月",
            "八月",
            "九月",
            "十月",
            "十一月",
            "十二月",
          ],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260, 158, 173, 210, 180, 130],
            type: "line",
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
  width: 800px;
}
</style>
