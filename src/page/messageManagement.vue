<template>
    <div class="fillcontain">
        <div class="table_container">
            <el-button type="primary" @click="goEdit" style="margin-bottom: 10px">创建快讯</el-button>
            <el-row style="display:flex;margin-bottom: 30px;">
                <!--<el-button style='' type="primary" icon="document" @click="handleDownload" :loading="downloadLoading"> 导出excel</el-button></el-col>-->
                <el-col :span="12" style="display: flex;align-items: center;">
                    <el-tabs v-model="tabsName"  style="height: 40px;">
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
                    prop="time" min-width="50">
                </el-table-column>
                <el-table-column label="配图" prop="fileIcon" min-width="50">
                    <template scope="scope">
                        <img :src="'https://imapp-image.oss-cn-hangzhou.aliyuncs.com/'+scope.row.pic" style="width:30px;height:30px;" v-if="scope.row.pic!==''&&scope.row.pic!==undefined" >
                        <span v-else>无</span>
                    </template>

                </el-table-column>
                <el-table-column
                    label="快讯标题"
                    prop="title" min-width="50">
                </el-table-column>
                <el-table-column
                    label="状态"
                    prop="detail" min-width="50" >
                </el-table-column>
                <el-table-column
                    label="作者"
                    prop="source" min-width="50" >
                </el-table-column>
                <el-table-column
                    label="创建日期"
                    prop="realState" min-width="50" >
                </el-table-column>
                <el-table-column
                    label="热讯推荐"
                    prop="resultCheck" min-width="50" >
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
                                <el-button size="mini" type="primary" @click="scope.row.visible = false">删除</el-button>
                                <el-button type="primary" size="mini" @click="scope.row.visible = false">置顶</el-button>
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
                    :page-size="nowPageSize"
                    :page-sizes="[5, 10, 20, 40]"
                    :total="txcount"
                    layout="total, sizes, prev, pager, next, jumper"
                >
                </el-pagination>
            </div>
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
            };
        },
        created() {

            this.$ajax.get(BaseUrl+"newsFlash/articleList",{
                        params: {
                            pageNum:"1",
                            pageSize:"10"
                        }, headers: {'token': sessionStorage.getItem('token')}}).then(res=>{
                console.log(res)
                    res.data.data.forEach(item=>{
                                if(item.time!=undefined){
                                    item.time=moment.utc(item.time).local().format('YYYY-MM-DD HH:mm:ss')
                                }
                            })
                    this.tableData=res.data.data
                }
            )
        },
        components: {
            headTop
        },
        methods: {
            
            searchCheck() {//快讯搜索
                
            },
            handleSizeChange(pageSize) {
                console.log(">>>>>>pageSize", pageSize);
                this.nowPageSize = pageSize;
                
            },
            handleCurrentChange(pageValue) {
                console.log(">>>>>>pageValue", pageValue);
                this.currentPage = pageValue;
               
            },
            
            goEdit(){//前往编辑界面
                this.$router.push({path:"/editingInterface"})
            },
            goComment(row){//前往评论界面
                this.$router.push({path:'/comment',query:{
                    id:row.id
                }})     
                console.log(row)   
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
