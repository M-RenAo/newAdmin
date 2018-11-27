<!--竞猜账户-->
<template>
    <div>
        <div class="table_container">
            <el-card class="box-card">
                <el-row style="display:flex;align-items: center">
                    <el-col :span="12" >
                        <div style="font-weight: 700;letter-spacing: 1px;">
                            <span style="width:178.14px;display: inline-block;"> 用户ImAPP钱包总额：</span>{{userBalance}} IA
                            <div style="margin-left: 178.14px">{{allUserBcdBalance}}  BCD</div>
                        </div>
                        <div style="font-weight: 700;letter-spacing: 1px;margin-top:10px;">兑换成BCD消耗：{{bcdExchange}} IA</div>
                    </el-col>
                </el-row>
            </el-card>
            <!--<el-form :model="appForm" ref="appForm" label-width="110px" style="margin-top: 20px;margin-left: 20px;">-->
                <!--<div>-->
                    <!--<div style="display: flex;margin-bottom: 20px;">-->
                        <!--<h4>小号使用IA：</h4>-->
                    <!--</div>-->
                    <!--<el-form-item label="竞猜总投入：" prop="name">-->
                        <!--{{appForm.fileVersion}}-->
                    <!--</el-form-item>-->
                    <!--<el-form-item label="总输赢：" prop="name">-->
                        <!--{{appForm.fileDate}}-->
                    <!--</el-form-item>-->
                    <!--&lt;!&ndash;<el-form-item label="历史版本：" prop="name">&ndash;&gt;-->
                    <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->

                <!--</div>-->
            <!--</el-form>-->
            <!--<div style="display: flex;margin-bottom: 20px;margin-left: 20px;">-->
                <!--<h4>详情：</h4>-->
            <!--</div>-->
            <!--<el-row type="flex" style="margin-bottom: 30px;margin-top: 20px;margin-left: 20px;">-->
                <!--<el-col :span="19" style="display:flex;height: auto;word-break:break-all;flex:1;padding-left:5px;">-->
                    <!--<div style="display:inline-block">-->
                        <!--<div style="display: inline-block">-->
                            <!--<span style="font-size: 14px;width:80px;">小号昵称：</span>-->
                            <!--<el-input  placeholder="请输入昵称" style="width:150px;"></el-input>-->
                        <!--</div>-->
                        <!--<div style="display: inline-block">-->
                            <!--<span style="font-size: 14px;width:80px;">竞猜标题：</span>-->
                            <!--<el-input  placeholder="请输入标题" style="width:150px;"></el-input>-->
                        <!--</div>-->
                    <!--</div>-->
                <!--</el-col>-->
                <!--<div style="float:right">-->
                    <!--<el-button type="primary" style="margin-right:10px;margin-bottom:2px;"-->
                               <!--@click="search(searchForm)">搜索-->
                    <!--</el-button>-->
                    <!--&lt;!&ndash;<el-button type="primary" style="margin-left:0">导出</el-button>&ndash;&gt;-->
                <!--</div>-->
            <!--</el-row>-->
            <!--<el-table-->
                <!--:data="tableData"-->
                <!--style="width: 100%"-->
            <!--&gt;-->
                <!--<el-table-column-->
                    <!--label="时间"-->
                    <!--prop="name">-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                    <!--label="收益来源"-->
                    <!--prop="startDate">-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                    <!--label="详情"-->
                    <!--prop="endDate">-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                    <!--label="收益"-->
                    <!--prop="joins">-->
                <!--</el-table-column>-->
            <!--</el-table>-->
            <!--<div class="Pagination" style="margin-left: 20px;">-->
                <!--<el-pagination-->
                    <!--@size-change="handleSizeChange"-->
                    <!--@current-change="handleCurrentChange"-->
                    <!--:current-page="currentPage"-->
                    <!--:page-size="nowPageSize"-->
                    <!--:page-sizes="[5, 10, 20, 40]"-->
                    <!--:total="txcount"-->
                    <!--layout="total, sizes, prev, pager, next, jumper"-->
                <!--&gt;-->
                <!--</el-pagination>-->
            <!--</div>-->
        </div>
    </div>

