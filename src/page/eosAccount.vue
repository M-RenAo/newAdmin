<template>
    <div style="margin: 20px;">
        <div class="group-title">核心账户</div>
        <div class="list-group">
            <div class="account-item" v-for="item in mainAccountList">
                <div> {{item.name}}</div>
                <div class="button-group">
                    <p>钱包金额：{{item.amount}}EOS</p>
                    <el-button type="text" @click="showHistory()">转账记录</el-button>
                    <el-button type="text" @click="transfer()">转账</el-button>
                </div>
            </div>
        </div>
        <div  class="group-title">游戏账户</div>
        <div class="list-group">
            <div class="account-item" v-for="item in gameAccountList">
                <div> {{item.name}}</div>
                <div class="button-group">
                    <p>钱包金额：{{item.amount}}EOS</p>
                    <el-button type="text" @click="showHistory()">转账记录</el-button>
                    <el-button type="text" @click="transfer()">转账</el-button>
                </div>
            </div>
        </div>
        <div class="group-title">操作账户</div>
        <div class="list-group">
            <div class="account-item" v-for="item in gameAccountList">
                <div> {{item.name}}</div>
                <div class="button-group">
                    <p>钱包金额：{{item.amount}}EOS</p>
                    <el-button type="text" @click="showHistory()">转账记录</el-button>
                    <el-button type="text" @click="transfer()">转账</el-button>
                </div>
            </div>
        </div>
        <el-dialog title="转账" :visible.sync="dialogFormVisible" width="700px">
            <el-form :model="form">
                <el-form-item label="收款账户" :label-width="formLabelWidth">
                    <el-select v-model="form.region" placeholder="请选择收款账户">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="金额（EOS）" :label-width="formLabelWidth">
                    　<el-input v-model="form.amounts" style="width:200px"></el-input>
                </el-form-item>
                <el-form-item label="转账备注" :label-width="formLabelWidth">
                    　<el-input v-model="form.amounts" type="textarea" row="2"  style="width:400px"></el-input>
                </el-form-item>
            </el-form>
            <div style="display: flex;justify-content: center">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="转账记录" :visible.sync="dialogTableVisible" width="1000px">
            <el-table :data="historyData">
                <el-table-column property="createTime" label="转出账户名"></el-table-column>
                <el-table-column property="amount" label="金额"></el-table-column>
                <el-table-column property="type" label="时间"></el-table-column>
                <el-table-column property="remark" label="交易"></el-table-column>
                <el-table-column property="remark" label="备注"></el-table-column>
                <el-table-column property="address" label="收款账户"></el-table-column>
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
        </el-dialog>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                mainAccountList:[
                    {name:'收款账户',amount:100,id:1}, {name:'打币账户',amount:100,id:1}
                ],
                gameAccountList:[
                    {name:'账户一',amount:100,id:1,num:0},{name:'账户二',amount:100,id:2,num:1},{name:'账户三',amount:100,id:3,num:0},
                ],
                operatingAccountList:[
                    {name:'账户一',amount:100,id:1,num:0},{name:'账户二',amount:100,id:2,num:1},{name:'账户三',amount:100,id:3,num:0},
                ],
                dialogFormVisible:false,
                form:{},
                formLabelWidth:'120px',
                dialogTableVisible:false,
                historyData:[],
                currentPage:1,
                nowPageSize:10,
                txcount:0
            };
        },
        created() {
            // this.gameAccountList.forEach((item,index)=>{
            //    console.log(index)
            // })

        },
        computed: {},
        methods: {
            showHistory(){
               this.dialogTableVisible=true
            },
            transfer(){
               this.dialogFormVisible=true
            },
            handleSizeChange(){

            },
            handleCurrentChange(){

            }
        },

    };
</script>
<style lang="less" scoped>
    .group-title{
        margin-left: 20px;
        margin-bottom: 10px;
    }
  .list-group{
      /*display: flex;*/
      min-width: 700px;
      margin-bottom: 30px;
      .account-item{
          margin-top: 10px;
          display: inline-block;
          width:300px;
          height: 150px;
          border: 1px #ccc solid;
          margin-left: 30px;
          padding: 10px 10px;
          div:first-child{
              font-size: 20px;
              font-weight: bold;
          }
          .button-group{
              display: flex;
              align-items: center;
              margin-top: 90px;
              p{
                 width:200px;

              }
          }
      }
  }
</style>
