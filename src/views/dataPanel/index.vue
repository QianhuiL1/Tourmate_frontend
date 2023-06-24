<template>
  <div class="parent">
    <el-card class="div1">
      <div class="title">热力图</div>
      <div class="content">
      <heat-map/>
    </div>
    </el-card>
    <el-card class="div2">
      <div class="title">热门景点排行</div>
      <funnel-chart/>
    </el-card>

    <el-card class="div3">
      <div class="title">各省旅游人数</div>
      <pine-chart/>
    </el-card>

    <el-card class="div4">
      <div class="title">旅游金额折线图</div>
      <line-chart/>
    </el-card>

    <el-card class="div5">
      <div class="title">旅游新闻</div>
      </el-card>
    
  </div>
</template>

<script>
import MapContainer from "../../components/map/mapContainer.vue";
import heatMap from "../../components/map/heatMap.vue";
import lineChart from "../../components/charts/lineChart.vue";
import funnelChart from "../../components/charts/funnelChart.vue";
import pineChart from "../../components/charts/pineChart.vue";

export default({
  components: { MapContainer,lineChart,funnelChart,pineChart ,heatMap},
});
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.parent {
  margin-top:10px;
  display: grid;
  grid-template-rows: repeat(7, 1fr);
  grid-column-gap: 5px;
  grid-row-gap: 5px;
  margin-left:30px
}
.title{
  margin-top: 10px;
  text-align: center;
  font-family: 'hgw';
  font-size: 20px;
}
.content{
  display:flex;
  align-items: center;
}
.div1 {
  grid-area: 1 / 1 / 5 / 4;
  height: 600px;
  width: 700px;
  display:flex;
  flex-direction: column;
  border-radius: 10px;

}
::v-deep .el-card__body {
        padding: 0;
        }
.div2 {
  grid-area: 1 / 4 / 3 / 7;
}
.div3 {
  grid-area: 3 / 4 / 5 / 7;
}
.div4 {
  grid-area: 5 / 1 / 8 / 5;
}
.div5 {
  grid-area: 5 / 5 / 8 / 7;
}
</style>
