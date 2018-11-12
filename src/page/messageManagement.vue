<template>
    <div class="fillcontain">
        <div class="table_container">
            <el-button type="primary" @click="goEdit" style="margin-bottom: 10px">创建快讯</el-button>
            <el-row style="display:flex;margin-bottom: 30px;">
                <!--<el-button style='' type="primary" icon="document" @click="handleDownload" :loading="downloadLoading"> 导出excel</el-button></el-col>-->
                <el-col :span="12" style="display: flex;align-items: center;">
                    <el-tabs v-model="tabsName"  style="height: 40px;" @tab-click="tabsClick">
                        <el-tab-pane label="全部" name="-1"></el-tab-pane>
                        <el-tab-pane label="发布" name="1"></el-tab-pane>
                        <el-tab-pane label="草稿" name="0"></el-tab-pane>
                    </el-tabs>
                </el-col>
                <el-col  :span="12" style="display: flex;align-items: center;justify-content: flex-end">
                    <el-input placeholder="快讯标题"  class="input-with-select" v-model="searchInfo" style="width:60%">
                        <el-button slot="append"  @click="searchCheck"><i class="el-icon-search"></i></el-button>
                    </el-input>
                </el-col>

            </el-row>
            <el-table
                :data="tableData"
                style="width: 100%" >
                <el-table-column
                    label="发布日期"
                    prop="issueTime" min-width="50">
                </el-table-column>
                <el-table-column label="配图" prop="fileIcon" min-width="50">
                    <template scope="scope">
                        <img :src="'https://imapp-image.oss-cn-hangzhou.aliyuncs.com/'+scope.row.image" style="width:30px;height:30px;" v-if="scope.row.image!==''&&scope.row.image!==undefined" >
                        <span v-else>无</span>
                    </template>

                </el-table-column>
                <el-table-column
                    label="快讯标题"
                    min-width="100">
                    <template scope="scope">
                        <div class="title">
                            <div class="titles" @click="dialogTable(scope.row)">
                                {{scope.row.title}}
                        </div>
                        <span class="settop" v-if="scope.row.top">已置顶</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    label="状态"
                    min-width="50" >
                    <template scope="scope">
                        <div>
                            {{scope.row.draft?"草稿":"发布"}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    label="作者"
                    prop="author" min-width="50" >
                </el-table-column>
                <el-table-column
                    label="创建日期"
                    prop="createTime" min-width="50" >
                </el-table-column>
                <el-table-column
                    label="热讯推荐"
                    min-width="50" >
                    <template scope="scope">
                        <div :class="{hot:scope.row.hot}">
                            {{!scope.row.hot?"未推荐":"已推荐"}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    label="操作"
                    min-width="50" >
                    <template scope="scope">
                        <el-button  type="text" @click="goEdit" style="margin-left:0">编辑</el-button>
                        <el-button  type="text" @click="goComment(scope.row)" style="margin-left:0">评论</el-button>
                        <el-popover
                            placement="top"
                            width="160"
                            trigger="click"
                            v-model="scope.row.visible">
                            <div >
                                <el-button size="mini" type="primary" @click="deleteData(scope.row)">删除</el-button>
                                <el-button type="primary" size="mini" @click="setTop(scope.row)">{{!scope.row.top?"置顶":"取消置顶"}}</el-button>
                            </div>
                            <el-button type="text" slot="reference" >更多</el-button>
                        </el-popover>
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
                    :total="usercount">
                </el-pagination>
            </div>
            <el-dialog :visible.sync="dialogTableVisible">
                <div class="titleconten">
                    <h2 style="text-align:center;margin-bottom:20px">{{row.title}}</h2>
                    <div style="width:400px;height:200px;margin:0 auto" v-if="row.image!==''&&row.image!==undefined"> 
                        <img :src="'https://imapp-image.oss-cn-hangzhou.aliyuncs.com/'+row.image" style="width:400px;height:200px;"  >
                    </div>
                    <div style="width:600px;margin:0 auto;padding-top:20px">
                        {{row.content}}
                    </div>
                </div>
            </el-dialog>
            <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="30%">
                <span>确定要删除吗</span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="deleteDataY">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import headTop from "../components/headTop";
    import { baseUrl, baseImgPath } from "@/config/env";
    let moment=require('moment')
    export default {
        data() {
            return {
                dialogTableVisible: false,
                dialogVisible: false,
                visible2:false,
                tableData: [],
                txcount: 0,
                currentPage: 1,
                nowPageSize: 10,
                tabsName:"-1",//tabs
                dialogTableVisible:false,
                dialogFormVisible:false,
                txcount:0,
                searchInfo:"",//快讯关键字搜索
                row:"",//当前行数据
                usercount:0,
            };
        },
        created() {
            this.getData();
        },
        components: {
            headTop
        },
        methods: {
            searchCheck() {//快讯搜索
                this.getData()
            },
            handleSizeChange(pageSize) {
                this.nowPageSize = pageSize;
                this.getData();
            },
            handleCurrentChange(pageValue) {
                this.currentPage = pageValue;
                this.getData();
            },
            
            goEdit(){//前往编辑界面
                this.$router.push({path:"/editingInterface"})
            },
            goComment(row){//前往评论界面
                this.$router.push({path:'/comment',query:{
                    id:row.id
                }})     
            },
            dialogTable(row){//弹窗
                this.dialogTableVisible = true;
                this.row=row;
            },
            getData(){
                this.$ajax.get(BaseUrl+"newsFlash/articleList",{
                        params: {
                            key:this.searchInfo,
                            pageNum:this.currentPage,
                            pageSize:this.nowPageSize
                        }, headers: {'token': sessionStorage.getItem('token')}}).then(res=>{
                    res.data.data.forEach(item=>{
                                if(item.createTime!=undefined){
                                    item.createTime=moment.utc(item.createTime).local().format('YYYY-MM-DD HH:mm:ss')
                                }
                                if(item.issueTime!=undefined){
                                    item.issueTime=moment.utc(item.issueTime).local().format('YYYY-MM-DD HH:mm:ss')
                                }
                                item.visible=false;
                            })
                    this.tableData=res.data.data
                    console.log(this.tableData)
                    }
                );
                this.$ajax.get(BaseUrl+"newsFlash/articleAmount",{
                            params: {
                                key:this.searchInfo
                            },
                            headers: {'token': sessionStorage.getItem('token')}}).then(res=>{
                        this.usercount=res.data.data;
                        // console.log(this.usercount)
                    }
                )
            },
            tabsClick(){//tabs选项
                if(this.tabsName==-1){
                    this.getData()
                    console.log(this.tabsName)
                }else if(this.tabsName==1){
                    this.getData();
                    let tablesData=this.tableData.forEach(item=>{

                    })
                    console.log(this.tabsName)
                }else{
                    console.log(this.tabsName)
                }
                
            },
            async setTop(row){//置顶
                this.tableData.forEach(item=>{
                    item.visible = false
                })
                if(!row.top){
                    await this.$ajax.get(BaseUrl+"newsFlash/stickArticle/"+row.id,{
                         headers: {'token': sessionStorage.getItem('token')}}).then(res=>{
                    })
                }else{
                    await this.$ajax.get(BaseUrl+"newsFlash/unstickArticle/"+row.id,{
                         headers: {'token': sessionStorage.getItem('token')}}).then(res=>{
                    })
                }
                this.getData() 
            },
            deleteData(row){//调出弹出窗
                this.tableData.forEach(item=>{
                    item.visible = false
                })
                this.dialogVisible = true;
                this.row=row
            },
            async deleteDataY(){//删除数据
                this.dialogVisible = false;
                await this.$ajax.get(BaseUrl+"newsFlash/delete/"+this.row.id,{
                         headers: {'token': sessionStorage.getItem('token')}}).then(res=>{
                    })
                this.getData()                 
            }
        }
    };
</script>

<style lang="less" scoped>
    @import "../style/mixin";
    .fillcontain{
        text-align: left
    }

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
    .title{
        overflow: hidden;
        cursor: pointer;
    }
    .titles{
        color: #6cf;
        
    }
    .settop{
        color: red;
        border:1px solid red
    }
    .hot{
        color:red
    }



</style>
