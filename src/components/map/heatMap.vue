<template>
  <div>
    <div id="container"></div>
    <div class="input-card" style="width: auto">
      <div class="input-item">
        <button class="btn" @click="heatmap.show()">显示热力图</button>
      </div>
      <div class="input-item">
        <button class="btn" @click="heatmap.hide()">关闭热力图</button>
      </div>
    </div>
  </div>
</template>

<script>
// https://a.amap.com/jsapi_demos/static/resource/heatmapData.js
import AMapLoader from "@amap/amap-jsapi-loader";
import {myData} from "./heatmapData.js";

export default {
  mounted() {
    this.initMap();
  },
  beforeDestroy() {
    this.map && this.map.destroy();
  },
  data() {
    return {
      map: null,
      heatmap: null,
      heatmapData:myData()
    };
  },
  methods: {
    initMap() {
      AMapLoader.load({
        key: "7ed86598e5059579f520c64c103c5887",
        version: "2.0",
      })
        .then((AMap) => {
          //初始化map
          this.map = new AMap.Map("container", {
            // 设置地图容器id
            resizeEnable: true,
            center: [116.480983, 39.989628],
            zoom: 11,
            plugins: ["AMap.HeatMap"], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
          });
          if (!this.isSupportCanvas()) {
            return this.$msg.error(
              "热力图仅对支持canvas的浏览器适用,您所使用的浏览器不能使用热力图功能,请换个浏览器试试。"
            );
          }
          //防止this指代不明，初始化heatMap
          let __this = this;
          let map = this.map;
          map.plugin(["AMap.HeatMap"], function () {
            var heatmap = new AMap.HeatMap(map, {
              radius: 25, //给定半径
              opacity: [0, 0.8],
              /*,
            gradient:{
                0.5: 'blue',
                0.65: 'rgb(117,211,248)',
                0.7: 'rgb(0, 255, 0)',
                0.9: '#ffea00',
                1.0: 'red'
            }
             */
            });
            __this.heatmap = heatmap;
            __this.initHeat();
          });
        })
        .catch((e) => {
          console.log(e);
        });
    },
    initHeat() {
      //设置数据集：该数据为北京部分“公园”数据
    //   var heatmapData = [
    //     {
    //       lng: 116.191031,
    //       lat: 39.988585,
    //       count: 10,
    //     },
    //     {
    //       lng: 116.389275,
    //       lat: 39.925818,
    //       count: 11,
    //     },
    //     {
    //       lng: 116.287444,
    //       lat: 39.810742,
    //       count: 12,
    //     },
    //     {
    //       lng: 116.481707,
    //       lat: 39.940089,
    //       count: 13,
    //     },
    //   ];
    console.log('1',this.heatmapData)
      this.heatmap.setDataSet({
        data: this.heatmapData,
        max: 100,
      });
      console.log('2',this.heatmap.getDataSet());
    },
    //判断浏览区是否支持canvas
    isSupportCanvas() {
      let elem = document.createElement("canvas");
      return !!(elem.getContext && elem.getContext("2d"));
    },
    //创建热力图
    createHeatMap() {
      if (!this.isSupportCanvas()) {
        return this.$msg.error(
          "热力图仅对支持canvas的浏览器适用,您所使用的浏览器不能使用热力图功能,请换个浏览器试试。"
        );
      }
      let __this = this;
      this.map.plugin(["AMap.Heatmap"], function () {
        //初始化heatmap对象
        __this.heatmap = new AMap.Heatmap(__this.map, {
          visible: false,
          radius: 25, //给定半径
          opacity: [0, 0.8],
        });
        //设置数据集：该数据为北京部分“公园”数据
        __this.heatmap.setDataSet({
          data: heatmapData,
          max: 100,
        });
      });
    },
  },
};
</script>

<style scoped>
#container {
  padding: 0px;
  margin: 0px;
  width: 800px;
  height: 600px;
}
.input-card .btn {
  margin-right: 1.2rem;
  width: 9rem;
}
</style>
