<template>
  <div>这是景点一览</div>
</template>

<script>

export default{
  name:'Scenery',
  data(){
    return{

    }
  },
  created(){
    this.initData();
  },
  methods:{
    initData(){
      console.log(this.$route.query.param)
    }
  }

}

</script>