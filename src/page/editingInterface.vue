<template>
    <div>
        <el-row style="margin-top: 20px;">
            <el-col :span="14" :offset="4">
                <el-form :model="editdata" ref="editdata" label-width="110px" class="form food_form" :rules="rules">
                    <el-form-item label="文章标题" prop="title">
                        <el-input v-model="editdata.title"></el-input>
                    </el-form-item>
                    <el-form-item label="配图" class="icon-el">
                        <input class="upload" @change='mapping' type="file" style="opacity: 0;width: 148px;height: 148px;z-index:222;"/>
                                <div class="icon-plus-container">
                                    <i class="el-icon-plus"></i>
                                </div>
                                <div class="img-wrap" v-if="uploadImageUrl!=''">
                                    <img :src="'https://imapp-image.oss-cn-hangzhou.aliyuncs.com/'+uploadImageUrl"
                                        class="border-radius" style="width: 146px;height: 146px;"/>
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
                                <el-radio v-model="radio" label="1">是</el-radio><el-radio v-model="radio" label="0">否</el-radio>
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
                        <div class="release clear:after" >
                            <div class="left">
                                字数{{editdata.content.length}}字
                            </div>
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
                uploadImageUrl:"",
                editdata:{
                    title:"",
                    image:"",
                    content:"",
                    source:"imApp",
                    hot:true,
                    expire:86400,
                    draft:false,
                    timestamp:0,//当前时间
                },
                selectvalue:"当天",//实名状态
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
                radio:"1",//单选按钮
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
            };
        },

        created() {
            this.editdata.expire = Date.parse(new Date())+86400;
        },
        computed: {},
        methods: {
            mapping(event){//图片上传
                let uploadPolicy = null;
                this.$ajax
                    .get(BaseUrl+"alioss/getpolicy", {
                        params: {
                            fileName: event.target.files[0].name,
                            type: "image",
                            callBackType:"app_image",
                        }, headers: {'token': sessionStorage.getItem('token')}
                    })
                    .then(response => {
                        if (response.data.flag==200) {
                            uploadPolicy = response.data.data;
                            this.UploadUrl = response.data.data.host;
                        } else if(response.data.flag==201) {
                            this.$alert(response.data.msg + '，请重新登录', '提示', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    this.$router.push('/')
                                }
                            });
                        }else {
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
                        form.append('x:user',sessionStorage.getItem('userName'));
                        form.append('x:filename',uploadPolicy['fileName']);
                        form.append('x:type',uploadPolicy['type'])
                        this.$ajax({
                            method: "POST",
                            url: this.UploadUrl,
                            data: form,
                        }).then(response => {
                                this.uploadImageUrl = response.data.data;
                                this.editdata.image = response.data.data;
                        });
                    });
            },
            selectdate(time){//select选择器选择时间
                
                if(time==1){//一天
                    this.editdata.expire=this.timestamp+86400
                }else if(time==2){//三天
                    this.editdata.expire=this.timestamp+86400*3
                }else{//一年
                    this.editdata.expire=this.timestamp+86400*365
                }

            },
            submit(editdata){//提交表单
                this.editdata.draft=false
                this.createEdit();
                this.goMessage()
            },
            draft(editdata){//存草稿
                this.editdata.draft=true
                this.createEdit()
                this.goMessage()
            },
            createEdit(){//创建快讯
                this.$refs.editdata.validate((valid) => {
                    if (valid&&this.uploadImageUrl!='') {
                        this.$ajax({
                            method: "POST",
                            url: BaseUrl+'newsFlash/create',
                            data:this.editdata,
                            headers: {
                                'token': sessionStorage.getItem('token')
                                }
                        }).then(res=>{
                                console.log(res)
                                
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            goMessage(){//跳转到快讯列表
                this.$router.push({path:"/messageManagement"})
                console.log(this.editdata)
            }
            
        },
        watch:{
            radio(newVal,oldVal){
                console.log(newVal)
                // if(newVal==1){
                //     this.editdata.hot=true
                // }else{
                //     this.editdata.hot=false                   
                // }
            }
        }

    };
</script>

<style lang="less">
    @import "../style/mixin";
    @import "../style/common.less";

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
    .radio{
        display: inline-block;
        padding: 0 10px 0 10px
    }
    .line{
        margin-top:100px;
        width:100%;
        border-top:1px solid #000;
    }
    .release{
        margin-top:10px;
        padding:10px 0 20px 0;
        width:100%;
        div{
            line-height: 40px
        }
        .left{
            margin-left:-90px
        }
        .right{
            margin-right:10px
        }
    }
</style>
