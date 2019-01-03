<!---->
<template>
    <div class="fillcontain">
        <div class="table_container">
            <div style="display:flex;margin-bottom: 30px;">
                <el-tabs v-model="activeName" @tab-click="changeState()" style="height: 40px;">
                    <el-tab-pane label="全部" name="-1"></el-tab-pane>
                    <el-tab-pane label="解除异常" name="1"></el-tab-pane>
                    <el-tab-pane label="异常认定" name="2"></el-tab-pane>
                    <el-tab-pane label="待定" name="3"></el-tab-pane>
                    <el-tab-pane label="未审核" name="0"></el-tab-pane>
                </el-tabs>
            </div>
            <!--审核列表-->
            <el-table
                :data="dappTable"
                class="test-class"
                style="width: 100%">
                <el-table-column
                    label="用户民"
                    prop="name" min-width="100">
                </el-table-column>
                <el-table-column
                    label="收款地址"
                    min-width="80">
                    <template scope="scope">
                        <el-button style=" padding:5px 10px!important;margin-left: 0!important;" type="text"
                                   v-clipboard:copy="scope.row.url" v-clipboard:success="onCopy"
                                   v-clipboard:error="onError"
                                   v-if="scope.row.url!=undefined&&scope.row.url!=''">复制
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column
                    label="报警时间"
                    prop="date" min-width="100">
                </el-table-column>
                <el-table-column
                    label="提取金额"
                    prop="amount" min-width="100">
                </el-table-column>
                <el-table-column
                    label="异常原因"
                    prop="remarks">
                </el-table-column>
                <el-table-column
                    label="状态"
                    min-width="100"
                >
                    <template scope="scope">
                        {{scope.row.reviewed==0?'未审核':(scope.row.reviewed==1?'已通过':(scope.row.reviewed==2?'审核不通过':'待定'))}}
                    </template>
                </el-table-column>
                <el-table-column label="操作" min-width="120">
                    <template scope="scope">
                        <el-button style=" padding:5px 10px!important;margin-left: 0!important;" type="text"
                                   @click="check(scope.row)">查看
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="Pagination">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage"
                    :page-size.sync="nowPageSize"
                    :page-sizes="[5, 10, 20, 40]"
                    :total="txcount"
                    layout="total, sizes, prev, pager, next, jumper"
                >
                </el-pagination>
            </div>
            <!--审核eos提取信息-->
            <el-dialog title="账户审核" :visible.sync="dialogFormVisible" :close-on-click-modal=false>
                <el-form :model="dappForm">
                    <el-form-item label="账户：" :label-width="formLabelWidth">
                        {{row.name}}
                    </el-form-item>
                    <el-form-item label="审核结果：" :label-width="formLabelWidth">
                        <el-select v-model="state" placeholder="请选择">
                            <el-option
                                label="认定异常"
                                value="1">
                            </el-option>
                            <el-option
                                label="异常解除"
                                value="2">
                            </el-option>
                            <el-option
                                label="待定"
                                value="3">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="原因：" :label-width="formLabelWidth" prop="name">
                        <el-input
                            type="textarea"
                            :rows="2"
                            placeholder="请输入内容"
                            v-model="remarks">
                        </el-input>
                    </el-form-item>
                    <el-form-item align="center">
                        <el-button type="primary" @click="submitForm()"
                                   v-bind:disabled="dappForm.reviewed==1||dappForm.reviewed==2||state==''">{{checkText}}
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    let moment = require('moment')
    export default {
        data() {
            return {
                dappTable: [
                    {date:'2019-01-01 12:00',name:'测试',url:'wyqetyfsggs',amount:2,remarks:'测试测试谁',remark2:'',reviewed:0,state:1}
                ],
                txcount: 0,
                totalfees: 0,
                activeName: '-1',
                currentPage: 1,
                nowPageSize: 10,
                url: '',
                dappForm: {},
                dialogFormVisible: false,
                dialogTableVisible:false,
                formLabelWidth: '150px',
                checkText: '保存',
                remarks: '',
                state: '',
                row:{},
                socialNetwork:[],
                smartContract:[],
                historyData:[]
            }
        },
        created() {
            this.queryListData()
        },
        methods: {
            onCopy() {
                this.$message({
                    message: '复制成功',
                    type: 'success'
                });
            },
            onError() {
                this.$message({
                    message: '复制失败',
                    type: 'error'
                });
            },
            changeState(){
                this.currentPage=1;
                this.queryListData()
            },
            // 获取列表数据
            queryListData() {
                this.$ajax({
                    method: "POST",
                    url: BaseUrl + 'dappReview/query',
                    data:{page:this.currentPage,size:this.nowPageSize,reviewed:this.activeName==-1?null:Number(this.activeName),order:"ctime desc"},
                    headers: {'token': sessionStorage.getItem('token')}
                }).then(response => {
                    if (response.data.flag == 200) {
                        // this.dappTable=response.data.data.data
                        this.txcount=response.data.data.count
                        this.dappTable.forEach(item=>{
                            item.ctimes=moment.utc(item.ctime).local().format('YYYY-MM-DD HH:mm:ss')
                        })
                    } else if (response.data.flag == 201) {
                        this.$alert(response.data.msg + '，请重新登录', '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$router.push('/')
                            }
                        });
                    }
                });
            },
            // 分页
            handleSizeChange(pageSize) {
                this.currentPage=1
                this.nowPageSize = pageSize;
                this.queryListData();
            },
            handleCurrentChange(pageValue) {
                this.currentPage = pageValue;
                this.queryListData();
            },
            // 查看信息
            check(row) {
                this.row=row
                this.dialogFormVisible = true;

            },
            // 提交更改状态
            submitForm() {
                this.dappForm.reviewed=this.state;
                this.dappForm.remark=this.remarks;
                this.$ajax({
                    method: "POST",
                    url: BaseUrl + 'dappReview/update',
                    data:this.dappForm,
                    headers: {'token': sessionStorage.getItem('token')}
                }).then(response => {
                    if (response.data.flag == 500) {
                        this.$alert(response.data.msg, '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$message({
                                    type: 'info',
                                    message: `error: ${response.data.msg}`
                                });
                            }
                        });
                    } else if (response.data.flag == 200) {
                        this.dialogFormVisible=false
                        this.$alert(response.data.msg, '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.queryListData()
                            }
                        });
                    } else if (response.data.flag == 201) {
                        this.$alert(response.data.msg + '，请重新登录', '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$router.push('/')
                            }
                        });
                    }
                });
            },
            //查看流水
            history(row){
                this.row=row
                this.dialogTableVisible=true
            }

        },
    }
</script>

<style lang="less">
    @import '../style/mixin';

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

    .test-class .cell {
        overflow: hidden !important;
        text-overflow: ellipsis !important;
        white-space: nowrap !important;
        word-break: normal !important;
    }

    /*.el-form-item__content{*/
    /*word-break: break-all!important;*/
    /*}*/
    /*.littleButton{*/
    /**/
    /*}*/
    /*.el-button{*/
    /*border: 0;*/
    /*}*/
</style>
