<template>
<div>
    <el-card>
        <el-row>
            <el-button @click="ShowAddStuDialog" type="primary">添加学生信息 </el-button>
        </el-row>

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
      label="年龄">
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
          <el-button size="mini" class="el-icon-edit" type="primary">编辑</el-button>
          <el-button size="mini" class="el-icon-delete" type="danger" @click="delStu(scope)">删除</el-button>
        </template>
    </el-table-column>
  </el-table>
    </el-card>

    <!-- 添加学生信息对话框 -->
<el-dialog
  title="添加学生信息"
  :visible.sync="addStuDialogVisible"
  width="50%"
 >
<el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="学号">
    <el-input v-model="form.sno"></el-input>
  </el-form-item>
   <el-form-item label="姓名">
    <el-input v-model="form.sname"></el-input>
  </el-form-item>
   <el-form-item label="年龄">
    <el-input v-model="form.sage"></el-input>
  </el-form-item>
   <el-form-item label="性别">
    <el-input v-model="form.ssex"></el-input>
  </el-form-item>
   <el-form-item label="系别">
    <el-input v-model="form.sdept"></el-input>
  </el-form-item>
</el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="addStuDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addStu">确 定</el-button>
  </span>
</el-dialog>
</div>
  
</template>

<script>
  export default {
    data() {
      return {

        tableData: [],
        //添加学生对话框
        addStuDialogVisible:false,
        form:{
          sno:'',
          sname:'',
          sage:'',
          ssex:'',
          sdept:'',
        }
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
        },
        //显示添加学生信息对话框
        ShowAddStuDialog:function(){
          this.addStuDialogVisible=true;
          
        },
        //发送学生信息到服务器
        addStu:async function(){
          console.log(this.form)
          let tem=this.form;
          //post 传的对象直接传就好，不需要加名称否则后台接收不到
          this.$http.post('student',
           this.form
          
          ).then((Response)=>{
            console.log(Response.data);
            this.getAllStu();
            this.addStuDialogVisible=false;
          })
          .catch((err)=>{
            console.log(err)
          })
        },
        delStu:function(scope){

          console.log('scope',scope.row)
           this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          
          this.$http.delete('student/'+scope.row.sno,).then((Response)=>{
                if(Response.data){
                  this.$message({
                  type: 'success',
                  message: '删除成功!'
              });
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