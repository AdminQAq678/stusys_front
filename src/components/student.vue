<template>
<div>
    <el-card>
        <rl-row>
            <el-button type="primary">添加学生</el-button>
        </rl-row>

        <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      prop="sno"
      label="学号"
      width="180">
    </el-table-column>
    <el-table-column
      prop="sname"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="sage"
      label="地址">
    </el-table-column>
     <el-table-column
      prop="ssex"
      label="性别">
    </el-table-column>
     <el-table-column
      prop="sdept"
      label="系别">
    </el-table-column>
    <el-table-column
      
      label="操作">
      <template slot-scope="scope">
          <el-button size="mini" class="el-icon-edit">编辑</el-button>
          <el-button size="mini" class="el-icon-delete">删除</el-button>
          <el-button size="mini" class="el-icon-edit">更新</el-button>
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
        const {data:res}= await this.$http.get('findAllStu');
        console.log(res)
        this.tableData=res;
        }
      
    }
  }
</script>