<template>
    <div class="fillcontain">

        <div class="table_container">
            <el-tabs v-model="activeName" @tab-click="getData()">
               <el-tab-pane label="全部" name="0"></el-tab-pane>
               <el-tab-pane label="待上架" name="2"></el-tab-pane>
               <el-tab-pane label="上架" name="1"></el-tab-pane>
               <el-tab-pane label="下架" name="3"></el-tab-pane>
            </el-tabs>
            <el-row type="flex" style="margin-bottom: 30px;">
                <div>
                    <el-button type="primary" style="margin-right:10px;margin-bottom:2px;" @click="addFocus">新增
                    </el-button>
                </div>
                <el-col :span="18" style="display:flex;height: auto;word-break:break-all;flex:1">
                    <div style="display:inline-block">

                    </div>
                </el-col>
            </el-row>
            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    label="焦点图标题"
                >
                    <template scope="scope">
                        <router-link :to="{path:'/focusInfo',query:{id:scope.row.id,type:'ios'}}">{{scope.row.title}}
                        </router-link>
                    </template>
                </el-table-column>
                <el-table-column
                    label="状态"
                    prop="status">
                </el-table-column>
                <el-table-column
                    label="类型"
                    prop="type">
                </el-table-column>
                <el-table-column
                    label="开始时间"
                    prop="startTimes">
                </el-table-column>
                <el-table-column
                    label="结束时间"
                    prop="endTimes">
                </el-table-column>
                <el-table-column
                    label="展示量"
                    prop="z">
                </el-table-column>
                <el-table-column
                    label="点击量"
                    prop="d">
                </el-table-column>
                <el-table-column label="操作" width="100">
                    <template scope="scope">
                        <el-button type="text" @click="updateFocus(scope.row.id)">编辑</el-button>
                        <el-popover
                            placement="right"
                            width="70"
                            trigger="click"
                            v-model="scope.row.visible">
                            <div style=" width:70px">
                                <el-button style="display: block;margin: 0" type="text" size="mini" @click="setState(scope.row.id)" v-if="scope.row.status!=='下架'">
                                    下架
                                </el-button>
                                <!--<el-button style="display: block;margin: 0" type="text" size="mini" @click="setSort(scope.row.id,scope.row)">-->
                                    <!--设置顺序-->
                                <!--</el-button>-->
                                <el-button style="display: block;margin: 0" size="mini" type="text" @click="delFocus(scope.row.id)">删除</el-button>
                            </div>
                            <el-button type="text" slot="reference">更多</el-button>
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
            <el-dialog
                title="提示"
                :visible.sync="dialogVisibleState"
                width="30%">
                <span>确定要下架该焦点图吗?</span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisibleState = false">取 消</el-button>
                    <el-button type="primary" @click="ensureSetState">确 定</el-button>
                </span>
            </el-dialog>
            <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="30%"
            >
                <span>确认删除焦点图？</span>
                <span slot="footer" class="dialog-footer">
                   <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="deleteEnsure()">确 定</el-button>
                </span>
            </el-dialog>
            <el-dialog title="" :visible.sync="dialogFormSort">
                <el-form :model="form">
                    <el-form-item label="排序" :label-width="formLabelWidth" prop="sort">
                        <el-input v-model="sort" auto-complete="off" style="width:80%"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormSort = false;">取 消</el-button>
                    <el-button type="primary" @click="ensureSortFocus">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {baseUrl, baseImgPath} from '@/config/env'

    let moment = require('moment')
    export default {
        data() {
            return {
                id: '',
                state: '',
                tableData: [],
                currentRow: null,
                txcount: 0,
                currentPage: 1,
                nowPageSize: 10,
                searchForm: {},
                dialogVisible: false,
                dialogVisibleState:false,
                dialogFormSort:false,
                formLabelWidth:'120px',
                startDate: '',
                endDate: '',
                type: 'ios',
                radio:1,
                sortId:'',
                sort:'',
                form:{},
                activeName:0
            }
        },
        mounted() {
            // console.log(this.$route.path)
            this.nowPageSize=Number(this.$route.query.size)
            this.getData()
        },
        computed: {},
        components: {
            headTop
        },
        methods: {
            getData() {
                this.$ajax.get(BaseUrl + 'banner/all/' + this.activeName+'/'+this.$route.query.page + '/' + this.nowPageSize, {
                    headers: {
                        'token': sessionStorage.getItem('token'),
                        'device': this.type
                    }
                }).then(response => {
                    // console.log(response)
                    if (response.data.flag == 200) {
                        this.tableData = response.data.data.list;
                        this.txcount = response.data.data.num;
                        this.tableData.forEach(item => {
                            if(item.startTime!='1970-01-01 08:00:00'&&item.endTime!='1970-01-01 08:00:00'){
                                item.startTimes = moment.utc(item.startTime).local().format('YYYY-MM-DD HH:mm:ss')
                                item.endTimes = moment.utc(item.endTime).local().format('YYYY-MM-DD HH:mm:ss')
                            }else{
                                item.startTimes='';
                                item.endTimes=''
                            }
                        })
                        this.tableData.forEach(item => {
                            if (item.type == '1') {
                                item.type = '图文详情'
                            } else if (item.type == '2') {
                                item.type = '推广APP'
                            } else if (item.type == '3') {
                                item.type = '跳转链接'
                            }
                        })
                        this.tableData.forEach(item => {
                            if (item.startTime != '1970-01-01 08:00:00'&&item.endTime != '1970-01-01 08:00:00'){

                                if(new Date().getTime()>=moment(item.startTimes).format('X')*1000&&new Date().getTime()<=moment(item.endTimes).format('X')*1000){
                                    item.status="上架"
                                    // console.log(1)
                                }else if(new Date().getTime()<moment(item.startTimes).format('X')*1000){
                                    item.status="待上架"
                                }else if(new Date().getTime()>moment(item.endTimes).format('X')*1000){
                                    item.status="下架"
                                }
                            }else　if(item.startTime =='1970-01-01 08:00:00'&&item.endTime == '1970-01-01 08:00:00'){
                                item.status="下架"
                            }
                        })
                        this.currentPage=Number(this.$route.query.page)
                    } else if (response.data.flag == 201) {
                        this.$alert(response.data.msg + '，请重新登录', '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$router.push('/')
                            }
                        });
                    } else {
                        this.$alert(response.data.msg, '提示', {
                            confirmButtonText: '确定',
                        });
                    }
                })
            },
            handleSizeChange(pageSize) {
                // console.log(">>>>>>pageSize", pageSize);
                this.nowPageSize = pageSize;
                // if (this.searchForm == '') {
                //     var listParams = {
                //         page: 1,
                //         size: pageSize,
                //         order:"startDate desc"
                //     };
                // } else {
                //     this.searchForm.page = 1;
                //     this.searchForm.size = pageSize
                //     this.searchForm.order="startDate desc"
                //     var listParams = this.searchForm
                // }
                this.$router.push({
                    name: 'bannerDeploy',
                    query: {
                        page:1,
                        size: this.nowPageSize,
                        active:this.$route.query.active
                    }
                })
                this.getData();
            },
            handleCurrentChange(pageValue) {
                // console.log(">>>>>>pageValue", pageValue);
                this.currentPage = pageValue;
                // if (this.searchForm == '') {
                //     var listParams = {
                //         page: pageValue,
                //         size: this.nowPageSize || 10,
                //         order:"startDate desc"
                //     };
                // } else {
                //     this.searchForm.page = pageValue;
                //     this.searchForm.size = this.nowPageSize || 10;
                //     this.searchForm.order="startDate desc"
                //     var listParams = this.searchForm
                // }
                //
                this.$router.push({
                    name: 'bannerDeploy',
                    query: {
                        page:this.currentPage,
                        size: this.nowPageSize,
                        active:this.$route.query.active
                    }
                })
                this.getData();
            },
            updateFocus(id) {
                this.$router.push({path: 'updateFocus', query: {id: id, type: this.type}})
            },
            addFocus() {
                this.$router.push({path: 'updateFocus', query: {type: this.type}})
            },
            delFocus(id) {
                this.id = id
                this.dialogVisible = true;
            },
            deleteEnsure() {
                this.dialogVisible = false;
                this.$ajax({
                    method: "POST",
                    url: BaseUrl + 'banner/delete/' + this.id,
                    headers: {'token': sessionStorage.getItem('token'), 'device': this.type}
                }).then(response => {
                    if (response.data.flag == 200) {
                        this.$message({
                            type: 'success',
                            message: '删除成功!',
                            callback: action => {
                            }
                        });
                        this.getData({page: 1, size: 10})
                    } else if (response.data.flag == 201) {
                        this.$alert(response.data.msg + '，请重新登录', '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$router.push('/')
                            }
                        });
                    } else {
                        this.$message({
                            type: 'error',
                            message: '删除失败!',
                        });
                    }
                });
            },
            setState(id){
                this.dialogVisibleState=true
            },
            ensureSetState(){

            },
            setSort(id,row){
                this.sortId=id;
                this.sort=row;
                this.dialogFormSort=true
            },
            ensureSortFocus(){

            },
        },
    }
</script>

<style lang="less" scoped>
    @import '../style/mixin';

    .table_container {
        padding: 20px;
    }

</style>
