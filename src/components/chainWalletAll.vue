<template>
    <div>
        <div class="table_container myself">
            <el-card class="box-card">
                    <span style="font-weight: 700;letter-spacing: 1px;">链城平台钱包总余额：60000BCD</span>
            </el-card>
            <div type="flex"  style="margin-bottom: 30px; margin-top: 20px;">
                <span style="font-size: 14px;">时间：</span>
                <el-date-picker style="width:400px;"
                                v-model="endDate"
                                type="datetimerange"
                                align="right"
                                :default-time="['12:00:00', '08:00:00']">
                </el-date-picker>
                <div style="float:right" :span="6">
                    <el-button type="primary">搜索</el-button>
                    <el-button type="primary">导出</el-button>
                </div>
            </div>
            <el-table
                :data="tableData"
                style="width: 100%!important;" >
                <el-table-column
                    label="时间"
                    prop="title" min-width="70">
                </el-table-column>
                <el-table-column
                    label="收款-BCD钱包转进来（BCD）"
                    prop="allUsers" min-width="70">
                </el-table-column>
                <el-table-column
                    label="收款-链成钱包转进来（BCD）"
                    prop="registerNum" min-width="70">
                </el-table-column>
                <el-table-column
                    label="转账-转出至BCD钱包（BCD）"
                    prop="signUsers" min-width="70">
                </el-table-column>
                <el-table-column
                    label="转账-转出至链成钱包（BCD）"
                    prop="signUsers" min-width="70">
                </el-table-column>
                <el-table-column
                    label="安装应用挖矿收益（BCD）"
                    prop="signUsers" min-width="50">
                </el-table-column>
                <el-table-column
                    label="打开应用挖矿收益（BCD）"
                    prop="signUsers">
                </el-table-column>
                <el-table-column
                    label="邀请好友挖矿收益（BCD）"
                    prop="signUsers" min-width="50">
                </el-table-column>
                <el-table-column
                    label="注册挖矿收益（BCD）"
                    prop="signUsers" min-width="50">
                </el-table-column>
                <el-table-column
                    label="竞猜花费（BCD）"
                    prop="signUsers" min-width="50">
                </el-table-column>
                <el-table-column
                    label="竞猜赚取（BCD）"
                    prop="signUsers" min-width="50">
                </el-table-column>
                <el-table-column
                    label="钱包总额（BCD）"
                    prop="signUsers" min-width="50">
                </el-table-column>
                <el-table-column label="操作"min-width="50">
                    <template scope="scope">
                        <el-button class="littleButton" @click="update(scope.row.signUsers)">详情</el-button>
                    </template>
                </el-table-column>
            </el-table>

        </div>
    </div>

</template>

<script>
    import {baseUrl, baseImgPath} from "@/config/env";
    export default {
        data() {
            return {
                radio:'1',
                tableData:[
                    {title:'总计',allUsers:'10000',registerNum:'122',signUsers:'9334'},
                    {title:'2018-08-23',allUsers:'10000',registerNum:'122',signUsers:'9334'}
                ],
                startDate:'',
                endDate:'',
            };
        },
        components: {
        },
        created() {
            // this.initData();
            // for (let i = 6; i > -1; i--) {
            //     const date = dtime(new Date().getTime() - 86400000*i).format('YYYY-MM-DD')
            //     this.sevenDay.push(date)
            // }
            // this.getSevenData();
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
            // async getSevenData(){
            //     const apiArr = [[],[],[]];
            //     this.sevenDay.forEach(item => {
            //         apiArr[0].push(userCount(item))
            //         apiArr[1].push(orderCount(item))
            //         apiArr[2].push(adminDayCount(item))
            //     })
            //     const promiseArr = [...apiArr[0], ...apiArr[1], ...apiArr[2]]
            //     Promise.all(promiseArr).then(res => {
            //         const resArr = [[],[],[]];
            //         res.forEach((item, index) => {
            //             if (item.status == 1) {
            //                 resArr[Math.floor(index/7)].push(item.count)
            //             }
            //         })
            //         this.sevenDate = resArr;
            //     }).catch(err => {
            //         console.log(err)
            //     })
            // }
        },

    };
</script>

<style lang="less">
    @import "../style/mixin";

    .table_container{
        padding: 20px;
    }
    .littleButton{
        padding: 5px 10px;
    }

    .myself {
        .el-table .cell, .el-table th > div {
            padding-left: 3px !important;
            padding-right: 3px !important;
            /*text-align: center;*/
            box-sizing: border-box;
            text-overflow: ellipsis;
        }
    }
</style>
