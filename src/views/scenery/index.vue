<template>
  <div class="body">
    <el-card class="topCard">
      
    </el-card>
    <el-card class="middle1">

    </el-card>
    <el-card class="middle2">

    </el-card>
    <el-card class="bottomCard">

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
      console.log('距离',document.documentElement.scrollTop)
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
}
.middle1{
  margin-top: 50px;
  height: 100px;
  border-radius: 30px;
}
.middle2{
  margin-top: 50px;
  height: 100px;
  border-radius: 30px;
}
.bottomCard{
  margin-top: 50px;
  height: 100px;
  border-radius: 30px;
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