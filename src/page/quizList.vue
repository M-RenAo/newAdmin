<template>
    <div>
        <div class="table_container">
            <el-row type="flex" style="margin-bottom: 30px;">
                <div>
                    <el-button type="primary" style="margin-right:10px;margin-bottom:2px;" @click="addQuiz">新增
                    </el-button>
                </div>
                <el-col :span="18" style="display:flex;height: auto;word-break:break-all;flex:1">
                    <div style="display:inline-block">
                        <span style="font-size: 14px;width:80px;">竞猜标题：</span>
                        <el-input v-model="searchForm.topic" placeholder="请输入内容" style="width:150px;"></el-input>
                        <span style="font-size: 14px;">状态：</span>
                        <el-select v-model="state" placeholder="请选择">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                        <div style="display: inline-block">
                            <span style="font-size: 14px;width:80px;">开始时间：</span>
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
                            <span style="font-size: 14px;width:80px;">结束时间：</span>
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
                                v-model="endDate"
                                type="datetimerange"
                                align="right"
                                :default-time="['12:00:00', '08:00:00']">
                            </el-date-picker>
                        </div>
                    </div>
                </el-col>
                <div style="float:right">
                    <el-button type="primary" style="margin-right:10px;margin-bottom:2px;"
                               @click="search(searchForm)">搜索
                    </el-button>
                    <!--<el-button type="primary" style="margin-left:0">导出</el-button>-->
                </div>
            </el-row>
            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    label="竞猜标题"
                >
                    <template scope="scope">
                        <router-link :to="{path:'/quizInfo',query:{id:scope.row.id,state:scope.row.state}}">
                            {{scope.row.topic}}
                        </router-link>
                    </template>
                </el-table-column>
                <el-table-column
                    label="开始时间"
                    prop="startDate">
                </el-table-column>
                <el-table-column
                    label="结束时间"
                    prop="endDate">
                </el-table-column>
                <el-table-column
                    label="参与人次"
                    prop="joins">
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
                        <el-button class="littleButton" @click="lottery(scope.row.id)" v-if="scope.row.state==2">开奖
                        </el-button>
                        <el-button class="littleButton" @click="update(scope.row.id)" v-if="scope.row.state==3">编辑
                        </el-button>
                        <el-button class="littleButton" style="margin-left:5px;"
                                   @click="placeTop(scope.row.id,scope.row.startDate,scope.row.endDate)"
                                   v-if="scope.row.state==1">置顶
                        </el-button>
                        <el-button class="littleButton" style="margin-left:0;" @click="trumpet(scope.row.id)"
                                   v-if="scope.row.state==1">小号参与
                        </el-button>
                        <el-button class="littleButton" style="margin-left:0;" @click="del(scope.row.id)"
                                   v-if="scope.row.state==3">删除
                        </el-button>
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
                <el-form :model="topForm">
                    <el-form-item label="起止时间" :label-width="formLabelWidth">
                        <el-date-picker
                            v-model="timePeriod"
                            type="datetimerange"
                            align="right"
                            :picker-options="pickerOptions0"
                            :default-time="['12:00:00', '12:00:00']">
                        </el-date-picker>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="topEnsure()">确 定</el-button>
                </div>
            </el-dialog>
            <el-dialog
                title="提示"
                :visible.sync="ensureTopVisible"
                width="30%">
                <span>确定将此条信息置顶？</span>
                <span slot="footer" class="dialog-footer">
                     <el-button @click="ensureTopVisible = false">取 消</el-button>
                     <el-button type="primary" @click="ensureTop()">确 定</el-button>
                </span>
            </el-dialog>
            <el-dialog title="" :visible.sync="trumpetFormVisible">
                <el-form>
                    <el-form-item label="投注选项：" :label-width="trumpetFormWidth">竞猜选项一
                    </el-form-item>
                    <el-form-item label="使用小号数：" :label-width="trumpetFormWidth">
                        <el-input v-model="choiceFirst.num" placeholder="请输入数量" style="width:40%" type="number"
                                  min="1"></el-input>
                    </el-form-item>
                    <el-form-item label="每个小号投注数：" :label-width="trumpetFormWidth">
                        <el-input v-model="choiceFirst.bet" placeholder="请输入数量" style="width:40%" type="number"
                                  min="1"></el-input>
                    </el-form-item>
                    <el-form-item label="投注选项：" :label-width="trumpetFormWidth">竞猜选项二
                    </el-form-item>
                    <el-form-item label="使用小号数：" :label-width="trumpetFormWidth">
                        <el-input v-model="choiceSecond.num" placeholder="请输入数量" style="width:40%" type="number"
                                  min="1"></el-input>
                    </el-form-item>
                    <el-form-item label="每个小号投注数：" :label-width="trumpetFormWidth">
                        <el-input v-model="choiceSecond.bet" placeholder="请输入数量" style="width:40%" type="number"
                                  min="1"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary"
                               @click="saveSumbit(choiceFirst.num,choiceFirst.bet,choiceSecond.num,choiceSecond.bet)">确
                        定
                    </el-button>
                </div>
            </el-dialog>
            <el-dialog
                title="提示"
                :visible.sync="delVisible"
                width="30%">
                <span>确定删除该信息？</span>
                <span slot="footer" class="dialog-footer">
                     <el-button @click="delVisible = false">取 消</el-button>
                     <el-button type="primary" @click="delEnsure()">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>

