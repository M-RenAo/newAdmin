<template>
    <div>
        <el-row style="margin-top: 20px;">
            <el-col style="padding: 0 20px">
                <el-form :model="rankTitle" ref="rankTitle" label-width="110px" class="form food_form">
                    <div>
                        <el-form-item label="排行榜名称：" prop="rankTitle">
                            <el-input v-model="rankTitle.title" style="width:200px" maxlength="6"
                                      onkeyup="this.value=this.value.replace(/^ +| +$/g,'')"></el-input>
                        </el-form-item>
                        <el-form-item label="排序标准：" prop="fileTag">
                            <el-select v-model="sortRule" placeholder="请选择" style="width:200px;" @change="getData">
                                <el-option
                                    v-for="(item,index) in sortList"
                                    :label="item.label"
                                    :value="item.code"
                                    :key="index">
                                </el-option>
                            </el-select>
                            <el-select v-model="desc" style="width:80px" @change="getData">
                                <el-option label="正序" value="asc">正序</el-option>
                                <el-option label="倒序" value="desc">倒序</el-option>
                            </el-select>
                            <el-button @click="reset" type="primary">重置排序</el-button>
                        </el-form-item>
                    </div>
                    <div>
                        <div style="margin-bottom: 10px">
                            <el-button type="primary" @click="deleteAll()"
                                       v-bind:disabled="multipleSelection==null||multipleSelection.length==0"
                                       style="margin-right:10px">批量删除
                            </el-button>
                            <el-select v-model="fileTag" placeholder="请选择" @change="searchAppByTagCode">
                                <el-option label="全部分类" value="-1"></el-option>
                                <el-option
                                    v-for="(item,index) in tagList"
                                    :label="item.title"
                                    :value="item.code" :key="index">
                                </el-option>
                                <el-option label="未定义" value="0"></el-option>
                            </el-select>
                            <el-input placeholder="请输入应用名" class="input-with-select" v-model="searchInfo"
                                      style="width:200px;margin-left:10px" @keyup.enter.native="searchApp(searchInfo)">
                                <el-button slot="append" @click="searchApp(searchInfo)"><i class="el-icon-search"></i>
                                </el-button>
                            </el-input>
                            <el-button type="primary" @click="addApptohere()" style="margin-left: 10px">添加应用</el-button>
                        </div>
                        <el-table
                            :data="info"
                            @selection-change="handleSelectionChange"
                            style="width: 100%">
                            <el-table-column
                                type="selection"
                                width="55">
                            </el-table-column>
                            <el-table-column
                                label="顺序"
                                min-width="50">
                                <template scope="scope">
                                    {{scope.row.index}}
                                </template>
                            </el-table-column>
                            <el-table-column
                                label="sortLabel"
                                min-width="50">
                                <template scope="scope">
                                    {{scope.row.sortLable}}
                                </template>
                            </el-table-column>
                            <el-table-column label="logo" prop="fileIcon" min-width="50">
                                <template scope="scope">
                                    <img :src="'https://imapp-image.oss-cn-hangzhou.aliyuncs.com/'+scope.row.fileIcon"
                                         style="width:30px;height:30px;">
                                </template>

                            </el-table-column>
                            <el-table-column
                                label="名称"
                                prop="appName"
                                min-width="50">
                            </el-table-column>
                            <el-table-column
                                label="大小"
                                prop="fileSize" min-width="50">
                            </el-table-column>
                            <el-table-column
                                label="版本"
                                prop="fileVersion" min-width="50">
                            </el-table-column>
                            <el-table-column
                                label="分类"
                                prop="fileTag" min-width="50">
                            </el-table-column>
                            <el-table-column
                                label="最新版本发布"
                                prop="fileDate" min-width="50">
                            </el-table-column>
                            <el-table-column
                                label="下载量"
                                min-width="50">
                                <template scope="scope">
                                    {{scope.row.shamFileDownNum===undefined?scope.row.fileDownNum:scope.row.shamFileDownNum+scope.row.fileDownNum}}
                                </template>
                            </el-table-column>
                            <el-table-column
                                label="点击量"
                                prop="touchNum" min-width="50">
                            </el-table-column>
                            <el-table-column label="操作" min-width="98">
                                <template scope="scope">
                                    <el-button class="littleButton"
                                               @click="updateAppSort(scope.row.appName,scope.row.fileId,scope.row.index,scope.row)"
                                               key="edit">设置顺序
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="Pagination">
                            <el-pagination
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page.sync="currentPage"
                                :page-size.sync="nowPageSize"
                                :page-sizes="[5, 10, 20, 40]"
                                :total="txcount"
                                layout="total, sizes, prev, pager, next, jumper"
                            >
                            </el-pagination>
                        </div>
                    </div>
                    <div style="margin-top:30px">
                        <el-button type="primary" @click="saveUpdateDown(appForm)">保存</el-button>
                    </div>
                </el-form>

            </el-col>
        </el-row>
        <el-dialog title="" :visible.sync="dialogFormVisible">
            <el-form :model="rankAndApp">
                <el-form-item label="应用名称：" :label-width="formLabelWidth">
                    <div>{{appName}}</div>
                </el-form-item>
                <el-form-item label="顺序：" :label-width="formLabelWidth">
                    <el-input v-model="rankAndApp.sortLable" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" align="center">
                <el-button type="primary" @click="ensureSortApp()">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog :visible.sync="dialogTableVisible" min-width="600px" :close-on-click-modal=false>
            <div>
                <el-select v-model="fileTagUnchoice" placeholder="请选择" @change="searchUnchoiceAppByTag">
                    <el-option label="全部" value="-1"></el-option>
                    <el-option
                        v-for="item in tagList"
                        :key="item.code"
                        :label="item.title"
                        :value="item.code">
                    </el-option>
                    <el-option label="未定义" value="0"></el-option>
                </el-select>
                <el-input placeholder="请输入应用名" class="input-with-select" v-model="unchoiceAppName"
                          style="width:200px;margin-left:10px" @keyup.enter.native="searchUnchoiceApp(unchoiceAppName)">
                    <el-button slot="append" @click="searchUnchoiceApp(unchoiceAppName)"><i class="el-icon-search"></i>
                    </el-button>
                </el-input>
            </div>
            <el-table
                :data="unChoiceAppList"
                @selection-change="handleSelectionChangeApp"
                style="width: 100%">
                <el-table-column
                    type="selection"
                    width="55">
                </el-table-column>
                <el-table-column label="logo" prop="fileIcon" min-width="50">
                    <template scope="scope">
                        <img :src="'https://imapp-image.oss-cn-hangzhou.aliyuncs.com/'+scope.row.fileIcon"
                             style="width:30px;height:30px;">
                    </template>

                </el-table-column>
                <el-table-column
                    label="名称"
                    prop="appName"
                    min-width="50">
                </el-table-column>
                <el-table-column
                    label="大小"
                    prop="fileSize" min-width="50">
                </el-table-column>
                <el-table-column
                    label="版本"
                    prop="fileVersion" min-width="50">
                </el-table-column>
                <el-table-column
                    label="最新版本发布"
                    prop="fileDate" min-width="50">
                </el-table-column>
                <el-table-column
                    label="分类"
                    prop="fileTag" min-width="50">
                </el-table-column>
                <el-table-column
                    label="下载量"
                    prop="fileDownNum" min-width="50">
                </el-table-column>
                <el-table-column
                    label="点击量"
                    prop="touchNum" min-width="50">
                </el-table-column>
            </el-table>
            <div class="Pagination">
                <el-pagination
                    @size-change="handleSizeChangeRank"
                    @current-change="handleCurrentChangeRank"
                    :current-page.sync="currentPageRank"
                    :page-size.sync="nowPageSizeRank"
                    :page-sizes="[5, 10, 20, 40]"
                    :total="txcountRank"
                    layout="total, sizes, prev, pager, next, jumper"
                >
                </el-pagination>
            </div>
            <el-button type="primary" @click="saveApp()" style="margin-top: 10px" v-bind:disabled="appId.length==0">保存
            </el-button>
        </el-dialog>
        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%"
        >
            <span>确认删除选中的应用吗？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="ensureDelete()">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="提示"
            :visible.sync="dialogVisibleReset"
            width="30%"
        >
            <span>确认按默认规则重置排序吗？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisibleReset = false">取 消</el-button>
                <el-button type="primary" @click="ensureReset()">确 定</el-button>
            </span>
        </el-dialog>
    </div>

