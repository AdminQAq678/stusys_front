<template>
<div>
    <el-card>
        <el-row>
            <el-button @click="ShowAddCouDialog" type="primary">添加授课信息 </el-button>
        </el-row>

        <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      prop="cno"
      label="课程号"
      width="">
    </el-table-column>
    <el-table-column
      prop="tno"
      label="教师编号"
      width="">
    </el-table-column>
    
     
    <el-table-column
      width="180"
      label="操作">
      <template slot-scope="scope">
          <el-button size="mini" class="el-icon-edit" type="primary" @click="showEditCouDialog(scope)">编辑</el-button>
          <el-button size="mini" class="el-icon-delete" type="danger" @click="delCou(scope)">删除</el-button>
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
  title="添加授课信息"
  :visible.sync="addCouDialogVisible"
   @close="addFormReset"
  width="50%"
 >
 <el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="教师名称"  prop="tno"> 
 <el-select v-model="form.tno" placeholder="请选择">
        <el-option
          v-for="item in teaList"
          :key="item.tno"
          :label="item.tname"
          :value="item.tno">
           <span style="float: left">{{ item.tno }}</span>
      <span style="float: right; color: #8492a6; font-size: 13px">{{ item.tname }}</span>
        </el-option>
  </el-select>
  </el-form-item>
<el-form-item label="课程号"  prop="cno"> 
 <el-select v-model="form.cno" placeholder="请选择">
        <el-option
          v-for="item in couList"
          :key="item.cno"
          :label="item.cname"
          :value="item.cno">
           <span style="float: left">{{ item.cno }}</span>
      <span style="float: right; color: #8492a6; font-size: 13px">{{ item.cname }}</span>
        </el-option>
        
         
  </el-select>
  </el-form-item>
  
   
 </el-form>

  <span slot="footer" class="dialog-footer">
  
    <el-button @click="addCouDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addCou">确 定</el-button>
  </span>
</el-dialog>

    <!-- 编辑学生信息对话框 -->
<el-dialog
  title="修改授课信息"
  :visible.sync="editCouDialogVisible"
  width="50%"
 >
<el-form ref="editform" :model="editform" label-width="80px">
    <el-form-item label="教师名称"  prop="tno"> 
 <el-select v-model="editform.tno" placeholder="请选择">
        <el-option
          v-for="item in teaList"
          :key="item.tno"
          :label="item.tname"
          :value="item.tno">
           <span style="float: left">{{ item.tno }}</span>
      <span style="float: right; color: #8492a6; font-size: 13px">{{ item.tname }}</span>
        </el-option>
  </el-select>
  </el-form-item>
<el-form-item label="课程号"  prop="cno"> 
 <el-select v-model="editform.cno" placeholder="请选择">
        <el-option
          v-for="item in couList"
          :key="item.cno"
          :label="item.cname"
          :value="item.cno">
           <span style="float: left">{{ item.cno }}</span>
      <span style="float: right; color: #8492a6; font-size: 13px">{{ item.cname }}</span>
        </el-option>
        
         
  </el-select>
  </el-form-item>
  
  
</el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="editCouDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="editCou">确 定</el-button>
  </span>
</el-dialog>

</div>
  
</template>

<script>
  export default {
    data() {
      return {
        //授课信息数据
        tableData: [],
        //添加授课信息对话框
        addCouDialogVisible:false,
        //编辑授课信息对话框  
        editCouDialogVisible:false,
        //添加授课信息对话框数据
        form:{
          cno:'',
         
          tno:''
         
        },
        //编辑学生信息表单
        editform:{
          cno:'',
         
          tno:''
        },

        //当前编辑的授课信息
        currentEditRow:{
          tno:'',
          cno:''
        },
        depList:[],
        //学生信息
        couList:[],
        //当前页码
        currentPage:1,
        //每页显示的记录数
        pageSize:10,
        totalCount:0,
        //总记录数
        currentUser:'',
        teaList:[]
      }
    },
    created:function(){
        this.getCouList();
        this.getAllDep();
    },
    methods:{

       handleSizeChange(val) {
         this.pageSize=val;
          this.getCouList();
       
       
      },
      async handleCurrentChange(val) {
        this.currentPage=val;
       this.getCouList();
        console.log(`当前页: ${val}`);
      },

      getCouList:async function(){
         const {data:res}= await this.$http.get(`findTscByCon?currentPage=${this.currentPage}&pageSize=${this.pageSize}`);
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
        async getAllCou(){
        const {data:res}= await this.$http.get('findAllCou');
        // console.log(res)
        this.couList=res;
        },
        //显示添加学生信息对话框
        ShowAddCouDialog:function(){
         
          this.addCouDialogVisible=true;
          this.getAllTea();
          this.getAllCou();
        },
        //发送授课信息到服务器
        addCou:async function(){
          console.log(this.form,'form')
          let tem=this.form;
          //post 传的对象直接传就好，不需要加名称否则后台接收不到
          this.$http.post('tsc',
           this.form
          
          ).then((Response)=>{
            console.log(Response.data);
            this.getCouList();
            this.addCouDialogVisible=false;
            this.$refs.form.resetFields();
          })
          .catch((err)=>{
            console.log(err)
          })
        },
        delCou:function(scope){

          console.log('scope',scope.row)
           this.$confirm('此操作将永久删除该授课信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          
          this.$http.delete('tsc/'+scope.row.cno,).then((Response)=>{
                if(Response.data){
                  this.$message({
                  type: 'success',
                  message: '删除成功!'
              });
              this.getCouList();
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

        showEditCouDialog:function(scope){
          this.currentEditRow.tno=scope.row.tno;
          this.currentEditRow.cno=scope.row.cno;
          this.editCouDialogVisible=true;
          this.editform=scope.row;
          this.getAllTea();
          this.getAllCou();
          console.log(this.editform)
        },
        //发送编辑后的学生信息到后台
        editCou: async function(){
          
          this.editCouDialogVisible=false;
          const {data:res}= await this.$http.put(`tsc/${this.currentEditRow.cno}`,this.editform);
         console.log(typeof res)
         console.log( res)
         if(res!=null&&res!=""){
           this.$message({
                  type: 'success',
                  message: '更新授课信息成功!'
              });
         }else{
           this.$message({
                  type: 'error',
                  message: '更新授课信息失败!'
              });
              this.getCouList();
         }
        },
        addFormReset:function(){
          this.$refs.form.resetFields();
        },
        async getAllTea(){
        const {data:res}= await this.$http.get('findAllTea');
        console.log(res)
        this.teaList=res;
        },

        
      
    }
  }
</script>