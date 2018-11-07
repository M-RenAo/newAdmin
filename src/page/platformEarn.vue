<template>
    <div class="fillcontain">
        <el-tabs v-model="activeName" style="padding: 20px">
            <el-tab-pane label="IA收益" name="first">
                <earn v-if="activeName=='first'"></earn>
            </el-tab-pane>
            <el-tab-pane label="BCD收益" name="second"><bcd-earn v-if="activeName=='second'"></bcd-earn></el-tab-pane>
            <el-tab-pane label="平台收益奖励" name="third"><reward-users v-if="activeName=='third'"></reward-users></el-tab-pane>
            <el-tab-pane label="活动用户奖励" name="forth"><activity v-if="activeName=='forth'"></activity></el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import earn from '../components/earn'
    import bcdEarn from '../components/bcdEarn'
    import {getUserList, getUserCount} from '@/api/getData'
    import rewardUsers from '../components/rewardUsers'
    import activity from '../components/activityUserReward'
    export default {
        data(){
            return {
                activeName: 'first'
            }
        },
        components: {
           earn,rewardUsers,bcdEarn,activity
        },
        created(){
        },
        methods: {
        },
    }
</script>

<style lang="less">
    @import '../style/mixin';
    .table_container{
        padding: 20px;
    }
</style>
