<template>
    <div>
        <el-row style="margin-top: 20px;">
            <el-col :span="14" :offset="4">
                <el-form :model="popupForm" ref="popupForm" :rules="rule" label-width="110px" class="form food_form">
                    <el-form-item label="弹窗名称：" prop="title">
                        <el-input v-model="popupForm.title"></el-input>
                    </el-form-item>
                    <el-form-item label="弹窗次数："  prop="times">

                            <el-input  placeholder="每日弹出上限" v-model="popupForm.times" style="width:200px;" type="number" min="1"></el-input>
                    </el-form-item>
                    <el-form-item label="背景图：" >
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
                                    <el-radio v-model="pstyle" label="2">选择弹窗</el-radio>
                                </div>
                                <div>
                                    左边按钮
                                    <el-input style="width:140px;margin-bottom:10px" v-bind:disabled="pstyle!=2" placeholder="默认文案：取消" v-model="leftTxt"></el-input>
                                </div>
                                <div>
                                    右边按钮
                                    <el-input style="width:140px;"  v-bind:disabled="pstyle!=2" placeholder="默认文案：确定" v-model="rightTxt"></el-input>
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
                                    <el-radio v-model="pstyle" label="1">单选弹窗</el-radio>
                                </div>
                                <div>
                                    中间按钮
                                    <el-input style="width:140px;margin-bottom:10px" v-bind:disabled="pstyle!=1" v-model="centerTxt" placeholder="默认文案：确定"></el-input>
                                </div>
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item label="弹窗退出类型：" >
                        <div>
                            <el-radio v-model="qstyle" label="1">允许关闭</el-radio>
                        </div>
                        <div>
                            <el-radio v-model="qstyle" label="0">禁止关闭</el-radio>
                        </div>
                    </el-form-item>
                    <el-form-item label="推广地址：" prop="url" >
                        <el-input v-model="popupForm.url"></el-input>
                    </el-form-item>
                    <el-form-item label="推广周期：" prop="timePeriod">
                        <el-date-picker
                            v-model="timeRound"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :default-time="['00:00:00', '23:59:59']"
                            :picker-options="pickerOptions0">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="goback()">返回</el-button>
                        <el-button type="primary" @click="save(popupForm)">保存</el-button>
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
                pstyle:'2',
                qstyle:'1',
                timeRound:[],
                popupForm: {
                },
                centerTxt:'确定',
                leftTxt:'取消',
                rightTxt:'确定',
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
                    times:[
                        {required: true, message: '请输入弹出次数', trigger: 'blur'},
                    ],
                    picAddr: [
                        {required: true, message: '请选择弹窗背景图', trigger: 'blur'}
                    ],
                    url: [
                        {required: true, message: '请输入推广地址', trigger: 'blur'}
                    ],
                },
                popupList:[]
            }
        },
        created() {
            // console.log(this.$route.query.id);
            if (this.$route.query.id != undefined) {
                this.popupList=JSON.parse(sessionStorage.getItem('popupList'))
                this.popupList.forEach(item=>{
                    if(item.id==this.$route.query.id){
                        this.popupForm=item
                    }
                });
                if(this.popupForm.pstyle==2){
                    this.pstyle='2';
                    this.leftTxt=this.popupForm.btntxt.split(';')[0];
                    this.rightTxt=this.popupForm.btntxt.split(';')[1]
                }else{
                    this.pstyle='1';
                    this.centerTxt=this.popupForm.btntxt
                }
                this.qstyle=this.popupForm.qstyle.toString();
                this.timeRound=[moment.utc(this.popupForm.stime).local().format('YYYY-MM-DD'),moment.utc(this.popupForm.etime).local().format('YYYY-MM-DD')];
                if(this.popupForm.image!==undefined) {
                    this.uploadIconUrl = this.popupForm.image
                }
            }
        },
        methods: {
            add_img(event) {
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
            deletePic(){
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
            },
            //返回
            goback(){
                this.$router.push({path:'/popupDeploy'})
            },
            save(popupForm) {
                this.$refs.popupForm.validate(async (valid) => {
                    if (valid) {
                        if(this.popupForm.times>1){
                        this.popupForm.times=Number(this.popupForm.times)
                        }else{
                            this.$alert('弹窗次数应大于0 ', '提示', {
                                confirmButtonText: '确定',
                            });
                            return false
                        }
                        this.popupForm.image=this.uploadIconUrl;
                        this.popupForm.stime=moment(this.timeRound[0]).utc().format('YYYY-MM-DD HH:mm:ss');
                        this.popupForm.etime=moment(this.timeRound[1]).utc().format('YYYY-MM-DD HH:mm:ss');
                        if(this.pstyle=='2'){
                            this.popupForm.btntxt=this.leftTxt+';'+this.rightTxt
                        }else{
                            this.popupForm.btntxt=this.centerTxt
                        }
                        this.popupForm.pstyle=Number(this.pstyle)
                        this.popupForm.qstyle=Number(this.qstyle)
                        if (this.$route.query.id == '' || this.$route.query.id == undefined) {
                            this.$ajax({
                                method: "POST",
                                url: BaseUrl + 'popup/new',
                                data:  this.popupForm,
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
                                            this.$router.push({path: '/popupDeploy'})
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
                                url: BaseUrl + 'popup//modify',
                                data: this.popupForm,
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
                                            this.$router.push({path: '/popupDeploy'})
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
