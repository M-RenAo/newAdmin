<template>
    <div>
        <div class="table_container">
            <el-card class="box-card">
                <div style="font-weight: 700;letter-spacing: 1px;margin-bottom:5px">平台收益余额：{{bcdEarnMoney|MoneyFormat}} BCD</div>
                <!--<div style="letter-spacing: 1px;font-size: 14px">已奖励用户：{{rewordMoney}}IA</div>-->
            </el-card>
            <el-form style="margin-top: 20px">
            <el-form-item label="收益金额：">
                <el-input style="width:200px" type="number" min="1" v-model="money"></el-input> BCD
            </el-form-item>
                <el-form-item label="收益说明：">
                    <el-input style="width:200px" type="textarea" :row="3" min="1" v-model="detail"></el-input>
                </el-form-item>
            <el-form-item label="" >
                <el-button type="primary" @click="bcdEarn(money)">确定打入</el-button>
            </el-form-item>
            </el-form>
            <el-table
                :data="tableData"
                style="width: 100%"
            >
                <el-table-column
                    label="时间"
                    prop="ctime">
                </el-table-column>
                <el-table-column
                    label="收益金额（BCD）"
                    prop="amount">
                </el-table-column>
                <el-table-column
                    label="收益说明"
                    prop="remark">
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
            <el-dialog title="请输平台收益账户密码" :visible.sync="ensureVisible">
                <el-form  >
                    <el-form-item label="账户密码" :label-width="formLabelWidth" prop="title">
                        <el-input v-model="passWord" type="password" auto-complete="off"  style="width:80%"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="ensureVisible = false;">取 消</el-button>
                    <el-button type="primary" @click="ensurePut(passWord)">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>

</template>

<script>
    import {baseUrl, baseImgPath} from "@/config/env";
    import headTop from '../components/headTop'
    let moment =require('moment')
    export default {
        data() {
            return {
                id: '',
                passWord:'',
                tableData: [],
                startDate: '',
                endDate: '',
                platformData:'',
                state: '4',
                txcount: 0,
                currentPage: 1,
                nowPageSize: 10,
                ensureVisible:false,
                formLabelWidth: '120x',
                money:'',
                detail:'',
                bcdEarnMoney:''
            };
        },
        components: {
            headTop
        },
        created() {
            this.$ajax({
                method: "POST",
                url:  BaseUrl+'bcdWallet/incomeBalance',
                headers: {'token': sessionStorage.getItem('token')}
            }).then(response=>{
                if(response.data.flag==200){
                this.bcdEarnMoney=response.data.data.data;
                sessionStorage.setItem('bcdEarn', this.bcdEarnMoney)
                } else if(response.data.flag==201) {
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
            //     url:  BaseUrl+'imwallet/getallassetaccount',
            //     headers: {'token': sessionStorage.getItem('token')}
            // }).then(response=>{
            //     this.platformData=response.data.data.incomeBalance;
            //     sessionStorage.setItem('platformData', this.platformData)
            //
            // });
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
                    url: BaseUrl+'bcdWallet/incomeBill',
                    params: form,
                    headers:{'token':sessionStorage.getItem('token')}
                }).then(response => {
                    if(response.data.flag==200){
                    this.tableData = response.data.data.billList;
                    this.txcount = response.data.data.total
                    this.tableData.forEach(item => {
                        item.ctime=moment.utc(item.ctime).local().format('YYYY-MM-DD HH:mm:ss')
                    });
                    }else if(response.data.flag==201){
                        this.$alert(response.data.msg+'，请重新登录', '提示', {
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
                this.getData({pageCode:1, pageSize: this.nowPageSize});
            },
            handleCurrentChange(pageValue) {
                // console.log(">>>>>>pageValue", pageValue);
                this.currentPage = pageValue;
                this.getData({pageCode:this.currentPage, pageSize: this.nowPageSize});
            },
            // trumpet(id) {
            //     this.trumpetFormVisible = true
            // },
            // GMTToStr(time) {
            //     var date = time;
            //     var Y = date.getFullYear();
            //     var M = date.getMonth() + 1;
            //     M = M < 10 ? '0' + M : M;// 不够两位补充0
            //     var D = date.getDate();
            //     D = D < 10 ? '0' + D : D;
            //     var H = date.getHours();
            //     H = H < 10 ? '0' + H : H;
            //     var Mi = date.getMinutes();
            //     Mi = Mi < 10 ? '0' + Mi : Mi;
            //     var S = date.getSeconds();
            //     S = S < 10 ? '0' + S : S;
            //     return Y + '-' + M + '-' + D + ' ' + H + ':' + Mi + ':' + S;
            //
            // },
            // search(searchForm) {
            //     if (this.startDate != '') {
            //         searchForm.st1 = this.GMTToStr(this.startDate[0]);
            //         searchForm.st2 = this.GMTToStr(this.startDate[1])
            //     }
            //     if (this.endDate != '') {
            //         searchForm.et1 = this.GMTToStr(this.endDate[0]);
            //         searchForm.et2 = this.GMTToStr(this.endDate[1])
            //     }
            //     if (this.state == 4) {
            //         searchForm.state = null
            //     } else {
            //         searchForm.state = this.state
            //     }
            //     searchForm.page = 1;
            //     searchForm.size = this.nowPageSize || 10;
            //     searchForm.order="startDate desc"
            //     this.getData(searchForm)
            // },
            // toggleSelection(rows) {
            //     if (rows) {
            //         rows.forEach(row => {
            //             this.$refs.multipleTable.toggleRowSelection(row);
            //         });
            //     } else {
            //         this.$refs.multipleTable.clearSelection();
            //     }
            // },
            bcdEarn(money){
                this.passWord='';
                if(money==''||money==undefined){
                    this.$alert('请填写金额', '提示',{
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$message({
                                type: 'info',
                                message: `请重试！`
                            });
                        }
                    });
                    return false;
                }else{
                    this.ensureVisible=true;
                }
            },
            ensurePut(password){
                // console.log(typeof(this.money))
                if(password==''||password==undefined){
                    this.$alert('请填写密码','提示',{
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$message({
                                type: 'info',
                                message: `请重试！`
                            });
                        }
                    });
                    return false;
                }else{
                    this.$ajax({
                        method: "POST",
                        url:BaseUrl+'bcdWallet/transfer',
                        params: {
                            amount:Number(this.money),
                            key:password,
                            detail:this.detail,
                            userId:'bcdotalasset1a1386494d429e06ffff'
                        },
                        headers: {'token': sessionStorage.getItem('token')}
                    }).then(response => {
                        if (response.data.flag == 500) {
                            this.$alert(response.data.msg,'提示',{
                                confirmButtonText: '确定',
                                callback: action => {
                                    this.$message({
                                        type: 'info',
                                        message: `请重试！`
                                    });
                                }
                            });
                            return false;
                        } else if(response.data.flag==200){
                            this.bcdEarnMoney=this.bcdEarnMoney+this.money;
                            this.getData({pageCode: this.currentPage, pageSize: this.nowPageSize})
                            this.money=''
                            this.detail=''
                            this.$alert('转账成功', '提示',{
                                confirmButtonText: '确定',
                                callback: action=>{this.ensureVisible = false}
                            });


                        }else if(response.data.flag==201){
                            this.ensureVisible = false
                            this.$alert(response.data.msg+'，请重新登录', '提示', {
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
