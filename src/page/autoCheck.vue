<template>
    <div>
        <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
                prop="date"
                label="账户名"
                width="180">
            </el-table-column>
            <el-table-column
                label="收款地址"
            >
                <template scope="scope">
                    <el-button style=" padding:5px 10px!important;margin-left: 0!important;" type="text"
                               v-clipboard:copy="scope.row.url" v-clipboard:success="onCopy"
                               v-clipboard:error="onError"
                               v-if="scope.row.url!=undefined&&scope.row.url!=''">复制
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column
                prop="address"
                label="申请时间">
            </el-table-column>
            <el-table-column
                prop="address"
                label="提取金额">
            </el-table-column>
            <el-table-column
                prop="address"
                label="提取备注">
            </el-table-column>
        </el-table>
        <div class="Pagination">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-size.sync="nowPageSize"
                :page-sizes="[5, 10, 20, 40]"
                :total="txcount"
                layout="total, sizes, prev, pager, next, jumper"
            >
            </el-pagination>
        </div>
    </div>
</template>
<script>
    let moment = require('moment')
    export default {
        data() {
            return {
                tableData: [],
                txcount: 0,
                totalfees: 0,
                currentPage: 1,
                nowPageSize: 10,
                url: '',
                dappForm: {},
                dialogFormVisible: false,
                formLabelWidth: '150px',
                checkText: '保存',
                remarks: '',
                state: '',
                socialNetwork:[],
                smartContract:[]
            }
        },
        created() {
            this.queryListData()
        },
        methods: {
            onCopy() {
                this.$message({
                    message: '复制成功',
                    type: 'success'
                });
            },
            onError() {
                this.$message({
                    message: '复制失败',
                    type: 'error'
                });
            },
            // 获取列表数据
            queryListData() {
                this.$ajax({
                    method: "POST",
                    url: BaseUrl + 'dappReview/query',
                    data:{page:this.currentPage,size:this.nowPageSize,reviewed:this.activeName==-1?null:Number(this.activeName),order:"ctime desc"},
                    headers: {'token': sessionStorage.getItem('token')}
                }).then(response => {
                    if (response.data.flag == 200) {
                        this.dappTable=response.data.data.data
                        this.txcount=response.data.data.count
                        this.dappTable.forEach(item=>{
                            item.ctimes=moment.utc(item.ctime).local().format('YYYY-MM-DD HH:mm:ss')
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
            // 分页
            handleSizeChange(pageSize) {
                this.currentPage=1
                this.nowPageSize = pageSize;
                this.queryListData();
            },
            handleCurrentChange(pageValue) {
                this.currentPage = pageValue;
                this.queryListData();
            },
        },
    }
</script>
