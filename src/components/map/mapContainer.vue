<template>
  <div id="container"></div>
</template>

<script>
/*eslint quotes: ["error", "double"]*/
import AMapLoader from "@amap/amap-jsapi-loader";
import { shallowRef } from "@vue/reactivity";

export default {
  setup() {
    const map = shallowRef(null);
    return {
      map,
    };
  },
  mounted() {
    // DOM初始化完成进行地图初始化
    this.initMap();
  },
  methods: {
    initMap() {
      AMapLoader.load({
        key: "7ed86598e5059579f520c64c103c5887",
        version: "2.0",
        plugins: [""], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      })
        .then((AMap) => {
          this.map = new AMap.Map("container", {
            // 设置地图容器id
            viewMode: "2D", // 是否为3D地图模式
            zoom: 11, // 初始化地图级别
            center: [105.602725, 37.076636], // 初始化地图中心点位置
          });
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>

<style scoped>
#container {
  padding: 0px;
  margin: 0px;
  width: 500px;
  height: 450px;
}
</style>
