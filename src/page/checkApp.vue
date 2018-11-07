<template>
    <div>
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
                            {{appForm.fileTag}}
                        </el-form-item>
                        <el-form-item label="应用简介：" prop="name">
                            {{appForm.fileSummary}}
                        </el-form-item>
                        <el-form-item label="应用描述：" prop="name">
                            {{appForm.fileMessage}}
                        </el-form-item>
                        <!--<el-form-item label="下载地址：" prop="name">-->
                            <!--{{appForm.fileDir}}-->
                        <!--</el-form-item>-->
                        <!--<el-form-item label="包名：" prop="name">-->
                            <!--{{appForm.packageName}}-->
                        <!--</el-form-item>-->
                        <el-form-item label="应用图标：" prop="name">
                            <div style="width:100px;height:100px;"><img :src="'https://imapp-image.oss-cn-hangzhou.aliyuncs.com/'+appForm.fileIcon"
                                                                        style="width:100px;height:100px;"/></div>
                        </el-form-item>
                        <el-form-item label="应用图片：" prop="name">
                            <div style="max-width:700px;height:auto;">
                            <div style="width:200px;height:auto;margin-right: 10px;display: inline-block" v-for="(item,index) in  showList" >
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

                        </el-form-item>
                        <el-form-item label="电话号码：" prop="name">

                        </el-form-item>
                        <!--<el-form-item label="历史版本：" prop="name">-->
                        <!--</el-form-item>-->

                    </div>
                    <div>
                        <div style="margin-bottom: 20px;">
                            <h4>审核操作：</h4>
                        </div>
                        <el-form-item label="审核：" prop="name">
                            <el-select v-model="state" placeholder="请选择">
                                <el-option
                                    label="审核通过"
                                    value="1">
                                </el-option>
                                <el-option
                                    label="审核不通过"
                                    value="0">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="原因：" prop="name"  :rules="{required: true, message: '不能为空', trigger: 'blur'}" v-if="state==='0'">
                            <el-input
                                type="textarea"
                                :rows="2"
                                placeholder="请输入内容"
                                v-model="remarks">
                            </el-input>
                        </el-form-item>
                    </div>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm(state)">提交</el-button>
                    </el-form-item>
                </el-form>

            </el-col>
        </el-row>
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
    import headTop from "@/components/headTop";
    import {getCategory, addCategory, addFood} from "@/api/getData";
    import {baseUrl, baseImgPath} from "@/config/env";
    import Vue from "vue";
    let moment=require('moment')
    export default {
        data() {
            return {
                state:'',
                remarks:'',
                showBigImg: false,
                num:0,
                showList:[],
                appForm:{
                },
            };
        },
        components: {
            headTop
        },
        created() {
            this.getData()
        },
        computed: {},
        methods: {
            getData(){
                this.$ajax.get(BaseUrl+'apply/appmsg/'+this.$route.query.id,{headers: {'token': sessionStorage.getItem('token'), 'device':this.$route.query.type}}).then(response => {
                    if(response.data.flag==200){
                        this.appForm=response.data.data
                    this.showList= this.appForm.fileShow.split(',');
                    this.appForm.fileDate=moment.utc(this.appForm.fileDate).local().format('YYYY-MM-DD HH:mm:ss')
                    // console.log( this.showList)
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
            submitForm(){
                this.$ajax({
                    method: "POST",
                    url:BaseUrl+'apply/audit',
                    data: {
                        id:this.$route.query.id,
                        state:this.state,
                        remarks:this.remarks

                    },
                    headers: {
                        'token': sessionStorage.getItem('token'),
                        'device':this.$route.query.type
                    }
                }).then(response => {
                    // console.log(response);
                    if(response.data.flag==500){
                        this.$alert(response.data.msg, '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$message({
                                    type: 'info',
                                    message: `error: ${ response.data.msg }`
                                });
                            }
                        });
                    }else if(response.data.flag==200){
                        this.$alert(response.data.msg, '提示', {
                            confirmButtonText: '确定',
                            callback:action=>{
                                if(this.$route.query.type=='android'){
                                    this.$router.push({path:'/applicationList',query:{page:this.$route.query.page,size:this.$route.query.size,active:0}})
                                }else if(this.$route.query.type=='ios'){
                                    this.$router.push({path:'/iosList',query:{page:this.$route.query.page,size:this.$route.query.size,active:0}})                                }

                            }
                        });
                    }else if(response.data.flag==201) {
                        this.$alert(response.data.msg + '，请重新登录', '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$router.push('/')
                            }
                        });
                    }
                });
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
        },

    };
</script>

<style lang="less" scoped>
    @import "../style/mixin";


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

    .delete {
    position: absolute;
    top: 0;
    right: 0px;
    width: 40px;
    height: 40px;
    color: #8c939d;
    text-align: center;
    font-size: 18px;
    /*transform:translate(10px,-50%);*/
    }
</style>
