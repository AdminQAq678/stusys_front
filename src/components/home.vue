<template>
    <div id="home">
        <el-container>
    <el-header>
        <div class="head">
            <span>wocnz</span>
            <span>学生选课管理系统</span>
            <span id="welcomeMsg">你好！<b style="color:red">{{uid}}</b></span>
                <img  @mouseenter="hover=true"
                  @mouseleave="hover=false"
                  id="headimg" :src="imageUrl">
            <!-- <el-button @click="logout" size="medium" type="primary">登出</el-button> -->
                <div 
                @mouseenter="hover=true"
                @mouseleave="hover=false"
                v-if="hover" class="option">
                  <ul>
                    <li @click="goUserinfoPage">个人中心</li>
                    <li @click="goChgpasswdPage">修改密码</li>
                    <li @click="logout">退出登录</li>
                  </ul>
                </div>
            
          
        </div>
        
        
        </el-header>
    <el-container>
    <el-aside width="200px">
      
  
    <el-menu
      :default-active="router_index"
    :router="true"
     background-color="#545c64"
   
     
     
      >
     
       <el-menu-item   v-for="(item,index) in menuList " :key="item" :index="item" @click="setActiveIndex('/'+'student')" v-if="index%3==0">
          <i :class="menuList[index+1]"></i>
        <span slot="title">{{menuList[index+2]}}</span>
      </el-menu-item>


      <!-- <el-menu-item   index="/student" @click="setActiveIndex('/'+'student')">
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
        <i class="iconfont icon-_huabanfuben"></i>
        <span slot="title">课程信息</span>
      </el-menu-item>
      <el-menu-item index="/selectCourse" @click="setActiveIndex('/'+'selectCourse')">
        <i class="iconfont icon-xuanke"></i>
        <span slot="title">学生选课</span>
      </el-menu-item>
      <el-menu-item index="/teascourses" @click="setActiveIndex('/'+'teascourses')">
        <i class="iconfont icon-class"></i>
        <span slot="title">我的授课</span>
      </el-menu-item> -->
     

      

    </el-menu>


      </el-aside>
      <el-main>    <router-view></router-view></el-main>
    </el-container>
    </el-container>

    </div>
</template>

<script>
import router from '../router/index'
export default {
    data(){
      return {
        hover:false,
        router_index:'student',
        uid:'',
        menuList:[],
        imageUrl:''
      }
    },

    created(){
      // 获取用户名
      this.uid=window.sessionStorage.getItem("uid");
      //获得左侧菜单的显示内容
      this.getMenuList();
      this.imageUrl=`http://localhost/getHeadImage?uid=${this.uid}`

      //console.log(this.router_index,"router")
      this.router_index=window.sessionStorage.getItem("router_index")
    },
    methods:{
      setActiveIndex:function(index){
        this.router_index=index;
				//保持高亮状态效果
				window.sessionStorage.setItem("router_index",index);
      },
      logout:function(){
        window.sessionStorage.clear();
        window.location.href="/"
      },
      goChgpasswdPage:function(){
      this.$router.push("chgpasswd")
      },
      goUserinfoPage:function(){
      this.$router.push("userinfo")
      },
      //获得菜单列表的显示
      getMenuList:async function(){
          
          const {data:res}= await this.$http.post(`getMenuList?uid=${this.uid}`)
          console.log(res);
          this.menuList=res
      }
     
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
.head{
  position: relative;
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
.head span:nth-child(2){
    display: inline-block;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    width: 70%;
    line-height: 50px;
    height:50px;
    font-size: 35px;
    text-align: center;
}

.imgBox{
  
}

#headimg{
  position:absolute;
  right:35px;
  width: 40px;
  height: 40px;
  outline: none;
  border-radius: 50%;
  transform: translate(50%,25%);
  cursor: pointer;
}
#welcomeMsg{
    position: relative;
    display: inline-block;
    right: 10px;
    
}


.option{
  right: 5px;
  transform: translate(0,-6px);
  z-index: 3;
  border-radius: 4px;
 
  background: cornsilk;
  position:absolute;
  box-sizing: border-box;
}
.option ul li:hover{
  color:  rgb(3, 250, 217);
  font-size: 110%;
  cursor: pointer;
}

.option ul li{
   list-style: none;
}
.option ul{
  padding: 0 20px;
}




.el-header{
    background-color: #373d41;
}
.iconfont{
  font-size: 20px;
  margin-right: 5px;
}
</style>