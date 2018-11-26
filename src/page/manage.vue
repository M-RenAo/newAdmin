<template>
	<div class="manage_page fillcontain">
		<el-container style="height: 100%;">
	  		<el-aside width="200px"  style="min-height: 100%; background-color: #324057;">
                <div class="" style="height: 56px;line-height: 56px;color:#edf7ff;position: fixed;z-index:100;width:200px;background-color: #324057;text-align:center"><span style="color:#409EFF;font-style:italic;font-size: 20px">imApp</span> 管理平台</div>
				<el-menu :default-active="defaultActive" style="min-height: 90%;border:0;margin-top: 56px;" background-color="#324057" text-color="#909399" router>
                    <el-submenu index="'1c'">
                        <template slot="title"><i class="el-icon-document"></i>数据概览</template>
                        <el-menu-item index="manage">首页</el-menu-item>
                        <el-menu-item index="iaHomeData">IA数据</el-menu-item>
                        <!--<el-submenu index="1-1">-->
                            <!--<span slot="title">应用数据</span>-->
                            <!--<el-menu-item index="appHomeData">android数据</el-menu-item>-->
                            <!--<el-menu-item index="iosHomeData">ios数据</el-menu-item>-->
                        <!--</el-submenu>-->
                        <el-menu-item index="activityData">活动数据</el-menu-item>
                        <!--<el-menu-item index="chainWallet">链城钱包</el-menu-item>-->
                        <!--<el-menu-item index="unapplicationList">平台收益</el-menu-item>-->
                    </el-submenu>
                    <el-submenu index="'2c'">
                        <template slot="title"><i class="el-icon-document"></i>资产管理</template>
                        <el-menu-item index="iaBcdChange">BCD提取</el-menu-item>
                        <el-menu-item index="iaData">总资产账户</el-menu-item>
                        <el-menu-item index="platformEarn">平台收益账户</el-menu-item>
                        <el-menu-item index="quizzesAccount">竞猜账户</el-menu-item>
                        <!--<el-menu-item index="userIA">用户ImAPP钱包</el-menu-item>-->
                        <el-menu-item index="setDig">挖矿设置</el-menu-item>
                    </el-submenu>
					<el-submenu index="'3c'">
						<template slot="title"><i class="el-icon-document"></i>应用管理</template>
                        <el-submenu index="3-1">
                            <span slot="title">应用列表</span>
                            <el-menu-item index="applicationList">android列表</el-menu-item>
                            <el-menu-item index="iosList">ios列表</el-menu-item>
                        </el-submenu>
						<!--<el-menu-item index="applicationList">应用列表</el-menu-item>-->
                        <!--<el-menu-item index="applicationTag">应用分类</el-menu-item>-->
                        <el-submenu index="3-2">
                            <span slot="title">应用分类</span>
                            <el-menu-item index="applicationTag">android分类</el-menu-item>
                            <el-menu-item index="iosTag">ios分类</el-menu-item>
                        </el-submenu>
                        <el-submenu index="3-3">
                            <span slot="title">应用模块</span>
                            <el-menu-item index="applicationModule">android模块</el-menu-item>
                            <el-menu-item index="iosModule">ios模块</el-menu-item>
                        </el-submenu>
                        <el-submenu index="3-4">
                            <span slot="title">排行榜</span>
                            <el-menu-item index="downloadList">android排行榜</el-menu-item>
                            <el-menu-item index="iosDownloadList">ios排行榜</el-menu-item>
                        </el-submenu>
                        <!--<el-menu-item index="downloadList">排行榜</el-menu-item>-->
                        <!--<el-menu-item index="appSort">应用排序</el-menu-item>-->
                        <el-menu-item index="checkList">应用审核</el-menu-item>
					</el-submenu>
                    <!--<el-submenu index="'4c'">-->
                        <!--<template slot="title"><i class="el-icon-document"></i>自选管理</template>-->
                        <!--&lt;!&ndash;<el-menu-item index="quizList">竞猜管理</el-menu-item>&ndash;&gt;-->
                        <!--&lt;!&ndash;<el-menu-item index="agreementList">小协议</el-menu-item>&ndash;&gt;-->
                        <!--&lt;!&ndash;<el-menu-item index="guessing">竞猜管理</el-menu-item>&ndash;&gt;-->
                    <!--</el-submenu>-->
                    <!--<div v-for="item in items">-->
                        <!--<template v-if="item.subs">-->
                            <!--<el-submenu :index="item.index" :key="item.index">-->
                                <!--<template slot="title">-->
                                    <!--<i ></i><span slot="title">{{ item.title }}</span>-->
                                <!--</template>-->
                                <!--<el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">-->
                                    <!--{{ subItem.title }}-->
                                <!--</el-menu-item>-->
                            <!--</el-submenu>-->
                        <!--</template>-->
                        <!--<template v-else>-->
                            <!--<el-menu-item :index="item.index" :key="item.index">-->
                                <!--<i></i><span slot="title">{{ item.title }}</span>-->
                            <!--</el-menu-item>-->
                        <!--</template>-->
                    <!--</div>-->
					<el-submenu index="'5c'">
						<template slot="title"><i class="el-icon-setting"></i>通用中心</template>
                        <el-submenu index="5-1">
                            <span slot="title">焦点图管理</span>
                            <el-menu-item index="focusImg">android焦点图</el-menu-item>
                            <el-menu-item index="iosFocusImg">ios焦点图</el-menu-item>
                        </el-submenu>
						<el-menu-item index="pushMessage">公告管理</el-menu-item>
                        <el-menu-item index="trumpet">小号</el-menu-item>
                        <!--<el-menu-item index="newList">快讯列表</el-menu-item>-->
                        <el-menu-item index="blackList">黑白名单</el-menu-item>
                        <el-menu-item index="messageManagement">快讯管理</el-menu-item>
                        <el-menu-item index="dappList">dapp部署</el-menu-item>
                        <el-menu-item index="guessing">竞猜管理</el-menu-item>
					</el-submenu>
					<el-submenu index="'6c'">
						<template slot="title"><i class="el-icon-star-on"></i>用户信息</template>
                        <el-menu-item index="userList">用户列表</el-menu-item>
                        <el-menu-item index="realName">实名认证</el-menu-item>
                        <el-menu-item index="userBack">用户反馈</el-menu-item>
					</el-submenu>
					<!--<el-submenu index="5">-->
						<!--<template slot="title"><i class="el-icon-edit"></i>编辑</template>-->
						<!--&lt;!&ndash; <el-menu-item index="uploadImg">上传图片</el-menu-item> &ndash;&gt;-->
						<!--<el-menu-item index="vueEdit">文本编辑</el-menu-item>-->
					<!--</el-submenu>-->
					<!--<el-submenu index="3">-->
						<!--<template slot="title"><i class="el-icon-setting"></i>设置</template>-->
						<!--<el-menu-item index="adminSet">管理员设置</el-menu-item>-->
						<!--&lt;!&ndash; <el-menu-item index="sendMessage">发送通知</el-menu-item> &ndash;&gt;-->
					<!--</el-submenu>-->
					<el-submenu index="'7c'">
						<template slot="title"><i class="el-icon-setting"></i>账号管理</template>
                        <el-menu-item index="adminList" v-if="adminType=='ADMIN'">管理员列表</el-menu-item>
                        <el-menu-item index="adminSet">修改密码</el-menu-item>
					</el-submenu>
                    <el-menu-item index="systemServices">
                        <i class="el-icon-setting"></i>
                        <span slot="title">系统服务</span>
                    </el-menu-item>
				</el-menu>
			</el-aside>
			<el-container>
                <el-header><head-top></head-top></el-header>
				<el-main  style="margin-top: 50px"><router-view></router-view></el-main>
			</el-container>
		</el-container>
  	</div>
</template>

<script>
    import headTop from "@/components/headTop";
    export default {
        data(){
           return{
               adminType:sessionStorage.getItem('adminType')
           }
        },
		computed: {
			defaultActive: function(){
                // console.log()
                // if(this.$route.path!='/applicationList'&&this.$route.path!='/updateApp'){
			     //     sessionStorage.removeItem('flag');
                //      sessionStorage.removeItem('fileTagUnchoice');
                // }else if(this.$route.path!='/iosList'){
                //     sessionStorage.removeItem('flagios');
                //     sessionStorage.removeItem('fileTagios');
                // }
				return this.$route.path.replace('/', '');
			}
		},
        components:{
            headTop
        },
        mounted(){

		    if(sessionStorage.getItem('token')==undefined){
		        this.$router.push('/')
		       return
            }
        }
    }
</script>


<style lang="less" scoped>
	@import '../style/mixin';
    .el-submenu .el-menu-item{
        min-width: 0px!important;
    }
    .el-header{
        padding: 0!important;
    }
    .el-main{
        padding :0!important;
        margin-top: 0!important;
    }
</style>
