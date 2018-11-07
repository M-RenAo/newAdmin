<template>
    <div>
        <el-row style="margin-top: 20px;">
            <el-col :span="14" :offset="4">
                <el-form :model="appForm" ref="appForm"  label-width="110px" class="form food_form">
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
                        <el-button type="primary"  @click="submitForm(appForm)">提交</el-button>
                    </el-form-item>
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
                tagList:[],
                appForm:{
                    fileTag:'',
                    fileState:''
                },
                typeList:[
                ],
                positionList:[]

            };
        },
        components: {
            headTop
        },
        created() {
         this.getData()
            this.positionList=JSON.parse(sessionStorage.getItem('positionList'));
            console.log( this.positionList)
        },
        computed: {},
        methods: {
            getData(){
                this.$ajax.get(BaseUrl+'apply/appmsg/'+this.$route.query.id,{headers: {'token': sessionStorage.getItem('token')}}).then(response => {
                   this.appForm=response.data.data

                })
                this.$ajax.get(BaseUrl+'apptag',{headers: {'token': sessionStorage.getItem('token')}}).then(response => {
                    console.log(response);
                    this.tagList=response.data.data;
                    this.typeList=[
                        {"code":"1",
                            "id":"1",
                            "title":"上架"},
                        {"code":"0",
                            "id":"0",
                            "title":"下架"}
                    ]

                })


            },
            submitForm(appform){
                console.log(appform)
                this.$ajax({
                    method: "POST",
                    url: BaseUrl+'apply/update',
                    data: appform,
                    headers: {'token': sessionStorage.getItem('token')}
                }).then(response => {
                    console.log(response);
                    if(response.data.flag==500){
                        this.$alert(response.data.msg, '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$message({
                                    type: 'info',
                                    message: `error: ${ response.data.msg +',请重试'}`
                                });
                            }
                        });
                    }else if(response.data.flag==200){
                        this.$alert(response.data.msg, '提示', {
                            confirmButtonText: '确定',
                            callback: action=>{this.$router.push({path:'/applicationList'})}
                        });
                    }
                });
            }
        },

    };
</script>

