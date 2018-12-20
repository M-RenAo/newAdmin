<template>
    <div>
        <div class="table_container">
            <div style="display: flex;font-size: 14px;margin-bottom: 20px">
                <div class="card-data">
                    <p style="font-size: 16px;">保本卡总发放量</p>
                    <div style="height: 50px;display: flex;align-items: center;font-size: 16px;color: #E6A23C">
                        {{sum.grantNum}} 张
                    </div>
                    <p>总发放人数：{{sum.grantPeopleNum}}</p>
                    <p>总人均发放：{{sum.perPeopleGrantNum}}</p>
                </div>
                <div class="card-data">
                    <p style="font-size: 16px;">保本卡实际保本金额</p>
                    <div style="height: 50px;display: flex;align-items: center;font-size: 16px;color: #E6A23C">
                        {{sum.realReward}} IA
                    </div>
                    <p>总是用卡全数：{{sum.usageNum}}</p>
                    <p>总人均使用数：{{sum.usagePeopleNum}}</p>
                </div>
                <div class="card-data">
                    <p style="font-size: 16px;">用户有效总持有数量</p>
                    <div style="height: 50px;display: flex;align-items: center;font-size: 16px;color: #E6A23C">
                        {{sum.valid}} 张
                    </div>
                    <p>已经过期卡券数：{{sum.expired}}</p>
                </div>
                <!--<div class="card-data">-->
                <!--<p style="font-size: 16px;">今日活跃用户</p>-->
                <!--<div style="height: 50px;display: flex;align-items: center;font-size: 16px;color: #E6A23C">{{activeNums}}</div>-->
                <!--&lt;!&ndash;<p>经邀请注册用户{{inviteSign}}</p>&ndash;&gt;-->
                <!--</div>-->
            </div>
            <div style="margin-bottom: 30px;">
                <span style="font-size: 14px;">时间：</span>
                <el-date-picker
                    v-model="dataTime"
                    type="daterange"
                    range-separator="-"
                    @change="test()"
                    :default-time="['00:00:00', '00:00:00']"
                >
                </el-date-picker>
            </div>
            <el-table
                :data="guessCardDataParent"
                style="width: 100%">
                <el-table-column
                    label="日期"
                    prop="time">
                </el-table-column>
                <el-table-column
                    label="发放量"
                    prop="grantNum">
                </el-table-column>
                <el-table-column
                    label="发放人数"
                    prop="grantPeopleNum"
                >
                </el-table-column>
                <el-table-column
                    label="人均发放量"
                    prop="perPeopleGrantNum">
                </el-table-column>
                <el-table-column
                    label="使用量"
                    prop="usageNum">
                </el-table-column>
                <el-table-column
                    label="使用人数"
                    prop="usagePeopleNum"
                >
                </el-table-column>
                <el-table-column
                    label="实际保本金额"
                    prop="realReward"
                >
                </el-table-column>
                <el-table-column
                    label="操作"
                >
                    <template scope="scope">
                        <el-button type="text" @click="checkDetails(scope.row.time)">卡券明细</el-button>
                    </template>
                </el-table-column>

            </el-table>
            <div class="Pagination">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="nowPageSize"
                    :page-sizes="[5, 10, 20,30, 40]"
                    :total="txcount"
                    layout="total, sizes, prev, pager, next, jumper"
                >
                </el-pagination>
            </div>
        </div>
        <el-dialog  :visible.sync="dialogguessCardVisible" width="1000px">
            <div style="margin-bottom: 10px">日期：{{currentDate}}</div>
            <el-table :data="guessCardData">
                <el-table-column property="cardName" label="卡券"></el-table-column>
                <el-table-column property="grantNum" label="发放量"></el-table-column>
                <el-table-column property="grantPeopleNum" label="发放人数"></el-table-column>
                <el-table-column property="perPeopleGrantNum" label="人均持有量"></el-table-column>
                <el-table-column property="usageNum" label="使用量"></el-table-column>
                <el-table-column property="usagePeopleNum" label="使用人数"></el-table-column>
                <el-table-column property="realReward" label="实际保本金额"></el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>

