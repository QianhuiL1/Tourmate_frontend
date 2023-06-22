<template>
  <div class="parent">/
    <div class="div1">
      <div>热力图</div>
      <map-container/>
    </div>
    <div class="div2">
      <div>热门景点排行</div>
      <funnel-chart/>
    </div>

    <div class="div3">
      <div>各省旅游人数</div>
      <pine-chart/>
    </div>

    <div class="div4">
      <div>旅游金额折线图</div>
      <line-chart/>
    </div>

    <div class="div5">旅游新闻</div>
    
  </div>
</template>

<script>
import MapContainer from "../../components/map/mapContainer.vue";
import lineChart from "../../components/charts/lineChart.vue";
import funnelChart from "../../components/charts/funnelChart.vue";
import pineChart from "../../components/charts/pineChart.vue";

export default({
  components: { MapContainer,lineChart,funnelChart,pineChart },
});
</script>

<style scoped>
.parent {
  display: grid;
  grid-template-rows: repeat(7, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
}

.div1 {
  grid-area: 1 / 1 / 5 / 4;
  height: 100%;
  width: 100%;
  background-color: yellow;
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
