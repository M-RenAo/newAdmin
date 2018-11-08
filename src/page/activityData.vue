<template>
    <div>
        <div class="table_container">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="邀请好友" name="invitingfriends"></el-tab-pane>
                <el-tab-pane label="猜猜" name="guess"></el-tab-pane>
                <el-tab-pane label="待定" name="undetermined"></el-tab-pane>
            </el-tabs>
            <el-row type="flex" style="margin-bottom: 30px;">
                <el-col style="display: flex;justify-content: flex-start">
                    <el-input placeholder="关键字" class="input-with-select"
                              style="width:40%">
                        <el-button slot="append" @click="searchKeyword"><i class="el-icon-search"></i></el-button>
                    </el-input>
                </el-col>
            </el-row>
        </div>
        <div class="block date">
            <el-date-picker v-model="date" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['00:00:00', '23:59:59']" value-format="timestamp">
            </el-date-picker>
            <el-button type="primary" @click="searchdate">搜索</el-button>
        </div>
        <div class="table">
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="username" label="用户名" min-width="50"></el-table-column>
                <el-table-column prop="name" label="姓名" min-width="50"> </el-table-column>
                <el-table-column prop="phonenumber" label="手机号" min-width="50"></el-table-column>
                <el-table-column prop="regtime" label="注册时间" min-width="50">
                </el-table-column>
                <el-table-column prop="realtime" label="实名时间" min-width="50"></el-table-column>
                <el-table-column label="邀请成功注册人数" min-width="50" >
                <template scope="scope">
                <el-dialog :visible.sync="dialogTableVisible">
                    <success-ful></success-ful>
                </el-dialog>
                
                <div class="columnstyle" @click="dialogTableVisible = true">
                        {{scope.row.successful}}
                </div>
                </template>
                </el-table-column>
                <el-table-column
                label="邀请成功实名人数"
                min-width="50">
                <template scope="scope">
                    <el-dialog :visible.sync="dialogTableVisible">
                        <success-ful></success-ful>
                    </el-dialog>
                    <div class="columnstyle" @click="dialogTableVisible = true">
                        {{scope.row.successreal}}
                    </div>
                </template>
                </el-table-column>
                <el-table-column
                prop="total"
                label="iA总量"
                min-width="50">
                </el-table-column>
            </el-table>
        </div>
        <div class="page">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage4"
                :page-sizes="[100, 200, 300, 400]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="400">
            </el-pagination>
        </div>
    </div>
</template>
<script>
    import successFul from "../components/successful"
    export default {
        data() {
            return {
                date: '',
                activeName: 'invitingfriends',
                dialogTableVisible: false,
                tableData: [{
                    username: '老王',
                    name: '王小虎',
                    phonenumber: '213123213213123123123',
                    regtime:"2018-11-6",
                    realtime:"2018-11-6",
                    successful:"2222",
                    successreal:"96587",
                    total:23
                    },
                    {
                    username: '老留',
                    name: '张三',
                    phonenumber: '13812345589',
                    regtime:"2018-11-6",
                    realtime:"2018-11-6",
                    successful:"2222",
                    successreal:"96587",
                    total:23
                    },
                    {
                    username: '老李',
                    name: '李四',
                    phonenumber: '13812345589',
                    regtime:"2018-11-6",
                    realtime:"2018-11-6",
                    successful:"2222",
                    successreal:"96587",
                    total:23
                    },
                    {
                    username: '老杨',
                    name: '杨继红',
                    phonenumber: '13812345589',
                    regtime:"2018-11-6",
                    realtime:"2018-11-6",
                    successful:"2222",
                    successreal:"96587",
                    total:23
                    },
                    ],
                currentPage1: 5,
                currentPage2: 5,
                currentPage3: 5,
                currentPage4: 1
            };
        },
        methods: {
            searchdate() {
                console.log(this.date)
            },
            searchKeyword(){

            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            handleClick(tab, event) {
                console.log(tab, event);
                console.log(this.activeName)
            },
            // cellClick(row, column, cell, event){
            //     console.log(row, column, cell, event);
            // },
            
        },
        components:{
            successFul
        }
    };
</script>
<style lang="less">
    @import "../style/mixin";
    .table_container {
        padding: 20px;
        padding-bottom: 0
    }
    .date{
        padding:20px;
        padding-top: 0
    }
    .table{
        padding:0 20px 0 20px
    }
    .columnstyle{
        color:dodgerblue;
        cursor: pointer;
    }

</style>
