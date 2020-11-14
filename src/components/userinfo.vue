<template>
<div>
 <el-upload
  class="avatar-uploader"
  action="http://localhost/uploadImage"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload">
  <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
</div>


</template>


<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

<script>
  export default {
    data() {
      return {
        imageUrl: '',
        uid:''
      };
    },
    async created(){

        this.uid=window.sessionStorage.getItem("uid");
        this.imageUrl=`http://localhost/getHeadImage?uid=${this.uid}`
        


    },
    methods: {
      async handleAvatarSuccess(res, file) {

        this.imageUrl = URL.createObjectURL(file.raw);
        console.log("imageUrl",this.imageUrl)
        console.log("res",res)

        //保存用户id对应的图片路径到数据库
        let uid=this.uid;
        console.log()
        //这里传到后台的数据不能直接放在请求的url中，因为文件路径中会带有'\' 或者'/' 需要进行url编码
        //另一种解决办法是 传入json数据，后台再对json数据解析即可
        const {data:res1}=this.$http.post(`saveImageUrl?`,{"uid":uid,"imageUrl":res});
        console.log(res1)

      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    }
  }
</script>