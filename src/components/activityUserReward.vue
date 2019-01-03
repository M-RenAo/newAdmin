<template>
    <div>
        <div class="table_container">
            <el-row type="flex" style="margin-bottom: 30px;margin-top: 20px">
                <el-col :span="19" style="display:flex;height: auto;word-break:break-all;flex:1;padding-left:5px;">
                    <div style="display:inline-block">
                        <span style="font-size: 14px;width:80px;">手机号：</span>
                        <el-input v-model="searchForm.phone" placeholder="请输入手机号" style="width:120px;"></el-input>
                        <span style="font-size: 14px;">状态：</span>
                        <el-select v-model="state" placeholder="请选择" style="width:100px;">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                        <div style="display: inline-block">
                            <span style="font-size: 14px;width:80px;">时间：</span>
                            <el-date-picker
                                v-model="timePeriod"
                                type="datetimerange"
                                align="right"
                                :default-time="['12:00:00', '08:00:00']">
                            </el-date-picker>
                        </div>
                        <div style="display: inline-block">
                            <span style="font-size: 14px;width:80px;">数量：</span>
                            <el-input v-model="searchForm.amount1" style="width:50px;"></el-input>
                            -
                            <el-input v-model="searchForm.amount2" style="width:50px;"></el-input>
                        </div>
                        <div style="display: inline-block">
                            <span style="font-size: 14px;width:80px;">备注：</span>
                            <el-input v-model="searchForm.remark" placeholder="" style="width:120px;"></el-input>
                        </div>
                    </div>
                </el-col>
                <div style="float:right">
                    <el-button type="primary" style="margin-right:10px;margin-bottom:2px;"
                               @click="search(searchForm,state,timePeriod)">搜索
                    </el-button>
                    <el-button type="primary" style="margin-right:10px;margin-bottom:2px;"
                               @click="setStatus()">发放
                    </el-button>
                    <el-button type="primary" style="margin-left:0" @click="ensureVisible=true">导入</el-button>

                </div>
                <el-dialog
                    title="提示"
                    :visible.sync="ensureVisible"
                    width="30%">
                    <span> 数据一经导入将不能修改或删除，是否继续导入？</span>
                    <span slot="footer" class="dialog-footer">
                     <el-button @click="ensureVisible = false">取 消</el-button>
                     <el-button type="primary" style="position: relative"><input id="upload" type="file"
                                                                                 @change="importExcel(this)"
                                                                                 accept=".csv,.xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                                                                 style="opacity:0;width:71px;height:41px;position: absolute;top:0;left: 0"
                     />导入</el-button>
                </span>
                </el-dialog>
            </el-row>
            <el-table
                :data="tableData"
                style="width: 100%"
                @selection-change="handleSelectionChange" :cell-class-name="cellcb">
                <el-table-column
                    type="selection"
                    width="55"
                >
                    <!--<template slot-scope="scope">-->
                    <!--<el-checkbox :checked="scope.row.isKey== 1" v-if="scope.row.state!=1"/>-->
                    <!--</template>-->
                </el-table-column>
                <el-table-column
                    label="电话"
                    prop="phone">
                </el-table-column>
                <el-table-column
                    label="数量"
                    prop="amount">
                </el-table-column>
                <el-table-column
                    label="币种"
                    prop="currency">
                </el-table-column>
                <el-table-column
                    label="时间"
                    prop="gtime">
                </el-table-column>
                <el-table-column
                    label="状态"
                    prop="flag">
                </el-table-column>
                <el-table-column
                    label="备注"
                    prop="remark">
                </el-table-column>
                <!--<el-table-column-->
                <!--label="备注"-->
                <!--prop="remark">-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                <!--label="状态"-->
                <!--prop="status">-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                <!--label="操作"-->
                <!--key="upload"-->
                <!--min-width="90"-->
                <!--&gt;-->
                <!--<template scope="scope">-->
                <!--<el-button class="littleButton" style="margin-left:0;"  v-clipboard:copy="scope.row.bcdAddress" v-clipboard:success="onCopy" v-clipboard:error="onError" >复制地址-->
                <!--</el-button>-->
                <!--</template>-->
                <!--</el-table-column>-->
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
            <div style="margin-top: 10px">
                <div style="color:#999;font-size:12px;">注释：请导入以下类型的excel表格</div>
                <img src="../assets/img/test.jpg" style="width:400px;height: auto"/>
            </div>

        </div>
    </div>

