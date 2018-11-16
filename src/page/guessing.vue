<template>
    <div>
        <div class="btn">
            <el-button type="primary" @click="goEdit(1)">新增</el-button>
        </div>
        <div class="tabs">
            <el-tabs v-model="tabsName" @tab-click="tabsClick">
                <el-tab-pane label="全部" name="1"></el-tab-pane>
                <el-tab-pane label="进行中" name="2"></el-tab-pane>
                <el-tab-pane label="已关闭" name="3"></el-tab-pane>
            </el-tabs>
        </div>
        <div class="guessType" v-for="(data,index) in datas" :key="index">
            <div style="overflow:hidden" class="img">
                <img :src="'https://imapp-image.oss-cn-hangzhou.aliyuncs.com/'+data.image" style="width:300px;height:150px;">
            </div>
            <div class="play">
                <h3>玩法:{{data.title}}</h3>
                <p style="margin-top:30px">{{data.state}}</p>
                <p style="margin-top:10px">往期记录：123期</p>
                <p style="margin-top:10px">开奖时间：{{data.round}}&nbsp;&nbsp;{{data.etime}}</p>
            </div>
            <div class="btns">
                <el-button @click="goEdit(data)">编辑</el-button>
                <el-button @click="goRecord(data)">查看</el-button>
            </div>
        </div>
        <!-- <div class="Pagination">
                 <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[3,6,10,20]"
                    :page-size="nowPageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="guesscount">
                </el-pagination>
        </div> -->
        <div>
            <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%">
                <span>玩法已有三种，目前不能新建</span>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>
<script>
    import { baseUrl, baseImgPath } from "@/config/env";
    let moment=require('moment')
    export default {
    data() {
      return {
          dialogVisible:false,
          datas:[],//数据
          str:[],
          arrDate:[],
          arrType:[],
          tabsName:"1",
          guesscount: 0,
          currentPage: 1,
          nowPageSize: 3,
          switch:false,//开关
          arrIng:[],//进行中
          colseArr:[],//已关闭
      };
    },
    created(){
        this.getData()
        },
    methods: {
        tabsClick(){//tabs选项
            if(this.tabsName==1){
                this.getData()
            }else if(this.tabsName==2){
                this.datas=this.arrIng
            }else if(this.tabsName==3){
                this.datas=this.colseArr
            }
        },
        goEdit(data){//前往编辑界面
            // this.$router.push({path:'/guessingEdit'}) 
            
                if(this.switch){
                    console.log(1)
                    if(data!==1){
                        let dataId=data.id
                        this.$router.push({
                            name: 'guessingEdit',
                            query: {
                                dataId:dataId,
                                currentPage:this.currentPage,
                                nowPageSize:this.nowPageSize
                            }
                        })
                    }else{
                        if(this.str.length>=3){
                            this.dialogVisible = true
                        }else{
                            this.$router.push({
                            name: 'guessingEdit',
                            query: {
                                row:this.str
                            }
                            })
                        }
                        
                    }
            
            
                }
            
        },
        goRecord(data){//前往查看界面
            // this.$router.push({path:'/guessingRecord'}) 
            this.$router.push({
                            name: 'guessingRecord',
                            query: {
                                guessType:data.type
                            }
                            })
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
        },
        getData(){
            this.$ajax({
                method: "POST",
                url: BaseUrl+'guess/findStyle',
                data:{
                    page:"1",
                    size:"100"
                },
                headers: {'token': sessionStorage.getItem('token')}
             }).then(res=>{
                 console.log(res.data.data.data)
                 this.colseArr=[];
                 this.arrIng=[];
                res.data.data.data.forEach(item=>{
                                    if(item.round!=undefined&&item.round.length>7){
                                        item.round=item.round
                                    }else if(item.round!=undefined&&item.round.length==7){
                                        item.round="每日"
                                    }else if(item.round!=undefined&&item.round.length<7&&item.round.length>0){
                                        this.dateCheng(item.round)
                                        item.round=this.arrDate.join(",")
                                    }
                                    if(item.type!=undefined){
                                        this.str.push(item.type+"")
                                    }
                                    if(item.state==1){
                                        item.state="进行中"
                                        this.arrIng.push(item)
                                    }else if(item.state==0){
                                        item.state="已关闭"
                                        this.colseArr.push(item)
                                    }
                        })
                        
                this.datas=res.data.data.data    
                this.guesscount=res.data.data.count    
                this.switch=true
            })
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
        margin:0 20px 20px 10px;
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
    .tabs{
        margin-left:10px;
        width:200px
    }
    .Pagination{
        margin-left:10px;
    }
</style>

