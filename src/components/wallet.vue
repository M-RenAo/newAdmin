<template>
    <div class="fillcontain">
        <div class="table_container">
            <el-tabs v-model="activeNames" @tab-click="change()">
                <el-tab-pane label="IA" name="first">
                    <div v-if="activeNames=='first'">
                        <el-row type="flex" style="margin-bottom: 20px;">
                            <el-col :span="18" style="display:flex;height: auto;word-break:break-all;flex:1">
                                <div style="display:inline-block">
                                    <div style="display: inline-block">
                                        <span style="font-size: 14px;width:80px;">时间：</span>
                                        <el-date-picker
                                            v-model="startDate"
                                            type="datetimerange"
                                            align="right"
                                            :default-time="['12:00:00', '08:00:00']">
                                        </el-date-picker>
                                    </div>
                                    <div style="display: inline-block">
                                        <span style="font-size: 14px;width:80px;">类型：</span>
                                        <el-select v-model="state" placeholder="请选择">
                                            <el-option
                                                v-for="item in options"
                                                :key="item.label"
                                                :label="item.label"
                                                :value="item.label">
                                            </el-option>
                                        </el-select>
                                    </div>
                                </div>
                            </el-col>
                            <div style="float:right">
                                <el-button type="primary" style="margin-right:10px;margin-bottom:2px;"
                                           @click="search(state,startDate)">搜索
                                </el-button>
                                <!--<el-button type="primary" style="margin-left:0">导出</el-button>-->
                            </div>
                        </el-row>
                        <div style="font-size: 14px;">余额：{{balance}}</div>
                        <el-table
                            :data="tableData"
                            style="width: 100%">
                            <el-table-column
                                label="时间"
                                prop="createTime">
                            </el-table-column>
                            <el-table-column
                                label="类型"
                                prop="type">
                            </el-table-column>
                            <el-table-column
                                label="金额（IA）"
                                prop="amount">
                            </el-table-column>
                            <!--<el-table-column-->
                            <!--label="账户余额（IA）"-->
                            <!--prop="balance">-->
                            <!--</el-table-column>-->
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
                </el-tab-pane>
                <el-tab-pane label="BCD" name="second">
                    <div v-if="activeNames=='second'">
                        <el-row type="flex" style="margin-bottom: 20px;">
                            <el-col :span="18" style="display:flex;height: auto;word-break:break-all;flex:1">
                                <div style="display:inline-block">
                                    <div style="display: inline-block">
                                        <span style="font-size: 14px;width:80px;">时间：</span>
                                        <el-date-picker
                                            v-model="startDate"
                                            type="datetimerange"
                                            align="right"
                                            :default-time="['12:00:00', '08:00:00']">
                                        </el-date-picker>
                                    </div>
                                    <div style="display: inline-block">
                                        <span style="font-size: 14px;width:80px;">类型：</span>
                                        <el-select v-model="state" placeholder="请选择">
                                            <el-option
                                                v-for="item in options"
                                                :key="item.label"
                                                :label="item.label"
                                                :value="item.label">
                                            </el-option>
                                        </el-select>
                                    </div>
                                </div>
                            </el-col>
                            <div style="float:right">
                                <el-button type="primary" style="margin-right:10px;margin-bottom:2px;"
                                           @click="search(state,startDate)">搜索
                                </el-button>
                                <!--<el-button type="primary" style="margin-left:0">导出</el-button>-->
                            </div>
                        </el-row>
                        <div style="font-size: 14px;">余额：{{balance}}</div>
                        <el-table
                            :data="tableData"
                            style="width: 100%">
                            <el-table-column
                                label="时间"
                                prop="createTime">
                            </el-table-column>
                            <el-table-column
                                label="类型"
                                prop="type">
                            </el-table-column>
                            <el-table-column
                                label="金额（BCD）"
                                prop="amount">
                            </el-table-column>
                            <!--<el-table-column-->
                            <!--label="账户余额（BCD）"-->
                            <!--prop="balance">-->
                            <!--</el-table-column>-->
                        </el-table>
                        <div class="Pagination">
                            <el-pagination
                                @size-change="handleSizeChange2"
                                @current-change="handleCurrentChange2"
                                :current-page="currentPage"
                                :page-size="nowPageSize"
                                :page-sizes="[5, 10, 20, 40]"
                                :total="txcount"
                                layout="total, sizes, prev, pager, next, jumper"
                            >
                            </el-pagination>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
    import {baseUrl, baseImgPath} from '@/config/env'
    import {
        getFoods,
        getFoodsCount,
        getMenu,
        updateFood,
        deleteFood,
        getResturantDetail,
        getMenuById
    } from '@/api/getData'

    let moment = require('moment')
    export default {
        data() {
            return {
                tableData: [],
                currentRow: null,
                offset: 0,
                nowPageSize: 10,
                txcount: 0,
                currentPage: 1,
                searchForm: {},
                tableData2: [],
                startDate: null,
                balance: '',
                state: '全部',
                activeNames: 'first',
                options: [
                    {label: '全部', value: '0'}, {label: '平台内部转账', value: '1'}, {label: '转账', value: '2'},
                    {label: '兑换BCD', value: '3'}, {label: '提取BCD', value: '3'}, {
                        label: '安装挖矿',
                        value: '4'
                    }, {label: '打开挖矿', value: '5'},
                    {label: '邀请挖矿', value: '6'}, {label: '注册挖矿', value: '7'}, {label: '竞猜花费', value: '8'},
                    {label: '竞猜赚取', value: '9'}, {label: '平台奖励', value: '10'}, {label: '平台转账应用', value: '11'}
                ],
                options2: [
                    {label: '全部', value: '0'}, {label: 'IA兑换', value: '1'}, {label: '平台奖励', value: '2'}, {
                        label: '提取',
                        value: '2'
                    },
                ],
            }
        },
        created() {

            if (this.activeNames == 'first') {
                const form = {
                    userId: this.$route.query.id,
                    pageCode: 1,
                    pageSize: 10,
                    type: 1,
                    startTime: '',
                    endTime: ''
                }
                this.getData(form);
            } else {
                const form = {
                    userId: this.$route.query.id,
                    pageCode: 1,
                    pageSize: 10,
                    type: 0,
                    startTime: '',
                    endTime: ''
                }
                this.getData(form);
            }
        },
        computed: {},
        components: {},
        methods: {
            change() {
                if (this.activeNames == 'first') {
                    this.nowPageSize = 10;
                    this.currentPage = 1;
                    this.startDate = null;
                    this.state = '全部';
                    this.searchForm = {};
                    this.tableData = [];
                    this.txcount = 0;
                    this.balance = ''
                    this.getData({
                        userId: this.$route.query.id,
                        pageCode: 1,
                        pageSize: 10,
                        type: 1,
                        startTime: '',
                        endTime: ''
                    });

                } else {
                    this.nowPageSize = 10;
                    this.currentPage = 1;
                    this.startDate = null;
                    this.state = '全部';
                    this.searchForm = {};
                    this.tableData = []
                    this.txcount = 0;
                    this.balance = ''
                    this.getData({
                        userId: this.$route.query.id,
                        pageCode: 1,
                        pageSize: 10,
                        type: 0,
                        startTime: '',
                        endTime: ''
                    });
                }
            },
            getData(form) {
                this.$ajax({
                    method: "POST",
                    url: BaseUrl + 'imwallet/getbilllist',
                    data: form,
                    headers: {'token': sessionStorage.getItem('token')}
                }).then(response => {
                    // console.log(response)
                    if (response.data.flag == 200) {
                        this.tableData = response.data.data.billList;
                        this.balance = response.data.data.balance
                        this.txcount = response.data.data.total;
                        this.tableData.forEach(item => {
                            item.createTime = moment.utc(item.createTime).local().format('YYYY-MM-DD HH:mm:ss')
                        })
                    } else if (response.data.flag == 201) {
                        this.$alert(response.data.msg + '，请重新登录', '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$router.push('/')
                            }
                        });
                    } else {
                        this.tableData = []
                        this.txcount = 0
                    }
                });

            },
            // getData2(form){
            //     this.$ajax({
            //         method: "POST",
            //         url: BaseUrl+'bcdWallet/getbilllist',
            //         params: form,
            //         headers: {'token': sessionStorage.getItem('token')}
            //     }).then(response => {
            //         this.tableData2 = response.data.data.billList;
            //         this.txcount2 = response.data.data.total
            //         this.tableData2.forEach(item=>{
            //             item.createTime=moment.utc(item.createTime).local().format('YYYY-MM-DD HH:mm:ss')
            //         })
            //     });
            // },
            handleSizeChange(pageSize) {
                // console.log(">>>>>>pageSize", pageSize);
                this.nowPageSize = pageSize;
                if (this.startDate == null && this.state == '全部') {
                    var listParams = {
                        pageCode: 1,
                        pageSize: pageSize,
                        userId: this.$route.query.id,
                        type: 1,
                        startTime: '',
                        endTime: '',
                    };
                } else {
                    this.searchForm.pageCode = 1;
                    this.searchForm.pageSize = pageSize
                    var listParams = this.searchForm
                }
                this.getData(listParams);
            },
            handleCurrentChange(pageValue) {
                // console.log(">>>>>>pageValue", pageValue);
                this.currentPage = pageValue;
                if (this.startDate == null && this.state == '全部') {
                    var listParams = {
                        pageCode: pageValue,
                        pageSize: this.nowPageSize || 10,
                        userId: this.$route.query.id,
                        type: 1,
                        startTime: '',
                        endTime: '',
                    };
                } else {
                    this.searchForm.pageCode = pageValue;
                    this.searchForm.pageSize = this.nowPageSize || 10;
                    var listParams = this.searchForm
                }

                this.getData(listParams);
            },
            handleSizeChange2(pageSize) {
                // console.log(">>>>>>pageSize", pageSize);
                this.nowPageSize = pageSize;
                if (this.startDate == null && this.state == '全部') {
                    var listParams = {
                        pageCode: 1,
                        pageSize: pageSize,
                        type: 2,
                        startTime: '',
                        endTime: '',
                        userId: this.$route.query.id
                    };
                } else {
                    this.searchForm.pageCode = 1;
                    this.searchForm.pageSize = pageSize
                    var listParams = this.searchForm
                }
                this.getData(listParams);
            },
            handleCurrentChange2(pageValue) {
                // console.log(">>>>>>pageValue", pageValue);
                this.currentPage = pageValue;
                if (this.startDate == null && this.state == '全部') {
                    var listParams = {
                        pageCode: pageValue,
                        pageSize: this.nowPageSize || 10,
                        type: 2,
                        startTime: '',
                        endTime: '',
                        userId: this.$route.query.id
                    };
                } else {
                    this.searchForm.pageCode = pageValue;
                    this.searchForm.pageSize = this.nowPageSize || 10;
                    var listParams = this.searchForm
                }

                this.getData(listParams);
            },
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
            search(state, startDate) {
                var searchForm = {}
                if (state != '全部') {
                    searchForm.txType = state
                }
                // console.log(startDate)
                if (startDate != null) {
                    searchForm.startTime = moment(this.startDate[0]).utc().format('YYYY-MM-DD HH:mm:ss');
                    searchForm.endTime = moment(this.startDate[1]).utc().format('YYYY-MM-DD HH:mm:ss');
                } else {
                    searchForm.startTime = '';
                    searchForm.endTime = ''
                }
                searchForm.userId = this.$route.query.id
                if (this.activeNames == 'first') {
                    searchForm.type = 1
                } else {
                    searchForm.type = 0
                }
                // console.log(typeof (searchForm.startTime))
                searchForm.pageCode = 1;
                searchForm.pageSize = this.nowPageSize || 10;
                this.searchForm = searchForm
                // console.log(searchForm)
                this.getData(this.searchForm)
            },
        },
    }
</script>

<style lang="less" scoped>
    @import '../style/mixin';

    .table_container {
        padding: 20px;
    }
</style>
