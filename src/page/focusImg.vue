<template>
    <div class="fillcontain">
        <div class="table_container">
            <el-row type="flex" style="margin-bottom: 30px;">
                <div>
                    <el-button type="primary" style="margin-right:10px;margin-bottom:2px;" @click="addFocus">新增
                    </el-button>
                </div>
                <el-col :span="18" style="display:flex;height: auto;word-break:break-all;flex:1">
                    <div style="display:inline-block">
                        <span style="font-size: 14px;width:80px;">焦点图标题：</span>
                        <el-input v-model="searchForm.topic" placeholder="请输入内容" style="width:150px;"></el-input>
                        <!--<span style="font-size: 14px;">类型：</span>-->
                        <!--<el-select v-model="state" placeholder="请选择">-->
                        <!--&lt;!&ndash;<el-option&ndash;&gt;-->
                        <!--&lt;!&ndash;v-for="item in options"&ndash;&gt;-->
                        <!--&lt;!&ndash;:key="item.value"&ndash;&gt;-->
                        <!--&lt;!&ndash;:label="item.label"&ndash;&gt;-->
                        <!--&lt;!&ndash;:value="item.value">&ndash;&gt;-->
                        <!--&lt;!&ndash;</el-option>&ndash;&gt;-->
                        <!--</el-select>-->
                        <div style="display: inline-block">
                            <span style="font-size: 14px;width:80px;">开始时间：</span>
                            <!--<el-date-picker-->
                            <!--v-model="searchForm.startDate"-->
                            <!--type="datetime"-->
                            <!--&gt;-->
                            <!--</el-date-picker>-->
                            <!--—-->
                            <!--<el-date-picker-->
                            <!--v-model="searchForm.endDate"-->
                            <!--type="datetime"-->
                            <!--&gt;-->
                            <!--</el-date-picker>-->
                            <el-date-picker
                                v-model="startDate"
                                type="datetimerange"
                                align="right"
                                :default-time="['12:00:00', '08:00:00']">
                            </el-date-picker>
                        </div>
                        <div style="display: inline-block">
                            <span style="font-size: 14px;width:80px;">结束时间：</span>
                            <!--<el-date-picker-->
                            <!--v-model="searchForm.startDate"-->
                            <!--type="datetime"-->
                            <!--&gt;-->
                            <!--</el-date-picker>-->
                            <!--—-->
                            <!--<el-date-picker-->
                            <!--v-model="searchForm.endDate"-->
                            <!--type="datetime"-->
                            <!--&gt;-->
                            <!--</el-date-picker>-->
                            <el-date-picker
                                v-model="endDate"
                                type="datetimerange"
                                align="right"
                                :default-time="['12:00:00', '08:00:00']">
                            </el-date-picker>
                        </div>
                        <div style="display: inline-block">
                            <!--<span style="font-size: 14px;">类型：</span>-->
                            <!--<el-select v-model="state" placeholder="请选择">-->
                            <!--<el-option-->
                            <!--v-for="item in options"-->
                            <!--:key="item.value"-->
                            <!--:label="item.label"-->
                            <!--:value="item.value">-->
                            <!--</el-option>-->
                            <!--</el-select>-->
                        </div>
                    </div>
                </el-col>
                <div style="float:right">
                    <el-button type="primary" style="margin-right:10px;margin-bottom:2px;"
                               @click="search(searchForm)">搜索
                    </el-button>
                    <!--<el-button type="primary" style="margin-left:0">导出</el-button>-->
                </div>
            </el-row>
            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    label="焦点图标题"
                >
                    <template scope="scope">
                        <router-link :to="{path:'/focusInfo',query:{id:scope.row.id,type:'android'}}">
                            {{scope.row.title}}
                        </router-link>
                    </template>
                </el-table-column>
                <el-table-column
                    label="类型"
                    prop="type">
                </el-table-column>
                <el-table-column
                    label="开始时间"
                    prop="startTime">
                </el-table-column>
                <el-table-column
                    label="结束时间"
                    prop="endTime">
                </el-table-column>
                <el-table-column
                    label="状态"
                    prop="status">
                </el-table-column>
                <el-table-column label="操作" width="200">
                    <template scope="scope">
                        <el-button @click="updateFocus(scope.row.id)">编辑</el-button>
                        <el-button @click="delFocus(scope.row.id)">删除</el-button>
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
                :visible.sync="dialogVisible"
                width="30%"
            >
                <span>确认删除焦点图？</span>
                <span slot="footer" class="dialog-footer">
                   <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="deleteEnsure()">确 定</el-button>
                </span>
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
                startDate: '',
                endDate: '',
                type: 'android',
            }
        },
        mounted() {
            console.log(this.$route.path)
            this.getData()
        },
        computed: {},
        components: {
            headTop
        },
        methods: {
            getData() {
                this.$ajax.get(BaseUrl + 'banner/all/' + this.currentPage + '/' + this.nowPageSize, {
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
                            item.status = item.state
                            item.startTime = moment.utc(item.startTime).local().format('YYYY-MM-DD HH:mm:ss')
                            item.endTime = moment.utc(item.endTime).local().format('YYYY-MM-DD HH:mm:ss')
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
            }
        },
    }
</script>

<style lang="less" scoped>
    @import '../style/mixin';

    .table_container {
        padding: 20px;
    }

</style>
