<template>
    <el-tabs class="table_container" v-model="activeName">
        <el-tab-pane label="提取审核" name="1">
            <extract-check-list></extract-check-list>
        </el-tab-pane>
        <el-tab-pane label="自动审核" name="2">
            <auto-check></auto-check>
        </el-tab-pane>
    </el-tabs>
</template>


<script>
    import extractCheckList from './extractCheckList'
    import autoCheck from './autoCheck'
    export default {
        data() {
            return {
                activeName: '1',

            }
        },
        components: {
            extractCheckList,autoCheck

        },
        mounted() {

        },
        computed: {},
        methods: {}
    }
</script>

<style lang="less" scoped>
    @import '../style/mixin';

    .table_container {
        padding: 0px 20px;
    }

    .data_section {
        padding: 20px;
        margin-bottom: 40px;
        .section_title {
            text-align: center;
            font-size: 30px;
            margin-bottom: 10px;
        }
        .data_list {
            text-align: center;
            font-size: 14px;
            color: #666;
            border-radius: 6px;
            background: #E5E9F2;
            .data_num {
                color: #333;
                font-size: 26px;

            }
            .head {
                border-radius: 6px;
                font-size: 22px;
                padding: 4px 0;
                color: #fff;
                display: inline-block;
            }
        }
        .today_head {
            background: #FF9800;
        }
        .all_head {
            background: #20A0FF;
        }
    }

    .wan {
        .sc(16px, #333)
    }
</style>
