<template>
<div id="loginBox">
    <div id="top">

    </div>
    <div class="left">
        <span>欢迎登录学生选课系统</span>
    </div>
    <div class="right">
        <form action="login" method="post"
        >
            <input type="button" value="学生登录">
            <input type="button" value="教师登录"><br>
            学号<input type="text"><br>
            密码<input type="password"><br>
            <input type="submit" value="登录">
        </form>
    </div>
</div>    
</template>

<script>
export default {
    
}
</script>

<style scoped>
#loginBox{
    height: 100%;
}
.left{
    float: left;
    width: 70%;
    height: 80%;
    background-color: pink;
    position: relative;
    background: url(http://pic.netbian.com/uploads/allimg/200807/130317-15967765979e98.jpg) no-repeat center;
}
.right{
    float: left;
    width: 30%;
    height: 80%;
    background-color: orange;
}
.left span{
    font-size: 50px;
    display: inline-block;
    margin: 0 auto;
    position:absolute;
    top: 50%;
    left: 50%;
    font-family: "Comic Sans MS", cursive, sans-serif;
    transform: translate(-50%,-50%);
}
.right form{
    width: 50%;
    margin: 30% auto;
}
#top{
    width: 100%;
    height: 100px;
    background-color: powderblue;
}
</style>