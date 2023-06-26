<template>
  <div>
    <!--欢迎-->
    <el-row type="flex" justify="end">
      <el-col :span="5" class="welcome">
        <span>欢迎来到本论坛~！</span>
      </el-col>
      <el-col :span="4">
        <el-image
          style="width: 100px; height: 85px"
          :src="require('../../assets/images/welcome.gif')"
          fit="scale-down"
        ></el-image>
      </el-col>
    </el-row>

    <!--热门贴吧-->
    <el-divider content-position="left"><h2>热门贴吧</h2></el-divider>
    <!-- <barList ref="barList"></barList> -->

    <!--热议贴-->
    <el-divider content-position="center" class="dcs_divi"
      ><h2>热<span style="color:red; font-weight:bold">议</span>贴</h2></el-divider
    >
    <el-row justify="center" type="flex">
      <el-col :span="23">
        <el-tabs
          type="border-card"
          v-model="activeTab"
          v-on:tab-click="handleTabClick"
        >
          <el-tab-pane label="热门动态" name="hotPosts">
            <!-- <PL ref="hotPosts"></PL> -->
          </el-tab-pane>
          <el-tab-pane label="个性贴" name="newPosts">
            <!--                        <PL v-bind:getPostsRs="getPostsRs" v-bind:postList="postList" @updatePostList="updatePost"></PL>-->
            <!-- <PL ref="newPosts"></PL> -->
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "indexContent",
  data() {
    return {
      content:
        "可能你不快乐     可我要你快乐...我的快乐...可能你不快乐&nbsp; 可惜你不快乐可要听我的话别再...&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;",
      activeTab: "hotPosts" /*选中的标签页*/,
      // barHeadImg: this.GLOBAL.barHeadImg,  /*服务器下贴吧头像前缀*/
      pageSize: 10, // 无限滚动  其实也是分页  每次滑动到下面 新获取多少条数据
    };
  },
  created() {
    //初始化推荐贴吧
    // console.log("打印全局变量：");
    // console.log("baseUrl:" + this.GLOBAL.serverBaseUrl);
    // console.log("barRvcList:" + this.GLOBAL.barRvcList);
    // let getRvcBarList = this.GLOBAL.serverBaseUrl + this.GLOBAL.barRvcList;
    // 由于使用 ref 的方法调用子组件方法来进行初始化 所以把初始化代码放到mounted 里（这里才可以根据 ref 获取到 dom节点）
  },
  mounted() {
    // console.log("is around us.");

    // 初始化 热议贴
    this.$refs.hotPosts.init(false, "reply", 1, this.pageSize, false); // 这个时候 子组件 已经构造完了（如果不在 v-if、v-for、v-show中控制显示的话）；子组件的created函数也已经被执行
    this.$refs.newPosts.init(false, "time", 1, this.pageSize, false);

    // 初始化推荐贴吧
    this.$refs.barList.init(1); // 置顶  获取推荐贴吧  其他参数直接使用默认值即可。
  },
  methods: {
    /*“热议贴”模块   点击标签页  进行数据查询渲染*/
    handleTabClick(tab) {
      // console.log(tab.name);
      if (tab.name === "hotPosts") {
        // this.getPostsListPrefix = "http://localhost:8081/post/getListByReply"
        // this.$refs.hotPosts.init(false, "reply", 1, 10, false);
        console.log("hot");
      } else if (tab.name === "newPosts") {
        // this.getPostsListPrefix = "http://localhost:8081/post/getListByTime"
        // this.$refs.newPosts.init(false, "time", 1, 10, false);
        console.log("new");
      }
    },

    /**
     * 查询当前用户是否已加入 barId对应的贴吧  已加入返回true  未加入返回false  （未登录返回false）
     * @param barId  当前贴吧编号
     * @returns {Promise<boolean>} 已加入返回true  未加入返回false  （未登录返回false）
     */
    async checkUserBarRelevance(barId) {
      // console.log("方法开始");
      let joined = false;
      // await this.$http.get("http://localhost:8081/postBar/checkUserBar?barId=" + barId).then(req => {
      await this.$http
        .get(
          this.GLOBAL.serverBaseUrl + this.GLOBAL.barUserRvc + "?barId=" + barId
        )
        .then((req) => {
          if (req.data !== "") {
            if (req.data.result_code === 601) {
              /*用户已加入该铁贴吧*/
              console.log("用户已加入， 贴吧id：" + barId);
              joined = true;

              // return true;
            } else if (req.data.result_code === 602) {
              /*用户暂未加入该贴吧*/
              console.log("用户未加入，贴吧id：" + barId);
              // return false;
            } else if (req.data.result_code === 605) {
              /*用户未登录  默认显示未加入*/
              console.log("用户未登录，贴吧id：" + barId);
              // return false;
            } else {
              this.$notify.error({
                title: "错误",
                message: "未知错误！！！",
              });
            }
          } else {
            this.$notify.error({
              title: "错误",
              message: "糟糕，服务器出事了。。",
            });
            console.log("从服务器获取用户贴吧关联信息失败。！");
          }
          // return false;
        });
      // console.log("方法结束，返回joined：" + joined);
      return joined;
      // return Promise.resolve(joined);
      // console.log("返回结果。")
      // return false;  /*默认未加入*/
      // console.log("joined:" + joined);
    },
  },
  components: {
    // "PL": indexPostList,
    // "barList": barList, // 热门贴吧列表
  },
};
</script>

<style scoped>
/*欢迎来到本论坛  字样*/
.welcome {
  font-family: "hgw";
  font-size: large;
  padding-top: 52px;
}

/*热议贴分割线*/
.dcs_divi {
  margin-top: 40px;
}

/*热议贴中的"议"字*/
.dcs_divi span {
  font-family: "Helvetica Neue";
}


/*element的字体*/
.font {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
</style>
