<template>
    <div>
        <el-row style="margin-top: 20px;">
            <el-col style="padding: 0 20px">
                <el-form :model="TagForm" ref="TagForm" label-width="110px" class="form food_form">
                    <div>
                        <el-form-item label="分类名称：" prop="rankTitle">
                            <el-input v-model="TagForm.title" style="width:200px" maxlength="10"></el-input>
                        </el-form-item>
                        <el-form-item label="分类图标：" :label-width="formLabelWidth" prop="title">
                            <div style="display: flex;align-items:flex-end;">
                                <div style="width:70px;height:70px;border: 1px #999 solid;margin-right: 10px"><img
                                    :src="'https://imapp-image.oss-cn-hangzhou.aliyuncs.com/'+urlTagIcon"
                                    v-if="urlTagIcon!==null" style="width:100%;height:100%;"/></div>
                                <el-button type="primary" v-if="urlTagIcon===null" style="position: relative">
                                    <span>上传</span> <input @change='add_img' type="file"
                                                           style="opacity: 0;width:70px;height: 40px;position: absolute;top:0;left:0">
                                </el-button>
                                <el-button type="primary" v-if="urlTagIcon!==null" @click="urlTagIcon=null">删除
                                </el-button>
                            </div>
                        </el-form-item>
                    </div>
                    <div>
                        <div style="margin-bottom: 10px">
                            <el-button type="primary" @click="deleteAll()"
                                       v-bind:disabled="multipleSelection==null||multipleSelection.length==0"
                                       style="margin-right:10px">批量删除
                            </el-button>
                            <el-button type="primary" @click="addApptohere()" style="margin-left: 10px">添加应用</el-button>
                        </div>
                        <el-table
                            :data="appList"
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
                            <!--<el-table-column-->
                            <!--label="sortLabel"-->
                            <!--min-width="50">-->
                            <!--<template scope="scope">-->
                            <!--{{scope.row.sortLable}}-->
                            <!--</template>-->
                            <!--</el-table-column>-->
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
                                label="上传时间"
                                prop="fileDate" min-width="50">
                            </el-table-column>
                            <el-table-column
                                label="最新更新时间"
                                prop="fileDate" min-width="50">
                            </el-table-column>
                            <el-table-column
                                label="状态"
                                prop="appState" min-width="50">
                            </el-table-column>
                            <!--<el-table-column label="操作" min-width="98">-->
                            <!--<template scope="scope">-->
                            <!--<el-button class="littleButton" @click="updateAppInfo(scope.row.fileId)" key="edit">编辑-->
                            <!--</el-button>-->
                            <!--&lt;!&ndash;<el-button class="littleButton" @click="updateAppSort(scope.row.appName,scope.row.fileId,scope.row.index,scope.row)" key="edit">设置顺序&ndash;&gt;-->
                            <!--&lt;!&ndash;</el-button>&ndash;&gt;-->
                            <!--</template>-->
                            <!--</el-table-column>-->
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
                <!--<el-select v-model="fileTagUnchoice" placeholder="请选择" @change="searchUnchoiceAppByTag">-->
                <!--<el-option label="全部分类" value="0"></el-option>-->
                <!--<el-option-->
                <!--v-for="item in tagList"-->
                <!--:key="item.code"-->
                <!--:label="item.title"-->
                <!--:value="item.code">-->
                <!--</el-option>-->
                <!--</el-select>-->
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
                    label="上传时间"
                    prop="fileDate" min-width="50">
                </el-table-column>
                <el-table-column
                    label="最新更新时间"
                    prop="fileTag" min-width="50">
                </el-table-column>
            </el-table>
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
                appForm: {},
                sortItemForm: {},
                formLabelWidth: '110px',
                unchoiceAppName: null,
                fileDate: '',
                value: [],
                sortRule: 'add',
                imgData: {
                    accept: "image/gif, image/jpeg, image/png, image/jpg,image/webp"
                },
                tagList: [],
                desc: 'asc',
                dialogFormVisible: false,
                dialogTableVisible: false,
                dialogVisible: false,
                dialogFormVisibleSort: false,
                dialogVisibleReset: false,
                appList: [],
                currentPage: 1,
                nowPageSize: 10,
                txcount: 0,
                TagForm: {},
                rankAndApp: {},
                searchInfo: null,
                multipleSelection: null,
                fileTag: '0',
                fileTagUnchoice: '0',
                unChoiceAppList: [],
                multipleSelectionAppTohere: [],
                appId: [],
                deleAppId: [],
                appName: '',
                urlTagIcon: null
            };
        },
        components: {
            headTop
        },
        created() {
            this.tagList = JSON.parse(sessionStorage.getItem('taglist'))
            this.tagList.forEach(item => {
                if (item.code === this.$route.query.code) {
                    this.TagForm = item
                }
            })
            // console.log(this.TagForm);
            if (this.TagForm.icon !== undefined && this.TagForm.icon !== 'tag_default.jpg') {
                this.urlTagIcon = this.TagForm.icon
            }
            this.getData();
        },
        computed: {},
        methods: {
            getData() {
                this.$ajax
                    .get(`${BaseUrl}apptag/mess`, {
                        params: {
                            pageCode: this.currentPage,
                            pageSize: this.nowPageSize,
                            tagId: this.$route.query.code,
                            keyWords: null
                        },
                        headers: {'token': sessionStorage.getItem('token'), 'device': this.$route.query.type}
                    })
                    .then(response => {
                        // console.log(pageSize)
                        // console.log(pageValue)
                        if (response.data.flag == 200) {
                            var that = this
                            // this.unChoiceAppList = Array.from(new Set([...response.data.data.appList,...this.info]))
                            that.appList = response.data.data.appList
                            this.txcount = response.data.data.fileNum
                            this.appList.forEach(item => {
                                if (item.fileState == 1) {
                                    item.appState = "已上架";
                                } else {
                                    item.appState = "未上架";
                                }
                            });
                            this.appList.forEach((item, index) => {
                                // console.log(index)
                                item.index = index + 1 + (this.currentPage - 1) * this.nowPageSize
                            });
                            this.appList.forEach(item => {
                                item.fileDate = moment.utc(item.fileDate).local().format('YYYY-MM-DD HH:mm:ss')
                            });
                            if (this.$route.query.type == 'android') {
                                this.appList.forEach(item => {
                                    item.fileSize = (item.fileSize / 1048576).toFixed(2) + ' M'
                                })
                            } else if (this.$route.query.type == 'ios') {
                                this.appList.forEach(item => {
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
                        // const deleteArr = ["fileName", "type", "host"];
                        // deleteArr.forEach(item => {
                        //     // 删除掉不需要传的参数
                        //     delete uploadPolicy[item];
                        // });
                        // console.log(event.target.files)
                        let img1 = event.target.files[0];
                        let type = img1.type; //文件的类型，判断是否是图片
                        // console.log(type)
                        let size = img1.size; //文件的大小，判断图片的大小
                        // console.log(img1)
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
                        form.append('x:user', sessionStorage.getItem('userName'));
                        form.append('x:filename', uploadPolicy['fileName']);
                        form.append('x:type', uploadPolicy['type'])
                        this.$ajax({
                            method: "POST",
                            url: this.UploadUrl,
                            data: form,
                        }).then(response => {
                            this.urlTagIcon = response.data.data;
                            this.TagForm.icon = response.data.data;
                        });
                    });

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
                        // console.log(response);
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
                    this.deleAppId.push(this.multipleSelection[i].fileId)
                }
            },
            handleSelectionChangeApp(val) {
                this.multipleSelectionAppTohere = val;
                this.appId = [];
                for (let i = 0; i < this.multipleSelectionAppTohere.length; i++) {
                    this.appId.push(this.multipleSelectionAppTohere[i].fileId)
                }
            },
            saveApp() {
                this.$ajax({
                    method: "POST",
                    url: BaseUrl + 'apptag/add/apply/' + this.$route.query.id,
                    data: this.appId,
                    headers: {'token': sessionStorage.getItem('token'), 'device': this.$route.query.type}
                }).then(response => {
                    // console.log(response);
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
            handleSizeChange(pageSize) {
                this.nowPageSize = pageSize
                this.getData()
            },
            handleCurrentChange(pageValue) {
                this.currentPage = pageValue;
                this.getData()
            },
            deleteAll() {
                this.dialogVisible = true
            },
            ensureDelete() {
                this.$ajax({
                    method: "POST",
                    url: BaseUrl + 'apptag/del/apply',
                    data: this.deleAppId,
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
                this.getApp()
            },
            searchUnchoiceApp(text) {
                this.getApp()
            },
            updateAppInfo(id) {
                this.$router.push({
                    path: "/updateApp",
                    query: {id: id, type: this.$route.query.type, page: this.currentPage, size: this.nowPageSize}
                });
            },
            saveUpdateDown() {
                // console.log(this.urlTagIcon)
                if (this.urlTagIcon === null) {
                    this.TagForm.icon = 'tag_default.jpg'
                } else {
                    this.TagForm.icon = this.TagForm.icon
                }
                this.$ajax({
                    method: "POST",
                    url: BaseUrl + 'apptag/update',
                    data: this.TagForm,
                    headers: {'token': sessionStorage.getItem('token'), 'device': this.$route.query.type}
                }).then(response => {
                    // console.log(response);
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
                                if (this.$route.query.type == 'android') {
                                    this.$router.push("/applicationTag")
                                } else if (this.$route.query.type == 'ios') {
                                    this.$router.push("/iosTag")
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
            },
            getApp() {
                this.$ajax
                    .get(`${BaseUrl}apply/all`, {
                        params: {
                            pageCode: 0,
                            pageSize: 0,
                            state: 1,
                            fileState: 2,
                            tagId: 0,
                            keyWords: (this.unchoiceAppName != null && this.unchoiceAppName != '') ? this.unchoiceAppName : null
                        },
                        headers: {'token': sessionStorage.getItem('token'), 'device': this.$route.query.type}
                    })
                    .then(response => {
                        // console.log(pageSize)
                        // console.log(pageValue)
                        if (response.data.flag == 200) {
                            var that = this
                            // this.unChoiceAppList = Array.from(new Set([...response.data.data.appList,...this.info]))
                            that.unChoiceAppList = response.data.data.appList
                            this.unChoiceAppList.forEach(item => {
                                if (item.fileState == 1) {
                                    item.appState = "已上架";
                                } else {
                                    item.appState = "未上架";
                                }
                            });
                            this.appList.forEach(item => {
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

    .littleButton {
        padding: 5px 10px !important;
        margin-left: 0 !important;
    }
</style>
