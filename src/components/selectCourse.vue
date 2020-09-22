

<template>
<!-- 学生可选课程的展示 -->
<div>
    <el-card>
        

        <el-table
    :data="tableData"
    border
    style="width: 100%">
    
   
    <el-table-column
      prop="cno"
      label="课程号"
    >
    </el-table-column>
    <el-table-column
      prop="cname"
      label="课程名"
    >
    </el-table-column>
    <el-table-column
      prop="tno"
      label="教工号">
    </el-table-column>
     <el-table-column
      prop="tname"
      label="教师名称">
    </el-table-column>
     <el-table-column
      prop="cpno"
      label="先行课程编号">
    </el-table-column>
     <el-table-column
      prop="ccredit"
      label="学分">
    </el-table-column>
    <el-table-column
      width="180"
      label="操作">
      <template slot-scope="scope">
         <!-- <el-switch
         @change="chageCourseState(scope)"
          v-model="value"
          active-color="#13ce66"
          inactive-color="#ff4949">
        </el-switch> -->
        <el-button size="mini" type="primary" @click="addCourse(scope)">选课</el-button>
        <el-button size="mini" type="danger" @click="delCourse(scope)">退课</el-button>
      </template>
    </el-table-column>
  </el-table>
    </el-card>

</div>
  
</template>

<script>
  export default {
    data() {
      return {
        tableData: [],
        value:true,
        sctData:{
          cno:'',
          tno:'',
          tno:'',
          grade:''
        }
      }
    },
    mounted:function(){
        this.getAllClassInfo();
    },
    methods:{
         //解构重新命名
        async getAllClassInfo(){
        const {data:res}= await this.$http.get('findStuTeasCourse');
        console.log(res)
        this.tableData=res;
        },
        addCourse:async function(scope){
        
        this.sctData.cno=scope.row.cno;
        this.sctData.tno=scope.row.tno;
        this.sctData.sno=234;
        //添加选课信息到sct表
        const {data:res}=await this.$http.post('addToSct',this.sctData)
        if(res==false){
          this.$message({
                  type: 'error',
                  message: '选课失败!'
              });
        }else{
          this.$message({
                  type: 'success',
                  message: '选课成功!'
              });
        }
        },
        delCourse:async function(scope){
        
        this.sctData.cno=scope.row.cno;
        this.sctData.tno=scope.row.tno;
        this.sctData.sno=234;
        //添加选课信息到sct表
        const {data:res}=await this.$http.post('delSct',this.sctData)
        if(res==false){
          this.$message({
                  type: 'error',
                  message: '退课失败!'
              });
        }else{
          this.$message({
                  type: 'success',
                  message: '退课成功!'
              });
        }
        }
      
    }
  }
</script>