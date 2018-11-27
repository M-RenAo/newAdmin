<template>
    <div class="fillcontain">
        <div class="table_container">
            <el-row type="flex" style="margin-bottom: 20px;">
                <el-col :span="18" style="display:flex;height: auto;word-break:break-all;flex:1">
                    <div style="display:inline-block">
                        <!--<div style="display: inline-block">-->
                        <!--<span style="font-size: 14px;width:80px;">昵称：</span>-->
                        <!--<el-input v-model="searchForm.nickName" placeholder="请输入内容" style="width:150px;"></el-input>-->
                        <!--</div>-->
                        <div style="display: inline-block">
                            <span style="font-size: 14px;width:80px;">手机号：</span>
                            <el-input v-model="num" placeholder="请输入内容" style="width:120px;"
                                      @keyup.enter.native="search(num)"></el-input>
                        </div>
                        <div style="display: inline-block">
                            <span style="font-size: 14px;width:80px;">实名状态：</span>
                            <el-select v-model="realNameState" style="width:100px" @change="realNameStateChange">
                                <el-option label="全部" value="-1">全部</el-option>
                                <el-option label="已实名" value="1">已实名</el-option>
                                <el-option label="未实名" value="0">未实名</el-option>
                            </el-select>
                        </div>
                        <div style="display: inline-block">
                            <span style="font-size: 14px;width:80px;">排序：</span>
                            <el-select v-model="sortRule" placeholder="请选择" style="width:200px;" @change="searchBySort">
                                <el-option
                                    v-for="item in sortList"
                                    :label="item.label"
                                    :value="item.code">
                                </el-option>
                            </el-select>
                            <el-select v-model="desc" style="width:80px" @change="searchBySort">
                                <el-option label="正序" value="0">正序</el-option>
                                <el-option label="倒序" value="1">倒序</el-option>
                            </el-select>
                        </div>
                        <!--<div style="display: inline-block">-->
                        <!--<span style="font-size: 14px;width:80px;">姓名：</span>-->
                        <!--<el-input v-model="searchForm.name" placeholder="请输入内容" style="width:150px;"></el-input>-->
                        <!--</div>-->
                        <!--<div style="display: inline-block">-->
                        <!--<span style="font-size: 14px;width:80px;">ImAPP钱包余额：</span>-->
                        <!--<el-input v-model="searchForm.minWalletBalance" style="width:50px;"></el-input>-<el-input v-model="searchForm.maxWalletBalance"  style="width:50px;"></el-input>-->
                        <!--</div>-->
                        <!--<div style="display: inline-block">-->
                        <!--<span style="font-size: 14px;width:80px;">最近登录时间：</span>-->
                        <!--<el-date-picker-->
                        <!--v-model="startDate"-->
                        <!--type="datetimerange"-->
                        <!--align="right"-->
                        <!--:default-time="['12:00:00', '08:00:00']">-->
                        <!--</el-date-picker>-->
                        <!--</div>-->
                    </div>
                </el-col>
                <div style="float:right">
                    <el-button type="primary" style="margin-right:10px;margin-bottom:2px;"
                               @click="search(num)">搜索
                    </el-button>
                    <el-button type="primary" style="margin-left:0" @click="shielding()">拉黑</el-button>
                </div>
            </el-row>
            <el-table
                :data="tableData"
                highlight-current-row
                @selection-change="handleSelectionChange"
                style="width: 100%">
                <el-table-column
                    type="selection"
                    width="55"
                >
                </el-table-column>
                <el-table-column
                    label="头像"
                    width="70">
                    <template scope="scope">
                        <img :src="'https://imapp-image.oss-cn-hangzhou.aliyuncs.com/'+scope.row.headPic"
                             style="width:30px;height:30px;" v-if="scope.row.headPic!=undefined">
                    </template>
                </el-table-column>
                <el-table-column
                    label="昵称"
                    min-width="50">
                    <template scope="scope">
                        <router-link :to="{path:'/userInfo',query:{id:scope.row.userId}}">{{scope.row.userNickName}}
                        </router-link>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="userPhone"
                    label="手机号"
                    min-width="70">
                </el-table-column>
                <el-table-column
                    prop="personName"
                    label="姓名"
                    min-width="50">
                </el-table-column>
                <el-table-column
                    label="ImAPP钱包余额（IA）"
                    min-width="100">
                    <template scope="scope">
                        {{scope.row.walletOfIA|MoneyFormat}}
                    </template>
                </el-table-column>
                <el-table-column
                    label="ImAPP钱包余额（BCD）"
                    min-width="100">
                    <template scope="scope">
                        {{scope.row.walletOfBCD|MoneyFormat}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="loginTime"
                    label="最近登录时间"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    prop="registerDate"
                    label="注册时间"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    label="操作"
                    min-width="100">
                    <template scope="scope">
                        <el-button type="text" @click="checkIA(scope.row.userId,scope.row.userNickName)">IA明细
                        </el-button>
                        <el-button type="text" @click="checkBCD(scope.row.userId,scope.row.userNickName)"
                                   style="margin-left:0">BCD明细
                        </el-button>
                        <!--<el-button  type="text" @click="checkInvite(scope.row.userId,scope.row.userNickName)" style="margin-left:0">邀请明细</el-button>-->
                    </template>
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
        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%"
        >
            <span>确认拉黑选中用户？</span>
            <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="ensureShield">确 定</el-button>
               </span>
        </el-dialog>
        <el-dialog title="IA明细" :visible.sync="dialogTableIAVisible" width="1000px">
            <div style="margin-bottom: 10px">用户：{{userNickName}}</div>
            <div style="display:inline-block">
                <div style="display: inline-block">
                    <span style="font-size: 14px;width:80px;">类型：</span>
                    <el-select v-model="state" placeholder="请选择" @change="changeIAType">
                        <el-option
                            v-for="item in options"
                            :key="item.label"
                            :label="item.label"
                            :value="item.label">
                        </el-option>
                    </el-select>
                </div>
                <div style="display: inline-block">
                    <span style="font-size: 14px;width:80px;">时间：</span>
                    <el-date-picker
                        style="width:200px"
                        v-model="startDate"
                        type="datetimerange"
                        align="right"
                        :default-time="['12:00:00', '08:00:00']">
                    </el-date-picker>
                </div>
                <el-button type="primary" @click="serchByTime">搜索</el-button>
            </div>
            <el-table :data="IAData">
                <el-table-column property="createTime" label="日期"></el-table-column>
                <el-table-column property="amount" label="IA"></el-table-column>
                <el-table-column property="type" label="操作记录"></el-table-column>
                <el-table-column property="remark" label="备注"></el-table-column>
                <el-table-column property="address" label="当前累积"></el-table-column>
            </el-table>
            <div class="Pagination">
                <el-pagination
                    @size-change="handleIASizeChange"
                    @current-change="handleIACurrentChange"
                    :current-page="currentPageIA"
                    :page-size="nowPageSizeIA"
                    :page-sizes="[5, 10, 20, 40]"
                    :total="txcountIA"
                    layout="total, sizes, prev, pager, next, jumper"
                >
                </el-pagination>
            </div>
        </el-dialog>
        <el-dialog title="BCD明细" :visible.sync="dialogTableBCDVisible" width="1000px">
            <div style="margin-bottom: 10px">用户：{{userNickName}}</div>
            <div style="display:inline-block">
                <div style="display: inline-block">
                    <span style="font-size: 14px;width:80px;">类型：</span>
                    <el-select v-model="state" placeholder="请选择" @change="changeBCDType">
                        <el-option
                            v-for="item in options"
                            :key="item.label"
                            :label="item.label"
                            :value="item.label">
                        </el-option>
                    </el-select>
                </div>
                <div style="display: inline-block">
                    <span style="font-size: 14px;width:80px;">时间：</span>
                    <el-date-picker
                        style="width:200px"
                        v-model="startDate"
                        type="datetimerange"
                        align="right"
                        :default-time="['12:00:00', '08:00:00']">
                    </el-date-picker>
                </div>
                <el-button type="primary" @click="serchBCDByTime">搜索</el-button>
            </div>
            <el-table :data="IAData">
                <el-table-column property="createTime" label="日期"></el-table-column>
                <el-table-column property="amount" label="BCD"></el-table-column>
                <el-table-column property="amount" label="IA消耗"></el-table-column>
                <el-table-column property="amount" label="地址"></el-table-column>
                <el-table-column property="type" label="操作记录"></el-table-column>
                <el-table-column property="remark" label="备注"></el-table-column>
                <el-table-column property="address" label="当前累积"></el-table-column>
            </el-table>
            <div class="Pagination">
                <el-pagination
                    @size-change="handleBCDSizeChange"
                    @current-change="handleBCDCurrentChange"
                    :current-page="currentPageIA"
                    :page-size="nowPageSizeIA"
                    :page-sizes="[5, 10, 20, 40]"
                    :total="txcountIA"
                    layout="total, sizes, prev, pager, next, jumper"
                >
                </el-pagination>
            </div>
        </el-dialog>
        <!--<el-dialog title="邀请明细" :visible.sync="dialogTableInviteVisible" width="1000px">-->
        <!--<div style="margin-bottom: 10px">用户：{{userNickName}}</div>-->
        <!--&lt;!&ndash;<div style="display:inline-block">&ndash;&gt;-->
        <!--&lt;!&ndash;<div style="display: inline-block">&ndash;&gt;-->
        <!--&lt;!&ndash;<span style="font-size: 14px;width:80px;">类型：</span>&ndash;&gt;-->
        <!--&lt;!&ndash;<el-select v-model="state" placeholder="请选择" @change="changeBCDType">&ndash;&gt;-->
        <!--&lt;!&ndash;<el-option&ndash;&gt;-->
        <!--&lt;!&ndash;v-for="item in options"&ndash;&gt;-->
        <!--&lt;!&ndash;:key="item.label"&ndash;&gt;-->
        <!--&lt;!&ndash;:label="item.label"&ndash;&gt;-->
        <!--&lt;!&ndash;:value="item.label">&ndash;&gt;-->
        <!--&lt;!&ndash;</el-option>&ndash;&gt;-->
        <!--&lt;!&ndash;</el-select>&ndash;&gt;-->
        <!--&lt;!&ndash;</div>&ndash;&gt;-->
        <!--&lt;!&ndash;<div style="display: inline-block">&ndash;&gt;-->
        <!--&lt;!&ndash;<span style="font-size: 14px;width:80px;">时间：</span>&ndash;&gt;-->
        <!--&lt;!&ndash;<el-date-picker&ndash;&gt;-->
        <!--&lt;!&ndash;style="width:200px"&ndash;&gt;-->
        <!--&lt;!&ndash;v-model="startDate"&ndash;&gt;-->
        <!--&lt;!&ndash;type="datetimerange"&ndash;&gt;-->
        <!--&lt;!&ndash;align="right"&ndash;&gt;-->
        <!--&lt;!&ndash;:default-time="['12:00:00', '08:00:00']">&ndash;&gt;-->
        <!--&lt;!&ndash;</el-date-picker>&ndash;&gt;-->
        <!--&lt;!&ndash;</div>&ndash;&gt;-->
        <!--&lt;!&ndash;<el-button type="primary" @click="serchBCDByTime">搜索</el-button>&ndash;&gt;-->
        <!--&lt;!&ndash;</div>&ndash;&gt;-->
        <!--<el-table :data="tableData">-->
        <!--<el-table-column property="createTime" label="日期"></el-table-column>-->
        <!--<el-table-column property="amount" label="手机号"></el-table-column>-->
        <!--<el-table-column property="amount" label="昵称"></el-table-column>-->
        <!--<el-table-column property="amount" label="姓名"></el-table-column>-->
        <!--<el-table-column property="type" label="实名状态"></el-table-column>-->
        <!--<el-table-column property="remark" label="奖励"></el-table-column>-->
        <!--&lt;!&ndash;<el-table-column property="address" label="当前累积"></el-table-column>&ndash;&gt;-->
        <!--</el-table>-->
        <!--<div class="Pagination">-->
        <!--<el-pagination-->
        <!--@size-change="handleBCDSizeChange"-->
        <!--@current-change="handleBCDCurrentChange"-->
        <!--:current-page="currentPageIA"-->
        <!--:page-size="nowPageSizeIA"-->
        <!--:page-sizes="[5, 10, 20, 40]"-->
        <!--:total="txcountIA"-->
        <!--layout="total, sizes, prev, pager, next, jumper"-->
        <!--&gt;-->
        <!--</el-pagination>-->
        <!--</div>-->
        <!--</el-dialog>-->
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {getUserList, getUserCount} from '@/api/getData'

    let moment = require('moment')
    export default {
        data() {
            return {
                sortRule: '0',
                desc: '0',
                num: '',
                realNameState: '-1',
                // startDate:null,
                dialogVisible: false,
                dialogTableIAVisible: false,
                dialogTableBCDVisible: false,
                dialogTableInviteVisible: false,
                tableData: [],
                txcount: 0,
                nowPageSize: 10,
                currentPage: 1,
                currentPageIA: 1,
                nowPageSizeIA: 10,
                userNickName: '',
                txcountIA: 0,
                sortList: [{code: '0', label: '注册时间'}, {code: "1", label: '最近登录时间'}, {code: '2', label: 'ia余额'}, {
                    code: '3',
                    label: 'bcd余额'
                }],
                multipleSelection: [],
                shieldID: [],
                startDate: null,
                state: '全部',
                options: [
                    {label: '全部', value: '0'}, {label: '平台内部转账', value: '1'}, {label: '转账', value: '2'},
                    {label: '兑换BCD', value: '3'}, {label: '提取BCD', value: '3'}, {
                        label: '安装挖矿',
                        value: '4'
                    }, {label: '打开挖矿', value: '5'},
                    {label: '邀请挖矿', value: '6'}, {label: '注册挖矿', value: '7'}, {label: '竞猜花费', value: '8'},
                    {label: '竞猜赚取', value: '9'}, {label: '平台奖励', value: '10'}, {label: '平台转账应用', value: '11'}
                ],
                // options2:[
                //     {label:'全部',value:'0'},{label:'IA兑换',value:'1'}, {label:'平台奖励',value:'2'},{label:'提取',value:'2'},
                // ],
                IAData: [],
                userId: null,
            }
        },
        components: {
            headTop,
        },
        created() {
            // console.log(typeof(this.currentPage))
            // const form =
            this.getData()
        },
        methods: {
            getData() {
                this.$ajax({
                    method: "GET",
                    url: BaseUrl + 'user/all',
                    params: {
                        pageCode: this.currentPage,
                        pageSize: this.nowPageSize,
                        num: this.num,
                        order: this.sortRule.toString() + this.desc.toString()
                    },
                    headers: {'token': sessionStorage.getItem('token')}
                }).then(response => {
                    if (response.data.flag == 200) {
                        this.tableData = response.data.data.list;
                        this.txcount = response.data.data.num;
                        this.tableData.forEach(item => {
                            if (item.loginTime != undefined) {
                                item.loginTime = moment.utc(item.loginTime).local().format('YYYY-MM-DD HH:mm:ss')
                            }
                            if (item.registerDate != undefined) {
                                item.registerDate = moment.utc(item.registerDate).local().format('YYYY-MM-DD HH:mm:ss')
                            }
                            if (item.userName === undefined) {
                                item.personName = '未实名'
                            } else {
                                item.personName = item.userName
                            }
                        })
                        sessionStorage.setItem('userList', JSON.stringify(response.data.data.list))
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
            searchBySort() {
                this.currentPage = 1;
                this.getData()
            },
            handleSizeChange(pageSize) {
                this.nowPageSize = pageSize;
                this.getData();
            },
            handleCurrentChange(pageValue) {
                this.currentPage = pageValue;
                this.getData();
            },
            handleSelectionChange(val) {
                this.multipleSelection = val
                this.shieldID = [];
                for (let i = 0; i < this.multipleSelection.length; i++) {
                    this.shieldID.push(this.multipleSelection[i].userPhone)
                }
            },
            realNameStateChange() {

            },
            shielding() {
                if (this.shieldID.length == 0) {
                    this.$alert('请勾选用户', '提示', {
                        confirmButtonText: '确定',
                    });
                } else {
                    this.dialogVisible = true
                }
            },
            ensureShield() {
                this.$ajax({
                    method: "POST",
                    url: BaseUrl + 'user/shieldUser',
                    data: {ids: this.shieldID},
                    headers: {'token': sessionStorage.getItem('token')}
                }).then(response => {
                    this.dialogVisible = false
                    if (response.data.flag == 200) {
                        this.$alert(response.data.msg, '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$message({
                                    type: 'info',
                                    message: `${ response.data.msg}`
                                });
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
                            callback: action => {
                                this.$message({
                                    type: 'info',
                                    message: `error: ${ response.data.msg + ',请重试'}`
                                });
                            }
                        });
                        return false
                    }
                });

            },
            checkIA(id, name) {
                this.userNickName = name
                this.userId = id
                this.dialogTableIAVisible = true
                this.startDate = null;
                this.state = '全部'
                let form = {userId: this.userId, pageCode: 1, pageSize: 10, type: 1, startTime: '', endTime: ''}
                this.getIADetail(form)
            },
            handleIASizeChange(pageSize) {
                this.nowPageSizeIA = pageSize;
                if (this.startDate === null) {
                    this.getIADetail({
                        userId: this.userId,
                        pageCode: 1,
                        pageSize: this.nowPageSizeIA,
                        type: 1,
                        startTime: '',
                        endTime: '',
                        txType: this.state == '全部' ? null : this.state
                    })
                } else {
                    this.getIADetail({
                        userId: this.userId,
                        pageCode: 1,
                        pageSize: this.nowPageSizeIA,
                        type: 1,
                        startTime: moment(this.startDate[0]).utc().format('YYYY-MM-DD HH:mm:ss'),
                        endTime: moment(this.startDate[1]).utc().format('YYYY-MM-DD HH:mm:ss'),
                        txType: this.state == '全部' ? null : this.state
                    })
                }
            },
            handleIACurrentChange(pageValue) {
                this.currentPageIA = pageValue;
                if (this.startDate === null) {
                    this.getIADetail({
                        userId: this.userId,
                        pageCode: this.currentPageIA,
                        pageSize: this.nowPageSizeIA,
                        type: 1,
                        startTime: '',
                        endTime: '',
                        txType: this.state == '全部' ? null : this.state
                    })
                } else {
                    this.getIADetail({
                        userId: this.userId,
                        pageCode: this.currentPageIA,
                        pageSize: this.nowPageSizeIA,
                        type: 1,
                        startTime: moment(this.startDate[0]).utc().format('YYYY-MM-DD HH:mm:ss'),
                        endTime: moment(this.startDate[1]).utc().format('YYYY-MM-DD HH:mm:ss'),
                        txType: this.state == '全部' ? null : this.state
                    })
                }
            },
            serchByTime() {
                // console.log(this.startDate)
                if (this.startDate !== null) {
                    this.getIADetail({
                        userId: this.userId,
                        pageCode: this.currentPageIA,
                        pageSize: this.nowPageSizeIA,
                        type: 1,
                        startTime: moment(this.startDate[0]).utc().format('YYYY-MM-DD HH:mm:ss'),
                        endTime: moment(this.startDate[1]).utc().format('YYYY-MM-DD HH:mm:ss'),
                        txType: this.state == '全部' ? null : this.state
                    })
                } else {
                    this.getIADetail({
                        userId: this.userId,
                        pageCode: this.currentPageIA,
                        pageSize: this.nowPageSizeIA,
                        type: 1,
                        startTime: '',
                        endTime: '',
                        txType: this.state == '全部' ? null : this.state
                    })
                }
            },
            getIADetail(form) {
                this.$ajax({
                    method: "POST",
                    url: BaseUrl + 'imwallet/getbilllist',
                    data: form,
                    headers: {'token': sessionStorage.getItem('token')}
                }).then(response => {
                    // console.log(response)
                    if (response.data.flag == 200) {
                        this.IAData = response.data.data.billList;
                        this.balance = response.data.data.balance
                        this.txcountIA = response.data.data.total;
                        this.IAData.forEach(item => {
                            item.createTime = moment.utc(item.createTime).local().format('YYYY-MM-DD HH:mm:ss')
                        })
                    } else if (response.data.flag == 201) {
                        this.$alert(response.data.msg + '，请重新登录', '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$router.push('/')
                            }
                        });
                    } else {
                        this.IAData = []
                        this.txcount = 0
                    }
                });
            },
            changeIAType() {
                // console.log(this.startDate)
                if (this.startDate === null) {
                    this.getIADetail({
                        userId: this.userId,
                        pageCode: 1,
                        pageSize: 10,
                        type: 1,
                        startTime: '',
                        endTime: '',
                        txType: this.state == '全部' ? null : this.state
                    })
                } else {
                    this.getIADetail({
                        userId: this.userId,
                        pageCode: 1,
                        pageSize: 10,
                        type: 1,
                        startTime: moment(this.startDate[0]).utc().format('YYYY-MM-DD HH:mm:ss'),
                        endTime: moment(this.startDate[1]).utc().format('YYYY-MM-DD HH:mm:ss'),
                        txType: this.state == '全部' ? null : this.state
                    })
                }
            },
            checkBCD(id, name) {
                this.userNickName = name
                this.userId = id
                this.dialogTableBCDVisible = true
                this.startDate = null;
                this.state = '全部'
                let form = {userId: this.userId, pageCode: 1, pageSize: 10, type: 0, startTime: '', endTime: ''}
                this.getIADetail(form)
            },
            handleBCDSizeChange(pageSize) {
                this.nowPageSizeIA = pageSize;
                if (this.startDate === null) {
                    this.getIADetail({
                        userId: this.userId,
                        pageCode: 1,
                        pageSize: this.nowPageSizeIA,
                        type: 0,
                        startTime: '',
                        endTime: '',
                        txType: this.state == '全部' ? null : this.state
                    })
                } else {
                    this.getIADetail({
                        userId: this.userId,
                        pageCode: 1,
                        pageSize: this.nowPageSizeIA,
                        type: 0,
                        startTime: moment(this.startDate[0]).utc().format('YYYY-MM-DD HH:mm:ss'),
                        endTime: moment(this.startDate[1]).utc().format('YYYY-MM-DD HH:mm:ss'),
                        txType: this.state == '全部' ? null : this.state
                    })
                }
            },
            handleBCDCurrentChange(pageValue) {
                this.currentPageIA = pageValue;
                if (this.startDate === null) {
                    this.getIADetail({
                        userId: this.userId,
                        pageCode: this.currentPageIA,
                        pageSize: this.nowPageSizeIA,
                        type: 0,
                        startTime: '',
                        endTime: '',
                        txType: this.state == '全部' ? null : this.state
                    })
                } else {
                    this.getIADetail({
                        userId: this.userId,
                        pageCode: this.currentPageIA,
                        pageSize: this.nowPageSizeIA,
                        type: 0,
                        startTime: moment(this.startDate[0]).utc().format('YYYY-MM-DD HH:mm:ss'),
                        endTime: moment(this.startDate[1]).utc().format('YYYY-MM-DD HH:mm:ss'),
                        txType: this.state == '全部' ? null : this.state
                    })
                }
            },
            serchBCDByTime() {
                // console.log(this.startDate)
                if (this.startDate !== null) {
                    this.getIADetail({
                        userId: this.userId,
                        pageCode: this.currentPageIA,
                        pageSize: this.nowPageSizeIA,
                        type: 0,
                        startTime: moment(this.startDate[0]).utc().format('YYYY-MM-DD HH:mm:ss'),
                        endTime: moment(this.startDate[1]).utc().format('YYYY-MM-DD HH:mm:ss'),
                        txType: this.state == '全部' ? null : this.state
                    })
                } else {
                    this.getIADetail({
                        userId: this.userId,
                        pageCode: this.currentPageIA,
                        pageSize: this.nowPageSizeIA,
                        type: 0,
                        startTime: '',
                        endTime: '',
                        txType: this.state == '全部' ? null : this.state
                    })
                }
            },
            changeBCDType() {
                // console.log(this.startDate)
                if (this.startDate === null) {
                    this.getIADetail({
                        userId: this.userId,
                        pageCode: 1,
                        pageSize: 10,
                        type: 0,
                        startTime: '',
                        endTime: '',
                        txType: this.state == '全部' ? null : this.state
                    })
                } else {
                    this.getIADetail({
                        userId: this.userId,
                        pageCode: 1,
                        pageSize: 10,
                        type: 0,
                        startTime: moment(this.startDate[0]).utc().format('YYYY-MM-DD HH:mm:ss'),
                        endTime: moment(this.startDate[1]).utc().format('YYYY-MM-DD HH:mm:ss'),
                        txType: this.state == '全部' ? null : this.state
                    })
                }
            },
            // checkInvite(id,name){
            //     this.userNickName=name
            //     this.userId=id
            //     this.dialogTableBCDVisible=true
            //     this.startDate=null;
            //     this.state='全部'
            //     this.dialogTableInviteVisible=true
            //     this.getInviteDetail()
            // },
            // getInviteDetail(){
            //     this.$ajax.get(BaseUrl+'inviterecord/all/'+this.userId+'/'+this.currentPageIA+'/'+this.nowPageSizeIA,{headers: {'token': sessionStorage.getItem('token')}}).then(response => {
            //         // console.log(response)
            //         if(response.data.flag==200){
            //             this.tableData=response.data.data.list;
            //             this.txcount=response.data.data.num;
            //             this.tableData.forEach(item=>{
            //                 item.inviteDate=moment(item.inviteDate).format('YYYY-MM-DD HH:mm:ss')
            //             })
            //         }else if(response.data.flag==201) {
            //             this.$alert(response.data.msg + '，请重新登录', '提示', {
            //                 confirmButtonText: '确定',
            //                 callback: action => {
            //                     this.$router.push('/')
            //                 }
            //             });
            //         }
            //     })
            // },
            search(searchForm) {
                this.getData()
            },
            userInfo(ID) {
                // console.log(ID)
                this.$router.push({path: '/userInfo', query: {id: ID}})
            }
        },
    }
</script>

<style lang="less" scoped>
    @import '../style/mixin';

    .table_container {
        padding: 20px;
    }

    .littleButton {
        padding: 5px 10px !important;
        margin-left: 0 !important;
    }
</style>