<style lang="less">
    @import "../style/mixin";

   /*// .form {*/
        /*min-width: 400px;*/
        /*margin-bottom: 30px;*/
        /*&:hover {*/
            /*box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6),*/
            /*0 2px 4px 0 rgba(232, 237, 250, 0.5);*/
            /*border-radius: 6px;*/
            /*transition: all 400ms;*/
        /*}*/
   // }

    /*.border-radius {*/
        /*border-radius: 6px;*/
        /*height: auto;*/
        /*width: 148px*/
    /*}*/

    /*.img-wrap {*/
        /*width: 148px;*/
        /*height: 148px;*/
    /*}*/

    /*.food_form {*/
        /*border: 1px solid #eaeefb;*/
        /*padding: 10px 10px 0;*/
    /*}*/

    /*.form_header {*/
        /*text-align: center;*/
        /*margin-bottom: 10px;*/
    /*}*/

    /*.category_select {*/
        /*border: 1px solid #eaeefb;*/
        /*padding: 10px 30px 10px 10px;*/
        /*border-top-right-radius: 6px;*/
        /*border-top-left-radius: 6px;*/
    /*}*/

    /*.add_category_row {*/
        /*height: 0;*/
        /*overflow: hidden;*/
        /*transition: all 400ms;*/
        /*background: #f9fafc;*/
    /*}*/

    /*.showEdit {*/
        /*height: 185px;*/
    /*}*/

    /*.add_category {*/
        /*background: #f9fafc;*/
        /*padding: 10px 30px 0px 10px;*/
        /*border: 1px solid #eaeefb;*/
        /*border-top: none;*/
    /*}*/

    /*.icon-plus-container {*/
        /*display: flex;*/
        /*justify-content: center;*/
        /*align-items: center*/
    /*}*/


    /*.avatar-uploader .el-upload {*/
        /*border: 1px dashed #d9d9d9;*/
        /*border-radius: 6px;*/
        /*cursor: pointer;*/
        /*position: relative;*/
        /*overflow: hidden;*/
    /*}*/

    /*.avatar-uploader .el-upload:hover {*/
        /*border-color: #20a0ff;*/
    /*}*/

    /*.avatar-uploader-icon {*/
        /*font-size: 28px;*/
        /*color: #8c939d;*/
        /*width: 120px;*/
        /*height: 120px;*/
        /*line-height: 120px;*/
        /*text-align: center;*/
    /*}*/

    /*.avatar {*/
        /*width: 120px;*/
        /*height: 120px;*/
        /*display: block;*/
    /*}*/

    /*.cell {*/
        /*text-align: center;*/
    /*}*/

    /*.icon-el {*/
        /*height: 147px;*/
        /*position: relative;*/
        /*.el-form-item__content {*/
            /*display: flex;*/
            /*position: absolute;*/
        /*}*/
        /*div.el-form-item__content {*/
            /*border: 0 !important;*/
        /*}*/
        /*div {*/
            /*background-color: #fbfdff;*/
            /*border: 1px dashed #c0ccda;*/
            /*border-radius: 6px;*/
            /*box-sizing: border-box;*/
            /*width: 148px;*/
            /*height: 148px;*/
            /*cursor: pointer;*/
            /*line-height: 146px;*/
            /*vertical-align: top;*/
            /*position: absolute;*/
        /*}*/
    /*}*/

    /*.icon-els {*/
        /*position: relative;*/
        /*line-height: 0 !important;*/
        /*.el-form-item__content {*/
            /*display: flex;*/
            /*line-height: 0 !important;*/
        /*}*/
        /*.addImage {*/
            /*background-color: #fbfdff;*/
            /*border: 1px dashed #c0ccda;*/
            /*border-radius: 6px;*/
            /*box-sizing: border-box;*/
            /*width: 148px;*/
            /*height: 148px;*/
            /*cursor: pointer;*/
            /*line-height: 146px;*/
            /*vertical-align: top;*/

            /*.img-wrap {*/
                /*position: absolute;*/
            /*}*/
        /*}*/
    /*}*/

    /*.imgMask {*/
        /*position: absolute;*/
        /*height: 100%;*/
        /*width: 100%;*/
        /*top: 0;*/
        /*left: 0;*/
        /*z-index: 10000;*/
        /*background: rgba(0, 0, 0, .6);*/
    /*}*/

    /*.showImg {*/
        /*height: auto;*/
        /*width: 500px;*/
        /*position: absolute;*/
        /*left: 50%;*/
        /*top: 50%;*/
        /*transform: translate(-50%, -50%);*/
        /*!*border:10px solid #fff;*!*/
        /*text-align: center;*/
    /*}*/

    /*.bigImg {*/
        /*width: 500px;*/
        /*height: auto;*/
    /*}*/

    /*.prev {*/
        /*position: absolute;*/
        /*top: 50%;*/
        /*left: 10px;*/
        /*width: 40px;*/
        /*height: 40px;*/
        /*color: #fff;*/
        /*transform: translate(10px, -50%);*/
    /*}*/

    /*.next {*/
        /*width: 40px;*/
        /*transform: translate(10px, -50%);*/
        /*position: absolute;*/
        /*top: 50%;*/
        /*right: 20px;*/
        /*height: 40px;*/
        /*color: #fff;*/
    /*}*/

    /*.delete {*/
        /*position: absolute;*/
        /*top: 0;*/
        /*right: 0px;*/
        /*width: 40px;*/
        /*height: 40px;*/
        /*color: #8c939d;*/
        /*text-align: center;*/
        /*font-size: 18px;*/
        /*!*transform:translate(10px,-50%);*!*/
    /*}*/
</style>
