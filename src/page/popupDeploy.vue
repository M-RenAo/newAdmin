<template>
    <div class="popup-deploy">
        <div class="table_container">
            <el-row style="display:flex;margin-bottom: 30px;">
                <!--<el-col :span="12"><el-button type="primary" @click="uploadapp()">上传应用</el-button>-->
                <!--<el-button style='' type="primary" icon="document" @click="handleDownload" :loading="downloadLoading"> 导出excel</el-button></el-col>-->
                <el-col :span="12" style="display: flex;align-items: center;">
                    <el-tabs v-model="activeName" @tab-click="queryListData({activeName:activeName})"
                             style="height: 40px;">
                        <el-tab-pane label="全部" name="3"></el-tab-pane>
                        <el-tab-pane label="上架" name="2"></el-tab-pane>
                        <el-tab-pane label="下架" name="1"></el-tab-pane>
                    </el-tabs>
                </el-col>
                <el-col :span="12" style="display: flex;align-items: center;justify-content: flex-end">
                    <el-button type="primary" @click="addNewPopup">新增</el-button>
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
                    label="弹窗名称"
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
                    label="触发属性"
                    prop="auditDate" min-width="50">
                </el-table-column>
                <el-table-column
                    label="样式"
                    prop="auditDate" min-width="50">
                </el-table-column>
                <el-table-column
                    label="日期"
                    prop="auditDate" min-width="50">
                </el-table-column>
                <el-table-column
                    label="展示量"
                    prop="auditState" min-width="50">
                </el-table-column>
                <el-table-column
                    label="点击量"
                    prop="remarks" min-width="50"  v-if="activeName==0||activeName==3">
                </el-table-column>
                <el-table-column
                    label="操作"
                    key="upload"
                    min-width="100"
                >
                <template scope="scope">
                    <el-button type="text" @click="goEdit(scope.row.id)" style="margin-left:0">编辑</el-button>
                    <el-popover
                        placement="right"
                        width="70"
                        trigger="click"
                        v-model="scope.row.visible">
                        <div style=" width:70px">
                            <el-button style="display: block;margin: 0" type="text" size="mini" @click="setState(scope.row.id)" v-if="scope.row.state==1">
                                下架
                            </el-button>
                            <el-button style="display: block;margin: 0" type="text" size="mini" @click="setSort(scope.row)">
                                设置顺序
                            </el-button>
                            <el-button style="display: block;margin: 0" size="mini" type="text" @click="deleteData(scope.row.id)">删除</el-button>
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
            <span>确定要下架该弹窗部署吗?</span>
            <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="ensureSetState">确 定</el-button>
                </span>
        </el-dialog>
        <!--<el-dialog title="" :visible.sync="dialogFormSort">-->
            <!--<el-form :model="form">-->
                <!--<el-form-item label="排序" :label-width="formLabelWidth" prop="sort">-->
                    <!--<el-input v-model="sort" auto-complete="off" style="width:80%"></el-input>-->
                <!--</el-form-item>-->
            <!--</el-form>-->
            <!--<div slot="footer" class="dialog-footer">-->
                <!--<el-button @click="dialogFormSort = false;">取 消</el-button>-->
                <!--<el-button type="primary" @click="ensureSortPopup">确 定</el-button>-->
            <!--</div>-->
        <!--</el-dialog>-->
        <el-dialog
            title="提示"
            :visible.sync="dialogVisibleDelete"
            width="30%"
            >
            <span>该信息将永久删除，确认删除此条信息？</span>
            <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisibleDelete = false">取 消</el-button>
                    <el-button type="primary" @click="ensureDelete">确 定</el-button>
               </span>
        </el-dialog>
    </div>
</template>

<script>
    import headTop from "../components/headTop";
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
    import FileSaver from 'file-saver'
    import XLSX from 'xlsx'

    let moment = require('moment')
    export default {
        data() {
            return {
                info: [{name:'test',state:1,auditDate:1,remarks:'ceshi'},{name:'test',state:0,auditDate:1,remarks:'ceshi'},{name:'test',state:3,auditDate:1,remarks:'ceshi'}],
                rows: [],
                txcount: 0,
                totalfees: 0,
                currentPage: 1,
                nowPageSize: 10,
                sort:'',
                url: "",
                activeName: '3',
                positionList: "",
                searchInfo: "",
                downloadLoading: false,
                dialogVisible: false,
                dialogFormSort:false,
                dialogVisibleDelete:false,
                // innerVisible:false,
                form: {remarks: ''},
                formLabelWidth: 150,
                num: 0
            };
        },
        created() {
            this.queryListData({activeName: 3});
        },
        components: {
            headTop
        },
        methods: {
            addNewPopup(){
              this.$router.push({path:'/addPopup'})
            },
            queryListData({activeName, pageValue, pageSize}) {
                // this.$ajax
                //     .get(`${BaseUrl}auth/all/${pageValue || 1}/${this.nowPageSize || 10}/${activeName || 2}`, {headers: {'token': sessionStorage.getItem('token')}},
                //     )
                //     .then(response => {
                //         if (response.data.flag == 200) {
                //             this.info = response.data.data.list;
                //             this.txcount = response.data.data.num;
                //             this.info.forEach(item => {
                //                 if (item.auditDate != undefined) {
                //                     item.auditDate = moment.utc(item.auditDate).local().format('YYYY-MM-DD HH:mm:ss')
                //                 }
                //             })
                //             this.info.forEach(item => {
                //                 if (item.auditState == 1) {
                //                     item.auditState = '审核通过'
                //                 } else if (item.auditState == 2) {
                //                     item.auditState = '未审核'
                //                 } else {
                //                     item.auditState = '审核不通过'
                //                 }
                //             })
                //         } else if (response.data.flag == 201) {
                //             this.$alert(response.data.msg + '，请重新登录', '提示', {
                //                 confirmButtonText: '确定',
                //                 callback: action => {
                //                     this.$router.push('/')
                //                 }
                //             });
                //         } else {
                //             this.info = []
                //         }
                //         // this.showlist=this.info[0].authPic.split(',')
                //     });
                // this.searchInfo = "";
            },
            handleSizeChange(pageSize) {
                this.nowPageSize = pageSize;
                const listParams = {
                    activeName: this.activeName,
                    pageValue: 1,
                    pageSize: pageSize
                };
                this.queryListData(listParams);
            },
            handleCurrentChange(pageValue) {
                this.currentPage = pageValue;
                const listParams = {
                    activeName: this.activeName,
                    pageValue: pageValue,
                    pageSize: this.nowPageSize || 10
                };
                this.queryListData(listParams);
            },
            //编辑弹窗
            goEdit(id){
                this.$router.push({path:'/updatePopup',query:{id:id}})
            },
            //上下架弹窗
            setState(){
                this.dialogVisible=true
            },
            ensureSetState(){

            },
            //设置顺序
            setSort(){
                this.dialogFormSort=true
            },
            ensureSortPopup(){

            },
            //删除弹框
            deleteData(){
                this.dialogVisibleDelete=true
            },
            ensureDelete(){

            }

        }
    };
</script>

<style lang="less">
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
