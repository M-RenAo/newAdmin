<template>
    <div>
        <el-row style="margin-top: 20px;">
            <el-col :span="14" :offset="4">
                <el-form :model="sysForm" ref="sysForm" :rules="rule" label-width="150px" class="form food_form">
                    <el-form-item label="系统升级公告：" prop="title">
                        <el-input v-model="sysForm.title"  type="textarea" :rows="4"></el-input>
                    </el-form-item>
                    <el-form-item label="系统升级时间：" prop="timePeriod">
                        <el-date-picker
                            v-model="timePeriod"
                            type="datetimerange"
                            align="right"
                            :picker-options="pickerOptions0"
                            :default-time="['12:00:00', '12:00:00']">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="save(sysForm)">保存</el-button>
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

    export default {
        data() {
            return {
                timePeriod: null,
                toItemId: null,
                appName: null,
                sysForm: {
                },
                pickerOptions0: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                },
                rule: {
                    title: [
                        {required: true, message: '请输入公告', trigger: 'blur'},
                    ]
                }
            }
        },
        created(){
        },
        methods: {
            GMTToStr(time) {
                var date = time;
                var Y = date.getFullYear();
                var M = date.getMonth() + 1;
                M = M < 10 ? '0' + M : M;// 不够两位补充0
                var D = date.getDate();
                D = D < 10 ? '0' + D : D;
                var H = date.getHours();
                H = H < 10 ? '0' + H : H;
                var Mi = date.getMinutes();
                Mi = Mi < 10 ? '0' + Mi : Mi;
                var S = date.getSeconds();
                S = S < 10 ? '0' + S : S;
                return Y + '-' + M + '-' + D + ' ' + H + ':' + Mi + ':' + S;

            },
            save(focusForm) {
                this.$refs.focusForm.validate(async (valid) => {
                    if (valid&&this.timePeriod != null) {
                        focusForm.startTime = this.GMTToStr(this.timePeriod[0]);
                        focusForm.endTime = this.GMTToStr(this.timePeriod[1]);
                            // this.$ajax({
                            //     method: "POST",
                            //     url:  BaseUrl+'banner/add',
                            //     data: focusForm,
                            //     headers: {'token': sessionStorage.getItem('token')}
                            // }).then(response => {
                            //     if (response.data.flag == 500) {
                            //         this.$alert(response.data.msg, '提示', {
                            //             confirmButtonText: '确定',
                            //             callback: action => {
                            //                 this.$message({
                            //                     type: 'info',
                            //                     message: `error: ${ response.data.msg + ',请重试'}`
                            //                 });
                            //             }
                            //         });
                            //     } else if (response.data.flag == 200) {
                            //         this.$alert(response.data.msg, '提示', {
                            //             confirmButtonText: '确定',
                            //             callback: this.$router.push({path: '/focusImg'})
                            //         });
                            //     }
                            // });
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
            }

        },
        components: {
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
        .el-form-item__error {
            border: 0px !important;
            width: 148px;
            height: 10px;
            line-height: 10px;
        }
    }

    .demo-upload-list img {
        width: 50%;
        height: 50%;
    }
</style>
