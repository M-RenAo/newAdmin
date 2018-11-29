<template>
    <div class="content">
        <div class="moudel">
            <h2>banner部署:3张</h2>
            <div class="foot">
                <p class="details">1个应用   1个网页   1个排版</p>
                <el-button class="right" @click="goAdministration">管理</el-button>
            </div>
        </div>
         <div class="moudel">
            <h2>banner部署:3张</h2>
            <div class="foot">
                <p class="details">1个应用   1个网页   1个排版</p>
                <el-button class="right" @click="goAdministration">管理</el-button>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        methods: {
            goAdministration(){
                this.$router.push({
                    name: 'bannerDeploy',
                    query: {
                        row:'1'
                    }
                 })
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
