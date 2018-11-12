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
                    <el-input placeholder="可输入昵称或姓名的关键字" class="input-with-select" v-model="keyword"
                              style="width:40%">
                        <el-button slot="append" @click="searchKeyword"><i class="el-icon-search"></i></el-button>
                    </el-input>
                </el-col>
            </el-row>
        </div>
        <div class="block date">
            <span class="realname">实名状态</span>
            <el-select v-model="selectvalue" style="width:110px" @change="selecttime">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            <el-date-picker v-model="date" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['00:00:00', '23:59:59']" value-format="yyyy-MM-dd" :disabled="!timeType?true:false">
            </el-date-picker>
            <el-button type="primary" @click="searchdate">搜索</el-button>
        </div>
        <div class="table">
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="nick" label="用户名" min-width="50"></el-table-column>
                <el-table-column prop="name" label="姓名" min-width="50"> </el-table-column>
                <el-table-column prop="phone" label="手机号" min-width="50"></el-table-column>
                <el-table-column prop="rtime" label="注册时间" min-width="50">
                </el-table-column>
                <el-table-column prop="atime" label="实名时间" min-width="50"></el-table-column>
                <el-table-column label="邀请成功注册人数" min-width="50" >
                <template scope="scope">
                
                <div class="columnstyle" @click="goInviterecord(scope.row)">
                        {{scope.row.regNum}}
                </div>
                </template>
                </el-table-column>
                <el-table-column
                label="邀请成功实名人数"
                min-width="50">
                <template scope="scope">
                    
                    <div class="columnstyle" @click="goInviterecord(scope.row)">
                        {{scope.row.authNum}}
                    </div>
                </template>
                </el-table-column>
                <el-table-column
                prop="balance"
                label="iA总量"
                min-width="50">
                </el-table-column>
            </el-table>
        </div>
        <div class="page">
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
            <success-ful :userId="userId" :thisName="thisName"></success-ful>
        </el-dialog>
    </div>
</template>
<script>
    import successFul from "../components/successful";
    import { baseUrl, baseImgPath } from "@/config/env";

    export default {
        data() {
            return {
                date: '',
                dataType:{},//数据对象
                keyword:"",//关键字
                timeType:0,//切换时间选择
                activeName: 'invitingfriends',
                dialogTableVisible: false,
                selectvalue:"全部",//实名状态
                options: [{
                value: '0',
                label: '全部'
                },{
                value: '1',
                label: '注册时间'
                }, {
                value: '2',
                label: '实名时间'
                }, {
                value: '3',
                label: '登陆时间'
                }],
                tableData: [],
                usercount:0,//用户总数
                currentPage: 1,
                nowPageSize: 10,
                userId:"",
                thisName:""
            };
        },
        created(){
            this.getData();
        },
        methods: {
            searchdate() {//按时间搜索
                this.currentPage=1;
                this.nowPageSize=10;
                if(this.timeType==1){//选择注册时间
                    this.tabtime("rtime1","rtime2")
                                       
                }else if(this.timeType==2){//选择实名时间
                    this.tabtime("atime1","atime2")
                }else if(this.timeType==3){//选择登陆时间
                    this.tabtime("ltime1","ltime2")
                }else{
                    this.getData()
                }
                
            },
            searchKeyword(){//关键字搜索
                this.currentPage=1;
                this.nowPageSize=10;
                if(this.keyword){
                    
                    this.dataType.name=this.keyword
                    this.getData();
                    
                }else{
                    delete this.dataType.name    //删除name键值对
                    this.getData();
                }
                
            },
            handleSizeChange(val) {
                this.nowPageSize=val
                this.getData();
            },
            handleCurrentChange(val) {
                this.currentPage=val
                this.getData();
            },
            handleClick(tab, event) {//邀请好友   猜猜     待定
                console.log(tab, event);
                console.log(this.activeName)
            },
            // cellClick(row, column, cell, event){
            //     console.log(row, column, cell, event);
            // },
            selecttime(time){//选择时间
                this.timeType=parseInt(time);
                this.date="",
                this.dataType={};
            },
            getData(){
                this.dataType.page=this.currentPage;
                this.dataType.size=this.nowPageSize;
                let data=this.dataType
                this.$ajax({
                method: "POST",
                url: BaseUrl+'user/active',
                data:data,
                headers: {
                    'token': sessionStorage.getItem('token')
                     }
                }).then(res=>{
                    console.log(res.data.data.data)
                    this.usercount=res.data.data.num
                    this.tableData=res.data.data.data
                    
                })
            },
            tabtime(time1,time2){
                
                if(this.date){
                    this.dataType[time1]=this.date[0];
                    this.dataType[time2]=this.date[1];
                    this.getData()
                }else{
                                         
                }
            },
            goInviterecord(row){//邀请记录界面
                this.dialogTableVisible = true;
                this.userId=row.userId
                this.thisName=row.name
            }
            
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
