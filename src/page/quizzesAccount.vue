<!--竞猜账户-->
<template>
    <div>
        <div>
            <el-tabs v-model="activeName" style="padding: 20px">
                <el-tab-pane label="竞猜账户" name="first">
                    <quizAccount v-if="activeName=='first'"></quizAccount>
                </el-tab-pane>
                <el-tab-pane label="小号使用IA" name="second">
                    <litNum v-if="activeName=='second'"></litNum>
                </el-tab-pane>
                <el-tab-pane label="结算至平台收益账户" name="third">
                    <settlement v-if="activeName=='third'"></settlement>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>

</template>

<script>
    import {baseUrl, baseImgPath} from "@/config/env";
    import quizAccount from '../components/quizAccount'
    import litNum from '../components/litNum'
    import settlement from '../components/settlement'

    export default {
        data() {
            return {
                activeName: 'first'
            };
        },
        components: {
            quizAccount, litNum, settlement
        },
        created() {
            // const form = {page: this.currentPage, size: this.nowPageSize,order:"startDate desc"}
            // this.getData(form)
        },
        computed: {},
        methods: {},

    };
</script>

<style lang="less" scoped>
    @import "../style/mixin";

    .littleButton {
        padding: 5px 10px !important;
        margin-left: 0 !important;
    }
</style>
