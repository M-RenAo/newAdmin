<template>
    <div class="fillcontain">
        <div class="table_container">
            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    label="注册时间"
                    prop="inviteDate">
                </el-table-column>
                <el-table-column
                    label="邀请码"
                    prop="inviteCode">
                </el-table-column>
                <el-table-column
                    label="姓名"
                    >
                    <template scope="scope">
                        <div :class="{'up-state-type':scope.row.name===undefined}">
                           {{scope.row.name!==undefined?scope.row.name:'未实名'}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    label="昵称"
                    prop="nick">
                </el-table-column>
                <el-table-column
                    label="好友注册手机号"
                    prop="phone">
                </el-table-column>
                <el-table-column
                    label="奖励"
                    prop="income">
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

    let moment = require("moment");
    export default {
        data() {
            return {
                tableData: [],
                nowPageSize: 10,
                txcount: 0,
                currentPage: 1,
            }
        },
        created() {
            this.getData()
        },
        computed: {},
        components: {},
        methods: {
            getData() {
                this.$ajax.get(BaseUrl + 'inviterecord/all/' + this.$route.query.id + '/' + this.currentPage + '/' + this.nowPageSize, {headers: {'token': sessionStorage.getItem('token')}}).then(response => {
                    if (response.data.flag == 200) {
                        this.tableData = response.data.data.list;
                        this.txcount = response.data.data.num;
                        this.tableData.forEach(item => {
                            item.inviteDate = moment(item.inviteDate).format('YYYY-MM-DD HH:mm:ss')
                        })
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
            handleSizeChange(pageSize) {
                this.nowPageSize = pageSize;
                this.currentPage = 1;
                this.getData();
            },
            handleCurrentChange(pageValue) {
                this.currentPage = pageValue;
                this.getData();
            },
        },
    }
</script>

<style lang="less" scoped>
    @import '../style/mixin';

    .table_container {
        padding: 20px;
    }
    .up-state-type{
        color:red;
    }
</style>
