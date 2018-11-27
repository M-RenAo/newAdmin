<template>
    <div>
        <el-row style="margin-top: 20px;">
            <el-col :span="20" style="margin: 40px">
                <el-form :model="agreeInfo" ref="agreeInfo" label-width="110px" class="form food_form">
                    <div>
                        <el-form-item label="时间：" prop="name">
                            {{agreeInfo.date}}
                        </el-form-item>
                        <el-form-item label="小协议名称：" prop="name">
                            {{agreeInfo.title}}
                        </el-form-item>
                        <el-form-item label="小协议内容：" prop="name">
                            {{agreeInfo.content}}
                        </el-form-item>
                        <el-form-item label="状态：" prop="name">
                            {{agreeInfo.confirm}}
                        </el-form-item>
                        <el-form-item label="甲方手机号：" prop="name">
                            {{agreeInfo.cellPhone}}
                        </el-form-item>
                        <el-form-item label="乙方手机号：" prop="name">
                            {{agreeInfo.peerCellPhone}}
                        </el-form-item>
                    </div>
                </el-form>
            </el-col>
        </el-row>
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
                agreeInfo: {},
                agreelist: []
            };
        },
        components: {
            headTop
        },
        created() {
            this.agreelist = JSON.parse(sessionStorage.getItem('litNumList'));
            this.agreelist.forEach(item => {
                if (item.agrId == this.$route.query.id) {
                    this.agreeInfo = item;
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
