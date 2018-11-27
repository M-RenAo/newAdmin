<template>
    <div>
        <el-row style="margin-top:300px;display:flex;justify-content: center">
            <div>
                <div style="display:flex;">
                    <div class="el-button el-button--primary el-button--small" style="height:28px;">
                        <div style="position: absolute"> 选取文件</div>
                        <input type="file" style="display: block;opacity: 0;width:50px;" accept=".apk" @change="add_app"
                               v-if="$route.query.type=='android'">
                        <input type="file" style="display: block;opacity: 0;width:50px;" accept=".ipa" @change="add_app"
                               v-if="$route.query.type=='ios'">
                    </div>
                    <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload" readonly
                               ref="upload">上传到服务器
                    </el-button>
                </div>
                <div slot="tip" class="el-upload__tip">只能上传{{filetype}}文件</div>
                <div>{{fileName}}</div>
            </div>
        </el-row>
        <div class="progress-wrap">
            <el-steps :space="200" :active="progressStepsActive" v-if="showProgressSteps" finish-status="success"
                      class="steps-style">
                <el-step title="正在上传"></el-step>
                <el-step title="上传完毕"></el-step>
                <el-step title="正在配置"></el-step>
                <el-step title="配置成功"></el-step>
            </el-steps>
        </div>
    </div>
</template>

