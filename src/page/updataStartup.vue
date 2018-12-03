<template>
    <div>
        <el-row style="margin-top: 20px;">
            <el-col :span="14" :offset="4">
                <el-form :model="focusForm" ref="focusForm" :rules="rule" label-width="110px" class="form food_form">
                    <el-form-item label="广告商名称：" prop="name">
                        <el-input v-model="focusForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="启动图" prop="item" class="icon-el">
                        <!-- <input class="upload" @change='mapping' type="file"
                               style="opacity: 0;width: 148px;height: 148px;z-index:222;">
                        <div class="icon-plus-container" style="">
                            <i class="el-icon-plus"></i>
                        </div>
                        <div class="img-wrap" v-if="uploadIconUrl!=''">
                            <img :src="'https://imapp-image.oss-cn-hangzhou.aliyuncs.com/'+uploadIconUrl"
                                 class="border-radius" style="width: 146px;height: 146px;"/>
                        </div> -->

                        <div class="updatas">

                            <div class="icon-plus-container">

                            </div>
                            <!-- <div class="img-wrap" v-if="uploadImageUrl!==''">
                                <img :src="'https://imapp-image.oss-cn-hangzhou.aliyuncs.com/'+uploadImageUrl"
                                    class="border-radius" style="width: 146px;height: 146px;"/>
                            </div> -->
                            <div class="img-wrap" v-if="focusForm.item!==''&&focusForm.item!==undefined">
                                <img :src="'https://imapp-image.oss-cn-hangzhou.aliyuncs.com/'+focusForm.item"
                                     style="width:146px;height:146px;"
                                     v-if="focusForm.item!==''&&focusForm.item!==undefined">
                            </div>
                            <el-button type="primary" v-if="focusForm.item===undefined||focusForm.item===''"
                                       class="btnone"><span>上传</span> <input @change='mapping' type="file"
                                        style="opacity: 0;width: 70px;height: 40px;z-index:222;position: absolute; top: 0px; left: 0px;"
                                        class="upload"></el-button>
                            <el-button type="primary" v-if="focusForm.item!==undefined&&focusForm.item!==''"
                                       @click="deleteImg" class="btnone">删除
                            </el-button>
                        </div>
                    </el-form-item>
                    <!-- <el-form-item label="类型：">
                        <el-select v-model="focusForm.type" placeholder="请选择" @change="changeType">
                            <el-option
                                v-for="nitem in typeList"
                                :key="nitem.code"
                                :label="nitem.title"
                                :value="nitem.code">
                            </el-option>
                        </el-select>
                    </el-form-item> -->
                    <!-- <el-form-item label="应用名称：" prop="toItemId" v-if="focusForm.type == 2">
                        <el-autocomplete
                            class="inline-input"
                            v-model="appName"
                            :fetch-suggestions="querySearch"
                            placeholder="请输入内容"
                            :trigger-on-focus="false"
                            @select="handleSelect"
                        ></el-autocomplete>
                    </el-form-item> -->
                    <!-- <el-form-item label="图文详情：" prop="content" v-if="focusForm.type!=2&&focusForm.type!=3">
                        <quill-editor ref="newEditor" v-model="content" :config="editorOption"></quill-editor>
                        <input class="upload" @change='add_imgs' type="file"
                        style="display: none;" id="uniqueId">
                    </el-form-item> -->
                    <el-form-item label="链接地址：" prop="url">
                        <el-input v-model="url"></el-input>
                    </el-form-item>
                    <el-form-item label="起止时间" prop="timePeriod">
                        <el-date-picker
                            v-model="timePeriod"
                            type="datetimerange"
                            align="right"
                            :picker-options="pickerOptions0"
                            :default-time="['12:00:00', '12:00:00']">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="delStartup" v-if="this.$route.query.dataId">删除</el-button>
                        <el-button @click="goStartup">返回</el-button>
                        <el-button type="primary" @click="save(focusForm)">保存</el-button>
                    </el-form-item>
                </el-form>

            </el-col>
        </el-row>
    </div>

</template>

