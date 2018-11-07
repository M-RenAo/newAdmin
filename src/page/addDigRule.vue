<template>
    <div>
        <el-row style="margin-top: 20px;">
            <el-col :span="14" :offset="4">
                <el-form :model="digForm" ref="digForm" :rules="rules" label-width="130px" class="form food_form">
                    <el-form-item label="安装挖矿：" prop="installReward">
                        <el-input v-model="digForm.installReward" style="width:200px" type="number"></el-input> IA
                    </el-form-item>
                    <el-form-item label="安装每日上限：" prop="installTimesLimited">
                        <el-input v-model="digForm.installTimesLimited" style="width:200px" type="number"></el-input> 个
                    </el-form-item>
                    <!--<el-form-item label="安装挖矿：" prop="name" >-->
                        <!--<el-input style="width:200px"></el-input> IA-->
                    <!--</el-form-item>-->
                    <el-form-item label="打开挖矿：" prop="openReward">
                        <el-input v-model="digForm.openReward" style="width:200px" type="number"></el-input> IA
                    </el-form-item>
                    <el-form-item label="打开每日上限：" prop="openTimesLimited">
                        <el-input v-model="digForm.openTimesLimited" style="width:200px" type="number"></el-input> 个
                    </el-form-item>
                    <el-form-item label="邀请好友挖矿：" prop="inviteReward">
                        <el-input v-model="digForm.inviteReward" style="width:200px" type="number"></el-input> IA
                    </el-form-item>
                    <el-form-item label="注册挖矿：" prop="registerReward">
                        <el-input v-model="digForm.registerReward" style="width:200px" type="number"></el-input> IA
                    </el-form-item>
                    <!--<el-form-item label="使用规则时间" prop="summary">-->
                        <!--<el-date-picker-->
                            <!--v-model="timePeriod"-->
                            <!--type="datetimerange"-->
                            <!--align="right"-->
                            <!--:picker-options="pickerOptions0"-->
                            <!--:default-time="['12:00:00', '12:00:00']">-->
                        <!--</el-date-picker>-->
                    <!--</el-form-item>-->
                    <el-form-item>
                        <el-button type="primary"  @click="save(digForm)">保存</el-button>
                    </el-form-item>
                </el-form>
                <el-dialog
                    title="提示"
                    :visible.sync="delVisible"
                    width="30%">
                    <span>确定变更挖矿设置？</span>
                    <span slot="footer" class="dialog-footer">
                     <el-button @click="delVisible = false">取 消</el-button>
                     <el-button type="primary" @click="saveEnsure()">确 定</el-button>
                </span>
                </el-dialog>
            </el-col>
        </el-row>
    </div>

</template>

<script>
    import headTop from "@/components/headTop";
    import {baseUrl, baseImgPath} from "@/config/env";
    import { quillEditor } from 'vue-quill-editor'
    export default{
        data(){
            return {
                digForm:{},
                // timePeriod:null,
                delVisible:false,
                pickerOptions0: {
                    disabledDate(time) {
                        return time.getTime() < Date.now()- 8.64e7;
                    }
                },
                rules: {
                    installReward: [
                        {required: true, message: '请输入', trigger: 'blur'},
                    ],
                    installTimesLimited: [
                        {required: true, message: '请输入', trigger: 'blur'}
                    ],
                    openReward: [
                        {required: true, message: '请输入', trigger: 'blur'}
                    ],
                    openTimesLimited:[
                        {required: true, message: '请输入', trigger: 'blur'}
                    ],
                    inviteReward:[
                        {required: true, message: '请输入', trigger: 'blur'}
                    ],
                    registerReward:[
                        {required: true, message: '请输入', trigger: 'blur'}
                    ]
                }
            }
        },
        mounted(){

        },
        methods:{
            // GMTToStr(time) {
            //     var date = time;
            //     var Y = date.getFullYear();
            //     var M = date.getMonth() + 1;
            //     M = M < 10 ? '0' + M : M;// 不够两位补充0
            //     var D = date.getDate();
            //     D = D < 10 ? '0' + D : D;
            //     var H = date.getHours();
            //     H = H < 10 ? '0' + H : H;
            //     var Mi = date.getMinutes();
            //     Mi = Mi < 10 ? '0' + Mi : Mi;
            //     var S = date.getSeconds();
            //     S = S < 10 ? '0' + S : S;
            //     return Y + '-' + M + '-' + D + ' ' + H + ':' + Mi + ':' + S;
            //
            // },
            save(digForm){
                this.$refs.digForm.validate(async (valid) => {
                    if(valid){
                        this.delVisible=true;
                    }else{
                        this.$alert('请全部填写完整', {
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

                })


            },
            saveEnsure(){
                this.$ajax({
                    method: "POST",
                    url: BaseUrl+'mining/addrule',
                    params: this.digForm,
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
                        return false
                    } else if (response.data.flag == 200) {
                        this.$alert(response.data.msg, '提示', {
                            confirmButtonText: '确定',
                            callback:action=>{this.$router.push({path:'/setDig'})}
                        });
                    }else if(response.data.flag==201) {
                        this.$alert(response.data.msg + '，请重新登录', '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$router.push('/')
                            }
                        });
                    }
                    this.delVisible=false;
                },error=>{
                        this.$alert('请检查接口', '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$message({
                                    type: 'info',
                                    message: `error: ${'请重试'}`
                                });
                            }
                        });
                    this.delVisible=false;
                        return false;
                });
            }

        },
    };
</script>

<style lang="less" scoped>
    @import "../style/mixin";


</style>
