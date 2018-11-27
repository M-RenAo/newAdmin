<template>
    <div>
        <div class="table_container">
            <el-row type="flex" style="margin-bottom: 30px;">
                <div style="float:right">
                    <el-button type="primary" style="margin-right:10px;margin-bottom:2px;"
                               @click="add()">变更
                    </el-button>
                    <!--<el-button type="primary" style="margin-left:0">导出</el-button>-->
                </div>
            </el-row>
            <el-table
                :data="tableData"
                style="width: 100%"
            >
                <el-table-column
                    min-width="50"
                    label="安装挖矿（IA）"
                    prop="installReward">
                </el-table-column>
                <el-table-column
                    min-width="50"
                    label="安装每日上限（个）"
                    prop="installTimesLimited">
                </el-table-column>
                <el-table-column
                    min-width="50"
                    label="打开挖矿（IA）"
                    prop="openReward">
                </el-table-column>
                <el-table-column
                    min-width="50"
                    label="打开每日上限（个）"
                    prop="openTimesLimited">
                </el-table-column>
                <el-table-column
                    min-width="50"
                    label="邀请好友挖矿（IA）"
                    prop="inviteReward">
                </el-table-column>
                <el-table-column
                    min-width="50"
                    label="注册挖矿（IA）"
                    prop="registerReward">
                </el-table-column>
                <!--<el-table-column-->
                <!--label="使用规则时间"-->
                <!--&gt;-->
                <!--<template scope="scope">-->
                <!--<span>{{scope.row.startDate}}~{{scope.row.endDate}}</span>-->
                <!--</template>-->
                <!--</el-table-column>-->
            </el-table>
            <!--<div class="Pagination">-->
            <!--<el-pagination-->
            <!--@size-change="handleSizeChange"-->
            <!--@current-change="handleCurrentChange"-->
            <!--:current-page="currentPage"-->
            <!--:page-size="nowPageSize"-->
            <!--:page-sizes="[5, 10, 20, 40]"-->
            <!--:total="txcount"-->
            <!--layout="total, sizes, prev, pager, next, jumper"-->
            <!--&gt;-->
            <!--</el-pagination>-->
            <!--</div>-->
        </div>
    </div>

</template>

<script>
    import {baseUrl, baseImgPath} from "@/config/env";
    import headTop from '../components/headTop'

    export default {
        data() {
            return {
                id: '',
                tableData: [],
                options: [{
                    value: '4',
                    label: '全部'
                }, {
                    value: '1',
                    label: '已打卡'
                }, {
                    value: '0',
                    label: '未打卡'
                }],
                startDate: '',
                endDate: '',
                state: '4',
                txcount: 0,
                currentPage: 1,
                nowPageSize: 10,
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
                timePeriod: ''

            };
        },
        components: {
            headTop
        },
        created() {
            // const form = {page: this.currentPage, size: this.nowPageSize,order:"startDate desc"}
            this.getData()
        },
        computed: {},
        methods: {
            getData() {
                this.$ajax({
                    method: "POST",
                    url: BaseUrl + 'mining/getrulelist',
                    // data: form
                    headers: {'token': sessionStorage.getItem('token')}
                }).then(response => {
                    if (response.data.flag == 200) {
                        // console.log(response)
                        this.tableData = response.data.data;
                    } else if (response.data.flag == 201) {
                        this.$alert(response.data.msg + '，请重新登录', '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$router.push('/')
                            }
                        });
                    }
                    // this.txcount = response.data.data.count
                    // this.tableData.forEach(item => {
                    //     item.results = JSON.parse(item.result).A + JSON.parse(item.result).B;
                    //     if (item.state == 1) {
                    //         item.status = '进行中'
                    //     } else if (item.state == 0) {
                    //         item.status = '已结束'
                    //     } else if (item.state == 2) {
                    //         item.status = '待开奖'
                    //     } else {
                    //         item.status = '未开始'
                    //     }
                    // });
                });
            },
            // handleSizeChange(pageSize) {
            //     console.log(">>>>>>pageSize", pageSize);
            //     // this.nowPageSize = pageSize;
            //     // if (this.searchForm == '') {
            //     //     var listParams = {
            //     //         page: 1,
            //     //         size: pageSize,
            //     //         order:"startDate desc"
            //     //     };
            //     // } else {
            //     //     this.searchForm.page = 1;
            //     //     this.searchForm.size = pageSize
            //     //     this.searchForm.order="startDate desc"
            //     //     var listParams = this.searchForm
            //     // }
            //     // this.getData(listParams);
            // },
            // handleCurrentChange(pageValue) {
            //     console.log(">>>>>>pageValue", pageValue);
            //     // this.currentPage = pageValue;
            //     // if (this.searchForm == '') {
            //     //     var listParams = {
            //     //         page: pageValue,
            //     //         size: this.nowPageSize || 10,
            //     //         order:"startDate desc"
            //     //     };
            //     // } else {
            //     //     this.searchForm.page = pageValue;
            //     //     this.searchForm.size = this.nowPageSize || 10;
            //     //     this.searchForm.order="startDate desc"
            //     //     var listParams = this.searchForm
            //     // }
            //     //
            //     // this.getData(listParams);
            // },
            trumpet(id) {
                this.trumpetFormVisible = true
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
            add() {
                this.$router.push({path: '/addDigRule'})
            },
            // toggleSelection(rows) {
            //     if (rows) {
            //         rows.forEach(row => {
            //             this.$refs.multipleTable.toggleRowSelection(row);
            //         });
            //     } else {
            //         this.$refs.multipleTable.clearSelection();
            //     }
            // },

        },

    };
</script>

<style lang="less" scoped>
    @import "../style/mixin";

    .table_container {
        padding: 20px;
    }

    .myCell {
        .cell {
            .el-checkbox {
                .el-checkbox__input {
                    display: none !important;
                    opacity: 0;
                }
            }
        }
    }

    .littleButton {
        padding: 5px 10px !important;
        margin-left: 0 !important;
    }
</style>
