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
                <el-radio v-model="radio" label="1">按天展示</el-radio>
                <el-radio v-model="radio" label="2">按月展示</el-radio>
                <div style="float:right" :span="6">
                    <el-button type="primary">搜索</el-button>
                    <el-button type="primary">导出</el-button>
                </div>
            </div>
            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    label=""
                    prop="title">
                </el-table-column>
                <el-table-column
                    label="安装App数"
                    prop="allUsers">
                </el-table-column>
                <el-table-column
                    label="安装用户数"
                    prop="registerNum">
                </el-table-column>
                <el-table-column
                    label="安装挖矿"
                    prop="signUsers">
                </el-table-column>
                <el-table-column
                    label="打开App数"
                    prop="mine">
                </el-table-column>
                <el-table-column
                    label="打开用户数"
                    prop="mine">
                </el-table-column>
                <el-table-column
                    label="打开App挖矿（BCD）"
                    prop="mine">
                </el-table-column>
                <el-table-column
                    label="邀请好友挖矿（BCD）"
                    prop="mine">
                </el-table-column>
                <el-table-column
                    label="注册挖矿（BCD）"
                    prop="mine">
                </el-table-column>
                <el-table-column
                    label="挖矿总和（BCD）"
                    prop="mine">
                </el-table-column>
            </el-table>

        </div>
    </div>

</template>

<script>
    import {baseUrl, baseImgPath} from "@/config/env";
    import headTop from '../components/headTop'
    export default {
        data() {
            return {
                radio:'1',
                radio3:'1',
                tableData:[
                    {title:'总计',allUsers:'10000',registerNum:'122',signUsers:'9334',mine:'1234'},
                    {title:'2018-08-23',allUsers:'10000',registerNum:'122',signUsers:'9334',mine:'2345'}
                ],
                startDate:'',
                endDate:'',
            };
        },
        components: {
            headTop
        },
        created() {
        },
        computed: {},
        methods: {
        },

    };
</script>

<style lang="less">
    @import "../style/mixin";
    .table_container{
        padding: 20px;
    }
</style>