</template>

<script>
    import headTop from "@/components/headTop";
    import {getCategory, addCategory, addFood} from "@/api/getData";
    import {baseUrl, baseImgPath} from "@/config/env";
    import Vue from "vue";

    let moment = require('moment')
    export default {
        data() {
            return {
                state: '',
                remarks: '',
                appForm: {},
                sortItemForm: {},
                rankTitle: {},
                formLabelWidth: '110px',
                unchoiceAppName: null,
                fileDate: '',
                value: [],
                sortRule: 'add',
                sortList: [{code: 'new', label: '最新版本发布'}, {code: "add", label: '添加时间'}, {code: 'down', label: '下载量'},
                    {
                        code: 'touch',
                        label: '点击量'
                    }],
                tagList: [],
                desc: 'asc',
                dialogFormVisible: false,
                dialogTableVisible: false,
                dialogVisible: false,
                dialogFormVisibleSort: false,
                dialogVisibleReset: false,
                info: [],
                currentPage: 1,
                nowPageSize: 10,
                txcount: 0,
                nowPageSizeRank : 10,
                currentPageRank : 1,
                txcountRank:0,
                rankAndApp: {},
                searchInfo: null,
                multipleSelection: null,
                fileTag: '-1',
                fileTagUnchoice: '-1',
                unChoiceAppList: [],
                multipleSelectionAppTohere: [],
                appId: [],
                deleAppId: [],
                appName: '',

            };
        },
        components: {
            headTop
        },
        created() {
            this.$ajax.get(BaseUrl + "apptag/all", {
                headers: {
                    'token': sessionStorage.getItem('token'),
                    'device': this.$route.query.type
                }
            }).then(response => {
                if (response.data.flag == 200) {
                    this.tagList = response.data.data;
                } else if (response.data.flag == 201) {
                    this.$alert(response.data.msg + '，请重新登录', '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$router.push('/')
                        }
                    });
                }

            });
            this.rankTitle.title = this.$route.query.title;
            if (this.$route.query.rule === undefined) {
                this.sortRule = 'add'
            } else {
                this.sortRule = this.$route.query.rule.split(':')[0];
                this.desc = this.$route.query.rule.split(':')[1];
            }

            this.getData();
        },
        computed: {},
        methods: {
            getData() {
                this.$ajax.get(BaseUrl + 'ranking/mess/', {
                    params: {
                        titleId: this.$route.query.id,
                        pageCode: this.currentPage,
                        pageSize: this.nowPageSize,
                        sortFields: this.sortRule + ':' + this.desc,
                        tagId: this.fileTag == -1 ? null : this.fileTag,
                        keyWords: (this.searchInfo != null && this.searchInfo != '') ? this.searchInfo : null
                    },
                    headers: {'token': sessionStorage.getItem('token'), 'device': this.$route.query.type}
                }).then(response => {
                    if (response.data.flag == 200) {
                        this.info = response.data.data.list
                        this.txcount = response.data.data.num
                        this.info.forEach(item => {
                            item.fileDate = moment.utc(item.fileDate).local().format('YYYY-MM-DD HH:mm:ss')
                        });
                        this.info.forEach((item, index) => {
                            item.index = index + 1 + (this.currentPage - 1) * this.nowPageSize
                        });
                        if (this.$route.query.type == 'android') {
                            this.info.forEach(item => {
                                item.fileSize = (item.fileSize / 1048576).toFixed(2) + ' M'
                            })
                        } else if (this.$route.query.type == 'ios') {
                            this.info.forEach(item => {
                                item.fileSize = item.fileSize + ' M'
                            })
                        }
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
            updateAppSort(appName, fileId, sort, row) {
                this.dialogFormVisible = true;
                this.appName = appName;
                this.rankAndApp.applyId = fileId;
                this.rankAndApp.sortLable = sort
            },
            ensureSortApp() {
                if (this.rankAndApp.sortLable >= 1 && this.rankAndApp.sortLable <= this.txcount) {
                    this.rankAndApp.titleId = this.$route.query.id;
                    this.rankAndApp.sortLable = Number(this.rankAndApp.sortLable);
                    this.$ajax({
                        method: "POST",
                        url: BaseUrl + 'ranking/update/apply',
                        data: this.rankAndApp,
                        headers: {'token': sessionStorage.getItem('token'), 'device': this.$route.query.type}
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
                                    this.dialogFormVisible = false
                                    this.getData();
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
                    this.$alert('请输入顺序1到' + this.txcount + '之间的数字', '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$message({
                                type: 'info',
                                message: `${ response.data.msg + ',请重试'}`
                            });
                        }
                    });
                }
            },
            searchAppByTagCode() {
                this.getData()
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
                this.deleAppId = [];
                for (let i = 0; i < this.multipleSelection.length; i++) {
                    this.deleAppId.push({
                        applyId: this.multipleSelection[i].fileId,
                        titleId: this.$route.query.id,
                        sort: this.multipleSelection[i].sort
                    })
                }
            },
            handleSelectionChangeApp(val) {
                this.multipleSelectionAppTohere = val;
                this.appId = [];
                for (let i = 0; i < this.multipleSelectionAppTohere.length; i++) {
                    this.appId.push({applyId: this.multipleSelectionAppTohere[i].fileId, titleId: this.$route.query.id})
                }
            },
            saveApp() {
                this.$ajax({
                    method: "POST",
                    url: BaseUrl + 'ranking/add/apply',
                    data: this.appId,
                    headers: {'token': sessionStorage.getItem('token'), 'device': this.$route.query.type}
                }).then(response => {
                    if (response.data.flag == 500) {
                        this.$alert(response.data.msg, '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$message({
                                    type: 'info',
                                    message: ` ${ response.data.msg + ',请重试'}`
                                });
                            }
                        });
                    } else if (response.data.flag == 200) {
                        this.$alert(response.data.msg, '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.dialogTableVisible = false
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
            },
            searchApp(text) {
                this.getData()
            },
            handleSizeChange(pageSize) {
                this.nowPageSize = pageSize
                this.getData()
            },
            handleCurrentChange(pageValue) {
                this.currentPage = pageValue;
                this.getData()
            },
            reset() {
                this.dialogVisibleReset = true;
            },
            ensureReset() {
                this.$ajax.get(BaseUrl + "ranking/label/reset", {
                    params: {rankId: this.$route.query.id},
                    headers: {
                        'token': sessionStorage.getItem('token'),
                        'device': this.$route.query.type
                    }
                }).then(response => {
                    if (response.data.flag == 200) {
                        this.$alert(response.data.msg, '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
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
                    } else {
                        this.$alert(response.data.msg, '提示', {
                            confirmButtonText: '确定',
                        });
                    }

                });
                this.dialogVisibleReset = false
            },
            deleteAll() {
                this.dialogVisible = true
            },
            ensureDelete() {
                this.$ajax({
                    method: "POST",
                    url: BaseUrl + 'ranking/del/apply',
                    data: this.deleAppId,
                    headers: {'token': sessionStorage.getItem('token'), 'device': this.$route.query.type}
                }).then(response => {
                    if (response.data.flag == 500) {
                        this.$alert(response.data.msg, '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$message({
                                    type: 'info',
                                    message: ` ${ response.data.msg + ',请重试'}`
                                });
                            }
                        });
                    } else if (response.data.flag == 200) {
                        this.$alert(response.data.msg, '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.getData()
                                this.dialogVisible = false
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
            addApptohere() {
                this.dialogTableVisible = true;
                this.nowPageSizeRank = 10;
                this.currentPageRank = 1;
                this.getApp()
            },
            searchUnchoiceAppByTag() {
                this.getApp()
            },
            searchUnchoiceApp(text) {
                this.getApp()
            },
            saveUpdateDown() {
                if (this.rankTitle.title.length < 2) {
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
                    this.rankTitle.id = this.$route.query.id;
                    this.rankTitle.sort = this.$route.query.sort;
                    this.rankTitle.rule = this.sortRule + ':' + this.desc
                    this.$ajax({
                        method: "POST",
                        url: BaseUrl + 'ranking/update/ranktitle',
                        data: this.rankTitle,
                        headers: {'token': sessionStorage.getItem('token'), 'device': this.$route.query.type}
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
                                    if (this.$route.query.type == 'android') {
                                        this.$router.push("/downloadList")
                                    } else if (this.$route.query.type == 'ios') {
                                        this.$router.push("/iosDownloadList")
                                    }
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
            handleSizeChangeRank(pageSize){
                this.nowPageSizeRank = pageSize;
                this.currentPageRank = 1;
                this.getApp();
            },
            handleCurrentChangeRank(pageValue){
                this.currentPageRank = pageValue;
                this.getApp()
            },
            getApp() {
                this.$ajax
                    .get(`${BaseUrl}apply/all`, {
                        params: {
                            pageCode:  this.currentPageRank,
                            pageSize: this.nowPageSizeRank,
                            state: 1,
                            fileState: 1,
                            tagId: this.fileTagUnchoice == -1 ? null : this.fileTagUnchoice,
                            keyWords: (this.unchoiceAppName != null && this.unchoiceAppName != '') ? this.unchoiceAppName : null,
                            rankId: this.$route.query.id
                        },
                        headers: {'token': sessionStorage.getItem('token'), 'device': this.$route.query.type}
                    })
                    .then(response => {
                        if (response.data.flag == 200) {
                            var that = this
                            that.unChoiceAppList = response.data.data.appList
                            this.txcountRank=response.data.data.fileNum;
                            this.unChoiceAppList.forEach(item => {
                                if (item.fileState == 1) {
                                    item.appState = "已上架";
                                } else {
                                    item.appState = "未上架";
                                }
                            });
                            this.unChoiceAppList.forEach(item => {
                                item.fileDate = moment.utc(item.fileDate).local().format('YYYY-MM-DD HH:mm:ss')
                            });
                            if (this.$route.query.type == 'android') {
                                this.unChoiceAppList.forEach(item => {
                                    item.fileSize = (item.fileSize / 1048576).toFixed(2) + ' M'
                                })
                            } else if (this.$route.query.type == 'ios') {
                                this.unChoiceAppList.forEach(item => {
                                    item.fileSize = item.fileSize + ' M'
                                })
                            }

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

    };
</script>

<style lang="less" scoped>
    @import "../style/mixin";

    .icon-el-update {
        height: 100px;
        position: relative;
        .el-form-item__content {
            display: flex;
            position: absolute;
        }
        div.el-form-item__content {
            border: 0 !important;
        }
        div {
            border-radius: 6px;
            box-sizing: border-box;
            width: 100px;
            height: 100px;
            cursor: pointer;
            line-height: 100px;
            vertical-align: top;
            position: absolute;
        }
    }
</style>
