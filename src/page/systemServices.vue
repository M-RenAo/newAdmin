<template>
    <div>
        <el-row style="margin-top: 20px;">
                    <!--<div>统计时间：{{ctime}}</div>-->
                    <el-col :span="20" style="margin: 20px;font-size: 14px;" >
                        <div style="display:flex;align-items: center;margin-bottom: 20px">
                            <div style="display:inline-block;height:20px">服务状态：</div>
                            <el-switch
                            v-model="value2"
                            active-text="启用"
                            inactive-text="禁用"
                            @change="enable(value2)">
                            </el-switch>
                        </div>
                        <el-form  ref="iaData" label-width="200px" class="form food_form">
                            <div v-for="item in iaData.details">
                                <div  v-for="(nitem,index) in item">
                                    <p style="font-size: 18px;">{{index}}</p>
                                    <div v-for="litem in nitem">
                                        <el-form-item v-for="(sitem,nindex) in litem" :label="nindex+'：'" prop="name">
                                            {{sitem}}
                                        </el-form-item>
                                    </div>
                                </div>
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
    // let moment=require('moment')

    // Vue.filter('MoneyFormat', function(money) {
    //     if (money && money != null) {
    //         money = String(money);
    //         var left = money.split('.')[0], right = money.split('.')[1];
    //         right = right ? '.' + right:'';
    //         var temp = left.split('').reverse().join('').match(/(\d{1,3})/g);
    //         return (Number(money) < 0 ? '-' : '') + temp.join(',').split('').reverse().join('') + right;
    //     } else if (money === 0) { // 注意===在这里的使用，如果传入的money为0,if中会将其判定为boolean类型，故而要另外做===判断
    //         return '0';
    //     } else {
    //         return '';
    //     }
    // })

    export default {
        data() {
            return {
                iaData:'',
                value2:'',
                state:''
            };
        },
        components: {
            headTop
        },
        created() {
            console.log(new Date().getTime()-1555555)
            this.getData()
        },
        computed: {},
        methods: {
            enable(value){
                if(value==true){
                    this.state=0
                }else if(value==false){
                    this.state=1
                }
                console.log(value)
                this.$ajax({
                    method: "POST",
                    url:  BaseUrlApp+'upgrade/serviceOperation',

                    params:{state:this.state},
                    headers: {'token': sessionStorage.getItem('token')}
                }).then(response=>{
                    if(response.data.flag==200){
                        this.$alert(response.data.msg, '提示', {
                            confirmButtonText: '确定',
                            callback: action=>{
                                this.getData()
                            }
                        });
                    }else if(response.data.flag==201) {
                        this.$alert(response.data.msg + '，请重新登录', '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$router.push('/')
                            }
                        });
                    }else{
                        this.$alert(response.data.msg, '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$message({
                                    type: 'info',
                                    message: `${ response.data.msg }`
                                });
                            }
                        });
                    }
                });
            },
            getData(){
                this.$ajax({
                    method: "POST",
                    url:  BaseUrlApp+'upgrade/serviceState',
                    headers: {'token': sessionStorage.getItem('token')}
                }).then(response=>{
                    if(response.data.flag==200){
                    this.iaData=JSON.parse(response.data.msg);
                    if(this.iaData.state==1){
                    this.value2=false
                    }else{
                        this.value2=true
                    }
                    // console.log(this.iaData.details)
                    }else if(response.data.flag==201) {
                        this.$alert(response.data.msg + '，请重新登录', '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$router.push('/')
                            }
                        });
                    }
                    // this.ctime=moment.utc(response.data.data.ctime).local().format('YYYY-MM-DD HH:mm:ss')
                });
            }

        },

    };
</script>

<style lang="less" scoped>
    @import "../style/mixin";
    .el-form-item{
        margin-bottom: 0px!important;
    }

</style>
