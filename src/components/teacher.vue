<template>
<div>
    <el-card>
        <el-row>
            <el-button type="primary" @click="ShowAddTeaDialog">添加教师信息</el-button>
        </el-row>

        <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      prop="tno"
      label="教工号"
      >
    </el-table-column>
    <el-table-column
      prop="tname"
      label="姓名"
      >
    </el-table-column>
    
     <el-table-column
      prop="tsex"
      label="性别">
    </el-table-column>
    <el-table-column
      prop="tage"
      label="年龄">
    </el-table-column>
     <el-table-column
      prop="teb"
      label="学历">
    </el-table-column>
    <el-table-column
      prop="tpt"
      label="职称">
    </el-table-column>
    <el-table-column
      prop="cno1"
      label="主讲课程1">
    </el-table-column>
    <el-table-column
      prop="cno2"
      label="主讲课程2">
     
    </el-table-column>
     <el-table-column
      prop="cno3"
      label="主讲课程3">
    </el-table-column>
    <el-table-column
      width="180"
      label="操作">
      <template slot-scope="scope">
      <el-button size="mini" class="el-icon-edit" type="primary">编辑</el-button>
          <el-button size="mini" class="el-icon-delete" type="danger" @click="delTea(scope)">删除</el-button>
       
      </template>
    </el-table-column>
  </el-table>
    </el-card>


      <!-- 添加教师信息对话框 -->
<el-dialog
  title="添加教师信息"
  :visible.sync="addTeaDialogVisible"
  width="50%"
 >
<el-form ref="form" :model="form" label-width="120px">
  <el-form-item  required label="教工号">
    <el-input  v-model="form.tno"></el-input>
  </el-form-item>
   <el-form-item required label="姓名">
    <el-input v-model="form.tname"></el-input>
  </el-form-item>
   <el-form-item label="年龄">
    <el-input v-model="form.tage"></el-input>
  </el-form-item>
   <el-form-item required label="性别">
      <el-radio v-model="form.tsex" label="男">男</el-radio>
  <el-radio v-model="form.tsex" label="女">女</el-radio>
  
  </el-form-item>
   <el-form-item required label="学历">
    <el-input v-model="form.teb"></el-input>
  </el-form-item>
  <el-form-item required label="职称">
    <el-input v-model="form.tpt"></el-input>
  </el-form-item>
  <el-form-item label="主讲课程一">
    <el-input v-model="form.cno1"></el-input>
  </el-form-item>
  <el-form-item label="主讲课程二">
    <el-input v-model="form.cno2"></el-input>
  </el-form-item>
  <el-form-item label="主讲课程三">
    <el-input v-model="form.cno3"></el-input>
  </el-form-item>

</el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="addTeaDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addTea">确 定</el-button>
  </span>
</el-dialog>
</div>
  
</template>

<script>
  export default {
    data() {
      return {
        tableData: [],
        addTeaDialogVisible:false,
        form:{
          tno:'',
          tname:'',
          tage:'',
          tsex:'男',
          tpt:'',
          teb:'',
          cno1:'',
          cno2:'',
          cno3:''
        }
      }
    },
    mounted:function(){
        this.getAllTea();
    },
    methods:{
         //解构重新命名
        async getAllTea(){
        const {data:res}= await this.$http.get('findAllTea');
        console.log(res)
        this.tableData=res;
        },
        //显示添加学生信息对话框
        ShowAddTeaDialog:function(){
          this.addTeaDialogVisible=true;
          
        },
        //发送教师信息到服务器
        addTea:async function(){
          console.log('form',this.form)
          let tem=this.form;
          //post 传的对象直接传就好，不需要加名称否则后台接收不到
          this.$http.post('teacher',
           this.form
          
          ).then((Response)=>{
            console.log(Response.data);
            this.getAllTea();
            this.addTeaDialogVisible=false;
          })
          .catch((err)=>{
            console.log(err)
          })
        },
         delTea:function(scope){

          console.log('scope',scope.row)
           this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log(scope.row)
          this.$http.delete('teacher/'+scope.row.tno).then((Response)=>{
                if(Response.data){
                  
                  this.$message({
                  type: 'success',
                  message: '删除成功!'
              });
              this.getAllTea();
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