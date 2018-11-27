<template>
    <div>
        <el-row style="margin-top: 20px;">
            <el-col :span="20" style="margin: 40px">
                <el-form :model="messInfo" ref="messInfo" label-width="110px" class="form food_form">
                    <div>
                        <el-form-item label="推送标题：" prop="name">
                            {{messInfo.title}}
                        </el-form-item>
                        <!--<el-form-item label="焦点图图片：" prop="name">-->
                        <!--<img :src="'https://hug-image.oss-cn-hangzhou.aliyuncs.com/'+focusInfo.picAddr" style="width:100px;height:auto">-->
                        <!--</el-form-item>-->
                        <el-form-item label="推送内容：" prop="name">
                            <div v-html="messInfo.message">{{messInfo.message}}</div>
                        </el-form-item>
                        <el-form-item label="推送时间：" prop="name">
                            {{messInfo.pushDate}}
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
    import Vue from "vue";

    let moment = require('moment')
    export default {
        data() {
            return {
                messInfo: {},
            };
        },
        components: {},
        created() {
            this.$ajax.get(BaseUrl + 'push/mess/' + this.$route.query.id,
                {headers: {'token': sessionStorage.getItem('token')}}
            ).then(response => {
                if (response.data.flag == 200) {
                    this.messInfo = response.data.data;
                    this.messInfo.pushDate = moment.utc(this.messInfo.pushDate).local().format('YYYY-MM-DD HH:mm:ss')
                } else if (response.data.flag == 201) {
                    this.$alert(response.data.msg + '，请重新登录', '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$message({
                                type: 'error',
                                message: `${ response.data.msg + '请重试'}`
                            });
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
