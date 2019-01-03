<template>
    <div>
        <div class="table_container">
            <el-row type="flex" style="margin-bottom: 30px;">
                <el-col>
                    <div>
                        <el-button type="primary" style="margin-right:10px;margin-bottom:2px;" @click="addTrumpet">新增
                        </el-button>
                        <el-button type="primary" style="margin-right:10px;margin-bottom:2px;" @click="batchCreate">批量创建
                        </el-button>
                    </div>
                </el-col>
                <el-col style="display: flex;justify-content: flex-end">
                    <el-input placeholder="请输入小号昵称" class="input-with-select" v-model="searchForm.name"
                              style="width:40%" @keyup.enter.native="search(searchForm)">
                        <el-button slot="append" @click="search(searchForm)"><i class="el-icon-search"></i></el-button>
                    </el-input>
                </el-col>
            </el-row>
            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    label="头像"
                >
                    <template scope="scope">
                        <img :src="scope.row.icon"/>
                    </template>
                </el-table-column>
                <el-table-column
                    label="昵称"
                    prop="name">
                </el-table-column>
                <el-table-column
                    label="操作"
                    key="upload"
                    min-width="90"
                >
                    <template scope="scope">
                        <el-button class="littleButton" @click="update(scope.row)">编辑
                        </el-button>
                        <el-button class="littleButton" style="margin-left:0;" @click="del(scope.row)"
                        >删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-dialog title="" :visible.sync="dialogFormVisible" :before-close="handleClose">
                <el-form :model="form">
                    <el-form-item label="小号名" :label-width="formLabelWidth">
                        <el-input v-model="form.name" style="width:50%"></el-input>
                    </el-form-item>
                    <el-form-item label="小号头像" :label-width="formLabelWidth" class="icon-trumpet-el">
                        <input class="upload" @change='add_img' type="file"
                               style="opacity: 0;width: 148px;height: 148px;z-index:222;vertical-align: top;position: absolute">
                        <div class="icon-plus-container"
                             style="display: flex;justify-content: center;align-items: center;">
                            <i class="el-icon-plus"></i>
                        </div>
                        <div class="img-wrap" v-if="uploadIconUrl!=''">
                            <img :src="'https://imapp-image.oss-cn-hangzhou.aliyuncs.com/'+uploadIconUrl"
                                 class="border-radius" style="width: 146px;height: 146px;"/>
                        </div>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible=false;uploadIconUrl=''">取 消</el-button>
                    <el-button type="primary" @click="add()">确 定</el-button>
                </div>
            </el-dialog>
            <el-dialog title="" :visible.sync="bitchFormVisible" :before-close="handleClose">
                <el-form>
                    <el-form-item label="创建数量" :label-width="formLabelWidth">
                        <el-input v-model="numberCreate" style="width:50%" min="1" max="200" type="number"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="bitchFormVisible=false;">取 消</el-button>
                    <el-button type="primary" @click="ensureBatch(numberCreate)">确 定</el-button>
                </div>
            </el-dialog>
            <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="30%"
            >
                <span>确认删除小号？</span>
                <span slot="footer" class="dialog-footer">
                   <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="deleteEnsure()">确 定</el-button>
                </span>
            </el-dialog>
            <div class="Pagination">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="nowPageSize"
                    :page-sizes="[5, 10, 20, 40]"
                    :total="txcount"
                    layout="total, sizes, prev, pager, next, jumper"
                >
                </el-pagination>
            </div>
            <!--<el-form :model="quizInfo" ref="quizInfo" label-width="110px" class="form food_form">-->
            <!--<div>-->
            <!--<el-form-item label="竞猜总投入：" prop="name">-->
            <!--{{quizInfo.topic}}-->
            <!--</el-form-item>-->
            <!--<el-form-item label="总输赢：" prop="name">-->
            <!--{{quizInfo.detail}}-->
            <!--</el-form-item>-->
            <!--</div>-->
            <!--</el-form>-->

        </div>
    </div>

</template>