<script>
    import tendency from '../components/tendency'
    import {baseUrl, baseImgPath} from "@/config/env";
    import Vue from "vue";
    import dtime from 'time-formater'

    let moment = require('moment');
    export default {
        data() {
            return {
                dataTime: [moment().subtract('days', 30).format('YYYY-MM-DD'), moment().subtract('days', 1).format('YYYY-MM-DD')],
                currentPage:1,
                nowPageSize:30,
                txcount:0,
                currentDate:'',
                guessCardData:[],
                guessCardDataParent:[],
                sum:{},
                dialogguessCardVisible:false
                // focusList:[{a:'hhhhh',url:'baidu.com'},{a:'hhhhh',url:'https://imapp.com'},{a:'hhhhh',url:'https://test.imapp.io'}]
            };
        },
        components: {
            tendency
        },
        created() {
            this.getData()
            this.getNewData()
        },
        computed: {},
        methods: {
            test() {
                this.getData()
            },
            getNewData() {
                    if (this && !this._isDestroyed) {
                        this.$ajax({
                            method: "POST",
                            url: BaseUrl + 'card/queryAll',
                            data: {
                                qtype: 2
                            },
                            headers: {
                                'token': sessionStorage.getItem('token')
                            }
                        }).then(res => {
                            if(res.data.flag==200) {
                                this.sum = res.data.data.all
                                let _this = this
                                if (_this && !_this._isDestroyed) {
                                    setTimeout(() => {
                                        _this.getNewData()
                                    }, 60000)
                                }
                            }
                        })

                    }
            },
            getData() {
                this.$ajax({
                    method: "POST",
                    url: BaseUrl + 'card/query',
                    data: {
                        type: 1,
                        cardName:"保本卡",
                        page:this.currentPage,
                        size:this.nowPageSize,
                        bstime:moment(this.dataTime[0]).utc().format('YYYY-MM-DD HH:mm:ss'),
                        estime:moment(this.dataTime[1]).add(moment.duration('23:59:59')).utc().format('YYYY-MM-DD HH:mm:ss')

                    },
                    headers: {
                        'token': sessionStorage.getItem('token')
                    }
                }).then(res => {
                    if(res.data.flag==200) {
                        this.guessCardDataParent=res.data.data.data;
                        this.guessCardDataParent.forEach(item=>{
                            item.time=moment(item.stime).utc().format('YYYY-MM-DD')
                        })

                    }
                })
            },

            checkDetails(date){
               this.dialogguessCardVisible=true
                this.currentDate=date
                this.$ajax({
                    method: "POST",
                    url: BaseUrl + 'card/query',
                    data: {
                        type: 2,
                        cardName:"保本卡",
                        page:this.currentPage,
                        size:this.nowPageSize,
                        bstime:moment(this.currentDate).utc().format('YYYY-MM-DD HH:mm:ss'),
                        estime:moment( this.currentDate).add(moment.duration('23:59:59')).utc().format('YYYY-MM-DD HH:mm:ss')

                    },
                    headers: {
                        'token': sessionStorage.getItem('token')
                    }
                }).then(res => {
                    if(res.data.flag==200) {
                        this.iaCardData=res.data.data.data;
                        this.iaCardData.forEach(item=>{
                            item.time=moment(item.stime).utc().format('YYYY-MM-DD')
                        })

                    }
                })
            },
            handleSizeChange(size){
                this.currentPage=1
                this.nowPageSize=size
                this.getData()
            },
            handleCurrentChange(page){
                this.currentPage=page
                this.getData()
            }
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
        height: 120px;
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
        height: 120px;
        /*border:1px solid #999;*/
        margin-right: 0px;

    }
</style>
