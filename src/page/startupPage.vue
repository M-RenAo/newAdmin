<template>
    <div class="content">
        <div>
            <el-tabs v-model="activeName" @tab-click="extensionState">
                <el-tab-pane label="全部" name="0"></el-tab-pane>
                <el-tab-pane label="推广中" name="1"></el-tab-pane>
                <el-tab-pane label="未推广" name="2"></el-tab-pane>
            </el-tabs>
        </div>
        <div style="margin-top:20px">
            <div style="margin:0 0 10px 10px">
                <el-button type="primary" style="margin-right:10px;margin-bottom:2px;" @click="addStartup">新增</el-button>
            </div>
        </div>
        <div>
            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    prop="name"
                    label="广告商"
                    min-width="50px">
                    <template>
                    </template>
                </el-table-column>
                <el-table-column label="状态" prop="status" min-width="50px">
                    <template scope="scope">
                        <div class="staing" v-if="scope.row.status=='推广中'">
                            {{scope.row.status}}
                        </div>
                        <div v-else>
                            {{scope.row.status}}
                        </div>
                        <!-- <div class="staing" v-if="scope.row.state!=0">
                            上架
                        </div>
                        <div v-else>
                            下架
                        </div> -->
                        
                    </template>
                </el-table-column>
                <el-table-column label="最近推广时间" prop="lastPushTime" width="170px"></el-table-column>
                <el-table-column label="展示量" prop="showCount" min-width="50px"></el-table-column>
                <el-table-column label="点击量" prop="touchCount" min-width="50px"></el-table-column>
                <el-table-column label="点击转化率" prop="conversion" min-width="50px"></el-table-column>
                <!-- <el-table-column label="推广时间" prop="promotion" width="170px"></el-table-column> -->
                <el-table-column label="开始时间" prop="startPushTime" width="170px"></el-table-column>
                <el-table-column label="结束时间" prop="endPushTime" width="170px"></el-table-column>
                <el-table-column label="操作" width="150">
                    <template scope="scope">
                        <el-button @click="updateStartup(scope.row)" type="text">编辑</el-button>
                        <el-popover
                            placement="top"
                            width="160"
                            trigger="click"
                            v-model="scope.row.visible">
                            <div>
                                <el-button type="primary" size="mini" @click="frames(scope.row.id,scope.row.state)">
                                    {{scope.row.state?"下架":"上架"}}
                                </el-button>
                                <el-button size="mini" type="primary" @click="delStartup(scope.row.id)">删除</el-button>
                            </div>
                            <el-button type="text" slot="reference">更多</el-button>
                        </el-popover>
                        <!-- <el-button type="text" @click="delStartup(scope.row.id)">删除</el-button> -->
                    </template>

                </el-table-column>
            </el-table>
        </div>
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
</template>
<script>
    let moment = require('moment')
    export default {
        data() {
            return {
                activeName:'0',
                tableData:[],
                txcount:0,
                nowPageSize:10,
                currentPage:1,
            };
        },
        created() {
            // console.log(moment().format('X'))
            this.getData()
        },
        methods: {
            extensionState(){//推广状态
                this.currentPage=1
                this.nowPageSize=10
                this.getData()
            },
            addStartup(){//新增
                this.$router.push({
                    path: 'updataStartup',

                })
            },
            updateStartup(row){//编辑
                this.$router.push({
                    path: 'updataStartup',
                    query: {
                        dataId:row.id,
                        page:this.currentPage,
                        size:this.nowPageSize,
                        nums:row.nums,
                        state:this.activeName
                    }
                })
            },
            delStartup(id){//删除
                this.tableData.forEach(item => {
                    item.visible = false
                })
                this.$ajax({
                    method: "POST",
                    url: BaseUrl + 'startUpShow/del',
                    params: {
                        id:id
                    },
                    headers: {'token': sessionStorage.getItem('token')}}).then(response => {
                        console.log(response)
                        this.getData()
                })
            },
            frames(id,state){//上下架
                this.tableData.forEach(item => {
                    item.visible = false
                })
                if(state==0){
                    this.setFrames(id,1)
                }
                if(state==1){
                    this.setFrames(id,0)
                }
            },
            setFrames(id,state){
                this.$ajax({
                                method: "POST",
                                url: BaseUrl + 'startUpShow/update',
                                params: {
                                    id:id,
                                    state:state
                                },
                                headers: {'token': sessionStorage.getItem('token')}
                            }).then(response => {
                                if (response.data.flag == 200) {
                                    this.$message({
                                        showClose: true,
                                        message:`${response.data.msg}`,
                                        type: 'success'
                                    });
                                    this.getData()
                                }
                            });
            },
            handleCurrentChange(val){
                this.currentPage=val
                this.getData()
            },
            handleSizeChange(val){
                this.nowPageSize=val
                this.getData()
            },
            getData(){
                this.$ajax.get(BaseUrl + "startUpShow/info",{
                params:{
                pageCode:this.currentPage,
                pageSize:this.nowPageSize,
                state:this.activeName
            },headers: {'token': sessionStorage.getItem('token')}}).then(res => {
                let nums=-1
                res.data.data.list.forEach(item=>{
                    if (item.endPushTime != undefined&&item.endPushTime != undefined){
                            
                            if(moment().format('X')*1000>item.startPushTime&&moment().format('X')*1000<item.endPushTime){
                                item.status="推广中"
                                // console.log(1)
                            }else if(moment().format('X')*1000<item.startPushTime){
                                item.status="待推广"
                            }else if(moment().format('X')*1000>item.endPushTime){
                                item.status="已推广"
                            }
                        }
                    if (item.startPushTime != undefined) {
                        item.startPushTime = moment.utc(item.startPushTime).local().format('YYYY-MM-DD HH:mm:ss')
                    }
                    if (item.endPushTime != undefined && item.endPushTime != 0) {
                        item.endPushTime = moment.utc(item.endPushTime).local().format('YYYY-MM-DD HH:mm:ss')
                    }
                    if (item.lastPushTime != undefined && item.lastPushTime != 0) {
                        item.lastPushTime = moment.utc(item.lastPushTime).local().format('YYYY-MM-DD HH:mm:ss')
                    }
                    item.visible=false
                    nums+=1
                    item.nums=nums;
                    if(item.showCount!=0){
                         item.conversion=item.touchCount/item.showCount+"%"
                         return
                    }else if(item.touchCount==0){
                        item.conversion="0%"
                        return
                    }else if(item.showCount==0){
                        item.conversion="0%"
                        return
                    }
                   
                })
                this.tableData=res.data.data.list
                this.txcount=res.data.data.num
                        console.log(this.tableData)
            })
            }
        },
        components:{
        }
    }
</script>
<style lang="less">
    .content{
        padding:20px;
        .staing{
            color:#6cf
        }
    }
    
</style>