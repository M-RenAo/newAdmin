<template>
    <div class="content">
        <el-row style="margin-top: 20px;">
            <el-col :span="14" :offset="4">
                <el-form :model="editdata" ref="editdata" label-width="110px" class="form food_form" :rules="rules">
                    <el-form-item label="文章标题" prop="title">
                        <el-input v-model="editdata.title"></el-input>
                    </el-form-item>
                    <el-form-item label="配图" class="icon-el">
                        <!-- <input class="upload" @change='mapping' type="file" style="opacity: 0;width: 148px;height: 148px;z-index:222;"/> -->
                        <div class="updatas">

                            <div class="icon-plus-container">

                            </div>
                            <!-- <div class="img-wrap" v-if="uploadImageUrl!==''">
                                <img :src="'https://imapp-image.oss-cn-hangzhou.aliyuncs.com/'+uploadImageUrl"
                                    class="border-radius" style="width: 146px;height: 146px;"/>
                            </div> -->
                            <div class="img-wrap" v-if="editdata.image!==''&&editdata.image!==undefined">
                                <img :src="'https://imapp-image.oss-cn-hangzhou.aliyuncs.com/'+editdata.image"
                                     style="width:146px;height:146px;"
                                     v-if="editdata.image!==''&&editdata.image!==undefined">
                            </div>
                            <el-button type="primary" v-if="editdata.image===undefined||editdata.image===''"
                                       class="btnone"><span>上传</span> <input @change='mapping' type="file"
                                                                             style="opacity: 0;width: 70px;height: 40px;z-index:222;position: absolute; top: 0px; left: 0px;"
                                                                             class="upload"></el-button>
                            <el-button type="primary" v-if="editdata.image!==undefined&&editdata.image!==''"
                                       @click="deleteImg" class="btnone">删除
                            </el-button>
                        </div>

                    </el-form-item>
                    <el-form-item label="快讯内容" prop="content">
                        <el-input
                            type="textarea"
                            rows="5"
                            v-model="editdata.content">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="文章来源" prop="source">
                        <el-input v-model="editdata.source" style="width:200px"></el-input>
                        <span style="font-size:12px;color:#666">如果没有默认imApp</span>
                    </el-form-item>
                    <el-form-item label="热讯推荐" prop="recommend">
                        <div class="radio">
                            <el-radio v-model="radio" label="1">是</el-radio>
                            <el-radio v-model="radio" label="0">否</el-radio>
                        </div>
                        <div class="radio">
                            <el-select v-model="selectvalue" @change="selectdate" :disabled="radio==1?false:true">
                                <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <span style="font-size:12px;color:#666">热讯只有发布状态下生效</span>
                    </el-form-item>
                    <div class="line"></div>
                    <el-form-item>
                        <div class="left">
                            字数{{editdata.content.length}}字
                        </div>
                        <div class="release">

                            <div class="right">
                                <el-button @click="submit(editdata)">发布</el-button>
                                <el-button @click="draft(editdata)">存草稿</el-button>
                            </div>
                        </div>
                    </el-form-item>
                </el-form>

            </el-col>
        </el-row>
    </div>

</template>

