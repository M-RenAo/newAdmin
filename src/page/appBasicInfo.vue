<template>
    <div>
        <el-row style="margin-top: 20px;">
            <el-col :span="14" :offset="4">
                <el-form :model="appForm" ref="appForm" label-width="110px" class="form food_form">
                    <div>
                        <div style="display: flex;margin-bottom: 20px;">
                            <h4>应用版本：</h4>
                            <div style="width:100px;height:100px;margin-left:10px;"><img
                                :src="'https://imapp-image.oss-cn-hangzhou.aliyuncs.com/'+appForm.fileIcon"
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
                            {{positonTexts}}
                        </el-form-item>
                        <el-form-item label="应用模块：" prop="name">
                            {{positonTexts}}
                        </el-form-item>
                        <!--<el-form-item label="应用简介：" prop="name">-->
                        <!--{{appForm.summary}}-->
                        <!--</el-form-item>-->
                        <el-form-item label="应用描述：" prop="name">
                            {{appForm.fileMessage}}
                        </el-form-item>
                        <el-form-item label="应用图标：" prop="name">
                            <div style="width:100px;height:100px;"><img
                                :src="'https://imapp-image.oss-cn-hangzhou.aliyuncs.com/'+appForm.fileIcon"
                                style="width:100px;height:100px;"/></div>
                        </el-form-item>
                        <el-form-item label="应用图片：" prop="name">
                            <div style="max-width:700px;height:auto;">
                                <div style="width:200px;height:auto;margin-right: 10px;display: inline-block"
                                     v-for="(item,index) in  showList" v-if="item!=''" :key="index">
                                    <img :src=" 'https://imapp-image.oss-cn-hangzhou.aliyuncs.com/'+item"
                                         style="width:200px;height:auto;" @click="bigImg(index)"/>
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
                            {{appForm.fileSummary}}
                        </el-form-item>
                        <el-form-item label="电话号码：" prop="name">
                            {{appForm.fileTag}}
                        </el-form-item>
                        <!--<el-form-item label="历史版本：" prop="name">-->
                        <!--</el-form-item>-->

                    </div>
                    <div>
                        <div style="margin-bottom: 20px;">
                            <h4>审核操作：<span
                                style="    font-size: 14px;color: #48576a;font-weight:normal">{{checkStatus}}</span>
                            </h4>
                        </div>
                    </div>
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

    export default {
        data() {
            return {
                state: '',
                remarks: '',
                showBigImg: false,
                num: 0,
                showList: [],
                appForm: {},
                checkStatus: '',
                value: '',
                positonText: [],
                positonTexts: '',
                fileTagText: ''
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
            getData() {
                this.$ajax.get(BaseUrl + 'apply/appmsg/' + this.$route.query.id, {
                    headers: {
                        'token': sessionStorage.getItem('token'),
                        'device': this.$route.query.type
                    }
                }).then(response => {
                    if (response.data.flag == 200) {
                        this.appForm = response.data.data
                        this.showList = this.appForm.fileShow.split(',');
                        if (this.$route.query.activeName == 1) {
                            this.checkStatus = '审核通过'
                        } else {
                            this.checkStatus = '审核未通过'
                        }
                        this.value = eval(this.appForm.fileDisplayPosition);
                        var position = JSON.parse(sessionStorage.getItem('positionList'));
                        this.value.forEach(item => {
                            position.forEach(nitem => {
                                if (item == nitem.code) {
                                    // console.log(item)
                                    this.positonText.push(nitem.title);
                                }
                            })
                        })
                        this.fileTagText =
                            this.positonTexts = this.positonText.join(' / ')
                        // console.log( this.showList)
                    } else if (response.data.flag == 201) {
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
        },

    };
</script>

<style lang="less" scoped>
    @import "../style/mixin";


</style>
