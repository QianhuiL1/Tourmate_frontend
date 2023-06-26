<template>
  <!--贴吧列表组件  获取的贴吧列表包含 当前登录用户和该贴吧的加入情况-->
  <div>
    <!--        <h1>这里是贴吧列表哦~！</h1>-->
    <div v-if="getBarRs.barListSuccess" class="hot_bar">
      <el-row
        type="flex"
        justify="center"
        class="font bar_row"
        style="height: 156px"
        v-for="list_row in list"
        :key="list_row[0].id"
      >
        <el-col
          :span="10"
          class="bar_recommend"
          v-for="(bar, index) in list_row"
          :key="bar.id"
          :offset="index"
        >
          <!--头像 + 名称 + 介绍 -->
          <el-row>
            <el-col :span="9">
              <a :href="'/postBarIndex?barId=' + bar.id" target="_blank">
                <!--                                <el-avatar shape="square" :size="115" :src="'http://localhost:8081/static/images/barAvatar/' + bar.barImg"></el-avatar>-->
                <!--可以自己定义一个变量，用this.GLOBAL.xxx 进行初始赋值，然后在这直接调用，或者直接 GLOBAL.xxx进行调用-->
                <!--切记不能在这里用 this.GLOBAL.xxx 进行调用   否则会报this  undefined-->
                <el-avatar
                  shape="square"
                  :size="115"
                  :src="serverBaseUrl + GLOBAL.barHeadImg + bar.barImg"
                ></el-avatar>
              </a>
            </el-col>
            <el-col :span="14">
              <!--                        <div class="recommend"><a href=""><span>Demo吧</span></a></div>-->
              <div class="recommend">
                <el-link
                  :href="'/postBarIndex?barId=' + bar.id"
                  type="danger"
                  class="my_el_link"
                  target="_blank"
                  ><span>{{ bar.name }}</span></el-link
                >
              </div>
              <div class="bar_intro">
                <span>{{ bar.describe }}</span>
              </div>
            </el-col>
          </el-row>
          <!--人数 + 帖子数 + 加入按钮 -->
          <el-row class="user_post_join">
            <el-col
              :span="8"
              class="font_size_15 user_post_line_height"
              :offset="1"
            >
              <span
                ><i
                  class="el-icon-user user_icon_color user_post_line_height"
                ></i
                >&nbsp;人数:&nbsp;{{ bar.peopleNum }}</span
              >
            </el-col>
            <el-col :span="10" class="font_size_15" style="line-height: 28px">
              <span
                ><i class="el-icon-chat-line-round post_icon_color"></i
                >&nbsp;贴子数:&nbsp;{{ bar.postNum }}</span
              >
            </el-col>
            <el-col :span="5">
              <!--rvcMap[bar.id]   true表示已加入（显示退出按钮）   false表示未加入（显示加入按钮）-->
              <el-button
                type="info"
                @click="exitBar(bar)"
                size="mini"
                v-if="rvcMap[bar.id]"
                >退出
              </el-button>
              <el-button type="success" @click="joinBar(bar)" size="mini" v-else
                >加入</el-button
              >
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <el-row v-else style="line-height: 156px; height: 156px">
      <span>{{ getBarRs.msg }}</span>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "barList",
  data() {
    return {
      getBarRs: {
        barListSuccess: true, // 成功从后台获取到推荐的贴吧列表信息
        msg: "", //从后台获取  贴吧信息失败时 携带的错误提示信息
      },
      serverBaseUrl: this.GLOBAL.serverBaseUrl /*服务器地址*/,
      barList: [] /*推荐  贴吧列表数组*/,
      list: [] /*数组  里面每个数组项也是一个数组，每个数组项代表一行el-row，每行包含两个贴吧信息*/,
      rvcMap:
        [] /*当前登录用户和推荐贴吧之间的加入关系   接收的是后台传来的一个map（键为贴吧id，值为true已加入或者false未加入） 可以直接rvcMap[id]进行调用 */,
    };
  },
  created() {},
  mounted() {},
  methods: {
    /**
     * 初始化组件内容， 根据参数获取  贴吧列表
     * @param getRec 获取推荐贴吧  默认不获取推荐
     * @param ctgId 获取分类下的贴吧
     * @param uname  获取某个用户加入的贴吧（个人主页）
     * @param searchWd 搜索关键字（用于搜索贴吧）
     * @param sortType 结果排序类型 （默认按照帖子数倒序排序） postsNum 帖子数最大倒序  peopleNum 人数最多倒序
     * @param searchType 搜索类型 0按贴吧名搜索  1按贴吧id搜索（用于搜索贴吧）  默认按贴吧名搜索
     */
    init(
      getRec = 0,
      ctgId = null,
      uname = null,
      searchWd = null,
      sortType = "postsNum",
      searchType = 0
    ) {
      // 处理获取帖子列表  需要传递的参数
      let params = {};

      params.getRec = getRec;
      if (ctgId != null) {
        params.ctgId = ctgId;
      }
      if (uname != null) {
        params.uname = uname;
      }
      if (searchWd != null) {
        params.searchWd = searchWd;
        params.searchType = searchType;
      }
      params.sortType = sortType;

      // axios 请求  向后台获取结果列表
      this.getBarList(params);
    },

    getBarList(params) {
      //初始化推荐贴吧
      // console.log("打印全局变量：");
      // console.log("baseUrl:" + this.GLOBAL.serverBaseUrl);
      // console.log("barRvcList:" + this.GLOBAL.barRvcList);
      // let getRvcBarList = this.GLOBAL.serverBaseUrl + this.GLOBAL.barRvcList;
      // this.$http.get("http://localhost:8081/postBar/getRvcBarList").then(req => {
      // 将参数 封到 config中传送  就不用拼接 url了（这样就不用纠结 & 和 ？ 了）
      this.$http
        .get(this.GLOBAL.serverBaseUrl + this.GLOBAL.barRvcList, {
          params: params,
        })
        .then((req) => {
          if (req.data !== "") {
            if (req.data.rs.result_code === 200) {
              /*查询成功   */
              // 先重置上次的结果
              this.barList = [];
              this.list = [];

              this.barList = req.data.list;
              this.rvcMap = req.data.rvcMap;

              let length = this.barList.length;
              for (let i = 0; i < length; i++) {
                var list_row = [];
                list_row.push(this.barList[i]);
                if (++i < length) {
                  list_row.push(this.barList[i]);
                }
                this.list.push(list_row);

                // /*设置最多显示  4 个贴吧*/
                // if((i + 1 )/2 >= 2){
                //     break;
                // }
              }
              console.log("list长度：" + this.list.length);
              // 回显结果总条数
              this.$emit("setTotal", length);
            } else {
              /*查询失败*/
              this.getBarRs.barListSuccess = false;
              this.getBarRs.msg = req.data.rs.msg;
            }
          } else {
            this.getBarRs.barListSuccess = false;
            this.getBarRs.msg = "糟糕，服务器出事了。。";
          }
        });
    },

    /*加入贴吧*/
    joinBar(bar) {
      // this.$http.get("http://localhost:8081/postBar/joinBar?id=" + bar.id).then(req=>{
      this.$http
        .get(this.GLOBAL.serverBaseUrl + this.GLOBAL.barJoin + "?id=" + bar.id)
        .then((req) => {
          if (req.data !== "") {
            if (req.data.result_code === 200) {
              /*成功加入*/
              this.$notify({
                title: "成功",
                message: req.data.msg,
                type: "success",
                duration: 3000 /*设置为3秒后  自动关闭*/,
              });
              // 加入成功后修改 用户贴吧关联rvcMap  对应的值为true
              this.rvcMap[bar.id] = true;
              //对应bar人数 ++
              bar.peopleNum++;
            } else if (req.data.result_code === 605) {
              /*用户未登录*/
              this.$notify.info({
                title: "消息",
                message: req.data.msg,
                duration: 3000 /*设置为3秒后  自动关闭*/,
              });
            } else if (
              req.data.result_code === 300 ||
              req.data.result_code === 303
            ) {
              /*数据库插入失败  或  发生异常*/
              this.$notify.error({
                title: "错误",
                message: req.data.msg,
                duration: 0 /*出错则设置为不自动关闭*/,
              });
            } else {
              this.$notify.error({
                title: "错误",
                message: "未知错误！！！",
                duration: 0 /*出错则设置为不自动关闭*/,
              });
            }
          } else {
            this.$notify.error({
              title: "错误",
              message: "糟糕，服务器出事了。。",
              duration: 0 /*出错则设置为不自动关闭*/,
            });
          }
        });
    },

    /*退出贴吧*/
    exitBar(bar) {
      // this.$http.get("http://localhost:8081/postBar/exitBar?id=" + bar.id).then(req=>{
      this.$http
        .get(this.GLOBAL.serverBaseUrl + this.GLOBAL.barExit + "?id=" + bar.id)
        .then((req) => {
          if (req.data !== "") {
            if (req.data.result_code === 200) {
              /*成功加入*/
              this.$notify({
                title: "成功",
                message: req.data.msg,
                type: "success",
                duration: 3000 /*设置为3秒后  自动关闭*/,
              });
              // 退出成功后修改 用户贴吧关联rvcMap  对应的值为false(未加入)
              this.rvcMap[bar.id] = false;
              //对应bar人数 --
              bar.peopleNum--;
            } else if (req.data.result_code === 605) {
              /*用户未登录  这个时候未登录显示退出按钮是不合理的 此时给出提示信息并刷新页面获取最新值*/
              this.$message({
                showClose: true,
                message: req.data.msg,
                type: "warning",
                duration: 0 /*设置为不自动关闭*/,
              });
              this.$router.push({
                name: "classifytmp",
                params: { fromIndex: "fromIndex" },
              });
            } else if (
              req.data.result_code === 301 ||
              req.data.result_code === 303
            ) {
              /*数据库插入失败  或  发生异常 ; */
              this.$notify.error({
                title: "错误",
                message: req.data.msg,
                duration: 0 /*出错则设置为不自动关闭*/,
              });
            } else if (req.data.result_code === 714) {
              /*特殊贴吧不可退出*/
              this.$notify.info({
                title: "消息",
                message: req.data.msg,
                duration: 3000 /*设置为3秒后  自动关闭*/,
              });
            } else {
              this.$notify.error({
                title: "错误",
                message: "未知错误！！！",
                duration: 0 /*出错则设置为不自动关闭*/,
              });
            }
          } else {
            this.$notify.error({
              title: "错误",
              message: "糟糕，服务器出事了。。",
              duration: 0 /*出错则设置为不自动关闭*/,
            });
          }
        });
    },
  },
};
</script>

