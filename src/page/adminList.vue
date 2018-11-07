<template>
    <div class="fillcontain">
        <div class="table_container">
            <div style="display:flex;margin-bottom: 30px;">
                <el-button type="primary" @click="addadmin()">添加管理员</el-button>
                <div style="width:300px;margin-left:80%">
                    <!--<el-input-->
                    <!--placeholder="请输入完成的用户名或id"-->
                    <!--&gt;-->
                    <!--<i slot="suffix" style="width:5px;height:5px" class="el-input__icon el-icon-search"></i>-->
                    <!--</el-input>-->
                    <!--<el-input placeholder="请输入完成的用户名或id" v-model="input5" class="input-with-select">-->
                        <!--<el-button slot="append" icon="el-icon-delete"><i class="el-icon-search"></i></el-button>-->
                    <!--</el-input>-->
                </div>
            </div>
            <el-table
		      :data="adminList"
		      style="width: 100%">
		      <el-table-column
		        prop="adminName"
		        label="姓名"
		        min-width="100">
		      </el-table-column>
                <el-table-column
                    prop="ipAddress"
                    label="ip"
                    min-width="100">
                </el-table-column>
		      <el-table-column
		        prop="adminTypeName"
		        label="权限"
                min-width="100"
              >
		      </el-table-column>
                <el-table-column label="操作" min-width="100">
                    <template scope="scope">
                        <el-button @click="deleteAdmin(scope.row.id)">删除
                        </el-button>
                    </template>
                </el-table-column>

            </el-table>
            <div class="Pagination">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="nowPageSize"
                    :page-sizes="[5, 10, 20, 40]"
                    :total="txcount"
                    layout="total, sizes, prev, pager, next, jumper"
                >
                </el-pagination>
            </div>
            <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">
                <span>该信息将永久删除，确认删除此条信息？</span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="ensureDelete">确 定</el-button>
               </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {adminList, adminCount} from '@/api/getData'
    export default {
        data(){
            return {
                    adminList:[],
                    txcount: 0,
                    totalfees: 0,
                    currentPage: 1,
                     nowPageSize:10,
                    dialogVisible:false,
                    deleteId:'',
            }
        },
    	components: {
    		headTop,
    	},
        created(){
            this.getData()

        },
        methods: {
            hh(){
                let el=this.$refs.aaa;
                console.log(el)
            },
            getData () {
                this.$ajax.get(BaseUrl+'all'+'/'+this.currentPage+'/'+this.nowPageSize, {headers:{'token':sessionStorage.getItem('token')}}).then(response => {
                    console.log(response)
                    if(response.data.flag==200){
                    this.adminList =  response.data.data.admin.filter((item)=>{
                        return item.adminName!=sessionStorage.getItem('userName')
                    });;
                    this.txcount = response.data.data.adminNum;
                    // this.adminList.forEach(item=>{
                    //
                    // })
                    this.adminList.forEach(item=>{
                        if(item.adminType=='EDITOR'){
                            item.adminTypeName='普通管理员'
                        }else if(item.adminType=='ADMIN'){
                            item.adminTypeName='超级管理员'
                        }else{
                            item.adminTypeName='钱包管理者'
                        }
                    })
                    }else if(response.data.flag==201) {
                        this.$alert(response.data.msg + '，请重新登录', '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$router.push('/')
                            }
                        });
                    }
                })

            },
            handleCurrentChange(pageValue){
                this.currentPage = pageValue;
                this.getData()
            },
            handleSizeChange(pageSize) {
                console.log(">>>>>>pageSize", pageSize);
                this.nowPageSize = pageSize;
                this.getData();
            },
            // handleCurrentChange(pageValue) {
            //     console.log(">>>>>>pageValue", pageValue);
            //     this.currentPage = pageValue;
            //     const listParams = {
            //         activeName: this.activeName,
            //         pageValue: pageValue,
            //         pageSize: this.nowPageSize || 10
            //     };
            //     this.queryListData(listParams);
            // },
            addadmin(){
                this.$router.push({path: '/addAdmin'})
            },
            deleteAdmin(id){
                this.dialogVisible=true;
                this.deleteId=id;
            },
            ensureDelete(){
                this.$ajax.get(BaseUrl+'delete'+'/'+this.deleteId,{headers:{'token':sessionStorage.getItem('token')}}).then(response => {
                    this.dialogVisible=false;
                    if(response.data.flag==200){
                        this.getData()
                        // var that=this;
                        // this.adminList.forEach(function(item,index){
                        //     if(item.id==that.deleteId){
                        //         that.adminList.splice(index,1);
                        //         that.txcount=that.txcount-1
                        //     }
                        // })
                    }else if(response.data.flag==201) {
                        this.$alert(response.data.msg + '，请重新登录', '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$router.push('/')
                            }
                        });
                    }else{
                        this.$alert(response.data.msg, '提示', {
                            confirmButtonText: '确定',
                        });
                    }
                })

            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            },
        },
    }
</script>

<style lang="less">
	@import '../style/mixin';
    .table_container{
        padding: 20px;
    }
</style>


