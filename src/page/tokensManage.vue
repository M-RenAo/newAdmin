<template>
    <div>
        <div class="table_container">
            <div style="margin-bottom: 30px">
                <el-input placeholder="代币名称" class="input-with-select" v-model="searchInfo"
                          style="width:200px;margin-left:10px" @keyup.enter.native="searchDapp(searchInfo)">
                    <el-button slot="append" @click="searchDapp(searchInfo)"><i class="el-icon-search"></i></el-button>
                </el-input>
            </div>
            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    label="代币名称"
                    prop="title">
                </el-table-column>
                <el-table-column
                    label="合约地址"
                    prop="title">
                </el-table-column>
                <el-table-column
                    label="平均价格"
                >
                </el-table-column>
                <el-table-column
                    label="官网地址"
                    prop="title">
                </el-table-column>
                <el-table-column
                    label="总持有量"
                    prop="title">
                </el-table-column>
                <el-table-column
                    label="拥有用户数"
                >
                </el-table-column>
                <el-table-column
                    label="人均持有量"
                    prop="title">
                </el-table-column>
                <el-table-column
                    label="操作"
                >
                    <template scope="scope">
                        <el-button type="text" @click="detailCheck(scope.row.title)">用户明细</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="Pagination">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="nowPageSize"
                    :page-sizes="[5,10,20,30,40]"
                    :total="txcount"
                    layout="total, sizes, prev, pager, next, jumper"
                >
                </el-pagination>
            </div>
        </div>
        <el-dialog :title="'代币：'+name" :visible.sync="dialogTableVisible" width="1000px">
            <el-table :data="historyData">
                <el-table-column property="createTime" label="账户名称"></el-table-column>
                <el-table-column property="amount" label="手机号"></el-table-column>
                <el-table-column property="type" label="持有量"></el-table-column>
                <el-table-column property="remark" label="添加时间"></el-table-column>
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
        </el-dialog>
    </div>

</template>

<script>
    let moment = require('moment');
    export default {
        data() {
            return {
                searchInfo:'',
                dialogTableVisible:false,
                currentPage:1,
                nowPageSize:10,
                txcount:0,
                name:'',
                historyData:[],
                tableData:[
                    {title:'ceshi'}
                ],

            };
        },
        created() {
            this.$ajax.get(BaseUrl + 'data/sum',
                {headers: {'token': sessionStorage.getItem('token')}}).then(response => {
                if (response.data.flag == 200) {
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
        computed: {},
        methods: {
            searchDapp(){

            },
            handleSizeChange(){

            },
            handleCurrentChange(){

            },
            detailCheck(name){
                this.name=name
                this.dialogTableVisible=true
            }
        },

    };
</script>

<style lang="less" scoped>
    @import "../style/mixin";

    .table_container {
        padding: 20px;
    }

    .card-data {
        padding: 5px 10px;
        color: #fff;
        width: 200px;
        height: 100px;
        margin-right: 15px;
        background: #85ce61;
    }

    .card-data:last-child {
        padding: 5px 10px;
        width: 200px;
        height: 100px;
        margin-right: 0px;

    }
</style>
