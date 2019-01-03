<template>
    <div class="fillcontain">
        <div class="table_container">
            <div style="display:flex;margin-bottom: 30px;">
                <el-button type="primary" @click="addTag()">新增模块</el-button>
            </div>
            <el-table
                :data="positionList"
                style="width: 100%">
                <el-table-column
                    label="顺序"
                    prop="sort">
                </el-table-column>
                <el-table-column
                    label="标题"
                >
                    <template scope="scope">
                        <span>{{scope.row.title}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="列表样式"
                    prop="show">
                </el-table-column>
                <el-table-column
                    label="首页显示应用数量"
                    prop="itemNum">
                </el-table-column>
                <el-table-column
                    label="应用数量"
                    prop="itemNumOfAll">
                </el-table-column>
                <el-table-column
                    label="状态"
                    prop="status">
                </el-table-column>
                <el-table-column label="操作" width="200">
                    <template scope="scope">
                        <el-button class="littleButton"
                                   @click="update(scope.row.id,scope.row.code,scope.row.itemType,scope.row)">编辑
                        </el-button>
                        <el-button class="littleButton" @click="sortMoudle(scope.row.id)">设置排序</el-button>
                        <el-button class="littleButton" @click="deletePosition(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-dialog title="" :visible.sync="dialogFormVisible">
                <el-form :model="form" ref="form" :rules="rule">
                    <el-form-item label="列表类型" :label-width="formLabelWidth" prop="itemType">
                        <el-select v-model="form.itemType" placeholder="请选择列表类型">
                            <el-option label="平铺" value="item-app:fixationList">固定</el-option>
                            <el-option label="竖向" value="item-app:verticalListt">竖向</el-option>
                            <el-option label="滑动" value="item-app:horizontalList">滑动</el-option>
                            <el-option label="广告" value="item-promote:advertise">广告</el-option>
                            <el-option label="热讯" value="item-news:hot">热讯</el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="模块标题" :label-width="formLabelWidth" prop="title"
                                  v-if="form.itemType!='item-promote:advertise'">
                        <el-input v-model="form.title" auto-complete="off" style="width:80%"></el-input>
                    </el-form-item>
                    <el-form-item label="地址" :label-width="formLabelWidth" prop="address"
                                  v-if="form.itemType=='item-promote:advertise'">
                        <el-input v-model="address" auto-complete="off" style="width:80%"></el-input>
                    </el-form-item>
                    <el-form-item label="推广图" :label-width="formLabelWidth" prop="advertisePic"
                                  v-if="form.itemType=='item-promote:advertise'">
                        <div style="display: flex;align-items:flex-end;">
                            <div style="width:150px;height:70px;border: 1px #999 solid;margin-right: 10px"><img
                                :src="'https://imapp-image.oss-cn-hangzhou.aliyuncs.com/'+advertisePic"
                                v-if="advertisePic!==null&&advertisePic!=''" style="width:100%;height:100%;"/></div>
                            <el-button type="primary" v-if="advertisePic===null" style="position: relative">
                                <span>上传</span> <input @change='add_img' type="file"
                                                       style="opacity: 0;width:70px;height: 40px;position: absolute;top:0;left:0">
                            </el-button>
                            <el-button type="primary" v-if="advertisePic!==null" @click="deletePic()">删除
                            </el-button>
                        </div>
                    </el-form-item>
                    <el-form-item label="备注" :label-width="formLabelWidth" prop="remarks"
                                  v-if="form.itemType=='item-promote:advertise'">
                        <el-input v-model="remarks" auto-complete="off" style="width:80%"></el-input>
                    </el-form-item>
                    <el-form-item label="首页显示APP个数" :label-width="formLabelWidth" prop="itemNum"
                                  v-if="form.itemType!='item-promote:advertise'&&form.itemType!='item-news:hot'">
                        <el-input v-model="form.itemNum" auto-complete="off" style="width:80%" type="number" min="1"
                                  max="50"></el-input>
                    </el-form-item>
                    <el-form-item label="状态" :label-width="formLabelWidth" prop="state">
                        <el-select v-model="form.state" placeholder="请选择展示状态">
                            <el-option label="关闭" value="0">关闭</el-option>
                            <el-option label="开放" value="1">开放</el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false;">取 消</el-button>
                    <el-button type="primary" @click="ensureAdd">确 定</el-button>
                </div>
            </el-dialog>
            <el-dialog title="" :visible.sync="dialogFormVisibleMoudleSort">
                <el-form :model="sortMoudleForm">
                    <el-form-item label="排序" :label-width="formLabelWidth" prop="sort">
                        <el-input v-model="sortMoudleForm.sort" auto-complete="off" style="width:80%"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisibleMoudleSort = false;">取 消</el-button>
                    <el-button type="primary" @click="ensureSortMoudle">确 定</el-button>
                </div>
            </el-dialog>
            <el-dialog title="" :visible.sync="dialogFormVisibleupdate">
                <el-form :model="updataNewsForm">
                    <el-form-item label="模块名称" label-width="110px" prop="sort">
                        <el-input v-model="updataNewsForm.title" auto-complete="off" style="width:200px"></el-input>
                    </el-form-item>
                    <el-form-item label="状态" label-width="110px" prop="state">
                        <el-select v-model="updataNewsForm.state" placeholder="请选择展示状态">
                            <el-option label="关闭" value="0">关闭</el-option>
                            <el-option label="开放" value="1">开放</el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisibleupdate = false;">取 消</el-button>
                    <el-button type="primary" @click="ensureUpdateMoudle">确 定</el-button>
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
    import {baseUrl, baseImgPath} from "@/config/env";

    export default {
        data() {
            return {
                imgData: {
                    accept: "image/gif, image/jpeg, image/png, image/jpg,image/webp"
                },
                positionList: [],
                dialogFormVisible: false,
                dialogVisible: false,
                dialogFormVisibleMoudleSort: false,
                dialogFormVisibleupdate: false,
                advertisePic: null,
                address: '',
                deleteId: '',
                form: {
                    // id: '',
                    title: '',
                    titleStyle: '',
                    // showStyle: '',
                    state: '',
                    itemType: '',
                    // sort: '',
                    itemNum: ''
                },
                remarks: '',
                formLabelWidth: '200px',
                sortMoudleForm: {},
                updataNewsForm: {},
                rule: {
                    title: [
                        {required: true, message: '请输入模块名称', trigger: 'blur'},
                    ],
                    state: [
                        {required: true, message: '请选择状态', trigger: 'blur'}
                    ],
                    itemType: [
                        {required: true, message: '请选择列表类型', trigger: 'blur'}
                    ],
                    itemNum: [
                        {
                            type: 'number', required: true, message: '请输入数字', trigger: 'blur', transform(value) {
                                return Number(value);
                            }
                        }
                    ],
                },
            };
        },
        created() {
            this.getTagData()
        },
        methods: {
            getTagData() {
                this.$ajax.get(BaseUrl + "position/title", {
                    headers: {
                        'token': sessionStorage.getItem('token'),
                        'device': 'android'
                    }
                }).then(response => {
                    if (response.data.flag == 200) {
                        this.positionList = response.data.data;
                        this.positionList.forEach(item => {
                            if (item.itemType === 'item-app:fixationList') {
                                item.show = '固定'
                            } else if (item.itemType === 'item-app:horizontalList') {
                                item.show = '滑动'
                            } else if (item.itemType === 'item-promote:advertise') {
                                item.show = '广告'
                            } else if (item.itemType === 'item-app:verticalList') {
                                item.show = '竖向'
                            } else if (item.itemType === 'item-news:hot') {
                                item.show = '热讯'
                            }
                        });
                        this.positionList.forEach(item => {
                            if (item.state == 0) {
                                item.status = '关闭'
                            } else {
                                item.status = '开放'
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
            },
            addTag() {
                this.dialogFormVisible = true;
                this.form = {
                    // titleStyle:'',
                    // id: '',
                    title: '',
                    // showStyle:'',
                    state: '',
                    itemType: '',
                    // code: '',
                    // sort: '',
                    itemNum: ''
                }
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
                            this.$alert(response.data.msg + '请重新登录', '提示', {
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
                            this.advertisePic = response.data.data;
                        });
                    });
            },
            update(id, code, itemType, item) {
                if (itemType !== 'item-news:hot') {
                    this.$router.push({path: "/appSort", query: {type: 'android', id: id, code: code}});
                } else {
                    this.updataNewsForm = item
                    this.dialogFormVisibleupdate = true
                }
            },
            ensureUpdateMoudle() {
                this.$ajax({
                    method: "POST",
                    url: BaseUrl + 'position/update',
                    data: this.updataNewsForm,
                    headers: {'token': sessionStorage.getItem('token'), 'device': 'android'}
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
                        this.dialogFormVisibleupdate = false;
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
            },
            deletePic(){
                this.$ajax({
                    method: "POST",
                    url: BaseUrl + 'common/cleanImage',
                    params: {objectName:this.advertisePic},
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
                        this.advertisePic=null
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
            ensureAdd() {
                if (this.form.itemType == 'item-news:hot') {
                    this.form.itemNum = 1
                }
                this.$refs.form.validate(async (valid) => {
                    if (valid && ((this.form.itemNum != '' && this.form.itemNum <= 50) || (this.address != '' && this.advertisePic !== null && this.remarks != ''))) {
                        if (this.form.itemType != 'item-promote:advertise') {
                            this.form.titleStyle = 'text'
                            var formData = this.form
                        } else {
                            var formData = {
                                title: this.remarks,
                                linkText: {img: this.advertisePic, url: this.address},
                                state: this.form.state,
                                itemType: 'item-promote:advertise',
                                titleStyle: 'text',
                                itemNum: 1
                            }
                        }
                        this.$ajax({
                            method: "POST",
                            url: BaseUrl + 'position/add',
                            data: formData,
                            headers: {'token': sessionStorage.getItem('token'), 'device': 'android'}
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

                    } else if (this.form.itemNum > 50) {
                        this.$alert('首页显示数量不能大于50', '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$message({
                                    type: 'info',
                                    message: ` ${ response.data.msg + ',请重试'}`
                                });
                            }
                        });
                    } else {
                        this.$alert('请填写完整', '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$message({
                                    type: 'info',
                                    message: ` ${ response.data.msg + ',请重试'}`
                                });
                            }
                        });
                    }

                })


            },
            sortMoudle(id) {
                this.dialogFormVisibleMoudleSort = true;
                this.positionList.forEach(item => {
                    if (item.id == id) {
                        this.sortMoudleForm.title = item.title;
                        this.sortMoudleForm.state = item.state;
                        this.sortMoudleForm.itemType = item.itemType;
                        this.sortMoudleForm.id = id;
                        this.sortMoudleForm.code = item.code;
                        this.sortMoudleForm.sort = item.sort;
                        this.sortMoudleForm.itemNum = item.itemNum
                    }
                });

            },
            ensureSortMoudle() {
                this.$ajax({
                    method: "POST",
                    url: BaseUrl + 'position/update',
                    data: this.sortMoudleForm,
                    headers: {'token': sessionStorage.getItem('token'), 'device': 'android'}
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
                        this.dialogFormVisibleMoudleSort = false;
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
                })

            },
            deletePosition(id) {
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
                this.$ajax.get(BaseUrl + 'position/delete/' + this.deleteId, {
                    headers: {
                        'token': sessionStorage.getItem('token'),
                        'device': 'android'
                    }
                }).then(response => {
                    if (response.data.flag == 200) {
                        var t;
                        clearTimeout(t)
                        var that = this
                        t = setTimeout(function () {
                            that.$message({
                                type: 'success',
                                message: '删除成功!',
                            });
                        }, 10);
                        that.getTagData()
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

    /*.el-button{*/
    /*border: 0;*/
    /*}*/
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

    .littleButton {
        padding: 5px 10px !important;
        margin-left: 0 !important;
    }
</style>
