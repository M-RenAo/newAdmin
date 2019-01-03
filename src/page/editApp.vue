<template>
    <div>
        <el-row style="margin-top: 20px;">
            <el-col :span="14" :offset="4">
                <el-form :model="appForm" ref="appForm" label-width="110px" class="form food_form">
                    <el-form-item label="应用标签" prop="name">
                        <el-select v-model="appForm.fileTag" placeholder="请选择">
                            <el-option
                                v-for="item in tagList"
                                :key="item.code"
                                :label="item.title"
                                :value="item.code">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="应用展示位" prop="name">
                        <el-select v-model="appForm.fileDisplayPosition" placeholder="请选择">
                            <el-option
                                v-for="item in positionList"
                                :key="item.code"
                                :label="item.title"
                                :value="item.code">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="应用状态" prop="name">
                        <el-select v-model="appForm.fileState" placeholder="请选择">
                            <el-option
                                v-for="nitem in typeList"
                                :key="nitem.code"
                                :label="nitem.title"
                                :value="nitem.code">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm(appForm)">提交</el-button>
                    </el-form-item>
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
                tagList: [],
                appForm: {
                    fileTag: '',
                    fileState: ''
                },
                typeList: [],
                positionList: []

            };
        },
        created() {
            this.getData()
            this.positionList = JSON.parse(sessionStorage.getItem('positionList'));
        },
        computed: {},
        methods: {
            getData() {
                this.$ajax.get(BaseUrl + 'apply/appmsg/' + this.$route.query.id, {headers: {'token': sessionStorage.getItem('token')}}).then(response => {
                    this.appForm = response.data.data

                })
                this.$ajax.get(BaseUrl + 'apptag', {headers: {'token': sessionStorage.getItem('token')}}).then(response => {
                    this.tagList = response.data.data;
                    this.typeList = [
                        {
                            "code": "1",
                            "id": "1",
                            "title": "上架"
                        },
                        {
                            "code": "0",
                            "id": "0",
                            "title": "下架"
                        }
                    ]

                })


            },
            submitForm(appform) {
                this.$ajax({
                    method: "POST",
                    url: BaseUrl + 'apply/update',
                    data: appform,
                    headers: {'token': sessionStorage.getItem('token')}
                }).then(response => {
                    if (response.data.flag == 500) {
                        this.$alert(response.data.msg, '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$message({
                                    type: 'info',
                                    message: `error: ${ response.data.msg + ',请重试'}`
                                });
                            }
                        });
                    } else if (response.data.flag == 200) {
                        this.$alert(response.data.msg, '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$router.push({path: '/applicationList'})
                            }
                        });
                    }
                });
            }
        },

    };
</script>

<style lang="less">
    @import "../style/mixin";
</style>