<script>
    import headTop from "@/components/headTop";
    import {baseUrl, baseImgPath} from "@/config/env";

    export default {
        data() {
            return {
                fileName: "",
                uploadPolicy: "",
                UploadUrl: "",
                file: "",
                showProgress: false,
                progressStepsActive: 0,
                showProgressSteps: true,
                filetype: ''
            };
        },
        components: {
            headTop
        },
        created() {
            if (this.$route.query.type == 'android') {
                this.filetype = 'apk'
            } else if (this.$route.query.type == 'ios') {
                this.filetype = 'ipa'
            }
        },
        computed: {},
        methods: {
            add_app(event) {
                // if(this.$refs.upload.uploadFiles.length!=1){
                //     alert('只能上传一个文件');
                // }else{
                //     this.$refs.upload.submit();
                // }
                this.file = event.target.files[0];
                this.$ajax
                    .get(BaseUrl + "alioss/getpolicy", {
                        params: {
                            fileName: event.target.files[0].name,
                            type: "apply",
                            callBackType: "app_update",

                        }, headers: {'token': sessionStorage.getItem('token'), 'device': this.$route.query.type}
                    })
                    .then(response => {
                        if (response.data.flag == 200) {
                            this.uploadPolicy = response.data.data;
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
                        this.fileName = event.target.files[0].name;
                        // const deleteArr = ["fileName", "type", "host"];
                        // deleteArr.forEach(item => {
                        //     // 删除掉不需要传的参数
                        //     delete this.uploadPolicy[item];
                        // // });
                        // console.log(this.file);
                    });
            },
            submitUpload() {
                var that = this;
                var promise = new Promise(function (resolve, reject) {
                    const form = new FormData();
                    let img1 = that.file;
                    let type = img1.type; //文件的类型，判断是否是图片
                    let size = img1.size; //文件的大小，判断图片的大小
                    form.append("key", that.uploadPolicy["key"]);
                    form.append("OSSAccessKeyId", that.uploadPolicy["OSSAccessKeyId"]);
                    form.append("expire", that.uploadPolicy["expire"]);
                    form.append("policy", that.uploadPolicy["policy"]);
                    form.append("Signature", that.uploadPolicy["Signature"]);
                    form.append(
                        "Content-Disposition",
                        that.uploadPolicy["Content-Disposition"]
                    );
                    form.append("callback", that.uploadPolicy["callback"]);
                    form.append("file", img1);
                    form.append("x:appid", that.$route.query.id);
                    form.append("x:user", sessionStorage.getItem("userName"));
                    form.append("x:filename", that.uploadPolicy["fileName"]);
                    form.append("x:type", that.uploadPolicy["type"]);
                    that.$ajax({
                        method: "POST",
                        url: that.UploadUrl,
                        data: form,
                        onUploadProgress(progressEvent) {
                            if (progressEvent.lengthComputable) {
                                that.progressStepsActive = 1;
                            }
                        }
                    }).then(response => {
                        if (response.data.flag == 500) {
                            that.$alert(response.data.msg, "提示", {
                                confirmButtonText: "确定",
                                callback: action => {
                                    that.$message({
                                        type: "info",
                                        message: `error: ${response.data.msg}`
                                    });
                                }
                            });
                            reject(error);
                        } else if (response.data.flag == 200) {
                            that.progressStepsActive = 2;
                            //   this.$alert(response.data.msg, "提示", {
                            //     confirmButtonText: "确定",
                            //     callback: this.$router.push({ path: "/applicationList" })
                            //   });
                            resolve(response.data.flag)
                        } else if (response.data.flag == 201) {
                            that.$alert(response.data.msg + '，请重新登录', '提示', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    that.$router.push('/')
                                }
                            });
                        }
                    });

                })
                var promise2 = new Promise(function (resolve, reject) {
                    //上传文件到本地
                    let img1 = that.file;
                    var form2 = new FormData();
                    form2.append("key", that.uploadPolicy["key"]);
                    form2.append("file", img1);
                    that.$ajax({
                        method: "POST",
                        url: BaseUrl + 'apply/appUpload',
                        data: form2,
                        headers: {'token': sessionStorage.getItem('token'), 'device': that.$route.query.type}
                    }).then(response => {
                        if (response.data.flag == 500) {
                            that.$alert(response.data.msg, "提示", {
                                confirmButtonText: "确定",
                                callback: action => {
                                    that.$message({
                                        type: "info",
                                        message: `error: ${response.data.msg}`
                                    });
                                }
                            });
                            reject(error);
                        } else if (response.data.flag == 200) {
                            //   this.$alert(response.data.msg, "提示", {
                            //     confirmButtonText: "确定",
                            //     callback: this.$router.push({ path: "/applicationList" })
                            //   });
                            resolve(response.data.flag)
                        } else if (response.data.flag == 201) {
                            that.$alert(response.data.msg + '，请重新登录', '提示', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    that.$router.push('/')
                                }
                            });
                        }
                    });
                })
                Promise.all([promise, promise2]).then((result) => {
                    // console.log(result)
                    this.progressStepsActive = 3;
                    var that = this
                    this.$ajax.get(BaseUrl + 'apply/auto/update/' + this.$route.query.id, {
                        headers: {
                            'token': sessionStorage.getItem('token'),
                            'device': this.$route.query.type
                        }
                    }).then(function (response) {
                        if (response.data.flag == 200) {
                            that.progressStepsActive = 4;
                            that.$alert(response.data.msg, "提示", {
                                confirmButtonText: "确定",
                                callback: action => {
                                    if (that.$route.query.type == 'android') {
                                        that.$router.push({
                                            path: '/applicationList',
                                            query: {
                                                page: that.$route.query.page,
                                                size: that.$route.query.size,
                                                flag: that.$route.query.flag,
                                                tagcode: that.$route.query.tagcode
                                            }
                                        })
                                    } else if (that.$route.query.type == 'ios') {
                                        that.$router.push({
                                            path: '/iosList',
                                            query: {
                                                page: that.$route.query.page,
                                                size: that.$route.query.size,
                                                flag: that.$route.query.flag,
                                                tagcode: that.$route.query.tagcode
                                            }
                                        })
                                    }
                                }
                            });
                        } else if (response.data.flag == 201) {
                            that.$alert(response.data.msg + '，请重新登录', '提示', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    that.$router.push('/')
                                }
                            });
                        } else {
                            that.$alert(response.data.msg, "提示", {
                                confirmButtonText: "确定"
                            });
                        }
                    })
                }).catch((error) => {
                    // console.log(error)  // 打开的是 'failed'
                })
            }
        }

    };
</script>

<style lang="less" scoped>
    @import "../style/mixin";

    .progress-wrap {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 1rem;
        height: 5rem;
    }

    .steps-style {
        padding-left: 150px;
    }
</style>
