<template>
    <div class="fillcontain">
        <div class="table_container">
            <el-row style="display:flex;margin-bottom: 20px;">

                <el-col>
                    <div style="display:inline-block">
                        <span style="font-size: 14px;">状态：</span>
                        <el-select v-model="value" placeholder="请选择" style="margin-bottom: 2px" @change="search">
                            <el-option
                                v-for="item in options"
                                :key="item.code"
                                :label="item.title"
                                :value="item.code">
                            </el-option>
                        </el-select>
                    </div>
                </el-col>
                <!--<div style="display:flex;justify-content: flex-end">-->
                    <!--<el-button type="primary" style="height:40px;" @click="search">搜索</el-button>-->
                <!--</div>-->
            </el-row>
            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    label="时间"
                    prop="date">
                </el-table-column>
                <el-table-column
                    label="小协议"
                    prop="title">
                </el-table-column>
                <el-table-column
                    label="状态"
                    prop="confirm">
                </el-table-column>
                <el-table-column label="操作" width="200">
                    <template scope="scope">
                        <el-button @click="updatePush(scope.row.agrId)" >查看</el-button>
                        <!--<el-button @click="del(scope.row.id)">删除</el-button>-->
                    </template>

                </el-table-column>
            </el-table>
            <div class="Pagination" style="margin-left: 20px;">
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
    import headTop from '../components/headTop'
    import {baseUrl, baseImgPath} from '@/config/env'
    let moment=require('moment')
    export default {
        data(){
            return {
                input:'',
                value:'4',
                startDate:'',
                endDate:'',
                tableData: [],
                currentPage: 1,
                nowPageSize:10,
                txcount:0,
                options: [
                    {title:'全部',code:'4'},
                    {title:'待确认',code:'0'},
                    {title:'待上链',code:'1'},
                    {title:'已取消',code:'2'},
                    {title:'已上链',code:'3'},
                ],
                delVisible:false,
                id:''
            }
        },
        created(){
            this.getData()
        },
        computed: {
        },
        components: {
        },
        methods: {
            getData(){
                this.$ajax.get(BaseUrl+'agreement/all/two/'+this.value+'/'+this.currentPage+'/'+this.nowPageSize,{headers: {'token': sessionStorage.getItem('token')}}).then(response=>{
                    if(response.data.flag==200){
                    this.tableData=response.data.data.list;
                    this.txcount=response.data.data.num;
                    this.tableData.forEach(item=>{
                        item.date=moment.utc(item.date).local().format('YYYY-MM-DD HH:mm:ss')
                    })
                    this.tableData.forEach(item=>{
                        if(item.confirm==0){
                            item.confirm='待确认'
                        }else if(item.confirm==1){
                            item.confirm='待上链'
                        }else if(item.confirm==2){
                            item.confirm='已取消'
                        }else{
                            item.confirm='已上链'
                        }
                    })
                    sessionStorage.setItem('litNumList',JSON.stringify(this.tableData))
                    }else if(response.data.flag==201){
                        this.$alert(response.data.msg+'，请重新登录', '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$router.push('/')
                            }
                        });
                    }
                })
            },
            handleSizeChange(pageSize){
                this.nowPageSize = pageSize;
                this.getData()
            },
            handleCurrentChange(pageValue){
                this.currentPage=pageValue
                this.getData()
            },
            updatePush(id){
                this.$router.push({path:'/agreeInfo',query:{id:id}})
            },
            search(){
                this.getData()
            }
        },
    }
</script>

<style lang="less" scoped>
    @import '../style/mixin';
    .table_container{
        padding: 20px;
    }
</style>
