<template>
  <div class="backBody">
    <div class="left" style="margin-right: 20px">
      <div class="up">
        <el-card class="inputCard">
          <div class="select">
            <div class="select1">
              <template>
              <div class="smallTitle"><h3>地点</h3></div>
                <el-cascader
                    v-model="selectedOptions"
                    :options="options"
                    filterable
                    clearable
                    stylse="height: 20px;"
                    size="small"
                    @change="handleQuery"
                    placeholder="请选择地点"
                  />
              </template>
            </div>
            <div class="select2">
              <template>
                <div class="smallTitle"><h3>模式</h3></div>
                <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange" style="margin-right:10px">全选</el-checkbox>
                <el-checkbox-group v-model="modelList" @change="handleCheckedChange">
                  <el-checkbox v-for="model in models" :label="model" :key="model">{{ model }}</el-checkbox>
                </el-checkbox-group>
              </template>
            </div>
            <div class="select3">
              <template>
                <div class="smallTitle"><h3>类型</h3></div>
                <el-checkbox :indeterminate="isIndeterminate2" v-model="checkAll2" @change="handleCheckAllChange2" style="margin-right:10px;margin-left:19px">全选</el-checkbox>
                <el-checkbox-group v-model="typeList" @change="handleCheckedChange2">
                  <el-checkbox v-for="oneType in types" :label="oneType" :key="oneType">{{ oneType }}</el-checkbox>
                </el-checkbox-group>
              </template>
            </div>
            <div class="search-container">
                <input type="text">
                <button>搜索</button>
            </div>
          </div>
      </el-card>
      </div>
      <div class="middle">
        <div class="rowInMiddle">
          <template v-for='(item,index) in initItems'>
            <el-card class="sceneCard" :key='index' v-if="index%3===0" element-loading-text="拼命加载中">
              <div class="sceneImg" @click="toInfo(item)">
                <img :src="item.img" alt="" class="fullImg">
              </div>
              <div class="sceneTitle">
                <el-button type="text" @click="toInfo(item)">{{ item.name }}</el-button>
              </div>
            </el-card>
            <el-card class="sceneCard" :key='index' v-if="index%3===1" element-loading-text="拼命加载中">
              <div class="sceneImg" @click="toInfo(item)">
                <img :src="item.img" alt="" class="fullImg">
              </div>
              <div class="sceneTitle">
                <el-button type="text" @click="toInfo(item)">{{ item.name }}</el-button>
              </div>
            </el-card>
            <el-card class="sceneCard" :key='index' v-if="index%3===2" element-loading-text="拼命加载中">
              <div class="sceneImg" @click="toInfo(item)">
                <img :src="item.img" alt="" class="fullImg">
              </div>
              <div class="sceneTitle">
                <el-button type="text" @click="toInfo(item)">{{ item.name }}</el-button>
              </div>
            </el-card>
          </template>
        </div>
        <el-button type="text" v-if="!showMore" class="more" @click="getMore">更多</el-button>
        <div v-infinite-scroll="load" class="rowInMiddle" v-show="showMore">
          <template v-for='(item,index) in dividedItems'>
            <el-card class="sceneCard" :key='index' v-if="index%3===0" element-loading-text="拼命加载中">
              <div class="sceneImg" @click="toInfo(item)">
                <img :src="item.img" alt="" class="fullImg">
              </div>
              <div class="sceneTitle">
                <el-button type="text" @click="toInfo(item)">{{ item.name }}</el-button>
              </div>
            </el-card>
            <el-card class="sceneCard" :key='index' v-if="index%3===1" element-loading-text="拼命加载中">
              <div class="sceneImg" @click="toInfo(item)">
                <img :src="item.img" alt="" class="fullImg">
              </div>
              <div class="sceneTitle">
                <el-button type="text" @click="toInfo(item)">{{ item.name }}</el-button>
              </div>
            </el-card>
            <el-card class="sceneCard" :key='index' v-if="index%3===2" element-loading-text="拼命加载中">
              <div class="sceneImg" @click="toInfo(item)">
                <img :src="item.img" alt="" class="fullImg">
              </div>
              <div class="sceneTitle">
                <el-button type="text" @click="toInfo(item)">{{ item.name }}</el-button>
              </div>
            </el-card>
          </template>
        </div>
        <!-- 下拉加载时的loading动画 -->
        <div v-if="loading" style="margin-top:10px" class="loading">
          <span></span>
        </div>
        <div v-if="noMore" style="margin: 10 auto; text-align:center; font-size:18px;font-weight: 550; color:#000000">-----------我是有底线的------------</div>
      </div>
      <div class="below" v-show="!showMore">
        <div class="hotTitle">
          <h1>当季热推</h1>
        </div>
        <div class="hotRow">
          <el-card class="hotItem">
            <div class="hotImg">
              <img :src="hotList[0]" alt="" class="itemImg">
            </div>
            <div class="itemTitle">
              <h4>{{ hotName[0] }}</h4>
            </div>
          </el-card>
        </div>
        <div class="hotRow">
          <el-card class="hotItem">
            <div class="hotImg">
              <img :src="hotList[1]" alt="" class="itemImg">
            </div>
            <div class="itemTitle">
              <h4>{{ hotName[1] }}</h4>
            </div>
          </el-card>
        </div>
        <div class="hotRow">
          <el-card class="hotItem">
            <div class="hotImg">
              <img :src="hotList[1]" alt="" class="itemImg">
            </div>
            <div class="itemTitle">
              <h4>{{ hotName[1] }}</h4>
            </div>
          </el-card>
        </div>
        <div class="hotRow">
          <el-card class="hotItem">
            <div class="hotImg">
              <img :src="hotList[1]" alt="" class="itemImg">
            </div>
            <div class="itemTitle">
              <h4>{{ hotName[1] }}</h4>
            </div>
          </el-card>
        </div>
      </div>
    </div>
    <div :class="fixed == true ? 'fixedRight' : 'right'">
      <el-card class="rightCard">
        
      </el-card>
    </div>
  </div>
