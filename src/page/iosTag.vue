<template>
    <div class="fillcontain">
        <div class="table_container">
            <div style="display:flex;margin-bottom: 30px;">
                <el-button type="primary" @click="addTag()">新增分类</el-button>
            </div>
            <el-table
                :data="tagList"
                style="width: 100%">
                <el-table-column
                    label="分类图标"
                >
                    <template scope="scope">
                        <img :src="'https://imapp-image.oss-cn-hangzhou.aliyuncs.com/'+scope.row.icon"
                             style="width:40px;height: auto"
                             v-if="scope.row.icon!=undefined&&scope.row.icon!=='tag_default.jpg'">
                    </template>
                </el-table-column>
                <el-table-column
                    label="分类标题"
                    prop="title">
                </el-table-column>
                <el-table-column
                    label="包含应用"
                    prop="applyNum">
                </el-table-column>
                <el-table-column
                    label="创建时间"
                    prop="date">
                </el-table-column>
                <el-table-column
                    label="主键"
                    prop="id">
                </el-table-column>
                <el-table-column label="操作" width="200">
                    <template scope="scope">
                        <el-button @click="update(scope.row.code,scope.row.id)" key="update">编辑</el-button>
                        <el-button @click="deleteTag(scope.row.id)" key="delete">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-dialog title="" :visible.sync="dialogFormVisible">
                <el-form :model="form" :rules="rule" ref="form">
                    <el-form-item label="分类标题" :label-width="formLabelWidth" prop="title">
                        <el-input v-model="form.title" auto-complete="off" style="width:80%"></el-input>
                    </el-form-item>
                    <el-form-item label="分类图标" :label-width="formLabelWidth" prop="title">
                        <div style="display: flex;align-items:flex-end;">
                            <div style="width:70px;height:70px;border: 1px #999 solid;margin-right: 10px"><img
                                :src="'https://imapp-image.oss-cn-hangzhou.aliyuncs.com/'+urlTagIcon"
                                v-if="urlTagIcon!==null" style="width:100%;height:100%;"/></div>
                            <el-button type="primary" v-if="urlTagIcon===null" style="position: relative">
                                <span>上传</span> <input @change='add_img' type="file"
                                                       style="opacity: 0;width:70px;height: 40px;position: absolute;top:0;left:0">
                            </el-button>
                            <el-button type="primary" v-if="urlTagIcon!==null" @click="deletePic()">删除</el-button>
                        </div>
                    </el-form-item>
                    <!--<el-form-item label="排序" :label-width="formLabelWidth" prop="num">-->
                    <!--<el-input v-model="form.num" auto-complete="off" style="width:80%"></el-input>-->
                    <!--</el-form-item>-->
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="ensureUpdate">确 定</el-button>
                </div>
            </el-dialog>
            <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">
                <span>该信息将永久删除，确认删除此条信息？</span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="ensureDelete">确 定</el-button>
               </span>
            </el-dialog>

        </div>
    </div>
</template>

<script>
    import headTop from "../components/headTop";
    import {baseUrl, baseImgPath} from "@/config/env";

    let moment = require('moment')
    export default {
        data() {
            return {
                tagList: [],
                dialogFormVisible: false,
                dialogVisible: false,
                urlTagIcon: null,
                form: {
                    title: '',
                    code: '',
                    id: '',
                },
                imgData: {
                    accept: "image/gif, image/jpeg, image/png, image/jpg,image/webp"
                },
                formLabelWidth: '120px',
                deleteId: '',
                rule: {
                    title: [
                        {required: true, message: '请输入分类名称', trigger: 'blur'},
                    ],
                    num: [
                        {
                            type: 'number', required: true, message: '请输入排序', trigger: 'blur', transform(value) {
                                return Number(value);
                            }
                        }
                    ],
                },
                UploadUrl: '',

            };
        },
        created() {
            this.getTagData()
        },
        components: {
            headTop
        },
        methods: {
            getTagData() {
                this.$ajax.get(BaseUrl + 'apptag/all', {
                    headers: {
                        'token': sessionStorage.getItem('token'),
                        'device': 'ios'
                    }
                }).then(response => {
                    if (response.data.flag == 200) {
                        this.tagList = response.data.data;
                        this.tagList.forEach(item => {
                            item.date = moment.utc(item.date).local().format('YYYY-MM-DD HH:mm:ss')
                        })
                        sessionStorage.setItem('taglist', JSON.stringify(response.data.data))
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
            addTag() {
                this.dialogFormVisible = true;
                this.form = {};
                this.urlTagIcon = null
            },
            update(code, id) {
                this.$router.push({path: '/updateTag', query: {code: code, id: id, type: 'ios'}})
            },
            add_img(event) {
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
                        let img1 = event.target.files[0];
                        let type = img1.type; //文件的类型，判断是否是图片
                        let size = img1.size; //文件的大小，判断图片的大小
                        if (this.imgData.accept.indexOf(type) == -1) {
                            alert("请选择我们支持的图片格式！");
                            return false;
                        }
                        const form = new FormData();

                        let paramsObj = {};
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
                            this.urlTagIcon = response.data.data;
                            this.form.icon = response.data.data;
                        });
                    });
            },
            deletePic(){
                this.$ajax({
                    method: "POST",
                    url: BaseUrl + 'common/cleanImage',
                    params: {objectName:this.urlTagIcon},
                    headers: {'token': sessionStorage.getItem('token')}
                }).then(response => {
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
                        this.urlTagIcon=null
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
            ensureUpdate() {
                this.$refs.form.validate(async (valid) => {
                    if (this.urlTagIcon !== null) {
                        this.form.icon = this.urlTagIcon
                    } else {
                        this.form.icon = 'tag_default.jpg'
                    }

                    if (valid) {
                        this.$ajax({
                            method: "POST",
                            url: BaseUrl + 'apptag/add',
                            data: this.form,
                            headers: {'token': sessionStorage.getItem('token'), 'device': 'ios'}
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
                                this.dialogFormVisible = false;
                                this.$alert(response.data.msg, '提示', {
                                    confirmButtonText: '确定',
                                    callback: action => {
                                        this.getTagData()
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
            deleteTag(id) {
                this.dialogVisible = true;
                this.deleteId = id;
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {
                    });
            },
            ensureDelete() {
                this.dialogVisible = false;
                this.$ajax.get(BaseUrl + 'apptag/delete/' + this.deleteId, {
                    headers: {
                        'token': sessionStorage.getItem('token'),
                        'device': 'ios'
                    }
                }).then(response => {
                    if (response.data.flag == 200) {
                        this.$message({
                            type: 'success',
                            message: '删除成功!',
                        });
                        this.getTagData()
                    } else if (response.data.flag == 201) {
                        this.$alert(response.data.msg + '，请重新登录', '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$router.push('/')
                            }
                        });
                    } else {
                        this.$message({
                            type: 'error',
                            message: '删除失败!',
                        });
                    }
                })
            }
        }
    };
</script>

<style lang="less" scoped>
    @import "../style/mixin";

    .demo-table-expand {
        font-size: 0;
    }

    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }

    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }

    .table_container {
        padding: 20px;
    }

    .Pagination {
        display: flex;
        justify-content: flex-start;
        margin-top: 8px;
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
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-all;
        white-space: nowrap !important;
    }

</style>
