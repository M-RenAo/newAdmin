<template>
    <div>
        <el-card class="box-card">
            <el-row style="display:flex;align-items: center">
                <el-col :span="12">
                    <div style="font-weight: 700;letter-spacing: 1px;">竞猜账户余额：{{quizAmount.balance|MoneyFormat}} IA</div>
                    <div style="letter-spacing: 1px;font-size:14px">竞猜收益余额：{{quizAmount.allIncome|MoneyFormat}} IA</div>
                </el-col>
                <el-col :span="12" style="display:flex;justify-content: flex-end">
                    <el-button @click="modifyGuess" type="primary">修改竞猜账户密码</el-button>
                </el-col>
            </el-row>
        </el-card>
        <!--<el-form :model="appForm" ref="appForm" label-width="110px" style="margin-top: 20px;margin-left: 20px;">-->
        <!--<div>-->
        <!--<div style="display: flex;margin-bottom: 20px;">-->
        <!--<h4>小号使用IA：</h4>-->
        <!--</div>-->
        <!--<el-form-item label="竞猜总投入：" prop="name">-->
        <!--{{appForm.fileVersion}}-->
        <!--</el-form-item>-->
        <!--<el-form-item label="总输赢：" prop="name">-->
        <!--{{appForm.fileDate}}-->
        <!--</el-form-item>-->
        <!--&lt;!&ndash;<el-form-item label="历史版本：" prop="name">&ndash;&gt;-->
        <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->

        <!--</div>-->
        <!--</el-form>-->
        <div style="display: flex;margin: 20px 0px;margin-left: 20px;">
            <h4>流水记录：</h4>
        </div>
        <el-row type="flex" style="margin-bottom: 30px;margin-top: 20px;margin-left: 20px;">
            <el-col :span="19" style="display:flex;align-items: center">
                <span style="font-size: 14px;">类型：</span>
                <el-select v-model="value" placeholder="请选择" style="margin-bottom: 2px">
                    <el-option
                        v-for="item in options"
                        :key="item.code"
                        :label="item.title"
                        :value="item.code">
                    </el-option>
                </el-select>
            </el-col>
            <div style="float:right">
                <el-button type="primary" style="margin-right:10px;margin-bottom:2px;"
                           @click="search(searchForm)">搜索
                </el-button>
                <!--<el-button type="primary" style="margin-left:0">导出</el-button>-->
            </div>
        </el-row>
        <el-table
            :data="tableData"
            style="width: 100%"
        >
            <el-table-column
                label="时间"
                prop="ctime">
            </el-table-column>
            <el-table-column
                label="类型"
                prop="type">
            </el-table-column>
            <el-table-column
                label="详情"
                prop="remark">
            </el-table-column>
            <el-table-column
                label="变动金额"
                prop="amount">
            </el-table-column>
            <el-table-column
                label="竞猜账户余额"
               >
                <template scope="scope">
                    {{scope.row.balance|MoneyFormat}}
                </template>
            </el-table-column>
            <el-table-column
                label="竞猜收益余额"
                prop="income">
            </el-table-column>
        </el-table>
        <div class="Pagination" style="margin-left: 20px;">
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
        <el-dialog title="请输入竞猜账户密码" :visible.sync="dialogFormVisible">
            <el-form>
                <el-form-item label="账户密码" :label-width="formLabelWidth" prop="title">
                    <el-input v-model="oldPass" type="password" auto-complete="off" style="width:80%"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false;">取 消</el-button>
                <el-button type="primary" @click="ensure(oldPass)">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="请输入竞猜新账户密码" :visible.sync="newFormVisible">
            <el-form>
                <el-form-item label="新账户密码" :label-width="formLabelWidth" prop="title">
                    <el-input v-model="newPass" type="password" auto-complete="off" style="width:80%"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="newFormVisible = false;">取 消</el-button>
                <el-button type="primary" @click="ensureNew(newPass)">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    let moment=require('moment')
    export default {
        data() {
            return {
                appForm: {},
                currentPage: 1,
                nowPageSize: 10,
                txcount: 0,
                tableData: [],
                quizAmount: {},
                oldPass: '',
                newPass: '',
                dialogFormVisible: false,
                newFormVisible: false,
                value: '0',
                options: [
                    {title: '全部', code: '0'},
                    {title: 'IA总资产账户转账至竞猜账户', code: '1'},
                    {title: '结算至平台收益账户', code: '2'},
                    {title: '竞猜抽成', code: '3'},
                    {title: '小号竞猜', code: '4'},
                ],
                formLabelWidth: '120px'
            };
        },
        created() {
            this.$ajax({
                method: "POST",
                url: BaseUrl+'imwallet/appwalletinfo',
                params: {type:'2341a6e2c53d4ed182bd35bee0ddce84'},
                headers: {'token': sessionStorage.getItem('token')}
            }).then(response => {
                if(response.data.flag==200) {
                    this.quizAmount = response.data.data;
                }else if(response.data.flag==201){
                    this.$alert(response.data.msg+'，请重新登录', '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$router.push('/')
                        }
                    });
                }
            });
