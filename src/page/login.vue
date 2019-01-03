<template>
    <div class="login_page fillcontain">
        <transition name="form-fade" mode="in-out">
            <section class="form_contianer" v-show="showLogin">
                <div class="manage_tip">
                    <p>后台管理系统</p>
                </div>
                <el-form :model="loginForm" ref="loginForm" :rules="rules">
                    <el-form-item prop="adminName">
                        <el-input v-model="loginForm.adminName" placeholder="用户名"><span></span></el-input>
                    </el-form-item>
                    <el-form-item prop="adminPass">
                        <el-input type="password" placeholder="密码" v-model="loginForm.adminPass"
                                  @keyup.enter.native="submitForm(loginForm)"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" v-bind:disabled="dis" @click="submitForm(loginForm)"
                                   class="submit_btn">登陆
                        </el-button>
                    </el-form-item>
                </el-form>
            </section>
        </transition>
    </div>
</template>

<script>
    export default {
        data() {

            return {
                dis: false,
                loginForm: {
                    adminName: '',
                    adminPass: '',
                },
                rules: {
                    adminName: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                    ],
                    adminPass: [
                        {required: true, message: '请输入密码', trigger: 'blur'}
                    ],
                },
                showLogin: false,
            }
        },
        mounted() {
            this.showLogin = true;
        },
        computed: {
        },
        methods: {

            async submitForm(loginForm) {
                this.$refs.loginForm.validate(async (valid) => {
                    if (valid) {
                        var form = new FormData();
                        form.append('adminName', loginForm.adminName);
                        form.append('adminPass', loginForm.adminPass)
                        this.dis = true;
                        var that = this;

                        this.$ajax({
                            method: 'POST',
                            url: BaseUrl + 'login',
                            data: form,
                        }).then((response) => {
                            if (response.data.flag == 200) {
                                this.$message({
                                    type: 'success',
                                    message: '登录成功'
                                });
                                sessionStorage.setItem('token', response.data.data.token);
                                sessionStorage.setItem('adminType', response.data.data.adminType);
                                sessionStorage.setItem('userName', response.data.data.adminName)
                                if(response.data.data.adminType!='VISITOR'){
                                    this.$router.push('manage')
                                }else{
                                    this.$router.push('home')
                                }
                            } else {
                                this.$message({
                                    type: 'error',
                                    message: response.data.msg
                                });
                                this.dis = false;
                            }
                        }, function (err) {
                            that.dis = false;
                            alert('服务器连接异常，请稍后重试')
                        });
                    } else {
                        this.$alert('请填写完整', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$message({
                                    type: 'info',
                                    message: `请重试！`
                                });
                            }
                        });
                    }
                })
            },
        },
    }
</script>

<style lang="less" scoped>
    @import '../style/mixin';

    .login_page {
        background-color: #324057;
    }

    .manage_tip {
        position: absolute;
        width: 100%;
        top: -100px;
        left: 0;
        p {
            font-size: 34px;
            color: #fff;
        }
    }

    .form_contianer {
        .wh(320px, 210px);
        .ctp(320px, 210px);
        padding: 25px;
        border-radius: 5px;
        text-align: center;
        background-color: #fff;
        .submit_btn {
            width: 100%;
            font-size: 16px;
        }
    }

    .tip {
        font-size: 12px;
        color: red;
    }

    .form-fade-enter-active, .form-fade-leave-active {
        transition: all 1s;
    }

    .form-fade-enter, .form-fade-leave-active {
        transform: translate3d(0, -50px, 0);
        opacity: 0;
    }
</style>
