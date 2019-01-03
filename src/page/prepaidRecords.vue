<template>
    <div>
        <div class="table_container">
            <div style="margin-bottom: 30px;margin-top: 20px">
                <span style="font-size: 14px;">时间：</span>
                <el-date-picker
                    v-model="dataTime"
                    type="daterange"
                    range-separator="-"
                    @change="test()"
                >
                </el-date-picker>
            </div>
            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    label="账户名"
                    prop="title">
                </el-table-column>
                <el-table-column
                    label="手机号"
                    prop="loginNum">
                </el-table-column>
                <el-table-column
                    label="EOS数量"
                >
                </el-table-column>
                <el-table-column
                    label="来源"
                    prop="regiNum">
                </el-table-column>
                <el-table-column
                    label="时间"
                    prop="authNum">
                </el-table-column>
                <el-table-column
                    label="状态"
                >
                </el-table-column>
                <el-table-column
                    label="交易ID"
                >
                </el-table-column>
                <el-table-column
                label="备注"
                prop="userSum">
                </el-table-column>
                <el-table-column
                    label="收款帐户"
                >
                </el-table-column>
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
        <!--<div style="margin:0px 20px;">-->

            <!--<el-tabs class="table_container" v-model="activeName" @tab-click="handleClick" style="width:140px">-->
                <!--<el-tab-pane label="近七日" name="1"></el-tab-pane>-->
                <!--<el-tab-pane label="近30日" name="2"></el-tab-pane>-->
            <!--</el-tabs>-->
            <!--<tendency :sevenDate='sevenDate' :sevenDay='sevenDay' :max="max" :dataName='dataName'></tendency>-->
        <!--</div>-->
    </div>

</template>

<script>
    import tendency from '../components/tendency'
    let moment = require('moment');
    export default {
        data() {
            return {
                activeName: '1',
                cumulativeUsers: '',
                realNameUsers: '',
                // inviteSign:20,
                activeNums:10000,
                authNum: '',
                loginNum: '',
                regiNum: '',
                beInviteAndRegiNum: '',
                beInviteAndAuthNum: '',
                // radio:'1',
                dataTime: [moment().subtract('days', 30).format('YYYY-MM-DD'), moment().subtract('days', 1).format('YYYY-MM-DD')],
                chartTime: null,
                tableData: [],
                max: '',
                startDate1: moment().subtract('days', 6).format('YYYY-MM-DD'),
                sevenDay: [],
                sevenDate: [[], [], [], []],
                endDate1: moment().format('YYYY-MM-DD'),
                startDate2: moment().subtract('days', 7).format('YYYY-MM-DD'),
                endDate2: moment().format('YYYY-MM-DD'),
                dataName: ['新增注册用户', '实名认证用户', '总用户', '登录用户'],
                tagname:'',
                tagList:[],
                searchInfo:'',
                dialogTableVisible:false,
                currentPage:1,
                nowPageSize:30,
                txcount:0,
                name:'',
                historyData:[]

            };
        },
        components: {
            tendency
        },
        created() {
            this.$ajax.get(BaseUrl + 'data/sum',
                {headers: {'token': sessionStorage.getItem('token')}}).then(response => {
                if (response.data.flag == 200) {
                    this.cumulativeUsers = response.data.data.userSum;
                    this.realNameUsers = response.data.data.authSum;
                } else if (response.data.flag == 201) {
                    this.$alert(response.data.msg + '，请重新登录', '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$router.push('/')
                        }
                    });
                }
            })
            this.getData()
            this.getDatas()
            this.getNewData()
        },
        computed: {},
        methods: {
            test() {
                this.getData()
            },
            getNewData() {
                if (this && !this._isDestroyed) {
                    this.$ajax.get(BaseUrl + 'data/active',
                        {headers: {'token': sessionStorage.getItem('token')}}).then(response => {
                        if (response.data.flag == 200) {
                            this.authNum = response.data.data.authNum;
                            this.loginNum = response.data.data.loginNum;
                            this.regiNum = response.data.data.regiNum;
                            this.beInviteAndAuthNum = response.data.data.toRegiAndAuthNum;
                            this.beInviteAndRegiNum = response.data.data.beInviteAndRegiNum
                            let _this = this
                            if (_this && !_this._isDestroyed) {
                                setTimeout(() => {
                                    _this.getNewData()
                                }, 60000)
                            }
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
            },
            getData() {
                this.$ajax.get(BaseUrl + 'data/content',
                    {
                        params: {
                            cycle: 'day',
                            startDate: moment(this.dataTime[0]).format('YYYY-MM-DD'),
                            endDate: moment(this.dataTime[1]).add('days',1).format('YYYY-MM-DD')
                        }, headers: {'token': sessionStorage.getItem('token')}
                    }).then(response => {
                    if (response.data.flag == 200) {
                        this.tableData = response.data.data;
                    } else if (response.data.flag == 201) {
                        this.$alert(response.data.msg + '，请重新登录', '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$router.push('/')
                            }
                        });
                    }
                    this.tableData.forEach(item => {
                        if (item.title == '总计') {
                            this.tableData.splice(item, 1)
                        }
                    })
                })
            },
            // serchData(dataTime) {
            //     if (dataTime == null) {
            //         this.$alert('请选择搜索日期', {
            //             confirmButtonText: '确定',
            //             callback: action => {
            //                 this.$message({
            //                     type: 'info',
            //                     message: `请重试！`
            //                 });
            //             }
            //         });
            //         return false;
            //     } else if ((moment(dataTime[1]) - moment(dataTime[0])) / (24 * 60 * 60 * 1000) > 30) {
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
            //     } else if (dataTime != null) {
            //         this.startDate1 = moment(dataTime[0]).format('YYYY-MM-DD')
            //         this.endDate1 = moment(dataTime[1]).format('YYYY-MM-DD')
            //         this.getData()
            //     }
            // },
            searchDappByTag(){

            },
            searchDapp(){

            },
            handleSizeChange(){

            },
            handleCurrentChange(){

            },
            getDatas() {
                this.$ajax.get(BaseUrl + 'data/show',
                    {
                        params: {cycle: 'day', startDate: this.startDate2, endDate: this.endDate2},
                        headers: {'token': sessionStorage.getItem('token')}
                    }).then(response => {
                    if (response.data.flag == 200) {
                        this.sevenDay = response.data.data[0];
                        this.sevenDate = response.data.data[1];
                        this.max = Math.max(...this.sevenDate[0], ...this.sevenDate[1], ...this.sevenDate[2], ...this.sevenDate[3]);
                    } else {
                        this.$alert(response.data.msg + '，请重新登录', '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$router.push('/')
                            }
                        });
                    }
                })
            },
            handleClick() {
                if (this.activeName == 2) {
                    this.startDate2 = moment().subtract('days', 31).format('YYYY-MM-DD')
                } else {
                    this.startDate2 = moment().subtract('days', 7).format('YYYY-MM-DD')
                }
                this.getDatas()
            },
            detailCheck(name){
                this.name=name
                this.dialogTableVisible=true
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
        width: 200px;
        height: 100px;
        margin-right: 15px;
        background: #85ce61;
    }

    .card-data:last-child {
        padding: 5px 10px;
        width: 200px;
        height: 100px;
        margin-right: 0px;

    }
</style>
