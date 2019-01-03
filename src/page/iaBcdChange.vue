<template>
    <div>
        <div class="table_container">
            <!--<el-card class="box-card">-->
            <!--<span style="font-weight: 700;letter-spacing: 1px;">兑换成BCD消耗：{{iaData.bcdExchange}} IA</span>-->
            <!--</el-card>-->
            <el-row type="flex" style="margin-bottom: 30px;margin-top: 20px">
                <el-col :span="19" style="display:flex;height: auto;word-break:break-all;flex:1;">
                    <div style="display:inline-block">
                        <span style="font-size: 14px;width:80px;">姓名：</span>
                        <el-input v-model="searchForm.name" placeholder="请输入姓名" style="width:120px;"></el-input>
                        <span style="font-size: 14px;width:80px;">手机号：</span>
                        <el-input v-model="searchForm.phone" placeholder="请输入手机号" style="width:120px;"></el-input>
                        <span style="font-size: 14px;">状态：</span>
                        <el-select v-model="state" placeholder="请选择" style="width:100px;">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                        <div style="display: inline-block">
                            <span style="font-size: 14px;width:80px;">申请提取时间：</span>
                            <!--<el-date-picker-->
                            <!--v-model="searchForm.startDate"-->
                            <!--type="datetime"-->
                            <!--&gt;-->
                            <!--</el-date-picker>-->
                            <!--—-->
                            <!--<el-date-picker-->
                            <!--v-model="searchForm.endDate"-->
                            <!--type="datetime"-->
                            <!--&gt;-->
                            <!--</el-date-picker>-->
                            <el-date-picker
                                v-model="startDate"
                                type="datetimerange"
                                align="right"
                                :default-time="['12:00:00', '08:00:00']">
                            </el-date-picker>
                        </div>
                        <div style="display: inline-block">
                            <span style="font-size: 14px;width:80px;">提取数量：</span>
                            <el-input v-model="searchForm.num" style="width:50px;"></el-input>
                            -
                            <el-input v-model="searchForm.num" style="width:50px;"></el-input>
                        </div>
                    </div>
                </el-col>
                <div style="float:right">
                    <el-button type="primary" style="margin-right:10px;margin-bottom:2px;"
                               @click="search(searchForm)">搜索
                    </el-button>
                    <el-button type="primary" style="margin-right:10px;margin-bottom:2px;"
                               @click="setStatus()">确认打币
                    </el-button>
                    <!--<el-button type="primary" style="margin-left:0">导出</el-button>-->
                </div>
            </el-row>
            <el-row type="flex" style="margin-bottom: 30px;margin-top: 20px">
                <div style="font-size: 14px;width:200px;">已申请总量：{{amount|MoneyFormat}}</div>
                <div style="font-size: 14px;width:200px;">已确认提取：{{settledAmount|MoneyFormat}}</div>
            </el-row>
            <el-table
                :data="tableData"
                style="width: 100%"
                @selection-change="handleSelectionChange" :cell-class-name="cellcb">
                <el-table-column
                    type="selection"
                    width="55"
                >
                    <!--<template slot-scope="scope">-->
                    <!--<el-checkbox :checked="scope.row.isKey== 1" v-if="scope.row.state!=1"/>-->
                    <!--</template>-->
                </el-table-column>
                <el-table-column
                    label="姓名"
                    prop="name">
                    <!--<template scope="scope">-->
                        <!--<router-link :to="{path:'/userInfo',query:{id:scope.row.userId}}">{{scope.row.name}}</router-link>-->
                    <!--</template>-->
                </el-table-column>
                <el-table-column
                    label="手机号"
                    prop="phone">
                </el-table-column>
                <el-table-column
                    label="申请提取时间"
                    prop="ctime">
                </el-table-column>
                <el-table-column
                    label="提取数量（BCD）"
                >
                    <template scope="scope">
                        {{scope.row.amount|MoneyFormat}}
                    </template>
                </el-table-column>
                <el-table-column
                    label="BCD收款地址"
                    prop="address">
                </el-table-column>
                <el-table-column
                    label="备注"
                    prop="remark">
                </el-table-column>
                <el-table-column
                    label="运营标注"
                    prop="remark">
                </el-table-column>
                <el-table-column
                    label="状态"
                    prop="status">
                </el-table-column>
                <el-table-column
                    label="操作"
                    key="upload"
                    min-width="90"
                >
                    <template scope="scope">
                        <el-button type="text" style="margin-left:0;" v-clipboard:copy="scope.row.address"
                                   v-clipboard:success="onCopy" v-clipboard:error="onError">复制地址
                        </el-button>
                        <el-button type="text" style="margin-left:0;" @click="ensureCoin(scope.row.id)">确认
                        </el-button>
                        <!--<el-button type="text" style="margin-left:0;" @click="remarkChangeItem(scope.row.id)">运营标注-->
                        <!--</el-button>-->
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
            <el-dialog title="" :visible.sync="dialogFormVisible">
                <el-form :model="form" ref="form">
                    <el-form-item label="标注：" :label-width="formLabelWidth" prop="remarksItem">
                        <el-input v-model="form.remarksItem" auto-complete="off" style="width:80%" type="textarea" row="2"
                        ></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false;">取 消</el-button>
                    <el-button type="primary" @click="ensureRemark">确 定</el-button>
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
                id: '',
                iaData: '',
                sysAppIds: '',
                tableData: [],
                options: [{
                    value: '4',
                    label: '全部'
                }, {
                    value: 1,
                    label: '已打币'
                }, {
                    value: 0,
                    label: '未打币'
                }],
                startDate: '',
                endDate: '',
                state: '4',
                txcount: 0,
                currentPage: 1,
                nowPageSize: 10,
                formLabelWidth: '120px',
                trumpetFormWidth: '150px',
                topForm: {},
                trumpetForm: {},
                searchForm: {},
                compareStartDate: '',
                compareEndDate: '',
                multipleSelection: [],
                cellPhones: [],
                pickerOptions0: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                },
                timePeriod: '',
                settledAmount: '',
                amount: '',
                dialogFormVisible:false,
                form:{},
                remarkId:''


            };
        },
        created() {
            const form = {page: this.currentPage, size: this.nowPageSize};
            this.getData(form)
        },
        computed: {},
        methods: {
            cellcb({row, column, rowIndex, columnIndex}) {
                if (row.settled == 1 && columnIndex == 0) {
                    return "my-cell"
                }

            },
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
            getData(form) {
                this.$ajax({
                    method: "POST",
                    url: BaseUrl + 'bcdWallet/getWithdrawBcd',
                    params: form,
                    headers: {'token': sessionStorage.getItem('token')}
                }).then(response => {
                    if (response.data.flag == 200) {
                        this.tableData = response.data.data.data;
                        this.txcount = response.data.data.count;
                        this.amount = response.data.data.amount;
                        this.settledAmount = response.data.data.settledAmount;
                        this.tableData.forEach(item => {
                            if (item.settled == 1) {
                                item.status = '已打币'
                            } else if (item.settled == 0) {
                                item.status = '未打币'
                            }
                        })
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
                });
            },
            handleSizeChange(pageSize) {
                this.nowPageSize = pageSize;
                var listParams = {
                    page: 1,
                    size: pageSize,
                };
                this.getData(listParams);
            },
            handleCurrentChange(pageValue) {
                this.currentPage = pageValue;
                var listParams = {
                    page: pageValue,
                    size: this.nowPageSize || 10,
                };
                this.getData(listParams);
            },
            GMTToStr(time) {
                var date = time;
                var Y = date.getFullYear();
                var M = date.getMonth() + 1;
                M = M < 10 ? '0' + M : M;// 不够两位补充0
                var D = date.getDate();
                D = D < 10 ? '0' + D : D;
                var H = date.getHours();
                H = H < 10 ? '0' + H : H;
                var Mi = date.getMinutes();
                Mi = Mi < 10 ? '0' + Mi : Mi;
                var S = date.getSeconds();
                S = S < 10 ? '0' + S : S;
                return Y + '-' + M + '-' + D + ' ' + H + ':' + Mi + ':' + S;

            },
            search(searchForm) {
            },
            handleSelectionChange(val) {
                this.multipleSelection = val.filter((item) => {
                    // item的条件
                    return item.settled == 0
                });
            },
            setStatus() {
                if (this.multipleSelection.length == 0 || this.multipleSelection == '') {
                    this.$alert('请勾选条目', '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$message({
                                type: 'info',
                                message: `error: ${'请重试'}`
                            });
                        }
                    });
                    return false
                } else {
                    this.cellPhones = [];
                    for (let i = 0; i < this.multipleSelection.length; i++) {
                        this.cellPhones.push({id: this.multipleSelection[i].id})
                    }
                    this.$ajax({
                        method: "POST",
                        url: BaseUrl + 'bcdWallet/withdrawOk',
                        data: this.cellPhones,
                        headers: {'token': sessionStorage.getItem('token')}
                    }).then(response => {
                        if (response.data.flag == 200) {
                            this.$alert(response.data.msg, '提示', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    this.$message({
                                        type: 'info',
                                        message: `${ response.data.msg}`
                                    });
                                }
                            });
                            this.getData({page: this.currentPage, size: this.nowPageSize})
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
            },
            ensureCoin(id) {
                this.$ajax({
                    method: "POST",
                    url: BaseUrl + 'bcdWallet/withdrawOk',
                    data: [{id: id}],
                    headers: {'token': sessionStorage.getItem('token')}
                }).then(response => {
                    if (response.data.flag == 200) {
                        this.$alert(response.data.msg, '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$message({
                                    type: 'info',
                                    message: `${ response.data.msg}`
                                });
                            }
                        });
                        this.getData({page: this.currentPage, size: this.nowPageSize})
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
            remarkChangeItem(id){
               this.dialogFormVisible=true;
               this.remarkId=id
            },
            ensureRemark(){
               this.dialogFormVisible=false
            }

        },

    };
</script>

<style lang="less" scoped>
    @import "../style/mixin";

    .table_container {
        padding: 20px;
    }

    .my-cell {
        background-color: red;
        .cell {
            display: none !important;
        }
    }

    .littleButton {
        padding: 5px 10px !important;
        margin-left: 0 !important;
    }
</style>
<style lang="less">
    .my-cell {
        .cell {
            display: none !important;
        }
    }
</style>
