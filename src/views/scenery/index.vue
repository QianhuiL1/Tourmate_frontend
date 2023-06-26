<template>
  <div class="body">
    <el-card class="topCard">
      <div class="titleblock">
        <div class="title">景点</div>
        <div class="score">4.6 （评分）</div>
        <div class="position"><img src='../../assets/icons/position.png' alt="" style="width:24px;height:24px;margin-right: 20px"/>位置</div>
      </div>
      <div class="imgblock">
        <el-carousel height="220px">
          <el-carousel-item v-for="item in 4" :key="item">
            <h3 class="small">{{ }}</h3>
          </el-carousel-item>
        </el-carousel>
      </div>
    </el-card>
    <el-card class="middle1">
      <div class="title2">景点介绍</div>
      <div class="intro">介绍</div>
    </el-card>
    <div class="middle2">
      <el-card class="middle2Left">
        <div class="title2">开放时间</div>
      </el-card>
      <el-card class="middle2Right">
        <div class="title2">交通方式</div>
      </el-card>
    </div>
    <el-card class="bottomCard">
      <template>
        <el-tabs v-model="activeName" @tab-click="handleClick" :stretch=true>
          <el-tab-pane label="附近酒店" name="first">
            <div class="content">
              <div class="titleblock">附近酒店</div>
              <div class="imgblock">
                <el-carousel height="220px">
                  <el-carousel-item v-for="item in 4" :key="item">
                    <h3 class="small">{{ }}</h3>
                  </el-carousel-item>
                </el-carousel>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="附近美食" name="second">
            <div class="content">
              <div class="titleblock">附近美食</div>
              <div class="imgblock">
                <el-carousel height="220px">
                  <el-carousel-item v-for="item in 4" :key="item">
                    <h3 class="small">{{ }}</h3>
                  </el-carousel-item>
                </el-carousel>
              </div>
            </div>
            </el-tab-pane>
          <el-tab-pane label="附近景点" name="third">
            <div class="content">
              <div class="titleblock">附近景点</div>
              <div class="imgblock">
                <el-carousel height="220px">
                  <el-carousel-item v-for="item in 4" :key="item">
                    <h3 class="small">{{ }}</h3>
                  </el-carousel-item>
                </el-carousel>
              </div>
            </div>
            </el-tab-pane>
        </el-tabs>
      </template>
    </el-card>
    <div v-show='showTopIcon' class="toTopItem" @click="toTop">
      <img src='../../assets/icons/toTop_before.png' alt="" class="toTopIcon"/>
    </div>
  </div>
</template>

<script>
export default{
  name:'Scenery',
  data(){
    return{
      showTopIcon: false,
      activeName: 'second'
    }
  },
  mounted() {
    window.addEventListener('scroll', this.showToTop, true)
  },
  created(){
    this.initData();
  },
  methods:{
    showToTop(){
      if(document.documentElement.scrollTop !==0){
        this.showTopIcon = true;
      }else{
        this.showTopIcon = false;
      }
    },
    initData(){
      console.log(this.$route.query.param)
      console.log(this.$store.state.sceneInfo)
    },
    toTop(){
      window.scrollTo({
          top: 0,
          behavior: 'smooth'
      })
    },
    handleClick(tab,event){

    }
  }

}

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.body{
  display: flex;
  flex-direction: column;
  margin-left:30px;
  margin-right:30px;
}
.topCard{
  margin-top: 20px;
  height: 250px;
  border-radius: 30px;
  ::v-deep .el-card__body{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
}
.titleblock{
    margin-left: 20px;
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .title{
      font-size: 50px;
      font-family: 'hgz' ;
    }
    .score{
      font-size: 20px;
      font-family: 'hgw' ;
    }
    .position{
      font-size: 20px;
      font-family: 'hgw' ;
    }
  }
  .imgblock{
    height: 250px;
    width: 500px;
    border-radius: 30px;
  }
::v-deep.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
    border-radius: 30px;
  }
  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
     border-radius: 30px;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
     border-radius: 30px;
  }
.middle1{
  margin-top: 10px;
  height: 200px;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  .intro{
    margin-top: 20px;
    margin-left: 20px;
    font-size: 20px;
    font-family: 'hgw';
  }
}
.title2{
    margin-left: 20px;
    font-size:40px;
    font-family: 'hgz';
  }
.middle2{
  margin-top: 10px;
  display:flex;
  flex-direction:row;
  justify-content: space-between;
  .middle2Left{
    height: 200px;
    border-radius: 30px;
    //right: 10px;
    width: 50%;
  }
  .middle2Right{
    margin-left: 10px;
    height: 200px;
    border-radius: 30px;
    width: 50%;
  }
}
.bottomCard{
  margin-top: 10px;
  height: 300px;
  border-radius: 30px;
}
.content{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.toTopItem{
  position: fixed;
  bottom: 30px;
  right: 30px;
  height: 60px;
  width: 60px;
  :hover {
        cursor: pointer; //鼠标变手
  }
  
  .toTopIcon{
    height: 100%;
    width: 100%;
  }
}
.toTopItem:hover .toTopIcon{
  content: url(../../assets/icons/toTop_after.png)
}
</style>