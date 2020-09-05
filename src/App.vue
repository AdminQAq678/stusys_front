<template>
  <div id="app">
    <router-view></router-view>

  </div>
</template>

<script>

export default {
  name: 'app',
  mounted:function(){
    this.getAllStu();
  },
  methods:{
    getAllStu:async function(){
     
      // this.$http.get('findAllStu',{
      //   // params: {
      //   //   userId: id,
      //   // }
      // })
      // .then((response) => {
      //   console.log(response.data[0]);//请求的返回体
      // })
      // .catch((error) => {
      //   console.log(error);//异常
      // });
    }
  }
}
</script>

<style>
html,body,#app{
  height: 100%;
  margin: 0;
  padding: 0;
}


</style>
