<template>
    <div>
        <el-row style="">
            <el-col :span="22" style="margin: 20px">
                <el-form class="form food_form">
                    <div>
                        <div style="display: flex;margin-bottom: 20px;">
                            <h4>IA奖励用户：</h4>
                        </div>
                        <el-form-item style="margin-bottom: 0px!important;">
                            <div style="letter-spacing: 1px;margin-bottom:5px;display:inline-block">
                                平台收益余额：{{platformData|MoneyFormat}} IA
                            </div>
                            <div style="letter-spacing: 1px;margin-bottom:5px;display:inline-block;margin-left: 20px">
                                累计奖励：{{iaTotal|MoneyFormat}} IA
                            </div>
                        </el-form-item>
                        <div style="display: flex">
                            <el-form-item label="奖励金额：" style="display: flex;width:400px">
                                <el-input style="width:200px" type="number" min="1" v-model="money"></el-input>
                                IA
                            </el-form-item>
                            <el-form-item label="奖励说明：" style="display: flex;width:360px;">
                                <el-input style="width:200px" v-model="remarkIa"></el-input>
                            </el-form-item>
                            <el-form-item label="">
                                <el-button type="primary" @click="rewardUsers(money,remarkIa)">奖励用户</el-button>
                            </el-form-item>
                        </div>
                        <!--<el-form-item label="" >-->
                        <!--<el-button type="primary" @click="rewardUsers(money)">奖励用户</el-button>-->
                        <!--</el-form-item>-->
                    </div>
                    <div style="display: flex;margin-bottom: 20px;">
                        <h4>奖励用户记录：</h4>
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
                            label="奖励金额"
                        >
                            <template scope="scope">
                                {{scope.row.amount|MoneyFormat}}
                            </template>
                        </el-table-column>
                        <el-table-column
                            align="center"
                            label="状态"
                            prop="state">
                        </el-table-column>
                    </el-table>
                    <div class="Pagination">
                        <el-pagination
                            @size-change="handleSizeChangeIA"
                            @current-change="handleCurrentChangeIA"
                            :current-page="currentPageIA"
                            :page-size="nowPageSizeIA"
                            :page-sizes="[5, 10, 20, 40]"
                            :total="txcountIA"
                            layout="total, sizes, prev, pager, next, jumper"
                        >
                        </el-pagination>
                    </div>
                    <div style="margin-top: 20px">
                        <div style="display: flex;margin-bottom: 20px;">
                            <h4>BCD奖励用户：</h4>
                        </div>
                        <el-form-item style="margin-bottom: 0!important;">
                            <div style="letter-spacing: 1px;margin-bottom:5px;;display:inline-block">
                                平台收益余额：{{bcdEarn|MoneyFormat}} BCD
                            </div>
                            <div style="letter-spacing: 1px;margin-bottom:5px;;display:inline-block;margin-left: 20px;">
                                累计奖励：{{bcdTotal|MoneyFormat}} BCD
                            </div>
                        </el-form-item>
                        <div style="display: flex">
                            <el-form-item label="奖励金额：" style="display: flex;width:400px">
                                <el-input style="width:200px" type="number" min="1" v-model="moneyBcd"></el-input>
                                BCD
                            </el-form-item>
                            <el-form-item label="奖励说明：" style="display: flex;width:360px">
                                <el-input style="width:200px" v-model="remarkBcd"></el-input>
                            </el-form-item>
                            <el-form-item label="">
                                <el-button type="primary" @click="rewardUsersBcd(moneyBcd,remarkBcd)">奖励用户</el-button>
                            </el-form-item>
                        </div>

                    </div>
                </el-form>
                <div style="display: flex;margin-bottom: 20px;">
                    <h4>奖励用户记录：</h4>
                </div>
                <el-table
                    :data="tableBcdData"
                    style="width: 100%;">
                    <el-table-column
                        align="center"
                        label="时间"
                        prop="createDate">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        label="奖励金额"
                    >
                        <template scope="scope">
                            {{scope.row.amount|MoneyFormat}}
                        </template>
                    </el-table-column>
                </el-table>
                <div class="Pagination">
                    <el-pagination
                        @size-change="handleSizeChangeBcd"
                        @current-change="handleCurrentChangeBcd"
                        :current-page="currentPageBcd"
                        :page-size="nowPageSizeBcd"
                        :page-sizes="[5, 10, 20, 40]"
                        :total="txcountBcd"
                        layout="total, sizes, prev, pager, next, jumper"
                    >
                    </el-pagination>
                </div>
                <el-dialog title="请输入平台收益账户密码" :visible.sync="ensureVisible">
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
    import headTop from "@/components/headTop";
    import {getCategory, addCategory, addFood} from "@/api/getData";
    import {baseUrl, baseImgPath} from "@/config/env";
    import Vue from "vue";

    let moment = require("moment");
    export default {
        data() {
            return {
                money: '',
                remarkIa: '',
                remarkBcd: '',
                type: '',
                passWord: '',
                ensureVisible: false,
                tableData: [],
                tableBcdData: [],
                txcountIA: 0,
                currentPageIA: 1,
                nowPageSizeIA: 10,
                txcountBcd: 0,
                currentPageBcd: 1,
                nowPageSizeBcd: 10,
                moneyBcd: '',
                formLabelWidth: '110px',
                platformData: sessionStorage.getItem('platformData'),
                bcdEarn: sessionStorage.getItem('bcdEarn'),
                bcdTotal: '',
                iaTotal: ''
            };
        },
        components: {},
        created() {
            this.$ajax({
                method: "POST",
                url: BaseUrl + 'bcdWallet/rewardTotal',
                headers: {'token': sessionStorage.getItem('token')}
            }).then(response => {
                if (response.data.flag === 200) {
                    this.bcdTotal = response.data.data.total
                } else if (response.data.flag == 201) {
                    this.$alert(response.data.msg + '，请重新登录', '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$router.push('/')
                        }
                    });
                }
            });
            this.$ajax({
                method: "POST",
                url: BaseUrl + 'imwallet/rewardTotal',
                headers: {'token': sessionStorage.getItem('token')}
            }).then(response => {
                if (response.data.flag === 200) {
                    this.iaTotal = response.data.data.total
                } else if (response.data.flag == 201) {
                    this.$alert(response.data.msg + '，请重新登录', '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$router.push('/')
                        }
                    });
                }
            });
            this.getData()
            this.getDataBcd()
        },
        computed: {},
        methods: {
            getData() {
                this.$ajax({
                    method: "POST",
                    url: BaseUrl + 'imwallet/rewardBill',
                    params: {page: this.currentPageIA, size: this.nowPageSizeIA},
                    headers: {'token': sessionStorage.getItem('token')}
                }).then(response => {
                    if (response.data.flag == 200) {
                        this.tableData = response.data.data.data;
                        this.txcountIA = response.data.data.count
                        this.tableData.forEach(item => {
                            item.ctime = moment.utc(item.ctime).local().format('YYYY-MM-DD HH:mm:ss')
                        })
                        this.tableData.forEach(item => {
                            if (item.etime == undefined) {
                                item.state = '正在处理'
                            } else {
                                item.state = '已完成'
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
                })
            },
            getDataBcd() {
                this.$ajax({
                    method: "POST",
                    url: BaseUrl + 'bcdWallet/rewardBill',
                    params: {page: this.currentPageBcd, size: this.nowPageSizeBcd},
                    headers: {'token': sessionStorage.getItem('token')}
                }).then(response => {
                    if (response.data.flag == 200) {
                        this.tableBcdData = response.data.data.data;
                        this.txcountBcd = response.data.data.count
                        this.tableBcdData.forEach(item => {
                            item.createDate = moment.utc(item.ctime).local().format('YYYY-MM-DD HH:mm:ss')
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
            handleSizeChangeIA(pageSize) {
                this.nowPageSizeIA = pageSize;
                this.getData();
            },
            handleCurrentChangeIA(pageValue) {
                this.currentPageIA = pageValue;
                this.getData();
            },
            handleSizeChangeBcd(pageSize) {
                this.nowPageSizeBcd = pageSize;
                this.getDataBcd();
            },
            handleCurrentChangeBcd(pageValue) {
                this.currentPageBcd = pageValue;
                this.getDataBcd();
            },
            rewardUsers(money) {
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
                    this.type = 'IA';
                    this.ensureVisible = true;
                }

            },
            rewardUsersBcd(money) {
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
                    this.type = 'BCD';
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
                    if (this.type == 'IA') {
                        this.$ajax({
                            method: "POST",
                            url: BaseUrl + 'imwallet/rewardUser',
                            params: {
                                amount: Number(this.money),
                                remark: this.remarkIa,
                                password: passWord
                            },
                            headers: {'token': sessionStorage.getItem('token')}
                        }).then(response => {
                            if (response.data.flag == 500) {
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
                            } else if (response.data.flag == 200) {
                                this.remarkIa = '';
                                this.money = ''
                                var t;
                                clearTimeout(t)
                                var that = this
                                t = setTimeout(function () {
                                    that.$alert(response.data.msg, {
                                        confirmButtonText: '确定',
                                        callback: action => {
                                            that.getData();
                                            that.$ajax({
                                                method: "POST",
                                                url: BaseUrl + 'imwallet/incomeBalance',
                                                headers: {'token': sessionStorage.getItem('token')}
                                            }).then(response => {
                                                that.platformData = response.data.data.data;
                                                sessionStorage.setItem('platformData', this.platformData)

                                            });
                                            that.$ajax({
                                                method: "POST",
                                                url: BaseUrl + 'bcdWallet/rewardTotal',
                                                headers: {'token': sessionStorage.getItem('token')}
                                            }).then(response => {
                                                that.bcdTotal = response.data.data.total
                                            });
                                            that.ensureVisible = false
                                        }
                                    });
                                }, 1000);


                            } else if (response.data.flag == 201) {
                                this.$alert(response.data.msg + '，请重新登录', '提示', {
                                    confirmButtonText: '确定',
                                    callback: action => {
                                        this.$router.push('/')
                                    }
                                });
                            }

                        });
                    } else if (this.type == 'BCD') {
                        this.$ajax({
                            method: "POST",
                            url: BaseUrl + 'bcdWallet/rewardUser',
                            params: {
                                amount: Number(this.moneyBcd),
                                password: passWord,
                                remark: this.remarkBcd
                            },
                            headers: {'token': sessionStorage.getItem('token')}
                        }).then(response => {
                            if (response.data.flag == 500) {
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
                            } else if (response.data.flag == 200) {
                                this.remarkBcd = ''
                                this.bcdEarn = this.bcdEarn - Number(this.moneyBcd)
                                this.bcdTotal = this.bcdTotal + Number(this.moneyBcd)
                                this.moneyBcd = ''
                                this.getDataBcd()
                                this.$alert(response.data.msg, {
                                    confirmButtonText: '确定',
                                    callback: action => {
                                        this.ensureVisible = false
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
                        })
                    }
                }
            }
        },

    };
</script>

<style lang="less" scoped>
    @import "../style/mixin";
</style>
