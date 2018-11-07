<template>
    <div>
        <div class="table_container">
            <div type="flex"  style="margin-bottom: 30px;">
                <span style="font-size: 14px;">时间：</span>
                <el-date-picker style="width:200px;"
                                v-model="endDate"
                                type="datetimerange"
                                align="right"
                                :default-time="['12:00:00', '08:00:00']">
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
                    label="时间"
                    prop="title" min-width="70">
                </el-table-column>
                <el-table-column
                    label="类型"
                    prop="allUsers" min-width="70">
                </el-table-column>
                <el-table-column
                    label="金额（BCD）"
                    prop="registerNum" min-width="70">
                </el-table-column>
                <el-table-column
                    label="手机号"
                    prop="signUsers" min-width="70">
                </el-table-column>
                <el-table-column
                    label="姓名"
                    prop="signUsers" min-width="70">
                </el-table-column>
                <el-table-column label="操作"min-width="50">
                    <template scope="scope">
                        <el-button class="littleButton" @click="recordInfo(scope.row.signUsers)">详情</el-button>
                    </template>
                </el-table-column>
            </el-table>

        </div>
    </div>

</template>

<script>
    import {baseUrl, baseImgPath} from "@/config/env";
    export default {
        data() {
            return {
                radio:'1',
                tableData:[
                    {title:'总计',allUsers:'10000',registerNum:'122',signUsers:'9334'},
                    {title:'2018-08-23',allUsers:'10000',registerNum:'122',signUsers:'9334'}
                ],
                options: [{
                    value: '1',
                    label: '全部'
                }, {
                    value: '2',
                    label: '收款-BCD钱包转进来'
                }, {
                    value: '3',
                    label: '收款-链城钱包转进来'
                }, {
                    value: '4',
                    label: '转账-转出至BCD钱包'
                }, {
                    value: '5',
                    label: '转账-转出至链城钱包'
                }, {
                    value: '6',
                    label: '安装应用挖矿收益'
                }, {
                    value: '7',
                    label: '打开应用挖矿收益'
                }, {
                    value: '8',
                    label: '邀请好友挖矿收益'
                }, {
                    value: '9',
                    label: '注册挖矿收益'
                }, {
                    value: '10',
                    label: '竞猜花费'
                }, {
                    value: '11',
                    label: '竞猜赚取'
                }, {
                    value: '12',
                    label: '链成分成收益'
                }],
                value: '1',
                startDate:'',
                endDate:'',
            };
        },
        components: {
        },
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
            recordInfo(){

            }
        },

    };
</script>

<style lang="less" scoped>
    @import "../style/mixin";
    .table_container{
        padding: 20px;
    }
    .littleButton{
        padding: 5px 10px;
    }
    .el-table .cell, .el-table th>div{
        padding-left: 13px;
        padding-right: 13px;
        box-sizing: border-box;
        text-overflow: ellipsis;
    }
</style>