// const form = {page: this.currentPage, size: this.nowPageSize,order:"startDate desc"}
           this.getData()
        },
        computed: {},
        methods: {
            getData() {
                this.$ajax({
                    method: "POST",
                    url:BaseUrl+'guess/guessBill',
                    params:{page:this.currentPage,size:this.nowPageSize},
                    headers: {'token': sessionStorage.getItem('token')}
                }).then(response => {
                    if(response.data.flag==200){
                    this.tableData = response.data.data.data;
                    this.tableData.forEach(item=>{
                        item.ctime=moment.utc(item.ctime).local().format('YYYY-MM-DD HH:mm:ss')
                    })
                    this.txcount = response.data.data.count
                    }else if(response.data.flag==201){
                        this.$alert(response.data.msg+'，请重新登录', '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$router.push('/')
                            }
                        });
                    }
                });
            },
            handleSizeChange(pageSize) {
                console.log(">>>>>>pageSize", pageSize);
this.nowPageSize = pageSize;
// if (this.searchForm == '') {
//     var listParams = {
//         page: 1,
//         size: pageSize,
//         order:"startDate desc"
//     };
// } else {
//     this.searchForm.page = 1;
//     this.searchForm.size = pageSize
//     this.searchForm.order="startDate desc"
//     var listParams = this.searchForm
// }
this.getData();
            },
            handleCurrentChange(pageValue) {
                console.log(">>>>>>pageValue", pageValue);
this.currentPage = pageValue;
// if (this.searchForm == '') {
//     var listParams = {
//         page: pageValue,
//         size: this.nowPageSize || 10,
//         order:"startDate desc"
//     };
// } else {
//     this.searchForm.page = pageValue;
//     this.searchForm.size = this.nowPageSize || 10;
//     this.searchForm.order="startDate desc"
//     var listParams = this.searchForm
// }
//
this.getData();
            },

            search(searchForm) {
                if (this.startDate != '') {
                    searchForm.st1 = this.GMTToStr(this.startDate[0]);
                    searchForm.st2 = this.GMTToStr(this.startDate[1])
                }
                if (this.endDate != '') {
                    searchForm.et1 = this.GMTToStr(this.endDate[0]);
                    searchForm.et2 = this.GMTToStr(this.endDate[1])
                }
                if (this.state == 4) {
                    searchForm.state = null
                } else {
                    searchForm.state = this.state
                }
                // searchForm.page = 1;
                // searchForm.size = this.nowPageSize || 10;
                this.getData(searchForm)
            },
            modifyGuess() {
                this.dialogFormVisible = true;
                this.newPass = '';
                this.oldPass = '';
            },
            ensure(oldPass) {
                if (oldPass == '' || oldPass == undefined) {
                    this.$alert('请填写密码', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$message({
                                type: 'info',
                                message: `请重试！`
                            });
                        }
                    });
                    return false;
                } else {
                    this.dialogFormVisible = false;
                    this.newFormVisible = true;

                }
            },
            ensureNew(newPass) {
                if (newPass == '' || newPass == undefined) {
                    this.$alert('请填写新密码', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$message({
                                type: 'info',
                                message: `请重试！`
                            });
                        }
                    });
                    return false;
                } else {
                    this.$ajax({
                        method: "POST",
                        url: BaseUrl+'imwallet/modifypassword',
                        params: {type: 'app_guess', newPassword: newPass, oldPassword: this.oldPass},
                        headers: {'token': sessionStorage.getItem('token')}
                    }).then(response => {
                        console.log(response)
                        if (response.data.msg == '旧密码错误') {
                            this.$alert('旧密码错误', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    this.$message({
                                        type: 'info',
                                        message: `请重试！`
                                    });
                                }
                            });
                            return false;
                        } else if (response.data.flag == '500' && response.data.msg != '旧密码错误') {
                            this.$alert('修改失败', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    this.$message({
                                        type: 'info',
                                        message: `请重试！`
                                    });
                                }
                            });
                            return false;
                        } else if(response.data.flag==200){
                            this.$alert('修改密码成功', {
                                confirmButtonText: '确定',
                                callback: action =>{this.newFormVisible = false}
                            });
                        }else if(response.data.flag==201){
                            this.$alert(response.data.msg+'，请重新登录', '提示', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    this.$router.push('/')
                                }
                            });
                        }

                    });

                }
            }
        },

    };
</script>
