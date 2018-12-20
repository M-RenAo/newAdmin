<template>
    <div>
        <el-row style="margin-top: 20px;">
            <el-col :span="14" :offset="4">
                <el-form :model="appForm" ref="appForm" :rules="rules" label-width="110px" class="form food_form">
                    <el-form-item label="应用名称" prop="appName">
                        <el-input v-model="appForm.appName"></el-input>
                    </el-form-item>
                    <!--<el-form-item label="版本号" prop="version">-->
                    <!--<el-input v-model="appForm.version"></el-input>-->
                    <!--</el-form-item>-->
                    <el-form-item label="应用简介" prop="fileSummary">
                        <el-input
                            type="textarea"
                            :rows="2"
                            :maxlength='20'
                            placeholder="请输入内容"
                            v-model="appForm.fileSummary">
                        </el-input>
                    </el-form-item>
                    <!--type="textarea"-->
                    <!--:rows="2"-->
                    <!--placeholder="请输入内容"-->
                    <!--v-model="appForm.fileSummary">-->
                    <!--</el-input>-->
                    <!--</el-form-item>-->
                    <el-form-item label="应用介绍" prop="fileMessage">
                        <el-input
                            type="textarea"
                            :rows="2"
                            placeholder="请输入内容"
                            v-model="appForm.fileMessage">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="下载地址" prop="fileDir">
                        <el-input
                            placeholder="请输入有效的下载链接"
                            v-model="appForm.fileDir">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="包名">
                        <el-input
                            placeholder="请输入包名"
                            v-model="appForm.packageName">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="安装包大小" prop="fileSize">
                        <el-input
                            style="width:70%"
                            placeholder="请输入安装包大小"
                            v-model="appForm.fileSize">
                        </el-input>
                        M
                    </el-form-item>
                    <!--<el-form-item label="应用权限">-->
                    <!--<el-select v-model="appForm.tag">-->
                    <!--<el-option label="公开" value="1">-->
                    <!--</el-option>-->
                    <!--<el-option label="不公开" value="2">-->
                    <!--</el-option>-->
                    <!--</el-select>-->
                    <!--</el-form-item>-->
                    <el-form-item label="应用图标" class="icon-el">
                        <input class="upload" @change='add_img' type="file"
                               style="opacity: 0;width: 148px;height: 148px;z-index:222;">
                        <div class="icon-plus-container" style="">
                            <i class="el-icon-plus"></i>
                        </div>
                        <div class="img-wrap" v-if="uploadIconUrl!=''">
                            <img :src="'https://imapp-image.oss-cn-hangzhou.aliyuncs.com/'+uploadIconUrl"
                                 class="border-radius" style="width: 146px;height: 146px;"/>
                        </div>
                    </el-form-item>
                    <el-form-item label="应用图片" class="icon-els">
                        <div class="addImage">
                            <input class="upload img-wrap" style="opacity: 0;z-index:999" @change='add_imgs'
                                   type="file">
                            <div style="display: flex;justify-content: center;align-items: center" class="img-wrap">
                                <i class="el-icon-plus"></i>
                            </div>
                        </div>
                        <div style="max-width:400px;height:auto;">
                            <div v-if="imageUrl!=''" v-for="(value,index) in appimageUrlArray"
                                 style="display: inline-block;margin-left: 10px;position: relative" :key="index">

                                <img :src="'https://imapp-image.oss-cn-hangzhou.aliyuncs.com/'+value"
                                     class="border-radius " style="" @click="bigImg(index)"/>
                                <i class="delete el-icon-close" @click="removeImage(index)"></i>
                            </div>

                        </div>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="nextpart(appForm)">提交</el-button>
                    </el-form-item>
                </el-form>

            </el-col>
        </el-row>
        <div class="imgMask" v-if="showBigImg" @click.stop="showBigImg=!showBigImg">
            <i class="prev el-icon-arrow-left" @click.stop="prev"></i>
            <div class="showImg">
                <img class="bigImg" :src="'https://imapp-image.oss-cn-hangzhou.aliyuncs.com/'+appimageUrlArray[num]">
            </div>
            <i class="next el-icon-arrow-right" @click.stop="next"></i>
        </div>
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
                // imgDataUrl:'',
                imageUrl: "",
                appimageUrlArray: [],
                baseUrl,
                baseImgPath,
                num: 0,
                showBigImg: false,
                dialogImageUrl: "",
                uploadIconUrl: "",
                dialogVisible: false,
                UploadUrl: "",
                uploadHeader: "",
                imgs: [],
                imgData: {
                    accept: "image/gif, image/jpeg, image/png, image/jpg,image/webp"
                },
                appForm: {
                    name: "",
                    message: "",
                    icon: "",
                    version: '',
                    // tag: "",
                    summary: '',
                    showPict: "",
                    packageName: ''
                },
                rules: {
                    appName: [
                        {required: true, message: '请输入应用名称', trigger: 'blur'},
                    ],
                    version: [
                        {required: true, message: '请输入版本号', trigger: 'blur'}
                    ],
                    fileMessage: [
                        {required: true, message: '请输入介绍', trigger: 'blur'}
                    ], fileDir: [
                        {required: true, message: '请输入下载地址', trigger: 'blur'}
                    ], fileSize: [
                        {required: true, message: '请输入安装包大小', trigger: 'blur'}
                    ], fileSummary: [
                        {required: true, message: '请输入简介', trigger: 'blur'}
                    ]
                },
            };
        },
        components: {
            headTop
        },
        created() {
        },
        computed: {},
        methods: {
            add_img(event) {
                let uploadPolicy = null;
                this.$ajax
                    .get(BaseUrl + "alioss/getpolicy", {
                        params: {
                            fileName: event.target.files[0].name,
                            type: "image",
                            callBackType: "app_image",
                        }, headers: {'token': sessionStorage.getItem('token')}
                    })
                    .then(response => {
                        if (response.data.flag == 200) {
                            uploadPolicy = response.data.data;
                            this.UploadUrl = response.data.data.host;
                        } else if (response.data.flag == 201) {
                            this.$alert(response.data.msg + '，请重新登录', '提示', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    this.$router.push('/')
                                }
                            });
                        } else {
                            alert("权限获取失败！");
                            return;
                        }

                        let img1 = event.target.files[0];
                        let type = img1.type; //文件的类型，判断是否是图片
                        let size = img1.size; //文件的大小，判断图片的大小
                        if (this.imgData.accept.indexOf(type) == -1) {
                            alert("请选择我们支持的图片格式！");
                            return false;
                        }
                        const form = new FormData();

                        let paramsObj = {};
                        form.append("key", uploadPolicy["key"]);
                        form.append("OSSAccessKeyId", uploadPolicy["OSSAccessKeyId"]);
                        form.append("expire", uploadPolicy["expire"]);
                        form.append("policy", uploadPolicy["policy"]);
                        form.append("Signature", uploadPolicy["Signature"]);
                        form.append("callback", uploadPolicy["callback"]);
                        form.append("file", img1);
                        form.append('x:user', sessionStorage.getItem('userName'));
                        form.append('x:filename', uploadPolicy['fileName']);
                        form.append('x:type', uploadPolicy['type'])
                        this.$ajax({
                            method: "POST",
                            url: this.UploadUrl,
                            data: form,
                        }).then(response => {
                            this.uploadIconUrl = response.data.data;
                            this.appForm.fileIcon = response.data.data;
                        });
                    });
            },
            add_imgs(event) {
                let uploadPolicy = null;
                this.$ajax
                    .get(BaseUrl + "alioss/getpolicy", {
                        params: {
                            fileName: event.target.files[0].name,
                            type: "image",
                            callBackType: "app_image",
                        }, headers: {'token': sessionStorage.getItem('token')}
                    })
                    .then(response => {
                        if (response.data.flag == 200) {
                            uploadPolicy = response.data.data;
                            this.UploadUrl = response.data.data.host;
                        } else if (response.data.flag == 201) {
                            this.$alert(response.data.msg + '，请重新登录', '提示', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    this.$router.push('/')
                                }
                            });
                        } else {
                            alert("权限获取失败！");
                            return;
                        }
                        let img1 = event.target.files[0];
                        let type = img1.type; //文件的类型，判断是否是图片
                        let size = img1.size; //文件的大小，判断图片的大小
                        if (this.imgData.accept.indexOf(type) == -1) {
                            alert("请选择我们支持的图片格式！");
                            return false;
                        }
                        const form = new FormData();
                        form.append("key", uploadPolicy["key"]);
                        form.append("OSSAccessKeyId", uploadPolicy["OSSAccessKeyId"]);
                        form.append("expire", uploadPolicy["expire"]);
                        form.append("policy", uploadPolicy["policy"]);
                        form.append("Signature", uploadPolicy["Signature"]);
                        form.append('Content-Disposition', uploadPolicy['Content-Disposition']);
                        form.append("callback", uploadPolicy["callback"]);
                        form.append("file", img1);
                        form.append('x:user', sessionStorage.getItem('userName'));
                        form.append('x:filename', uploadPolicy['fileName']);
                        form.append('x:type', uploadPolicy['type']);
                        this.$ajax({
                            method: "POST",
                            url: this.UploadUrl,
                            data: form,
                        }).then(response => {
                            this.imageUrl = response.data.data;
                            this.appimageUrlArray.push(response.data.data);
                            this.appForm.fileShow = this.appimageUrlArray.join(',');
                        });
                    });
            },
            nextpart(appForm) {
                this.$refs.appForm.validate(async (valid) => {
                    if (valid && this.uploadIconUrl != '' && this.appimageUrlArray.length != 0) {
                        this.$ajax({
                            method: "POST",
                            url: BaseUrl + 'apply/create/ios',
                            data: appForm,
                            headers: {'token': sessionStorage.getItem('token'), 'device': this.$route.query.type}
                        }).then(response => {
                            if (response.data.msg != '应用详情创建失败!') {
                                this.$router.push({path: "/iosList", query: {active: 0}});
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
                                            message: `error: ${ response.data.msg }`
                                        });
                                    }
                                })
                            }
                        });
                    } else {
                        if (this.uploadIconUrl == '' && valid) {
                            this.$alert('请上传应用图标', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    this.$message({
                                        type: 'info',
                                        message: `请重试！`
                                    });
                                }
                            });
                        } else if (this.appimageUrlArray.length == 0 && valid) {
                            this.$alert('请上传应用图片', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    this.$message({
                                        type: 'info',
                                        message: `请重试！`
                                    });
                                }
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
                        return false;
                    }
                });
            },
            bigImg(index) {
                this.showBigImg = true;
                this.num = index;
            },
            prev() {
                if (this.num == 0) {
                    this.num = this.appimageUrlArray.length
                }
                this.num--;
            },
            next() {
                if (this.num == this.appimageUrlArray.length - 1) {
                    this.num = -1;
                }
                this.num++;
            },
            removeImage(index) {
                this.appimageUrlArray.splice(index, 1);
                this.appForm.showPict = this.appimageUrlArray.join(',')
            }
        },

    };
