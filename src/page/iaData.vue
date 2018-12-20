<template>
    <div>
        <el-row style="margin-top: 20px;">
            <el-tabs style="padding-left:20px;padding-right: 20px" v-model="activeName">
                <el-tab-pane label="数据" name="first">
                    <div>统计时间：{{ctime}}</div>
                    <el-col :span="20" style="margin: 20px" v-if="activeName=='first'">
                        <el-form ref="iaData" label-width="200px" class="form food_form">
                            <div v-for="item in iaData">
                                <div v-for="(nitem,index) in item">
                                    <p style="font-size: 18px;">{{index}}</p>
                                    <div v-for="litem in nitem">
                                        <el-form-item v-for="(sitem,nindex) in litem" :label="nindex+'：'" prop="name">
                                            {{sitem|MoneyFormat}} {{index=='MINING'?'IA':index}}
                                        </el-form-item>
                                    </div>
                                </div>
                            </div>
                        </el-form>
                    </el-col>
                </el-tab-pane>
                <el-tab-pane label="操作" name="second">
                    <el-col :span="20" style="margin: 20px" v-if="activeName=='second'">
                        <el-form class="form food_form">
                            <div>
                                <el-form-item label="修改IA总资产账户密码：">
                                    <el-button type="primary" style="margin-right:10px;margin-bottom:2px;"
                                               @click="modifyPass">修改账户密码
                                    </el-button>
                                </el-form-item>
                                <el-form-item label="转账至竞猜账户：">
                                </el-form-item>
                                <el-form-item label="转账金额：">
                                    <el-input type="number" style="width:200px" min="1" v-model="money"></el-input>
                                    IA
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" style="margin-right:10px;margin-bottom:2px;"
                                               @click="transfer(money)">转账
                                    </el-button>
                                </el-form-item>
                            </div>
                        </el-form>
                        <el-dialog title="请输入IA总资产账户密码" :visible.sync="dialogFormVisible">
                            <el-form>
                                <el-form-item label="账户密码" :label-width="formLabelWidth" prop="title">
                                    <el-input v-model="oldPass" type="password" auto-complete="off"
                                              style="width:80%"></el-input>
                                </el-form-item>
                            </el-form>
                            <div slot="footer" class="dialog-footer">
                                <el-button @click="dialogFormVisible = false;">取 消</el-button>
                                <el-button type="primary" @click="ensure(oldPass)">确 定</el-button>
                            </div>
                        </el-dialog>
                        <el-dialog title="请输入IA总资产新账户密码" :visible.sync="newFormVisible">
                            <el-form>
                                <el-form-item label="新账户密码" :label-width="formLabelWidth" prop="title">
                                    <el-input v-model="newPass" type="password" auto-complete="off"
                                              style="width:80%"></el-input>
                                </el-form-item>
                            </el-form>
                            <div slot="footer" class="dialog-footer">
                                <el-button @click="newFormVisible = false;">取 消</el-button>
                                <el-button type="primary" @click="ensureNew(newPass)">确 定</el-button>
                            </div>
                        </el-dialog>
                        <el-dialog title="请输入IA总资产账户密码" :visible.sync="transferFormVisible">
                            <el-form>
                                <el-form-item label="账户密码" :label-width="formLabelWidth" prop="title">
                                    <el-input v-model="passWord" type="password" auto-complete="off"
                                              style="width:80%"></el-input>
                                </el-form-item>
                            </el-form>
                            <div slot="footer" class="dialog-footer">
                                <el-button @click="transferFormVisible = false;">取 消</el-button>
                                <el-button type="primary" @click="checkPass(passWord)">确 定</el-button>
                            </div>
                        </el-dialog>
                        <div style="display: flex;margin: 20px 0px;margin-left: 20px;">
                            <h4>转账记录：</h4>
                        </div>
                        <el-table
                            :data="tableData"
                            style="width: 100%"
                        >
                            <el-table-column
                                label="时间"
                                prop="date">
                            </el-table-column>
                            <el-table-column
                                label="详情"
                                prop="remark">
                            </el-table-column>
                            <el-table-column
                                label="转账金额（IA）"
                            >
                                <template scope="scope">
                                    {{scope.row.amount|MoneyFormat}}
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="Pagination" style="margin-left: 20px;">
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
                    </el-col>
                </el-tab-pane>
            </el-tabs>
        </el-row>
    </div>

</template>

