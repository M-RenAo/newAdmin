<template>
    <div>
        <el-row style="margin-top: 20px;">
            <el-col :span="20" style="margin: 40px">
                <el-form :model="agreeInfo" ref="agreeInfo" label-width="110px" class="form food_form">
                    <div>
                        <el-form-item label="时间：" prop="name">
                            {{agreeInfo.date}}
                        </el-form-item>
                        <el-form-item label="内容：" prop="name">
                            {{agreeInfo.content}}
                        </el-form-item>
                        <el-form-item label="状态：" prop="name">
                            {{agreeInfo.status}}
                        </el-form-item>
                        <el-form-item label="用户手机号：" prop="name">
                            {{agreeInfo.cellPhone}}
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

    export default {
        data() {
            return {
                agreeInfo: {},
                contentList: [],
            };
        },
        created() {
            this.contentList = JSON.parse(sessionStorage.getItem('contentList'));
            this.contentList.forEach(item => {
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
