<template>
    <div>
        <div class="table_container">
            <el-form>
                <el-form-item label="应用名称：">
                    {{$route.query.appName}}
                </el-form-item>
                <el-form-item label="综合评分：">
                    {{comment}}分
                </el-form-item>
            </el-form>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="全部" name="2"></el-tab-pane>
                <el-tab-pane label="显示" name="0"></el-tab-pane>
                <el-tab-pane label="隐藏" name="1"></el-tab-pane>
            </el-tabs>
            <el-table
                :data="tableData"
                class="test-class"
                style="width: 100%">
                <el-table-column
                    prop="ctime"
                    label="发布日期"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    prop="userNickName"
                    label="用户"
                    min-width="80">
                </el-table-column>
                <el-table-column
                    label="状态"
                    min-width="80">
                    <template scope="scope">
                        {{scope.row.state==0?'显示':'隐藏'}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="userCellPhone"
                    label="手机号"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    label="评论"
                    min-width="80">
                    <template scope="scope">
                        <div class="ellipsis">
                            {{scope.row.content}}
                        </div>
                    </template>
                </el-table-column>

                <el-table-column
                    prop="starLevel"
                    label="评分"
                    min-width="50">
                </el-table-column>
                <el-table-column
                    label="操作"
                    min-width="100">
                    <template slot-scope="scope">
                        <el-button @click="See(scope.row)" type="text" size="medium">查看</el-button>
                        <el-button type="text" size="medium" @click="cbPopup(scope.row)">
                            {{scope.row.state==0?"隐藏":"显示"}}
                        </el-button>

                    </template>
                </el-table-column>
            </el-table>
            <div class="Pagination">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[10, 20, 30, 50]"
                    :page-size="nowPageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="txcount">
                </el-pagination>
            </div>
            <el-dialog
                :visible.sync="centerDialogVisible"
                width="700px"
                center>
                <h2>用户:{{row.userNickName}}</h2>
                <div class="comment">{{row.content}}</div>
            </el-dialog>
            <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="30%">
                <span>确定要{{row.state==0?"隐藏":"显示"}}该条评论吗?</span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="changeType">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>
<script>
    import {baseUrl, baseImgPath} from "@/config/env";

    let moment = require('moment')
    export default {
        data() {
            return {
                activeName: '2',
                centerDialogVisible: false,
                dialogVisible: false,
                applyId: "",//此条快讯ID
                tableData: [],
                currentPage: 1,
                nowPageSize: 10,
                txcount: 0,
                comment:'',
                searchInfo: "",//关键字
                row: "",//当前行数据
                data: {},
            };
        },
        created() {
            this.$ajax.get(BaseUrl + "applyComment/getStarLevel/"+this.$route.query.id ,{ headers: {'token': sessionStorage.getItem('token')}
            }).then(res => {
                    if (res.data.flag == 200) {
                        this.comment=res.data.data
                    }
                }
            )
            this.getData()
        },
        methods: {
            handleClick() {
                this.currentPage = 1;
                this.nowPageSize = 10;
                this.getData()
            },
            See(row) {//查看
                this.row = row
                this.centerDialogVisible = true;
            },
            handleSizeChange(pageSize) {

                this.nowPageSize = pageSize;
                // this.setData()
                // this.getData()
                this.getData()
            },
            handleCurrentChange(pageValue) {
                this.currentPage = pageValue;
                // this.setData()
                // this.getData()
                this.getData()
            },
            getData() {
                this.$ajax.get(BaseUrl + "applyComment/getComment" , {
                    params:{applyId:this.$route.query.id,pageCode:this.currentPage,pageSize:this.nowPageSize,state:this.activeName}, headers: {'token': sessionStorage.getItem('token')}
                }).then(res => {
                        if (res.data.flag == 200) {
                            this.tableData = res.data.data.list;
                            this.txcount = res.data.data.num
                            this.tableData.forEach(item => {
                                if (item.dateTime != undefined) {
                                    item.ctime = moment.utc(item.dateTime).local().format('YYYY-MM-DD HH:mm:ss');
                                }

                            })
                        }

                        // console.log(res)
                    }
                )
            },
            cbPopup(row) {
                this.row = row;
                this.dialogVisible = true;
            },
            async changeType() {//显示或隐藏
                // if (!this.row.state) {
                //     await this.$ajax.get(BaseUrl + "newsFlash/hideComment/" + this.row.id, {
                //         headers: {'token': sessionStorage.getItem('token')}
                //     }).then(res => {
                //     })
                // } else {
                //     await this.$ajax.get(BaseUrl + "newsFlash/displayComment/" + this.row.id, {
                //         headers: {'token': sessionStorage.getItem('token')}
                //     }).then(res => {
                //     })
                // }
                this.$ajax({
                    method: "POST",
                    url: BaseUrl + 'applyComment/lable',
                    params: {id:this.row.id,state:this.row.state==1?0:1},
                    headers: {'token': sessionStorage.getItem('token')}
                }).then(response => {
                    // console.log(response);
                    if (response.data.flag == 500) {
                        this.$alert(response.data.msg, '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$message({
                                    type: 'info',
                                    message: `error: ${ response.data.msg + ',请重试'}`
                                });
                            }
                        });
                    } else if (response.data.flag == 200) {
                        this.$alert(response.data.msg, '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.dialogVisible = false;
                                this.getData();
                            }
                        });
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
            // setData() {
            //     this.data = {
            //         key: this.searchInfo,
            //         pageNum: this.currentPage,
            //         pageSize: this.nowPageSize
            //     }
            // }
        }
    };
</script>
<style lang="less">
    @import "../style/mixin";
    @import "../style/common";

    .table_container {
        padding: 20px;
    }

    .littleButton {
        padding: 5px 10px !important;
        margin-left: 0 !important;
    }

    .border-radius {
        border-radius: 6px;
        height: auto;
        width: 148px
    }

    .icon-trumpet-el {
        height: 147px;
        position: relative;
        .el-form-item__content {
            display: flex;
            position: absolute;
        }
        div.el-form-item__content {
            border: 0 !important;
        }
        div {
            background-color: #fbfdff;
            border: 1px dashed #c0ccda;
            border-radius: 6px;
            box-sizing: border-box;
            width: 148px;
            height: 148px;
            cursor: pointer;
            line-height: 146px;
            position: absolute;
            top: 0;
        }
    }

    .comment {
        padding: 20px 0 20px 0
    }

    .Pagination {
        display: flex;
        justify-content: flex-start;
        margin-top: 8px;
    }

    .test-class {
        .cell {
            overflow: hidden !important;
            text-overflow: ellipsis !important;
            word-break: break-all !important;
            white-space: nowrap !important;
        }
    }
</style>

