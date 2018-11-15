<template>
    <div>
        <div class="btn">
            <el-button type="primary" @click="goEdit">新增</el-button>
        </div>
        <div class="guessType" v-for="(data,index) in datas" :key="index">
            <div style="overflow:hidden" class="img">
                <img :src="'https://imapp-image.oss-cn-hangzhou.aliyuncs.com/'+data.image" style="width:300px;height:150px;">
            </div>
            <div class="play">
                <h3>玩法:{{data.title}}</h3>
                <p style="margin-top:70px">往期记录：123期</p>
                <p>开奖时间：{{data.round}}&nbsp;&nbsp;{{data.etime}}</p>
            </div>
            <div class="btns">
                <el-button @click="goEdit(data)">编辑</el-button>
                <el-button @click="goRecord">查看</el-button>
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
          datas:[],//数据
          str:"",
          arrDate:[],
      };
    },
    created(){
        
        this.$ajax({
                method: "POST",
                url: BaseUrl+'guess/findStyle',
                data:{},
                headers: {'token': sessionStorage.getItem('token')}
             }).then(res=>{
                res.data.data.data.forEach(item=>{
                                    if(item.round!=undefined&&item.round.length>7){
                                        item.round=item.round
                                    }else if(item.round!=undefined&&item.round.length==7){
                                        item.round="每日"
                                    }else if(item.round!=undefined&&item.round.length<7&&item.round.length>0){
                                        this.dateCheng(item.round)
                                        item.round=this.arrDate.join(",")
                                    }
                                    
                        })
                this.datas=res.data.data.data
                // this.datas.forEach(item=>{
                //                     if(item.round!=undefined&&item.round.length>7){
                //                         item.round=item.round
                //                     }else if(item.round!=undefined&&item.round.length==7){
                //                         item.round="每日"
                //                     }else if(item.round!=undefined&&item.round.length<7&&item.round.length>0){
                //                         this.dateCheng(item.round)
                //                         item.round=this.arrDate
                //                     }
                                    
                //         })
                console.log(this.datas)              
            })
        },
    methods: {
        goEdit(data){//前往编辑界面
            // this.$router.push({path:'/guessingEdit'}) 
            this.$router.push({
                    name: 'guessingEdit',
                    params: {
                        row:data
                    }
                })
        },
        goRecord(){//前往查看界面
            this.$router.push({path:'/guessingRecord'}) 
        },
        dateCheng(round){
            this.arrDate=[];
            var arr=round.split('');
            var len=arr.length
            for(var i=0;i<len;i++){
                    if(arr[i]=="1"){
                         this.arrDate.push("星期一");
                    }else if(arr[i]=="2"){
                         this.arrDate.push("星期二");
                    }else if(arr[i]=="3"){
                         this.arrDate.push("星期三");
                    }else if(arr[i]=="4"){
                         this.arrDate.push("星期四");
                    }else if(arr[i]=="5"){
                         this.arrDate.push("星期五");
                    }else if(arr[i]=="6"){
                         this.arrDate.push("星期六");
                    }else if(arr[i]=="0"){
                         this.arrDate.push("星期日");
                    }
                }
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