<script>
    import headTop from "@/components/headTop";
    import {getCategory, addCategory, addFood} from "@/api/getData";
    import {baseUrl, baseImgPath} from "@/config/env";
    import Vue from "vue";

    let moment = require('moment')

    Vue.filter('MoneyFormat', function (money) {
        if (money && money != null) {
            money = String(money);
            var left = money.split('.')[0], right = money.split('.')[1];
            right = right ? '.' + right : '';
            var temp = left.split('').reverse().join('').match(/(\d{1,3})/g);
            return (Number(money) < 0 ? '-' : '') + temp.join(',').split('').reverse().join('') + right;
        } else if (money === 0) { // 注意===在这里的使用，如果传入的money为0,if中会将其判定为boolean类型，故而要另外做===判断
            return '0';
        } else {
            return '';
        }
    })

    export default {
        data() {
            return {
                iaData: {},
                activeName: 'first',
                dialogFormVisible: false,
                newFormVisible: false,
                transferFormVisible: false,
                oldPass: '',
                newPass: '',
                formLabelWidth: "110px",
                money: '',
                passWord: '',
                tableData: [],
                currentPage: 1,
                nowPageSize: 10,
                txcount: 0,
                ctime: ''
            };
        },
        components: {
            headTop
        },
        created() {
            this.$ajax({
                method: "POST",
                url: BaseUrl + 'imwallet/getAllAssetAccount',
                headers: {'token': sessionStorage.getItem('token')}
            }).then(response => {
                if (response.data.flag == 200) {
                    this.iaData = JSON.parse(response.data.data.data);
                    this.ctime = moment.utc(response.data.data.ctime).local().format('YYYY-MM-DD HH:mm:ss')
                } else if (response.data.flag == 201) {
                    this.$alert(response.data.msg + '，请重新登录', '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$router.push('/')
                        }
                    });
                }
            });

            const form = {
                appId: '2341a6e2c53d4ed182bd35bee0ddce84',
                pageCode: this.currentPage,
                pageSize: this.nowPageSize
            }
            this.getData(form)
        },
        computed: {},
        methods: {
            modifyPass() {
                this.dialogFormVisible = true;
                this.oldPass = '';
                this.newPass = ''
            },
            getData(form) {
                this.$ajax({
                    method: "POST",
                    url: BaseUrl + 'imwallet/transfertoapplist',
                    params: form,
                    headers: {'token': sessionStorage.getItem('token')}
                }).then(response => {
                    if (response.data.flag == 200) {
                        this.tableData = response.data.data.data;
                        this.tableData.forEach(item => {
                            item.date = moment.utc(item.date).local().format('YYYY-MM-DD HH:mm:ss')
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
                });
            },
            handleSizeChange(pageSize) {
                this.nowPageSize = pageSize;
                var listParams = {
                    pageCode: 1,
                    pageSize: pageSize,
                    appId: '2341a6e2c53d4ed182bd35bee0ddce84'
                };
                this.getData(listParams);
            },
            handleCurrentChange(pageValue) {
                this.currentPage = pageValue;
                var listParams = {
                    pageCode: pageValue,
                    pageSize: this.nowPageSize || 10,
                    appId: '2341a6e2c53d4ed182bd35bee0ddce84'
                }
                this.getData(listParams);
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
                        params: {type: 'all_asset', newPassword: newPass, oldPassword: this.oldPass},
                        headers: {'token': sessionStorage.getItem('token')}
                    }).then(response => {
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
                        } else if (response.data.flag == 201) {
                            this.$alert(response.data.msg + '，请重新登录', '提示', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    this.$router.push('/')
                                }
                            });
                        } else {
                            this.$alert('修改密码成功', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    this.newFormVisible = false
                                }
                            });
                        }

                    });
                }
            },
            //转账
            transfer(money) {
                this.passWord = '';
                if (money == '' || money == undefined) {
                    this.$alert('请填写金额', {
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
                    this.transferFormVisible = true;
                }
            },
            checkPass(passWord) {
                if (passWord == '' || passWord == undefined) {
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
                    this.$ajax({
                        method: "POST",
                        url: BaseUrlApp + 'transaction/transferVendorToApp',
                        data: {
                            password: passWord,
                            amount: Number(this.money),
                            appId: '2341a6e2c53d4ed182bd35bee0ddce84',
                            appName: 'guess'
                        },
                        headers: {'token': sessionStorage.getItem('token')}
                    }).then(response => {
                        if (response.data.flag == 200) {
                            this.transferFormVisible = false
                            this.$ajax({
                                method: "POST",
                                url: BaseUrl + 'guess/guessIncome',
                                params: {
                                    amount: Number(this.money),
                                    type: 'IA总资产转入',
                                    remark: '管理转入至竞猜帐户'
                                },
                                headers: {'token': sessionStorage.getItem('token')}
                            }).then(response => {
                                if (response.data.flag == 201) {
                                    this.$alert(response.data.msg + '请重新登录', '提示', {
                                        confirmButtonText: '确定',
                                        callback: action => {
                                            this.$router.push('/')
                                        }
                                    });
                                }
                            })
                            this.$alert('转账成功', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    this.getData({appId: '2341a6e2c53d4ed182bd35bee0ddce84', pageCode: 1, pageSize: 10})
                                }
                            });
                        } else if (response.data.msg == '密码错误') {
                            this.$alert('密码错误', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    this.$message({
                                        type: 'info',
                                        message: `请重试！`
                                    });
                                }
                            });
                            return false;

                        } else if (response.data.flag == 201) {
                            this.$alert(response.data.msg + '，请重新登录', '提示', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    this.$router.push('/')
                                }
                            });
                        } else {
                            this.$alert('转账失败', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    this.$message({
                                        type: 'info',
                                        message: `请重试！`
                                    });
                                }
                            });
                            return false;
                        }

                    });
                }
            }
        },

    };
</script>

<style lang="less" scoped>
    @import "../style/mixin";

    .el-form-item {
        margin-bottom: 0px !important;
    }

</style>
