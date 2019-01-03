<template>
    <div class="fillcontain">
        <div class="table_container">
            <el-row style="display:flex;margin-bottom: 30px;">
                <!--<el-button style='' type="primary" icon="document" @click="handleDownload" :loading="downloadLoading"> 导出excel</el-button></el-col>-->
                <el-col :span="12" style="display: flex;align-items: center;">
                    <el-tabs v-model="tabsName" style="height: 40px;" @tab-click="tabsClick">
                        <el-tab-pane label="全部" name="-1"></el-tab-pane>
                        <el-tab-pane label="已上架" name="true"></el-tab-pane>
                        <el-tab-pane label="未上架" name="false"></el-tab-pane>
                    </el-tabs>
                </el-col>
                <el-col :span="12" style="display: flex;align-items: center;justify-content: flex-end">
                    <el-input placeholder="关键字" class="input-with-select" v-model="searchInfo" style="width:60%"
                              @keyup.enter.native="searchDapp">
                        <el-button slot="append" @click="searchDapp"><i class="el-icon-search"></i></el-button>
                    </el-input>
                </el-col>

            </el-row>
            <el-tabs v-model="tabsNameTag" style="height: 40px;" @tab-click="tabsClicksTag">
                <el-tab-pane label="EOS" name="柚子"></el-tab-pane>
                <el-tab-pane label="以太坊" name="以太坊"></el-tab-pane>
                <el-tab-pane label="波场" name="波场"></el-tab-pane>
                <el-tab-pane label="星云链" name="星云链"></el-tab-pane>
                <el-tab-pane label="小蚁" name="小蚁"></el-tab-pane>
                <el-tab-pane label="其他" name="其他"></el-tab-pane>
            </el-tabs>
            <el-table
                :data="info"
                style="width: 100%">
                <el-table-column
                    label="最新抓取时间"
                    prop="newTime">
                </el-table-column>
                <el-table-column label="图标" prop="icon" min-width="50">
                    <template scope="scope">
                        <img :src="scope.row.icon" style="width:30px;height:30px;"
                             v-if="scope.row.icon!==''&&scope.row.icon!==undefined">
                        <span v-else>无</span>
                    </template>

                </el-table-column>
                <el-table-column
                    label="名称"
                    prop="name"
                >
                </el-table-column>
                <el-table-column
                    label="日活"
                    prop="dau"
                >
                </el-table-column>
                <el-table-column
                    label="24小时交易量"
                    prop="txAmount"
                >
                </el-table-column>
                <el-table-column
                    label="24小时交易笔数"
                    prop="txCount"
                >
                </el-table-column>
                <el-table-column
                    label="类型"
                    prop="type"
                >
                </el-table-column>
                <el-table-column
                    label="评分"
                    prop="score"
                    min-width="50">
                </el-table-column>
                <el-table-column
                    label="状态"
                >
                    <template scope="scope">
                        <div>
                            {{scope.row.reviewed?"已上架":"未上架"}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    label="地址"
                    prop="title"
                    min-width="50">
                    <template scope="scope">
                        <el-button type="text" style="margin-left:0" v-clipboard:copy="scope.row.url"
                                   v-clipboard:success="onCopy" v-clipboard:error="onError">复制
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column
                    label="操作"
                    min-width="100"
                >
                    <template scope="scope">
                        <el-button type="text"
                                   @click="checkDapp(scope.row.id,scope.row.reviewed,scope.row.icon,scope.row.name)"
                                   style="margin-left:0">审核
                        </el-button>
                        <el-button type="text" @click="historyTable(scope.row.id,scope.row.name)" style="margin-left:0">
                            历史数据
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="Pagination">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[10, 20, 30, 50]"
                    :page-size="nowPageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="txcount">
                </el-pagination>
            </div>
            <el-dialog :visible.sync="dialogTableVisible" width="600px">
                <div class="titleconten">
                    <div style="display: flex;align-items: center;justify-content: center">
                        <div style="width:100px;height:auto;" v-if="checkIcon!==''&&checkIcon!==undefined">
                            <img :src="checkIcon" style="width:100px;height:auto">
                        </div>
                        <h2 style="text-align:center;margin-left:20px">{{checkName}}</h2>
                    </div>
                    <div style="width:300px;margin:0 auto;padding:20px 0px">
                        通过审核的dapp会发布在客户端，按日活从高到低排序
                    </div>
                    <div style="width:300px;margin:0 auto;padding:20px 0px">
                        <el-radio-group v-model="radio">
                            <el-radio :label="true">上架</el-radio>
                            <el-radio :label="false">下架</el-radio>
                        </el-radio-group>
                    </div>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogTableVisible = false">取 消</el-button>
                    <el-button type="primary" @click="ensureUpdate">确 定</el-button>
                </div>
            </el-dialog>
            <el-dialog :title="dappName" :visible.sync="dialogTableVisibleData" width="600px">
                <el-table :data="historyData">
                    <el-table-column property="newTime" label="抓取时间"></el-table-column>
                    <el-table-column property="name" label="名称"></el-table-column>
                    <el-table-column property="dau" label="日活"></el-table-column>
                    <el-table-column property="txAmount" label="24小时交易量"></el-table-column>
                    <el-table-column property="txCount" label="24小时交易笔数"></el-table-column>
                    <el-table-column property="score" label="评分"></el-table-column>
                </el-table>
                <div class="Pagination">
                    <el-pagination
                        @size-change="handleSizeChangeHistory"
                        @current-change="handleCurrentChangeHistory"
                        :current-page="currentPageHistory"
                        :page-sizes="[10, 20, 30, 50]"
                        :page-size="nowPageSizeHistory"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="historyCount">
                    </el-pagination>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    let moment = require('moment')
    export default {
        data() {
            return {
                dialogTableVisible: false,
                dialogTableVisibleData: false,
                radio: null,
                info: [],
                historyData: [],
                currentPage: 1,
                nowPageSize: 10,
                currentPageHistory: 1,
                nowPageSizeHistory: 10,
                tabsName: "-1",//tabs
                txcount: 0,
                historyCount: 0,
                searchInfo: "",//快讯关键字搜索
                row: "",//当前行数据
                dappName: '',
                checkId: '',
                checkIcon: '',
                checkName: '',
                tabsNameTag:'柚子'

            };
        },
        created() {
            this.getData()
        },
        mounted() {
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
            tabsClick() {
                this.currentPage = 1;
                this.getData()
            },
            tabsClicksTag(){
                this.currentPage = 1;
                this.getData()
            },
            getData() {
                this.$ajax({
                    method: "GET",
                    url: BaseUrl + 'dapp/list',
                    params: {
                        pageNum: this.currentPage,
                        pageSize: this.nowPageSize,
                        reviewed: this.tabsName == -1 ? null : this.tabsName,
                        key: this.searchInfo == '' ? null : this.searchInfo,
                        tag:this.tabsNameTag
                    },
                    headers: {'token': sessionStorage.getItem('token')}
                }).then(response => {
                    if (response.data.flag == 200) {
                        this.info = response.data.data;
                        this.info.forEach(item => {
                            item.newTime = moment.utc(item.time * 1000).local().format('YYYY-MM-DD HH:mm:ss')
                        })
                        this.getCount()
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
            getCount() {
                this.$ajax({
                    method: "GET",
                    url: BaseUrl + 'dapp/count',
                    params: {
                        key: this.searchInfo == '' ? null : this.searchInfo,
                        reviewed: this.tabsName == -1 ? null : this.tabsName,
                        tag:this.tabsNameTag
                    },
                    headers: {'token': sessionStorage.getItem('token')}
                }).then(response => {
                    if (response.data.flag == 200) {
                        this.txcount = response.data.data;
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
            searchDapp() {
                this.getData();
            },
            checkDapp(id, reviewed, icon, name) {
                this.dialogTableVisible = true
                this.checkId = id;
                this.radio = reviewed;
                this.checkIcon = icon;
                this.checkName = name;
            },
            ensureUpdate() {
                this.$ajax({
                    method: "POST",
                    url: BaseUrl + 'dapp/audit',
                    params: {id: this.checkId, reviewed: this.radio},
                    headers: {'token': sessionStorage.getItem('token')}
                }).then(response => {
                    if (response.data.flag == 200) {
                        this.dialogTableVisible = false
                        this.$alert( this.radio==true?'DAPP上架成功':'DAPP下架成功', '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$message({
                                    type: 'info',
                                    message: `${ response.data.msg}`
                                });
                                this.getData()
                            }
                        });
                    } else if (response.data.flag == 201) {
                        this.$alert(response.data.msg + '，请重新登录', '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$router.push('/')
                            }
                        });
                    } else {
                        this.$alert(response.data.msg, '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$message({
                                    type: 'info',
                                    message: `error: ${ response.data.msg + ',请重试'}`
                                });
                            }
                        });
                        return false
                    }
                });
            },
            historyTable(id, name) {
                this.dialogTableVisibleData = true;
                this.dappName = name
                this.currentPageHistory = 1;
                this.nowPageSizeHistory = 10;
                this.getHistory()
            },
            getHistory() {
                this.$ajax({
                    method: "GET",
                    url: BaseUrl + 'dapp/history',
                    params: {name: this.dappName, pageNum: this.currentPageHistory, pageSize: this.nowPageSizeHistory},
                    headers: {'token': sessionStorage.getItem('token')}
                }).then(response => {
                    if (response.data.flag == 200) {
                        this.historyData = response.data.data;
                        this.historyData.forEach(item => {
                            item.newTime = moment.utc(item.time * 1000).local().format('YYYY-MM-DD HH:mm:ss')
                        })
                        this.getHistoryCount()
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
            getHistoryCount() {
                this.$ajax({
                    method: "GET",
                    url: BaseUrl + 'dapp/historyCount',
                    params: {name: this.dappName},
                    headers: {'token': sessionStorage.getItem('token')}
                }).then(response => {
                    if (response.data.flag == 200) {
                        this.historyCount = response.data.data;
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
                this.nowPageSize = pageSize;
                this.currentPage = 1;
                this.getData();
            },
            handleCurrentChange(pageValue) {
                this.currentPage = pageValue;
                this.getData();
            },
            handleSizeChangeHistory(pageSize) {
                this.nowPageSizeHistory = pageSize;
                this.currentPageHistory = 1;
                this.getHistory();
            },
            handleCurrentChangeHistory(pageValue) {
                this.currentPageHistory = pageValue;
                this.getHistory();
            }
        }
    };
</script>

<style lang="less" scoped>
    @import "../style/mixin";

    .fillcontain {
        text-align: left
    }

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

    /*.cell {*/
    /*overflow: hidden;*/
    /*text-overflow: ellipsis;*/
    /*word-break: break-all;*/
    /*white-space: nowrap !important;*/
    /*}*/
    .littleButton {
        padding: 5px 10px !important;
        margin-left: 0 !important;
    }

    /*.el-button{*/
    /*border: 0;*/
    /*}*/
    .title {
        overflow: hidden;
        cursor: pointer;
    }

    .titles {
        color: #6cf;

    }

    .settop {
        color: red;
        border: 1px solid red
    }

    .hot {
        color: red
    }


</style>
