<template>
    <div>
        <el-row style="margin-top: 20px;">
            <el-col :span="14" :offset="4">
                <el-form :model="appForm" ref="appForm" label-width="110px" class="form food_form">
                    <el-form-item label="项目名称：" prop="name">
                        {{appForm.projectName}}
                    </el-form-item>
                    <el-form-item label="App名称：" prop="name">
                        {{appForm.appName}}
                    </el-form-item>
                    <el-form-item label="初始版本上线时间：" prop="name">
                        {{appForm.startDate}}
                    </el-form-item>
                    <el-form-item label="安卓安装包：" prop="name">
                        {{appForm.androidUrl}}
                    </el-form-item>
                    <el-form-item label="ios安装包：" prop="name">
                        {{appForm.iosUrl}}
                    </el-form-item>
                    <el-form-item label="公司名称：" prop="name">
                        {{appForm.companyName}}
                    </el-form-item>
                    <el-form-item label="联系人姓名：" prop="name">
                        {{appForm.contactName}}
                    </el-form-item>
                    <el-form-item label="联系人微信：" prop="name">
                        {{appForm.contactWeiXin}}
                    </el-form-item>
                    <el-form-item label="联系人电话：" prop="name">
                        {{appForm.contactPhone}}
                    </el-form-item>
                    <el-form-item label="APP简介：" prop="name">
                        {{appForm.appSummary}}
                    </el-form-item>
                    <el-form-item label="当前版本更新内容：" prop="name">
                        {{appForm.appMessage}}
                    </el-form-item>
                    <el-form-item label="公司或团队介绍：" prop="name">
                        {{appForm.companyMessage}}
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm(state)">通过审核</el-button>
                    </el-form-item>
                </el-form>

            </el-col>
        </el-row>

    </div>

</template>

<script>

    let moment = require('moment')
    export default {
        data() {
            return {
                state: '',
                remarks: '',
                showBigImg: false,
                num: 0,
                showList: [],
                appForm: {},
            };
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
                        this.appForm.fileDate = moment.utc(this.appForm.fileDate).local().format('YYYY-MM-DD HH:mm:ss')
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
            submitForm() {
                this.$ajax({
                    method: "POST",
                    url: BaseUrl + 'apply/audit',
                    data: {
                        id: this.$route.query.id,
                        auditor: 111,
                        state: this.state,
                        remarks: this.remarks

                    },
                    headers: {
                        'token': sessionStorage.getItem('token'),
                        'device': this.$route.query.type
                    }
                }).then(response => {
                    if (response.data.flag == 500) {
                        this.$alert(response.data.msg, '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$message({
                                    type: 'info',
                                    message: `error: ${ response.data.msg }`
                                });
                            }
                        });
                    } else if (response.data.flag == 200) {
                        this.$alert(response.data.msg, '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                if (this.$route.query.type == 'android') {
                                    this.$router.push({
                                        path: '/applicationList',
                                        query: {page: this.$route.query.page, size: this.$route.query.size, active: 0}
                                    })
                                } else if (this.$route.query.type == 'ios') {
                                    this.$router.push({
                                        path: '/iosList',
                                        query: {page: this.$route.query.page, size: this.$route.query.size, active: 0}
                                    })
                                }

                            }
                        });
                    } else if (response.data.flag == 201) {
                        this.$alert(response.data.msg + '，请重新登录', '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$router.push('/')
                            }
                        });
                    }
                });
            },
        },

    };
</script>

<style lang="less" scoped>
    @import "../style/mixin";

    .delete {
        position: absolute;
        top: 0;
        right: 0px;
        width: 40px;
        height: 40px;
        color: #8c939d;
        text-align: center;
        font-size: 18px;
    }
</style>
