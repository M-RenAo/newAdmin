<template>
    <div>
        <div class="table_container">
            <el-row type="flex" style="margin-bottom: 30px;">
                <el-col style="display: flex;justify-content: flex-start">
                    <el-input placeholder="关键字" class="input-with-select" v-model="searchInfo"
                              style="width:40%">
                        <el-button slot="append" @click="search"><i class="el-icon-search"></i></el-button>
                    </el-input>
                </el-col>
            </el-row>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="全部" name="1"></el-tab-pane>
                <el-tab-pane label="显示" name="2"></el-tab-pane>
                <el-tab-pane label="隐藏" name="3"></el-tab-pane>
            </el-tabs>
            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                fixed
                prop="time"
                label="日期"
                min-width="50">
                </el-table-column>
                <el-table-column
                prop="username"
                label="用户"
                min-width="50">
                </el-table-column>
                <el-table-column
                prop="message"
                label="评论内容"
                min-width="50">
                </el-table-column>
                <el-table-column
                prop="phone"
                label="手机号"
                min-width="50">
                </el-table-column>
                <el-table-column
                prop="replyTo"
                label="回复对象"
                min-width="50">
                </el-table-column>
                <el-table-column
                prop="upvotes"
                label="点赞"
                min-width="50">
                </el-table-column>
                <el-table-column
                label="状态"
                min-width="50">
                    <template scope="scope">
                        <div>
                            {{scope.row.hidden?"隐藏":"显示"}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                label="操作"
                width="150">
                <template slot-scope="scope">
                    <el-button @click="See(scope.row)" type="text" size="medium">查看</el-button>
                    <el-button type="text" size="medium" @click="cbPopup(scope.row)">{{!scope.row.hidden?"隐藏":"显示"}}</el-button>
                    
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
            <el-dialog
                    :visible.sync="centerDialogVisible"
                    width="700px"
                    center>
                    <h2>用户:{{row.username}}</h2>
                    <div class="comment">{{row.message}}</div>
            </el-dialog>
            <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="30%">
                <span>确定要{{!row.hidden?"隐藏":"显示"}}吗</span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="changeType">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>
<script>
    import { baseUrl, baseImgPath } from "@/config/env";
    let moment=require('moment')
    export default {
    data() {
      return {
        activeName: '1',
        centerDialogVisible:false,
        dialogVisible: false,
        newsflashID:"",//此条快讯ID
        tableData: [],
        currentPage: 1,
        nowPageSize: 10,
        usercount:0,
        searchInfo:"",//关键字
        row:"",//当前行数据
      };
    },
    created() {
            this.newsflashID=this.$route.query.id;
            this.getData()
        },
    methods: {
        search(){//关键字搜索
            this.getData()
        },
        handleClick(tab, event) {
            var arr=[];
            if(this.activeName==1){
                this.getData()
            }else if(this.activeName==1){
                
            }else{

            }
        },
        See(row) {//查看
            this.row=row
            this.centerDialogVisible=true;
        },
        handleSizeChange(pageSize) {
            this.nowPageSize = pageSize;
            this.getData()
                    
        },
        handleCurrentChange(pageValue) {
            his.currentPage = pageValue;
            this.getData()                   
        },
        getData(){
            this.$ajax.get(BaseUrl+"newsFlash/commentList/"+this.newsflashID,{
                            params: {
                                key:this.searchInfo,
                                pageNum:this.currentPage,
                                pageSize:this.nowPageSize
                            }, headers: {'token': sessionStorage.getItem('token')}}).then(res=>{
                        res.data.data.forEach(item=>{
                                    if(item.time!=undefined){
                                        item.time=moment.utc(item.time).local().format('YYYY-MM-DD HH:mm:ss')
                                    }
                                    
                        })
                        this.tableData=res.data.data;
                        this.usercount=res.data.data.length
                    }
                )
        },
        cbPopup(row){
            this.row=row;
            this.dialogVisible=true;
        },
        async changeType(){//显示或隐藏
            this.dialogVisible=false;
            if(!this.row.hidden){
                await this.$ajax.get(BaseUrl+"newsFlash/hideComment/"+this.row.id,{
                         headers: {'token': sessionStorage.getItem('token')}}).then(res=>{
                    })
            }else{
                await this.$ajax.get(BaseUrl+"newsFlash/displayComment/"+this.row.id,{
                         headers: {'token': sessionStorage.getItem('token')}}).then(res=>{
                    })
            }
            this.getData();
        }
    }
  };
</script>
<style lang="less" scoped>
    @import "../style/mixin";

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
    .comment{
        padding:20px 0 20px 0
    }
    .Pagination {
        display: flex;
        justify-content: flex-start;
        margin-top: 8px;
    }
</style>

