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
                        <el-radio-group v-model="type" @change="setType">
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
                        <el-form-item label="竞猜介绍" prop="intro">
                            <el-input v-model="editdata.intro" style="width:400px"></el-input>
                        </el-form-item>
                    </div>
                    <div style="overflow:hidden">
                        <el-form-item label="竞猜周期">
                            <div style="float:left;">
                                <el-radio-group v-model="round" size="small" @change="setRound">
                                    <div style="margin:20px 0"><el-radio label="1">单次</el-radio></div>
                                    <div style="margin:20px 0"><el-radio label="2" >每日</el-radio></div>
                                    <div style="margin:20px 0"><el-radio label="3" >每周</el-radio></div>
                                </el-radio-group>
                            </div>
                            <div v-if="round==='1'" style="float:left;margin:10px 0 0 20px">
                                <el-date-picker v-model="choice" type="date" placeholder="选择日期" @change="setOncetime" value-format="yyyy-MM-dd"></el-date-picker>
                            </div>
                            <div style="float:left;margin:80px 0 0 20px" v-if="round==='3'">
                                    <el-checkbox-group v-model="checkList" size="mini" @change="setCheck">
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
                            <el-select v-model="etime" @change="setEtime">
                                <el-option
                                v-for="item in etimes"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item label="每注金额" >
                            <el-select v-model="amount" @change="setAmount">
                                <el-option
                                v-for="item in amounts"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item label="快讯内容" prop="rules">
                            <el-input
                                type="textarea"
                                rows="5"
                                v-model="editdata.rules">
                            </el-input>
                        </el-form-item>
                    </div>
                    <!-- <div class="ruleMethod">
                        <el-input
                        type="textarea"
                        @blur="setTextarea"
                        :autosize="{ minRows: 2, maxRows: 4}"
                        placeholder="请输入规则内容"
                        v-model="textarea">
                        </el-input>
                    </div> -->
                    <div style="text-align:center;margin-top:20px;padding-bottom:20px">
                        <el-button @click="deleteGuess">删除</el-button>
                        <el-button type="primary" @click="submit">保存</el-button>
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
                choice:"",
                uploadImageUrl:'',
                type: '1',
                round:"1",
                checkList: [],
                arr:[],
                textarea:"",
                etime:"18:00",
                etimes: [{
                    value: '18:00',
                    label: '18:00'
                    }, {
                    value: '19:00',
                    label: '19:00'
                    }
                ],
                amount:"50",
                amounts: [{
                    value: '50',
                    label: '50'
                    }, {
                    value: '100',
                    label: '100'
                    }, {
                    value: '200',
                    label: '200'
                    }, {
                    value: '300',
                    label: '300'
                    }
                ],
                rules: {
                    title: [
                        {required: true, message: '请输入竞猜标题', trigger: 'blur'},
                    ],
                    intro:[
                        {required: true, message: '请输入竞猜介绍', trigger: 'blur'},
                    ],
                    rules: [
                        {required: true, message: '请输入快讯内容', trigger: 'blur'}
                    ]
                },
                imgData: {
                    accept: "image/gif, image/jpeg, image/png, image/jpg,image/webp"
                },
                editdata:{
                    title:"",
                    image:"",
                    type:"1",
                    intro:"",
                    round:"1",
                    etime:"18:00",
                    amount:"50",
                    rules:""
                },

            };
        },

        mounted() {
            
            console.log(this.$route.params.row)
            if(this.$route.params.row.id){
                console.log(1)
                this.editdata=this.$route.params.row;
                this.type=this.editdata.type+"";
                this.amount=this.editdata.amount+"";
                var pat=new RegExp(',');
                if(pat.test(this.editdata.round)){
                    this.round="3";
                    this.checkList=this.editdata.round.split(",")
                }else{
                    if(this.editdata.round.length==2){
                        this.round="2"
                    }else{
                        this.round="1";
                        this.choice=this.editdata.round
                    }
                }
            }
        },
        methods: {
            setType(){//设置竞猜模式
                this.editdata.type=this.type;
                console.log(this.type)
            },
            setRound(){//设置周期   每日
                this.choice="";
                this.checkList=[];
                this.arr=[];
                if(this.round=='2'){
                    this.editdata.round="0123456";
                }
                console.log(this.round)
            },
            setOncetime(){//设置周期里的单次日期
            this.editdata.round=this.choice
                console.log(this.choice)
            },
            setCheck(){//设置周期里的每周
                let len=this.checkList.length;
                this.arr=[];
                for(var i=0;i<len;i++){
                    if(this.checkList[i]=="星期一"){
                         this.arr.push("1");
                    }else if(this.checkList[i]=="星期二"){
                         this.arr.push("2");
                    }else if(this.checkList[i]=="星期三"){
                         this.arr.push("3");
                    }else if(this.checkList[i]=="星期四"){
                         this.arr.push("4");
                    }else if(this.checkList[i]=="星期五"){
                         this.arr.push("5");
                    }else if(this.checkList[i]=="星期六"){
                         this.arr.push("6");
                    }else if(this.checkList[i]=="星期日"){
                         this.arr.push("0");
                    }
                }
                this.editdata.round=this.arr.join('')
                console.log(this.checkList)
                console.log(this.arr.join(''))
            },
            setEtime(){//设置开奖时间
                this.editdata.etime=this.etime;
                console.log(this.etime)
            },
            setAmount(){//设置每注金额
                this.editdata.amount=this.amount;
                console.log(this.amount)
            },
            // setTextarea(){//设置规则
            //     this.editdata.rules=this.textarea;
            //     console.log(this.textarea)
            // },
            deleteGuess(){//删除竞猜
                console.log(this.$route.params.row)
                if(this.$route.params.row.id){
                    this.$ajax({
                    method: "POST",
                    url: BaseUrl+'guess/deleteStyle',
                    params:{id:this.$route.params.row.id},
                    headers: {'token': sessionStorage.getItem('token')}
                    }).then(res=>{
                        this.$router.push({path:'/guessing'}) 
                        console.log(res)              
                    })
                }
                // this.editdata={
                //     title:"",
                //     image:"",
                //     type:"1",
                //     intro:"",
                //     round:"1",
                //     etime:"18:00",
                //     amount:"50",
                //     rules:""
                // };
                // this.textarea='';
                // this.choice="";
                // this.checkList=[];
                // this.arr=[];
            },
            submit(){//提交
                this.setData()
            },
            setData(){//设置数据
                var url='guess/newStyle'
                if(this.$route.params.row.id){
                    url='guess/updateStyle'
                }
                this.$ajax({
                    method: "POST",
                    url: BaseUrl+url,
                    data:this.editdata,
                    headers: {'token': sessionStorage.getItem('token')}
                }).then(res=>{
                    console.log(res)        
                    this.$router.push({path:'/guessing'})      
                })
            },
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
                        // const deletethis.arr = ["fileName", "type", "host"];
                        // deletethis.arr.forEach(item => {
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
        width:60%;
        
    }

</style>
