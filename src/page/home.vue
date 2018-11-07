<template>
    <div>
        <el-tabs class="table_container" v-model="activeName" >
            <!--<el-tab-pane label="基本数据" name="first">-->
                <basic-data></basic-data>
            <!--</el-tab-pane>-->
            <!--<el-tab-pane label="页面数据" name="second"><page-data></page-data></el-tab-pane>-->
            <!--<el-tab-pane label="使用时长" name="third"><use-hours></use-hours></el-tab-pane>-->

        </el-tabs>

    </div>
</template>

<script>
	import headTop from '../components/headTop'
    import basicData from '../components/basicData'
    import pageData from '../components/pageData'
    import useHours from '../components/useHours'
	import {userCount, orderCount, getUserCount, getOrderCount, adminDayCount, adminCount} from '@/api/getData'
    export default {
    	data(){
    		return {
                activeName:'first',
    			userCount: null,
    			orderCount: null,
                adminCount: null,
                allUserCount: null,
                allOrderCount: null,
                allAdminCount: null,

    		}
    	},
    	components: {
    		headTop,
            basicData,
            pageData,
            useHours
    	},
    	mounted(){

    	},
        computed: {

        },
    	methods: {

    	}
    }
</script>

<style lang="less" scoped>
	@import '../style/mixin';
    .table_container{
        padding:0px 20px;
    }
	.data_section{
		padding: 20px;
		margin-bottom: 40px;
		.section_title{
			text-align: center;
			font-size: 30px;
			margin-bottom: 10px;
		}
		.data_list{
			text-align: center;
			font-size: 14px;
			color: #666;
            border-radius: 6px;
            background: #E5E9F2;
            .data_num{
                color: #333;
                font-size: 26px;

            }
            .head{
                border-radius: 6px;
                font-size: 22px;
                padding: 4px 0;
                color: #fff;
                display: inline-block;
            }
        }
        .today_head{
            background: #FF9800;
        }
        .all_head{
            background: #20A0FF;
        }
	}
    .wan{
        .sc(16px, #333)
    }
</style>
