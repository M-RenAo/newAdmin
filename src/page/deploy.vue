<template>
    <div class="content">
        <div class="moudel">
            <h2>banner部署:3张</h2>
            <div class="foot">
                <p class="details">1个应用   1个网页   1个排版</p>
                <el-button class="right" @click="goAdministration(1)">管理</el-button>
            </div>
        </div>
         <div class="moudel">
            <h2>启动页部署</h2>
            <div class="foot">
                <p class="details">京东推广,腾讯,阿里</p>
                <el-button class="right" @click="goAdministration(2)">管理</el-button>
            </div>
        </div>
        <div class="moudel">
            <h2>弹窗部署</h2>
            <div class="foot">
                <p class="details"></p>
                <el-button class="right" @click="goAdministration(3)">管理</el-button>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        methods: {
            goAdministration(num){
                if(num==1){
                    this.$router.push({
                        name: 'bannerDeploy',
                        query: {
                            page:1,
                            size:10,
                            active:'1'
                        }
                    })
                } else if(num==2){
                    this.$router.push({
                        name: 'startupPage',
                        query: {
                            row:'1'
                        }
                    })
                }else if(num==3){
                    this.$router.push({
                        name: 'popupDeploy',
                    })
                }
            },
        },
    }
</script>
<style lang="less" scoped>
    .content{
        padding: 50px 20px;
        .moudel{
            width: 80%;
            border: 1px solid #000;
            padding:15px;
            margin-bottom: 20px;
            .foot{
                margin-top: 15px;
                overflow: hidden;
                .details{
                    float: left;
                    // line-height: 40px;
                    font-size: 15px;
                    margin-top:18px
                }
            }
        }
    }
</style>
