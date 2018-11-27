<template>
    <div class="fillcontain">
        <div class="table_container">
            <el-row style="display:flex;margin-bottom: 30px;">
                <!--<el-col :span="12"><el-button type="primary" @click="uploadapp()">上传应用</el-button>-->
                <!--<el-button style='' type="primary" icon="document" @click="handleDownload" :loading="downloadLoading"> 导出excel</el-button></el-col>-->
                <el-col :span="12" style="display: flex;align-items: center;">
                    <el-tabs v-model="activeName" style="height: 40px;" @tab-click="changeState()">
                        <el-tab-pane label="全部" name="3"></el-tab-pane>
                        <el-tab-pane label="黑名单" name="2"></el-tab-pane>
                        <el-tab-pane label="白名单" name="0"></el-tab-pane>
                        <el-tab-pane label="待定" name="1"></el-tab-pane>
                    </el-tabs>
                </el-col>
                <el-col :span="12" style="display: flex;align-items: center;justify-content: flex-end">
                    <el-button type="primary" @click="deleteAllUserBlack" style="margin-right:10px">批量删除</el-button>
                    <!--<el-button type="primary" @click="scanning" style="margin-right: 10px">扫描异常用户</el-button>-->
                    <el-input placeholder="手机号／用户昵称／异常情况" class="input-with-select" v-model="searchInfo"
                              style="width:60%" @keyup.enter.native="searchCheck(searchInfo)">
                        <el-button slot="append" @click="searchCheck(searchInfo)"><i class="el-icon-search"></i>
                        </el-button>
                    </el-input>
                </el-col>

            </el-row>
            <el-table
                :data="info"
                @selection-change="handleSelectionChange"
                style="width: 100%">
                <el-table-column
                    type="selection"
                    width="55"
                >
                </el-table-column>
                <el-table-column
                    label="用户"
                    prop="nick" min-width="50">
                </el-table-column>
                <el-table-column label="头像" prop="fileIcon" min-width="50">
                    <template scope="scope">
                        <img :src="'https://imapp-image.oss-cn-hangzhou.aliyuncs.com/'+scope.row.icon"
                             style="width:30px;height:30px;" v-if="scope.row.icon!==''&&scope.row.icon!==undefined">
                    </template>

                </el-table-column>
                <el-table-column
                    label="手机号"
                    prop="phone" min-width="50">
                </el-table-column>
                <el-table-column
                    label="异常情况"
                    prop="describe" min-width="50">
                </el-table-column>
                <el-table-column
                    label="IA总数"
                    prop="ia" min-width="50">
                </el-table-column>
                <el-table-column
                    label="实名状态"
                    prop="realNameState" min-width="50">
                </el-table-column>
                <el-table-column
                    label="审核结果"
                    prop="checkResult" min-width="50">
                </el-table-column>
                <el-table-column
                    label="操作"
                    min-width="50">
                    <template scope="scope">
                        <el-button type="text" @click="abnormalRecords(scope.row.userId,scope.row.userNickName)">异常记录
                        </el-button>
                        <el-button type="text" @click="update(scope.row.id,scope.row.phone,scope.row.state)"
                                   style="margin-left:0">编辑
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
        </div>
        <el-dialog title="异常记录" :visible.sync="dialogTableVisible" width="1000px">
            <!--<div style="margin-bottom: 10px">用户：{{userNickName}}</div>-->
            <!--<div style="display:inline-block">-->
            <!--<div style="display: inline-block">-->
            <!--<span style="font-size: 14px;width:80px;">类型：</span>-->
            <!--<el-select v-model="state" placeholder="请选择" @change="changeIAType">-->
            <!--<el-option-->
            <!--v-for="item in options"-->
            <!--:key="item.label"-->
            <!--:label="item.label"-->
            <!--:value="item.label">-->
            <!--</el-option>-->
            <!--</el-select>-->
            <!--</div>-->
            <!--<div style="display: inline-block">-->
            <!--<span style="font-size: 14px;width:80px;">时间：</span>-->
            <!--<el-date-picker-->
            <!--style="width:200px"-->
            <!--v-model="startDate"-->
            <!--type="datetimerange"-->
            <!--align="right"-->
            <!--:default-time="['12:00:00', '08:00:00']">-->
            <!--</el-date-picker>-->
            <!--</div>-->
            <!--<el-button type="primary" @click="serchByTime">搜索</el-button>-->
            <!--</div>-->
            <el-table :data="tableData">
                <el-table-column property="time" label="日期"></el-table-column>
                <el-table-column property="amount" label="获取或提取IA"></el-table-column>
                <el-table-column property="detail" label="行为"></el-table-column>
                <el-table-column property="aboutUsers" label="有关用户"></el-table-column>
            </el-table>
            <div class="Pagination">
                <el-pagination
                    @size-change="handleDetailSizeChange"
                    @current-change="handleDetailCurrentChange"
                    :current-page="currentPageDetail"
                    :page-size="nowPageSizeDetail"
                    :page-sizes="[5, 10, 20, 40]"
                    :total="txcountDetail"
                    layout="total, sizes, prev, pager, next, jumper"
                >
                </el-pagination>
            </div>
        </el-dialog>
        <el-dialog title="" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="审核结果：" :label-width="formLabelWidth">
                    <el-radio-group v-model="form.dstate">
                        <el-radio :label="2">黑名单</el-radio>
                        <el-radio :label="0">白名单</el-radio>
                        <el-radio :label="1">待定</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="备注：" :label-width="formLabelWidth">
                    <el-input type="textarea" v-model="form.remark"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveBlackState" v-bind:disabled="this.form.result==''">保存</el-button>
            </div>
        </el-dialog>
        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%"
        >
            <span>确认删除选中的条目？</span>
            <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="ensureDelete()">确 定</el-button>
               </span>
        </el-dialog>
    </div>
