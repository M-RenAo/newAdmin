<template>
    <div>
        <div class="table_container">
            <div style="display: flex;font-size: 16px;margin-bottom: 20px">
                <div style="width:50%;padding:0px 20px">
                    IA总量：{{iaTotal|MoneyFormat}}
                    <circle-chart :dataNum="data1"></circle-chart>
                </div>

                <div style="width: 50%;padding:0px 20px">
                    用户挖矿总量：{{digTotal|MoneyFormat}}
                    <circle-chart :dataNum="data2"></circle-chart>
                </div>
            </div>
            <div style="margin-bottom: 30px;">
                <span style="font-size: 14px;">时间：</span>
                <el-date-picker
                    v-model="dataTime"
                    type="daterange"
                    range-separator="-"
                    @change="test()"
                >
                </el-date-picker>
                <!--<el-radio v-model="radio" label="1">按天展示</el-radio>-->
                <!--<el-radio v-model="radio" label="2">按月展示</el-radio>-->
                <!--<div style="float:right" :span="6">-->
                <!--<el-button type="primary" @click="serchData(dataTime)">搜索</el-button>-->
                <!--<el-button type="primary">导出</el-button>-->
                <!--</div>-->
            </div>
            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    label="日期"
                    prop="time">
                </el-table-column>
                <el-table-column
                    label="总兑换量"
                    prop="data.exchange">
                </el-table-column>
                <el-table-column
                    label="打开应用奖励"
                    prop="data.open">
                </el-table-column>
                <el-table-column
                    label="新注册奖励"
                    prop="data.register">
                </el-table-column>
                <el-table-column
                    label="邀请好友奖励"
                    prop="data.invite">
                </el-table-column>
                <el-table-column
                    label="下载奖励"
                    prop="data.download">
                </el-table-column>
                <el-table-column
                    label="猜猜使用"
                    prop="data.guess">
                </el-table-column>
                <el-table-column
                    label="见证使用"
                    prop="data.witness">
                </el-table-column>
                <!--<el-table-column-->
                <!--label="总用户"-->
                <!--prop="userSum">-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                <!--label="注册用户"-->
                <!--prop="regiNum">-->
                <!--</el-table-column>-->

            </el-table>
            <div class="Pagination">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="nowPageSize"
                    :page-sizes="[5,10,20,30,40]"
                    :total="txcount"
                    layout="total, sizes, prev, pager, next, jumper"
                >
                </el-pagination>
            </div>
        </div>
        <div style="margin:0px 20px;">
            <!--<span style="font-size: 14px;">时间：</span>-->
            <!--<el-date-picker-->
            <!--v-model="chartTime"-->
            <!--type="daterange"-->
            <!--range-separator="-"-->
            <!--&gt;-->
            <!--</el-date-picker>-->
            <!--<div style="float:right" :span="6">-->
            <!--<el-button type="primary" @click="serchChart(chartTime)">搜索</el-button>-->
            <!--</div>-->
            <el-tabs class="table_container" v-model="activeName" @tab-click="handleClick" style="width:140px">
                <el-tab-pane label="近七日" name="1"></el-tab-pane>
                <el-tab-pane label="近30日" name="2"></el-tab-pane>
            </el-tabs>
            <tendency :sevenDate='sevenDate' :sevenDay='sevenDay' :max="max" :dataName='dataName'></tendency>
        </div>
        <!--<li v-for="item in focusList" @click="test(item)">-->
        <!--{{item.a}}-->
        <!--</li>-->
    </div>

</template>

