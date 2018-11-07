<template>
    <div>
        <el-row style="margin-top: 20px;">
            <el-col :span="14" :offset="4">
                <el-form :model="quizForm" ref="quizForm" :rules="rule" label-width="110px" class="form food_form">
                    <el-form-item label="竞猜标题：" prop="topic">
                        <el-input v-model="quizForm.topic"></el-input>
                    </el-form-item>
                    <el-form-item label="描述：" prop="detail">
                        <el-input type="textarea" :rows="2" v-model="quizForm.detail" placeholder="描述至少10个字以上"></el-input>
                    </el-form-item>
                    <el-form-item label="开始时间：" prop="startDate">
                        <el-date-picker
                            v-model="quizForm.startDate"
                            type="datetime"
                            placeholder="选择日期时间"
                            :picker-options="PickerOptions1"
                        >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="结束时间：" prop="endDate">
                        <el-date-picker
                            v-model="quizForm.endDate"
                            type="datetime"
                            placeholder="选择日期时间"
                            :picker-options="PickerOptions2"
                        >
                        </el-date-picker>
                    </el-form-item>
                    <div v-for="(item,index) in this.optionData">
                        <el-form-item :label="item.label" :rules="item.rules">
                            <el-input v-model="guess[index]"></el-input>
                        </el-form-item>
                    </div>
                    <el-form-item>
                        <el-button type="primary" @click="addQuizChoice()">添加选项</el-button>
                    </el-form-item>
                    <el-form-item label="每注：" prop="amount">
                        <el-input v-model="quizForm.amount" style="width:40%"></el-input>
                        IA
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="save(quizForm)">保存</el-button>
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
    let moment = require("moment");
    export default {
        data() {
            return {
                uploadIconUrl: '',
                addImgRange: '',
                quizForm: {},
                guessLabel: ['A','B','C','D','E','F','G','H'],
                guess: [],
                imgData: {
                    accept: "image/gif, image/jpeg, image/png, image/jpg,image/webp"
                },
                guessObj:{},
                content: null,
                editorOption: {},
                PickerOptions1: {
                    disabledDate(time) {
                        return time.getTime() < Date.now();
                    }
                },
                PickerOptions2: {
                    disabledDate(time) {
                        return time.getTime() < Date.now();

                    }
                },
                currentOpinionNum: 2,
                optionData: [
                    {
                        label: "竞猜选项一:",
                        rules: {required: true, message: "不能为空", trigger: "blur"}
                    },
                    {
                        label: "竞猜选项二:",
                        rules: {required: true, message: "不能为空", trigger: "blur"}
                    }
                ],
                rule: {
                    topic: [
                        {required: true, message: '请输入竞猜标题', trigger: 'blur'},
                    ],
                    detail: [
                        {required: true, message: '请输入描述', trigger: 'blur'},
                    ],
                    startDate: [
                        {required: true, message: '请选择开始时间', trigger: 'blur'}
                    ],
                    endDate: [
                        {required: true, message: '请选择结束时间', trigger: 'blur'}
                    ],
                    amount: [
                        {
                            type: 'number', required: true, message: '请输入数字', trigger: 'blur', transform(value) {
                                return Number(value);
                            }
                        }
                    ]
                }

            }
        },
        // mounted(){
        //     var imgHandler = async function(state) {
        //         if (state) {
        //             var fileInput =document.querySelector('#uniqueId') //隐藏的file元素
        //             fileInput.click() //触发事件
        //         }
        //     }
        //     this.$refs.newEditor.quill.getModule("toolbar").addHandler("image", imgHandler)
        // },
        created() {
            if (this.$route.query.id != undefined ) {
                this.$ajax({
                    method: "POST",
                    url: BaseUrl + 'guess/getById',
                    data: {id:this.$route.query.id},
                    headers: {'token': sessionStorage.getItem('token')}
                }).then(response => {
                    if(response.data.flag==200){
                    this.quizForm = response.data.data.guess;
                    this.quizForm.startDate=moment.utc(this.quizForm.startDate).local().format('YYYY-MM-DD HH:mm:ss')
                    this.quizForm.endDate=moment.utc(this.quizForm.endDate).local().format('YYYY-MM-DD HH:mm:ss')
                    if(Object.keys(JSON.parse(response.data.data.guess.option)).length==3){
                    this.optionData = [   {
                        label: "竞猜选项一:",
                        rules: {required: true, message: "不能为空", trigger: "blur"}
                    },
                        {
                            label: "竞猜选项二:",
                            rules: {required: true, message: "不能为空", trigger: "blur"}
                        },{
                            label: "竞猜选项三:",
                            rules: {required: true, message: "不能为空", trigger: "blur"}
                        }]
                    };
                    this.guessObj=JSON.parse(response.data.data.guess.option)
                    for (var key in this.guessObj) {
                        // console.log(this.guessObj[key]);//jack,25,male
                        this.guess.push(this.guessObj[key])
                    }
                    }else if(response.data.flag==201) {
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
        updated() {
            const length = this.guess.length;
            for (var key in this.guess) {
                this.guessObj[this.guessLabel[key]] = this.guess[key];
            }
            // console.log('>>>>>>guessObj',guessObj);
            //这个guessObj拼到参数里
        },
        methods: {
            // GMTToStr(time) {
            //     var date = time;
            //     var Y = date.getFullYear();
            //     var M = date.getMonth() + 1;
            //     M = M < 10 ? '0' + M : M;// 不够两位补充0
            //     var D = date.getDate();
            //     D = D < 10 ? '0' + D : D;
            //     var H = date.getHours();
            //     H = H < 10 ? '0' + H : H;
            //     var Mi = date.getMinutes();
            //     Mi = Mi < 10 ? '0' + Mi : Mi;
            //     var S = date.getSeconds();
            //     S = S < 10 ? '0' + S : S;
            //     return Y + '-' + M + '-' + D + ' ' + H + ':' + Mi + ':' + S;
            //
            // },
            addQuizChoice() {// 点击增加选项
                if (this.currentOpinionNum > 7) {
                    this.$alert('不能超过8条竞猜选项', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$message({
                                type: 'info',
                                message: `请重试！`
                            });
                        }
                    });
                }else{
                this.currentOpinionNum += 1;
                switch (this.currentOpinionNum){
                    case 3:
                        this.num='三'
                        break;
                    case 4:
                        this.num='四'
                        break;
                    case 5:
                        this.num='五'
                        break;
                    case 6:
                        this.num='六'
                        break;
                    case 7:
                        this.num='七'
                        break;
                    case 8:
                        this.num='八'
                        break;
                }
                const optionObj = {
                    label: "竞猜选项" +  this.num + ':',
                    num: this.currentOpinionNum,
                    rules: {required: true, message: "不能为空", trigger: "blur"}
                };
                this.optionData.push(optionObj); // 给选项计数
                }
            },
            save(quizForm) {
                if(quizForm.amount!=''&&quizForm.amount!=undefined){
                quizForm.amount=Number( quizForm.amount)
                }
                quizForm.option=JSON.stringify(this.guessObj)
                this.$refs.quizForm.validate(async (valid) => {
                    if (valid&& Object.keys(this.guessObj).length>=2) {
                        if(quizForm.startDate>quizForm.endDate){
                            this.$alert('开始时间不能大于结束时间', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    this.$message({
                                        type: 'info',
                                        message: `请重试！`
                                    });
                                }
                            });
                            return false;
                        }else if(quizForm.detail.length<10){
                            this.$alert('描述需10个字以上', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    this.$message({
                                        type: 'info',
                                        message: `请重试！`
                                    });
                                }
                            });
                            return false;
                        }else{
                        if (typeof(quizForm.startDate) == "string") {
                            quizForm.startDate =  moment(quizForm.startDate).utc().format('YYYY-MM-DD HH:mm:ss');
                        } else {
                            quizForm.startDate = moment(quizForm.startDate).utc().format('YYYY-MM-DD HH:mm:ss');
                            quizForm.llt=quizForm.startDate
                        }
                        if (typeof(quizForm.endDate) == "string") {
                            quizForm.endDate =moment(quizForm.endDate).utc().format('YYYY-MM-DD HH:mm:ss');
                        } else {
                            quizForm.endDate =  moment(quizForm.endDate).utc().format('YYYY-MM-DD HH:mm:ss');

                        }

                        if (this.$route.query.id == '' || this.$route.query.id == undefined) {
                            this.$ajax({
                                method: "POST",
                                url:  BaseUrl+'guess/new',
                                data: quizForm,
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
                                    return false
                                } else if (response.data.flag == 200) {
                                    this.$alert(response.data.msg, '提示', {
                                        confirmButtonText: '确定',
                                        callback: action=>{this.$router.push({path: '/quizList'})}
                                    });
                                }else if(response.data.flag==201) {
                                    this.$alert(response.data.msg + '，请重新登录', '提示', {
                                        confirmButtonText: '确定',
                                        callback: action => {
                                            this.$router.push('/')
                                        }
                                    });
                                }
                            },error=>{
                                this.$alert('请检查服务器接口', '提示', {
                                    confirmButtonText: '确定',
                                    callback: action => {
                                        this.$message({
                                            type: 'info',
                                            message: `error: ${ '请重试'}`
                                        });
                                    }
                                });
                                return false
                            });
                        } else {
                            this.$ajax({
                                method: "POST",
                                url:BaseUrl+'guess/delById',
                                data: {id:this.$route.query.id},
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
                                    this.$ajax({
                                        method: "POST",
                                        url: BaseUrl+'guess/new',
                                        data: quizForm,
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
                                            this.$alert(response.data.msg, '提示', {
                                                confirmButtonText: '确定',
                                                callback: action=>{this.$router.push({path: '/quizList'})}
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
                                }else if(response.data.flag==201) {
                                    this.$alert(response.data.msg + '，请重新登录', '提示', {
                                        confirmButtonText: '确定',
                                        callback: action => {
                                            this.$router.push('/')
                                        }
                                    });
                                }
                            });
                        }
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
                })

            },

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
    }

    .demo-upload-list img {
        width: 50%;
        height: 50%;
    }
</style>
