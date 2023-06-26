<template>
  <div class="background" >
    <!--顶部搜索栏  组件-->
    <el-row
      type="flex"
      justify="center"
      :gutter="10"
      class="search_line_height"
    >
      <!--logo-->
      <el-col :span="2">
        <el-image
          class="logo"
          :src="require('../../assets/logo/logo.png')"
          :fit="logoFit"
        ></el-image>
      </el-col>
      <!--输入框-->
      <el-col :span="10">
        <el-input
          v-model="search"
          placeholder="请输入内容"
          v-on:change="doSearch(1)"
        ></el-input>
      </el-col>
      <!--someButton-->
      <el-col :span="8">
        <el-button type="primary" size="medium" v-on:click="doSearch(1)"
          >搜帖子</el-button
        >
        <el-button size="medium" @click="doSearch(2)">搜贴吧</el-button>
        <el-button size="medium" @click="doSearch(3)">搜用户</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "searchBar",
  data() {
    return {
      logoFit: "contain" /*搜索框处左边logo 适应容器的方式*/,
      search: "" /*搜索框内容*/,
    };
  },
  methods: {
    // 参数type表示搜索类型 （1：帖子；2：贴吧；3：用户）
    doSearch(type) {
      //待完善
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.background{
    height: 88px;
    width:100%;
    background-color:#F5F5F5;
    border-radius: 10px;
    margin-top: 20px;
    margin-bottom: 20px;   
}
/*把搜索栏的高度统一设置为logo高度 */
.search_line_height {
  line-height: 70px;
  height: 85px;
  display: flex;
  align-items: center;
}

.logo {
  width: 70px;
  height: 70px;
  margin-top: 30px;
}
</style>
