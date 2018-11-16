<template>
    <div class="fillcontain">
        <div class="table_container">
            <el-row style="display:flex;margin-bottom: 30px;">
                <!--<el-button style='' type="primary" icon="document" @click="handleDownload" :loading="downloadLoading"> 导出excel</el-button></el-col>-->
                <el-col :span="12" style="display: flex;align-items: center;">
                    <el-tabs v-model="tabsName"  style="height: 40px;" @tab-click="tabsClick">
                        <el-tab-pane label="全部" name="-1"></el-tab-pane>
                        <el-tab-pane label="已上架" name="1"></el-tab-pane>
                        <el-tab-pane label="未上架" name="0"></el-tab-pane>
                    </el-tabs>
                </el-col>
                <el-col  :span="12" style="display: flex;align-items: center;justify-content: flex-end">
                    <el-input placeholder="关键字"  class="input-with-select" v-model="searchInfo" style="width:60%" @keyup.enter.native="searchCheck">
                        <el-button slot="append"  @click="searchCheck"><i class="el-icon-search"></i></el-button>
                    </el-input>
                </el-col>

            </el-row>
            <el-table
                :data="tableData"
                style="width: 100%" >
                <el-table-column
                    label="最新抓取时间"
                    prop="issueTime" >
                </el-table-column>
                <el-table-column label="图标" prop="icon" min-width="50">
                    <template scope="scope">
                        <img :src="scope.row.icon" style="width:30px;height:30px;" v-if="scope.row.icon!==''&&scope.row.icon!==undefined" >
                        <span v-else>无</span>
                    </template>

                </el-table-column>
                <el-table-column
                    label="名称"
                    prop="name"
                    >
                </el-table-column>
                <el-table-column
                    label="日活"
                    prop="dau"
                   >
                </el-table-column>
                <el-table-column
                    label="24小时交易量"
                    prop="txAmount"
                   >
                </el-table-column>
                <el-table-column
                    label="24小时交易笔数"
                    prop="txCount"
                    >
                </el-table-column>
                <el-table-column
                    label="类型"
                    prop="type"
                   >
                </el-table-column>
                <el-table-column
                    label="评分"
                    prop="score"
                    min-width="50">
                </el-table-column>
                <el-table-column
                    label="状态"
                   >
                    <template scope="scope">
                        <div>
                            {{scope.row.reviewed?"已上架":"未上架"}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    label="地址"
                    prop="title"
                    min-width="50">
                    <template scope="scope">
                        <el-button  type="text"  style="margin-left:0"  v-clipboard:copy="scope.row.url" v-clipboard:success="onCopy" v-clipboard:error="onError">复制</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                    label="操作"
                    min-width="100"
                 >
                    <template scope="scope">
                        <el-button  type="text" @click="checkDapp(scope.row)" style="margin-left:0">审核</el-button>
                        <el-button  type="text" @click="historyTable(scope.row)" style="margin-left:0">历史数据</el-button>
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
            <el-dialog :visible.sync="dialogTableVisible" width="600px">
                <div class="titleconten">
                    <h2 style="text-align:center;margin-bottom:20px">{{row.name}}</h2>
                    <div style="width:400px;height:200px;margin:0 auto" v-if="row.icon!==''&&row.icon!==undefined">
                        <img :src="row.icon" style="width:400px;height:200px;"  >
                    </div>
                    <div style="width:300px;margin:0 auto;padding:20px 0px">
                        通过审核的Dapp会发布在客户端，按日活从高到低排序
                    </div>
                    <div style="width:300px;margin:0 auto;padding:20px 0px">
                        <el-radio v-model="radio" label="1">上架</el-radio>
                        <el-radio v-model="radio" label="2">下架</el-radio>
                    </div>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogTableVisible = false">取 消</el-button>
                    <el-button type="primary" @click="dialogTableVisible = false">确 定</el-button>
                </div>
            </el-dialog>
            <el-dialog title="" :visible.sync="dialogTableVisibleData" width="600px">
                <el-table :data="historyData">
                    <el-table-column property="date" label="抓取时间" ></el-table-column>
                    <el-table-column property="name" label="名称" ></el-table-column>
                    <el-table-column property="address" label="日活"></el-table-column>
                    <el-table-column property="date" label="24小时交易量" ></el-table-column>
                    <el-table-column property="name" label="24小时交易笔数" ></el-table-column>
                    <el-table-column property="address" label="评分"></el-table-column>
                </el-table>
            </el-dialog>
            <!--<div @click="test($event)">2</div>-->
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
                dialogTableVisibleData:false,
                dialogVisible: false,
                visible2:false,
                radio:'',
                tableData: [{title:1}],
                historyData:[],
                currentPage: 1,
                nowPageSize: 10,
                tabsName:"-1",//tabs
                dialogFormVisible:false,
                txcount:0,
                searchInfo:"",//快讯关键字搜索
                row:"",//当前行数据
                usercount:0,
                draft:"",
                dataparams:{},
                numparams:{},
                enabled:"true",

            };
        },
        mounted() {
        },
        components: {
            headTop
        },
        methods: {
            onCopy(){
                this.$message({
                    message: '复制成功',
                    type: 'success'
                });
            },
            onError(){
                this.$message({
                    message: '复制失败',
                    type: 'error'
                });
            },
            tabsClick(){

            },
            getData(){
                this.$ajax({
                    method: "POST",
                    url: BaseUrl+'blacklist/query',
                    data:{page:this.currentPage, size: this.nowPageSize,dstate:this.activeName==3?undefined:Number(this.activeName),keyword:this.searchInfo==''?undefined:this.searchInfo},
                    headers: {'token': sessionStorage.getItem('token')}
                }).then(response => {
                    if(response.data.flag==200){
                        this.info = response.data.data.data;
                        this.txcount = response.data.data.count;
                        this.info.forEach(item=>{
                            if(item.dstate=='1'){
                                item.checkResult='待定'
                            }else if(item.dstate=='2') {
                                item.checkResult='黑名单';
                            }else if(item.dstate=='0'){
                                item.checkResult='白名单'
                            }
                            if(item.name===undefined){
                                item.realNameState='未实名'
                            }else{
                                item.realNameState='已实名'
                            }
                        })
                    }else if(response.data.flag==201) {
                        this.$alert(response.data.msg + '，请重新登录', '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$router.push('/')
                            }
                        });
                    }
                });
            },
            // test(e){
            //     console.log(e.target.innerHTML)
            // },
            searchCheck(){
                this.getData();
            },
            checkDapp(row){
               this.dialogTableVisible=true
                this.row=row
            },
            historyTable(){
                this.dialogTableVisibleData=true

            },
            handleSizeChange(pageSize) {
                this.nowPageSize = pageSize;
                this.currentPage = 1;
                this.getData();
            },
            handleCurrentChange(pageValue) {
                this.currentPage = pageValue;
                this.getData();
            },

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
