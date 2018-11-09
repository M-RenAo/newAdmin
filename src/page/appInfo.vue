<template>
    <div>
        <el-tabs v-model="activeName" style="margin:0px 20px;" >
            <el-tab-pane label="基本信息" name="first">
                <div v-if="activeName=='first'">
                    <el-row style="margin-top: 20px;">
                    <el-col :span="14" :offset="4">
                        <el-form :model="appForm" ref="appForm" label-width="110px" class="form food_form">
                            <div>
                                <div style="display: flex;margin-bottom: 20px;">
                                    <h4>应用版本：</h4>
                                    <div style="width:100px;height:100px;margin-left:10px;"><img :src="'https://imapp-image.oss-cn-hangzhou.aliyuncs.com/'+appForm.fileIcon"
                                                                                                 style="width:100px;height:100px;"/></div>
                                </div>
                                <el-form-item label="版本号：" prop="name">
                                    {{appForm.fileVersion}}
                                </el-form-item>
                                <el-form-item label="上传时间：" prop="name">
                                    {{appForm.fileDate}}
                                </el-form-item>
                                <!--<el-form-item label="历史版本：" prop="name">-->
                                <!--</el-form-item>-->

                            </div>
                            <div>
                                <div style="display: flex;margin-bottom: 20px;">
                                    <h4>应用信息：</h4>
                                </div>
                                <el-form-item label="应用名称：" prop="name">
                                    {{appForm.appName}}
                                </el-form-item>
                                <el-form-item label="应用分类：" prop="name">
                                    {{tagText}}
                                </el-form-item>
                                <el-form-item label="应用模块：" prop="name">
                                    {{positonTexts}}
                                </el-form-item>
                                <el-form-item label="应用简介：" prop="name">
                                {{appForm.fileSummary}}
                                </el-form-item>
                                <el-form-item label="应用描述：" prop="name">
                                    {{appForm.fileMessage}}
                                </el-form-item>
                                <el-form-item label="应用图标：" prop="name">
                                    <div style="width:100px;height:100px;"><img :src="'https://imapp-image.oss-cn-hangzhou.aliyuncs.com/'+appForm.fileIcon"
                                                                                style="width:100px;height:100px;"/></div>
                                </el-form-item>
                                <el-form-item label="应用图片：" prop="name">
                                    <div style="max-width:700px;height:auto;">
                                        <div style="width:200px;height:auto;margin-right: 10px;display: inline-block" v-for="(item,index) in  showList" v-if="item!=''" :key="index">
                                            <img :src=" 'https://imapp-image.oss-cn-hangzhou.aliyuncs.com/'+item"
                                                 style="width:200px;height:auto;"  @click="bigImg(index)"/>
                                        </div>
                                    </div>
                                </el-form-item>
                                <!--<el-form-item label="历史版本：" prop="name">-->
                                <!--</el-form-item>-->

                            </div>
                            <div>
                                <div style="display: flex;margin-bottom: 20px;">
                                    <h4>开发者信息：</h4>
                                </div>
                                <el-form-item label="联系人姓名：" prop="name">
                                    <!--{{appForm.fileSummary}}-->
                                </el-form-item>
                                <el-form-item label="电话号码：" prop="name">
                                    <!--{{appForm.fileTag}}-->
                                </el-form-item>
                                <!--<el-form-item label="历史版本：" prop="name">-->
                                <!--</el-form-item>-->

                            </div>
                            <div>
                                <div style="margin-bottom: 20px;">
                                    <h4>审核操作：<span style="    font-size: 14px;color: #48576a;font-weight:normal">{{checkStatus}}</span></h4>
                                </div>
                            </div>
                        </el-form>

                    </el-col>
                </el-row>
                </div>
            </el-tab-pane>
            <el-tab-pane label="安装、打开详情" name="second"><data-info v-if="activeName=='second'"></data-info></el-tab-pane>
        </el-tabs>
        <div class="imgMask" v-if="showBigImg" @click.stop="showBigImg=!showBigImg">
            <i class="prev el-icon-arrow-left" @click.stop="prev"></i>
            <div class="showImg">
                <img class="bigImg" :src="'https://imapp-image.oss-cn-hangzhou.aliyuncs.com/'+showList[num]">
            </div>
            <i class="next el-icon-arrow-right" @click.stop="next"></i>
        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import appBasicInfo from '../page/appBasicInfo'
    import dataInfo from '../page/dataInfo'
    import {userCount, orderCount, getUserCount, getOrderCount, adminDayCount, adminCount} from '@/api/getData'
    let moment=require('moment')
    export default {
        data(){
            return {
                activeName:'first',
                state:'',
                remarks:'',
                showBigImg: false,
                num:0,
                showList:[],
                appForm:{
                },
                checkStatus:'',
                value:'',
                positonText:[],
                positonTexts:'',
                tagText:'',
                tagList:[]
            }
        },
        components: {
           dataInfo

        },
        created(){
            this.$ajax.get(BaseUrl + "position/title",{headers: {'token': sessionStorage.getItem('token'),'device':this.$route.query.type}}).then(response => {
                if(response.data.flag==200){
                    this.positionList = response.data.data;
                }else if(response.data.flag==201) {
                    this.$alert(response.data.msg + '，请重新登录', '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$router.push('/')
                        }
                    });
                }

            });
            this.$ajax.get(BaseUrl+'apptag/all',{headers: {'token': sessionStorage.getItem('token'),'device':this.$route.query.type}}).then(response => {
                if(response.data.flag==200) {
                    this.tagList = response.data.data
                }else if(response.data.flag==201) {
                    this.$alert(response.data.msg + '，请重新登录', '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$router.push('/')
                        }
                    });
                }
                this.getData()
            })

        },
        computed: {

        },
        methods: {
            getData(){
                this.$ajax.get(BaseUrl+'apply/appmsg/'+this.$route.query.id,{headers: {'token': sessionStorage.getItem('token'),'device':this.$route.query.type}}).then(response => {
                    if(response.data.flag==200){
                        this.appForm=response.data.data
                    this.showList= this.appForm.fileShow.split(',');
                    if(this.$route.query.activeName==1){
                        this.checkStatus='审核通过'
                    }else{
                        this.checkStatus='审核未通过'
                    }
                    this.appForm.fileDate=moment.utc(this.appForm.fileDate).local().format('YYYY-MM-DD HH:mm:ss')
                    this.value=eval(this.appForm.fileDisplayPosition);
                    this.value.forEach(item=>{
                        this.positionList.forEach(nitem=>{
                            if(item==nitem.code){
                                console.log(item)
                                this.positonText.push(nitem.title);
                            }
                        })
                    })
                        this.tagList.forEach(item=>{
                            if(item.code== this.appForm.fileTag){
                                this.tagText=item.title
                            }
                        })
                        if(this.appForm.fileTag==0){
                            this.tagText='未定义'
                        }
                    this.positonTexts=this.positonText.join(' / ')
                    console.log( this.showList)
                    }else if(response.data.flag==201) {
                        this.$alert(response.data.msg + '，请重新登录', '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$router.push('/')
                            }
                        });
                    }
                })



            },
            bigImg(index) {
                this.showBigImg = true;
                this.num = index;
            },
            prev() {
                if (this.num == 0) {
                    this.num = this.showList.length
                }
                this.num--;
            },
            next() {
                if (this.num == this.showList.length - 1) {
                    this.num = -1;
                }
                this.num++;
            }
        }
    }
</script>

<style lang="less" >
    @import '../style/mixin';
    .table_container{
        padding: 20px;
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


    .imgMask {
        position: absolute;
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        z-index: 10000;
        background: rgba(0, 0, 0, .6);
    }

    .showImg {
        height: auto;
        width: 500px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        /*border:10px solid #fff;*/
        text-align: center;
    }

    .bigImg {
        width: 500px;
        height: auto;
    }

    .prev {
        position: absolute;
        top: 50%;
        left: 10px;
        width: 40px;
        height: 40px;
        color: #fff;
        transform: translate(10px, -50%);
    }

    .next {
        width: 40px;
        transform: translate(10px, -50%);
        position: absolute;
        top: 50%;
        right: 20px;
        height: 40px;
        color: #fff;
    }

</style>