</template>

<script>
import { regionData} from 'element-china-area-data'
import { vInfiniteScroll } from 'element-ui'
const modelOptions = ["一日游","跟团游","自由行","主题游","游学"]
const typeOptions = ["现代风情","历史风情","博物馆","动物园","游乐中心","历史伟人","休闲公园","植物园","国内名校","购物中心","电影剧院","红色文化","体育中心","宗教圣地","美食天地"]
export default {
  name: "Menu",
  directives:{
    "infinite-scroll": vInfiniteScroll,
  },
  data() {
    return {
      fixed: false,
      showMore: false,
      modelList:[],
      checkAll: false,
      models: modelOptions,
      isIndeterminate: true,
      typeList:[],
      checkAll2: false,
      types: typeOptions,
      isIndeterminate2: true,
      // 将省市区数据赋给级联选择器
      options: regionData,
      // 存放用户选择后省市区的信息
      selectedOptions: [],
      searchItems:[], // 搜索出的所有数据
      initItems: [], // 展示出的部分数据
      dividedItems: [], // 渲染数据数组
      loading: false, // 加载动画
      pages: 10, // 数据总页数
      pageIndex: 1 ,// 分页查询参数
      hotList:['https://ts1.cn.mm.bing.net/th/id/R-C.bd53096921883dc16d2d43ae9b13beb2?rik=hAVg5u2Bswf%2f6w&riu=http%3a%2f%2fdimg03.c-ctrip.com%2fimages%2ffd%2ftg%2fg1%2fM04%2fCB%2f99%2fCghzflWw7F2ATxCcABtxFWU_LNw686.jpg&ehk=O0khPGFITeE3EYpaMmGp%2fmoqaxywztOVmBqbiH6PV7c%3d&risl=&pid=ImgRaw&r=0','https://ts1.cn.mm.bing.net/th/id/R-C.bd53096921883dc16d2d43ae9b13beb2?rik=hAVg5u2Bswf%2f6w&riu=http%3a%2f%2fdimg03.c-ctrip.com%2fimages%2ffd%2ftg%2fg1%2fM04%2fCB%2f99%2fCghzflWw7F2ATxCcABtxFWU_LNw686.jpg&ehk=O0khPGFITeE3EYpaMmGp%2fmoqaxywztOVmBqbiH6PV7c%3d&risl=&pid=ImgRaw&r=0'],
      hotName:['热推名','热推名'],
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  created() {
    this.divideItems();
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  computed:{
    noMore(){
      // 页数大于总页数停止加载
      return this.pageIndex >= this.pages;
    },
    disabled(){
      return this.loading || this.noMore;
    }
  },
  mounted(){
    window.addEventListener('scroll',this.fixedCard);
  },
  methods: {
    fixedCard(){
      var scrollTop =
      document.documentElement.scrollTop ||
      document.body.scrollTop
      scrollTop >= 90 ? (this.fixed = true) : (this.fixed = false)
    },
    divideItems(){
      // 获取搜索结果
      // 将前六项取出放入sceneList
      // 剩余加入dividedItems
       this.initItems=[
       {img: 'https://ts1.cn.mm.bing.net/th/id/R-C.bd53096921883dc16d2d43ae9b13beb2?rik=hAVg5u2Bswf%2f6w&riu=http%3a%2f%2fdimg03.c-ctrip.com%2fimages%2ffd%2ftg%2fg1%2fM04%2fCB%2f99%2fCghzflWw7F2ATxCcABtxFWU_LNw686.jpg&ehk=O0khPGFITeE3EYpaMmGp%2fmoqaxywztOVmBqbiH6PV7c%3d&risl=&pid=ImgRaw&r=0',
       name:'景点'},
       {img: 'https://ts1.cn.mm.bing.net/th/id/R-C.bd53096921883dc16d2d43ae9b13beb2?rik=hAVg5u2Bswf%2f6w&riu=http%3a%2f%2fdimg03.c-ctrip.com%2fimages%2ffd%2ftg%2fg1%2fM04%2fCB%2f99%2fCghzflWw7F2ATxCcABtxFWU_LNw686.jpg&ehk=O0khPGFITeE3EYpaMmGp%2fmoqaxywztOVmBqbiH6PV7c%3d&risl=&pid=ImgRaw&r=0',
       name:'景点2'},
       {img: 'https://ts1.cn.mm.bing.net/th/id/R-C.bd53096921883dc16d2d43ae9b13beb2?rik=hAVg5u2Bswf%2f6w&riu=http%3a%2f%2fdimg03.c-ctrip.com%2fimages%2ffd%2ftg%2fg1%2fM04%2fCB%2f99%2fCghzflWw7F2ATxCcABtxFWU_LNw686.jpg&ehk=O0khPGFITeE3EYpaMmGp%2fmoqaxywztOVmBqbiH6PV7c%3d&risl=&pid=ImgRaw&r=0',
       name:'景点3'},
       {img: 'https://ts1.cn.mm.bing.net/th/id/R-C.bd53096921883dc16d2d43ae9b13beb2?rik=hAVg5u2Bswf%2f6w&riu=http%3a%2f%2fdimg03.c-ctrip.com%2fimages%2ffd%2ftg%2fg1%2fM04%2fCB%2f99%2fCghzflWw7F2ATxCcABtxFWU_LNw686.jpg&ehk=O0khPGFITeE3EYpaMmGp%2fmoqaxywztOVmBqbiH6PV7c%3d&risl=&pid=ImgRaw&r=0',
       name:'景点4'},
       {img: 'https://ts1.cn.mm.bing.net/th/id/R-C.bd53096921883dc16d2d43ae9b13beb2?rik=hAVg5u2Bswf%2f6w&riu=http%3a%2f%2fdimg03.c-ctrip.com%2fimages%2ffd%2ftg%2fg1%2fM04%2fCB%2f99%2fCghzflWw7F2ATxCcABtxFWU_LNw686.jpg&ehk=O0khPGFITeE3EYpaMmGp%2fmoqaxywztOVmBqbiH6PV7c%3d&risl=&pid=ImgRaw&r=0',
       name:'景点5'},
       {img: 'https://ts1.cn.mm.bing.net/th/id/R-C.bd53096921883dc16d2d43ae9b13beb2?rik=hAVg5u2Bswf%2f6w&riu=http%3a%2f%2fdimg03.c-ctrip.com%2fimages%2ffd%2ftg%2fg1%2fM04%2fCB%2f99%2fCghzflWw7F2ATxCcABtxFWU_LNw686.jpg&ehk=O0khPGFITeE3EYpaMmGp%2fmoqaxywztOVmBqbiH6PV7c%3d&risl=&pid=ImgRaw&r=0',
       name:'景点6'},
       ]
       this.dividedItems = this.initItems
    }, 
    getMore(){
      this.showMore = true;
    },
    // 下拉加载事件
    load(){
      // 划到底部时进行加载
      this.loading = true;
      setTimeout(() => {
        let param = {
          pageIndex:this.pageIndex+1,   //分页参数
          pageSize:6, //每页查询的条数
        }
        // 请求获取数据
      }, 1500);
    },
    // 跳转到详情页
    toInfo(item){
      console.log(item)
      this.$router.push({path:"/scenery",query:{param: item.name}})
    },
    handleQuery(){
      // 给pages总页数赋值
    },
    handleCheckAllChange(val) {
        this.modelList = val ? modelOptions : [];
        this.isIndeterminate = false;
    },
    handleCheckAllChange2(val) {
        this.typeList = val ? typeOptions : [];
        this.isIndeterminate2 = false;
    },
    handleCheckedChange(value){
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.models.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.models.length
    },
    handleCheckedChange2(value){
      let checkedCount = value.length;
      this.checkAll2 = checkedCount === this.types.length;
      this.isIndeterminate2 = checkedCount > 0 && checkedCount < this.types.length
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.backBody{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: relative;
}
.inputCard{
   margin-top: 50px;
   margin-left:30px;
   margin-right:640px;
   border-radius: 10px;
   border:none;
   //background-color: #bbded7";
   background-image: url(../../assets/images/homepage3.jpg);
   background-repeat: no-repeat;
   background-size: 100% 100%
}
.right{
  position: absolute;
  top: 30px;
  right: 30px;
}
.fixedRight{
  position: fixed;
  top: 20px;
  right: 30px;
}
.rightCard{
  margin-top:10px;
    border-radius: 10px;
    height: 650px;
    width: 600px;
    background-image: url(https://img.zcool.cn/community/01c9a95aee6479a801219b7f8d9208.jpg@1280w_1l_2o_100sh.jpg);
    background-size: 600px 650px
  }
.up{
  display: flex;
  flex-direction: column;
  .select{
    display: flex;
    flex-direction: column;
    .smallTitle{
      font-family: 'hgw';
      margin-right: 10px;
      margin-top: -13px;
    }
    .select1{
       display: flex;
       flex-direction: row;
      // justify-content: space-between;
    }
    .select2{
       display: flex;
       flex-direction: row;
      // justify-content: space-between;
    }
    .select3{
      display: flex;
      flex-direction: row;
    }

  }
}
.search-container{
  margin-top: 10px;
  width: 500px;
  height: 30px;
  line-height: 30px;
  display: flex;
}
.search-container input{
  height: 30px;
  line-height: 30px;
  box-sizing: border-box;
  outline: none;
  flex: 1;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  border: none;
  padding: 0 10px;
  transition: all .3s;
  :focus{
    box-shadow: 0 0 5px #eee;
  }
}
.search-container button{
  height: 30px;
  line-height: 30px;
  padding: 0 15px;
  border: none;
  box-sizing: border-box;
  background-color: #4bc1d6;
  font-size: 15px;
  color: #fff;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  cursor: pointer;
  :focus{
    background-color: #4bc1d6;
  }
}
.middle{
  margin-left: 30px;
  margin-top: 20px;
  margin-right: 640px;
  .rowInMiddle{
    // margin-top:15px;
    display:flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .sceneCard{
    //background-color: blue;
    margin-top: 10px;
    ::v-deep .el-card__body {
    padding: 0;
    }
    height: 200px;
    width: 213px;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    .sceneImg{
      height: 150px;
      width: 220px;
      border-radius: 10px;
      // display: table-cell;
      // text-align: center;
      :hover {
        cursor: pointer; //鼠标变手
        }
      .fullImg{
        
        width: 100%;
        height: 100%;
      }
    }
    .sceneTitle{
      text-align:center;
      :hover{
        color: blue
      }
    }
    }
    .more{
      float: right;
      margin-top: 10px;
    }
}
.below{
  display:flex;
  flex-direction: column;
  margin-left: 30px;
  margin-right: 640px;
  .hotTitle{
    font-family: 'hgz';
    font-size: 20px;
  }
  .hotRow{
    margin-top:10px;
    // display:flex;
    // flex-direction: row;
    // justify-content: space-around;
    .hotItem{
      ::v-deep .el-card__body {
        padding: 0;
        }
      margin-bottom: 20px;
      border-radius: 10px;
      display:flex;
      flex-direction: row;
      // justify-content: space-around;
      height: 120px;
      .hotImg{
        height: 120px;
        width: 200px;
        float: left;
        // display: table-cell;
        // text-align: left;
        .itemImg{
          width: 100%;
          height: 120px;
        }
      }
      .itemTitle{
        margin-left: 10px;
        float: right;
        font-family: 'lca';
        font-size: 25px;
        vertical-align: center;
        //margin-top: -15px;
        //text-align:right;
      }
    }
  }
}
</style>


