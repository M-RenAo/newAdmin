<template>
    <div>
        <el-row style="margin-top: 20px;">
            <el-col :span="16" :offset="2">
                <el-form :model="editdata" ref="editdata" label-width="110px" class="form food_form" :rules="rules">
                    <el-form-item label="推广图" class="icon-el">
                                <!-- <input class="upload" @change='mapping' type="file" style="opacity: 0;width: 148px;height: 148px;z-index:222;"/> -->
                        <div class="updatas">
                            
                                <div class="icon-plus-container">
                                    
                                </div>
                                <div class="img-wrap" v-if="editdata.image!==''&&editdata.image!==undefined">
                                    <img :src="'https://imapp-image.oss-cn-hangzhou.aliyuncs.com/'+editdata.image" style="width:146px;height:146px;" v-if="editdata.image!==''&&editdata.image!==undefined" >
                                </div>
                                <el-button type="primary" v-if="editdata.image===''" class="btnone"><span>上传</span>  <input @change='mapping' type="file" style="opacity: 0;width: 70px;height: 40px;z-index:222;position: absolute; top: 0px; left: 0px;" class="upload"></el-button>
                                <el-button type="primary" v-if="editdata.image!==''" @click="editdata.image=''" class="btnone">删除</el-button>
                        </div>
                        
                    </el-form-item>
                    <div class="line"></div>
                    <div class="playRules">
                        玩法规则
                    </div>
                    <div class="radios">
                        <el-radio-group v-model="radio">
                            <el-radio label="1">猜涨跌</el-radio>
                            <el-radio label="2">哈希猜大小</el-radio>
                            <el-radio label="3" >哈希彩票</el-radio>
                        </el-radio-group>
                    </div>
                    <div class="titles">
                        <el-form-item label="竞猜标题" prop="title">
                            <el-input v-model="editdata.title" style="width:200px"></el-input>
                            <span style="font-size:13px;color:#ccc">暂时不做使用</span>
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item label="竞猜介绍" prop="introduce">
                            <el-input v-model="editdata.introduce" style="width:400px"></el-input>
                        </el-form-item>
                    </div>
                    <div style="overflow:hidden">
                        <el-form-item label="竞猜周期" prop="cycle">
                            <el-radio-group v-model="radios" size="small">
                                <div style="margin:10px 0 10px 0"><el-radio label="1">单次</el-radio></div>
                                <div style="margin:10px 0 10px 0"><el-radio label="2" >每日</el-radio></div>
                                <div style="margin:10px 0 10px 0"><el-radio label="3" >每周</el-radio></div>
                            </el-radio-group>
                            <div style="float:right;margin:50px 0 0 0">
                                    <el-checkbox-group v-model="checkList" size="mini">
                                        <el-checkbox label="星期一"></el-checkbox>
                                        <el-checkbox label="星期二"></el-checkbox>
                                        <el-checkbox label="星期三"></el-checkbox>
                                        <el-checkbox label="星期四"></el-checkbox>
                                        <el-checkbox label="星期五"></el-checkbox>
                                        <el-checkbox label="星期六"></el-checkbox>
                                        <el-checkbox label="星期日"></el-checkbox>
                                    </el-checkbox-group>
                                </div>
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item label="开奖时间">
                            <el-select v-model="openTime" placeholder="请选择">
                                <el-option
                                v-for="item in openTimes"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item label="每注金额">
                            <el-select v-model="money" placeholder="请选择">
                                <el-option
                                v-for="item in moneys"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div class="playRules">
                        玩法规则
                    </div>
                    <div class="ruleMethod">
                        <p>1、用户选择感兴趣的猜猜事件，选择猜猜选项，如果猜猜成功，即可获得对应倍数的IA。</p>
                        <p>2、最终倍数：猜猜结束时间时各选项的预计回报倍数。</p>
                        <p>3、预计回报倍数：可能获得的收益倍数。随着购买总额变化，收益倍数也会变化。系统将实时更新预计倍数，以便用户更好的参考。</p>
                        <p>4、收益计算：猜中的一方可获得收益，用户A赢取IA数=奖池总IA数*（用户A投注IA数/所有猜中用户投注IA总数）</p>
                    </div>
                    <div >
                        <el-button>删除</el-button>
                        <el-button type="primary">保存</el-button>
                    </div>
                </el-form>

            </el-col>
        </el-row>
    </div>

</template>

<script>
    export default {
        data() {
            return {
                uploadImageUrl:'',
                radio: '1',
                radios:"1",
                checkList: [],
                openTime:"18:00",
                openTimes: [{
                    value: '1',
                    label: '18:00'
                    }, {
                    value: '2',
                    label: '19:00'
                    }
                ],
                money:"50",
                moneys: [{
                    value: '1',
                    label: '50'
                    }, {
                    value: '2',
                    label: '100'
                    }, {
                    value: '3',
                    label: '200'
                    }, {
                    value: '4',
                    label: '300'
                    }
                ],
                rules: {
                    title: [
                        {required: true, message: '请输入竞猜标题', trigger: 'blur'},
                    ],
                    introduce:[
                        {required: true, message: '请输入竞猜介绍', trigger: 'blur'},
                    ],
                    content: [
                        {required: true, message: '请输入快讯内容', trigger: 'blur'}
                    ],
                    
                },
                imgData: {
                    accept: "image/gif, image/jpeg, image/png, image/jpg,image/webp"
                },
                editdata:{
                    title:"",
                    image:"",
                    content:"",
                    source:"imApp",
                    hot:true,
                    expire:86400,
                    draft:false,
                    introduce:"",
                },

            };
        },

        created() {

        },
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
                                // this.uploadImageUrl = response.data.data;
                                this.editdata.image = response.data.data;
                        });
                    });
            }
            
            
        },
     

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

    .updatas{
        position: relative
    }
    .btnone{
        position: absolute;
        left:170px;
        top:105px;
        width:70px;
        height:40px
    }
    .line{
        margin-top:20px;
        width:100%;
        border-top:1px solid #000;
    }
    .playRules{
        width:100px;
        text-align: right;
        margin:10px 0 20px 0
    }
    .radios{
        margin:0 0 10px 40px
    }
    .ruleMethod{
        padding: 10px;
        border:1px solid #000;
        margin-left:20px;
        p{
            line-height:25px;
            margin:10px 0 10px 0

        }
    }

</style>
