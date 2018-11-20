<template>
    <div>
        <div class="table_container">
            <div style="display: flex;font-size: 14px;margin-bottom: 20px">
                <div class="card-data">
                    <p style="font-size: 16px;">今日应用下载次数</p>
                    <div style="height: 50px;display: flex;align-items: center;font-size: 16px;color: #E6A23C">{{newSignNum}}</div>
                    <!--<p>经邀请注册用户：{{inviteSign}}名</p>-->
                </div>
                <div class="card-data">
                    <p style="font-size: 16px;">今日应用打开量</p>
                    <div style="height: 50px;display: flex;align-items: center;font-size: 16px;color: #E6A23C">{{newSignNum}}</div>
                    <!--<p>经邀请注册用户{{inviteSign}}</p>-->
                </div>
            </div>
            <div>
                <span style="font-size: 14px;color:#606266;">分类:</span>
                <el-select v-model="fileTagUnchoice" placeholder="请选择" @change="searchUnchoiceAppByTag">
                    <el-option label="全部" value="-1"></el-option>
                    <el-option
                        v-for="item in tagList"
                        :key="item.code"
                        :label="item.title"
                        :value="item.code">
                    </el-option>
                    <el-option label="未定义" value="0"></el-option>
                </el-select>
                <!--<span style="font-size: 14px;color:#606266;">状态:</span>-->
                <!--<el-select v-model="flag" placeholder="请选择" style="width:100px" @change="searchByFlag(flag)" >-->
                    <!--<el-option value="2" label="全部">全部</el-option>-->
                    <!--<el-option value="1" label="已上架">已上架</el-option>-->
                    <!--<el-option value="0" label="未上架">未上架</el-option>-->
                <!--</el-select>-->
                <el-input placeholder="请输入应用名"  class="input-with-select" v-model="searchInfo" style="width:200px;margin-left:10px" @keyup.enter.native="searchApp(searchInfo)">
                    <el-button slot="append"  @click="searchApp(searchInfo)"><i class="el-icon-search"></i></el-button>
                </el-input>
            </div>

            <div  style="margin-bottom: 30px;margin-top: 20px">
                <span style="font-size: 14px;">时间：</span>
                <el-date-picker
                    v-model="dataTime"
                    type="daterange"
                    range-separator="-"
                    @change="test()"
                >
                </el-date-picker>
                <!--<el-radio v-model="radio" label="1">按天展示</el-radio>-->
                <!--<el-radio v-model="radio" label="2">按月展示</el-radio>-->
                <!--<div style="float:right" :span="6">-->
                <!--<el-button type="primary" @click="serchData(dataTime)">搜索</el-button>-->
                <!--<el-button type="primary">导出</el-button>-->
                <!--</div>-->
            </div>
            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    label="应用名称"
                    prop="title">
                </el-table-column>
                <el-table-column
                    label="下载量"
                    prop="loginNum">
                </el-table-column>
                <el-table-column
                    label="打开量"
                    prop="userSum">
                </el-table-column>
                <el-table-column
                    label="自选添加量"
                    prop="userSum">
                </el-table-column>
                <el-table-column
                    label="自选打开量"
                    prop="authNum">
                </el-table-column>
                <el-table-column
                    label="点击量"
                    prop="authNum">
                </el-table-column>
                <el-table-column
                    label="人均打开量"
                    prop="authNum">
                </el-table-column>
                <el-table-column
                    label="操作"
                    >
                    <template scope="scope">
                        <el-button type="text" @click="detailDataCheck(scope)">明细</el-button>
                    </template>
                </el-table-column>
                <!--<el-table-column-->
                <!--label="总用户"-->
                <!--prop="userSum">-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                <!--label="注册用户"-->
                <!--prop="regiNum">-->
                <!--</el-table-column>-->

            </el-table>

        </div>
        <el-dialog  :visible.sync="dialogTableIAVisible" width="1000px">
            <div style="margin-bottom: 10px">应用名称：{{appName}}</div>
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
            <el-table :data="detailData">
                <el-table-column property="createTime" label="日期"></el-table-column>
                <el-table-column property="amount" label="下载量"></el-table-column>
                <el-table-column property="type" label="打开量"></el-table-column>
                <el-table-column property="remark" label="自选添加量"></el-table-column>
                <el-table-column property="address" label="自选打开量"></el-table-column>
                <el-table-column property="address" label="点击量"></el-table-column>
                <el-table-column property="address" label="人均打开量"></el-table-column>
                <el-table-column property="address" label="人均点击量"></el-table-column>
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
        <div style="margin:0px 20px;">
            <!--<span style="font-size: 14px;">时间：</span>-->
            <!--<el-date-picker-->
            <!--v-model="chartTime"-->
            <!--type="daterange"-->
            <!--range-separator="-"-->
            <!--&gt;-->
            <!--</el-date-picker>-->
            <!--<div style="float:right" :span="6">-->
            <!--<el-button type="primary" @click="serchChart(chartTime)">搜索</el-button>-->
            <!--</div>-->
            <el-tabs class="table_container" v-model="activeName" @tab-click="handleClick" style="width:140px">
                <el-tab-pane label="近七日" name="1"></el-tab-pane>
                <el-tab-pane label="近30日" name="2"></el-tab-pane>
            </el-tabs>
            <tendency :sevenDate='sevenDate' :sevenDay='sevenDay' :max="max" :dataName='dataName'></tendency>
        </div>
        <!--<li v-for="item in focusList" @click="test(item)">-->
        <!--{{item.a}}-->
        <!--</li>-->
    </div>

