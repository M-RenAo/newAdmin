<template>
    <div>
        <el-row style="margin-top: 20px;">
            <el-col :span="14" :offset="4">
                <el-form :model="adminForm" ref="adminForm" :rules="rules" label-width="110px" class="form food_form">
                    <el-form-item label="用户名" prop="adminName">
                        <el-input v-model="adminForm.adminName"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="adminPass">
                        <el-input v-model="adminForm.adminPass"  type="password"></el-input>
                    </el-form-item>
                    <el-form-item label="权限" prop="adminType">
                        <el-select v-model="adminForm.adminType" placeholder="请选择">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary"  @click="addAdmin(adminForm)">确定</el-button>
                    </el-form-item>
                </el-form>

            </el-col>
        </el-row>
        <!--<div class="imgMask" v-if="showBigImg" @click.stop="showBigImg=!showBigImg">-->
            <!--<i class="prev el-icon-arrow-left" @click.stop="prev"></i>-->
            <!--<div class="showImg">-->
                <!--<img class="bigImg" :src="'https://hug-image.oss-cn-hangzhou.aliyuncs.com/'+appimageUrlArray[num]">-->
            <!--</div>-->
            <!--<i class="next el-icon-arrow-right" @click.stop="next"></i>-->
        <!--</div>-->
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
              adminForm:{
                  adminName:'',
                  adminPass:''
              },
                rules: {
                    adminName: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                    ],
                    adminPass: [
                        {required: true, message: '请输入密码', trigger: 'blur'}
                    ],
                    adminType: [
                        {required: true, message: '请选择身份', trigger: 'blur'}
                    ],
                },
                options:[
                    {label:'超级管理员',value:'ADMIN'},
                    {label:'普通管理员',value:'EDITOR'},
                    {label:'钱包管理者',value:'ASSIT'}
                    ]
            };
        },
        components: {
            headTop
        },
        created() {
        },
        computed: {},
        methods: {
           addAdmin(adminForm){
               this.$refs.adminForm.validate(async (valid) => {
                   if (valid) {
                       this.$ajax({
                           method: "POST",
                           url: BaseUrl+'addAdmin',
                           data: adminForm,
                           headers: {
                               'token': sessionStorage.getItem('token')
                           }
                       }).then(response => {
                           console.log(response);
                           if(response.data.flag==500){
                               this.$alert(response.data.msg, '提示', {
                                   confirmButtonText: '确定',
                                   callback: action => {
                                       this.$message({
                                           type: 'info',
                                           message: `error: ${ response.data.msg }`
                                       });
                                   }
                               });
                           }else if(response.data.flag==200){
                               this.$alert(response.data.msg, '提示', {
                                   confirmButtonText: '确定',
                                   callback: action => {this.$router.push({path:'/adminList'})}
                               });
                           }else if(response.data.flag==201) {
                               this.$alert(response.data.msg + '，请重新登录', '提示', {
                                   confirmButtonText: '确定',
                                   callback: action => {
                                       this.$router.push('/')
                                   }
                               });
                           }
                       });
                   } else {
                       this.$alert('用户名密码不能为空', {
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
               });
           }
        },

    };
</script>

<style lang="less">
    @import "../style/mixin";


</style>
