<template>
    <div class="fillcontain">
        <div class="table_container">
            <el-row style="display:flex;margin-bottom: 30px;">
                <!--<el-col :span="12"><el-button type="primary" @click="uploadapp()">上传应用</el-button>-->
                <!--<el-button style='' type="primary" icon="document" @click="handleDownload" :loading="downloadLoading"> 导出excel</el-button></el-col>-->
                    <el-input placeholder="反馈关键字"  class="input-with-select" v-model="searchInfo" style="width:300px" @keyup.enter.native="searchCheck(searchInfo)">
                        <el-button slot="append"  @click="searchCheck(searchInfo)"><i class="el-icon-search"></i></el-button>
                    </el-input>
                <el-button type="primary" @click="deleteAllUserBack" style="margin-left:30px">批量删除</el-button>
            </el-row>
            <el-table
                :data="info"
                class="test-class"
                @selection-change="handleSelectionChange"
                style="width: 100%" >
                <el-table-column
                    type="selection"
                    width="55"
                >
                </el-table-column>
                <el-table-column
                    label="反馈时间"
                    prop="time" min-width="50">
                </el-table-column>
                <!--<el-table-column label="头像" prop="fileIcon" min-width="50">-->
                    <!--<template scope="scope">-->
                        <!--<img :src="'https://imapp-image.oss-cn-hangzhou.aliyuncs.com/'+scope.row.pic" style="width:30px;height:30px;" v-if="scope.row.pic!==''&&scope.row.pic!==undefined">-->
                    <!--</template>-->

                <!--</el-table-column>-->
                <el-table-column
                    label="用户名"
                    prop="nick" min-width="50">
                </el-table-column>
                <el-table-column
                    label="姓名"
                    prop="detail" min-width="50" >
                </el-table-column>
                <el-table-column
                    label="手机号"
                    prop="amount" min-width="50" >
                </el-table-column>
                <el-table-column
                    label="反馈信息"
                    prop="content" min-width="50" >
                </el-table-column>
                <el-table-column
                    label="操作"
                    min-width="50" >
                    <template scope="scope">
                        <el-button  type="text" @click="abnormalRecords(scope.row.userId,scope.row.content)">查看</el-button>
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
        </div>
        <el-dialog title="用户：" :visible.sync="dialogTableVisible">
            <div>
                <p style="overflow: hidden;text-overflow: ellipsis; word-break: break-all;">
                   {{content}}
                </p>
            </div>
        </el-dialog>
        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%"
        >
            <span>确认删除选中的用户反馈？</span>
            <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="ensureDelete()">确 定</el-button>
               </span>
        </el-dialog>
    </div>
</template>