</template>

<script>
    import headTop from "../components/headTop";
    import {baseUrl, baseImgPath} from "@/config/env";
    import {
        cityGuess,
        getResturants,
        getResturantsCount,
        foodCategory,
        updateResturant,
        searchplace,
        deleteResturant
    } from "@/api/getData";
    import FileSaver from 'file-saver'
    import XLSX from 'xlsx'

    let moment = require('moment')
    export default {
        data() {
            return {
                tableData: [
                    {time: 'afsgagydgysgeggey', nickName: '小红', pic: '', amount: 1000, detail: '提取', aboutUsers: '老李'},
                    {time: 'afsgagydgysgeggey', nickName: '小红', pic: '', amount: 1000, detail: '提取', aboutUsers: '老李'},
                    {time: 'afsgagydgysgeggey', nickName: '小红', pic: '', amount: 1000, detail: '提取', aboutUsers: '老李'},
                    {time: 'afsgagydgysgeggey', nickName: '小红', pic: '', amount: 1000, detail: '提取', aboutUsers: '老李'},
                    {time: 'afsgagydgysgeggey', nickName: '小红', pic: '', amount: 1000, detail: '提取', aboutUsers: '老李'},
                    {time: 'afsgagydgysgeggey', nickName: '小红', pic: '', amount: 1000, detail: '提取', aboutUsers: '老李'},
                    {time: 'afsgagydgysgeggey', nickName: '小红', pic: '', amount: 1000, detail: '提取', aboutUsers: '老李'},


                ],
                info: [],
                txcount: 0,
                currentPage: 1,
                nowPageSize: 10,
                currentPageDetail: 1,
                nowPageSizeDetail: 10,
                txcountDetail: 0,
                activeName: '3',
                searchInfo: "",
                // innerVisible:false,
                dialogVisible: false,
                dialogTableVisible: false,
                dialogFormVisible: false,
                formLabelWidth: '120px',
                form: {remark: ''},
                multipleSelection: [],
                deleteIds: [],
                // result:'',
                // remarks:''
            };
        },
        created() {
            this.$ajax({
                method: "POST",
                url: BaseUrl + 'blacklist/scan',
                data: {type: 1},
                headers: {'token': sessionStorage.getItem('token')}
            }).then(response => {
                if (response.data.flag == 200) {
                    this.$ajax({
                        method: "POST",
                        url: BaseUrl + 'blacklist/scan',
                        data: {type: 2},
                        headers: {'token': sessionStorage.getItem('token')}
                    }).then(res => {
                        if (res.data.flag == 200) {
                            this.getData()
                        } else if (res.data.flag == 201) {
                            this.$alert(res.data.msg + '，请重新登录', '提示', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    this.$router.push('/')
                                }
                            });
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
            // this.getData();
        },
        components: {
            headTop
        },
        methods: {
            // scanning(){
            //     this.$ajax({
            //         method: "POST",
            //         url: BaseUrl+'blacklist/scan',
            //         data:{type:1},
            //         headers: {'token': sessionStorage.getItem('token')}
            //     }).then(response => {
            //         if(response.data.flag==200){
            //             this.$ajax({
            //                 method: "POST",
            //                 url: BaseUrl+'blacklist/scan',
            //                 data:{type:2},
            //                 headers: {'token': sessionStorage.getItem('token')}
            //             }).then(res => {
            //                 if(res.data.flag==200){
            //                     this.getData()
            //                 }else if(res.data.flag==201) {
            //                     this.$alert(res.data.msg + '，请重新登录', '提示', {
            //                         confirmButtonText: '确定',
            //                         callback: action => {
            //                             this.$router.push('/')
            //                         }
            //                     });
            //                 }
            //             });
            //
            //         }else if(response.data.flag==201) {
            //             this.$alert(response.data.msg + '，请重新登录', '提示', {
            //                 confirmButtonText: '确定',
            //                 callback: action => {
            //                     this.$router.push('/')
            //                 }
            //             });
            //         }
            //     });
            //
            // },
            changeState() {
                this.currentPage = 1;
                this.getData()
            },
            getData() {
                this.$ajax({
                    method: "POST",
                    url: BaseUrl + 'blacklist/query',
                    data: {
                        page: this.currentPage,
                        size: this.nowPageSize,
                        dstate: this.activeName == 3 ? undefined : Number(this.activeName),
                        keyword: this.searchInfo == '' ? undefined : this.searchInfo
                    },
                    headers: {'token': sessionStorage.getItem('token')}
                }).then(response => {
                    if (response.data.flag == 200) {
                        this.info = response.data.data.data;
                        this.txcount = response.data.data.count;
                        this.info.forEach(item => {
                            if (item.dstate == '1') {
                                item.checkResult = '待定'
                            } else if (item.dstate == '2') {
                                item.checkResult = '黑名单';
                            } else if (item.dstate == '0') {
                                item.checkResult = '白名单'
                            }
                            if (item.name === undefined) {
                                item.realNameState = '未实名'
                            } else {
                                item.realNameState = '已实名'
                            }
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
            searchCheck(searchInfo) {
                this.searchInfo = searchInfo;
                this.currentPage = 1;
                this.getData()
            },
            handleSizeChange(pageSize) {
                // console.log(">>>>>>pageSize", pageSize);
                this.nowPageSize = pageSize;
                this.currentPage = 1;
                // const listParams = {
                //     activeName: this.activeName,
                //     pageValue: 1,
                //     pageSize: pageSize
                // };
                this.getData();
            },
            handleCurrentChange(pageValue) {
                // console.log(">>>>>>pageValue", pageValue);
                this.currentPage = pageValue;
                this.getData();
            },
            handleSelectionChange(val) {
                this.multipleSelection = val
                this.deleteIds = [];
                for (let i = 0; i < this.multipleSelection.length; i++) {
                    this.deleteIds.push(this.multipleSelection[i].id)
                }
            },
            deleteAllUserBlack() {
                if (this.deleteIds.length == 0) {
                    this.$alert('请勾选用户', '提示', {
                        confirmButtonText: '确定',
                    });
                } else {
                    this.dialogVisible = true
                }
            },
            ensureDelete() {
                this.$ajax({
                    method: "POST",
                    url: BaseUrl + 'blacklist/delete',
                    data: this.deleteIds,
                    headers: {'token': sessionStorage.getItem('token')}
                }).then(response => {
                    this.dialogVisible = false
                    if (response.data.flag == 200) {
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
            abnormalRecords() {
                this.dialogTableVisible = true

            },
            handleDetailSizeChange() {

            },
            handleDetailCurrentChange() {

            },
            update(id, phone, state) {
                this.form = {remark: ''};
                this.form.id = id;
                this.form.phone = phone;
                this.form.state = state;
                this.dialogFormVisible = true
            },
            saveBlackState() {
                this.$ajax({
                    method: "POST",
                    url: BaseUrl + 'blacklist/update',
                    data: this.form,
                    headers: {'token': sessionStorage.getItem('token')}
                }).then(response => {
                    this.dialogFormVisible = false
                    if (response.data.flag == 200) {
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
            }
        }
    };
</script>

<style lang="less" scoped>
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


</style>
