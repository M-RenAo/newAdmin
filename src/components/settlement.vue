<template>
    <div>
        <el-row style="">
            <el-col :span="20" style="margin: 20px">
                <el-form class="form food_form">
                    <div>
                        <div style="display: flex;margin-bottom: 20px;">
                            <h4>竞猜账户余额：{{quizAmount.balance|MoneyFormat}} IA</h4>
                        </div>
                        <el-form-item>
                            <div style="font-weight:600;letter-spacing: 1px;margin-bottom:5px">
                                竞猜收益余额：{{quizAmount.allIncome|MoneyFormat}} IA
                            </div>
                        </el-form-item>
                        <el-form-item label="结算至平台收益账户：">
                        </el-form-item>
                        <el-form-item label="结算金额：">
                            <el-input style="width:200px" type="number" min="1" v-model="money"></el-input>
                            IA
                        </el-form-item>
                        <el-form-item label="">
                            <el-button type="primary" @click="settlement(money)">结算</el-button>
                        </el-form-item>
                    </div>
                </el-form>
                <div style="display: flex;margin-bottom: 20px;">
                    <h4>结算记录：</h4>
                </div>
                <el-table
                    :data="tableData"
                    style="width: 100%;">
                    <el-table-column
                        align="center"
                        label="时间"
                        prop="ctime">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        label="结算金额（IA）"
                    >
                        <template scope="scope">
                            {{scope.row.amount|MoneyFormat}}
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
                <el-dialog title="请输入竞猜账户密码" :visible.sync="ensureVisible">
                    <el-form>
                        <el-form-item label="账户密码" :label-width="formLabelWidth" prop="title">
                            <el-input v-model="passWord" type="password" auto-complete="off"
                                      style="width:80%"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="ensureVisible = false;">取 消</el-button>
                        <el-button type="primary" @click="ensureReward(passWord)">确 定</el-button>
                    </div>
                </el-dialog>
            </el-col>
        </el-row>
    </div>

</template>

<script>
    import {getCategory, addCategory, addFood} from "@/api/getData";
    import {baseUrl, baseImgPath} from "@/config/env";

    let moment = require('moment')
    export default {
        data() {
            return {
                money: '',
                quizAmount: {},
                passWord: '',
                ensureVisible: false,
                tableData: [],
                txcount: 0,
                currentPage: 1,
                nowPageSize: 10,
                formLabelWidth: '110px'
            };
        },
        components: {},
        created() {
            this.$ajax({
                method: "POST",
                url: BaseUrl + 'imwallet/appwalletinfo',
                params: {type: '2341a6e2c53d4ed182bd35bee0ddce84'},
                headers: {'token': sessionStorage.getItem('token')}
            }).then(response => {
                if (response.data.flag == 200) {
                    this.quizAmount = response.data.data;
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
            //     // method: "POST",
            //     // url:  'http://10.82.40.148:36788/chaincity/admin/guess/getById',
            //     // data: {id:Number(this.$route.query.id)},
            //     // headers: {'token': sessionStorage.getItem('token')}
            // }).then(response=>{
            // });
            const form = {page: this.currentPage, size: this.nowPageSize, from: '2341a6e2c53d4ed182bd35bee0ddce84'}
            this.getData(form)
        },
        computed: {},
        methods: {
            getData(form) {
                this.$ajax({
                    method: "POST",
                    url: BaseUrl + 'imwallet/appIncomeBill',
                    params: form,
                    headers: {'token': sessionStorage.getItem('token')}
                }).then(response => {
                    if (response.data.flag == 200) {
                        this.tableData = response.data.data.data;
                        this.txcount = response.data.data.count;
                        this.tableData.forEach(item => {
                            item.ctime = moment.utc(item.ctime).local().format('YYYY-MM-DD HH:mm:ss')
                        })
                    } else if (response.data.flag == 201) {
                        this.$alert(response.data.msg + '，请重新登录', '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$router.push('/')
                            }
                        });
                    }
                })
            },
            handleSizeChange(pageSize) {
                // console.log(this.searchForm)
                // console.log(">>>>>>pageSize", pageSize);
                this.nowPageSize = pageSize;
                // if (this.searchForm.phone == undefined&&this.searchForm.anwser==undefined) {
                //     var listParams = {
                //         page: 1,
                //         size: pageSize,
                //         order:"date desc"
                //     };
                // } else {
                //     this.searchForm.index = 1;
                //     this.searchForm.size = pageSize
                //     var listParams = this.searchForm
                // }
                this.getData({page: 1, size: this.nowPageSize, from: '2341a6e2c53d4ed182bd35bee0ddce84'});
            },
            handleCurrentChange(pageValue) {
                // console.log(">>>>>>pageValue", pageValue);
                this.currentPage = pageValue;
                // if (this.searchForm.phone == undefined&&this.searchForm.anwser==undefined) {
                //     var listParams = {
                //         page: pageValue,
                //         size: this.nowPageSize || 10,
                //         order:"date desc"
                //     };
                // } else {
                //     this.searchForm.index = pageValue;
                //     this.searchForm.size = this.nowPageSize || 10;
                //     var listParams = this.searchForm
                // }
                this.getData({
                    page: this.currentPage,
                    size: this.nowPageSize,
                    from: '2341a6e2c53d4ed182bd35bee0ddce84'
                });
            },
            settlement(money) {
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
                    this.ensureVisible = true;
                }

            },
            ensureReward(passWord) {
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
                        url: BaseUrlApp + 'transaction/transferAppToVendor',
                        data: {
                            amount: Number(this.money),
                            key: passWord,
                            appName: 'guess',
                            appId: '2341a6e2c53d4ed182bd35bee0ddce84',
                            assetId: 'iaincomeasset323434bc43b0a87ffff'
                        },
                        headers: {'token': sessionStorage.getItem('token')}
                    }).then(response => {
                        if (response.data.flag == 200) {
                            this.$ajax({
                                method: "POST",
                                url: BaseUrl + 'guess/guessIncome',
                                params: {
                                    amount: -Number(this.money),
                                    remark: '管理结算竞猜至平台收益账户',
                                    type: '竞猜结算转出'
                                },
                                headers: {'token': sessionStorage.getItem('token')}
                            }).then(response => {

                            })
                            this.quizAmount.balance = this.quizAmount.balance - this.money
                            this.$alert('转账成功', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    this.getData({
                                        page: this.currentPage,
                                        size: this.nowPageSize,
                                        from: '2341a6e2c53d4ed182bd35bee0ddce84'
                                    });
                                    this.ensureVisible = false;
                                }
                            });
                        } else if (response.data.flag == 1000) {
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
                            this.$alert(response.data.msg, {
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


</style>