</template>

<script>
    let moment = require('moment')
    export default {
        data() {
            return {
                id: '',
                ensureVisible: false,
                sysAppIds: '',
                tableData: [],
                options: [{
                    value: '4',
                    label: '全部'
                }, {
                    value: 1,
                    label: '已发放'
                }, {
                    value: 0,
                    label: '未发放'
                }],
                startDate: '',
                endDate: '',
                state: '4',
                txcount: 0,
                currentPage: 1,
                nowPageSize: 10,
                formLabelWidth: '120x',
                trumpetFormWidth: '150px',
                topForm: {},
                trumpetForm: {},
                searchForm: {},
                compareStartDate: '',
                compareEndDate: '',
                multipleSelection: [],
                cellPhones: [],
                pickerOptions0: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                },
                timePeriod: null

            };
        },
        created() {
            const form = {page: this.currentPage, size: this.nowPageSize};
            this.getData(form)
        },
        computed: {},
        methods: {
            cellcb({row, column, rowIndex, columnIndex}) {
                if (row.flag == '已发放' && columnIndex == 0) {
                    return "my-cell"
                }

            },
            onCopy() {
                this.$message({
                    message: '复制成功',
                    type: 'success'
                });
            },
            onError() {
                this.$message({
                    message: '复制失败',
                    type: 'error'
                });
            },
            getData(form) {
                this.$ajax({
                    method: "POST",
                    url: BaseUrl + 'gift/query',
                    data: form,
                    headers: {'token': sessionStorage.getItem('token')}
                }).then(response => {
                    if (response.data.flag == 200) {
                        this.tableData = response.data.data.data;
                        this.txcount = response.data.data.count
                        this.tableData.forEach(item => {
                            if (item.flag == 1) {
                                item.flag = '已发放'
                            } else if (item.flag == 0) {
                                item.flag = '未发放'
                            }
                        })
                        this.tableData.forEach(item => {
                            item.gtime = moment.utc(item.gtime).local().format('YYYY-MM-DD HH:mm:ss')
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
            handleSizeChange(pageSize) {
                this.nowPageSize = pageSize;
                if (this.searchForm == '') {
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
                if (this.searchForm == '') {
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
            search(searchForm, state, timePeriod) {
                if (timePeriod != null) {
                    searchForm.gtime1 = moment(timePeriod[0]).utc().format('YYYY-MM-DD HH:mm:ss')
                    searchForm.gtime2 = moment(timePeriod[1]).utc().format('YYYY-MM-DD HH:mm:ss')
                }
                if (state != 4) {
                    searchForm.flag = state
                }
                searchForm.page = 1;
                searchForm.size = this.nowPageSize
                this.getData(searchForm)
            },
            handleSelectionChange(val) {
                const data = JSON.parse(JSON.stringify(val));
                this.multipleSelection = data.filter((item) => {
                    // item的条件
                    return item.flag == '未发放'
                });
                this.multipleSelection.forEach(item => {
                    item.flag = 0;
                    item.gtime = moment(item.gtime).utc().format('YYYY-MM-DD HH:mm:ss')
                })
            },
            setStatus() {
                if (this.multipleSelection.length != 0) {
                    this.multipleSelection.flag = 0
                    this.$ajax({
                        method: "POST",
                        url: BaseUrl + 'gift/settle',
                        data: this.multipleSelection,
                        headers: {'token': sessionStorage.getItem('token')}
                    }).then(response => {
                        if (response.data.flag == 500) {
                            this.$alert((response.data.data.data != undefined ? response.data.data.data : '') + response.data.msg, '提示', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    this.$message({
                                        type: 'error',
                                        message: `${ response.data.msg + '请重试'}`
                                    });
                                }
                            });
                            return false
                        } else if (response.data.flag == 200) {
                            this.$alert(response.data.msg, '提示', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    this.$message({
                                        type: 'info',
                                        message: `${ response.data.msg}`
                                    });
                                }
                            });
                            this.getData({page: this.currentPage, size: this.nowPageSize})
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
                    this.$alert('请勾选发放条目', '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$message({
                                type: 'info',
                                message: `${'请重试'}`
                            });
                        }
                    });
                    return false
                }
            },
            importExcel(obj) {
                let _this = this;
                _this.ensureVisible = false;
                let inputDOM = this.$refs.inputer;
                // 通过DOM取文件数据
                this.file = event.currentTarget.files[0];
                var rABS = false; //是否将文件读取为二进制字符串
                var f = this.file;
                var reader = new FileReader();
                //if (!FileReader.prototype.readAsBinaryString) {
                FileReader.prototype.readAsBinaryString = function (f) {
                    var binary = "";
                    var rABS = false; //是否将文件读取为二进制字符串
                    var pt = this;
                    var wb; //读取完成的数据
                    var outdata;
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        var bytes = new Uint8Array(reader.result);
                        var length = bytes.byteLength;
                        for (var i = 0; i < length; i++) {
                            binary += String.fromCharCode(bytes[i]);
                        }
                        var XLSX = require('xlsx');
                        if (rABS) {
                            wb = XLSX.read(btoa(fixdata(binary)), { //手动转化
                                type: 'base64'
                            });
                        } else {
                            wb = XLSX.read(binary, {
                                type: 'binary'
                            });
                        }
                        outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);//outdata就是你想要的东西
                        this.da = [...outdata]
                        let arr = []
                        this.da.map(v => {
                            let obj = {}
                            obj.phone = v.电话.toString()
                            if (v.币种 == '' || v.币种 == undefined) {
                                obj.currency = 'IA'
                            } else {
                                obj.currency = v.币种
                            }
                            obj.amount = Number(v.数量)
                            if (v.时间 != undefined) {
                                obj.gtime = moment(v.时间).utc().format('YYYY-MM-DD HH:mm:ss')
                            } else {
                                obj.gtime = moment().utc().format('YYYY-MM-DD HH:mm:ss')
                            }
                            obj.remark = v.备注;

                            if (obj.phone != undefined && isNaN(obj.amount) == false) {
                                arr.push(obj)
                            }

                        })
                        let para = {
                            withList: arr
                        }
                        _this.$message({
                            message: '请耐心等待',
                            type: 'success'
                        });
                        _this.$ajax({
                            method: "POST",
                            url: BaseUrl + 'gift/reward',
                            data: arr,
                            headers: {'token': sessionStorage.getItem('token')}
                        }).then(response => {
                            if (response.data.flag == 200) {
                                _this.$alert(response.data.msg, '提示', {
                                    confirmButtonText: '确定',
                                    callback: action => {
                                        _this.$message({
                                            type: 'info',
                                            message: `${response.data.msg}`
                                        });
                                    }
                                });
                                _this.getData({page: _this.currentPage, size: _this.nowPageSize})
                            } else if (response.data.flag == 500) {
                                _this.$alert(response.data.msg, '提示', {
                                    confirmButtonText: '确定',
                                    callback: action => {
                                        _this.$message({
                                            type: 'info',
                                            message: `${ response.data.msg + ',请重试'}`
                                        });
                                    }
                                });
                            } else if (response.data.flag == 201) {
                                _this.$alert(response.data.msg + '请重新登录', '提示', {
                                    confirmButtonText: '确定',
                                    callback: action => {
                                        _this.$router.push('/')
                                    }
                                });
                            }
                        }, function (err) {
                            _this.$alert('上传有误,请重试', '提示', {
                                confirmButtonText: '确定',
                            });
                        })

                    }
                    reader.readAsArrayBuffer(f);
                }
                if (rABS) {
                    reader.readAsArrayBuffer(f);
                } else {
                    reader.readAsBinaryString(f);
                }


            },
        }

    };
</script>

<style lang="less" scoped>
    @import "../style/mixin";

    .table_container {
        padding: 20px;
    }

    .my-cell {
        background-color: red;
        .cell {
            display: none !important;
        }
    }

    .littleButton {
        padding: 5px 10px !important;
        margin-left: 0 !important;
    }
</style>
<style lang="less">
    .my-cell {
        .cell {
            display: none !important;
        }
    }
</style>
