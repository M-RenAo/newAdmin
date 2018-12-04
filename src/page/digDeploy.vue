<template>
    <div class="popup-deploy">
        <div class="table_container">
            <el-row style="display:flex;margin-bottom: 30px;">
                <!--<el-col :span="12"><el-button type="primary" @click="uploadapp()">上传应用</el-button>-->
                <!--<el-button style='' type="primary" icon="document" @click="handleDownload" :loading="downloadLoading"> 导出excel</el-button></el-col>-->
                <el-col style="display: flex;align-items: center;">
                    <el-tabs v-model="activeName" @tab-click="queryListData({activeName:activeName})"
                             style="height: 40px;">
                        <el-tab-pane label="每日任务" name="1"></el-tab-pane>
                        <el-tab-pane label="成长任务" name="2"></el-tab-pane>
                    </el-tabs>
                </el-col>
            </el-row>
            <el-table
                :data="info"
                style="width: 100%" id="appList">
                <!--<el-table-column-->
                <!--label="应用图标"-->
                <!--prop="fileIcon">-->
                <!--</el-table-column>-->
                <el-table-column
                    label="顺序"
                    prop="sort" min-width="50">
                </el-table-column>
                <el-table-column
                    label="任务"
                    prop="name" min-width="50">
                </el-table-column>
                <el-table-column
                    label="状态"
                    min-width="50">
                    <template scope="scope">
                      <div :class="{'up-state-type':scope.row.state===1}">
                        {{scope.row.state==1?'上架':'下架'}}
                      </div>
                    </template>
                </el-table-column>
                <el-table-column
                    label="任务属性"
                    min-width="50">
                    <template scope="scope">
                        <div>
                            {{scope.row.attr==1?'每日任务':'成长任务'}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    label="完成人数"
                    prop="compeleteNum"
                    min-width="50">
                </el-table-column>
                <el-table-column
                    label="可参与次数"
                    prop="nums"
                    min-width="50">
                </el-table-column>
                <el-table-column
                    label="奖励IA"
                    prop="iaRewards" min-width="50">
                </el-table-column>
                <el-table-column
                    label="操作"
                    key="upload"
                    min-width="100"
                >
                    <template scope="scope">
                        <el-button type="text" @click="goEdit(scope.row.id,scope.row.name,scope.row.nums,scope.row.iaRewards)" style="margin-left:0">编辑</el-button>
                        <el-popover
                            placement="right"
                            width="70"
                            trigger="click"
                            v-model="scope.row.visible">
                            <div style=" width:70px">
                                <el-button style="display: block;margin: 0" type="text" size="mini" @click="setState(scope.row.id,scope.row.state)">
                                    {{scope.row.state===1?'下架':'上架'}}
                                </el-button>
                                <el-button style="display: block;margin: 0" type="text" size="mini" @click="setSort(scope.row.id,scope.row.name,scope.row.sort)">
                                设置顺序
                                </el-button>
                            </div>
                            <el-button type="text" slot="reference">更多</el-button>
                        </el-popover>
                    </template>
                </el-table-column>
            </el-table>
            <!--<div class="Pagination">-->
            <!--<el-pagination-->
            <!--@size-change="handleSizeChange"-->
            <!--@current-change="handleCurrentChange"-->
            <!--:current-page="currentPage"-->
            <!--:page-size="nowPageSize"-->
            <!--:page-sizes="[5, 10, 20, 40]"-->
            <!--:total="txcount"-->
            <!--layout="total, sizes, prev, pager, next, jumper"-->
            <!--&gt;-->
            <!--</el-pagination>-->
            <!--</div>-->
        </div>
        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%">
            <span>确定要{{stateDig===1?'下架':'上架'}}当前任务吗?</span>
            <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="ensureSetState">确 定</el-button>
                </span>
        </el-dialog>
        <el-dialog
            :visible.sync="dialogVisibleUpdate"
            width="500px">
            <el-form :model="form">
                <el-form-item label="任务名称：" :label-width="formLabelWidth">
                  {{digName}}
                </el-form-item>
                <el-form-item label="参与次数：" :label-width="formLabelWidth">
                    <el-input v-model="form.nums" min="1" style="width:300px"></el-input>
                </el-form-item>
                <el-form-item label="奖励IA：" :label-width="formLabelWidth">
                    <el-input v-model="form.iaRewards" min="0" style="width:300px"></el-input>
                    <div style="color:#ccc">ia奖励为空或者为0表示不及时奖励</div>
                </el-form-item>
            </el-form>
                <div  style="text-align:center;width:460px;">

                    <el-button type="primary" @click="ensureSave">保存</el-button>
                </div>
        </el-dialog>
        <el-dialog title="" :visible.sync="dialogFormSort" width="500px">
           <el-form :model="sortform">
            <el-form-item label="任务名称：" :label-width="formLabelWidth">
                {{digName}}
            </el-form-item>
            <el-form-item label="顺序：" :label-width="formLabelWidth" prop="sort">
                <el-input v-model="sortform.sort" auto-complete="off" style="width:300px"></el-input>
             </el-form-item>
             </el-form>
            <div style="text-align:center;width:460px;">
                <el-button type="primary" @click="ensureSort">确 定</el-button>
           </div>
        </el-dialog>
    </div>
</template>

<script>
    import {baseUrl, baseImgPath} from "@/config/env";
    import {
        cityGuess,
        getResturants,
        getResturantsCount,
        foodCategory,
        updateResturant,
        searchplace,
        deleteResturant
    } from "@/api/getData";

    let moment = require('moment')
    export default {
        data() {
            return {
                info: [{sort:1,name:'分享挖矿',state:1,attr:1,compeleteNum:18991,nums:5,iaRewards:30},{sort:2,name:'测试挖矿',state:0,attr:2,compeleteNum:18991,nums:5,iaRewards:30}],
                rows: [],
                sort:'',
                activeName: '1',
                downloadLoading: false,
                dialogVisible: false,
                dialogFormSort:false,
                dialogVisibleUpdate:false,
                // innerVisible:false,
                form: {},
                sortform:{},
                formLabelWidth:'100px',
                num: 0,
                queryData:{},
                stateDig:'',
                lowerId:'',
                digName:''
            };
        },
        created() {
            this.queryListData({activeName: 3});
        },
        components: {
        },
        methods: {
            queryListData({activeName}) {
            },
            //编辑弹窗
            goEdit(id,name,num,ia){
               this.dialogVisibleUpdate=true
                this.digName=name
                this.form={nums:num,iaRewards:ia}
            },
            //上下架弹窗
            setState(id,state){
                this.dialogVisible=true
                this.stateDig=state
                this.lowerId=id;
            },
            ensureSetState(){
                this.$ajax({
                    method: "POST",
                    url: BaseUrl + 'popup/lowerShelf',
                    params:{id:this.lowerId},
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
                                this.queryListData({activeName:this.activeName,pageValue:this.currentPage,pageSize:this.nowPageSize});
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
            //设置顺序
            setSort(id,name,sort){
                this.dialogFormSort=true
                this.digName=name
                this.sortform={
                    id:id,sort:sort
                }
            },
            ensureSort(){

            },
            //编辑任务

            ensureSave(){

            }


        }
    };
</script>

<style lang="less" scoped>
    @import "../style/mixin";
    .popup-deploy {
        .demo-table-expand {
            font-size: 0;
        }

        .demo-table-expand label {
            width: 90px;
            color: #99a9bf;
        }

        .demo-table-expand .el-form-item {
            margin-right: 0;
            margin-bottom: 0;
            width: 50%;
        }

        .table_container {
            padding: 20px;
        }

        .Pagination {
            display: flex;
            justify-content: flex-start;
            margin-top: 8px;
        }


    }
    .el-popover {
        min-width: 70px!important;
    }
    .up-state-type{
        color: red;
    }
</style>