<style scoped>
/*热门贴吧 div（不包括标题"热门贴吧"）*/
.hot_bar {
  padding-top: 5px;
}

/*每一行（两个推荐贴吧信息） el-row*/
.bar_row {
  margin-top: 9px;
}

/*在他原有的el-link上自定义样式  页面中的贴吧项 中的 贴吧名链接*/
.my_el_link {
  font-size: 16px;
  color: #ff9800;
}

/*每一个推荐的贴吧  el-col*/
.bar_recommend {
  border: 1px solid wheat;
  background-color: rgb(255, 247, 236);
  border-radius: 5px;
}

/*人数 贴吧  加入按钮row*/
.user_post_join {
  margin-top: 2px;
}

/*为了使用 加入/退出 按钮高度  给人数和贴子数的列设置行高对齐*/
.user_post_line_height {
  line-height: 28px;
}

/*15px 大小的字体  用于首页贴吧展示列表下面的人数和帖子数字体*/
.font_size_15 {
  font-size: 15px;
}

/* 每个贴吧项  人数和贴子数 左侧的图标颜色*/
.user_icon_color {
  color: #42b983;
}

.post_icon_color {
  color: #f17008;
}

/*贴吧介绍div*/
.bar_intro {
  font-size: small;
  margin-top: 22px;
  padding-left: 6px;
}

/*贴吧名 div （包括推荐文字背景）*/
.recommend {
  margin-top: 5px;
  padding-left: 45px;
  background-image: url("../../assets/images/index_recommend.png");
  background-repeat: no-repeat;
  background-position-x: -138px;
  background-position-y: 5px;
  /*height: 20px;*/
  padding-top: 10px;
}
</style>
