<template>
    <div class="fillcontain">
        <div class="table_container">
            <div style="display:flex;margin-bottom: 30px;">
                <el-tabs v-model="activeName" @tab-click="queryListData({activeName:activeName})" style="height: 40px;">
                    <el-tab-pane label="全部" name="-1"></el-tab-pane>
                    <el-tab-pane label="审核通过" name="1"></el-tab-pane>
                    <el-tab-pane label="审核不通过" name="2"></el-tab-pane>
                    <el-tab-pane label="待定" name="3"></el-tab-pane>
                    <el-tab-pane label="未审核" name="0"></el-tab-pane>
                </el-tabs>
            </div>
            <el-table
                :data="info"
                class="test-class"
                style="width: 100%">
                <el-table-column
                    label="应用名称"
                    prop="appName" min-width="100">
                </el-table-column>
                <el-table-column
                    label="公司名称"
                    prop="companyName" min-width="150">
                </el-table-column>
                <el-table-column
                    label="安卓安装包地址"
                    min-width="80">
                    <template scope="scope">
                        <el-button style=" padding:5px 10px!important;margin-left: 0!important;"
                                   v-clipboard:copy="scope.row.androidUrl" v-clipboard:success="onCopy"
                                   v-clipboard:error="onError"
                                   v-if="scope.row.androidUrl!=undefined&&scope.row.androidUrl!=''">复制
                        </el-button>
                        <span v-else>未上传</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="ios安装包地址"
                    min-width="80">
                    <template scope="scope">
                        <el-button class="littleButton" style=" padding:5px 10px!important;margin-left: 0!important;"
                                   v-clipboard:copy="scope.row.iosUrl" v-clipboard:success="onCopy"
                                   v-clipboard:error="onError" v-if="scope.row.iosUrl!=undefined&&scope.row.iosUrl!=''">
                            复制
                        </el-button>
                        <span v-else>未上传</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="提交时间"
                    prop="commitDate" min-width="100">
                </el-table-column>
                <el-table-column
                    label="联系人"
                    prop="contactName">
                </el-table-column>
                <el-table-column
                    label="联系电话"
                    min-width="100"
                    prop="contactPhone"
                >
                </el-table-column>
                <el-table-column
                    label="简介"
                    min-width="150"
                    prop="appSummary"
                >
                </el-table-column>
                <el-table-column
                    label="状态"
                    min-width="100"
                    prop="appState"
                >
                </el-table-column>
                <el-table-column label="操作" min-width="100">
                    <template scope="scope">
                        <el-button style=" padding:5px 10px!important;margin-left: 0!important;"
                                   @click="check(scope.row.id)">查看
                        </el-button>
                        <!--<el-button>删除-->
                        <!--</el-button>-->
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
            <el-dialog title="应用详情" :visible.sync="dialogFormVisible" :close-on-click-modal=false>
                <el-form :model="appForm">
                    <el-form-item label="项目名称：" :label-width="formLabelWidth">
                        {{appForm.projectName}}
                    </el-form-item>
                    <el-form-item label="App名称：" :label-width="formLabelWidth">
                        {{appForm.appName}}
                    </el-form-item>
                    <el-form-item label="初始版本上线时间：" :label-width="formLabelWidth">
                        {{appForm.startDate}}
                    </el-form-item>
                    <el-form-item label="安卓安装包：" :label-width="formLabelWidth">
                        {{appForm.androidUrl}}
                        <el-button v-if="appForm.androidUrl!='未上传'" style="margin-left: 20px"
                                   v-clipboard:copy="appForm.androidUrl" v-clipboard:success="onCopy"
                                   v-clipboard:error="onError">复制
                        </el-button>
                    </el-form-item>
                    <el-form-item label="ios安装包：" :label-width="formLabelWidth">
                        {{appForm.iosUrl}}
                        <el-button v-if="appForm.iosUrl!='未上传'" style="margin-left: 20px"
                                   v-clipboard:copy="appForm.iosUrl" v-clipboard:success="onCopy"
                                   v-clipboard:error="onError">复制
                        </el-button>
                    </el-form-item>
                    <el-form-item label="公司名称：" :label-width="formLabelWidth">
                        {{appForm.companyName}}
                    </el-form-item>
                    <el-form-item label="联系人姓名：" :label-width="formLabelWidth">
                        {{appForm.contactName}}
                    </el-form-item>
                    <el-form-item label="联系人微信：" :label-width="formLabelWidth" prop="name">
                        {{appForm.contactWeiXin}}
                    </el-form-item>
                    <el-form-item label="联系人电话：" :label-width="formLabelWidth" prop="name">
                        {{appForm.contactPhone}}
                    </el-form-item>
                    <el-form-item label="APP简介：" :label-width="formLabelWidth" prop="name">
                        {{appForm.appSummary}}
                    </el-form-item>
                    <el-form-item label="当前版本更新内容：" :label-width="formLabelWidth" prop="name">
                        {{appForm.appMessage}}
                    </el-form-item>
                    <el-form-item label="公司或团队介绍：" :label-width="formLabelWidth" prop="name">
                        {{appForm.companyMessage}}
                    </el-form-item>
                    <el-form-item label="审核结果：" :label-width="formLabelWidth" prop="name">
                        <el-select v-model="state" placeholder="请选择">
                            <el-option
                                label="通过"
                                value="1">
                            </el-option>
                            <el-option
                                label="不通过"
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
                                   v-bind:disabled="appForm.flag==1||appForm.flag==2">{{checkText}}
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>

        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {baseUrl, baseImgPath} from '@/config/env'
    import {
        cityGuess,
        getResturants,
        getResturantsCount,
        foodCategory,
        updateResturant,
        searchplace,
        deleteResturant
    } from '@/api/getData'

    let moment = require('moment')
    export default {
        data() {
            return {
                info: [],
                txcount: 0,
                totalfees: 0,
                activeName: '-1',
                currentPage: 1,
                nowPageSize: 10,
                url: '',
                appForm: {},
                dialogFormVisible: false,
                formLabelWidth: '150px',
                checkText: '保存',
                remarks: '',
                state: ''
            }
        },
        created() {
            this.queryListData({activeName: this.activeName, pageValue: this.currentPage, pageSize: this.nowPageSize})
        },
        components: {
            headTop,
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
            queryListData({activeName, pageValue, pageSize}) {
                this.$ajax
                    .get(`${BaseUrl}appdemo/all/${activeName}/${pageValue || 1}/${pageSize || 10}`, {headers: {'token': sessionStorage.getItem('token')}})
                    .then(response => {
                        // console.log(pageSize)
                        // console.log(pageValue)
                        if (response.data.flag == 200) {
                            this.info = response.data.data.list;
                            this.txcount = response.data.data.num;
                            this.info.forEach(item => {
                                if (item.flag == 1) {
                                    item.appState = "审核通过";
                                } else if (item.flag == 2) {
                                    item.appState = "审核不通过";
                                } else if (item.flag == 3) {
                                    item.appState = "待定";
                                } else {
                                    item.appState = "未审核";
                                }
                            });
                            this.info.forEach(item => {
                                item.commitDate = moment.utc(item.commitDate).local().format('YYYY-MM-DD')
                            });
                            this.currentPage = pageValue;
                            this.nowPageSize = pageSize
                            this.info.forEach(item => {
                                item.fileSize = (item.fileSize / 1048576).toFixed(2) + ' M'
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
            handleSizeChange(pageSize) {
                // console.log(">>>>>>pageSize", pageSize);
                this.nowPageSize = pageSize;
                const listParams = {
                    activeName: this.activeName,
                    pageValue: 1,
                    pageSize: pageSize
                };
                this.queryListData(listParams);
            },
            handleCurrentChange(pageValue) {
                // console.log(">>>>>>pageValue", pageValue);
                this.currentPage = pageValue;
                const listParams = {
                    activeName: this.activeName,
                    pageValue: pageValue,
                    pageSize: this.nowPageSize || 10
                };
                this.queryListData(listParams);
            },
            check(id) {
                this.remarks = ''
                this.dialogFormVisible = true;
                this.$ajax
                    .get(`${BaseUrl}appdemo/info/${id}`, {headers: {'token': sessionStorage.getItem('token')}})
                    .then(response => {
                        // console.log(pageSize)
                        // console.log(pageValue)
                        if (response.data.flag == 200) {
                            this.appForm = response.data.data;
                            this.appForm.androidUrl = this.appForm.androidUrl || '未上传'
                            this.appForm.iosUrl = this.appForm.iosUrl || '未上传'
                            // if(this.appForm.flag==1){
                            //     this.checkText='已通过审核'
                            // }else{
                            //     this.checkText='通过审核'
                            // }
                            this.state = this.appForm.flag.toString()
                            if (this.appForm.remarks != undefined) {
                                this.remarks = this.appForm.remarks
                            }
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
            submitForm() {
                this.$ajax({
                    method: "POST",
                    url: BaseUrl + 'appdemo/label',
                    params: {
                        id: this.appForm.id,
                        flag: this.state,
                        remarks: this.remarks
                    },
                    headers: {
                        'token': sessionStorage.getItem('token'),
                    }
                }).then(response => {
                    // console.log(response);
                    if (response.data.flag == 500) {
                        this.$alert(response.data.msg, '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$message({
                                    type: 'info',
                                    message: `error: ${ response.data.msg }`
                                });
                            }
                        });
                    } else if (response.data.flag == 200) {
                        this.$alert(response.data.msg, '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.queryListData({
                                    activeName: this.activeName,
                                    pageValue: this.currentPage,
                                    pageSize: this.nowPageSize
                                })
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
