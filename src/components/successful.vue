<template>
    <div class="content">
        <div style="padding-bottom: 10px">
            <span class="username" v-if="thisName">用户：{{thisName}}</span>
            <span v-if="inviterName">经{{inviterName}}邀请注册</span>
        </div>
        <div class="content">
            <!-- <span class="realname">实名状态</span>
            <el-select v-model="selectvalue" placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select> -->
        </div>
        <div>
            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    fixed
                    prop="inviteDate"
                    label="日期"
                    min-width="80">
                </el-table-column>
                <el-table-column
                    prop="phone"
                    label="手机号"
                    min-width="50">
                </el-table-column>
                <el-table-column
                    prop="nick"
                    label="昵称"
                    min-width="50">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="姓名"
                    min-width="50">
                </el-table-column>
                <el-table-column
                    prop="state"
                    label="实名状态"
                    min-width="50">
                </el-table-column>
                <el-table-column
                    prop="income"
                    label="奖励"
                    min-width="50">
                </el-table-column>
            </el-table>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[5,10,20,30]"
                :page-size="nowPageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="usercount">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    let moment = require('moment')
    export default {
        props: ["userId", "thisName"],
        data() {
            return {
                tableData: [],
                usercount: 0,//用户总数
                currentPage: 1,
                nowPageSize: 5,
                inviterName: ""//经谁邀请
            }
        },
        created() {
            this.getData();
        },
        methods: {
            handleCommand(command) {

                this.command = command;
            },
            handleSizeChange(val) {
                this.nowPageSize = val
                this.getData();
            },
            handleCurrentChange(val) {
                this.currentPage = val
                this.getData();
            },
            getData() {
                this.$ajax.get(BaseUrl + "inviterecord/all/" + this.userId + "/" + this.currentPage + "/" + this.nowPageSize, {
                    headers: {'token': sessionStorage.getItem('token')}
                }).then(res => {
                        res.data.data.list.forEach(item => {
                            if (item.inviteDate != undefined) {
                                item.inviteDate = moment.utc(item.inviteDate).local().format('YYYY-MM-DD HH:mm:ss')
                            }
                            item.state = "未实名"
                            if (item.name != undefined) {
                                item.state = "已实名"
                            }
                        })
                        this.tableData = res.data.data.list;
                        this.usercount = res.data.data.num;
                        this.inviterName = res.data.data.inviterName
                    }
                )

            }
        },
        watch: {
            userId(curVal, oldval) {
                this.userId = curVal;
                this.currentPage = 1;
                this.nowPageSize = 5;
                this.getData();

            }
        }

    }
</script>
<style lang="less" scoped>
    @import "../style/mixin";

    .realname {
        color: #000;
        padding-right: 20px;
        font-size: 16px;
        font-weight: 900;
    }

    .username {
        color: #000;
        padding-right: 20px;
        font-size: 20px;
        font-weight: 900;

    }

    .content {
        text-align: left
    }
</style>

