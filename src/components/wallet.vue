<template>
    <div class="fillcontain">
        <div class="table_container">
            <el-tabs v-model="activeNames" @tab-click="change()">
                <el-tab-pane label="IA" name="1"></el-tab-pane>
                <el-tab-pane label="BCD" name="0"></el-tab-pane>
            </el-tabs>
            <div>
                <el-row type="flex" style="margin-bottom: 20px;">
                    <el-col :span="18" style="display:flex;height: auto;word-break:break-all;flex:1">
                        <div style="display:inline-block">
                            <div style="display: inline-block">
                                <span style="font-size: 14px;width:80px;">时间：</span>
                                <el-date-picker
                                    style="width:300px;"
                                    v-model="startDate"
                                    type="datetimerange"
                                    align="right"
                                    :default-time="['12:00:00', '08:00:00']"
                                    @change="test()" >
                                </el-date-picker>
                            </div>
                            <div style="display: inline-block">
                                <span style="font-size: 14px;width:80px;">类型：</span>
                                <el-select v-model="state" placeholder="请选择" style="width:130px" @change="changeState">
                                    <el-option
                                        v-for="item in options"
                                        :key="item.label"
                                        :label="item.label"
                                        :value="item.label">
                                    </el-option>
                                </el-select>
                            </div>
                            <div style="display: inline-block">
                                <span style="font-size: 14px;width:80px;">金额范围：</span>
                                <el-input style="width:70px" type="number" min="0"></el-input>-<el-input style="width:70px" type="number" min="0"></el-input>
                            </div>
                            <div style="display: inline-block">
                                <span style="font-size: 14px;width:70px;">排序：</span>
                                <el-select v-model="sort" placeholder="请选择" style="width:75px">
                                    <el-option
                                        v-for="item in optionsSort"
                                        :key="item.label"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                                <el-select v-model="sortRule" style="width:75px" placeholder="请选择">
                                    <el-option
                                        v-for="item in optionsRule"
                                        :key="item.label"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                    </el-col>
                    <div style="float:right">
                        <el-button type="primary" style="margin-right:10px;margin-bottom:2px;"
                                   @click="search()">搜索
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
                        :label="activeNames==1?'金额（IA）':'金额（BCD)'"
                        prop="amount">
                    </el-table-column>
                    <el-table-column
                        v-if="activeNames==1"
                        label="转入地址"
                         prop="balance">
                    </el-table-column>
                    <el-table-column
                        v-if="activeNames==1"
                        label="转出地址"
                        prop="balance">
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
                sort:'0',
                sortRule:'1',
                balance: '',
                state: '全部',
                activeNames: '1',
                optionsSort:[ {label: '时间', value: '0'}, {label: '金额', value: '1'}],
                optionsRule:[ {label: '正序', value: '0'}, {label: '倒序', value: '1'}],
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
                const form = {
                    userId: this.$route.query.id,
                    pageCode: 1,
                    pageSize: 10,
                    type:Number(this.activeNames),
                    startTime: '',
                    endTime: ''
                }
                this.getData(form);
        },
        computed: {},
        components: {},
        methods: {
            test(){
                this.getData({userId: this.$route.query.id, pageCode: 1, pageSize: 10, type:Number(this.activeNames), startTime:this.startDate!==null?moment(this.startDate[0]).utc().format('YYYY-MM-DD HH:mm:ss'):'', endTime: this.startDate!==null?moment(this.startDate[1]).utc().format('YYYY-MM-DD HH:mm:ss'):'',txType:this.state!='全部'?this.state:null})
            },
            change() {
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
                        type: Number(this.activeNames),
                        startTime: '',
                        endTime: ''
                    });
            },
            changeState(){
                this.getData({userId: this.$route.query.id, pageCode: 1, pageSize: 10, type: Number(this.activeNames), startTime:this.startDate!==null?moment(this.startDate[0]).utc().format('YYYY-MM-DD HH:mm:ss'):'', endTime: this.startDate!==null?moment(this.startDate[1]).utc().format('YYYY-MM-DD HH:mm:ss'):'',txType:this.state!='全部'?this.state:null})
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
            handleSizeChange(pageSize) {
                this.nowPageSize = pageSize;
                this.getData({userId: this.$route.query.id, pageCode: 1, pageSize:this.nowPageSize, type: Number(this.activeNames), startTime:this.startDate!==null?moment(this.startDate[0]).utc().format('YYYY-MM-DD HH:mm:ss'):'', endTime: this.startDate!==null?moment(this.startDate[1]).utc().format('YYYY-MM-DD HH:mm:ss'):'',txType:this.state!='全部'?this.state:null})
            },
            handleCurrentChange(pageValue) {
                this.currentPage = pageValue;
                this.getData({userId: this.$route.query.id, pageCode: this.currentPage, pageSize: this.nowPageSize, type: Number(this.activeNames), startTime:this.startDate!==null?moment(this.startDate[0]).utc().format('YYYY-MM-DD HH:mm:ss'):'', endTime: this.startDate!==null?moment(this.startDate[1]).utc().format('YYYY-MM-DD HH:mm:ss'):'',txType:this.state!='全部'?this.state:null})
            },
            search(){

            }
        },
    }
</script>

<style lang="less" scoped>
    @import '../style/mixin';

    .table_container {
        padding: 20px;
    }
</style>
