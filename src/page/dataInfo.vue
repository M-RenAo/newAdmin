<template>
    <div>
        <div class="table_container">
            <div type="flex" style="margin-bottom: 30px;">
                <span style="font-size: 14px;">时间：</span>
                <el-date-picker
                    v-model="startDate"
                    type="datetime"
                    placeholder="开始时间"
                >
                </el-date-picker>
                —
                <el-date-picker
                    v-model="endDate"
                    type="datetime"
                    placeholder="结束时间"
                >
                </el-date-picker>
                <span style="font-size: 14px;margin-left: 10px;">类型：</span>
                <el-select v-model="value" placeholder="请选择">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <div style="float:right" :span="6">
                    <el-button type="primary">搜索</el-button>
                    <el-button type="primary">导出</el-button>
                </div>
            </div>
            <el-table
                :data="tableData"
                style="width: 100%!important;">
                <el-table-column
                    label="类型"
                    prop="title" min-width="70">
                </el-table-column>
                <el-table-column
                    label="手机号"
                    prop="allUsers" min-width="70">
                </el-table-column>
                <el-table-column
                    label="姓名"
                    prop="registerNum" min-width="70">
                </el-table-column>
                <el-table-column
                    label="时间"
                    prop="signUsers" min-width="70">
                </el-table-column>
                <el-table-column
                    label="累计安装用户数"
                    prop="signUsers" min-width="70">
                </el-table-column>
                <el-table-column
                    label="累计打开次数"
                    prop="signUsers" min-width="70">
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

</template>

<script>
    export default {
        data() {
            return {
                radio: '1',
                tableData: [
                    {title: '总计', allUsers: '10000', registerNum: '122', signUsers: '9334'},
                    {title: '2018-08-23', allUsers: '10000', registerNum: '122', signUsers: '9334'}
                ],
                options: [{
                    value: '1',
                    label: '全部'
                }, {
                    value: '2',
                    label: '打开'
                }, {
                    value: '3',
                    label: '安装'
                }, {
                    value: '4',
                    label: '重新下载'
                }],
                value: '1',
                startDate: '',
                endDate: '',
                txcount: 0,
                nowPageSize: 10,
                currentPage: 1
            };
        },
        components: {},
        created() {
            // this.initData();
            // for (let i = 6; i > -1; i--) {
            //     const date = dtime(new Date().getTime() - 86400000*i).format('YYYY-MM-DD')
            //     this.sevenDay.push(date)
            // }
            // this.getSevenData();
        },
        computed: {},
        methods: {
            recordInfo() {

            }
        },

    };
</script>

<style lang="less" scoped>
    @import "../style/mixin";

    .table_container {
        padding: 20px;
    }

    .littleButton {
        padding: 5px 10px;
    }

    .el-table .cell, .el-table th > div {
        padding-left: 13px;
        padding-right: 13px;
        box-sizing: border-box;
        text-overflow: ellipsis;
    }
</style>
