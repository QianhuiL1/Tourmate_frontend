<template>
  <div class="parent">/
    <div class="div1">
      
      <map-container/>
    </div>
    <div class="div2">热门景点排行</div>
    <div class="div3">各省旅游人数饼图</div>
    <div class="div4">旅游金额折线图</div>
    <div class="div5">旅游新闻</div>
    
  </div>
</template>

<script>
import MapContainer from "../../components/map/mapContainer.vue";

export default({
  components: { MapContainer },
    MapContainer
});
</script
MapContainer>

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
  color: red;
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
