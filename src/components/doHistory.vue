<template>
    <div class="fillcontain">
        <div class="table_container">
            <!--<el-row type="flex" style="margin-bottom: 20px;">-->
            <!--<el-col :span="18" style="display:flex;height: auto;word-break:break-all;flex:1">-->
            <!--<div style="display:inline-block">-->
            <!--<div style="display: inline-block">-->
            <!--<span style="font-size: 14px;width:80px;">时间：</span>-->
            <!--<el-date-picker-->
            <!--v-model="startDate"-->
            <!--type="datetimerange"-->
            <!--align="right"-->
            <!--:default-time="['12:00:00', '08:00:00']">-->
            <!--</el-date-picker>-->
            <!--</div>-->
            <!--<div style="display: inline-block">-->
            <!--<span style="font-size: 14px;width:80px;">类型：</span>-->
            <!--<el-select v-model="state" placeholder="请选择">-->
            <!--<el-option-->
            <!--v-for="item in options"-->
            <!--:key="item.label"-->
            <!--:label="item.label"-->
            <!--:value="item.label">-->
            <!--</el-option>-->
            <!--</el-select>-->
            <!--</div>-->
            <!--</div>-->
            <!--</el-col>-->
            <!--<div style="float:right">-->
            <!--<el-button type="primary" style="margin-right:10px;margin-bottom:2px;"-->
            <!--@click="search(state,startDate)">搜索-->
            <!--</el-button>-->
            <!--&lt;!&ndash;<el-button type="primary" style="margin-left:0">导出</el-button>&ndash;&gt;-->
            <!--</div>-->
            <!--</el-row>-->
            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    label="时间"
                    prop="createTime">
                </el-table-column>
                <el-table-column
                    label="类型"
                    prop="operateType">
                </el-table-column>
                <el-table-column
                    label="详情"
                    prop="operateTarget">
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
    import {baseUrl, baseImgPath} from '@/config/env'
    import {
        getFoods,
        getFoodsCount,
        getMenu,
        updateFood,
        deleteFood,
        getResturantDetail,
        getMenuById
    } from '@/api/getData'

    let moment = require('moment')
    export default {
        data() {
            return {
                state: '全部',
                tableData: [],
                nowPageSize: 10,
                txcount: 0,
                currentPage: 1,
                searchForm: {},
                options: [
                    {value: '1', label: '全部'},
                    {value: '2', label: '安装应用'},
                    {value: '3', label: '打开应用'},
                    {value: '4', label: '更新应用'},
                    {value: '5', label: '重新下载应用'},
                    {value: '6', label: '搜索'},
                    {value: '7', label: '转账'},
                    {value: '8', label: '邀请好友'},
                    {value: '9', label: '参与竞猜'},
                ],
                startDate: null
            }
        },
        created() {
            const form = {userId: this.$route.query.id, pageCode: 1, pageSize: 10}
            this.getData(form);
        },
        computed: {},
        components: {},
        methods: {
            getData(form) {
                this.$ajax({
                    method: "POST",
                    url: BaseUrl + 'behavior/getByUserId',
                    params: form,
                    headers: {'token': sessionStorage.getItem('token')}
                }).then(response => {
                    // console.log(response)
                    if (response.data.flag == 200) {
                        this.tableData = response.data.data.data;
                        this.txcount = response.data.data.total;
                        this.tableData.forEach(item => {
                            if (item.operateDate != undefined) {
                                item.createTime = moment.utc(item.targetData).local().format('YYYY-MM-DD HH:mm:ss')
                            }
                        })
                    } else if (response.data.flag == 201) {
                        this.$alert(response.data.msg + '，请重新登录', '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$router.push('/')
                            }
                        });
                    }

                });
            },
            handleSizeChange(pageSize) {
                // console.log(">>>>>>pageSize", pageSize);
                this.nowPageSize = pageSize;
                if (this.startDate == null && this.state == '全部') {
                    var listParams = {
                        userId: this.$route.query.id,
                        pageCode: 1,
                        pageSize: pageSize,
                    };
                } else {
                    // this.searchForm.pageCode = 1;
                    // this.searchForm.pageSize = pageSize
                    var listParams = this.searchForm
                }
                this.getData(listParams);
            },
            handleCurrentChange(pageValue) {
                // console.log(">>>>>>pageValue", pageValue);
                this.currentPage = pageValue;
                if (this.startDate == null && this.state == '全部') {
                    var listParams = {
                        userId: this.$route.query.id,
                        pageCode: pageValue,
                        pageSize: this.nowPageSize || 10,
                    };
                } else {
                    // this.searchForm.pageCode = pageValue;
                    // this.searchForm.pageSize = this.nowPageSize || 10;
                    var listParams = this.searchForm
                }

                this.getData(listParams);
            },
            // GMTToStr(time) {
            //     var date = time;
            //     var Y = date.getFullYear();
            //     var M = date.getMonth() + 1;
            //     M = M < 10 ? '0' + M : M;// 不够两位补充0
            //     var D = date.getDate();
            //     D = D < 10 ? '0' + D : D;
            //     var H = date.getHours();
            //     H = H < 10 ? '0' + H : H;
            //     var Mi = date.getMinutes();
            //     Mi = Mi < 10 ? '0' + Mi : Mi;
            //     var S = date.getSeconds();
            //     S = S < 10 ? '0' + S : S;
            //     return Y + '-' + M + '-' + D + ' ' + H + ':' + Mi + ':' + S;
            //
            // },
            search(state, startDate) {
                var searchForm = {}
                if (state != '全部') {
                    searchForm.type = state
                }
                // console.log(startDate)
                if (startDate != null) {
                    searchForm.startTime = moment(this.startDate[0]).utc().format('YYYY-MM-DD HH:mm:ss');
                    searchForm.endTime = moment(this.startDate[1]).utc().format('YYYY-MM-DD HH:mm:ss')
                }
                searchForm.userId = this.$route.query.id
                searchForm.pageCode = 1;
                searchForm.pageSize = this.nowPageSize || 10;
                this.searchForm = searchForm
                // console.log(searchForm)
                this.getData(this.searchForm)
            },

        },
    }
</script>

<style lang="less" scoped>
    @import '../style/mixin';

    .table_container {
        padding: 20px;
    }

    /*.cell{*/
    /*white-space: normal !important;*/
    /*}*/

</style>
