<template>
    <div class="content">
        <h2 style="padding:10px 0 20px 0">{{guessTitle}}：高中奖率体验IA翻倍乐趣</h2>
        <el-table
        :data="tableData"
        style="width: 100%">
            <el-table-column
                prop="date"
                label="日期"
                min-width="50">
            </el-table-column>
            <el-table-column
                prop="result"
                label="结果"
                min-width="50">
            </el-table-column>
            <el-table-column
                prop="jackpot"
                label="奖池"
                min-width="50">
            </el-table-column>
            <el-table-column
                prop="parnumber"
                label="参与人数"
                min-width="50">
            </el-table-column>
            <el-table-column
                prop="prizenumber"
                label="中奖人数"
                min-width="50">
            </el-table-column>
            <el-table-column
                prop="income"
                label="平台收益"
                min-width="50">
            </el-table-column>
            <el-table-column
                prop="state"
                label="开奖状态"
                min-width="50">
                <template scope="scope">
                        <div class="setState" @click="opendialogVisible = true">
                            <!-- {{scope.row.draft?"草稿":"发布"}} -->
                            {{scope.row.state}}
                        </div>
                </template>
            </el-table-column>
            <el-table-column
            label="操作"
            min-width="50">
                <template slot-scope="scope">
                    <el-button @click="see(scope.row)" type="text">查看</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="Pagination">
                 <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[10, 20, 30, 50]"
                    :page-size="nowPageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="usercount">
                </el-pagination>
        </div>
        <div>
            <el-dialog
            :visible.sync="opendialogVisible"
            width="30%">
                <div style="text-align:center">
                    <div class="size" v-if="guessType==1?true:false">
                        <h3>哈希猜涨跌开奖结果</h3>
                        <div style="margin:40px 0 40px 0">
                            <el-radio v-model="radio" label="1">涨</el-radio>
                            <el-radio v-model="radio" label="2">跌</el-radio>
                        </div>
                    </div>
                    <div class="size" v-if="guessType==2?true:false">
                        <h3>哈希猜涨跌开奖结果</h3>
                        <div style="margin:40px 0 40px 0">
                            <el-radio v-model="radio" label="1">大</el-radio>
                            <el-radio v-model="radio" label="2">小</el-radio>
                        </div>
                    </div>
                    <div class="lottery" v-if="guessType==3?true:false">
                        <h3>哈希彩票开奖结果</h3>
                        <div class="lotterys">
                            <div>3</div>
                            <div>2</div>
                            <div>1</div>
                        </div>
                    </div>
                
                    <el-button @click="closeDialog">确定</el-button>
                </div>
            </el-dialog>
        </div>
        <div>
            <el-dialog
            :visible.sync="seedialogVisible"
            width="900px">
                <h2 style="text-align:center">投注详情</h2>
                <div class="option" v-if="guessType==1?true:false">
                    <div style="float: left;margin-left:10px">
                        <h3>投注选项:涨</h3>
                        <span>投注人数:234人 (34%)</span>
                        <span style="margin-left:20px">投注金额:234IA (56%)</span>
                    </div>
                    <div style="float: right;margin-right:10px">
                        <h3>投注选项:跌</h3>
                        <span>投注人数:234人 (34%)</span>
                        <span style="margin-left:20px">投注金额:234IA (56%)</span>
                    </div>
                </div>
                <div class="option" v-if="guessType==2?true:false">
                    <div style="float: left;margin-left:10px">
                        <h3>投注选项:大</h3>
                        <span>投注人数:234人 (34%)</span>
                        <span style="margin-left:20px">投注金额:234IA (56%)</span>
                    </div>
                    <div style="float: right;margin-right:10px">
                        <h3>投注选项:小</h3>
                        <span>投注人数:234人 (34%)</span>
                        <span style="margin-left:20px">投注金额:234IA (56%)</span>
                    </div>
                </div>
                <div v-if="guessType==2?true:false">
                    <span class="riseFall">投注选项</span>
                    <el-select v-model="riseFall2" style="width:70px">
                        <el-option
                        v-for="item in riseFalls2"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div v-if="guessType==1?true:false">
                    <span class="riseFall">投注选项</span>
                    <el-select v-model="riseFall" style="width:70px">
                        <el-option
                        v-for="item in riseFalls"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div style="margin-bottom:20px">
                    <el-table
                    :data="recordData"
                    style="width: 70%">
                        <el-table-column
                            prop="name"
                            label="姓名"
                            min-width="50">
                        </el-table-column>
                        <el-table-column
                            prop="phone"
                            label="手机号">
                        </el-table-column>
                        <el-table-column
                            prop="options"
                            label="投注选项">
                        </el-table-column>
                        <el-table-column
                            prop="totalAmount"
                            label="总金额">
                        </el-table-column>
                    </el-table>
                    <div class="Pagination">
                        <el-pagination
                            @size-change="optsSizeChange"
                            @current-change="optsCurrentChange"
                            :current-page="optsPage"
                            :page-sizes="[10, 20, 30, 50]"
                            :page-size="optsPageSize"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="optscount">
                        </el-pagination>
                    </div>
                </div>
                <div style="text-align:center">
                    <el-button @click="closeSeeDialog">确定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>

