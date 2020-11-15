<template>
<div>
    <el-card>
        <el-row>
            <el-button type="primary">添加课程信息</el-button>
        </el-row>

        <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      prop="sno"
      label="学号"
    >
    </el-table-column>
    <el-table-column
      prop="sname"
      label="学生姓名"
    >
    </el-table-column>
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
      prop="grade"
      label="课程成绩">
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
        uid:''
      }
    },
    mounted:function(){
       
        this.uid=window.sessionStorage.getItem("uid")
         this.findClInfosBySno();
        console.log("用户id++++",this.uid)
    },
    methods:{
         //解构重新命名
        async findClInfosBySno(){
        
        const {data:res}= await this.$http.get(`findClInfosBySno?sno=${this.uid}`);
        this.tableData=res;
        // console.log("idnexof",this.uid.indexOf("admin"));
        if(this.uid.indexOf("admin")!=-1){
          var result = await this.$http.get(`findAllClInfo`);
          console.log("data",result.data)
          this.tableData=result.data;
        }
        console.log(res)
        
        },
        
      
      
    }
  }
</script>