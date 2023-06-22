<template>
  <div class="backBody">
    <div class="left" style="margin-right: 20px">
      <div class="up">
        <el-card style="margin-top: 100px;margin-left:30px;margin-right:640px;background-color: #bbded7">
          <div class="select">
            <div class="select1">
              <template>
              <div class="smallTitle"><h3>地点</h3></div>
                <el-cascader
                    v-model="selectedOptions"
                    :options="options"
                    filterable
                    clearable
                    style="height: 20px;"
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
        <div class="div1"></div>

        <div class="div2"></div>

        <div class="div3"></div>

        <div class="div4"></div>

        <div class="div5"></div>

        <div class="div6"></div>
        
      </div>
      <div class="below">

      </div>
    </div>
    <div class="right">
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
  methods: {
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
  position: fixed;
  top: 100px;
  right: 30px;
  .rightCard{
    border-radius: 10px;
    height: 600px;
    width: 600px;
  }
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
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-column-gap: 10px;
  grid-row-gap: 10px;
}
.div1 { 
  width: 200px;
  height: 200px;
  background-color: #fae3d9;
  grid-area: 1 / 1 / 2 / 2; 
}
.div2 { 
  width: 200px;
  height: 200px;
  background-color: #fae3d9;
  grid-area: 1 / 2 / 2 / 3; }
.div3 { 
  width: 200px;
  height: 200px;
  background-color: #fae3d9;
  grid-area: 1 / 3 / 2 / 4; }
.div4 { 
  width: 200px;
  height: 200px;
  background-color: #fae3d9;
  grid-area: 2 / 1 / 3 / 2; }
.div5 { 
  width: 200px;
  height: 200px;
  background-color: #fae3d9;
  grid-area: 2 / 2 / 3 / 3; }
.div6 { 
  width: 200px;
  height: 200px;
  background-color: #fae3d9;
  grid-area: 2 / 3 / 3 / 4; 
  }
</style>