</script>

<style lang="less">
    @import "../style/mixin";

    .form {
        min-width: 400px;
        margin-bottom: 30px;
        &:hover {
            box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6),
            0 2px 4px 0 rgba(232, 237, 250, 0.5);
            border-radius: 6px;
            transition: all 400ms;
        }
    }

    .border-radius {
        border-radius: 6px;
        height: auto;
        width: 148px
    }

    .img-wrap {
        width: 148px;
        height: 148px;
    }

    .form_header {
        text-align: center;
        margin-bottom: 10px;
    }

    .category_select {
        border: 1px solid #eaeefb;
        padding: 10px 30px 10px 10px;
        border-top-right-radius: 6px;
        border-top-left-radius: 6px;
    }

    .add_category_row {
        height: 0;
        overflow: hidden;
        transition: all 400ms;
        background: #f9fafc;
    }

    .showEdit {
        height: 185px;
    }

    .add_category {
        background: #f9fafc;
        padding: 10px 30px 0px 10px;
        border: 1px solid #eaeefb;
        border-top: none;
    }

    .icon-plus-container {
        display: flex;
        justify-content: center;
        align-items: center
    }

    .add_category_button {
        text-align: center;
        line-height: 40px;
        border-bottom-right-radius: 6px;
        border-bottom-left-radius: 6px;
        border: 1px solid #eaeefb;
        border-top: none;
        transition: all 400ms;
        &:hover {
            background: #f9fafc;
            span,
            .edit_icon {
                color: #20a0ff;
            }
        }
        span {
            .sc(14px, #999);
            transition: all 400ms;
        }
        .edit_icon {
            color: #ccc;
            transition: all 400ms;
        }
    }

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #20a0ff;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 120px;
        height: 120px;
        line-height: 120px;
        text-align: center;
    }

    .avatar {
        width: 120px;
        height: 120px;
        display: block;
    }

    .cell {
        text-align: center;
    }

    .icon-el {
        height: 147px;
        position: relative;
        .el-form-item__content {
            display: flex;
            position: absolute;
        }
        div.el-form-item__content {
            border: 0 !important;
        }
        div {
            background-color: #fbfdff;
            border: 1px dashed #c0ccda;
            border-radius: 6px;
            box-sizing: border-box;
            width: 148px;
            height: 148px;
            cursor: pointer;
            line-height: 146px;
            vertical-align: top;
            position: absolute;
        }
    }

    .icon-els {
        position: relative;
        line-height: 0 !important;
        .el-form-item__content {
            display: flex;
            line-height: 0 !important;
        }
        .addImage {
            background-color: #fbfdff;
            border: 1px dashed #c0ccda;
            border-radius: 6px;
            box-sizing: border-box;
            width: 148px;
            height: 148px;
            cursor: pointer;
            line-height: 146px;
            vertical-align: top;

            .img-wrap {
                position: absolute;
            }
        }
    }

    .imgMask {
        position: absolute;
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        z-index: 10000;
        background: rgba(0, 0, 0, .6);
    }

    .showImg {
        height: auto;
        width: 500px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        /*border:10px solid #fff;*/
        text-align: center;
    }

    .bigImg {
        width: 500px;
        height: auto;
    }

    .prev {
        position: absolute;
        top: 50%;
        left: 10px;
        width: 40px;
        height: 40px;
        color: #fff;
        transform: translate(10px, -50%);
    }

    .next {
        width: 40px;
        transform: translate(10px, -50%);
        position: absolute;
        top: 50%;
        right: 20px;
        height: 40px;
        color: #fff;
    }

    .delete {
        position: absolute;
        top: 0;
        right: 0px;
        width: 40px;
        height: 40px;
        color: #8c939d;
        text-align: center;
        font-size: 18px;
        /*transform:translate(10px,-50%);*/
    }
</style>
