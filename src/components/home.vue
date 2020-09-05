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
      default-active="/student"
    :router="true"
     background-color="#545c64"
      >
     
      <el-menu-item index="/student">
        <i class="el-icon-menu"></i>
        <span slot="title">学生</span>
      </el-menu-item>
      <el-menu-item index="/teacher" >
        <i class="el-icon-document"></i>
        <span slot="title">老师</span>
      </el-menu-item>
      <el-menu-item index="/course">
        <i class="el-icon-setting"></i>
        <span slot="title">学院</span>
      </el-menu-item>
      <el-menu-item index="/course">
        <i class="el-icon-setting"></i>
        <span slot="title">选课信息</span>
      </el-menu-item>
      <el-menu-item index="/course">
        <i class="el-icon-setting"></i>
        <span slot="title">选课</span>
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
    width: 70%;
    line-height: 50px;
    height:50px;
    font-size: 35px;
    text-align: center;
}
.el-header{
    background-color: #373d41;
}
</style>