</template>

<script>
    import tendency from '../components/tendency'
    import {baseUrl, baseImgPath} from "@/config/env";
    import Vue from "vue";
    import dtime from 'time-formater'

    let moment=require('moment');
    export default {
        data() {
            return {
                activeName:'1',
                fileTagUnchoice:'-1',
                flag:'2',
                appName:'支付宝',
                cumulativeUsers:10000,
                realNameUsers:2000,
                newSignNum:200,
                inviteSign:20,
                detailData:[],
                searchInfo:'',
                // radio:'1',
                currentPageDetail:1,
                nowPageSizeDetail:10,
                txcountDetail:0,
                dialogTableIAVisible:false,
                dataTime:[moment().subtract('days', 31).format('YYYY-MM-DD'),moment().subtract('days', 1).format('YYYY-MM-DD')],
                chartTime:null,
                tableData:[
                ],
                max:'',
                startDate1:moment().subtract('days',6).format('YYYY-MM-DD'),
                sevenDay: [],
                sevenDate: [[],[],[],[]],
                endDate1:moment().add('days',1).format('YYYY-MM-DD'),
                startDate2:moment().subtract('days', 7).format('YYYY-MM-DD'),
                endDate2:moment().add('days',1).format('YYYY-MM-DD'),
                dataName:['登录用户', '注册用户','实名认证用户'],
                tagList:[],
                // focusList:[{a:'hhhhh',url:'baidu.com'},{a:'hhhhh',url:'https://imapp.com'},{a:'hhhhh',url:'https://test.imapp.io'}]
            };
        },
        components: {
            tendency
        },
        created() {
            this.$ajax.get(BaseUrl + "apptag/all", {
                headers: {
                    'token': sessionStorage.getItem('token'),
                    'device':'android'
                }
            }).then(response => {
                if (response.data.flag == 200) {
                    this.tagList = response.data.data;
                } else if (response.data.flag == 201) {
                    this.$alert(response.data.msg + '，请重新登录', '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$router.push('/')
                        }
                    });
                }

            });
            this.getData()
            this.getDatas()
        },
        computed: {},
        methods: {
            // async initData(){
            //     const today = dtime().format('YYYY-MM-DD')
            //     Promise.all([userCount(today), orderCount(today), adminDayCount(today), getUserCount(), getOrderCount(), adminCount()])
            //         .then(res => {
            //             this.userCount = res[0].count;
            //             this.orderCount = res[1].count;
            //             this.adminCount = res[2].count;
            //             this.allUserCount = res[3].count;
            //             this.allOrderCount = res[4].count;
            //             this.allAdminCount = res[5].count;
            //         }).catch(err => {
            //         console.log(err)
            //     })
            // },
            // test:function(item){
            //  console.log(item)
            //     window.location.href=item.url
            // },
            test(){
                this.getData()
            },
            detailDataCheck(){
               this.dialogTableIAVisible=true
            },
            getData(){
                this.$ajax.get(BaseUrl+'data/content',
                    {params:{cycle:'day',startDate:moment(this.dataTime[0]).format('YYYY-MM-DD'),endDate:moment(this.dataTime[1]).format('YYYY-MM-DD')},headers:{'token':sessionStorage.getItem('token')}}).then(response=>{
                    // console.log(response);
                    if(response.data.flag==200){
                        this.tableData=response.data.data;
                    }else if(response.data.flag==201){
                        this.$alert(response.data.msg+'，请重新登录', '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$router.push('/')
                            }
                        });
                    }
                    // this.tableData.forEach(item=>{
                    //     if(item.title!='总计'){
                    //     item.title=moment.utc(item.title).local().format('YYYY-MM-DD')
                    //     }
                    // })
                })
            },
            serchData(dataTime){
                if(dataTime==null){
                    this.$alert('请选择搜索日期', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$message({
                                type: 'info',
                                message: `请重试！`
                            });
                        }
                    });
                    return false;
                }else if((moment(dataTime[1])-moment(dataTime[0]))/(24*60*60*1000)>30){
                    this.$alert('不能超过30天', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$message({
                                type: 'info',
                                message: `请重试！`
                            });
                        }
                    });
                    return false;
                }else if(dataTime!=null){
                    this.startDate1=moment(dataTime[0]).format('YYYY-MM-DD')
                    this.endDate1=moment(dataTime[1]).format('YYYY-MM-DD')
                    this.getData()
                }
            },
            getDatas(){
                this.$ajax.get(BaseUrl+'data/show',
                    {params:{cycle:'day',startDate:this.startDate2,endDate:this.endDate2},headers:{'token':sessionStorage.getItem('token')}}).then(response=>{
                    if(response.data.flag==200) {
                        this.sevenDay = response.data.data[0];
                        this.sevenDate = response.data.data[1];
                        this.max = Math.max(...this.sevenDate[0], ...this.sevenDate[1], ...this.sevenDate[2], ...this.sevenDate[3]);
                        // console.log(this.max)
                    }else{
                        this.$alert(response.data.msg+'，请重新登录', '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$router.push('/')
                            }
                        });
                    }
                    // this.tableData=response.data.data
                })
            },
            handleClick(){
                if(this.activeName==2){
                    this.startDate2=moment().subtract('days', 31).format('YYYY-MM-DD')
                }else{
                    this.startDate2=moment().subtract('days', 7).format('YYYY-MM-DD')
                }
                this.getDatas()
            },
            handleDetailSizeChange(){

            },
            handleDetailCurrentChange(){

            },
            searchUnchoiceAppByTag(){},
            searchByFlag(){},
            searchApp(){}
            // serchChart(chartTime){
            //     if(chartTime==null){
            //             this.$alert('请选择搜索日期', {
            //                 confirmButtonText: '确定',
            //                 callback: action => {
            //                     this.$message({
            //                         type: 'info',
            //                         message: `请重试！`
            //                     });
            //                 }
            //             });
            //             return false;
            //     }
            //     else if((moment(chartTime[1])-moment(chartTime[0]))/(24*60*60*1000)>30){
            //         this.$alert('不能超过30天', {
            //             confirmButtonText: '确定',
            //             callback: action => {
            //                 this.$message({
            //                     type: 'info',
            //                     message: `请重试！`
            //                 });
            //             }
            //         });
            //         return false;
            //     }else if(chartTime!=null){
            //       this.startDate2=moment(chartTime[0]).format('YYYY-MM-DD')
            //        this.endDate2=moment(chartTime[1]).format('YYYY-MM-DD');
            //       this.getDatas();
            //     }
            // }
        },

    };
</script>

<style lang="less" scoped>
    @import "../style/mixin";
    .table_container{
        padding: 20px;
    }
    .card-data{
        padding:5px 10px;
        color: #fff;
        /*display: flex;*/
        /*flex-direction: column;*/
        /*justify-content: center;*/
        width:200px;
        height: 100px;
        /*border:1px solid #999;*/
        margin-right:15px;
        background:#85ce61;
    }
    .card-data:last-child{
        padding:5px 10px;
        /*display: flex;*/
        /*flex-direction: column;*/
        /*justify-content: center;*/
        width:200px;
        height: 100px;
        /*border:1px solid #999;*/
        margin-right:0px;

    }
</style>
