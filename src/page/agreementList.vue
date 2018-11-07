<template>
    <div class="fillcontain">
        <el-tabs v-model="activeName" style="padding: 20px">
            <el-tab-pane label="小协议" name="first">
                <lit-agree v-if="activeName=='first'"></lit-agree>
            </el-tab-pane>
            <el-tab-pane label="内容上链" name="second"><content-chain v-if="activeName=='second'"></content-chain></el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import litAgree from '../components/litAgree'
    import {getUserList, getUserCount} from '@/api/getData'
    import contentChain from '../components/contentChain'
    export default {
        data(){
            return {
                activeName: 'first'
            }
        },
        components: {
            litAgree,contentChain
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
