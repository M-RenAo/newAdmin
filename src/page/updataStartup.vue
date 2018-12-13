<template>
    <div>
        <el-row style="margin-top: 20px;">
            <el-col :span="20" style="margin-left:30px">
                <el-form :model="focusForm" ref="focusForm" :rules="rule" label-width="110px" class="form food_form">
                    <el-form-item label="广告商名称：" prop="name">
                        <el-input v-model="focusForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="启动图：">
                        <div  class="start_pics">
                         <div class="start_pics_type">
                              <div class="start_pics_type1">
                                <img :src="'https://imapp-image.oss-cn-hangzhou.aliyuncs.com/'+startPicTypeOne"
                                     style="width:140px;height:200px;"
                                     v-if="startPicTypeOne!==''&&startPicTypeOne!==undefined">
                              </div>
                              <div class="start_pic_button">
                                  <div>上传尺寸为：1920*1080</div>
                                  <div style="position: relative">
                                <el-button type="primary" v-if="startPicTypeOne===undefined||startPicTypeOne===''"
                                       class="btnone"><span>上传</span> <input @change='mapping1' type="file"
                                        style="opacity: 0;width: 70px;height: 40px;z-index:222;position: absolute; top: 0px; left: 0px;"
                                        class="upload"></el-button>
                                 <el-button type="primary" v-if="startPicTypeOne!==undefined&&startPicTypeOne!==''"
                                       @click="deleteImg1" class="btnone">删除
                                 </el-button>
                                  </div>
                              </div>
                            </div>
                            <div class="start_pics_type">
                                <div class="start_pics_type1">
                                    <img :src="'https://imapp-image.oss-cn-hangzhou.aliyuncs.com/'+startPicTypeTwo"
                                         style="width:140px;height:200px;"
                                         v-if="startPicTypeTwo!==''&&startPicTypeTwo!==undefined">
                                </div>
                                <div class="start_pic_button">
                                    <div>上传尺寸为：2688 * 1242</div>
                                    <div style="position: relative">
                                    <el-button type="primary" v-if="startPicTypeTwo===undefined||startPicTypeTwo===''"
                                               class="btnone"><span>上传</span> <input @change='mapping2' type="file"
                                                                                     style="opacity: 0;width: 70px;height: 40px;z-index:222;position: absolute; top: 0px; left: 0px;"
                                                                                     class="upload"></el-button>
                                    <el-button type="primary" v-if="startPicTypeTwo!==undefined&&startPicTypeTwo!==''"
                                               @click="deleteImg2" class="btnone">删除
                                    </el-button>
                                    </div>
                                </div>
                            </div>
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
                            type="daterange"
                            align="right"
                            :picker-options="pickerOptions0"
                            :default-time="['00:00:00', '23:59:59']"
                        >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="delStartup" v-if="this.$route.query.dataId">删除</el-button>
                        <el-button @click="goStartup" v-if="!this.$route.query.dataId">返回</el-button>
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
                focusForm: {
                    name:'',
                    linkText:"",
                    startDate:"",
                    endDate:""
                },
                startPicTypeOne:'',
                startPicTypeTwo:'',
                // appNames:[],
                imgData: {
                    accept: "image/gif, image/jpeg, image/png, image/jpg,image/webp"
                },
                pickerOptions0: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                },
                rule: {
                    name: [
                        {required: true, message: '请输入广告商名称', trigger: 'blur'},
                    ],
                    item: [
                        {required: true, message: '请选择启动图片', trigger: 'blur'}
                    ]
                }
            }
        },
        created() {
            // console.log(this.$route.query.dataId);
            if (this.$route.query.dataId != undefined) {
                this.$ajax.get(BaseUrl + "startUpShow/info",{
                    params:{
                    pageCode:this.$route.query.page,
                    pageSize:this.$route.query.size,
                    state:this.$route.query.state
                },headers: {'token': sessionStorage.getItem('token')}}).then(res => {
                    this.focusForm.name=res.data.data.list[this.$route.query.nums].name//广告商名称
                    this.startPicTypeOne=JSON.parse(res.data.data.list[this.$route.query.nums].item)[0].img//启动图
                    this.startPicTypeTwo=JSON.parse(res.data.data.list[this.$route.query.nums].item)[1].img
                    this.focusForm.linkText=res.data.data.list[this.$route.query.nums].linkText//链接地址
                    this.url=this.focusForm.linkText
                    this.focusForm.id=this.$route.query.id
                    // this.focusForm.startDate=res.data.data.list[this.$route.query.nums].startPushTime//开始时间
                    // this.focusForm.startDate=res.data.data.list[this.$route.query.nums].startPushTime//开始时间
                    // this.focusForm=res.data.data.list[this.$route.query.nums]
                    let stime=res.data.data.list[this.$route.query.nums].startPushTime
                    let etime=res.data.data.list[this.$route.query.nums].endPushTime
                    if(stime==0&&etime==0){
                        this.timePeriod=[]
                    }else{
                    this.timePeriod=[moment.utc(stime).local(),moment.utc(etime).local()]
                    }

                })
            }

        },
        methods: {
            mapping1(event) {//图片上传
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
                            this.startPicTypeOne = response.data.data;
                        });
                    });
            },
            mapping2(event) {//图片上传
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
                            this.startPicTypeTwo = response.data.data;
                        });
                    });
            },
            // changeType() {
            //     this.content = null;
            //     this.toItemId = null;
            //     this.appName = null;
            // },
            goStartup(){//前往启动页
                this.$router.push({path: 'startupPage'})

            },
            delStartup(){//删除
                this.$ajax({
                    method: "POST",
                    url: BaseUrl + 'startUpShow/del',
                    params: {
                        id:this.$route.query.dataId
                    },
                    headers: {'token': sessionStorage.getItem('token')}}).then(response => {
                        if(response.data.flag == 200){
                            this.$message({
                                showClose: true,
                                message:`${response.data.msg}`,
                                type: 'success'
                            });
                            this.$router.push({path: 'startupPage'})
                        }
                })
            },
            save(focusForm) {
                this.$refs.focusForm.validate(async (valid) => {
                    if (valid && this.url != null && this.timePeriod != null&&this.startPicTypeOne!==''&&this.startPicTypeTwo!=='') {
                        focusForm.startPushTime= moment(this.timePeriod[0]).format('x')
                        focusForm.endPushTime = moment(this.timePeriod[1]).format('x')
                        if (this.url != null) {
                            focusForm.linkText = this.url
                        }
                        focusForm.item=JSON.stringify([{img:this.startPicTypeOne,width:'1920',height:'1080'},{img:this.startPicTypeTwo,width:'2688',height:'1242'}])
                        if (this.$route.query.dataId == '' || this.$route.query.dataId == undefined) {
                            this.$ajax({
                                method: "POST",
                                url: BaseUrl + 'startUpShow/add',
                                data: focusForm,
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
                                    // this.$alert(response.data.msg, '提示', {
                                    //     confirmButtonText: '确定',
                                    //     callback: action => {
                                    //         this.$router.push({path: 'startupPage'})
                                    //     }
                                    // });
                                    this.$message({
                                        showClose: true,
                                        message:`${response.data.msg}`,
                                        type: 'success'
                                    });
                                    this.$router.push({path: 'startupPage'})
                                }else if (response.data.flag == 201) {
                                    this.$alert(response.data.msg + '，请重新登录', '提示', {
                                        confirmButtonText: '确定',
                                        callback: action => {
                                            this.$router.push('/')
                                        }
                                    });
                                }
                            });
                        } else {
                            this.focusForm.id=this.$route.query.dataId
                            this.$ajax({
                                method: "POST",
                                url: BaseUrl + 'startUpShow/update',
                                data: focusForm,
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
                                    this.$message({
                                        showClose: true,
                                        message:`${response.data.msg}`,
                                        type: 'success'
                                    });
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
                    }
                })


            },
            deleteImg1(){//删除图片

                this.$ajax({
                    method: "POST",
                    url: BaseUrl + 'common/cleanImage',
                    params: {objectName:this.startPicTypeOne},
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
                        this.startPicTypeOne=''
                        console.log(this.focusForm)
                    } else if (response.data.flag == 201) {
                        this.$alert(response.data.msg + '，请重新登录', '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$router.push('/')
                            }
                        });
                    }
                });

            },
            deleteImg2(){//删除图片

                this.$ajax({
                    method: "POST",
                    url: BaseUrl + 'common/cleanImage',
                    params: {objectName:this.startPicTypeTwo},
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
                        this.startPicTypeTwo=''
                        console.log(this.focusForm)
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

        },
        watch:{

        }
    };
</script>

<style lang="less" scoped>
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


    .demo-upload-list img {
        width: 50%;
        height: 50%;
    }
    .updatas {
            position: relative
    }
    .btnone {
            cursor: pointer;
            /*position: absolute;*/
            /*left: 170px;*/
            /*top: 105px;*/
            width: 70px;
            height: 40px
        }
    .start_pics{
        display: flex;
        .start_pics_type{
            display: flex;
            align-items: flex-end;
            margin-right: 10px;
        }
        .start_pics_type1{
            width:140px;
            height: 200px;
            border:1px #333 dashed;
        }
        .start_pic_button{
            margin-left: 10px;
            position: relative;
        }
    }
</style>