<script>
    import {baseUrl, baseImgPath} from "@/config/env";

    export default {
        data() {
            return {
                id: '',
                tableData: [],
                txcount: 0,
                uploadIconUrl: '',
                searchForm: {},
                currentPage: 1,
                nowPageSize: 10,
                dialogFormVisible: false,
                bitchFormVisible: false,
                numberCreate: '',
                formLabelWidth: '120px',
                imgData: {
                    accept: "image/gif, image/jpeg, image/png, image/jpg,image/webp"
                },
                searchInfo: '',
                activeName: 'first',
                quizInfo: {topic: '', detail: ''},
                form: {name: ''},
                dialogVisible: false,
                delForm: []

            };
        },
        created() {
            const form = {page: 1, size: 10}
            this.getData(form);
        },
        methods: {
            getData(form) {
                this.$ajax({
                    method: "POST",
                    url: BaseUrl + 'agent/query',
                    data: form,
                    headers: {'token': sessionStorage.getItem('token')}
                }).then(response => {
                    if (response.data.flag == 200) {
                        this.tableData = response.data.data.data;
                        this.txcount = response.data.data.count
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
            handleSizeChange(pageSize) {
                this.nowPageSize = pageSize;
                if (this.searchForm.name == undefined) {
                    var listParams = {
                        page: 1,
                        size: pageSize,
                    };
                } else {
                    this.searchForm.page = 1;
                    this.searchForm.size = pageSize
                    var listParams = this.searchForm
                }
                this.getData(listParams);
            },
            handleCurrentChange(pageValue) {
                this.currentPage = pageValue;
                if (this.searchForm.name == undefined) {
                    var listParams = {
                        page: pageValue,
                        size: this.nowPageSize || 10,
                    };
                } else {
                    this.searchForm.page = pageValue;
                    this.searchForm.size = this.nowPageSize || 10;
                    var listParams = this.searchForm
                }

                this.getData(listParams);
            },
            addTrumpet() {
                this.dialogFormVisible = true;
                this.form = {}
            },
            add_img(event) {
                if(this.uploadIconUrl!==''&&event.target.files[0]!==undefined){
                    this.$ajax({
                        method: "POST",
                        url: BaseUrl + 'common/cleanImage',
                        params: {objectName:this.uploadIconUrl},
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
                            this.uploadIconUrl=''
                        } else if (response.data.flag == 201) {
                            this.$alert(response.data.msg + '，请重新登录', '提示', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    this.$router.push('/')
                                }
                            });
                        }
                    });
                }
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
                            this.uploadIconUrl = response.data.data;
                            this.form.icon = response.data.data;
                        });
                    });
            },
            update(id) {
                this.dialogFormVisible = true;
                this.form = id
            },
            search(searchForm) {
                searchForm.page = 1;
                searchForm.size = this.nowPageSize || 10;
                this.getData(searchForm)
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();

                        this.uploadIconUrl = ''
                    })
                    .catch(_ => {
                    });
            },
            add() {
                if (this.form.name == undefined) {
                    this.$alert('请填写昵称', '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$message({
                                type: 'info',
                                message: `error: ${ response.data.msg + ',请重试'}`
                            });
                        }
                    });
                } else {
                    if (this.form.id == undefined) {
                        this.$ajax({
                            method: "POST",
                            url: BaseUrl + 'agent/new',
                            data: this.form,
                            headers: {'token': sessionStorage.getItem('token')}
                        }).then(response => {
                            if (response.data.flag == '200') {
                                this.$alert(response.data.msg, '提示', {
                                    confirmButtonText: '确定',
                                    callback: action => {
                                        this.getData({page: 1, size: 10})
                                    }
                                });
                                this.dialogFormVisible = false
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
                    } else {
                        this.$ajax({
                            method: "POST",
                            url: BaseUrl + 'agent/update',
                            data: this.form,
                            headers: {'token': sessionStorage.getItem('token')}
                        }).then(response => {
                            if (response.data.flag == '200') {
                                this.$alert(response.data.msg, '提示', {
                                    confirmButtonText: '确定',
                                    callback: action => {
                                        this.getData({page: 1, size: 10})
                                    }
                                });
                                this.dialogFormVisible = false
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
                    }
                }
            },
            del(id) {
                this.delForm = [];
                this.dialogVisible = true;
                this.delForm.push(id);
            },
            deleteEnsure() {
                this.dialogVisible = false;
                this.$ajax({
                    method: "POST",
                    url: BaseUrl + 'agent/remove',
                    data: this.delForm,
                    headers: {'token': sessionStorage.getItem('token')}
                }).then(response => {
                    if (response.data.flag == 200) {
                        this.$message({
                            type: 'success',
                            message: '删除成功!',
                            callback: action => {
                                this.getData({page: 1, size: 10})
                            }
                        });
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
                });
            },
            batchCreate() {
                this.bitchFormVisible = true;
                this.numberCreate = '';
            },
            ensureBatch(numberCreate) {
                if (numberCreate > 200 || numberCreate < 1) {
                    this.$alert('请输入1～200的数字', '提示', {
                        confirmButtonText: '确定',
                    });
                } else {
                    this.$ajax({
                        method: "POST",
                        url: BaseUrl + 'agent/create',
                        params: {num: Number(numberCreate)},
                        headers: {'token': sessionStorage.getItem('token')}
                    }).then(response => {
                        if (response.data.flag == '200') {
                            this.$alert(response.data.msg, '提示', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    this.getData({page: 1, size: 10})
                                }
                            });
                            this.bitchFormVisible = false
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
                }

            }
        },

    };
</script>

<style lang="less" scoped>
    @import "../style/mixin";

    .table_container {
        padding: 20px;
    }

    .littleButton {
        padding: 5px 10px !important;
        margin-left: 0 !important;
    }

    .border-radius {
        border-radius: 6px;
        height: auto;
        width: 148px
    }

    .icon-trumpet-el {
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
            position: absolute;
            top: 0;
        }
    }
</style>