<script>
    let moment=require('moment')
    export default {
        data() {
            return {
                info:[],
                // tableData:[
                //     {time:'afsgagydgysgeggey',nickName:'小红',pic:'',amount:1000,detail:'提取',aboutUsers:'老李'},
                //     {time:'afsgagydgysgeggey',nickName:'小红',pic:'',amount:1000,detail:'提取',aboutUsers:'老李'},
                //     {time:'afsgagydgysgeggey',nickName:'小红',pic:'',amount:1000,detail:'提取',aboutUsers:'老李'},
                //     {time:'afsgagydgysgeggey',nickName:'小红',pic:'',amount:1000,detail:'提取',aboutUsers:'老李'},
                //     {time:'afsgagydgysgeggey',nickName:'小红',pic:'',amount:1000,detail:'提取',aboutUsers:'老李'},
                //     {time:'afsgagydgysgeggey',nickName:'小红',pic:'',amount:1000,detail:'提取',aboutUsers:'老李'},
                //     {time:'afsgagydgysgeggey',nickName:'小红',pic:'',amount:1000,detail:'提取',aboutUsers:'老李'},
                //
                //
                // ],
                // info: [
                //     {userId:'afsgagydgysgeggey',nickName:'小红',pic:'',phone:13112010101,detail:'邀请人数超过100个',amount:1000,realState:'已实名',resultCheck:'黑名单'},
                //     {userId:'afsgagydgysgeggey',nickName:'小红',pic:'',phone:13112010101,detail:'邀请人数超过100个',amount:1000,realState:'已实名',resultCheck:'黑名单'},
                //     {userId:'afsgagydgysgeggey',nickName:'小红',pic:'',phone:13112010101,detail:'邀请人数超过100个',amount:1000,realState:'已实名',resultCheck:'黑名单'},
                //     {userId:'afsgagydgysgeggey',nickName:'小红',pic:'',phone:13112010101,detail:'邀请人数超过100个',amount:1000,realState:'已实名',resultCheck:'黑名单'},
                //     {userId:'afsgagydgysgeggey',nickName:'小红',pic:'',phone:13112010101,detail:'邀请人数超过100个',amount:1000,realState:'已实名',resultCheck:'黑名单'},
                //     {userId:'afsgagydgysgeggey',nickName:'小红',pic:'',phone:13112010101,detail:'邀请人数超过100个',amount:1000,realState:'已实名',resultCheck:'黑名单'}
                // ],
                txcount: 0,
                currentPage: 1,
                nowPageSize: 10,
                currentPageDetail:1,
                nowPageSizeDetail:10,
                txcountDetail:0,
                activeName: '3',
                searchInfo: "",
                // innerVisible:false,
                dialogVisible:false,
                dialogTableVisible:false,
                dialogFormVisible:false,
                formLabelWidth:'120px',
                form:{},
                content:'',
                multipleSelection:[],
                deleteIds:[],
                // result:'',
                // remarks:''
            };
        },
        created() {
            this.getData();
        },
        // components: {
        //     headTop
        // },
        methods: {
            getData() {
                this.$ajax({
                    method: "POST",
                    url: BaseUrl+'feedback/query',
                    data:{page:this.currentPage, size: this.nowPageSize,keyword:this.searchInfo==''?undefined:this.searchInfo},
                    headers: {'token': sessionStorage.getItem('token')}
                }).then(response => {
                    if(response.data.flag==200){
                        this.info = response.data.data.data;
                        this.txcount = response.data.data.count;
                        this.info.forEach(item=>{
                                item.time = moment.utc(item.time).local().format('YYYY-MM-DD HH:mm:ss')
                            if(item.userName===undefined){
                                item.personName='未实名'
                            }else{
                                item.personName=item.userName
                            }
                        })
                        sessionStorage.setItem('userList',JSON.stringify(response.data.data.list))
                    }else if(response.data.flag==201) {
                        this.$alert(response.data.msg + '，请重新登录', '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$router.push('/')
                            }
                        });
                    }
                });
            },
            searchCheck(searchInfo) {
                this.searchInfo = searchInfo;
                this.getData()
            },
            handleSelectionChange(val) {
                this.multipleSelection=val
                this. deleteIds = [];
                for (let i = 0; i < this.multipleSelection.length; i++) {
                    this.deleteIds.push( this.multipleSelection[i].id)
                }
            },
            deleteAllUserBack(){
                if( this.deleteIds.length==0){
                    this.$alert('请勾选用户', '提示', {
                        confirmButtonText: '确定',
                    });
                }else{
                    this.dialogVisible=true
                }
            },
            ensureDelete(){
                this.$ajax({
                    method: "POST",
                    url: BaseUrl+'feedback/delete',
                    data:this.deleteIds,
                    headers: {'token': sessionStorage.getItem('token')}
                }).then(response => {
                    this.dialogVisible=false
                    if(response.data.flag==200){
                        this.$alert(response.data.msg, '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$message({
                                    type: 'info',
                                    message: `${ response.data.msg}`
                                });
                                this.getData()
                            }
                        });
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
                            callback: action => {
                                this.$message({
                                    type: 'info',
                                    message: `error: ${ response.data.msg +',请重试'}`
                                });
                            }
                        });
                        return false
                    }
                });
            },
            handleSizeChange(pageSize) {
                console.log(">>>>>>pageSize", pageSize);
                this.nowPageSize = pageSize;
                this.currentPage=1
                this.getData();
            },
            handleCurrentChange(pageValue) {
                console.log(">>>>>>pageValue", pageValue);
                this.currentPage = pageValue;
                this.getData();
            },
            abnormalRecords(id,content){
                this.dialogTableVisible=true
                this.content=content

            },
            update(){
                this.form={};
                this.dialogFormVisible=true
            },
            saveBlackState(){
                console.log(this.form)
            }
        }
    };
</script>

<style lang="less">
    @import "../style/mixin";

    .demo-table-expand {
        font-size: 0;
    }

    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }

    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }

    .table_container {
        padding: 20px;
    }

    .Pagination {
        display: flex;
        justify-content: flex-start;
        margin-top: 8px;
    }

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #20a0ff;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 120px;
        height: 120px;
        line-height: 120px;
        text-align: center;
    }

    .avatar {
        width: 120px;
        height: 120px;
        display: block;
    }
    .test-class{
      .cell {
       overflow: hidden !important;
       text-overflow: ellipsis !important;
       word-break: break-all !important;
        white-space: nowrap !important;
    }
    }
    .littleButton{
        padding:5px 10px!important;
        margin-left: 0!important;
    }
    /*.el-button{*/
    /*border: 0;*/
    /*}*/



</style>
