<template>
  <div class="container">
    <h2 >欢迎使用学生选课系统</h2>
    <h3>使用说明</h3>
    <p>本系统用户分学生用户、老师用户、以及管理员用户</p>
    <h4>权限说明</h4>
    <ul>
        <li>学生用户可以进行查看课程以及选课</li>
        <li>教师用户可以进行课程的添加</li>
        <li>管理员用户拥有添加学生用户、添加教师用户、添加课程等全部权限</li>
        <li>用户可进行上传头像、修改密码等操作</li>
    </ul>
   
     
    <h4>用户编号分别使用'stu_'、'tea_'、'admin_'等前缀进行标识</h4> 


  </div>
</template>
<script>
export default {
  components: {},
  props: [],
  data() {
    return {
      formData: {
        field102: undefined,
      },
      rules: {
        field102: [{
          required: true,
          message: '请输入单行文本',
          trigger: 'blur'
        }],
      },
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    submitForm() {
      this.$refs['elForm'].validate(valid => {
        if (!valid) return
        // TODO 提交表单
      })
    },
    resetForm() {
      this.$refs['elForm'].resetFields()
    },
  }
}

</script>
<style scoped>
.container{
    border-radius: 5px;;
    padding: 10px;
    height: 95%;
background: #8e9eab;  /* fallback for old browsers */
background: -webkit-linear-gradient(to right, #eef2f3, #8e9eab);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to right, #eef2f3, #8e9eab); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

}
</style>
