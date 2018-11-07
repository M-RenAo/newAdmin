<template>
    <div>
        <el-row style="margin-top: 20px;">
            <el-col :span="14" :offset="4">
                <el-form :model="appForm" ref="appForm" :rules="rule" label-width="110px" class="form food_form">
                    <div>
                        <div style="display: flex;margin-bottom: 20px;">
                            <h4>应用版本：</h4>
                            <!--<div style="width:100px;height:100px;margin-left:10px;"><img :src="'https://hug-image.oss-cn-hangzhou.aliyuncs.com/'+appForm.fileIcon"-->
                                                                                         <!--style="width:100px;height:100px;"/></div>-->
                        </div>
                        <el-form-item label="版本号：">
                            {{appForm.fileVersion}}
                        </el-form-item>
                        <el-form-item label="上传时间：">
                            {{appForm.fileDate}}
                        </el-form-item>
                        <!--<el-form-item label="历史版本：" prop="name">-->
                        <!--</el-form-item>-->

                    </div>
                    <div>
                        <div style="display: flex;margin-bottom: 20px;">
                            <h4>应用信息：</h4>
                        </div>
                        <el-form-item label="应用名称：" prop="appName">
                            <el-input v-model="appForm.appName"></el-input>
                        </el-form-item>
                        <el-form-item label="应用分类：" prop="fileTag" >
                            <el-select v-model="appForm.fileTag" placeholder="请选择" >
                                <el-option key="0" label="未定义" value="0">
                                </el-option>
                                <el-option
                                    v-for="item in tagList"
                                    :key="item.code"
                                    :label="item.title"
                                    :value="item.code">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="应用模块：" >
                            <el-select v-model="value" multiple placeholder="请选择">
                                <el-option key="0" label="未定义" value="0-1">
                                </el-option>
                                <el-option
                                    v-for="item in positionList"
                                    :key="item.code"
                                    :label="item.title"
                                    :value="item.code">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="官方：" prop="isOfficial">
                            <el-select v-model="appForm.isOfficial" placeholder="请选择">
                                <el-option
                                    v-for="titem in offical"
                                    :key="titem.code"
                                    :label="titem.title"
                                    :value="titem.code">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="应用状态：" prop="fileState">
                            <el-select v-model="appForm.fileState" placeholder="请选择">
                                <el-option
                                    v-for="nitem in typeList"
                                    :key="nitem.code"
                                    :label="nitem.title"
                                    :value="nitem.code">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="下载地址：" prop="fileDir" v-if="$route.query.type=='ios'">
                            <el-input v-model="appForm.fileDir"></el-input>
                        </el-form-item>
                        <el-form-item label="包名："  v-if="$route.query.type=='ios'">
                            <el-input v-model="appForm.packageName"></el-input>
                        </el-form-item>
                        <el-form-item label="安装包大小：" prop="fileSize" v-if="$route.query.type=='ios'">
                            <el-input v-model="appForm.fileSize" style="width:60%"></el-input>M
                        </el-form-item>
                        <el-form-item label="应用简介" prop="fileSummary">
                            <el-input
                                type="textarea"
                                :rows="2"
                                :maxlength='20'
                                placeholder="请输入内容"
                                v-model="appForm.fileSummary">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="应用描述：" prop="fileMessage">
                            <el-input
                                type="textarea"
                                :rows="2"
                                placeholder="请输入内容"
                                v-model="appForm.fileMessage">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="应用图标：" prop="icon" class="icon-el-update">
                            <input class="upload" @change='add_img' type="file"
                                   style="opacity: 0;width: 100px;height: 100px;z-index:222;">
                            <div class="img-wraps" v-if="uploadIconUrl!=''">
                                <img :src="'https://imapp-image.oss-cn-hangzhou.aliyuncs.com/'+ uploadIconUrl"
                                     class="" style="width: 100px;height: 100px;"/>
                            </div>
                        </el-form-item>
                        <!--<el-form-item label="应用图标：" prop="name">-->
                            <!--<div style="width:100px;height:100px;"><img :src="'https://hug-image.oss-cn-hangzhou.aliyuncs.com/'+appForm.fileIcon"-->
                                                                        <!--style="width:100px;height:100px;"/></div>-->
                        <!--</el-form-item>-->
                        <el-form-item label="应用图片：" prop="iconList">
                            <div style="max-width:700px;height:auto;">
                                <div style="position: relative;width:200px;height:auto;margin-right: 10px;display: inline-block" v-for="(item,index) in  showList" v-if="item!=''">
                                    <img :src=" 'https://imapp-image.oss-cn-hangzhou.aliyuncs.com/'+item"
                                         style="width:200px;height:auto;"  @click="bigImg(index)" v-if="item!=''"/>
                                    <i class="delete el-icon-close" @click="removeImage(index)" v-if="item!=''"></i>
                                </div>
                            </div>
                            <div><input type="file"  @change='add_imgs'/></div>
                        </el-form-item>
                        <!--<el-form-item label="历史版本：" prop="name">-->
                        <!--</el-form-item>-->
                    </div>
                    <div>
                        <div style="margin-bottom: 20px;">
                            <h4>审核状态： <span style="    font-size: 14px;color: #48576a;font-weight:normal">审核通过</span></h4>
                        </div>
                    </div>
                    <el-form-item>
                        <el-button type="primary" @click="saveUpdate(appForm)">保存</el-button>
                    </el-form-item>
                </el-form>

            </el-col>
        </el-row>
        <div class="imgMask" v-if="showBigImg" @click.stop="showBigImg=!showBigImg">
            <i class="prev el-icon-arrow-left" @click.stop="prev"></i>
            <div class="showImg">
                <img class="bigImg" :src="'https://imapp-image.oss-cn-hangzhou.aliyuncs.com/'+showList[num]">
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
    let moment=require('moment')
    export default {
        data() {
            return {
                state:'',
                remarks:'',
                showBigImg: false,
                num:0,
                showList:[],
                appForm:{
                },
                fileDate:'',
                value:[],
                tagList:[],
                uploadIconUrl:'',
                imgData: {
                    accept: "image/gif, image/jpeg, image/png, image/jpg,image/webp"
                },
                positionList:[],
                typeList:[],
                offical:[{'title':'是','code':'1'},{'title':'否','code':'0'}],
                rule: {
                    appName: [
                        {required: true, message: '请输入应用名称', trigger: 'blur'},
                    ],
                    // fileTag: [
                    //     {required: true, message: '请选择分类', trigger: 'blur'}
                    // ],
                    isOfficial:[
                        {required: true, message: '请选择是否官方', trigger: 'blur'}
                    ],
                    fileState:[
                        {required: true, message: '请选择应用状态', trigger: 'blur'}
                    ],
                    fileMessage: [
                        {required: true, message: '请输入介绍', trigger: 'blur'}
                    ],fileSummary:[
                        {required: true, message: '请输入简介', trigger: 'blur'}
                    ],fileDir:[
                        {required: true, message: '请输入下载地址', trigger: 'blur'}
                    ]
                    // ,packageName:[
                    //     {required: true, message: '请输入包名', trigger: 'blur'}
                    // ]
                },
            };
        },
        components: {
            headTop
        },
        created() {
            this.getData();
            this.$ajax.get(BaseUrl + "position/title",{headers: {'token': sessionStorage.getItem('token'),'device':this.$route.query.type}}).then(response => {
                if(response.data.flag==200){
                    this.positionList = response.data.data;
                }else if(response.data.flag==201) {
                    this.$alert(response.data.msg + '，请重新登录', '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$router.push('/')
                        }
                    });
                }

            });
        },
        computed: {},
        methods: {
            getData(){
                this.$ajax.get(BaseUrl+'apply/appmsg/'+this.$route.query.id,{headers: {'token': sessionStorage.getItem('token'),'device':this.$route.query.type}}).then(response => {
                   if(response.data.flag==200) {
                       this.appForm = response.data.data
                       this.uploadIconUrl = response.data.data.fileIcon;
                       // this.appForm.isOffical='0';
                       // this.offical=[{title:'是',code:'1'},{title:'否',code:'0'}]
                       if (this.appForm.fileShow != '') {
                           this.showList = this.appForm.fileShow.split(',')
                       }
                       // if(this.appForm.fileState=)
                       this.fileDate = moment.utc(this.appForm.fileDate).local().format('YYYY-MM-DD HH:mm:ss')
                       console.log(this.appForm.fileDisplayPosition)
                       if (this.appForm.fileDisplayPosition != undefined) {
                           this.value = eval(this.appForm.fileDisplayPosition)
                       }
                   }else if(response.data.flag==201) {
                       this.$alert(response.data.msg + '，请重新登录', '提示', {
                           confirmButtonText: '确定',
                           callback: action => {
                               this.$router.push('/')
                           }
                       });
                   }
                    // this.value=this.appForm.fileDisplayPosition.split(',')
                })
                this.$ajax.get(BaseUrl+'apptag/all',{headers: {'token': sessionStorage.getItem('token'),'device':this.$route.query.type}}).then(response => {
                    if(response.data.flag==200) {
                        this.tagList = response.data.data;

                        this.typeList = [
                            {
                                "code": "1",
                                "id": "1",
                                "title": "上架"
                            },
                            {
                                "code": "0",
                                "id": "0",
                                "title": "下架"
                            }
                        ]
                    }else if(response.data.flag==201) {
                        this.$alert(response.data.msg + '，请重新登录', '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$router.push('/')
                            }
                        });
                    }

                })


            },
            saveUpdate(appForm){
                appForm.fileDisplayPosition=this.value
                this.$refs.appForm.validate(async (valid) => {
                        if (valid&&this.uploadIconUrl!=''&&this.showList!=0) {
                            this.$ajax({
                                method: "POST",
                                url: BaseUrl+'apply/update',
                                data:appForm,
                                headers: {'token': sessionStorage.getItem('token'),'device':this.$route.query.type}
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
                                        callback: action=>{
                                            // this.$router.back(-1)
                                            if(this.$route.query.type=='android'){
                                            this.$router.push({path:'/applicationList',query:{page:this.$route.query.page,size:this.$route.query.size}})
                                            }else if(this.$route.query.type=='ios'){
                                                this.$router.push({path:'/iosList',query:{page:this.$route.query.page,size:this.$route.query.size}})
                                            }
                                        }
                                    });
                                }else if(response.data.flag==201) {
                                    this.$alert(response.data.msg + '，请重新登录', '提示', {
                                        confirmButtonText: '确定',
                                        callback: action => {
                                            this.$router.push('/')
                                        }
                                    });
                                }
                            });
                        }else {
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

            },
            add_img(event) {
                let uploadPolicy = null;
                this.$ajax
                    .get(BaseUrl+"alioss/getpolicy", {
                        params: {
                            fileName: event.target.files[0].name,
                            type: "image",
                            callBackType:"app_image"
                        },headers: {'token': sessionStorage.getItem('token')}
                    })
                    .then(response => {
                        if (response.data.flag==200) {
                            uploadPolicy = response.data.data;
                            this.UploadUrl = response.data.data.host;
                        }else if(response.data.flag==201) {
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
                        form.append('Content-Disposition',uploadPolicy['Content-Disposition']);
                        form.append("callback", uploadPolicy["callback"]);
                        form.append("file", img1);
                        form.append('x:user',sessionStorage.getItem('userName'));
                        form.append('x:filename',uploadPolicy['fileName']);
                        form.append('x:type',uploadPolicy['type'])
                        this.$ajax({
                            method: "POST",
                            url: this.UploadUrl,
                            data: form
                        }).then(response => {
                            this.uploadIconUrl = response.data.data;
                            this.appForm.fileIcon = response.data.data;
                        });
                    });
            },
            add_imgs(event) {
                let uploadPolicy = null;
                this.$ajax
                    .get(BaseUrl+"alioss/getpolicy", {
                        params: {
                            fileName: event.target.files[0].name,
                            type: "image",
                            callBackType:"app_image"
                        },headers: {'token': sessionStorage.getItem('token')}
                    })
                    .then(response => {
                        if (response.data.flag==200) {
                            uploadPolicy = response.data.data;
                            this.UploadUrl = response.data.data.host;
                        }else if(response.data.flag==201) {
                            this.$alert(response.data.msg + '请重新登录', '提示', {
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
                        form.append("key", uploadPolicy["key"]);
                        form.append("OSSAccessKeyId", uploadPolicy["OSSAccessKeyId"]);
                        form.append("expire", uploadPolicy["expire"]);
                        form.append("policy", uploadPolicy["policy"]);
                        form.append("Signature", uploadPolicy["Signature"]);
                        form.append('Content-Disposition',uploadPolicy['Content-Disposition']);
                        form.append("callback", uploadPolicy["callback"]);
                        form.append("file", img1);
                        form.append('x:user',sessionStorage.getItem('userName'));
                        form.append('x:filename',uploadPolicy['fileName']);
                        form.append('x:type',uploadPolicy['type']);
                        this.$ajax({
                            method: "POST",
                            url: this.UploadUrl,
                            data: form
                        }).then(response => {
                            this.imageUrl = response.data.data;
                            this.showList.push(response.data.data);

                            this.appForm.fileShow = this.showList.join(',');
                            console.log('>>>>>>>', this.appForm.showPict)
                        });
                    });
            },
            removeImage(index) {
                this.showList.splice(index, 1)
                console.log(this.showList);
                this.appForm.fileShow = this.showList.join(',');
            },
            bigImg(index) {
                this.showBigImg = true;
                this.num = index;
            },
            prev() {
                if (this.num == 0) {
                    this.num = this.showList.length
                }
                this.num--;
            },
            next() {
                if (this.num == this.showList.length - 1) {
                    this.num = -1;
                }
                this.num++;
            }
        },

    };
</script>

<style lang="less" >
    @import "../style/mixin";


    .icon-el-update {
        height: 100px;
        position: relative;
        .el-form-item__content {
            display: flex;
            position: absolute;
        }
        div.el-form-item__content {
            border: 0 !important;
        }
        div {
            border-radius: 6px;
            box-sizing: border-box;
            width: 100px;
            height: 100px;
            cursor: pointer;
            line-height: 100px;
            vertical-align: top;
            position: absolute;
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
