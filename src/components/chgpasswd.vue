<template>
    <div>
       
         <el-button type="info" round @click="goback">返回上一级</el-button>
        <el-row>
            修改密码
        </el-row>
        <el-input v-model="prePasswd" placeholder="请输入旧密码"> 

        </el-input>
        <el-input v-model="newPasswd" placeholder="请输入新密码"> 

        </el-input>
        <el-button @click="chgpasswd">
            修改密码
        </el-button>
    </div>
</template>


<style scoped>

</style>


<script>
export default {
    data(){
        return {
            id:'',
            prePasswd:'', //旧密码
            newPasswd:''   //新密码
        }
    },
    methods:{
        chgpasswd:async function(){
            let uid=window.sessionStorage.getItem("uid");
            console.log("用户id",window.sessionStorage.getItem("uid"))
            const {data:res}= await this.$http.post(`stu/chgpasswd?uid=${uid}&prePasswd=${this.prePasswd}&newPasswd=${this.newPasswd}`)
            console.log(res);
            if(res===true){//修改密码成功
                 this.$message({
                    type: 'success',
                    message: '修改密码成功'
                });
                //一秒后跳转清除登录信息
               setTimeout(()=>{
                window.sessionStorage.clear();
                window.location.href="/"
               },1000)
                
            }else{
                    this.$message({
                    type: 'error',
                    message: '修改密码失败'
                });
            }
            
            
        },
        goback:function(){
            this.$router.go(-1);
        }
    }
}
</script>