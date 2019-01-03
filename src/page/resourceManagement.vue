<template>
    <div>
        <div class="table_container">
            <div style="display: flex;font-size: 14px;margin-bottom: 20px">
                <div class="card-data">
                    <p style="font-size: 16px;">CPU</p>
                    <div style="height: 30px;display: flex;align-items: center;font-size: 16px;color: #fff;margin-top: 10px">
                        当前抵押：{{regiNum}}
                    </div>
                    <div style="height: 30px;display: flex;align-items: center;font-size: 16px;color: #fff">
                        正在赎回：{{regiNum}}
                    </div>
                </div>
                <div class="card-data">
                    <p style="font-size: 16px;">NET</p>
                    <div style="height: 30px;display: flex;align-items: center;font-size: 16px;color:#fff;margin-top: 10px ">
                        当前抵押：{{regiNum}}
                    </div>
                    <div style="height: 30px;display: flex;align-items: center;font-size: 16px;color: #fff">
                        正在赎回：{{regiNum}}
                    </div>
                </div>
                <div style="display: flex;align-items: flex-end">
                    <el-button @click="mortgage()">抵押</el-button>
                </div>
            </div>
            <div>抵押记录</div>
            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    label="抵押时间"
                    prop="title">
                </el-table-column>
                <el-table-column
                    label="CPU抵押金额"
                    prop="loginNum">
                </el-table-column>
                <el-table-column
                    label="CPU"
                >
                </el-table-column>
                <el-table-column
                    label="NET抵押金额"
                    prop="regiNum">
                </el-table-column>
                <el-table-column
                    label="NET"
                    prop="authNum">
                </el-table-column>
                <el-table-column
                    label="接受账户"
                >
                </el-table-column>
                <el-table-column
                    label="操作人员"
                >
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
        <el-dialog title="资源抵押" :visible.sync="dialogFormVisible" width="700px">
            <el-form :model="form">
                <el-form-item label="CPU" :label-width="formLabelWidth">
                    　<el-input v-model="form.amounts" type="number" style="width:400px"></el-input>
                </el-form-item>
                <el-form-item label="NET" :label-width="formLabelWidth">
                    　<el-input v-model="form.amounts" type="number"  style="width:400px"></el-input>
                </el-form-item>
            </el-form>
            <div style="display: flex;justify-content: center">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>

</template>

<script>
    import tendency from '../components/tendency'
    let moment = require('moment');
    export default {
        data() {
            return {
                regiNum:10,
                tableData: [],
                tagname:'',
                tagList:[],
                searchInfo:'',
                dialogFormVisible:false,
                currentPage:1,
                nowPageSize:10,
                txcount:0,
                name:'',
                formLabelWidth:'120px',
                historyData:[],
                form:{}

            };
        },
        components: {
            tendency
        },
        created() {
        },
        computed: {},
        methods: {
            searchDappByTag(){

            },
            searchDapp(){

            },
            handleSizeChange(){

            },
            handleCurrentChange(){

            },
            mortgage(){
                this.dialogFormVisible=true
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
