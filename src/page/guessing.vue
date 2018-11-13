<template>
    <div>
        <div class="btn">
            <el-button type="primary">新增</el-button>
        </div>
        <div class="guessType">
            <div style="overflow:hidden" class="img">
                <!-- <img :src="'https://imapp-image.oss-cn-hangzhou.aliyuncs.com/'+data.image" style="width:300px;height:150px;"> -->
                <img src="https://ss1.baidu.com/-4o3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=c7020a599f45d688bc02b4a494c37dab/4b90f603738da9773ded4541bd51f8198718e39e.jpg" style="width:300px;height:150px;">
            </div>
            <div class="play">
                <h3>玩法:猜涨跌</h3>
                <p style="margin-top:70px">往期记录：123期</p>
                <p>开奖时间：每日18：00</p>
            </div>
            <div class="btns">
                <el-button @click="goEdit">编辑</el-button>
                <el-button>查看</el-button>
            </div>
        </div>
        <div class="guessType">
            <div style="overflow:hidden" class="img">
                <!-- <img :src="'https://imapp-image.oss-cn-hangzhou.aliyuncs.com/'+data.image" style="width:300px;height:150px;"> -->
                <img src="https://ss1.baidu.com/-4o3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=c7020a599f45d688bc02b4a494c37dab/4b90f603738da9773ded4541bd51f8198718e39e.jpg" style="width:300px;height:150px;">
            </div>
            <div class="play">
                <h3>玩法:猜涨跌</h3>
                <p style="margin-top:70px">往期记录：123期</p>
                <p>开奖时间：每日18：00</p>
            </div>
            <div class="btns">
                <el-button @click="goEdit">编辑</el-button>
                <el-button>查看</el-button>
            </div>
        </div>
        <div class="guessType">
            <div style="overflow:hidden" class="img">
                <!-- <img :src="'https://imapp-image.oss-cn-hangzhou.aliyuncs.com/'+data.image" style="width:300px;height:150px;"> -->
                <img src="https://ss1.baidu.com/-4o3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=c7020a599f45d688bc02b4a494c37dab/4b90f603738da9773ded4541bd51f8198718e39e.jpg" style="width:300px;height:150px;">
            </div>
            <div class="play">
                <h3>玩法:猜涨跌</h3>
                <p style="margin-top:70px">往期记录：123期</p>
                <p>开奖时间：每日18：00</p>
            </div>
            <div class="btns">
                <el-button @click="goEdit">编辑</el-button>
                <el-button>查看</el-button>
            </div>
        </div>
    </div>
</template>
<script>
    import { baseUrl, baseImgPath } from "@/config/env";
    let moment=require('moment')
    export default {
    data() {
      return {
          data:{},//数据
      };
    },
    created() {

        },
    methods: {
        goEdit(){//前往编辑界面
            this.$router.push({path:'/guessingEdit'}) 
        }
    }
  };
</script>
<style lang="less" >
    @import "../style/mixin";
    .btn{
        margin:20px 0 20px 20px
    }
    .guessType{
        padding:20px;
        margin:20px 20px 0 10px;
        border:1px solid #000;
        overflow: hidden;
    }
    .img,.play{
        float: left;
    }
    .play{
        margin-left:20px;
        p{
            color: #333;
            font-size: 14px;
            line-height: 25px
        }
    }
    .btns{
        float: right;
        margin-top:110px
    }
</style>

