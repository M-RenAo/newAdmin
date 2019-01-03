<template>
    <div class="fillcontain">
        <el-tabs v-model="activeName" style="padding: 20px">
            <!--<el-tab-pane label="基本信息" name="first">-->
                <!--<basic-info></basic-info>-->
            <!--</el-tab-pane>-->
            <el-tab-pane label="操作记录" name="second">
                <do-history v-if="activeName=='second'"></do-history>
            </el-tab-pane>
            <el-tab-pane label="ImAPP钱包" name="third">
                <wallet v-if="activeName=='third'"></wallet>
            </el-tab-pane>
            <el-tab-pane label="邀请好友记录" name="fourth">
                <send-inviate v-if="activeName=='fourth'"></send-inviate>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import basicInfo from '../components/basicInfo'
    import doHistory from '../components/doHistory'
    import wallet from '../components/wallet'
    import sendInviate from '../components/sendInviate'

    export default {
        data() {
            return {
                activeName: 'second'
            }
        },
        components: {
             basicInfo, doHistory, wallet, sendInviate
        },
        created() {
        },
        methods: {},
    }
</script>

<style lang="less">
    @import '../style/mixin';

    .table_container {
        padding: 20px;
    }
</style>