</template>

<script>
    import {baseUrl, baseImgPath} from "@/config/env";
    import headTop from '../components/headTop'

    export default {
        data() {
            return {
                id: '',
                appForm:{},
                tableData: [],
                startDate: '',
                endDate: '',
                state: '4',
                txcount: 0,
                currentPage: 1,
                nowPageSize: 10,
                userBalance:'',
                formLabelWidth: '120x',
                bcdExchange:'',
                allUserBcdBalance:''
            };
        },
        components: {
            headTop
        },
        created() {
            this.$ajax({
                method: "POST",
                url:  BaseUrl+'imwallet/getAllAssetAccount',
                headers: {'token': sessionStorage.getItem('token')}
            }).then(response=>{
                if(response.data.flag==200) {
                    this.userBalance = response.data.data.imAppIaTotal;
                    this.bcdExchange = response.data.data.exchangeBcd;
                    this.allUserBcdBalance = response.data.data.imAppBcdTotal
                }else if(response.data.flag==201) {
                    this.$alert(response.data.msg + '，请重新登录', '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$router.push('/')
                        }
                    });
                }
            });
            // const form = {page: this.currentPage, size: this.nowPageSize,order:"startDate desc"}
            // this.getData(form)
        },
        computed: {},
        methods: {
            getData(form) {
                // this.$ajax({
                //     method: "POST",
                //     url: 'http://10.82.40.148:36788/chaincity/admin/guess/getByCond',
                //     data: form
                // }).then(response => {
                //     this.tableData = response.data.data.data;
                //     this.txcount = response.data.data.count
                //     // this.tableData.forEach(item => {
                //     //     item.results = JSON.parse(item.result).A + JSON.parse(item.result).B;
                //     //     if (item.state == 1) {
                //     //         item.status = '进行中'
                //     //     } else if (item.state == 0) {
                //     //         item.status = '已结束'
                //     //     } else if (item.state == 2) {
                //     //         item.status = '待开奖'
                //     //     } else {
                //     //         item.status = '未开始'
                //     //     }
                //     // });
                // });
            },
            handleSizeChange(pageSize) {
                // console.log(">>>>>>pageSize", pageSize);
                // this.nowPageSize = pageSize;
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
                // this.getData(listParams);
            },
            handleCurrentChange(pageValue) {
                // console.log(">>>>>>pageValue", pageValue);
                // this.currentPage = pageValue;
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
                // this.getData(listParams);
            },
            trumpet(id) {
                this.trumpetFormVisible = true
            },
            GMTToStr(time) {
                var date = time;
                var Y = date.getFullYear();
                var M = date.getMonth() + 1;
                M = M < 10 ? '0' + M : M;// 不够两位补充0
                var D = date.getDate();
                D = D < 10 ? '0' + D : D;
                var H = date.getHours();
                H = H < 10 ? '0' + H : H;
                var Mi = date.getMinutes();
                Mi = Mi < 10 ? '0' + Mi : Mi;
                var S = date.getSeconds();
                S = S < 10 ? '0' + S : S;
                return Y + '-' + M + '-' + D + ' ' + H + ':' + Mi + ':' + S;

            },
            search(searchForm) {
                if (this.startDate != '') {
                    searchForm.st1 = this.GMTToStr(this.startDate[0]);
                    searchForm.st2 = this.GMTToStr(this.startDate[1])
                }
                if (this.endDate != '') {
                    searchForm.et1 = this.GMTToStr(this.endDate[0]);
                    searchForm.et2 = this.GMTToStr(this.endDate[1])
                }
                if (this.state == 4) {
                    searchForm.state = null
                } else {
                    searchForm.state = this.state
                }
                searchForm.page = 1;
                searchForm.size = this.nowPageSize || 10;
                searchForm.order="startDate desc"
                this.getData(searchForm)
            },
            // toggleSelection(rows) {
            //     if (rows) {
            //         rows.forEach(row => {
            //             this.$refs.multipleTable.toggleRowSelection(row);
            //         });
            //     } else {
            //         this.$refs.multipleTable.clearSelection();
            //     }
            // },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            }

        },

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
</style>
