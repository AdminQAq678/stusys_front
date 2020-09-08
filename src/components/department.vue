<template>
<div>
    <el-card>
        <el-row>
            <el-button type="primary" @click="ShowAddDepDialog">添加学院信息</el-button>
        </el-row>

        <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      prop="dno"
      label="系编号"
      >
    </el-table-column>
    <el-table-column
      prop="dname"
      label="系名"
      >
    </el-table-column>
    <el-table-column
      prop="dmanagerno"
      label="系主任">
    </el-table-column>
    
    <el-table-column
      width="180"
      label="操作">
      <template slot-scope="scope">
          <el-button size="mini" class="el-icon-edit" type="primary">编辑</el-button>
          <el-button size="mini" class="el-icon-delete" type="danger" @click="delDep(scope)">删除</el-button>
       </template>
    </el-table-column>
  </el-table>
    </el-card>


  <!-- 添加教师信息对话框 -->
<el-dialog
  title="添加教师信息"
  :visible.sync="addDepDialogVisible"
  width="50%"
 >
<el-form ref="form" :model="form" label-width="120px">
  <el-form-item  required label="系编号">
    <el-input  v-model="form.dno"></el-input>
  </el-form-item>
   <el-form-item required label="系名">
    <el-input v-model="form.dname"></el-input>
  </el-form-item>
   <el-form-item label="系主任">
    <el-input v-model="form.dmanagerno"></el-input>
  </el-form-item>
  
 

</el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="addDepDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addDep">确 定</el-button>
  </span>
</el-dialog>
</div>
  
</template>

<script>
  export default {
    data() {
      return {
        tableData: [],
        addDepDialogVisible:false,
        form:{
          dno:'',
          dname:'',
          dmanagerno:''
        }
      }
    },
    mounted:function(){
        this.getAllDep();
    },
    methods:{
         //解构重新命名
        async getAllDep(){
        const {data:res}= await this.$http.get('findAllDep');
        console.log(res)
        this.tableData=res;
        },
         ShowAddDepDialog:function(){
          this.addDepDialogVisible=true;
          
        },
        //发送学生信息到服务器
        addDep: function(){
          console.log(this.form)
          let tem=this.form;
          //post 传的对象直接传就好，不需要加名称否则后台接收不到
          this.$http.post('department',
           this.form
          
          ).then((Response)=>{
            console.log(Response.data);
            this.getAllDep();
            this.addDepDialogVisible=false;
          })
          .catch((err)=>{
            console.log(err)
          })
        },
         delDep:function(scope){

          console.log('scope',scope.row)
           this.$confirm('此操作将永久删除该学院信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log(scope.row)
          this.$http.delete('department/'+scope.row.dno).then((Response)=>{
                if(Response.data){
                  
                  this.$message({
                  type: 'success',
                  message: '删除成功!'
              });
              this.getAllDep();
            }
            else{
              this.$message({
                  type: 'error',
                  message: '删除失败!'
              });
            }
          });

          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
        }
      
    }
  }
</script>