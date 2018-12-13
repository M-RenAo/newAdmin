<template>
    <div class="fillcontain">
        <div class="table_container">
            <el-row style="margin-bottom: 30px;">
                <div style="display: flex;align-items: center;justify-content: flex-end;margin-bottom: 5px">
                    <el-tabs v-model="activeName"
                             @tab-click="queryListData({activeName:activeName,pageValue:1,pageSize:10})"
                             style="height: 40px;margin-right: 20px;">
                        <el-tab-pane label="已审核" name="1"></el-tab-pane>
                        <el-tab-pane label="未审核" name="0"></el-tab-pane>
                    </el-tabs>
                    <el-button type="primary" @click="uploadapp()">上传应用</el-button>
                    <el-button style='' type="primary" icon="document" @click="handleDownload"
                               :loading="downloadLoading"> 导出excel
                    </el-button>
                </div>
                <div style="display: flex;align-items: center;justify-content: flex-start">
                    <div v-if="activeName==1">
                        <span style="font-size: 14px;color:#606266;">分类:</span>
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
                        <span style="font-size: 14px;color:#606266;">状态:</span>
                        <el-select v-model="flag" placeholder="请选择" style="width:100px" @change="searchByFlag(flag)">
                            <el-option value="2" label="全部">全部</el-option>
                            <el-option value="1" label="已上架">已上架</el-option>
                            <el-option value="0" label="未上架">未上架</el-option>
                        </el-select>
                    </div>
                    <el-input placeholder="请输入应用名" class="input-with-select" v-model="searchInfo"
                              style="width:200px;margin-left:10px" @keyup.enter.native="searchApp(searchInfo)">
                        <el-button slot="append" @click="searchApp(searchInfo)"><i class="el-icon-search"></i>
                        </el-button>
                    </el-input>
                </div>

            </el-row>
            <el-table
                :data="info"
                style="width: 100%" id="appList">
                <el-table-column label="应用图标" prop="fileIcon" min-width="50">
                    <template scope="scope">
                        <img :src="'https://imapp-image.oss-cn-hangzhou.aliyuncs.com/'+scope.row.fileIcon"
                             style="width:30px;height:30px;">
                    </template>

                </el-table-column>
                <el-table-column
                    label="应用名称"
                    min-width="50">
                    <template scope="scope">
                        <router-link
                            :to="{path:'/appInfo',query:{id:scope.row.fileId,activeName:activeName,type:'android'}}">
                            {{scope.row.appName}}
                        </router-link>
                    </template>
                </el-table-column>
                <!--<el-table-column-->
                <!--label="应用类型"-->
                <!--prop="fileType" min-width="50">-->
                <!--</el-table-column>-->
                <el-table-column
                    label="安装包大小"
                    prop="fileSize" min-width="50">
                </el-table-column>
                <!--<el-table-column-->
                <!--label="应用模块"-->
                <!--prop="position" min-width="50">-->
                <!--</el-table-column>-->
                <el-table-column
                    label="版本号"
                    prop="fileVersion" min-width="50">
                </el-table-column>
                <el-table-column
                    label="最新上传时间"
                    prop="fileDate" min-width="50">
                </el-table-column>
                <el-table-column
                    v-if="activeName==1"
                    label="评论数/评分"
                    min-width="50">
                    <template scope="scope">
                        <router-link
                            :to="{path:'/appComment',query:{id:scope.row.fileId,type:'android',appName:scope.row.appName}}">
                            {{scope.row.comment}}
                        </router-link>
                    </template>
                </el-table-column>
                <el-table-column
                    label="下载"
                    v-if="activeName==0"
                    key="upload"
                    min-width="50"
                >
                    <template scope="scope">
                        <el-button class="littleButton" @click="downloadApp(scope.row.fileId)">下载
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column
                    v-if="activeName==1"
                    label="上／下架"
                    key="updown"
                    prop="appState"
                    min-width="50">
                </el-table-column>
                <el-table-column label="操作" min-width="50">
                    <template scope="scope">
                        <!--<el-button @click="edit(scope.row.fileId)"   v-if="activeName==1" key="edit">配置-->
                        <!--</el-button>-->
                        <el-button type="text" @click="update(scope.row.fileId)" v-if="activeName==1"
                                   key="edit" class="littleButton">编辑
                        </el-button>
                        <el-button  type="text" v-if="activeName==1" key="update"
                                   @click="updateMore(scope.row.fileId)" class="littleButton">更新
                        </el-button>
                        <el-button type="text" @click="operating(scope.row.fileId,scope.row.appName)" v-if="activeName==1"
                                   key="falseData" class="littleButton">运营数据
                        </el-button>
                        <el-button type="text" @click="deletes(scope.row.fileId)"
                                   v-if="activeName==0||scope.row.fileState==0" class="littleButton">删除
                        </el-button>
                        <el-button  type="text" @click="check(scope.row.fileId)" v-if="activeName==0"
                                   key="uncheck" class="littleButton">审核
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
            <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="30%"
            >
                <span>该信息将永久删除，确认删除此条信息？</span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="ensureDelete">确 定</el-button>
               </span>
            </el-dialog>
            <el-dialog title="" :visible.sync="dialogFormVisibleopate" width="500px">
                <el-form :model="operateForm">
                    <el-form-item label="应用名称" label-width="110px">
                        {{operateName}}
                    </el-form-item>
                    <el-form-item label="下载次数" label-width="110px" >
                        <el-input v-model="operateForm.download" auto-complete="off" style="width:200px" type="num" num="0"></el-input>
                    </el-form-item>
                    <el-form-item label="点击次数" label-width="110px">
                        <el-input v-model="operateForm.touch" auto-complete="off" style="width:200px" type="num" num="0"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisibleopate = false;">取 消</el-button>
                    <el-button type="primary" @click="ensureOprate">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import headTop from "../components/headTop";
    import {baseUrl, baseImgPath} from "@/config/env";
    import {
        cityGuess,
        getResturants,
        getResturantsCount,
        foodCategory,
        updateResturant,
        searchplace,
        deleteResturant
    } from "@/api/getData";
    import FileSaver from 'file-saver'
    import XLSX from 'xlsx'

    let moment = require('moment')
    export default {
        data() {
            return {
                delId: '',
                info: [],
                txcount: 0,
                totalfees: 0,
                currentPage: null,
                nowPageSize: 10,
                url: "",
                flag: null,
                activeName: "1",
                positionList: "",
                searchInfo: "",
                downloadLoading: false,
                dialogVisible: false,
                fileTagUnchoice: '',
                tagList: [],
                dialogFormVisibleopate:false,
                 operateForm:{},
                id:'',
                operateName:''
            };
        },
        created() {
            // console.log(this.$route.path)
            this.flag = this.$route.query.flag || '2';
            this.fileTagUnchoice = this.$route.query.tagcode || '-1'
            if (this.$route.query.active == 0) {
                this.activeName = 0
            }
            this.$ajax.get(BaseUrl + "apptag/all", {
                headers: {
                    'token': sessionStorage.getItem('token'),
                    'device': 'android'
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
            this.queryListData({
                activeName: this.activeName,
                pageValue: this.$route.query.page || 1,
                pageSize: this.$route.query.size || 10
            });
            // this.$ajax.get(BaseUrl + "position/all").then(response => {
            //   this.positionList = response.data.data;
            //   sessionStorage.setItem("positionList", JSON.stringify(this.positionList));
            // });
        },
        // mounted(){
        //   this.currentPage=this.$route.query.page;
        //   this.nowPageSize=this.$route.query.size
        // },
        components: {
            headTop
        },
        methods: {
            queryListData({activeName, pageValue, pageSize}) {
                this.$ajax
                    .get(`${BaseUrl}apply/all`, {
                        params: {
                            pageCode: pageValue || 1,
                            pageSize: pageSize || 10,
                            state: activeName || 0,
                            fileState: this.flag,
                            tagId: this.fileTagUnchoice == -1 ? null : this.fileTagUnchoice,
                            keyWords: (this.searchInfo != null && this.searchInfo != '') ? this.searchInfo : null
                        }, headers: {'token': sessionStorage.getItem('token'), 'device': 'android'}
                    })
                    .then(response => {
                        // console.log(pageSize)
                        // console.log(pageValue)
                        if (response.data.flag == 200) {
                            this.info = response.data.data.appList;
                            this.txcount = response.data.data.fileNum;
                            this.info.forEach(item => {
                                if (item.fileState == 1) {
                                    item.appState = "已上架";
                                } else {
                                    item.appState = "未上架";
                                }
                            });
                            this.info.forEach(item => {
                                item.fileDate = moment.utc(item.fileDate).local().format('YYYY-MM-DD HH:mm:ss');

                            });
                            // this.info.forEach(item => {
                            //   var positionLists = JSON.parse(
                            //     sessionStorage.getItem("positionList")
                            //   );
                            //   positionLists.forEach(nitem => {
                            //     if (item.fileDisplayPosition == nitem.code) {
                            //       item.position = nitem.title;
                            //     }
                            //   });
                            // });
                            //       if(this.$route.query.page==undefined){
                            //           this.currentPage=1
                            //       }else{
                            //           this.currentPage=Number(this.$route.query.page)
                            //       }
                            this.currentPage = Number(pageValue);
                            this.nowPageSize = Number(pageSize)
                            this.info.forEach(item => {
                                item.fileSize = (item.fileSize / 1048576).toFixed(2) + ' M'
                            })
                        } else if (response.data.flag == 201) {
                            this.$alert(response.data.msg + '，请重新登录', '提示', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    this.$router.push('/')
                                }
                            });
                        }
                    });
                // this.searchInfo = "";
            },
            searchByFlag() {
                const params = {
                    activeName: this.activeName,
                    pageValue: 1,
                    pageSize: this.nowPageSize
                }
                this.queryListData(params)
            },
            searchUnchoiceAppByTag() {
                const params = {
                    activeName: this.activeName,
                    pageValue: 1,
                    pageSize: this.nowPageSize
                }
                this.queryListData(params)
            },
            searchApp() {
                const params = {
                    activeName: this.activeName,
                    pageValue: 1,
                    pageSize: this.nowPageSize
                }
                this.queryListData(params)
            },
            handleSizeChange(pageSize) {
                this.nowPageSize = pageSize;
                const listParams = {
                    activeName: this.activeName,
                    pageValue: 1,
                    pageSize: pageSize
                };
                this.queryListData(listParams);
            },
            handleCurrentChange(pageValue) {
                this.currentPage = pageValue;
                const listParams = {
                    activeName: this.activeName,
                    pageValue: pageValue,
                    pageSize: this.nowPageSize || 10
                };
                this.queryListData(listParams);
            },
            uploadapp() {
                this.$router.push({path: "/addApp", query: {type: 'android'}});
            },
            updateMore(id) {
                this.$router.push({
                    path: "/willUpdateApps",
                    query: {
                        id: id,
                        type: 'android',
                        page: this.currentPage,
                        size: this.nowPageSize,
                        flag: this.flag,
                        tagcode: this.fileTagUnchoice
                    }
                });
            },
            downloadApp(id) {
                console.log(id);
                this.$ajax
                    .get(BaseUrl + "alioss/signatureurl／" + id + "/apply", {
                        headers: {
                            'token': sessionStorage.getItem('token'),
                            'device': 'android'
                        }
                    })
                    .then(response => {
                        // console.log(response);
                        if (response.data.flag == 200) {
                            this.url = response.data.data;
                            window.open(this.url, "_self");
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
            check(id) {
                this.$router.push({
                    path: "/checkApp",
                    query: {id: id, type: 'android', page: this.currentPage, size: this.nowPageSize}
                });
            },
            update(id) {
                this.$router.push({
                    path: "/updateApp",
                    query: {
                        id: id,
                        type: 'android',
                        page: this.currentPage,
                        size: this.nowPageSize,
                        flag: this.flag,
                        tagcode: this.fileTagUnchoice
                    }
                });
            },
            deletes(id) {
                this.dialogVisible = true;
                this.delId = id;
            },
            ensureDelete() {
                this.dialogVisible = false;
                this.$ajax.get(BaseUrl + 'apply/del/' + this.delId, {
                    headers: {
                        'token': sessionStorage.getItem('token'),
                        'device': 'android'
                    }
                }).then(response => {
                    this.delId = '';
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
                        that.queryListData({
                            activeName: that.activeName,
                            pageValue: that.currentPage,
                            pageSize: that.nowPageSize
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
                })
            },
            handleDownload() {
                this.$ajax
                    .get(`${BaseUrl}apply/all/0/0/${this.activeName}`, {
                        headers: {
                            'token': sessionStorage.getItem('token'),
                            'device': 'android'
                        }
                    })
                    .then(response => {
                        if (response.data.flag == 200) {
                            this.info = response.data.data.appList;
                            this.txcount = response.data.data.fileNum;
                            this.info.forEach(item => {
                                if (item.fileState == 1) {
                                    item.appState = "已上架";
                                } else {
                                    item.appState = "未上架";
                                }
                            });
                            // this.info.forEach(item => {
                            //     var positionLists = JSON.parse(
                            //         sessionStorage.getItem("positionList")
                            //     );
                            //     positionLists.forEach(nitem => {
                            //         if (item.fileDisplayPosition == nitem.code) {
                            //             item.position = nitem.title;
                            //         }
                            //     });
                            // });
                            this.downloadLoading = true
                            import('@/vendor/Export2Excel').then(excel => {
                                const tHeader = ['应用图标', '应用名', '应用类型', '安装包大小', '版本号', '最新上传时间']
                                const filterVal = ['fileIcon', 'appName', 'fileType', 'fileSize', 'fileVersion', 'fileDate']
                                const list = this.info
                                // console.log(this.info)
                                const data = this.formatJson(filterVal, list)
                                excel.export_json_to_excel({
                                    header: tHeader,
                                    data,
                                    filename: this.filename,
                                    autoWidth: this.autoWidth
                                })
                                this.downloadLoading = false
                            })
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
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => {
                    if (j === 'timestamp') {
                        return parseTime(v[j])
                    } else {
                        return v[j]
                    }
                }))
            },
            //运营标注
            operating(id,name){
                this.id=id;
                this.operateForm={}
                this.operateName=name;
                this.dialogFormVisibleopate=true;
            },
            ensureOprate(){
                this.operateForm.id=this.id
                this.$ajax({
                    method: "POST",
                    url: BaseUrl + 'apply/update/incr',
                    data:this.operateForm,
                    headers: {'token': sessionStorage.getItem('token'),device:'android'}
                }).then(response => {
                    if (response.data.flag == 200) {
                        this.dialogFormVisibleopate=false
                        this.$message({
                            type: 'success',
                            message: '修改成功!',
                            callback: action => {
                            }
                        });
                        this.queryListData({
                            activeName: this.activeName,
                            pageValue: this.currentPage,
                            pageSize: this.nowPageSize
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
                            message: '修改失败!',
                        });
                    }
                });
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

    /*.cell {*/
    /*overflow: hidden;*/
    /*text-overflow: ellipsis;*/
    /*word-break: break-all;*/
    /*white-space: nowrap !important;*/
    /*}*/
    .littleButton {
        margin-left: 0 !important;
    }

    /*.el-button{*/
    /*border: 0;*/
    /*}*/
</style>
