<!--竞猜账户-->
<template>
    <div>
        <div class="table_container">
            <el-card class="box-card">
                <el-row style="display:flex;align-items: center">
                    <el-col :span="12">
                        <div style="font-weight: 700;letter-spacing: 1px;">
                            <span style="width:178.14px;display: inline-block;"> 用户ImAPP钱包总额：</span>{{userBalance}} IA
                            <div style="margin-left: 178.14px">{{allUserBcdBalance}} BCD</div>
                        </div>
                        <div style="font-weight: 700;letter-spacing: 1px;margin-top:10px;">兑换成BCD消耗：{{bcdExchange}} IA
                        </div>
                    </el-col>
                </el-row>
            </el-card>
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
                appForm: {},
                tableData: [],
                startDate: '',
                endDate: '',
                state: '4',
                txcount: 0,
                currentPage: 1,
                nowPageSize: 10,
                userBalance: '',
                formLabelWidth: '120x',
                bcdExchange: '',
                allUserBcdBalance: ''
            };
        },
        components: {
            headTop
        },
        created() {
            this.$ajax({
                method: "POST",
                url: BaseUrl + 'imwallet/getAllAssetAccount',
                headers: {'token': sessionStorage.getItem('token')}
            }).then(response => {
                if (response.data.flag == 200) {
                    this.userBalance = response.data.data.imAppIaTotal;
                    this.bcdExchange = response.data.data.exchangeBcd;
                    this.allUserBcdBalance = response.data.data.imAppBcdTotal
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
        computed: {},
        methods: {
            getData(form) {
            },
            handleSizeChange(pageSize) {
            },
            handleCurrentChange(pageValue) {
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
                searchForm.order = "startDate desc"
                this.getData(searchForm)
            },
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
