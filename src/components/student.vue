<template>
<div>
    <el-card>
        <el-row >
          <el-col >
            <el-button @click="ShowAddStuDialog" type="primary">添加学生信息 </el-button>
          
         
            <el-button @click="showAddStuByFileDialog" type="warning">导入学生信息 </el-button>
      
        
            <el-button @click="downloadStu" type="success">下载学生信息 </el-button>
            <el-button @click="delSelected" type="danger">删除选中 </el-button>
            </el-col>
         
          
            
        </el-row>
        <el-row>
          <el-col :span="3">
          <el-input
            placeholder="学号"
            prefix-icon="el-icon-search"
            v-model="searchInfo.id">
          </el-input>
          
            </el-col >

             <el-col :span="3">
          <el-input
            placeholder="姓名"
            prefix-icon="el-icon-search"
            v-model="searchInfo.name">
          </el-input>
          
            </el-col >


             <el-col :span="3">
          <el-input
            placeholder="系别"
            prefix-icon="el-icon-search"
            v-model="searchInfo.dep">
          </el-input>
          
            </el-col >


            <el-col :span="2">
            <el-button @click="getStuList">
            搜索
          </el-button>
            </el-col>
        </el-row>

        <el-table
    :data="tableData"
    border
    @selection-change="handleSelectionChange"
    style="width: 100%">

    <el-table-column
    type="selection"
    
    v-model="tableSection"
    >


    </el-table-column>
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
      width="180"
      label="操作">
      <template slot-scope="scope">
          <el-button size="mini" class="el-icon-edit" type="primary" @click="showEditStuDialog(scope)">编辑</el-button>
          <el-button size="mini" class="el-icon-delete" type="danger" @click="delStu(scope)">删除</el-button>
        </template>
    </el-table-column>
  </el-table>
  <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[1, 3, 6, 10]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount">
    </el-pagination>
    </el-card>

    <!-- 添加学生信息对话框 -->
<el-dialog
  title="添加学生信息"
  :visible.sync="addStuDialogVisible"
   @close="addFormReset"
  width="50%"
 >
<el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="学号" prop="sno">
    <el-input v-model="form.sno"  ></el-input>
  </el-form-item>
   <el-form-item label="姓名" prop="sname">
    <el-input v-model="form.sname" ></el-input>
  </el-form-item>
   <el-form-item label="年龄" prop="sage">
    <el-input v-model="form.sage" ></el-input>
  </el-form-item>
   <el-form-item label="密码" prop="passwd">
    <el-input v-model="form.passwd" ></el-input>
  </el-form-item>
   <el-form-item label="性别" prop="ssex">

     <el-radio v-model="form.ssex" label="男">男</el-radio>
  <el-radio v-model="form.ssex" label="女">女</el-radio>
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

    <!-- 编辑学生信息对话框 -->
<el-dialog
  title="修改学生信息"
  :visible.sync="editStuDialogVisible"

  width="50%"
 >
<el-form ref="editform" :model="editform" label-width="80px">
  <el-form-item label="学号">
    <el-input v-model="editform.sno"></el-input>
  </el-form-item>
   <el-form-item label="姓名">
    <el-input v-model="editform.sname"></el-input>
  </el-form-item>
   <el-form-item label="年龄">
    <el-input v-model="editform.sage"></el-input>
  </el-form-item>
   <el-form-item label="性别">

     <el-radio v-model="editform.ssex" label="男">男</el-radio>
  <el-radio v-model="editform.ssex" label="女">女</el-radio>
  </el-form-item>
   <el-form-item label="系别">
       <el-select v-model="editform.sdept" placeholder="请选择">
        <el-option
          v-for="item in depList"
          :key="item.dno"
          :label="item.dname"
          :value="item.dname">
        </el-option>
      </el-select>
  
   
  </el-form-item>
  
</el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="editStuDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="editStu">确 定</el-button>
  </span>
</el-dialog>



<!-- 导入学生信息对话框 -->
<el-dialog
  title="导入学生信息"
  :visible.sync="addStuByFileuDialogVisible"
  width="50%"
 >

 <el-upload
 ref="upload"
  class="upload-demo"
  drag
  action="http://localhost/addStuByFile"
  multiple>
  <i class="el-icon-upload"></i>
  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
  <div class="el-upload__tip" slot="tip">只能上传txt文件，拖拽到此立即上传</div>
</el-upload>

