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
                                <el-button type="primary" v-if="editdata.image!==''" @click="editdata.image=''" class="btnone" :disabled="switchs">删除</el-button>
                        </div>
                        
                    </el-form-item>
                    <div class="line"></div>
                    <div class="radios">
                        <el-form-item label="竞猜玩法" prop="play">
                            <el-radio-group v-model="type" @change="setType">
                                <el-radio label="1" :disabled="typeType1">猜涨跌</el-radio>
                                <el-radio label="2" :disabled="typeType2">哈希猜大小</el-radio>
                                <el-radio label="3" :disabled="typeType3">哈希彩票</el-radio>
                            </el-radio-group>
                        </el-form-item>
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
                            <span style="font-size:13px;color:#ccc">暂时不做使用</span>
                        </el-form-item>
                    </div>
                    <div style="overflow:hidden">
                        <el-form-item label="竞猜周期">
                            <div style="float:left;">
                                <el-radio-group v-model="round" size="small" @change="setRound">
                                    <div style="margin:20px 0"><el-radio label="1" disabled>单次</el-radio></div>
                                    <div style="margin:20px 0"><el-radio label="2" >每日</el-radio></div>
                                    <div style="margin:20px 0"><el-radio label="3" disabled>每周</el-radio></div>
                                </el-radio-group>
                            </div>
                            <div v-if="round==='1'" style="float:left;margin:10px 0 0 20px">
                                <el-date-picker v-model="choice" type="date" placeholder="选择日期" @change="setOncetime" value-format="yyyy-MM-dd" :disabled="switchs"></el-date-picker>
                            </div>
                            <div style="float:left;margin:80px 0 0 20px" v-if="round==='3'">
                                    <el-checkbox-group v-model="checkList" size="mini" @change="setCheck" :disabled="switchs">
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
                            <!-- <el-select v-model="etime" @change="setEtime">
                                <el-option
                                v-for="item in etimes"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select> -->
                            <el-time-select
                            v-model="etime"
                            @change="setEtime"
                            :picker-options="{
                                start: '00:00',
                                step: '01:00',
                                end: '23:00'
                            }"
                            disabled
                            placeholder="选择时间">
                            </el-time-select>
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item label="每注金额" >
                            <el-select v-model="amount" @change="setAmount" :disabled="switchs">
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
                        <el-form-item label="玩法规则" prop="rules">
                            <el-input
                                type="textarea"
                                rows="5"
                                v-model="editdata.rules">
                            </el-input>
                        </el-form-item>
                    </div>
                    <div style="text-align:center;margin-top:20px;padding-bottom:20px">
                        <el-button @click="deleteGuess" v-if="true">删除</el-button>
                        <el-button @click="goGuess" v-if="!$route.query.dataId">返回</el-button>
                        <el-button @click="closeGame" v-if="switchs">关闭</el-button>
                        <el-button @click="openGame" v-if="$route.query.dataId&&!switchs">开启</el-button>
                        <el-button type="primary" @click="submit(editdata)">保存</el-button>
                    </div>
                </el-form>
                <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                center
                width="30%">
                    <span>你确定要{{tips}}吗?</span>
                    <div style="text-align:center;margin-top:20px;">
                        <el-button @click="dialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="implement">确 定</el-button>
                    </div>
                </el-dialog>
            </el-col>
        </el-row>
    </div>

</template>

