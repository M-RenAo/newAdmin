<template>
    <div>
        <div style="margin:20px;border: 1px solid #eaeefb;font-size: 14px;color:#1f2d3d">
            <el-row type="flex" class="row-bg">
                <el-col :span="6">
                    <div style="display: flex;align-items: center;">
                        <span>头像：</span><img :src="'https://imapp-image.oss-cn-hangzhou.aliyuncs.com/'+userForm.headPic"
                                             style="height:30px; width:30px;display: inline-block;margin-left:10px;"
                                             v-if="userForm.headPic!=undefined">
                    </div>
                </el-col>
                <el-col :span="6">
                    <div style="display: flex;align-items: center;">
                        <span>昵称：</span><span>{{userForm.userNickName}}</span>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div style="display: flex;align-items: center;">
                        <span>手机号：</span><span
                        style="display: inline-block;margin-left:10px;">{{userForm.userPhone}}</span>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div style="display: flex;align-items: center;">
                        <span>ID：</span><span
                        style="display: inline-block;margin-left:10px; word-wrap:break-word; min-width:150px;">{{userForm.userId}}</span>
                    </div>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg">
                <el-col :span="6">
                    <div style="display: flex;align-items: center;">
                        <span>姓名：</span><span style="display: inline-block;margin-left:10px;">{{userForm.name}}</span>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div style="display: flex;align-items: center;">
                        <span>身份证号：</span><span>{{userForm.cardId}}</span>
                    </div>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg">
                <el-col :span="12">
                    <div style="display: flex;align-items: center;">
                        <span>最近登录时间：</span><span
                        style="display: inline-block;margin-left:10px;">{{userForm.loginTime}}</span>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div style="display: flex;align-items: center;">
                        <span>第一次登录时间：</span><span style="display: inline-block;margin-left:10px;">{{userForm.firstLoginDate}}</span>
                    </div>
                </el-col>

            </el-row>
            <!--<div style="padding: 0 20px;display: flex;height:80px;align-items: center;">-->
            <!--<div style="display: flex;align-items: center;">-->
            <!--<span>头像：</span><img src="1111111" style="height:20px; width:20px;display: inline-block;margin-left:10px;">-->
            <!--</div>-->
            <!--<div style="display: flex;align-items: center;width:300px;">-->
            <!--<span>昵称：</span><span>小猪</span>-->
            <!--</div>-->
            <!--<div style="display: flex;align-items: center;width:250px;">-->
            <!--<span>手机号：</span><span style="display: inline-block;margin-left:10px;">123141261826</span>-->
            <!--</div>-->
            <!--<div style="display: flex;align-items: center;width:200px;">-->
            <!--<span>人脸识别：</span><span style="display: inline-block;margin-left:10px;">已验证</span>-->
            <!--</div>-->
            <!--</div>-->
            <!--<div style="padding: 0 20px;display: flex;height:80px;align-items: center;">-->
            <!--<div style="display: flex;align-items: center;width:200px;">-->
            <!--<span>姓名：</span><span style="display: inline-block;margin-left:10px;">哒哒哒</span>-->
            <!--</div>-->
            <!--<div style="display: flex;align-items: center;width:300px;">-->
            <!--<span>身份证号：</span><span>130681199508281028</span>-->
            <!--</div>-->
            <!--<div style="display: flex;align-items: center;width:200px;">-->
            <!--<span>人脸识别：</span><span style="display: inline-block;margin-left:10px;">已验证</span>-->
            <!--</div>-->
            <!--</div>-->
            <!--<div style="padding: 0 20px;display: flex;height:80px;align-items: center;">-->
            <!--<div style="display: flex;align-items: center;width:500px;">-->
            <!--<span>最近登录时间：</span><span style="display: inline-block;margin-left:10px;">2018-08-01 12:10</span>-->
            <!--</div>-->
            <!--<div style="display: flex;align-items: center;">-->
            <!--<span>第一次登录时间：</span><span style="display: inline-block;margin-left:10px;">2018-08-01 12:10</span>-->
            <!--</div>-->
            <!--</div>-->

        </div>
    </div>

</template>

<script>
    import {getCategory, addCategory, addFood} from "@/api/getData";
    import {baseUrl, baseImgPath} from "@/config/env";
    import Vue from "vue";

    export default {
        data() {
            return {
                userForm: {},
                userlist: ''
            };
        },
        components: {},
        created() {
            this.userlist = JSON.parse(sessionStorage.getItem('userList'))
            this.userlist.forEach(item => {
                if (this.$route.query.id == item.userId) {
                    this.userForm = item;
                }
            })
        },
        computed: {},
        methods: {},

    };
</script>

<style lang="less" scoped>
    @import "../style/mixin";

    .row-bg {
        padding: 20px 20px;
        display: flex;
        height: 80px;
        align-items: center;
    }
</style>
