<template>
    <div class="fillcontain">
        <div class="table_container">
            <el-row style="display:flex;margin-bottom: 30px;">
                <el-col :span="12" style="display: flex;align-items: center;">
                    <el-tabs v-model="activeName" @tab-click="queryListData({activeName:activeName})"
                             style="height: 40px;">
                        <el-tab-pane label="全部" name="3"></el-tab-pane>
                        <el-tab-pane label="未审核" name="2"></el-tab-pane>
                        <el-tab-pane label="审核通过" name="1"></el-tab-pane>
                        <el-tab-pane label="审核不通过" name="0"></el-tab-pane>
                    </el-tabs>
                </el-col>
                <el-col :span="12" style="display: flex;align-items: center;justify-content: flex-end">
                    <el-input placeholder="手机号／身份证号" class="input-with-select" v-model="searchInfo" style="width:60%">
                        <el-button slot="append" @click="searchCheck(searchInfo)"><i class="el-icon-search"></i>
                        </el-button>
                    </el-input>
                </el-col>

            </el-row>
            <el-table
                :data="info"
                style="width: 100%" id="appList">
                <el-table-column
                    label="姓名"
                    prop="name" min-width="50">
                </el-table-column>
                <el-table-column
                    label="身份证号"
                    prop="cardId" min-width="50">
                </el-table-column>
                <el-table-column
                    label="申请时间"
                    prop="auditDate" min-width="50">
                </el-table-column>
                <el-table-column
                    label="状态"
                    prop="auditState" min-width="50">
                </el-table-column>
            </el-table>
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
                info: [],
                rows: [],
                txcount: 0,
                totalfees: 0,
                currentPage: 1,
                nowPageSize: 10,
                url: "",
                activeName: '3',
                positionList: "",
                searchInfo: "",
                downloadLoading: false,
                outerVisible: false,
                // innerVisible:false,
                showBigImg: false,
                checkVisible: false,
                form: {remarks: ''},
                formLabelWidth: 150,
                num: 0
            };
        },
        created() {
            this.queryListData({activeName: 3});
        },
        components: {
            headTop
        },
        methods: {
            queryListData({activeName, pageValue, pageSize}) {
                this.$ajax
                    .get(`${BaseUrl}auth/all/${pageValue || 1}/${this.nowPageSize || 10}/${activeName || 2}`, {headers: {'token': sessionStorage.getItem('token')}},
                    )
                    .then(response => {
                        if (response.data.flag == 200) {
                            this.info = response.data.data.list;
                            this.txcount = response.data.data.num;
                            this.info.forEach(item => {
                                if (item.auditDate != undefined) {
                                    item.auditDate = moment.utc(item.auditDate).local().format('YYYY-MM-DD HH:mm:ss')
                                }
                            })
                            this.info.forEach(item => {
                                if (item.auditState == 1) {
                                    item.auditState = '审核通过'
                                } else if (item.auditState == 2) {
                                    item.auditState = '未审核'
                                } else {
                                    item.auditState = '审核不通过'
                                }
                            })
                        } else if (response.data.flag == 201) {
                            this.$alert(response.data.msg + '，请重新登录', '提示', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    this.$router.push('/')
                                }
                            });
                        } else {
                            this.info = []
                        }
                    });
                this.searchInfo = "";
            },
            searchCheck(searchInfo) {
                this.activeName = '3'
                this.searchInfo = searchInfo;
                this.$ajax
                    .get(BaseUrl + "auth/search/" + this.searchInfo, {headers: {'token': sessionStorage.getItem('token')}})
                    .then(response => {
                        if (response.data.flag == 200) {
                            this.info = response.data.data;
                            this.txcount = response.data.data.length;
                            this.info.forEach(item => {
                                if (item.auditState == 1) {
                                    item.auditState = '审核通过'
                                } else if (item.auditState == 2) {
                                    item.auditState = '未审核'
                                } else {
                                    item.auditState = '审核不通过'
                                }
                            })
                        } else if (response.data.flag == 201) {
                            this.$alert(response.data.msg + '，请重新登录', '提示', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    this.$router.push('/')
                                }
                            });
                        } else {
                            this.info = [];
                            this.txcount = 0
                        }

                    });
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
            check(id, userId) {
                this.outerVisible = true
                this.form.id = id;
                this.form.userId = userId
            },
            ensureCheck(form) {
                if (form.state == 1 || (form.state == 0 && form.remarks != '')) {
                    this.checkVisible = true;
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

            },
            confirmCheck() {
                this.outerVisible = false;
                this.checkVisible = false;
                this.$ajax({
                    method: "POST",
                    url: BaseUrl + '/auth/do',
                    data: this.form,
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
                            callback: action => {
                                this.queryListData({activeName: 2})
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
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                        this.form = {remarks: ''}
                    })
                    .catch(_ => {
                    });
            },
            handleCloses(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {
                    });
            },
            bigImg(index, rw) {
                this.rows = rw;
                this.showBigImg = true;
                this.num = index;
            },
            prev() {
                if (this.num == 0) {
                    this.num = this.rows.authPicUrl.length
                }
                this.num--;
            },
            next() {
                if (this.num == this.rows.authPicUrl.length - 1) {
                    this.num = -1;
                }
                this.num++;
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
        padding: 5px 10px !important;
        margin-left: 0 !important;
    }

    /*.el-button{*/
    /*border: 0;*/
    /*}*/

    .imgMask {
        position: absolute;
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        z-index: 10000;
        background: rgba(0, 0, 0, .6);
    }

    .showImg {
        height: auto;
        width: 500px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        /*border:10px solid #fff;*/
        text-align: center;
    }

    .bigImg {
        width: 500px;
        height: auto;
    }

    .prev {
        position: absolute;
        top: 50%;
        left: 10px;
        width: 40px;
        height: 40px;
        color: #fff;
        transform: translate(10px, -50%);
    }

    .next {
        width: 40px;
        transform: translate(10px, -50%);
        position: absolute;
        top: 50%;
        right: 20px;
        height: 40px;
        color: #fff;
    }

    .button-check {
        display: flex;
        justify-content: center;
    }
</style>
