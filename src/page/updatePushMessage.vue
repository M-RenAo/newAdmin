<template>
    <div>
        <el-row style="margin-top: 20px;">
            <el-col :span="14" :offset="4">
                <el-form :model="appForm" ref="appForm" :rules="rule" label-width="110px" class="form food_form">
                    <el-form-item label="公告标题：" prop="title">
                        <el-input v-model="appForm.title"></el-input>
                    </el-form-item>
                    <el-form-item label="封面图片：" prop="cover" class="icon-el">
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
                    <el-form-item label="公告概要：" prop="summary">
                        <el-input v-model="appForm.summary"></el-input>
                    </el-form-item>
                    <el-form-item label="公告内容：" prop="message">
                        <quill-editor ref="myTextEditor" v-model="appForm.message"
                                      :config="editorOption"></quill-editor>
                        <!--<input class="upload" @change='add_imgs' type="file"-->
                        <!--style="display: none;" id="uniqueId">-->
                    </el-form-item>
                    <el-form-item label="推送时间：" prop="pushDate">
                        <el-date-picker
                            v-model="pushDate"
                            type="datetime"
                            placeholder="选择日期时间"
                            :picker-options="PickerOptions"
                            :readonly=readonly
                        >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="save(appForm)">保存</el-button>
                    </el-form-item>
                </el-form>

            </el-col>
        </el-row>
    </div>

</template>

<script>
    import {baseUrl, baseImgPath} from "@/config/env";
    import {quillEditor} from 'vue-quill-editor'

    let moment = require('moment')
    export default {
        data() {
            return {
                uploadIconUrl: '',
                addImgRange: '',
                appForm: {
                    cover: '',
                },
                readonly: false,
                pushDate: '',
                imgData: {
                    accept: "image/gif, image/jpeg, image/png, image/jpg,image/webp"
                },
                content: null,
                editorOption: {},
                PickerOptions: {
                    disabledDate(time) {
                        var date = new Date(),
                            Y = date.getFullYear(),
                            m = date.getMonth() + 1,
                            d = date.getDate();
                        let timeSpace = time.getTime() < new Date(Y + '-' + m + '-' + d);
                        return timeSpace;
                    }
                },
                rule: {
                    title: [
                        {required: true, message: '请输入推送', trigger: 'blur'},
                    ],
                    message: [
                        {required: true, message: '请输入推送内容', trigger: 'blur'}
                    ]
                }

            }
        },
        created() {
            if (this.$route.query.id != undefined && this.$route.query.id != '') {
                this.readonly = true;
                this.$ajax
                    .get(`${BaseUrl}push/mess/${this.$route.query.id}`, {headers: {'token': sessionStorage.getItem('token')}})
                    .then(response => {
                        if (response.data.flag == 200) {
                            this.appForm = response.data.data;
                            this.pushDate = moment.utc(this.appForm.pushDate).local().format('YYYY-MM-DD HH:mm:ss')
                            this.uploadIconUrl = response.data.data.cover
                        } else if (response.data.flag == 201) {
                            this.$alert(response.data.msg + '，请重新登录', '提示', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    this.$router.push('/')
                                }
                            });
                        }
                    })
            }
        },
        methods: {
            add_img(event) {
                if(this.uploadIconUrl!==''&&event.target.files[0]!==undefined){
                    this.$ajax({
                        method: "POST",
                        url: BaseUrl + 'common/cleanImage',
                        params: {objectName:this.uploadIconUrl},
                        headers: {'token': sessionStorage.getItem('token')}
                    }).then(response => {
                        if (response.data.flag == 500) {
                            this.$alert(response.data.msg, '提示', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    this.$message({
                                        type: 'info',
                                        message: `${ response.data.msg + ',请重试'}`
                                    });
                                }
                            });
                        } else if (response.data.flag == 200) {
                            this.uploadIconUrl=''
                        } else if (response.data.flag == 201) {
                            this.$alert(response.data.msg + '，请重新登录', '提示', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    this.$router.push('/')
                                }
                            });
                        }
                    });
                }
                let uploadPolicy = null;
                this.$ajax
                    .get(BaseUrl + "alioss/getpolicy", {
                        params: {
                            fileName: event.target.files[0].name,
                            type: "image",
                            callBackType: "app_image"
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
                            data: form
                        }).then(response => {
                            this.uploadIconUrl = response.data.data;
                            this.appForm.cover = response.data.data;
                        });
                    });
            },
            save(appForm) {
                this.$refs.appForm.validate(async (valid) => {
                    if (valid && this.pushDate != '') {
                        appForm.pushDate = moment(this.pushDate).utc().format('YYYY-MM-DD HH:mm:ss');
                        if (this.$route.query.id == '' || this.$route.query.id == undefined) {
                            this.$ajax({
                                method: "POST",
                                url: BaseUrl + 'push/add',
                                data: appForm,
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
                                            this.$router.push({path: '/pushMessage'})
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
                        } else {
                            this.$ajax({
                                method: "POST",
                                url: BaseUrl + 'push/update',
                                data: appForm,
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
                                            this.$router.push({path: '/pushMessage'})
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
                        }
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
                        return false;
                    }
                })

            }

        },
        components: {
             quillEditor
        },
        computed: {

        }

    };
</script>

<style lang="less">
    @import "../style/mixin";

    .ql-editor {
        min-height: 300px;
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

    .icon-plus-container {
        display: flex;
        justify-content: center;
        align-items: center
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

    .demo-upload-list img {
        width: 50%;
        height: 50%;
    }
</style>
<!--<template>-->
<!--<div>-->
<!--<div class="container">-->
<!---->
<!--</div>-->
<!--</div>-->
<!--</template>-->

<!--<script>-->
<!--import 'quill/dist/quill.core.css';-->
<!--import 'quill/dist/quill.snow.css';-->
<!--import 'quill/dist/quill.bubble.css';-->
<!--import { quillEditor } from 'vue-quill-editor';-->
<!--export default {-->
<!--name: 'editor',-->
<!--data: function(){-->
<!--return {-->
<!--content: '',-->
<!--editorOption: {-->
<!--placeholder: 'Hello World'-->
<!--}-->
<!--}-->
<!--},-->
<!--components: {-->
<!--quillEditor-->
<!--},-->
<!--methods: {-->
<!--onEditorChange({ editor, html, text }) {-->
<!--this.content = html;-->
<!--},-->
<!--submit(){-->
<!--this.$message.success('提交成功！');-->
<!--}-->
<!--}-->
<!--}-->
<!--</script>-->
<!--<style scoped>-->
<!--.editor-btn{-->
<!--margin-top: 20px;-->
<!--}-->
<!--</style>-->
