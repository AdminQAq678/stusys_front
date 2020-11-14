<template>
	<div>
        
<div class="header" id="head">
  <!--<div class="title">Course selection system</div>-->
	
</div> 
	
<div class="wrap" id="wrap">
	<div class="girl"></div>
	<div class="logGet"  >
			
			<div class="logD logDtip">
				<p class="p1">Login</p>
			</div>
		
			<div class="lgD">
				<img src="../assets/images/user.png" width="20" height="20" alt=""/>
				<input v-model="username" id="username" type="text" style="border:0px;background:none;color:#ffffff;" placeholder="Please enter user" />
			</div>
			<div class="lgD">
				<img src="../assets/images/password.png" width="20" height="20" alt=""/>
				<input v-model="password" id="password" type="password" style="border:0px;background:none;color:#ffffff;" placeholder="Please enter password" />
			</div>
			<div class="logC">
				<a href="javascript:void(0);" target="_self"><button id="enter"  @click="login">Enter</button></a>
			</div>

			<div class="logC">
				<a href="javascript:void(0);" target="_self"><button id="forgotpwd">Forgeted password？</button></a>
			</div>



		</div>
</div>

    </div>
	
	


</template>


<style scoped>
	*{
		margin: 0;
		padding: 0;
	}
	#wrap {
		background: url("../assets/images/background.jpg") no-repeat;
		height: 100%;
		width: 100%;
		background-size: cover;
		position: absolute;
		overflow: hidden;
	
		
		
	}
	
	
	#wrap .logGet {
		height: 408px;
		width: 368px;  
		position: absolute;
		top: 20%;
		right: 5%;
		box-shadow:1px 1px 3px 3px #ffffff
	}
	
	
	.logC a button {
		width: 100%;
		height: 45px;
		background: url("../assets/images/button.png");
		border: none;
		color: white;
		font-size: 18px;
		box-shadow:1px 1px 3px 3px #ffffff
	}
	.logGet .logD.logDtip .p1 {
		display: inline-block;
		font-size: 28px;
		color: #ffffff;
		margin-top: 30px;
		width: 86%;
		
	}
	#wrap .logGet .logD.logDtip {
		width: 86%;
		margin-bottom: 60px;
		margin-top: 0px;
		margin-right: auto;
		margin-left: auto;
	}
	.logGet .lgD img {
		position: absolute;
		top: 12px;
		left: 8px;
	}
	.logGet .lgD input {
		width: 100%;
		height: 42px;
		text-indent: 2.5rem;
	}
	#wrap .logGet .lgD {
		width: 86%;
		position: relative;
		margin-bottom: 30px;
		margin-top: 30px;
		margin-right: auto;
		margin-left: auto;
		box-shadow:1px 1px 3px 3px #ffffff;
		
	}
	#wrap .logGet .logC {
		width: 86%;
		margin-top: 0px;
		margin-right: auto;
		margin-bottom: 10px;
		margin-left: auto;
	}
	
	
	.title {
		font-family: "黑体";
		color: #ffffff;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);  
		font-size: 50px;
		height: 40px;
		width: 70%;
	}
</style>


<script>
import $ from "jquery" 
window.onload=function(){
			
		}
		
export default {
    data(){
        return {
            username:'234',
            password:'234'
        }
    },
    methods:{
        login:function(){
            console.log(this.username,this.password)
				$.post("http://localhost/login",{userno:this.username,passwd:this.password},function(data,status){
				// alert("数据: " + data + "\n状态: " + status);
				// console.log(data)
				// console.log(status)
					const result=JSON.parse(data);
					console.log(result)
					if (result.status==200){
						window.sessionStorage.setItem("token",result.token)
						window.sessionStorage.setItem("uid",result.username)
						window.location.href="/";
					}else if(result.status==401){
						alert("无该用户，请联系管理员注册!")
					}else if(result.status==402){
						alert("用户名或者密码输入错误，请重新输入!")
					}

			  });
        }
    }
}
</script>