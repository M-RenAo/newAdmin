<template>
    <div class="content">
        <h2 style="padding:10px 0 20px 0">{{guessTitle}}：高中奖率体验IA翻倍乐趣</h2>
        <el-table
            :data="tableData"
            class="test-class"
            style="width: 100%">
            <el-table-column
                prop="time"
                label="日期"
                width="160">
            </el-table-column>
            <el-table-column
                prop="result"
                label="结果"
                min-width="50">
            </el-table-column>
            <el-table-column
                prop="prizePool"
                label="奖池"
                min-width="50">
            </el-table-column>
            <el-table-column
                prop="joins"
                label="参与人数"
                min-width="50">
            </el-table-column>
            <el-table-column
                prop="lucks"
                label="中奖人数"
                min-width="50">
            </el-table-column>
            <el-table-column
                prop="income"
                label="平台收益"
                min-width="50">
            </el-table-column>
            <el-table-column
                prop="state"
                label="开奖状态"
                min-width="50">
                <template scope="scope">
                    <div class="setState" @click="openPrize(scope.row)"
                         v-if="scope.row.state!='已开奖'&&scope.row.state!='没人参与'">
                        <!-- {{scope.row.draft?"草稿":"发布"}} @click="opendialogVisible = true"-->
                        {{scope.row.state}}
                    </div>
                    <div v-else>
                        <!-- {{scope.row.draft?"草稿":"发布"}} @click="opendialogVisible = true"-->
                        {{scope.row.state}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                prop="rules"
                label="规则"
                min-width="50">
                <template scope="scope">
                    <div class="setState" @click="openRules(scope.row)">
                        {{scope.row.rules.slice(0,9)}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                label="操作"
                min-width="50">
                <template scope="scope">
                    <el-button @click="see(scope.row)" type="text">查看</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="Pagination">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 20, 30, 50]"
                :page-size="nowPageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="guesscount">
            </el-pagination>
        </div>
        <div>
            <el-dialog
                :visible.sync="opendialogVisible"
                width="30%">
                <div style="text-align:center">
                    <div class="size" v-if="guessType!=3?true:false">
                        <h3>哈希猜{{guessType==1?"涨跌":"大小"}}开奖结果</h3>
                        <div style="margin:40px 0 40px 0">
                            <el-radio v-model="radio" label="1">{{guessType==1?"涨":"大"}}</el-radio>
                            <el-radio v-model="radio" label="2">{{guessType==1?"跌":"小"}}</el-radio>
                            <el-input v-model="address" style="margin:10px 0" placeholder="请输入验证地址"></el-input>
                        </div>
                    </div>
                    <!-- <div class="size" v-if="guessType==2?true:false">
                        <h3>哈希猜大小开奖结果</h3>
                        <div style="margin:40px 0 40px 0">
                            <el-radio v-model="radio" label="1">大</el-radio>
                            <el-radio v-model="radio" label="2">小</el-radio>
                            <el-input v-model="address" style="margin:10px 0" placeholder="请输入验证地址"></el-input>
                        </div>
                    </div> -->
                    <div class="lottery" v-if="guessType==3?true:false">
                        <h3>哈希彩票开奖结果</h3>
                        <div class="lotterys">
                            <!-- <div>3</div>
                            <div>2</div>
                            <div>1</div> -->
                            <el-input v-model="res" maxlength='3' style="width:150px" placeholder="请输入开奖结果"
                                      @blur="isNum" @focus="numIs"></el-input>
                            <div style="color:red;" v-if="isnum">请输入数字</div>
                            <div style="color:red;" v-if="isnums">请输入三位数字</div>

                        </div>
                        <el-input v-model="address" style="margin:10px 0" placeholder="请输入验证地址"></el-input>
                    </div>

                    <el-button @click="closeDialog">确定</el-button>
                </div>
            </el-dialog>
        </div>
        <div>
            <el-dialog
                :visible.sync="seedialogVisible"
                width="900px">
                <h2 style="text-align:center">投注详情</h2>
                <div class="option" v-if="guessType==2||guessType==1?true:false">
                    <div style="float: left;margin-left:10px">
                        <h3>投注选项:{{head.A.answer}}</h3>
                        <span>投注人数:{{head.A.num}}人 ({{head.A.numPerc}}%)</span>
                        <span style="margin-left:20px">投注金额:{{head.A.amount}}IA ({{head.A.amountPerc}}%)</span>
                    </div>
                    <div style="float: right;margin-right:10px">
                        <h3>投注选项:{{head.B.answer}}</h3>
                        <span>投注人数:{{head.B.num}}人 ({{head.B.numPerc}}%)</span>
                        <span style="margin-left:20px">投注金额:{{head.B.amount}}IA ({{head.B.amountPerc}}%)</span>
                    </div>
                </div>
                <div v-if="guessType==1?true:false">
                    <span class="riseFall">投注选项</span>
                    <el-select v-model="riseFall" style="width:80px" @change="optsChange">
                        <el-option
                            v-for="item in riseFalls"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div v-if="guessType==2?true:false">
                    <span class="riseFall">投注选项</span>
                    <el-select v-model="riseFall2" style="width:80px" @change="optsChange">
                        <el-option
                            v-for="item in riseFalls2"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div v-if="guessType==3?true:false">
                    <span class="riseFall">投注选项</span>
                    <el-select v-model="riseFall3" style="width:80px" @change="optsChange">
                        <el-option
                            v-for="item in riseFalls3"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div style="margin-bottom:20px">
                    <el-table
                        :data="recordData"
                        style="width: 70%">
                        <el-table-column
                            prop="name"
                            label="姓名"
                            min-width="50">
                        </el-table-column>
                        <el-table-column
                            prop="phone"
                            label="手机号">
                        </el-table-column>
                        <el-table-column
                            prop="answer"
                            label="投注选项">
                        </el-table-column>
                        <el-table-column
                            prop="amount"
                            label="总金额">
                        </el-table-column>
                    </el-table>
                    <div class="Pagination">
                        <el-pagination
                            @size-change="optsSizeChange"
                            @current-change="optsCurrentChange"
                            :current-page="optsPage"
                            :page-sizes="[10, 20, 30, 50]"
                            :page-size="optsPageSize"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="optscount">
                        </el-pagination>
                    </div>
                </div>
                <div style="text-align:center">
                    <el-button @click="closeSeeDialog">确定</el-button>
                </div>
            </el-dialog>
            <el-dialog title="规则" :visible.sync="dialogRulesVisible">
                <el-input
                    type="textarea"
                    :rows="5"
                    placeholder="请输入内容"
                    v-model="getRules">
                </el-input>
                <div style="text-align:center;margin-top:20px">
                    <el-button @click="cancelRules">取消</el-button>
                    <el-button type="primary" @click="modifyRules">更改</el-button>
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
                guessType: "",
                radio: '1',
                address: "",//验证地址
                res: "",//开奖结果
                isnum: false,
                isnums: false,
                //showSize:false,是否显示大小
                // opendialogVisible: false,
                seedialogVisible: false,
                opendialogVisible: false,
                dialogRulesVisible: false,
                head: {
                    A: {},
                    B: {}
                },//投注详情
                guessId: "",//记录Id
                Id: "",//开奖Id
                guesscount: 0,
                currentPage: 1,
                nowPageSize: 10,
                optscount: 0,
                optsPage: 1,
                optsPageSize: 10,
                riseFall: "全部",
                riseFalls: [{
                    value: '1',
                    label: '全部'
                }, {
                    value: '2',
                    label: '涨'
                }, {
                    value: '3',
                    label: '跌'
                }],
                riseFall2: "全部",
                riseFalls2: [{
                    value: '1',
                    label: '全部'
                }, {
                    value: '2',
                    label: '大'
                }, {
                    value: '3',
                    label: '小'
                }],
                riseFall3: "全部",
                riseFalls3: [{
                    value: '1',
                    label: '全部'
                }, {
                    value: '2',
                    label: '直选'
                }, {
                    value: '3',
                    label: '组选'
                }],
                tableData: [],
                recordData: [],
                answer: undefined,//涨跌大小
                answerP3: undefined,//组合   自选
                advanceIssue: undefined,//提前开奖
                getRules: "",
            };
        },

        created() {
            this.guessType = this.$route.query.guessType
            this.getData();
        },
        methods: {
            isNum() {
                let re = /^[0-9]*$/;
                if (!re.test(this.res)) {
                    this.isnum = true
                }
                if (this.res.length != 3) {
                    this.isnums = true
                }
            },
            numIs() {
                this.isnum = false
                this.isnums = false
            },
            see(row) {//查看
                this.guessId = row.guessId
                this.riseFall3 = "全部"
                this.riseFall = "全部"
                this.riseFall2 = "全部"
                this.answer = undefined;
                this.answerP3 = undefined;
                this.optsPage = 1
                this.optsPageSize = 10
                // this.seedialogVisible=true;
                this.getGuessdata()
            },
            openPrize(row) {//开奖
                this.opendialogVisible = true
                this.advanceIssue = undefined
                this.isnum = false
                this.Id = row.guessId
                this.address = row.url
                this.res = ""
                if (row.state == '提前开奖') {
                    this.advanceIssue = "提前开奖"
                }
            },
            closeDialog() {

                let answerType = ""
                if (this.radio == 1) {
                    answerType = "A"
                } else if (this.radio == 2) {
                    answerType = "B"
                }
                if (this.guessType == 3 && this.res.length == 3 && !this.isnum) {
                    answerType = this.res
                } else if (this.guessType == 3 && this.res == '') {
                    return this.$message({showClose: true, message: '请输入开奖结果!', type: 'error'});
                } else if (this.guessType == 3 && this.res.length != 3) {
                    return this.$message({showClose: true, message: '请输入三位数字!', type: 'error'});
                } else if (this.guessType == 3 && this.isnum) {
                    return this.$message({showClose: true, message: '只能输入数字!', type: 'error'});
                }
                this.opendialogVisible = false
                this.$ajax({
                    method: "POST",
                    url: BaseUrl + 'guess/issue',
                    data: {
                        id: this.Id,
                        answer: answerType,
                        url: this.address,
                        advanceIssue: this.advanceIssue
                    },
                    headers: {'token': sessionStorage.getItem('token')}
                }).then(res => {

                    if (res.data.flag == 200) {
                        setTimeout(() => {
                            this.getData()
                            this.$message({
                                showClose: true,
                                message: '发布竞猜结果成功!',
                                type: 'success'
                            });
                        }, 500)


                    } else {
                        this.$message({
                            showClose: true,
                            message: '发布竞猜结果失败!',
                            type: 'error'
                        });
                    }
                    // console.log(res)
                })
            },
            handleSizeChange(pageSize) {
                this.nowPageSize = pageSize;
                this.getData();
            },
            handleCurrentChange(pageValue) {
                this.currentPage = pageValue;
                this.getData();
            },
            optsCurrentChange(pageValue) {
                this.optsPage = pageValue;
                this.getGuessdata();
            },
            optsSizeChange(pageSize) {
                this.optsPageSize = pageSize;
                this.getGuessdata();
            },
            closeSeeDialog() {
                this.seedialogVisible = false
            },
            optsChange(a) {//选择 涨  跌  大   小
                if (this.guessType == 1 || this.guessType == 2) {
                    this.answerP3 = undefined;
                    if (a == 1) {
                        this.answer = undefined;
                    } else if (a == 2) {
                        this.answer = "A"
                    } else if (a == 3) {
                        this.answer = "B"
                    }
                } else if (this.guessType == 3) {
                    this.answer = undefined;
                    if (a == 1) {
                        this.answerP3 = undefined;
                    } else if (a == 2) {
                        this.answerP3 = "B"
                    } else if (a == 3) {
                        this.answerP3 = "A"
                    }
                }
                this.getGuessdata();
            },
            openRules(row) {//打开规则
                this.dialogRulesVisible = true;
                this.getRules = row.rules
                this.guessId = row.guessId
            },
            cancelRules() {//取消更改
                this.dialogRulesVisible = false;
            },
            modifyRules() {//更改
                this.dialogRulesVisible = false;
                this.$ajax({
                    method: "POST",
                    url: BaseUrl + 'guess/updateGuess',
                    data: {
                        id: this.guessId,
                        rules: this.getRules
                    },
                    headers: {'token': sessionStorage.getItem('token')}
                }).then(res => {
                    if (res.data.flag == 200) {
                        this.$message({
                            type: 'success',
                            message: '更改成功!'
                        });
                        this.getData()
                    }

                })
            },
            getData() {
                this.$ajax({
                    method: "POST",
                    url: BaseUrl + 'guess/guessIssue',
                    data: {
                        type: this.guessType,
                        page: this.currentPage,
                        size: this.nowPageSize
                    },
                    headers: {'token': sessionStorage.getItem('token')}
                }).then(res => {
                    res.data.data.data.forEach(item => {
                        if (item.time != undefined) {
                            item.time = moment.utc(item.time).local().format('YYYY-MM-DD HH:mm:ss')
                        }
                    })
                    this.tableData = res.data.data.data
                    this.guesscount = res.data.data.count
                    // console.log(this.tableData)
                })
            },
            getGuessdata() {
                this.$ajax({
                    method: "POST",
                    url: BaseUrl + 'guess/guessIssueDetail',
                    data: {
                        answer: this.answer,
                        answerP3: this.answerP3,
                        id: this.guessId,
                        page: this.optsPage,
                        size: this.optsPageSize
                    },
                    headers: {'token': sessionStorage.getItem('token')}
                }).then(res => {
                    this.seedialogVisible = true;
                    this.recordData = res.data.data.data;
                    this.optscount = res.data.data.count;
                    this.head = res.data.data.head;
                })
            }
        },
        computed: {
            guessTitle() {
                if (this.guessType == 1) {
                    return "哈希猜涨跌"
                } else if (this.guessType == 2) {
                    return "哈希猜大小"
                } else if (this.guessType == 3) {
                    return "哈希彩票"
                }
            }
        },
        watch: {}


    };
</script>

<style lang="less">
    @import "../style/mixin";
    @import "../style/common.less";

    .content {
        margin: 20px
    }

    .setState {
        color: #6cf;
        cursor: pointer;
    }

    .lotterys {
        margin: 20px 0 20px 0;
        // display:flex;
        // flex-direction:row;
        // justify-content:center;
        // div{
        //     font-size:20px;
        //     border:1px solid #000;
        //     margin:5px;
        //     width:30px;
        //     height:30px;
        //     line-height: 30px
        // }
    }

    .option {
        margin: 20px 0 20px 0;
        overflow: hidden;
        div {

            border: 1px solid #000;
            padding: 10px;
            width: 43%;
            h3 {
                line-height: 30px
            }
        }
    }

    .riseFall {
        font-size: 16px;
        font-weight: 900;
        margin: 0 20px 0 10px;
    }

    .test-class {
        .cell {
            overflow: hidden !important;
            text-overflow: ellipsis !important;
            word-break: break-all !important;
            white-space: nowrap !important;
        }
    }
</style>
