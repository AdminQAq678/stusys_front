<template>
    <div id="home">
        <el-container>
    <el-header>
        <div class="head">
            <span>wocnz</span>
            <span>学生选课管理系统</span>
        </div>
        
        </el-header>
    <el-container>
    <el-aside width="200px">
      
  
    <el-menu
      :default-active="router_index"
    :router="true"
     background-color="#545c64"
   
     
     
      >
     
      <el-menu-item index="/student" @click="setActiveIndex('/'+'student')">
        <i class="iconfont icon-xuesheng"></i>
        <span slot="title">学生</span>
      </el-menu-item>
      <el-menu-item index="/teacher" @click="setActiveIndex('/'+'teacher')" >
        <i class="iconfont icon-laoshi"></i>
        <span slot="title">老师</span>
      </el-menu-item>
      <el-menu-item index="/department" @click="setActiveIndex('/'+'department')">
        <i class="iconfont icon-xueyuan"></i>
        <span slot="title">学院</span>
      </el-menu-item>
      <el-menu-item index="/sct" @click="setActiveIndex('/'+'sct')">
        <i class="iconfont icon-kecheng"></i>
        <span slot="title">学生已选课程</span>
      </el-menu-item>
      <el-menu-item index="/course" @click="setActiveIndex('/'+'course')">
        <i class="iconfont icon-xuanke"></i>
        <span slot="title">课程信息</span>
      </el-menu-item>
      <el-menu-item index="/selectCourse" @click="setActiveIndex('/'+'selectCourse')">
        <i class="iconfont icon-xuanke"></i>
        <span slot="title">学生选课</span>
      </el-menu-item>
      <el-menu-item index="/teascourses" @click="setActiveIndex('/'+'teascourses')">
        <i class="iconfont icon-xuanke"></i>
        <span slot="title">我的授课</span>
      </el-menu-item>
     
      

    </el-menu>


      </el-aside>
      <el-main>    <router-view></router-view></el-main>
    </el-container>
    </el-container>

    </div>
</template>

<script>
export default {
    data(){
      return {
        router_index:''
      
      }
    },
    created(){
      this.router_index=window.sessionStorage.getItem("router_index")
    },
    methods:{
      setActiveIndex:function(index){
        this.router_index=index;
				//保持高亮状态效果
				window.sessionStorage.setItem("router_index",index);
      },
     
    }
}
</script>

<style scoped>
#home,.el-container,.el-menu{
    height: 100%;
}
.el-menu{
    border-right: 0px !important;
}
.head span:first-child{
     display: inline-block;
    width: 20%;
    line-height: 50px;
    height:50px;
    font-size: 20px;
    font-weight: 800;
    
    
}
.head span{
    color: white;
}
.head span:last-child{
    display: inline-block;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    width: 70%;
    line-height: 50px;
    height:50px;
    font-size: 35px;
    text-align: center;
}
.el-header{
    background-color: #373d41;
}
.iconfont{
  font-size: 20px;
  margin-right: 5px;
}
</style>