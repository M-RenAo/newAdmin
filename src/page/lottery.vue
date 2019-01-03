<template>
    <div>
        <el-row style="margin-top: 20px;">
            <el-col :span="14" :offset="4">
                <el-form :model="lottery" ref="lottery" label-width="110px" class="form food_form">
                    <div>
                        <div style="display: flex;margin-bottom: 20px;">
                            <h4>竞猜基本信息：</h4>
                        </div>
                        <el-form-item label="竞猜标题：" prop="name">
                            {{lottery.topic}}
                        </el-form-item>
                        <el-form-item label="描述：" prop="name">
                            {{lottery.detail}}
                        </el-form-item>
                        <el-form-item label="开始时间：" prop="name">
                            {{lottery.startDate}}
                        </el-form-item>
                        <el-form-item label="结束时间：" prop="name">
                            {{lottery.endDate}}
                        </el-form-item>
                        <el-form-item label="竞猜选项一：" prop="name">
                            {{option.A}}
                        </el-form-item>
                        <el-form-item label="竞猜选项二：" prop="name">
                            {{option.B}}
                        </el-form-item>
                        <el-form-item label="竞猜选项三：" prop="name" v-if="Object.keys(option).length>=3">
                            {{option.C}}
                        </el-form-item>
                        <el-form-item label="竞猜选项四：" prop="name" v-if="Object.keys(option).length>=4">
                            {{option.D}}
                        </el-form-item>
                        <el-form-item label="竞猜选项五：" prop="name" v-if="Object.keys(option).length>=5">
                            {{option.E}}
                        </el-form-item>
                        <el-form-item label="竞猜选项六：" prop="name" v-if="Object.keys(option).length>=6">
                            {{option.F}}
                        </el-form-item>
                        <el-form-item label="竞猜选项七：" prop="name" v-if="Object.keys(option).length>=7">
                            {{option.G}}
                        </el-form-item>
                        <el-form-item label="竞猜选项八：" prop="name" v-if="Object.keys(option).length==8">
                            {{option.H}}
                        </el-form-item>
                        <el-form-item label="每注：" prop="name">
                            {{lottery.amount}} IA
                        </el-form-item>
                    </div>
                    <div>
                        <div style="margin-bottom: 20px;">
                            <h4>开奖结果：</h4>
                        </div>
                        <el-form-item label="获胜结果：" prop="name">
                            <el-select v-model="anwser" placeholder="请选择">
                                <el-option
                                    label="竞猜选项一"
                                    value="A">
                                </el-option>
                                <el-option
                                    label="竞猜选项二"
                                    value="B">
                                </el-option>
                                <el-option
                                    label="竞猜选项三"
                                    value="C"
                                    v-if="Object.keys(option).length>=3">
                                </el-option>
                                <el-option
                                    label="竞猜选项四"
                                    value="D"
                                    v-if="Object.keys(option).length>=4">
                                </el-option>
                                <el-option
                                    label="竞猜选项五"
                                    value="E"
                                    v-if="Object.keys(option).length>=5">
                                </el-option>
                                <el-option
                                    label="竞猜选项六"
                                    value="F"
                                    v-if="Object.keys(option).length>=6">
                                </el-option>
                                <el-option
                                    label="竞猜选项七"
                                    value="G"
                                    v-if="Object.keys(option).length>=7">
                                </el-option>
                                <el-option
                                    label="竞猜选项八"
                                    value="H"
                                    v-if="Object.keys(option).length==8">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm(anwser)">提交</el-button>
                    </el-form-item>
                </el-form>

            </el-col>
        </el-row>
        <el-dialog
            title="提示"
            :visible.sync="ensureVisible"
            width="30%"
        >
            <span>确定开奖？</span>
            <span slot="footer" class="dialog-footer">
                     <el-button @click="ensureVisible = false">取 消</el-button>
                     <el-button type="primary" @click="ensure()">确 定</el-button>
                </span>
        </el-dialog>
    </div>

</template>

<script>
    import {getCategory, addCategory, addFood} from "@/api/getData";
    import {baseUrl, baseImgPath} from "@/config/env";

    export default {
        data() {
            return {
                lottery: {},
                anwser: '',
                ensureVisible: false,
                option: {}
            };
        },
        created() {
            this.$ajax({
                method: "POST",
                url: BaseUrl + 'guess/getById',
                data: {id: this.$route.query.id},
                headers: {'token': sessionStorage.getItem('token')}
            }).then(response => {
                if (response.data.flag == 200) {
                    this.lottery = response.data.data.guess;
                    this.option = JSON.parse(response.data.data.guess.option)
                } else if (response.data.flag == 201) {
                    this.$alert(response.data.msg + '，请重新登录', '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$router.push('/')
                        }
                    });
                }
            })
        },
        computed: {},
        methods: {
            submitForm() {
                this.ensureVisible = true;
            },
            ensure() {
                this.$ajax({
                    method: "POST",
                    url: BaseUrl + 'guess/issue',
                    data: {id: this.$route.query.id, answer: this.anwser},
                    headers: {'token': sessionStorage.getItem('token')}
                }).then(response => {
                    if (response.data.flag == 200) {
                        var t;
                        clearTimeout(t)
                        var that = this
                        t = setTimeout(function () {
                            that.$alert(response.data.msg, '提示', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    that.$router.push({path: '/quizList'})
                                }
                            });
                        }, 1000);
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
                            callback: action => {
                                this.$message({
                                    type: 'info',
                                    message: `error: ${ response.data.msg + ',请重试'}`
                                });
                            }
                        });
                    }
                });
                this.ensureVisible = false
            }
        },

    };
</script>

<style lang="less" scoped>
    @import "../style/mixin";


</style>
