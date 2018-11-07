<template>
    <div class="fillcontain">
        <div class="table_container">
            <el-row style="display:flex;margin-bottom: 30px;">
                <!--<el-col :span="12"><el-button type="primary" @click="uploadapp()">上传应用</el-button>-->
                <!--<el-button style='' type="primary" icon="document" @click="handleDownload" :loading="downloadLoading"> 导出excel</el-button></el-col>-->
                <el-col :span="12" style="display: flex;align-items: center;">
                    <el-tabs v-model="activeName"  style="height: 40px;">
                        <el-tab-pane label="全部" name="3"></el-tab-pane>
                        <el-tab-pane label="黑名单" name="2"></el-tab-pane>
                        <el-tab-pane label="白名单" name="1"></el-tab-pane>
                        <el-tab-pane label="待定" name="0"></el-tab-pane>
                    </el-tabs>
                </el-col>
                <el-col  :span="12" style="display: flex;align-items: center;justify-content: flex-end">
                    <el-input placeholder="手机号／身份证号"  class="input-with-select" v-model="searchInfo" style="width:60%">
                        <el-button slot="append"  @click="searchCheck(searchInfo)"><i class="el-icon-search"></i></el-button>
                    </el-input>
                </el-col>

            </el-row>
            <el-table
                :data="info"
                style="width: 100%" >
                <el-table-column
                    label="用户"
                    prop="nickName" min-width="50">
                </el-table-column>
                <el-table-column label="头像" prop="fileIcon" min-width="50">
                    <template scope="scope">
                        <img :src="'https://imapp-image.oss-cn-hangzhou.aliyuncs.com/'+scope.row.pic" style="width:30px;height:30px;" v-if="scope.row.pic!==''&&scope.row.pic!==undefined">
                    </template>

                </el-table-column>
                <el-table-column
                    label="手机号"
                    prop="phone" min-width="50">
                </el-table-column>
                <el-table-column
                    label="异常情况"
                    prop="detail" min-width="50" >
                </el-table-column>
                <el-table-column
                    label="IA总数"
                    prop="amount" min-width="50" >
                </el-table-column>
                <el-table-column
                    label="实名状态"
                    prop="realState" min-width="50" >
                </el-table-column>
                <el-table-column
                    label="审核结果"
                    prop="resultCheck" min-width="50" >
                </el-table-column>
                <el-table-column
                    label="操作"
                    min-width="50" >
                    <template scope="scope">
                        <el-button  type="text" @click="abnormalRecords(scope.row.userId,scope.row.userNickName)">异常记录</el-button>
                        <el-button  type="text" @click="update(scope.row.userId,scope.row.userNickName)" style="margin-left:0">编辑</el-button>
                    </template>
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
        <el-dialog title="异常记录" :visible.sync="dialogTableVisible" width="1000px">
            <!--<div style="margin-bottom: 10px">用户：{{userNickName}}</div>-->
            <!--<div style="display:inline-block">-->
                <!--<div style="display: inline-block">-->
                    <!--<span style="font-size: 14px;width:80px;">类型：</span>-->
                    <!--<el-select v-model="state" placeholder="请选择" @change="changeIAType">-->
                        <!--<el-option-->
                            <!--v-for="item in options"-->
                            <!--:key="item.label"-->
                            <!--:label="item.label"-->
                            <!--:value="item.label">-->
                        <!--</el-option>-->
                    <!--</el-select>-->
                <!--</div>-->
                <!--<div style="display: inline-block">-->
                    <!--<span style="font-size: 14px;width:80px;">时间：</span>-->
                    <!--<el-date-picker-->
                        <!--style="width:200px"-->
                        <!--v-model="startDate"-->
                        <!--type="datetimerange"-->
                        <!--align="right"-->
                        <!--:default-time="['12:00:00', '08:00:00']">-->
                    <!--</el-date-picker>-->
                <!--</div>-->
                <!--<el-button type="primary" @click="serchByTime">搜索</el-button>-->
            <!--</div>-->
            <el-table :data="tableData">
                <el-table-column property="time" label="日期"></el-table-column>
                <el-table-column property="amount" label="获取或提取IA"></el-table-column>
                <el-table-column property="detail" label="行为"></el-table-column>
                <el-table-column property="aboutUsers" label="有关用户"></el-table-column>
            </el-table>
            <div class="Pagination">
                <el-pagination
                    @size-change="handleDetailSizeChange"
                    @current-change="handleDetailCurrentChange"
                    :current-page="currentPageDetail"
                    :page-size="nowPageSizeDetail"
                    :page-sizes="[5, 10, 20, 40]"
                    :total="txcountDetail"
                    layout="total, sizes, prev, pager, next, jumper"
                >
                </el-pagination>
            </div>
        </el-dialog>
        <el-dialog title="" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="审核结果：" :label-width="formLabelWidth">
                    <el-radio-group v-model="result">
                        <el-radio :label="3">黑名单</el-radio>
                        <el-radio :label="6">白名单</el-radio>
                        <el-radio :label="9">待定</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="备注：" :label-width="formLabelWidth">
                    <el-input type="textarea" v-model="remarks"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import headTop from "../components/headTop";
    import { baseUrl, baseImgPath } from "@/config/env";
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
    let moment=require('moment')
    export default {
        data() {
            return {
                tableData:[
                    {time:'afsgagydgysgeggey',nickName:'小红',pic:'',amount:1000,detail:'提取',aboutUsers:'老李'},
                    {time:'afsgagydgysgeggey',nickName:'小红',pic:'',amount:1000,detail:'提取',aboutUsers:'老李'},
                    {time:'afsgagydgysgeggey',nickName:'小红',pic:'',amount:1000,detail:'提取',aboutUsers:'老李'},
                    {time:'afsgagydgysgeggey',nickName:'小红',pic:'',amount:1000,detail:'提取',aboutUsers:'老李'},
                    {time:'afsgagydgysgeggey',nickName:'小红',pic:'',amount:1000,detail:'提取',aboutUsers:'老李'},
                    {time:'afsgagydgysgeggey',nickName:'小红',pic:'',amount:1000,detail:'提取',aboutUsers:'老李'},
                    {time:'afsgagydgysgeggey',nickName:'小红',pic:'',amount:1000,detail:'提取',aboutUsers:'老李'},


                ],
                info: [
                    {userId:'afsgagydgysgeggey',nickName:'小红',pic:'',phone:13112010101,detail:'邀请人数超过100个',amount:1000,realState:'已实名',resultCheck:'黑名单'},
                    {userId:'afsgagydgysgeggey',nickName:'小红',pic:'',phone:13112010101,detail:'邀请人数超过100个',amount:1000,realState:'已实名',resultCheck:'黑名单'},
                    {userId:'afsgagydgysgeggey',nickName:'小红',pic:'',phone:13112010101,detail:'邀请人数超过100个',amount:1000,realState:'已实名',resultCheck:'黑名单'},
                    {userId:'afsgagydgysgeggey',nickName:'小红',pic:'',phone:13112010101,detail:'邀请人数超过100个',amount:1000,realState:'已实名',resultCheck:'黑名单'},
                    {userId:'afsgagydgysgeggey',nickName:'小红',pic:'',phone:13112010101,detail:'邀请人数超过100个',amount:1000,realState:'已实名',resultCheck:'黑名单'},
                    {userId:'afsgagydgysgeggey',nickName:'小红',pic:'',phone:13112010101,detail:'邀请人数超过100个',amount:1000,realState:'已实名',resultCheck:'黑名单'}
                ],
                txcount: 0,
                currentPage: 1,
                nowPageSize: 10,
                currentPageDetail:1,
                nowPageSizeDetail:10,
                txcountDetail:0,
                activeName: '3',
                searchInfo: "",
                // innerVisible:false,
                checkVisible:false,
                dialogTableVisible:false,
                dialogFormVisible:false,
                formLabelWidth:'120px',
                form:{},
                result:'',
                remarks:''
            };
        },
        created() {
            // this.queryListData({activeName:3});
        },
        components: {
            headTop
        },
        methods: {
            // queryListData({ activeName, pageValue, pageSize }) {
            //     this.$ajax
            //         .get(`${BaseUrl}auth/all/${pageValue || 1}/${this.nowPageSize || 10}/${activeName || 2}`, {headers: {'token':sessionStorage.getItem('token')}},
            //         )
            //         .then(response => {
            //             if(response.data.flag==200){
            //                 this.info = response.data.data.list;
            //                 this.txcount = response.data.data.num;
            //                 this.info.forEach(item=>{
            //                     if(item.auditDate!=undefined){
            //                         item.auditDate=moment.utc(item.auditDate).local().format('YYYY-MM-DD HH:mm:ss')
            //                     }
            //                 })
            //                 this.info.forEach(item=>{
            //                     if(item.auditState==1){
            //                         item.auditState='审核通过'
            //                     }else if(item.auditState==2){
            //                         item.auditState='未审核'
            //                     }else{
            //                         item.auditState='审核不通过'
            //                     }
            //                 })
            //             }else if(response.data.flag==201) {
            //                 this.$alert(response.data.msg + '，请重新登录', '提示', {
            //                     confirmButtonText: '确定',
            //                     callback: action => {
            //                         this.$router.push('/')
            //                     }
            //                 });
            //             }else{
            //                 this.info=[]
            //             }
            //             // this.showlist=this.info[0].authPic.split(',')
            //         });
            //     this.searchInfo = "";
            // },
            searchCheck(searchInfo) {
                this.activeName='3'
                this.searchInfo = searchInfo;
                this.$ajax
                    .get(BaseUrl + "auth/search/"+this.searchInfo,{headers: {'token':sessionStorage.getItem('token')}})
                    .then(response => {
                        console.log(response);
                        if(response.data.flag==200){
                            this.info = response.data.data;
                            this.txcount = response.data.data.length;
                            this.info.forEach(item=>{
                                if(item.auditState==1){
                                    item.auditState='审核通过'
                                }else if(item.auditState==2){
                                    item.auditState='未审核'
                                }else{
                                    item.auditState='审核不通过'
                                }
                            })
                        }else if(response.data.flag==201) {
                            this.$alert(response.data.msg + '，请重新登录', '提示', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    this.$router.push('/')
                                }
                            });
                        }else{
                            this.info=[];
                            this.txcount=0
                        }

                    });
            },
            handleSizeChange(pageSize) {
                console.log(">>>>>>pageSize", pageSize);
                this.nowPageSize = pageSize;
                const listParams = {
                    activeName: this.activeName,
                    pageValue: 1,
                    pageSize: pageSize
                };
                this.queryListData(listParams);
            },
            handleCurrentChange(pageValue) {
                console.log(">>>>>>pageValue", pageValue);
                this.currentPage = pageValue;
                const listParams = {
                    activeName: this.activeName,
                    pageValue: pageValue,
                    pageSize: this.nowPageSize || 10
                };
                this.queryListData(listParams);
            },
            abnormalRecords(){
                this.dialogTableVisible=true

            },
            handleDetailSizeChange(){

            },
            handleDetailCurrentChange(){

            },
            update(){
               this.dialogFormVisible=true
            },
        }
    };
</script>

<style lang="less" scoped>
    @import "../style/mixin";

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

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #20a0ff;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 120px;
        height: 120px;
        line-height: 120px;
        text-align: center;
    }

    .avatar {
        width: 120px;
        height: 120px;
        display: block;
    }
    /*.cell {*/
    /*overflow: hidden;*/
    /*text-overflow: ellipsis;*/
    /*word-break: break-all;*/
    /*white-space: nowrap !important;*/
    /*}*/
    .littleButton{
        padding:5px 10px!important;
        margin-left: 0!important;
    }
    /*.el-button{*/
    /*border: 0;*/
    /*}*/



</style>
