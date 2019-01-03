<template>
    <div>
        <el-row style="margin-top: 20px;">
            <el-col :span="14" :offset="4">
                <el-form label-width="110px" class="form food_form">
                    <el-form-item label="原密码" prop='adminPass'>
                        <el-input v-model="adminPass" type="password"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码" prop='adminPassNew'>
                        <el-input v-model="adminPassNew" type="password"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="addAdmin()">确定</el-button>
                    </el-form-item>
                </el-form>

            </el-col>
        </el-row>
    </div>

</template>

<script>
    import {getCategory, addCategory, addFood} from "@/api/getData";
    import {baseUrl, baseImgPath} from "@/config/env";
    import Vue from "vue";

    export default {
        data() {
            return {
                adminPass: '',
                adminPassNew: ''
            };
        },
        created() {
        },
        computed: {},
        methods: {
            addAdmin() {
                if (this.adminPass != '' && this.adminPassNew != '') {
                    this.$ajax({
                        method: "POST",
                        url: BaseUrl + 'change',
                        data: {id: sessionStorage.getItem('userName'), old: this.adminPass, pass: this.adminPassNew},
                        headers: {
                            'token': sessionStorage.getItem('token')
                        }
                    }).then(response => {
                        if (response.data.flag == 200) {
                            this.$alert(response.data.msg, '提示', {
                                confirmButtonText: '确定',
                            });
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
                                callback: action => {
                                    this.$message({
                                        type: 'info',
                                        message: ` ${ response.data.msg }`
                                    });
                                }
                            });
                        }
                    });
                } else {
                    this.$alert('密码不能为空', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$message({
                                type: 'info',
                                message: `请重试！`
                            });
                        }
                    });
                    return false;
                }
            }
        },

    };
</script>

<style lang="less">
    @import "../style/mixin";


</style>
