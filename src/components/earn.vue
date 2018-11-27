<template>
    <div>
        <div class="table_container">
            <el-card class="box-card">
                <div style="font-weight: 700;letter-spacing: 1px;display: flex;align-items: center">
                    <el-col :span="12"><span>平台收益余额：{{platformData|MoneyFormat}} IA</span></el-col>
                    <el-col :span="12">
                        <el-button style="float: right" @click="modifyPlatfrom()" type="primary">修改平台收益账户密码</el-button>
                    </el-col>

                </div>
                <!--<div style="letter-spacing: 1px;font-size: 14px">已奖励用户：{{rewordMoney}}IA</div>-->
            </el-card>
            <!--<el-row type="flex" style="margin-bottom: 30px;margin-top: 20px">-->
            <!--<el-col :span="19" style="display:flex;height: auto;word-break:break-all;flex:1;padding-left:5px;">-->
            <!--<div style="display:inline-block">-->
            <!--<div style="display: inline-block">-->
            <!--<span style="font-size: 14px;width:80px;">时间：</span>-->
            <!--<el-date-picker-->
            <!--v-model="startDate"-->
            <!--type="datetimerange"-->
            <!--align="right"-->
            <!--:default-time="['12:00:00', '08:00:00']">-->
            <!--</el-date-picker>-->
            <!--</div>-->
            <!--</div>-->
            <!--</el-col>-->
            <!--<div style="float:right">-->
            <!--<el-button type="primary" style="margin-right:10px;margin-bottom:2px;"-->
            <!--@click="search(searchForm)">搜索-->
            <!--</el-button>-->
            <!--&lt;!&ndash;<el-button type="primary" style="margin-left:0">导出</el-button>&ndash;&gt;-->
            <!--</div>-->
            <!--</el-row>-->
            <el-table
                :data="tableData"
                style="width: 100%"
            >
                <el-table-column
                    label="时间"
                    prop="ctime">
                </el-table-column>
                <el-table-column
                    label="收益来源"
                    prop="remark">
                </el-table-column>
                <el-table-column
                    label="收益（IA）"
                    prop="amount">
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
            <el-dialog title="请输入平台收益账户密码" :visible.sync="dialogFormVisible">
                <el-form>
                    <el-form-item label="账户密码" :label-width="formLabelWidth" prop="title">
                        <el-input v-model="oldPass" type="password" auto-complete="off" style="width:80%"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false;">取 消</el-button>
                    <el-button type="primary" @click="ensure(oldPass)">确 定</el-button>
                </div>
            </el-dialog>
            <el-dialog title="请输入平台收益新账户密码" :visible.sync="newFormVisible">
                <el-form>
                    <el-form-item label="新账户密码" :label-width="formLabelWidth" prop="title">
                        <el-input v-model="newPass" type="password" auto-complete="off" style="width:80%"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="newFormVisible = false;">取 消</el-button>
                    <el-button type="primary" @click="ensureNew(newPass)">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>

</template>

