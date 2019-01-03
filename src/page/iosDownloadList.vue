<template>
    <div class="fillcontain">
        <div class="table_container">
            <div style="display:flex;margin-bottom: 30px;">
                <el-button type="primary" @click="deleteAll()"
                           v-bind:disabled="multipleSelection==null||multipleSelection.length==0">批量删除
                </el-button>
                <el-button type="primary" @click="addDownload()">新增排行榜</el-button>
            </div>
            <el-table
                :data="info"
                style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column
                    type="selection"
                    width="55">
                </el-table-column>
                <el-table-column
                    label="顺序"
                    prop="sort">
                </el-table-column>
                <el-table-column
                    label="排行榜名称"
                    prop="title">
                </el-table-column>
                <el-table-column
                    label="排序标准"
                    prop="rules">
                </el-table-column>
                <el-table-column
                    label="应用数量"
                    prop="itemNumOfAll">
                </el-table-column>
                <el-table-column label="操作" width="200">
                    <template scope="scope">
                        <el-button class="littleButton"
                                   @click="updateDownload(scope.row.id,scope.row.title,scope.row.rule,scope.row.sort)">
                            编辑
                        </el-button>
                        <el-button class="littleButton"
                                   @click="downloadSort(scope.row.id,scope.row.title,scope.row.sort)">设置顺序
                        </el-button>
                    </template>
                </el-table-column>

            </el-table>

        </div>
        <el-dialog title="" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="排行榜名称：">{{form.title}}</el-form-item>
                <el-form-item label="顺序：" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off" type="number" min="1"
                              :max="info.length"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" align="center">
                <el-button type="primary" @click="ensureSort()">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="" :visible.sync="dialogFormVisibleSort" align="center">
            <el-form :model="sortItemForm">
                <el-form-item label="排行榜名称：" :label-width="formLabelWidth">
                    <el-input v-model="sortItemForm.title" autocomplete="off" maxlength="6"
                              onkeyup="this.value=this.value.replace(/^ +| +$/g,'')" placeholder="最多输入六位"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" align="center">
                <el-button type="primary" @click="addNewSort()"
                           v-bind:disabled="sortItemForm.title===undefined||sortItemForm.title===''">确 定
                </el-button>
            </div>
        </el-dialog>
        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%"
        >
            <span>确认删除此排行榜？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="ensureDelete()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import {baseUrl, baseImgPath} from '@/config/env'
    import {
        cityGuess,
        getResturants,
        getResturantsCount,
        foodCategory,
        updateResturant,
        searchplace,
        deleteResturant
    } from '@/api/getData'

    export default {
        data() {
            return {
                info: [],
                url: '',
                dialogFormVisible: false,
                dialogFormVisibleSort: false,
                dialogVisible: false,
                formLabelWidth: '110px',
                form: {},
                multipleSelection: null,
                sortItemForm: {},
                deleAppId: []
            }
        },
        created() {
            this.getData()
        },
        methods: {
            getData() {
                this.$ajax.get(BaseUrl + 'ranking/title', {
                    headers: {
                        'token': sessionStorage.getItem('token'),
                        'device': 'ios'
                    }
                }).then(response => {
                    this.info = response.data.data
                    this.info.forEach(item => {
                        if (item.rule != undefined) {
                            switch (item.rule.split(':')[0]) {
                                case 'add':
                                    item.rules = '添加时间'
                                    break;
                                case 'new':
                                    item.rules = '最新版本发布'
                                    break;
                                case 'down':
                                    item.rules = '下载量'
                                    break;
                                case 'touch':
                                    item.rules = '点击量'
                                    break
                            }


                        }
                    })
                })

            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
                this.deleAppId = [];
                for (let i = 0; i < this.multipleSelection.length; i++) {
                    this.deleAppId.push(this.multipleSelection[i].id)
                }
            },
            handleCurrentChange(pageValue) {
                this.currentPage = pageValue;
                this.getData()
            },
            downloadSort(id, title, sort) {
                this.dialogFormVisible = true
                this.form.id = id
                this.form.title = title
                this.form.sort = sort
            },
            deleteAll() {
                this.dialogVisible = true
            },
            ensureDelete() {
                this.$ajax({
                    method: "POST",
                    url: BaseUrl + 'ranking/del/ranktitle',
                    data: this.deleAppId,
                    headers: {'token': sessionStorage.getItem('token'), 'device': 'ios'}
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
                        this.$alert(response.data.msg, '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.dialogFormVisibleSort = false;
                                this.getData()
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
                this.dialogVisible = false
            },
            ensureSort() {
                this.dialogFormVisible = false
            },
            addDownload() {
                this.dialogFormVisibleSort = true
            },
            addNewSort() {
                if (this.sortItemForm.title.length < 2) {
                    this.$alert('请输入正确的排行榜名称', '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$message({
                                type: 'info',
                                message: `error: ${ response.data.msg + ',请重试'}`
                            });
                        }
                    });
                } else {
                    this.$ajax({
                        method: "POST",
                        url: BaseUrl + 'ranking/add/ranktitle',
                        data: this.sortItemForm,
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
                            this.$alert(response.data.msg, '提示', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    this.dialogFormVisibleSort = false;
                                    this.getData()
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
                }
            },
            updateDownload(id, title, rule, sort) {
                this.$router.push({
                    path: '/addDownload',
                    query: {id: id, title: title, rule: rule, sort: sort, type: 'ios'}
                })
            },


        },
    }
</script>

<style lang="less" scoped>
    @import '../style/mixin';

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

    .littleButton {
        padding: 5px 10px !important;
        margin-left: 0 !important;
    }

    /*.el-button{*/
    /*border: 0;*/
    /*}*/
</style>