<script>
    export default {
        data() {
            return {
                uploadImageUrl: '',
                editdata: {
                    title: "",
                    image: "",
                    content: "",
                    source: "imApp",
                    hot: true,
                    expire: 0,
                    draft: false,
                },
                selectvalue: "当天",//实名状态
                options: [{
                    value: '1',
                    label: '当天'
                }, {
                    value: '2',
                    label: '三天'
                }, {
                    value: '3',
                    label: '无限制'
                }],
                radio: "1",//单选按钮
                rules: {
                    title: [
                        {required: true, message: '请输入文章标题', trigger: 'blur'},
                    ],
                    content: [
                        {required: true, message: '请输入快讯内容', trigger: 'blur'}
                    ],

                },
                imgData: {
                    accept: "image/gif, image/jpeg, image/png, image/jpg,image/webp"
                },
                switch: false,
                page: '',
                size: ''

            };
        },

        created() {
            this.switch = false;
            if (this.$route.query.dataId) {
                this.page = this.$route.query.page
                this.size = this.$route.query.size
                this.$ajax.get(BaseUrl + "newsFlash/getArticle/" + this.$route.query.dataId, {
                    headers: {'token': sessionStorage.getItem('token')}
                }).then(res => {
                        this.editdata = res.data.data;
                        // console.log(this.editdata)
                        this.switch = true;
                        this.editdata.expire = Math.round(new Date(new Date().setHours(0, 0, 0, 0)) / 1000) + 86400

                        // this.editdata.hot=true;
                        this.editdata.hot ? this.radio = "1" : this.radio = "0"
                    }
                )

            }
            this.expire = Math.round(new Date(new Date().setHours(0, 0, 0, 0)) / 1000) + 86400
        },
        computed: {},
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
                            this.editdata.image = response.data.data;
                        });
                    });
            },
            deleteImg(){
                // console.log(this.editdata.image)
                this.$ajax({
                    method: "POST",
                    url: BaseUrl + 'common/cleanImage',
                    params: {objectName:this.editdata.image},
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
                        this.editdata.image=""
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
            selectdate(time) {//select选择器选择时间

                if (time == 1) {//一天
                    this.editdata.expire = Math.round(new Date(new Date().setHours(0, 0, 0, 0)) / 1000) + 86400
                } else if (time == 2) {//三天
                    this.editdata.expire = Math.round(new Date(new Date().setHours(0, 0, 0, 0)) / 1000) + 86400 * 3
                } else {//一年
                    this.editdata.expire = Math.round(new Date(new Date().setHours(0, 0, 0, 0)) / 1000) + 86400 * 365
                }

            },
            submit(editdata) {//提交表单
                this.editdata.draft = false
                this.editdata.expire = this.expire;
                this.editdata.source ? this.editdata.source : this.editdata.source = "imApp"
                this.prooFreading()
            },
            draft(editdata) {//存草稿
                this.editdata.draft = true
                this.prooFreading()

            },
            createEdit() {//创建快讯
                this.$ajax({
                    method: "POST",
                    url: BaseUrl + 'newsFlash/create',
                    data: this.editdata,
                    headers: {
                        'token': sessionStorage.getItem('token')
                    }
                }).then(res => {

                    // this.$router.push({path:"/messageManagement"})
                    this.$router.push({
                        name: 'messageManagement',
                        params: {
                            page: this.page,
                            size: this.size
                        }
                    })
                })

            },
            editEdit() {//编辑快讯
                this.$ajax({
                    method: "POST",
                    url: BaseUrl + 'newsFlash/update',
                    data: this.editdata,
                    headers: {
                        'token': sessionStorage.getItem('token')
                    }
                }).then(res => {
                    this.$router.push({
                        name: 'messageManagement',
                        params: {
                            page: this.page,
                            size: this.size
                        }
                    })

                })
            },
            prooFreading() {
                this.$refs.editdata.validate(async (valid) => {

                    if (valid) {
                        // console.log(this.editdata)
                        if (this.switch) {
                            this.editEdit()
                            // console.log(1)
                        } else {
                            this.createEdit()
                            // console.log(2)
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
                });
            }

        },
        watch: {
            radio(newVal, oldVal) {
                if (newVal == 1) {
                    this.editdata.hot = true
                } else {
                    this.editdata.hot = false
                }
            }
        }

    };
</script>

<style lang="less">
    @import "../style/mixin";
    @import "../style/common.less";

    .content {
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
        .img-wrap {
            width: 148px;
            height: 148px;
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
        .radio {
            display: inline-block;
            padding: 0 10px 0 10px
        }
        .line {
            margin-top: 100px;
            width: 100%;
            border-top: 1px solid #000;
        }
        .release {
            overflow: hidden;
            margin-top: 10px;
            padding: 10px 0 20px 0;
            width: 100%;
            div {
                line-height: 40px
            }

            .right {
                margin-right: 10px
            }
        }
        .left {
            margin-left: -90px
        }
        .updatas {
            position: relative
        }
        .btnone {
            position: absolute;
            left: 170px;
            top: 105px;
            width: 70px;
            height: 40px
        }
    }
</style>
