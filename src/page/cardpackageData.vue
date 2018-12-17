<template>
    <div>
        <el-tabs class="table_container" v-model="activeName">
            <el-tab-pane label="双倍ia卡" name="1">
                <ia-dobule-card v-if="activeName==1"></ia-dobule-card>
            </el-tab-pane>
            <el-tab-pane label="猜猜保本卡" name="2">
                <guess-protect-card v-if="activeName==2"></guess-protect-card>
            </el-tab-pane>
        </el-tabs>

    </div>
</template>

<script>
    import iaDobuleCard from './iaDobuleCard'
    import guessProtectCard from './guessProtectCard'
    export default {
        data() {
            return {
                activeName: '1',

            }
        },
        components: {
            iaDobuleCard,guessProtectCard

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
