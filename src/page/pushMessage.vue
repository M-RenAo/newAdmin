<template>
    <div class="fillcontain">
        <div class="table_container">
            <el-row style="display:flex;margin-bottom: 20px;">
                <div>
                <el-button type="primary" @click="addpush()">新增公告</el-button>
                </div>
                <el-col>
                    <div style="display:inline-block;margin-left: 5px">
                        <span style="font-size: 14px;width:80px;">公告标题：</span>
                        <el-input v-model="input" placeholder="请输入内容" style="width:150px;"></el-input>
                        <span style="font-size: 14px;">状态：</span>
                        <el-select v-model="value" placeholder="请选择" style="margin-bottom: 2px" @change="change(value)">
                            <el-option
                                v-for="item in options"
                                :key="item.code"
                                :label="item.title"
                                :value="item.code">
                            </el-option>
                        </el-select>
                        <div style="display: inline-block">
                            <span style="font-size: 14px;width:80px;">公告时间：</span>
                            <el-date-picker
                                v-model="startDate"
                                type="datetimerange"
                                align="right"
                                :default-time="['12:00:00', '08:00:00']">
                            </el-date-picker>
                        </div>
                    </div>
                </el-col>
                <div style="display:flex;justify-content: flex-end">
                    <el-button type="primary" style="height:40px;">搜索</el-button>
                </div>
            </el-row>
            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    label="公告标题"
                >
                    <template scope="scope">
                        <router-link :to="{path:'/messageInfo',query:{id:scope.row.id}}">{{scope.row.title}}</router-link>
                    </template>
                </el-table-column>
                <el-table-column
                    label="公告时间"
                    prop="pushDate">
                </el-table-column>
                <el-table-column
                    label="状态"
                    prop="status">
                </el-table-column>
                <el-table-column label="操作" width="200">
                    <template scope="scope">
                        <el-button @click="updatePush(scope.row.id)" v-if="scope.row.state==0">编辑</el-button>
                        <el-button @click="del(scope.row.id)" >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-dialog title="提示" :visible.sync="delVisible" center>
                <span>确定删除这条推送信息？</span>
                <div slot="footer" class="dialog-footer button-check">
                    <el-button type="primary" @click="delVisible = false">取消</el-button>
                    <el-button type="primary" @click="confirmdel()">确定</el-button>
                </div>
            </el-dialog>
            <!--<div class="Pagination">-->
                <!--<el-pagination-->
                    <!--@current-change="handleCurrentChange"-->
                    <!--:current-page="currentPage"-->
                    <!--:page-size="20"-->
                    <!--layout="total, prev, pager, next"-->
                    <!--:total="count">-->
                <!--</el-pagination>-->
            <!--</div>-->
        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {baseUrl, baseImgPath} from '@/config/env'
    let moment =require('moment')
    export default {
        data(){
            return {
                input:'',
                value:'2',
                startDate:'',
                endDate:'',
                tableData: [],
                currentRow: null,
                offset: 0,
                limit: 20,
                count: 0,
                currentPage: 1,
                options: [
                    {title:'全部',code:'2'},
                    {title:'已推送',code:'1'},
                    {title:'未推送',code:'0'}
                ],
                delVisible:false,
                id:''
            }
        },
        created(){
           this.getData()
        },
        computed: {
        },
        components: {
            headTop
        },
        methods: {
            getData(){
                this.$ajax
                    .get(`${BaseUrl}push/all/2`,{headers:{'token':sessionStorage.getItem('token')}})
                    .then(response => {
                        if(response.data.flag==200) {
                            // console.log(response);
                            this.tableData = response.data.data;
                            this.tableData.forEach(item => {
                                if (item.state == '0') {
                                    item.status = '未推送'
                                } else {
                                    item.status = '已推送'
                                }
                            });
                            this.tableData.forEach(item => {
                                item.pushDate = moment.utc(item.pushDate).local().format('YYYY-MM-DD HH:mm:ss')
                            })
                        }else if(response.data.flag==201) {
                            this.$alert(response.data.msg + '，请重新登录', '提示', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    this.$router.push('/')
                                }
                            });
                        }
                    })
            },
            change(value){
                this.$ajax
                    .get(`${BaseUrl}push/all/${value}`,{headers:{'token':sessionStorage.getItem('token')}})
                    .then(response => {
                        if(response.data.flag==200) {
                            // console.log(response);
                            this.tableData = response.data.data;
                            this.tableData.forEach(item => {
                                if (item.state == '0') {
                                    item.status = '未推送'
                                } else {
                                    item.status = '已推送'
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
                    })
            },
            updatePush(id){
                this.$router.push({path:'updatePushMessage',query:{id:id}})
            },
            addpush(){
                this.$router.push({path:'addPushMessage'})
            },
            del(id){
                this.delVisible=true;
                this.id=id;
            },
            confirmdel(){
                this.$ajax
                    .get(`${BaseUrl}push/del/${this.id}`,{headers:{'token':sessionStorage.getItem('token')}})
                    .then(response => {
                        // console.log(response);
                        if(response.data.flag==200){
                            this.delVisible=false;
                            this.$alert(response.data.msg, '提示', {
                                confirmButtonText: '确定',
                                callback: action=>{this.getData()}
                            });
                        }else if(response.data.flag==201) {
                            this.$alert(response.data.msg + '，请重新登录', '提示', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    this.$router.push('/')
                                }
                            });
                        }else{
                            this.$alert(response.data.msg, '提示', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    this.$message({
                                        type: 'info',
                                        message: `error: ${ response.data.msg +',请重试'}`
                                    });
                                }
                            });
                        }
                    })
            }
        },
    }
</script>

<style lang="less" scoped>
    @import '../style/mixin';
    .table_container{
        padding: 20px;
    }
</style>