<script>
    import tendency from '../components/tendency'
    import {baseUrl, baseImgPath} from "@/config/env";
    import Vue from "vue";
    import dtime from 'time-formater'
    import circleChart from '../components/circleChart'

    let moment = require('moment');
    export default {
        data() {
            return {
                activeName: '1',
                currentPage: 1,
                nowPageSize: 30,
                txcount: 0,
                iaTotal: 10000000000,
                digTotal: 0,
                newSignNum: 200,
                inviteSign: 20,
                // radio:'1',
                dataTime: [moment().subtract('days', 31).format('YYYY-MM-DD'), moment().subtract('days', 1).format('YYYY-MM-DD')],
                chartTime: null,
                tableData: [],
                max: '',
                startDate1: moment().subtract('days', 6).format('YYYY-MM-DD'),
                sevenDay: [],
                sevenDate: [[], [], [], [], [], [], []],
                endDate1: moment().add('days', 1).format('YYYY-MM-DD'),
                startDate2: moment().subtract('days', 7).format('YYYY-MM-DD'),
                endDate2: moment().add('days', 1).format('YYYY-MM-DD'),
                data1: [],
                data2: [],
                dataName: ['总兑换量', '打开应用奖励', '新注册奖励', '邀请好友奖励', '下载奖励', '猜猜使用', '见证使用'],
                // focusList:[{a:'hhhhh',url:'baidu.com'},{a:'hhhhh',url:'https://imapp.com'},{a:'hhhhh',url:'https://test.imapp.io'}]
            };
        },
        components: {
            tendency, circleChart
        },
        created() {
            // this.initData();
            // for (let i = 6; i > -1; i--) {
            //     const date = dtime(new Date().getTime() - 86400000*i).format('YYYY-MM-DD')
            //     this.sevenDay.push(date)
            // }
            // this.getSevenData();
            this.getCircleData()
            this.getData()
            this.getDatas()
        },
        computed: {},
        methods: {
            getCircleData() {
                this.$ajax({
                    method: "POST",
                    url: BaseUrl + 'imwallet/getIaData',
                    headers: {'token': sessionStorage.getItem('token')}
                }).then(response => {
                    // console.log(response)
                    if (response.data.flag == 200) {
                        this.data1 = response.data.data.data1;
                        this.data2 = response.data.data.data2;
                        this.data2.forEach(item => {
                            this.digTotal += item.value
                        })
                        // this.data1[2].value=this.data1[3].value
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
            test() {
                this.getData()
            },
            getData() {
                this.$ajax({
                    method: "POST",
                    url: BaseUrl + 'imwallet/getIaDataList',
                    data: {
                        btime: moment(this.dataTime[0]).format('YYYY-MM-DD'),
                        etime: moment(this.dataTime[1]).format('YYYY-MM-DD'),
                        page: this.currentPage,
                        size: this.nowPageSize
                    },
                    headers: {'token': sessionStorage.getItem('token')}
                }).then(response => {
                    // console.log(response)
                    if (response.data.flag == 200) {
                        this.tableData = response.data.data.data;
                        this.txcount = response.data.data.count;
                        this.tableData.forEach(item => {
                            item.time = moment.utc(item.ctime).format('YYYY-MM-DD')
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
            handleSizeChange(size) {
                // console.log(size)
            },
            handleCurrentChange(page) {
                // console.log(page)
            },
            serchData(dataTime) {
                if (dataTime == null) {
                    this.$alert('请选择搜索日期', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$message({
                                type: 'info',
                                message: `请重试！`
                            });
                        }
                    });
                    return false;
                } else if ((moment(dataTime[1]) - moment(dataTime[0])) / (24 * 60 * 60 * 1000) > 30) {
                    this.$alert('不能超过30天', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$message({
                                type: 'info',
                                message: `请重试！`
                            });
                        }
                    });
                    return false;
                } else if (dataTime != null) {
                    this.startDate1 = moment(dataTime[0]).format('YYYY-MM-DD')
                    this.endDate1 = moment(dataTime[1]).format('YYYY-MM-DD')
                    this.getData()
                }
            },
            getDatas() {
                this.$ajax({
                    method: "POST",
                    url: BaseUrl + 'imwallet/getIaDataMapList ',
                    data: {
                        btime: moment(this.dataTime[0]).format('YYYY-MM-DD'),
                        etime: moment(this.dataTime[1]).format('YYYY-MM-DD')
                    },
                    headers: {'token': sessionStorage.getItem('token')}
                }).then(response => {
                    // console.log(response)
                    if (response.data.flag == 200) {
                        this.sevenDay = response.data.data.data[0];
                        this.sevenDate = response.data.data.data[1];
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
            handleClick() {
                if (this.activeName == 2) {
                    this.startDate2 = moment().subtract('days', 31).format('YYYY-MM-DD')
                } else {
                    this.startDate2 = moment().subtract('days', 7).format('YYYY-MM-DD')
                }
                this.getDatas()
            },
            // serchChart(chartTime){
            //     if(chartTime==null){
            //             this.$alert('请选择搜索日期', {
            //                 confirmButtonText: '确定',
            //                 callback: action => {
            //                     this.$message({
            //                         type: 'info',
            //                         message: `请重试！`
            //                     });
            //                 }
            //             });
            //             return false;
            //     }
            //     else if((moment(chartTime[1])-moment(chartTime[0]))/(24*60*60*1000)>30){
            //         this.$alert('不能超过30天', {
            //             confirmButtonText: '确定',
            //             callback: action => {
            //                 this.$message({
            //                     type: 'info',
            //                     message: `请重试！`
            //                 });
            //             }
            //         });
            //         return false;
            //     }else if(chartTime!=null){
            //       this.startDate2=moment(chartTime[0]).format('YYYY-MM-DD')
            //        this.endDate2=moment(chartTime[1]).format('YYYY-MM-DD');
            //       this.getDatas();
            //     }
            // }
        },

    };
</script>

<style lang="less" scoped>
    @import "../style/mixin";

    .table_container {
        padding: 20px;
    }

    .card-data {
        padding: 5px 10px;
        color: #fff;
        /*display: flex;*/
        /*flex-direction: column;*/
        /*justify-content: center;*/
        width: 200px;
        height: 100px;
        /*border:1px solid #999;*/
        margin-right: 15px;
        background: #85ce61;
    }

    .card-data:last-child {
        padding: 5px 10px;
        /*display: flex;*/
        /*flex-direction: column;*/
        /*justify-content: center;*/
        width: 200px;
        height: 100px;
        /*border:1px solid #999;*/
        margin-right: 0px;

    }
</style>