</template>

<script>
    export default {
        data() {
            return {
                guessType:"",
                radio: '1',
                showSize:false,//是否显示大小
                opendialogVisible: false,
                seedialogVisible:false,
                usercount:0,
                currentPage: 1,
                nowPageSize: 10,
                optscount:0,
                optsPage:1,
                optsPageSize:10,
                riseFall:"涨",
                riseFalls:[{
                value: '1',
                label: '涨'
                }, {
                value: '2',
                label: '跌'
                }],
                riseFall2:"大",
                riseFalls2:[{
                value: '1',
                label: '大'
                }, {
                value: '2',
                label: '小'
                }],
                tableData: [{
                    date: '2016-05-02',
                    result:"无",
                    jackpot:"23432IA",
                    parnumber:"20000",
                    prizenumber:"23",
                    income:"234IA",
                    state:"开奖"
                },{
                    date: '2016-05-02',
                    result:"无",
                    jackpot:"23432IA",
                    parnumber:"20000",
                    prizenumber:"23",
                    income:"234IA",
                    state:"开奖"
                },{
                    date: '2016-05-02',
                    result:"无",
                    jackpot:"23432IA",
                    parnumber:"20000",
                    prizenumber:"23",
                    income:"234IA",
                    state:"开奖"
                },{
                    date: '2016-05-02',
                    result:"无",
                    jackpot:"23432IA",
                    parnumber:"20000",
                    prizenumber:"23",
                    income:"234IA",
                    state:"开奖"
                }],
                recordData:[{
                    name:"张三",
                    phone:'13845236987',
                    options:'涨',
                    totalAmount:"234IA"
                },{
                    name:"李四",
                    phone:'13845236987',
                    options:'涨',
                    totalAmount:"234IA"
                }],

            };
        },

        created() {
            this.guessType=this.$route.query.guessType
            console.log(this.guessType)
        },
        methods: {
           see(){//查看
                this.seedialogVisible=true
           },
           handleSizeChange(pageSize) {

            },
            handleCurrentChange(pageValue) {

            },
            optsCurrentChange(){

            },
            optsSizeChange(){
                
            },
            closeDialog(){//保存  关闭弹窗
                this.opendialogVisible=false
            },
            closeSeeDialog(){
                this.seedialogVisible=false
            }
        },
        computed:{
            guessTitle(){
                if(this.guessType==1){
                    return "哈希猜涨跌"
                }else if(this.guessType==2){
                    return "哈希猜大小"
                }else if(this.guessType==3){
                    return "哈希彩票"
                }
            }
        }
     

    };
</script>

<style lang="less">
    @import "../style/mixin";
    @import "../style/common.less";
    .content{
        margin:20px
    }
    .setState{
        color:#6cf;
        cursor: pointer;
    }
    .lotterys{
        margin:40px 0 40px 0;
        display:flex;
        flex-direction:row;
        justify-content:center;
        div{
            font-size:20px;
            border:1px solid #000;
            margin:5px;
            width:30px;
            height:30px;
            line-height: 30px
        }
    }
    .option{
        margin:20px 0 20px 0;
        overflow: hidden;
        div{

            border:1px solid #000;
            padding:10px;
            width:43%;
            h3{
                line-height:30px
            }
        }
    }
    .riseFall{
        font-size: 16px;
        font-weight: 900;
        margin:0 20px 0 10px;
    }

</style>