</template>

<script>
    import {baseUrl, baseImgPath} from "@/config/env";
    import headTop from '../components/headTop'

    let moment = require("moment");

    export default {
        data() {
            return {
                id: '',
                tableData: [],
                choiceSecond: {answer: 'B'},
                choiceFirst: {answer: 'A'},
                options: [{
                    value: '5',
                    label: '全部'
                }, {
                    value: '1',
                    label: '进行中'
                }, {
                    value: '0',
                    label: '已结束'
                }, {
                    value: '2',
                    label: '待开奖'
                }, {
                    value: '3',
                    label: '未开始'
                }, {
                    value: '4',
                    label: '结算异常'
                }],
                startDate: '',
                endDate: '',
                state: '5',
                txcount: 0,
                currentPage: 1,
                nowPageSize: 10,
                dialogFormVisible: false,
                ensureTopVisible: false,
                trumpetFormVisible: false,
                delVisible: false,
                formLabelWidth: '120x',
                trumpetFormWidth: '150px',
                topForm: {},
                trumpetForm: {},
                searchForm: {},
                compareStartDate: '',
                compareEndDate: '',
                pickerOptions0: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                },
                placeTopForm: {},
                timePeriod: null

            };
        },
        components: {
            headTop
        },
        created() {
            const form = {page: this.currentPage, size: this.nowPageSize, order: "pos desc, endDate"}
            this.getData(form)
        },
        computed: {},
        methods: {
            getData(form) {
                this.$ajax({
                    method: "POST",
                    url: BaseUrl + 'guess/getByCond',
                    data: form,
                    headers: {'token': sessionStorage.getItem('token')}
                }).then(response => {
                    if (response.data.flag == 200) {
                        this.tableData = response.data.data.data;
                        this.txcount = response.data.data.count
                        this.tableData.forEach(item => {
                            // item.results = JSON.parse(item.result).A + JSON.parse(item.result).B;
                            if (item.state == 1) {
                                item.status = '进行中'
                            } else if (item.state == 0) {
                                item.status = '已结束'
                            } else if (item.state == 2) {
                                item.status = '待开奖'
                            } else if (item.state == 3) {
                                item.status = '未开始'
                            } else if (item.state == 4) {
                                item.status = '结算异常'
                            }
                        });
                        this.tableData.forEach(item => {
                            item.startDate = moment.utc(item.startDate).local().format('YYYY-MM-DD HH:mm:ss')
                            item.endDate = moment.utc(item.endDate).local().format('YYYY-MM-DD HH:mm:ss')
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
                // console.log(">>>>>>pageSize", pageSize);
                this.nowPageSize = pageSize;
                if (this.searchForm == '') {
                    var listParams = {
                        page: 1,
                        size: pageSize,
                        order: "pos desc, endDate"
                    };
                } else {
                    this.searchForm.page = 1;
                    this.searchForm.size = pageSize
                    this.searchForm.order = "pos desc, endDate"
                    var listParams = this.searchForm
                }
                this.getData(listParams);
            },
            handleCurrentChange(pageValue) {
                // console.log(">>>>>>pageValue", pageValue);
                this.currentPage = pageValue;
                if (this.searchForm == '') {
                    var listParams = {
                        page: pageValue,
                        size: this.nowPageSize || 10,
                        order: "pos desc, endDate"
                    };
                } else {
                    this.searchForm.page = pageValue;
                    this.searchForm.size = this.nowPageSize || 10;
                    this.searchForm.order = "pos desc, endDate"
                    var listParams = this.searchForm
                }

                this.getData(listParams);
            },
            addQuiz() {
                this.$router.push({path: "/addQuiz"})
            },
            update(id) {
                this.$router.push({path: "/updateQuiz", query: {id: id}})
            },
            placeTop(id, startDate, endDate) {
                this.placeTopForm = {};
                this.dialogFormVisible = true;
                this.placeTopForm.id = id;
                this.compareStartDate = new Date(startDate);
                this.compareEndDate = new Date(endDate);
                this.timePeriod = [this.compareStartDate, this.compareEndDate];
                // console.log(id)
            },
            topEnsure() {
                // console.log(this.timePeriod);
                if (this.timePeriod[0] < this.compareStartDate) {
                    this.$alert('开始时间不能小于竞猜开始时间', '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$message({
                                type: 'info',
                                message: `error: ${'请重试'}`
                            });
                        }
                    });
                } else if (this.timePeriod[1] > this.compareEndDate) {
                    this.$alert('结束时间不能大于竞猜结束时间', '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$message({
                                type: 'info',
                                message: `error: ${'请重试'}`
                            });
                        }
                    });
                } else if (this.timePeriod == '' || this.timePeriod == undefined) {
                    this.$alert('时间不能为空', '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$message({
                                type: 'info',
                                message: `error: ${'请重试'}`
                            });
                        }
                    });
                } else {
                    this.placeTopForm.startTop = moment(this.timePeriod[0]).utc().format('YYYY-MM-DD HH:mm:ss');
                    this.placeTopForm.endTop = moment(this.timePeriod[1]).utc().format('YYYY-MM-DD HH:mm:ss');
                    this.ensureTopVisible = true;
                }
            },
            ensureTop() {
                this.placeTopForm.state = 1
                this.$ajax({
                    method: "POST",
                    url: BaseUrl + 'guess/topping',
                    data: this.placeTopForm,
                    headers: {'token': sessionStorage.getItem('token')}
                }).then(response => {
                    // console.log(response)
                    if (response.data.flag == 500) {
                        this.ensureTopVisible = false;
                        this.$alert(response.data.msg, '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$message({
                                    type: 'info',
                                    message: `error: ${ response.data.msg + ',请重试'}`
                                });
                            }
                        });
                    } else if (response.data.flag == 200) {
                        this.ensureTopVisible = false;
                        this.dialogFormVisible = false;
                        this.$alert(response.data.msg, '提示', {
                            confirmButtonText: '确定',
                            callback: this.getData({
                                page: this.currentPage,
                                size: this.nowPageSize,
                                order: "pos desc, endDate"
                            })
                        });
                        this.placeTopForm = ''
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
            trumpet(id) {
                this.trumpetFormVisible = true;
                this.id = id;
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
                console.log(this.startDate)
                if (this.startDate != '') {
                    searchForm.st1 = moment(this.GMTToStr(this.startDate[0])).utc().format('YYYY-MM-DD HH:mm:ss');
                    searchForm.st2 = moment(this.GMTToStr(this.startDate[1])).utc().format('YYYY-MM-DD HH:mm:ss');
                }
                if (this.endDate != '') {
                    searchForm.et1 = moment(this.GMTToStr(this.endDate[0])).utc().format('YYYY-MM-DD HH:mm:ss');
                    searchForm.et2 = moment(this.GMTToStr(this.endDate[1])).utc().format('YYYY-MM-DD HH:mm:ss');
                }
                if (this.state == 5) {
                    searchForm.state = null
                } else {
                    searchForm.state = this.state
                }
                searchForm.page = 1;
                searchForm.size = this.nowPageSize || 10;
                searchForm.order = "pos desc, endDate"
                this.getData(searchForm)
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {
                    });
            },
            lottery(id) {
                this.$router.push({path: "/lottery", query: {id: id}})
            },
            del(id) {
                this.delVisible = true;
                this.id = id;
            },
            delEnsure() {
                this.delVisible = false;
                this.$ajax({
                    method: "POST",
                    url: BaseUrl + 'guess/delById',
                    data: {id: this.id},
                    headers: {'token': sessionStorage.getItem('token')}
                }).then(response => {
                    if (response.data.flag == 500) {
                        this.$alert(response.data.msg, '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$message({
                                    type: 'info',
                                    message: `error: ${ response.data.msg + ',请重试'}`
                                });
                            }
                        });
                    } else if (response.data.flag == 200) {
                        this.$alert(response.data.msg, '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.getData({
                                    page: this.currentPage,
                                    size: this.nowPageSize,
                                    order: "pos desc, endDate"
                                })
                            }
                        });


                    } else if (response.data.flag == 201) {
                        this.$alert(response.data.msg + '请重新登录', '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$router.push('/')
                            }
                        });
                    }
                });
            },
            saveSumbit(a, b, c, d) {
                this.choiceFirst.num = Number(a);
                this.choiceFirst.bet = Number(b);
                this.choiceSecond.num = Number(c);
                this.choiceSecond.bet = Number(d);
                this.$ajax({
                    method: "POST",
                    url: BaseUrl + 'guess/agentJoin',
                    data: {id: this.id, data: [this.choiceFirst, this.choiceSecond]},
                    headers: {'token': sessionStorage.getItem('token')}
                }).then(response => {
                    if (response.data.flag == 200) {
                        // this.trumpetFormVisible=false
                        this.$alert(response.data.msg, '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.trumpetFormVisible = false
                            }
                        });
                    } else if (response.data.flag == 201) {
                        this.$alert(response.data.msg + '请重新登录', '提示', {
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
                    }
                });
            }

        },
        watch: {
            // 如果路由有变化，会再次执行该方法
            "$route": "getData(page: this.currentPage, size: this.nowPageSize,order:'pos desc, endDate')"
        }
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
