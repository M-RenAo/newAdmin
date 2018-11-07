<template>
    <div>
        <el-radio-group v-model="radio3" style="padding-left: 20px;">
            <el-radio-button label="页面点击数"></el-radio-button>
            <el-radio-button label="页面点击用户数"></el-radio-button>
        </el-radio-group>
        <div class="table_container">
            <div type="flex"  style="margin-bottom: 30px;">
                <span style="font-size: 14px;">时间：</span>
                <el-date-picker
                    v-model="endDate"
                    type="daterange"
                    range-separator="-"
                >
                </el-date-picker>
                <!--<el-radio v-model="radio" label="1">按天展示</el-radio>-->
                <!--<el-radio v-model="radio" label="2">按月展示</el-radio>-->
                <div style="float:right" :span="6">
                    <el-button type="primary">搜索</el-button>
                    <el-button type="primary">导出</el-button>
                </div>
            </div>
            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    label=""
                    prop="title">
                </el-table-column>
                <el-table-column
                    label="应用"
                    prop="allUsers">
                </el-table-column>
                <el-table-column
                    label="自选"
                    prop="registerNum">
                </el-table-column>
                <el-table-column
                    label="猜猜"
                    prop="signUsers">
                </el-table-column>
                <el-table-column
                    label="小协议"
                    prop="signUsers">
                </el-table-column>
                <el-table-column
                    label="我的"
                    prop="mine">
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
                radio3:'1',
                tableData:[
                    {title:'总计',allUsers:'10000',registerNum:'122',signUsers:'9334',mine:'1234'},
                    {title:'2018-08-23',allUsers:'10000',registerNum:'122',signUsers:'9334',mine:'2345'}
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

<style lang="less" scoped>
    @import "../style/mixin";
    .table_container{
        padding: 20px;
    }
</style>
