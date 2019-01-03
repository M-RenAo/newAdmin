<template>
    <div class="fillcontain">
        <div class="table_container">
            <el-row style="display:flex;margin-bottom: 20px;">
                <div>
                    <el-button type="primary" @click="addSys()">新增</el-button>
                </div>
            </el-row>
            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    label="系统升级公告"
                    prop="title">
                </el-table-column>
                <el-table-column
                    label="升级时间"
                    prop="pushDate">
                </el-table-column>
                <!--<el-table-column label="操作" width="200">-->
                <!--<template scope="scope">-->
                <!--<el-button @click="updatePush(scope.row.id)" v-if="scope.row.state==0">编辑</el-button>-->
                <!--<el-button @click="del(scope.row.id)" v-if="scope.row.state==0">删除</el-button>-->
                <!--</template>-->

                <!--</el-table-column>-->
            </el-table>

            <!--<div class="Pagination">-->
            <!--<el-pagination-->
            <!--@current-change="handleCurrentChange"-->
            <!--:current-page="currentPage"-->
            <!--:page-size="20"-->
            <!--layout="total, prev, pager, next"-->
            <!--:total="count">-->
            <!--</el-pagination>-->
            <!--</div>-->
        </div>
    </div>
</template>

<script>
    import {baseUrl, baseImgPath} from '@/config/env'

    export default {
        data() {
            return {
                input: '',
                value: '2',
                startDate: '',
                endDate: '',
                tableData: [],
                currentRow: null,
                offset: 0,
                limit: 20,
                count: 0,
                currentPage: 1,
                delVisible: false,
                id: ''
            }
        },
        created() {
            this.getData()
        },
        computed: {},
        methods: {
            getData() {
            },
            addSys() {
                this.$router.push({path: '/addSys'})
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
