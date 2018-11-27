<template>
    <div>
        <el-row style="margin-top: 20px;">
            <el-col :span="20" style="margin: 40px">
                <el-form :model="quizInfo" ref="quizInfo" label-width="110px" class="form food_form">
                    <div>
                        <div style="display: flex;margin-bottom: 20px;">
                            <h4>竞猜基本信息：</h4>
                        </div>
                        <el-form-item label="竞猜标题：" prop="name">
                            {{quizInfo.topic}}
                        </el-form-item>
                        <el-form-item label="描述：" prop="name">
                            {{quizInfo.detail}}
                        </el-form-item>
                        <el-form-item label="开始时间：" prop="name">
                            {{quizInfo.startDate}}
                        </el-form-item>
                        <el-form-item label="结束时间：" prop="name">
                            {{quizInfo.endDate}}
                        </el-form-item>
                        <el-form-item label="竞猜选项一：" prop="name">
                            {{option.A}}
                        </el-form-item>
                        <el-form-item label="竞猜选项二：" prop="name">
                            {{option.B}}
                        </el-form-item>
                        <el-form-item label="竞猜选项二：" prop="name" v-if="Object.keys(option).length>=3">
                            {{option.C}}
                        </el-form-item>
                        <el-form-item label="竞猜选项二：" prop="name" v-if="Object.keys(option).length>=4">
                            {{option.D}}
                        </el-form-item>
                        <el-form-item label="竞猜选项二：" prop="name" v-if="Object.keys(option).length>=5">
                            {{option.E}}
                        </el-form-item>
                        <el-form-item label="竞猜选项二：" prop="name" v-if="Object.keys(option).length>=6">
                            {{option.F}}
                        </el-form-item>
                        <el-form-item label="竞猜选项二：" prop="name" v-if="Object.keys(option).length>=7">
                            {{option.G}}
                        </el-form-item>
                        <el-form-item label="竞猜选项二：" prop="name" v-if="Object.keys(option).length==8">
                            {{option.H}}
                        </el-form-item>
                        <el-form-item label="每注：" prop="name">
                            {{quizInfo.amount}} IA
                        </el-form-item>
                    </div>
                    <div v-if="$route.query.state==2||$route.query.state==0">
                        <div style="margin-bottom: 20px;">
                            <h4>开奖结果：</h4>
                        </div>
                        <div data-v-6b64c39e="" class="el-form-item">
                            <label class="el-form-item__label" style="width: 110px;">{{answerName}}：</label>
                            <div class="el-form-item__content" style="margin-left: 110px;">
                                {{anwser}}
                            </div>
                        </div>
                    </div>
                    <div>
                        <div style="display: flex;margin-bottom: 20px;">
                            <h4>投注详情：</h4>
                        </div>
                        <el-form-item label="投注金额：" prop="name">
                            <div>
                                <el-form-item label="总计：" prop="name" label-width="70px" style="color:#606266">
                                    <span>竞猜选项一 </span> <span style="margin-left: 10px;">{{total.A}}</span><span
                                    style="display:inline-block;margin-left: 20px">竞猜选项二  </span> <span
                                    style="margin-left: 10px;">{{total.B}}</span>
                                </el-form-item>
                                <el-form-item label="实际：" label-width="70px" prop="name" style="color:#606266">
                                    <span>竞猜选项一  </span> <span style="margin-left: 10px;">{{actual.A}}</span><span
                                    style="display:inline-block;margin-left: 20px">竞猜选项二  </span> <span
                                    style="margin-left: 10px;">{{actual.B}}</span>
                                </el-form-item>
                            </div>
                        </el-form-item>
                        <el-form-item style="color:#606266" label="回报倍数：" prop="name">
                            <span>竞猜选项一</span> <span style="margin-left: 10px;">{{rate.A}}</span>
                            <span style="display:inline-block;margin-left: 20px">竞猜选项二 </span> <span
                            style="margin-left: 10px;">{{rate.B}}</span>
                            <span v-if="Object.keys(option).length>=3"><span
                                style="display:inline-block;margin-left: 20px">竞猜选项三 </span> <span
                                style="margin-left: 10px;">{{rate.C}}</span></span>
                            <span v-if="Object.keys(option).length>=4"><span
                                style="display:inline-block;margin-left: 20px">竞猜选项四 </span> <span
                                style="margin-left: 10px;">{{rate.D}}</span></span>
                            <span v-if="Object.keys(option).length>=5"><span
                                style="display:inline-block;margin-left: 20px">竞猜选项五 </span> <span
                                style="margin-left: 10px;">{{rate.E}}</span></span>
                            <span v-if="Object.keys(option).length>=6"><span
                                style="display:inline-block;margin-left: 20px">竞猜选项六 </span> <span
                                style="margin-left: 10px;">{{rate.F}}</span></span>
                            <span v-if="Object.keys(option).length>=7"><span
                                style="display:inline-block;margin-left: 20px">竞猜选项七 </span> <span
                                style="margin-left: 10px;">{{rate.G}}</span></span>
                            <span v-if="Object.keys(option).length==8"><span
                                style="display:inline-block;margin-left: 20px">竞猜选项八 </span> <span
                                style="margin-left: 10px;">{{rate.H}}</span></span>
                        </el-form-item>
                    </div>
                </el-form>
                <el-row>
                    <el-col :span="20">
                        <span style="font-size: 14px;width:80px;">手机号：</span>
                        <el-input v-model="phone" placeholder="请输入内容" style="width:150px;"></el-input>
                        <span style="font-size: 14px;width:80px;">投注选项：</span>
                        <el-select v-model="state" placeholder="请选择">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="4"
                            style="display: flex;justify-content: flex-end;margin-top:10px; margin-bottom: 10px">
                        <el-button type="primary" style="margin-right:10px;margin-bottom:2px;"
                                   @click="search(phone,state)">搜索
                        </el-button>
                        <el-button type="primary" style="margin-right:10px;margin-bottom:2px;"
                                   @click="revertSettle()" v-bind:disabled="confirm.length==0">重新结算
                        </el-button>
                    </el-col>
                </el-row>
                <el-table
                    :data="tableData"
                    @selection-change="handleSelectionChange"
                    style="width: 100%" :cell-class-name="cellcb">
                    <el-table-column
                        type="selection"
                        width="55">
                    </el-table-column>
                    <el-table-column
                        label="手机号"
                        prop="phone">
                    </el-table-column>
                    <el-table-column
                        label="昵称"
                        prop="name">
                    </el-table-column>
                    <el-table-column
                        label="投注时间"
                        prop="date">
                    </el-table-column>
                    <el-table-column
                        label="投注选项"
                        prop="choice"
                        min-width="90"
                    ></el-table-column>
                    <el-table-column
                        label="投注数"
                        prop="num">
                    </el-table-column>
                    <el-table-column
                        label="投注金额"
                        prop="amount"
                        min-width="90"
                    ></el-table-column>
                    <el-table-column
                        label="结算金额"
                        prop="balance"
                        min-width="90"
                    ></el-table-column>
                    <el-table-column
                        label="状态"
                        prop="status"
                        min-width="90"
                    ></el-table-column>
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
                quizInfo: {},
                option: {},
                anwser: '',
                ensureVisible: false,
                answerName: '',
                total: {},
                actual: {},
                rate: {},
                tableData: [],
                txcount: 0,
                currentPage: 1,
                nowPageSize: 10,
                searchForm: {},
                phone: '',
                state: '1',
                options: [
                    {value: "1", label: '全部'},
                    {value: "A", label: '竞猜选项一'},
                    {value: "B", label: '竞猜选项二'},
                    {value: "C", label: '竞猜选项三'},
                    {value: "D", label: '竞猜选项四'},
                    {value: "E", label: '竞猜选项五'},
                    {value: "F", label: '竞猜选项六'},
                    {value: "G", label: '竞猜选项七'},
                    {value: "H", label: '竞猜选项八'},
                ],
                multipleSelection: [],
                confirm: []
            };
        },
        components: {
            headTop
        },
        created() {
            this.$ajax({
                method: "POST",
                url: BaseUrl + 'guess/getById',
                data: {id: this.$route.query.id},
                headers: {'token': sessionStorage.getItem('token')}
            }).then(response => {
                if (response.data.flag == 200) {


                    this.quizInfo = response.data.data.guess;
                    this.option = JSON.parse(response.data.data.guess.option);
                    this.quizInfo.startDate = moment.utc(this.quizInfo.startDate).local().format('YYYY-MM-DD HH:mm:ss');
                    this.quizInfo.endDate = moment.utc(this.quizInfo.endDate).local().format('YYYY-MM-DD HH:mm:ss')
                    for (var key in this.option) {
                        if (this.quizInfo.answer == key) {
                            this.anwser = this.option[key];
                            // console.log(this.option[key])
                        }
                    }
                    ;
                    if (this.quizInfo.answer == 'A') {
                        this.answerName = '竞猜结果一'
                    } else if (this.quizInfo.answer == 'B') {
                        this.answerName = '竞猜结果二'
                    } else if (this.quizInfo.answer == 'C') {
                        this.answerName = '竞猜结果三'
                    } else if (this.quizInfo.answer == 'D') {
                        this.answerName = '竞猜结果四'
                    } else if (this.quizInfo.answer == 'E') {
                        this.answerName = '竞猜结果五'
                    } else if (this.quizInfo.answer == 'F') {
                        this.answerName = '竞猜结果六'
                    } else if (this.quizInfo.answer == 'G') {
                        this.answerName = '竞猜结果七'
                    } else if (this.quizInfo.answer == 'H') {
                        this.answerName = '竞猜结果八'
                    }
                    if (response.data.data.total != undefined) {
                        this.total = response.data.data.total
                    } else {
                        this.total = {}
                    }
                    if (response.data.data.actual != undefined) {
                        this.actual = response.data.data.actual
                    }
                    if (response.data.data.rate != undefined) {
                        this.rate = response.data.data.rate
                    }
                } else if (response.data.flag == 201) {
                    this.$alert(response.data.msg + '，请重新登录', '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$router.push('/')
                        }
                    });
                }
            });
            const form = {id: this.$route.query.id, page: this.currentPage, size: this.nowPageSize, order: 'date desc'}
            this.getData(form)
        },
        computed: {},
        methods: {
            cellcb({row, column, rowIndex, columnIndex}) {
                if ((row.settled == 1 && columnIndex == 0) || (row.balance <= 0 && columnIndex == 0)) {
                    return "my-cells"
                }

            },
            getData(form) {
                this.$ajax({
                    method: "POST",
                    url: BaseUrl + 'guess/getJoin',
                    data: form,
                    headers: {'token': sessionStorage.getItem('token')}
                }).then(response => {
                    if (response.data.flag == 200) {


                        this.tableData = response.data.data.data;
                        this.txcount = response.data.data.count;
                        this.tableData.forEach(item => {
                            if (item.answer == 'A') {
                                item.choice = '竞猜选项一'
                            } else if (item.answer == 'B') {
                                item.choice = '竞猜选项二'
                            } else if (item.answer == 'C') {
                                item.choice = '竞猜结果三'
                            } else if (item.answer == 'D') {
                                item.choice = '竞猜结果四'
                            } else if (item.answer == 'E') {
                                item.choice = '竞猜结果五'
                            } else if (item.answer == 'F') {
                                item.choice = '竞猜结果六'
                            } else if (item.answer == 'G') {
                                item.choice = '竞猜结果七'
                            } else if (item.answer == 'H') {
                                item.choice = '竞猜结果八'
                            }
                        });
                        this.tableData.forEach(item => {
                            item.date = moment.utc(item.date).local().format('YYYY-MM-DD HH:mm:ss')
                        })
                        this.tableData.forEach(item => {
                            if (item.settled == 1) {
                                item.status = '已完成'
                            } else if (item.settled == 0) {
                                item.status = '失败'
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
                });
            },
            handleSelectionChange(val) {
                this.multipleSelection = val.filter((item) => {
                    // item的条件
                    return item.balance > 0 && item.settled === 0
                });
                this.confirm = [];
                for (let i = 0; i < this.multipleSelection.length; i++) {
                    this.confirm.push(this.multipleSelection[i].joinId)
                }
            },
            revertSettle() {
                this.$ajax({
                    method: "POST",
                    url: BaseUrl + 'guess/joinSettlement',
                    data: {id: this.$route.query.id, joins: this.confirm},
                    headers: {'token': sessionStorage.getItem('token')}
                }).then(response => {
                    if (response.data.flag == 200) {
                        this.$alert(response.data.msg, '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.getData({
                                    id: this.$route.query.id,
                                    page: this.currentPage,
                                    size: this.nowPageSize,
                                    order: 'date desc'
                                })
                            }
                        });

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
                        });
                    }

                });
            },
            handleSizeChange(pageSize) {
                // console.log(this.searchForm)
                // console.log(">>>>>>pageSize", pageSize);
                this.nowPageSize = pageSize;
                if (this.searchForm.phone == undefined && this.searchForm.anwser == undefined) {
                    var listParams = {
                        id: this.$route.query.id,
                        page: 1,
                        size: pageSize,
                        order: "date desc"
                    };
                } else {
                    this.searchForm.index = 1;
                    this.searchForm.size = pageSize
                    var listParams = this.searchForm
                }
                this.getData(listParams);
            },
            handleCurrentChange(pageValue) {
                // console.log(">>>>>>pageValue", pageValue);
                this.currentPage = pageValue;
                if (this.searchForm.phone == undefined && this.searchForm.anwser == undefined) {
                    var listParams = {
                        id: this.$route.query.id,
                        page: pageValue,
                        size: this.nowPageSize || 10,
                        order: "date desc"
                    };
                } else {
                    this.searchForm.index = pageValue;
                    this.searchForm.size = this.nowPageSize || 10;
                    var listParams = this.searchForm
                }
                this.getData(listParams);
            },
            search(phone, state) {
                // console.log(state)
                if (phone != '') {
                    this.searchForm.phone = phone;
                } else {
                    this.searchForm.phone = undefined
                }
                if (state != '1') {
                    this.searchForm.answer = state;
                } else {
                    this.searchForm.answer = undefined
                }
                this.searchForm.id = this.$route.query.id;
                this.searchForm.index = 1;
                this.searchForm.size = this.nowPageSize;
                this.searchForm.order = "date desc"
                this.getData(this.searchForm)
            }
        },

    };
</script>

<style lang="less">
    @import "../style/mixin";

    .my-cells {

        .cell {
            display: none !important;
        }
    }

</style>