<script>
    import headTop from "@/components/headTop";
    import {baseUrl, baseImgPath} from "@/config/env";
    import {quillEditor} from 'vue-quill-editor'

    let moment = require('moment')
    export default {
        data() {
            return {
                url: null,
                content: null,
                timePeriod: null,
                uploadIconUrl: '',
                editorOption: {},
                addImgRange: '',
                toItemId: null,
                appName: null,
                focusForm: {},
                // appNames:[],
                imgData: {
                    accept: "image/gif, image/jpeg, image/png, image/jpg,image/webp"
                },
                pickerOptions0: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                },
                typeList: [{code: '1', title: '图文详情'}, {code: '2', title: '推广APP'}, {code: '3', title: '跳转链接'}],
                rule: {
                    name: [
                        {required: true, message: '请输入焦点图标题', trigger: 'blur'},
                    ],
                    item: [
                        {required: true, message: '请选择焦点图片', trigger: 'blur'}
                    ]
                }
            }
        },
        created() {
            // console.log(this.$route.query.dataId);
            // if (this.$route.query.dataId != undefined) {
            //     this.$ajax.get(BaseUrl + 'banner/' + this.$route.query.dataId, {
            //         headers: {
            //             'token': sessionStorage.getItem('token'),
            //             'device': this.$route.query.type
            //         }
            //     }).then(response => {
            //         console.log(response)
            //         if (response.data.flag == 200) {
            //             this.focusForm = response.data.data;
            //             this.uploadIconUrl = response.data.data.picAddr;
            //             if (response.data.data.text != undefined) {
            //                 this.content = response.data.data.text;
            //             }
            //             if (response.data.data.toItemId != undefined) {
            //                 this.url = response.data.data.toItemId
            //             }
            //             if (response.data.data.toItem != undefined) {
            //                 this.toItemId = response.data.data.toItem.appId;
            //                 this.appName = response.data.data.toItem.appName;
            //             }
            //             this.timePeriod = [moment.utc(this.focusForm.startTime).local(), moment.utc(this.focusForm.endTime).local()]
            //         } else if (response.data.flag == 201) {
            //             this.$alert(response.data.msg + '，请重新登录', '提示', {
            //                 confirmButtonText: '确定',
            //                 callback: action => {
            //                     this.$router.push('/')
            //                 }
            //             });
            //         }
            //     })
            // }
            
        },
        methods: {
            mapping(event) {//图片上传
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
                        // const deleteArr = ["fileName", "type", "host"];
                        // deleteArr.forEach(item => {
                        //     // 删除掉不需要传的参数
                        //     delete uploadPolicy[item];
                        // });

                        let img1 = event.target.files[0];
                        let type = img1.type; //文件的类型，判断是否是图片
                        let size = img1.size; //文件的大小，判断图片的大小
                        if (this.imgData.accept.indexOf(type) == -1) {
                            alert("请选择我们支持的图片格式！");
                            return false;
                        }
                        const form = new FormData();

                        let paramsObj = {};
                        // for (let key in uploadPolicy) {
                        //   // 需要传的参数 遍历添加到form
                        //  form.append(key, uploadPolicy[key]);
                        // }
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
                            // this.uploadImageUrl = response.data.data;
                            this.focusForm.item = response.data.data;
                        });
                    });
            },
            // changeType() {
            //     this.content = null;
            //     this.toItemId = null;
            //     this.appName = null;
            // },
            GMTToStr(time) {
                var date = time;
                var Y = date.getFullYear();
                var M = date.getMonth() + 1;
                M = M < 10 ? '0' + M : M;// 不够两位补充0
                var D = date.getDate();
                D = D < 10 ? '0' + D : D;
                var H = date.getHours();
                H = H < 10 ? '0' + H : H;
                var Mi = date.getMinutes();
                Mi = Mi < 10 ? '0' + Mi : Mi;
                var S = date.getSeconds();
                S = S < 10 ? '0' + S : S;
                return Y + '-' + M + '-' + D + ' ' + H + ':' + Mi + ':' + S;
            
            },
            goStartup(){//前往启动页
                this.$router.push({path: 'startupPage'})

            },
            delStartup(){//删除

            },
            save(focusForm) {
                console.log( this.timePeriod)
                this.focusForm.item='image--1411105531-569206847739414689dd0e86ed7210f7.png'
                this.$refs.focusForm.validate(async (valid) => {
                    if (valid && this.url != null && this.timePeriod != null && this.timePeriod[0] >= new Date()) {
                        focusForm.startDate = moment(this.timePeriod[0]).utc().format('YYYY-MM-DD HH:mm:ss');
                        focusForm.endDate = moment(this.timePeriod[1]).utc().format('YYYY-MM-DD HH:mm:ss');
                        if (this.url != null) {
                            focusForm.linkText = this.url
                        }
                        if (this.$route.query.dataId == '' || this.$route.query.dataId == undefined) {
                            this.$ajax({
                                method: "POST",
                                url: BaseUrl + 'startUpShow/add',
                                data: focusForm,
                                headers: {'token': sessionStorage.getItem('token'), 'device': this.$route.query.type}
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
                                    this.$router.push({path: 'startupPage'})
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
                            // this.$ajax({
                            //     method: "POST",
                            //     url: BaseUrl + 'banner/update',
                            //     data: focusForm,
                            //     headers: {'token': sessionStorage.getItem('token'), 'device': this.$route.query.type}
                            // }).then(response => {
                            //     if (response.data.flag == 500) {
                            //         this.$alert(response.data.msg, '提示', {
                            //             confirmButtonText: '确定',
                            //             callback: action => {
                            //                 this.$message({
                            //                     type: 'info',
                            //                     message: `error: ${ response.data.msg + ',请重试'}`
                            //                 });
                            //             }
                            //         });
                            //     } else if (response.data.flag == 200) {
                            //         this.$alert(response.data.msg, '提示', {
                            //             confirmButtonText: '确定',
                            //             callback: action => {
                            //                 if (this.$route.query.type == 'android') {
                            //                     this.$router.push({path: '/focusImg'})
                            //                 } else if (this.$route.query.type == 'ios') {
                            //                     this.$router.push({path: '/iosFocusImg'})
                            //                 }
                            //             }
                            //         });
                            //     } else if (response.data.flag == 201) {
                            //         this.$alert(response.data.msg + '，请重新登录', '提示', {
                            //             confirmButtonText: '确定',
                            //             callback: action => {
                            //                 this.$router.push('/')
                            //             }
                            //         });
                            //     }
                            // });
                        }
                    } else if (this.timePeriod == null) {
                        this.$alert('请选择时间', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$message({
                                    type: 'info',
                                    message: `请重试！`
                                });
                            }
                        });
                        return false;
                    } else if (this.timePeriod[0] < new Date()) {
                        this.$alert('开始时间不能小于当前时间', {
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
                   console.log(this.content)
                   if(this.timePeriod!=null){
                     focusForm.startDate=this.GMTToStr(this.timePeriod[0]);
                     focusForm.endDate=this.GMTToStr(this.timePeriod[1]);
                   }
                //    if(this.content!=null){
                //    focusForm.text=this.content;
                //    }else{
                //        focusForm.text=null
                //    }
                //    if(this.toItemId!=null){
                //        focusForm.toItemId=this.toItemId;
                //    }else{
                //        focusForm.toItemId=null
                //    }
                
                console.log(focusForm)
            },
            deleteImg(){//删除图片
                // this.$ajax({
                //     method: "POST",
                //     url: BaseUrl + 'common/cleanImage',
                //     params: {objectName:this.editdata.image},
                //     headers: {'token': sessionStorage.getItem('token')}
                // }).then(response => {
                //     // console.log(response);
                //     if (response.data.flag == 500) {
                //         this.$alert(response.data.msg, '提示', {
                //             confirmButtonText: '确定',
                //             callback: action => {
                //                 this.$message({
                //                     type: 'info',
                //                     message: `${ response.data.msg + ',请重试'}`
                //                 });
                //             }
                //         });
                //     } else if (response.data.flag == 200) {
                //         this.editdata.image=""
                //     } else if (response.data.flag == 201) {
                //         this.$alert(response.data.msg + '，请重新登录', '提示', {
                //             confirmButtonText: '确定',
                //             callback: action => {
                //                 this.$router.push('/')
                //             }
                //         });
                //     }
                // });
            }

        },
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
        .el-form-item__error {
            border: 0px !important;
            width: 148px;
            height: 10px;
            line-height: 10px;
        }
    }

    .demo-upload-list img {
        width: 50%;
        height: 50%;
    }
    .updatas {
            position: relative
    }
    .btnone {
            cursor: pointer;
            position: absolute;
            left: 170px;
            top: 105px;
            width: 70px;
            height: 40px
        }
</style>
