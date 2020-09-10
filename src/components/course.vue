<template>
<div>
    <el-card>
        <el-row>
            <el-button type="primary">选课</el-button>
        </el-row>

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
      prop="cpno"
      label="先行课程编号"
    >
    </el-table-column>
    <el-table-column
      prop="ccredit"
      label="学分"
    >
    </el-table-column>
    <el-table-column
      width="180"
      label="操作">
      <template slot-scope="scope">
          <el-button size="mini" class="el-icon-edit" type="primary">选课</el-button>
          <el-button size="mini" class="el-icon-delete" type="danger">退课</el-button>
       
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
        tableData: []
      }
    },
    mounted:function(){
        this.getAllStu();
    },
    methods:{
         //解构重新命名
        async getAllStu(){
        const {data:res}= await this.$http.get('findAllCou');
        console.log(res)
        this.tableData=res;
        }
      
    }
  }
</script>