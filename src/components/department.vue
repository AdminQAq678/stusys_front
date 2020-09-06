<template>
<div>
    <el-card>
        <el-row>
            <el-button type="primary">添加学院信息</el-button>
        </el-row>

        <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      prop="dno"
      label="学号"
      width="180">
    </el-table-column>
    <el-table-column
      prop="dname"
      label="系名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="dmanagerno"
      label="系主任">
    </el-table-column>
    
    <el-table-column
      
      label="操作">
      <template slot-scope="scope">
          <el-button size="mini" class="el-icon-edit">编辑</el-button>
          <el-button size="mini" class="el-icon-delete">删除</el-button>
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
        const {data:res}= await this.$http.get('findAllDep');
        console.log(res)
        this.tableData=res;
        }
      
    }
  }
</script>