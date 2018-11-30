<template>
    <div>
        <el-row style="margin-top: 20px;">
            <el-col :span="14" :offset="4">
                <el-form :model="focusForm" ref="focusForm" :rules="rule" label-width="110px" class="form food_form">
                    <el-form-item label="弹窗名称：" prop="title">
                        <el-input v-model="focusForm.title"></el-input>
                    </el-form-item>
                    <el-form-item label="弹窗次数：" >

                            <el-input  placeholder="每日弹出上限" v-model="focusForm.title" style="width:200px;"></el-input>
                    </el-form-item>
                    <el-form-item label="背景图：" prop="picAddr">
                        <div style="display: flex;align-items:flex-end;">
                            <div style="width:150px;height:150px;border: 1px #999 dashed;margin-right: 10px"><img
                                :src="'https://imapp-image.oss-cn-hangzhou.aliyuncs.com/'+advertisePic"
                                v-if="uploadIconUrl!==null&&uploadIconUrl!=''" style="width:100%;height:100%;"/></div>
                            <el-button type="primary" v-if="uploadIconUrl===null" style="position: relative">
                                <span>上传</span> <input @change='add_img' type="file"
                                                       style="opacity: 0;width:70px;height: 40px;position: absolute;top:0;left:0">
                            </el-button>
                            <el-button type="primary" v-if="uploadIconUrl!==null" @click="deletePic()">删除
                            </el-button>
                        </div>
                    </el-form-item>
                    <el-form-item label="弹窗样式类型：">
                        <div style="display: flex">
                            <div class="pupup-type-choice">
                                <div class="popup-type">
                                    <div class="popup-type-header-title">
                                        提示
                                    </div>
                                    <div>确定要退出？</div>
                                    <div class="button-popup-type">
                                        <el-button>否</el-button>
                                        <el-button>是</el-button>
                                    </div>
                                </div>
                                <div>
                                    <el-radio v-model="pupupType" label="1">选择弹窗</el-radio>
                                </div>
                                <div>
                                    左边按钮
                                    <el-input style="width:140px;margin-bottom:10px" v-bind:disabled="pupupType!=1" placeholder="默认文案：取消"></el-input>
                                </div>
                                <div>
                                    右边按钮
                                    <el-input style="width:140px;"  v-bind:disabled="pupupType!=1" placeholder="默认文案：确定"></el-input>
                                </div>
                            </div>
                            <div class="pupup-type-choice">
                                <div class="popup-type">
                                    <div class="popup-type-header-title">
                                        提示
                                    </div>
                                    <div>确定要退出？</div>
                                    <div class="button-popup-type">
                                        <el-button>是</el-button>
                                    </div>
                                </div>
                                <div>
                                    <el-radio v-model="pupupType" label="2">单选弹窗</el-radio>
                                </div>
                                <div>
                                    中间按钮
                                    <el-input style="width:140px;margin-bottom:10px" v-bind:disabled="pupupType!=2" placeholder="默认文案：确定"></el-input>
                                </div>
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item label="弹窗退出类型：" >
                        <div>
                            <el-radio v-model="closeType" label="1">允许关闭</el-radio>
                        </div>
                        <div>
                            <el-radio v-model="closeType" label="2">禁止关闭</el-radio>
                        </div>
                    </el-form-item>
                    <el-form-item label="推广地址：" prop="url" >
                        <el-input v-model="url"></el-input>
                    </el-form-item>
                    <el-form-item label="推广周期：" prop="timePeriod">
                        <el-date-picker
                            v-model="timeRound"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :picker-options="pickerOptions0">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="goback()">返回</el-button>
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
                uploadIconUrl: null,
                editorOption: {},
                addImgRange: '',
                toItemId: null,
                appName: null,
                advertisePic:'',
                pupupType:'1',
                closeType:'1',
                timeRound:[],
                focusForm: {
                    type: '1',
                },
                radio:'1',
                // appNames:[],
                imgData: {
                    accept: "image/gif, image/jpeg, image/png, image/jpg,image/webp"
                },
                pickerOptions0: {
                    disabledDate(time) {
                        return time.getTime() < Date.now();
                    }
                },
                typeList: [{code: '1', title: '图文详情'}, {code: '2', title: '推广APP'}, {code: '3', title: '跳转链接'}],
                rule: {
                    title: [
                        {required: true, message: '请输入弹窗名称', trigger: 'blur'},
                    ],
                    picAddr: [
                        {required: true, message: '请选择弹窗背景图', trigger: 'blur'}
                    ],
                    url: [
                        {required: true, message: '请输入推广地址', trigger: 'blur'}
                    ],
                }
            }
        },
        created() {
            // console.log(this.$route.query.id);
            if (this.$route.query.id != undefined) {
                this.$ajax.get(BaseUrl + 'banner/' + this.$route.query.id, {
                    headers: {
                        'token': sessionStorage.getItem('token'),
                        'device': this.$route.query.type
                    }
                }).then(response => {
                    // console.log(response)
                    if (response.data.flag == 200) {
                        this.focusForm = response.data.data;
                        this.uploadIconUrl = response.data.data.picAddr;
                        if (response.data.data.text != undefined) {
                            this.content = response.data.data.text;
                        }
                        if (response.data.data.toItemId != undefined) {
                            this.url = response.data.data.toItemId
                        }
                        if (response.data.data.toItem != undefined) {
                            this.toItemId = response.data.data.toItem.appId;
                            this.appName = response.data.data.toItem.appName;
                        }
                        this.timePeriod = [moment.utc(this.focusForm.startTime).local(), moment.utc(this.focusForm.endTime).local()]
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
            // loadAll() {
            //     this.$ajax.get(BaseUrl+'apply/all/0/0/1').then(response => {
            //        console.log(response)
            //         if(response.data.flag==200){
            //             this.getData()
            //             // var that=this;
            //             // this.adminList.forEach(function(item,index){
            //             //     if(item.id==that.deleteId){
            //             //         that.adminList.splice(index,1);
            //             //         that.txcount=that.txcount-1
            //             //     }
            //             // })
            //         }else{
            //             this.$alert(response.data.msg, '提示', {
            //                 confirmButtonText: '确定',
            //             });
            //         }
            //     })
            //     return ;
            // },
            querySearch(queryString, cb) {
                // var appNames = this.appNames;

                this.$ajax.get(BaseUrl + 'apply/sign/' + queryString, {
                    headers: {
                        'token': sessionStorage.getItem('token'),
                        'device': this.$route.query.type
                    }
                }).then(response => {
                    // console.log(response)
                    if (response.data.flag == 200) {
                        // this.appNames=response.data.data
                        const currentArray = response.data.data;
                        const appNameArray = [];
                        currentArray.forEach((item) => {
                            const appNameObj = {value: item.appName, fileId: item.fileId};
                            appNameArray.push(appNameObj);
                        })
                        cb(appNameArray)
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
                        });
                    }
                })
                clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                    // cb(results);
                }, 3000 * Math.random());
            },
            // createStateFilter(queryString) {
            //     return (state) => {
            //         return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            //     };
            // },
            handleSelect(item) {
                // console.log('>>>>>>>item', item.fileId);
                this.toItemId = item.fileId;
                // console.log(item)
                this.appName = item.value;
            },
            add_img(event) {
                if(this.uploadIconUrl!==null&&event.target.files[0]!==undefined){
                    this.$ajax({
                        method: "POST",
                        url: BaseUrl + 'common/cleanImage',
                        params: {objectName:this.uploadIconUrl},
                        headers: {'token': sessionStorage.getItem('token')}
                    }).then(response => {
                        // console.log(response);
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
                        // const deleteArr = ["fileName", "type", "host"];
                        // deleteArr.forEach(item => {
                        //     // 删除掉不需要传的参数
                        //     delete uploadPolicy[item];
                        // });

                        let img1 = event.target.files[0];
                        let type = img1.type; //文件的类型，判断是否是图片
                        let size = img1.size; //文件的大小，判断图片的大小
                        // console.log(size)
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
                            data: form
                        }).then(response => {
                            this.uploadIconUrl = response.data.data;
                        });
                    });
            },
            //返回
            goback(){
                this.$router.push({path:'/popupDeploy'})
            },
            save(focusForm) {
                // console.log( this.timePeriod)
                this.$refs.focusForm.validate(async (valid) => {
                    if (valid) {
                        focusForm.startTime = moment(this.timePeriod[0]).utc().format('YYYY-MM-DD HH:mm:ss');
                        focusForm.endTime = moment(this.timePeriod[1]).utc().format('YYYY-MM-DD HH:mm:ss');
                        if (this.content != null && focusForm.type == 1) {
                            focusForm.text = this.content;
                        }
                        if (this.toItemId != null) {
                            focusForm.toItemId = this.toItemId;
                        } else if (this.url != null && focusForm.type == 3) {
                            focusForm.toItemId = this.url
                        } else {
                            focusForm.toItemId = null
                        }
                        if (this.$route.query.id == '' || this.$route.query.id == undefined) {
                            this.$ajax({
                                method: "POST",
                                url: BaseUrl + 'banner/add',
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
                                    this.$alert(response.data.msg, '提示', {
                                        confirmButtonText: '确定',
                                        callback: action => {
                                            if (this.$route.query.type == 'android') {
                                                this.$router.push({path: '/focusImg'})
                                            } else if (this.$route.query.type == 'ios') {
                                                this.$router.push({path: '/iosFocusImg'})
                                            }
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
                                url: BaseUrl + 'banner/update',
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
                                    this.$alert(response.data.msg, '提示', {
                                        confirmButtonText: '确定',
                                        callback: action => {
                                            if (this.$route.query.type == 'android') {
                                                this.$router.push({path: '/focusImg'})
                                            } else if (this.$route.query.type == 'ios') {
                                                this.$router.push({path: '/iosFocusImg'})
                                            }
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
                    } else{
                        this.$alert('请填写完整', '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$message({
                                    type: 'info',
                                    message: `${'请重试'}`
                                });
                            }
                        });
                    }
                })
                //    console.log(this.content)
                //    if(this.timePeriod!=null){
                //      focusForm.startTime=this.GMTToStr(this.timePeriod[0]);
                //      focusForm.endDate=this.GMTToStr(this.timePeriod[1]);
                //    }
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
                //
                // console.log(focusForm)
            }

        },
    };
</script>

<style lang="less" scoped>
    @import "../style/mixin";
    .pupup-type-choice{
        width:202px;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-right: 40px;
    }
    .popup-type{
        width:200px;
        height:150px;
        border: 1px #ccc solid;
        border-radius:10px;
        display: flex;
        flex-direction: column;
        align-items: center;

    }
    .popup-type-header-title{
        font-size: 20px;
    }
    .button-popup-type{
        margin-top: 25px;
    }
</style>
