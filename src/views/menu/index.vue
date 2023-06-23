<template>
  <div class="backBody">
    <div class="left" style="margin-right: 20px">
      <div class="up">
        <el-card style="margin-top: 100px;margin-left:30px;margin-right:640px;border:none;background-color: #bbded7">
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
          <el-card class="sceneCard">
            <div class="sceneImg">
              <img :src="sceneList[0]" alt="" class="fullImg">
            </div>
            <div class="sceneTitle">
              <h4>{{ sceneName[0] }}</h4>
            </div>
          </el-card>
          <el-card class="sceneCard">
            <div class="sceneImg">
              <img :src="sceneList[1]" alt="" class="fullImg">
            </div>
            <div class="sceneTitle">
              <h4>{{ sceneName[1] }}</h4>
            </div>
          </el-card>
          <el-card class="sceneCard">
            <div class="sceneImg">
              <img :src="sceneList[2]" alt="" class="fullImg">
            </div>
            <div class="sceneTitle">
              <h4>{{ sceneName[2] }}</h4>
            </div>
          </el-card>
        </div>
        <div class="rowInMiddle">
          <el-card class="sceneCard">
            <div class="sceneImg">
              <img :src="sceneList[3]" alt="" class="fullImg">
            </div>
            <div class="sceneTitle">
              <h4>{{ sceneName[3] }}</h4>
            </div>
          </el-card>
          <el-card class="sceneCard">
            <div class="sceneImg">
              <img :src="sceneList[4]" alt="" class="fullImg">
            </div>
            <div class="sceneTitle">
              <h4>{{ sceneName[4] }}</h4>
            </div>
          </el-card>
          <el-card class="sceneCard">
            <div class="sceneImg">
              <img :src="sceneList[5]" alt="" class="fullImg">
            </div>
            <div class="sceneTitle">
              <h4>{{ sceneName[5] }}</h4>
            </div>
          </el-card>
        </div>
        <div class="more"><el-link type="primary" href="https://www.ctrip.com/" target="_blank">更多</el-link></div>
      </div>
      <div class="below">
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
              <img :src="hotList[2]" alt="" class="itemImg">
            </div>
            <div class="itemTitle">
              <h4>{{ hotName[2] }}</h4>
            </div>
          </el-card>
          <el-card class="hotItem">
            <div class="hotImg">
              <img :src="hotList[3]" alt="" class="itemImg">
            </div>
            <div class="itemTitle">
              <h4>{{ hotName[3] }}</h4>
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
const modelOptions = ["一日游","跟团游","自由行","主题游","游学"]
const typeOptions = ["现代风情","历史风情","博物馆","动物园","游乐中心","历史伟人","休闲公园","植物园","国内名校","购物中心","电影剧院","红色文化","体育中心","宗教圣地","美食天地"]
export default {
  name: "Menu",
  data() {
    return {
      fixed: false,
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
      sceneList:['https://ts1.cn.mm.bing.net/th/id/R-C.bd53096921883dc16d2d43ae9b13beb2?rik=hAVg5u2Bswf%2f6w&riu=http%3a%2f%2fdimg03.c-ctrip.com%2fimages%2ffd%2ftg%2fg1%2fM04%2fCB%2f99%2fCghzflWw7F2ATxCcABtxFWU_LNw686.jpg&ehk=O0khPGFITeE3EYpaMmGp%2fmoqaxywztOVmBqbiH6PV7c%3d&risl=&pid=ImgRaw&r=0',
      'https://ts1.cn.mm.bing.net/th/id/R-C.bd53096921883dc16d2d43ae9b13beb2?rik=hAVg5u2Bswf%2f6w&riu=http%3a%2f%2fdimg03.c-ctrip.com%2fimages%2ffd%2ftg%2fg1%2fM04%2fCB%2f99%2fCghzflWw7F2ATxCcABtxFWU_LNw686.jpg&ehk=O0khPGFITeE3EYpaMmGp%2fmoqaxywztOVmBqbiH6PV7c%3d&risl=&pid=ImgRaw&r=0',
      'https://ts1.cn.mm.bing.net/th/id/R-C.bd53096921883dc16d2d43ae9b13beb2?rik=hAVg5u2Bswf%2f6w&riu=http%3a%2f%2fdimg03.c-ctrip.com%2fimages%2ffd%2ftg%2fg1%2fM04%2fCB%2f99%2fCghzflWw7F2ATxCcABtxFWU_LNw686.jpg&ehk=O0khPGFITeE3EYpaMmGp%2fmoqaxywztOVmBqbiH6PV7c%3d&risl=&pid=ImgRaw&r=0',
      'https://ts1.cn.mm.bing.net/th/id/R-C.bd53096921883dc16d2d43ae9b13beb2?rik=hAVg5u2Bswf%2f6w&riu=http%3a%2f%2fdimg03.c-ctrip.com%2fimages%2ffd%2ftg%2fg1%2fM04%2fCB%2f99%2fCghzflWw7F2ATxCcABtxFWU_LNw686.jpg&ehk=O0khPGFITeE3EYpaMmGp%2fmoqaxywztOVmBqbiH6PV7c%3d&risl=&pid=ImgRaw&r=0',
      'https://ts1.cn.mm.bing.net/th/id/R-C.bd53096921883dc16d2d43ae9b13beb2?rik=hAVg5u2Bswf%2f6w&riu=http%3a%2f%2fdimg03.c-ctrip.com%2fimages%2ffd%2ftg%2fg1%2fM04%2fCB%2f99%2fCghzflWw7F2ATxCcABtxFWU_LNw686.jpg&ehk=O0khPGFITeE3EYpaMmGp%2fmoqaxywztOVmBqbiH6PV7c%3d&risl=&pid=ImgRaw&r=0',
      'https://ts1.cn.mm.bing.net/th/id/R-C.bd53096921883dc16d2d43ae9b13beb2?rik=hAVg5u2Bswf%2f6w&riu=http%3a%2f%2fdimg03.c-ctrip.com%2fimages%2ffd%2ftg%2fg1%2fM04%2fCB%2f99%2fCghzflWw7F2ATxCcABtxFWU_LNw686.jpg&ehk=O0khPGFITeE3EYpaMmGp%2fmoqaxywztOVmBqbiH6PV7c%3d&risl=&pid=ImgRaw&r=0'
  ],
      sceneName:['景点名','景点名','景点名','景点名','景点名','景点名'],
      hotList:['https://ts1.cn.mm.bing.net/th/id/R-C.bd53096921883dc16d2d43ae9b13beb2?rik=hAVg5u2Bswf%2f6w&riu=http%3a%2f%2fdimg03.c-ctrip.com%2fimages%2ffd%2ftg%2fg1%2fM04%2fCB%2f99%2fCghzflWw7F2ATxCcABtxFWU_LNw686.jpg&ehk=O0khPGFITeE3EYpaMmGp%2fmoqaxywztOVmBqbiH6PV7c%3d&risl=&pid=ImgRaw&r=0','https://ts1.cn.mm.bing.net/th/id/R-C.bd53096921883dc16d2d43ae9b13beb2?rik=hAVg5u2Bswf%2f6w&riu=http%3a%2f%2fdimg03.c-ctrip.com%2fimages%2ffd%2ftg%2fg1%2fM04%2fCB%2f99%2fCghzflWw7F2ATxCcABtxFWU_LNw686.jpg&ehk=O0khPGFITeE3EYpaMmGp%2fmoqaxywztOVmBqbiH6PV7c%3d&risl=&pid=ImgRaw&r=0','https://ts1.cn.mm.bing.net/th/id/R-C.bd53096921883dc16d2d43ae9b13beb2?rik=hAVg5u2Bswf%2f6w&riu=http%3a%2f%2fdimg03.c-ctrip.com%2fimages%2ffd%2ftg%2fg1%2fM04%2fCB%2f99%2fCghzflWw7F2ATxCcABtxFWU_LNw686.jpg&ehk=O0khPGFITeE3EYpaMmGp%2fmoqaxywztOVmBqbiH6PV7c%3d&risl=&pid=ImgRaw&r=0','https://ts1.cn.mm.bing.net/th/id/R-C.bd53096921883dc16d2d43ae9b13beb2?rik=hAVg5u2Bswf%2f6w&riu=http%3a%2f%2fdimg03.c-ctrip.com%2fimages%2ffd%2ftg%2fg1%2fM04%2fCB%2f99%2fCghzflWw7F2ATxCcABtxFWU_LNw686.jpg&ehk=O0khPGFITeE3EYpaMmGp%2fmoqaxywztOVmBqbiH6PV7c%3d&risl=&pid=ImgRaw&r=0'],
      hotName:['热推名','热推名','热推名','热推名']
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
    
  },
  mounted(){
    window.addEventListener('scroll',this.fixedCard)
  },
  methods: {
    fixedCard(){
      var scrollTop =
      document.documentElement.scrollTop ||
      document.body.scrollTop
      scrollTop >= 80 ? (this.fixed = true) : (this.fixed = false)
    },
    handleQuery(){

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
  background-image: url(../../assets/images/homepage.jpg);
  background-repeat: no-repeat;
  background-size: 100% 
}
.right{
  position: absolute;
  top: 90px;
  right: 30px;
  
}
.fixedRight{
  position: fixed;
  top: 20px;
  right: 30px;
}
.rightCard{
  margin-top:20px;
    border-radius: 10px;
    height: 600px;
    width: 600px;
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
    display:flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .sceneCard{
    //background-color: blue;
    height: 200px;
    width: 220px;
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    .sceneImg{
      height: 150px;
      width: 200px;
      display: table-cell;
      text-align: center;
      .fullImg{
        width: 100%;
        height: 150px;
      }
    }
    .sceneTitle{
      text-align:center;
      margin-top: -15px;
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
  margin-right: 660px;
  .hotTitle{
    font-family: 'hgz';
    font-size: 20px;
  }
  .hotRow{
    display:flex;
    flex-direction: row;
    justify-content: space-around;
    .hotItem{
      margin-top: 10px;
      margin-bottom: 20px;
      display:flex;
      flex-direction: column;
      height: 200px;
      width: 320px;
      .hotImg{
        height: 150px;
        width: 300px;
        display: table-cell;
        text-align: center;
        .itemImg{
          width: 100%;
          height: 150px;
        }
      }
      .itemTitle{
        margin-top: -15px;
        text-align:center;
      }
    }
  }
}
</style>


