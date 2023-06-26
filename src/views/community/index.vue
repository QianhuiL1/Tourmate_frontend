<template>
  <div>
    <el-row type="flex" justify="center">
      <!--页面中心主体内容-->
      <!-- <el-col :span="18" style="border: 1px solid bisque"> -->
      <el-col :span="20" class="gradient-border">
        <!--顶部搜索框-->
        <el-row type="flex" justify="center">
          <el-col :span="20">
            <searchbar></searchbar>
          </el-col>
        </el-row>

        <!--滚动图-->
        <el-row>
          <el-col>
            <el-carousel :interval="4000" type="card" height="300px">
              <el-carousel-item v-for="item in imgList" :key="item.name">
                <el-image
                  :src="item.src"
                  style="height: 100%; width: 100%"
                  alt="图片丢失了"
                  :title="item.title"
                  :fit="logoFit"
                ></el-image>
              </el-carousel-item>
            </el-carousel>
          </el-col>
        </el-row>

        <!--中间的主体模块-->
        <el-row type="flex" justify="center" :gutter="30">
          <!--左侧的个人信息-->
          <el-col :span="6" class="left_part"></el-col>

          <!--右侧的贴吧、公告及帖子展示-->
          <el-col :span="17">
            <div style="border: 3px solid #fae3d9; height: 100%; border-radius: 12px">
              <index-content/>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>

    <!--返回顶部-->
    <el-backtop></el-backtop>
  </div>
</template>

<script>
import searchbar from "../../components/forum/searchbar.vue";
import indexContent from "../../components/forum/indexContent.vue";

export default {
  name: "index",
  components: { searchbar,indexContent },
  data() {
    return {
      imgList: [
        {
          name: "hntt",
          src: require("@/assets/images/hanititian.jpg"),
          title: "这是hntt.jpg",
        },
        {
          name: "hhl",
          src: require("@/assets/images/huanghelou.jpg"),
          title: "这是hhl.jpg",
        },
        {
          name: "qxy",
          src: require("@/assets/images/qixingyan.jpg"),
          title: "这是qxy.jpg",
        },
        {
          name: "yhy",
          src: require("@/assets/images/yiheyuan.jpg"),
          title: "这是yhy.jpg",
        },
      ],
    };
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.gradient-border {
  --borderWidth: 3px;
  background: #ffffff;
  position: relative;
  border-radius: var(--borderWidth);
}
.gradient-border:after {
  content: '';
  position: absolute;
  top: calc(-1 * var(--borderWidth));
  left: calc(-1 * var(--borderWidth));
  height: calc(100% + var(--borderWidth) * 2);
  width: calc(100% + var(--borderWidth) * 2);
  background: linear-gradient(60deg, #feb6b8, #fae3d9, #93cfc3, #8abdc6, #eef09f);
  border-radius: calc(2 * var(--borderWidth));
  z-index: -1;
  animation: animatedgradient 3s ease alternate infinite;
  background-size: 300% 300%;
}
@keyframes animatedgradient {
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
}

/*上方 滚动图的描述 div*/
.crs_desc_div {
  width: 100%;
  height: 25px;
  position: absolute;
  z-index: 99;
  background-color: rgba(255, 255, 255, 0.5);
  bottom: 0px;
}

/*左边的个人信息 col*/
.left_part {
  border: 2px solid bisque;
  background-color: rgb(246, 247, 251);
  padding-top: 18px;
  padding-bottom: 30px;
  border-radius: 12px; 
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  /*box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)*/
  height: 600px;
}
</style>
