<template>
    <div>
        <el-row style="margin-top: 20px;">
            <el-col :span="20" style="margin: 40px">
                <el-form :model="focusInfo" ref="focusInfo" label-width="110px" class="form food_form">
                    <div>
                        <el-form-item label="焦点图标题：" prop="name">
                            {{focusInfo.title}}
                        </el-form-item>
                        <el-form-item label="焦点图图片：" prop="name">
                            <img :src="'https://imapp-image.oss-cn-hangzhou.aliyuncs.com/'+focusInfo.picAddr"
                                 style="width:100px;height:auto">
                        </el-form-item>
                        <el-form-item label="类型：" prop="name">
                            {{focusInfo.typeText}}
                        </el-form-item>
                        <el-form-item label="图文详情：" prop="name" v-if="focusInfo.type==1">
                            <div v-html="focusInfo.text">{{focusInfo.text}}</div>
                        </el-form-item>
                        <el-form-item label="APP名称：" prop="name" v-if="focusInfo.type==2">
                            {{focusInfo.toItem.appName}}
                        </el-form-item>
                        <el-form-item label="跳转地址：" prop="name" v-if="focusInfo.type==3">
                            {{focusInfo.toItemId}}
                        </el-form-item>
                        <el-form-item label="起止时间：" prop="name">
                            {{focusInfo.startTime}}~{{focusInfo.endTime}}
                        </el-form-item>
                    </div>
                </el-form>
            </el-col>
        </el-row>
    </div>

</template>

<script>
    import {getCategory, addCategory, addFood} from "@/api/getData";
    import {baseUrl, baseImgPath} from "@/config/env";

    let moment = require('moment');
    export default {
        data() {
            return {
                focusInfo: {},
            };
        },
        created() {
            this.$ajax.get(BaseUrl + 'banner/' + this.$route.query.id,
                {headers: {'token': sessionStorage.getItem('token'), 'device': this.$route.query.type}}
            ).then(response => {
                if (response.data.flag == 200) {
                    this.focusInfo = response.data.data;
                    if (this.focusInfo.type == '1') {
                        this.focusInfo.typeText = '图文详情'
                    } else if (this.focusInfo.type == '2') {
                        this.focusInfo.typeText = '推广APP '
                    } else if (this.focusInfo.type == '3') {
                        this.focusInfo.typeText = '跳转链接'
                    }
                    this.focusInfo.startTime = moment.utc(this.focusInfo.startTime).local().format('YYYY-MM-DD HH:mm:ss');
                    this.focusInfo.endTime = moment.utc(this.focusInfo.endTime).local().format('YYYY-MM-DD HH:mm:ss');
                } else if (response.data.flag == 201) {
                    this.$alert(response.data.msg + '，请重新登录', '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$router.push('/')
                        }
                    });
                } else {
                    this.$alert(response.data.msg, '提示', {
                        confirmButtonText: '确定',
                    });
                }
            })
        },
        computed: {},
        methods: {},

    };
</script>

<style lang="less" scoped>
    @import "../style/mixin";


</style>