<script>
    import {baseUrl, baseImgPath} from "@/config/env";
    import headTop from '../components/headTop'

    let moment = require('moment')
    export default {
        data() {
            return {
                id: '',
                tableData: [],
                startDate: '',
                endDate: '',
                platformData: '',
                state: '4',
                txcount: 0,
                currentPage: 1,
                nowPageSize: 10,
                dialogFormVisible: false,
                newFormVisible: false,
                formLabelWidth: '120x',
                oldPass: '',
                newPass: '',
                rewordMoney: ''
            };
        },
        components: {
            headTop
        },
        created() {
            this.$ajax({
                method: "POST",
                url: BaseUrl + 'imwallet/incomeBalance',
                headers: {'token': sessionStorage.getItem('token')}
            }).then(response => {
                if (response.data.flag == 200) {
                    this.platformData = response.data.data.data;
                    sessionStorage.setItem('platformData', this.platformData)
                } else if (response.data.flag == 201) {
                    this.$alert(response.data.msg + '，请重新登录', '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$router.push('/')
                        }
                    });
                }

            });
            // this.$ajax({
            //     method: "POST",
            //     url: 'http://10.82.40.141:36788/admin/imwallet/rewardusertotalamount',
            //     headers: {'token': sessionStorage.getItem('token')}
            // }).then(response=>{
            //     this.rewordMoney=response.data.data
            // });
            const form = {pageCode: this.currentPage, pageSize: this.nowPageSize}
            this.getData(form)
        },
        computed: {},
        methods: {
            getData(form) {
                this.$ajax({
                    method: "POST",
                    url: BaseUrl + 'imwallet/incomebill',
                    params: form,
                    headers: {'token': sessionStorage.getItem('token')}
                }).then(response => {
                    if (response.data.flag == 200) {
                        this.tableData = response.data.data.data;
                        this.tableData.forEach(item => {
                            item.ctime = moment.utc(item.ctime).local().format('YYYY-MM-DD HH:mm:ss')
                        })
                        this.txcount = response.data.data.total
                    } else if (response.data.flag == 201) {
                        this.$alert(response.data.msg + '，请重新登录', '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$router.push('/')
                            }
                        });
                    }
                    // this.tableData.forEach(item => {
                    //     item.results = JSON.parse(item.result).A + JSON.parse(item.result).B;
                    //     if (item.state == 1) {
                    //         item.status = '进行中'
                    //     } else if (item.state == 0) {
                    //         item.status = '已结束'
                    //     } else if (item.state == 2) {
                    //         item.status = '待开奖'
                    //     } else {
                    //         item.status = '未开始'
                    //     }
                    // });
                });
            },
            handleSizeChange(pageSize) {
                // console.log(">>>>>>pageSize", pageSize);
                this.nowPageSize = pageSize;
                // if (this.searchForm == '') {
                var listParams = {
                    papageCodege: 1,
                    pageSize: pageSize,

                };
                // } else {
                //     this.searchForm.page = 1;
                //     this.searchForm.size = pageSize
                //     this.searchForm.order="startDate desc"
                //     var listParams = this.searchForm
                // }
                this.getData(listParams);
            },
            handleCurrentChange(pageValue) {
                // console.log(">>>>>>pageValue", pageValue);
                this.currentPage = pageValue;
                // if (this.searchForm == '') {
                var listParams = {
                    pageCode: pageValue,
                    pageSize: this.nowPageSize || 10,
                };
                // } else {
                //     this.searchForm.page = pageValue;
                //     this.searchForm.size = this.nowPageSize || 10;
                //     this.searchForm.order="startDate desc"
                //     var listParams = this.searchForm
                // }
                //
                this.getData(listParams);
            },
            modifyPlatfrom() {
                this.oldPass = '';
                this.newPass = '';
                this.dialogFormVisible = true
            },
            ensure(oldPass) {
                if (oldPass == '' || oldPass == undefined) {
                    this.$alert('请填写密码', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$message({
                                type: 'info',
                                message: `请重试！`
                            });
                        }
                    });
                    return false;
                } else {
                    this.dialogFormVisible = false;
                    this.newFormVisible = true;

                }
            },
            ensureNew(newPass) {
                if (newPass == '' || newPass == undefined) {
                    this.$alert('请填写新密码', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$message({
                                type: 'info',
                                message: `请重试！`
                            });
                        }
                    });
                    return false;
                } else {
                    this.$ajax({
                        method: "POST",
                        url: BaseUrl + 'imwallet/modifypassword',
                        params: {type: 'income', newPassword: newPass, oldPassword: this.oldPass},
                        headers: {'token': sessionStorage.getItem('token')}
                    }).then(response => {
                        // console.log(response)
                        if (response.data.msg == '旧密码错误') {
                            this.$alert('旧密码错误', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    this.$message({
                                        type: 'info',
                                        message: `请重试！`
                                    });
                                }
                            });
                            return false;
                        } else if (response.data.flag == '500' && response.data.msg != '旧密码错误') {
                            this.$alert('修改失败', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    this.$message({
                                        type: 'info',
                                        message: `请重试！`
                                    });
                                }
                            });
                            return false;
                        } else if (response.data.flag == 200) {
                            this.$alert('修改密码成功', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    this.newFormVisible = false
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
            }
        },

    };
</script>

<style lang="less" scoped>
    @import "../style/mixin";

    .table_container {
        padding: 20px;
    }

    .littleButton {
        padding: 5px 10px !important;
        margin-left: 0 !important;
    }
</style>