</el-dialog>

</div>
  
</template>

<script>
  export default {
    data() {
      return {
        //学生信息数据
        tableData: [],
        //添加学生对话框
        addStuDialogVisible:false,
        //编辑学生对话框  
        editStuDialogVisible:false,
        //文件导入学生信息对话框
        addStuByFileuDialogVisible:false,
        //添加学生对话框数据
        form:{
          sno:'',
          sname:'',
          sage:'',
          ssex:'男',
          sdept:'',
          passwd:''
        },
        //编辑学生信息表单
        editform:{
          sno:'',
          sname:'',
          sage:'',
          ssex:'',
          sdept:'',
          passwd:''
        },
        depList:[],
        //学生信息
        stuList:[],
        //当前页码
        currentPage:1,
        //每页显示的记录数
        pageSize:10,
        totalCount:0,
        //总记录数
        searchInfo:{
          id:'',
          name:'',
          dep:''
        },

        tableSection:[]

      }
    },
    created:function(){
        this.getStuList();
        this.getAllDep();
    },
    methods:{

      delSelected:async function(){
        if(this.tableSection.length==0){
             this.$message({
                  type: 'info',
                  message: '请选择要删除的用户!'
              });
          return;
        }
        console.log(this.tableSection)
        const {data:res}= await this.$http.post("delStudentByList",this.tableSection)
          this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          
          this.$http.post("delStudentByList",this.tableSection).then((Response)=>{
                if(Response.data){
                  this.$message({
                  type: 'success',
                  message: '删除成功!'
              });
              this.getStuList();
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



       
      },
      handleSelectionChange:function(val){
        this.tableSection=val;
       
      },

       handleSizeChange(val) {
         this.pageSize=val;
          this.getStuList();
       
       
      },
      async handleCurrentChange(val) {
        this.currentPage=val;
       this.getStuList();
        console.log(`当前页: ${val}`);
      },
      //分页查询
      getStuList:async function(){
         const {data:res}= await this.$http.get(`findStudentByCon?currentPage=${this.currentPage}&pageSize=${this.pageSize}&name=${this.searchInfo.name}&id=${this.searchInfo.id}&dep=${this.searchInfo.dep}`);
        // console.log('查询到的数据',res)
        this.tableData=res.data;
        this.totalCount=res.totalCount;
      },
        async getAllDep(){
        const {data:res}= await this.$http.get('findAllDep');
       
        this.depList=res;
        console.log(res)
        },
    
         //解构重新命名
        async getAllStu(){
        const {data:res}= await this.$http.get('findAllStu');
        // console.log(res)
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
            this.getStuList();
            this.addStuDialogVisible=false;
            this.$refs.form.resetFields();
          })
          .catch((err)=>{
            console.log(err)
          })
        },
        delStu:function(scope){

          console.log('scope',scope.row)
           this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
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
              this.getStuList();
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
        },

        showEditStuDialog:function(scope){
          this.editStuDialogVisible=true;
          this.editform=scope.row;
          console.log(this.editform)
        },
        //发送编辑后的学生信息到后台
        editStu: async function(){
          
          this.editStuDialogVisible=false;
          const {data:res}= await this.$http.put(`student/${this.editform.sno}`,this.editform);
         console.log(typeof res)
         console.log( res)
         if(res!=null&&res!=""){
           this.$message({
                  type: 'success',
                  message: '更新学生信息成功!'
              });
         }else{
           this.$message({
                  type: 'error',
                  message: '更新学生信息失败!'
              });
              this.getStuList();
         }
        },
        addFormReset:function(){
          this.$refs.form.resetFields();
        },
        //显示文件导入学生信息对话框
        showAddStuByFileDialog:function(){
          this.addStuByFileuDialogVisible=true;
        },

        addStuByFile:function(){
          
        },
        //上传文件
        submitUpload() {
        this.$refs.upload.submit();
        },
        downloadStu:function(){
          alert("ok")
          // window.location.href="http://www.wocnz.club:80/download"
          window.location.href="http://localhost:80/download"
        },
        //根据学号或者姓名或者系别进行搜索
        search:async function(){
          // this.$http.post("",this.searchInfo,(err,data)=>{
          //   console.log(err,data)
          // })
          const {data:res}= await this.$http.post("stu/searchStu",this.searchInfo)
          console.log(res);
          this.tableData=res;
        }

        

        

        
      
    }
  }
</script>