<script>
    export default {
        data() {
            return {
                dialogVisible:false,
                stateType:"",//判断是删除  开启   关闭
                tips:"",
                choice:"",
                uploadImageUrl:'',
                type: '',
                round:"2",
                checkList: [],
                arr:[],
                textarea:"",
                etime:"12:00",
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
                    type:"",
                    intro:"",
                    round:"",
                    etime:"12:00",
                    amount:"50",
                    rules:"",
                    state:"",
                    timeZone:"8"
                },
                typeType1:false,
                typeType2:false,
                typeType3:false,
                switchs:false,//判断是否是进行中
                currentPage:"",
                nowPageSize:"",
                str:[],
                arrDate:[],
                arrType:[],

            };
        },

        created() {
            if(this.$route.query.dataId){
                this.currentPage=this.$route.query.currentPage;
                this.nowPageSize=this.$route.query.nowPageSize;
                this.getDataguess();
                
            }else{
                let arr=this.$route.query.row;
                    if(arr.length!=0){
                        arr.forEach(item=>{
                        if(item=="1"){
                            this.typeType1=true
                        }else if(item=="2"){
                            this.typeType2=true
                        }else if(item=="3"){
                            this.typeType3=true
                        }
                    })
                    }
                    console.log(this.$route.query.dataId)
                this.editdata.round="0123456"
                this.editdata.timeZone="8"
            }
            
        },
        methods: {
            setType(){//设置竞猜模式
                this.editdata.type=this.type;
                if(this.type==1){
                        this.etime="12:00"
                        
                    }else if(this.type==2){
                        this.etime="14:00"
                    }else if(this.type==3){
                        this.etime="16:00"
                    }
                this.editdata.etime=this.etime
            },
            setRound(){//设置周期   每日
                this.choice="";
                this.checkList=[];
                this.arr=[];
                if(this.round=='2'){
                    this.editdata.round="0123456";
                }
            },
            setOncetime(){//设置周期里的单次日期
            this.editdata.round=this.choice
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
            },
            setEtime(){//设置开奖时间
                this.editdata.etime=this.etime;
            },
            setAmount(){//设置每注金额
                this.editdata.amount=this.amount;
            },
            deleteGuess(){//删除竞猜
                this.dialogVisible = true
                this.tips="删除当前玩法"
                this.stateType=-1;
                
            },
            closeGame(){//关闭玩法
                this.dialogVisible = true
                this.tips="关闭当前玩法"
                this.stateType=0
            },
            openGame(){//开启玩法
                this.dialogVisible = true
                this.tips="开启当前玩法"
                this.stateType=1
            },
            implement(){//执行关闭   开启  删除
                this.dialogVisible = false
                if(this.stateType==-1){
                    if(this.$route.query.dataId){//删除
                        this.$ajax({
                        method: "POST",
                        url: BaseUrl+'guess/deleteStyle',
                        params:{id:this.$route.query.dataId},
                        headers: {'token': sessionStorage.getItem('token')}
                        }).then(res=>{
                            this.$router.push({path:'/guessing'})          
                        })
                    }
                }else if(this.stateType==0){//关闭
                    this.editdata.state=0;
                    this.submit()
                }else if(this.stateType==1){//开启
                    this.editdata.state=1;
                    this.submit()
                }
            },
            submit(){//提交
            this.$refs.editdata.validate(async (valid) => {
                    
                    if (valid&&this.editdata.image!=''&&this.editdata.type!=""&&this.editdata.round!="") {
                        if(this.$route.query.dataId&&!this.switchs){//开启
                            this.editdata.state=1;
                        }
                        this.setData()                        
                    } else {
                        if(this.editdata.image==''&&valid){
                            this.$alert('请上传推广图', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    this.$message({
                                        type: 'info',
                                        message: `请重试！`
                                    });
                                }
                            });
                        }else if(this.editdata.type==""&&valid){
                            this.$alert('请选择玩法', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    this.$message({
                                        type: 'info',
                                        message: `请重试！`
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

                        }
                        
                        return false;
                    }
                });
            // console.log(this.editdata)
            // this.setData()
            },
            setData(){//设置数据
                
                var url=''
                if(this.$route.query.dataId){
                    url='guess/updateStyle'
                }else{
                    url='guess/newStyle'
                }
                this.$ajax({
                    method: "POST",
                    url: BaseUrl+url,
                    data:this.editdata,
                    headers: {'token': sessionStorage.getItem('token')}
                }).then(res=>{ 
                    this.$router.push({path:'/guessing'})      
                })
                console.log(this.editdata)
            },
            goGuess(){//返回竞猜管理界面
                this.$router.push({path:'/guessing'})
            },
            getDataguess(){
                this.$ajax({
                method: "POST",
                url: BaseUrl+'guess/findStyle',
                data:{
                    page:"1",
                    size:"100"
                },
                headers: {'token': sessionStorage.getItem('token')}
                }).then(res=>{
                    res.data.data.data.forEach(item=>{
                                        if(item.round!=undefined&&item.round.length>7){
                                            item.round=item.round
                                        }else if(item.round!=undefined&&item.round.length==7){
                                            item.round="每日"
                                        }else if(item.round!=undefined&&item.round.length<7&&item.round.length>0){
                                            this.dateCheng(item.round)
                                            item.round=this.arrDate.join(",")
                                        }

                                        if(item.type!=undefined){
                                            this.str.push(item.type+"")
                                        }

                                        if(item.id===this.$route.query.dataId){
                                            this.editdata=item
                                        }
                                        // this.switchs=true;
                                        
                            })
                                // this.switchs=false
                                console.log(this.editdata.state)
                            if(this.editdata.state!=undefined&&this.editdata.state==1){
                                this.switchs=true;
                            }else if(this.editdata.state==undefined||this.editdata.state==0){           
                                this.switchs=false
                                 console.log(this.switchs,1)
                            }
                            this.setGuessdata()
                            if(this.type==1){
                                this.typeType2=true;
                                this.typeType3=true;
                            }else if(this.type==2){
                                this.typeType1=true;
                                this.typeType3=true;
                            }else if(this.type==3){
                                this.typeType1=true;
                                this.typeType2=true;
                            }
                            console.log(this.editdata)

                           
                })
            },
            setGuessdata(){
                    this.type=this.editdata.type+"";
                    this.amount=this.editdata.amount+"";
                    this.round="2"
                    this.editdata.round="0123456"
                    if(this.type==1){
                        this.etime="12:00"
                        
                    }else if(this.type==2){
                        this.etime="14:00"
                    }else if(this.type==3){
                        this.etime="16:00"
                    }
                    this.editdata.etime=this.etime
                    // this.etime=this.editdata.etime;
                    // var pat=new RegExp(',');
                    // if(pat.test(this.editdata.round)||this.editdata.round.length==3){
                    //     this.round="3";
                    //     this.checkList=this.editdata.round.split(",")
                    // }else{
                    //     if(this.editdata.round.length==2){
                    //         this.round="2"
                    //         this.editdata.round="0123456"
                    //     }else{
                    //         this.round="1";
                    //         this.choice=this.editdata.round
                    //     }
                    // }
            },
            dateCheng(round){
                this.arrDate=[];
                var arr=round.split('');
                var len=arr.length
                for(var i=0;i<len;i++){
                        if(arr[i]=="1"){
                            this.arrDate.push("星期一");
                        }else if(arr[i]=="2"){
                            this.arrDate.push("星期二");
                        }else if(arr[i]=="3"){
                            this.arrDate.push("星期三");
                        }else if(arr[i]=="4"){
                            this.arrDate.push("星期四");
                        }else if(arr[i]=="5"){
                            this.arrDate.push("星期五");
                        }else if(arr[i]=="6"){
                            this.arrDate.push("星期六");
                        }else if(arr[i]=="0"){
                            this.arrDate.push("星期日");
                        }
                    }
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
        margin:10px 0 10px 0
    }
    .ruleMethod{
        padding: 10px;
        width:60%;
        
    }

</style>
