<template>
    <div class="content">
        <div>
            <el-tabs v-model="activeName">
                <el-tab-pane label="android" name="1"></el-tab-pane>
                <el-tab-pane label="ios" name="2"></el-tab-pane>
            </el-tabs>
        </div>
        <div style="margin-top:20px">
            <el-select v-model="bannerType">
                <el-option v-for="item in bannerTypes" :key="item.value" :label="item.label" :value="item.value"> </el-option>
            </el-select>
            <div class="right" style="margin-right:50px">
                <el-button type="primary" style="margin-right:10px;margin-bottom:2px;" @click="addStartup">新增</el-button>
            </div>
        </div>
        <div>
            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    prop="type"
                    label="广告商"
                >
                    <template>
                    </template>
                </el-table-column>
                <el-table-column label="状态" prop="status"></el-table-column>
                <el-table-column label="最近推广时间" prop="latelyTime"></el-table-column>
                <el-table-column label="展示量" prop="quantity"></el-table-column>
                <el-table-column label="点击量" prop="clicks"></el-table-column>
                <el-table-column label="点击转化率" prop="conversion"></el-table-column>
                <el-table-column label="推广时间" prop="promotion" width="170px"></el-table-column>
                <el-table-column label="操作" width="200">
                    <template scope="scope">
                        <el-button @click="updateStartup(scope.row.id)" type="text">编辑</el-button>
                        <el-popover
                            placement="top"
                            width="160"
                            trigger="click"
                            v-model="scope.row.visible">
                            <div>
                                <el-button type="primary" size="mini" @click="frames(scope.row)">
                                    {{!scope.row.top?"上架":"下架"}}
                                </el-button>
                                <el-button size="mini" type="primary" @click="delStartup(scope.row)">删除</el-button>
                            </div>
                            <el-button type="text" slot="reference">更多</el-button>
                        </el-popover>
                        <!-- <el-button @click="more(scope.row.id)">更多</el-button> -->
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
    export default {
        data() {
            return {
                activeName: '1',
                bannerType:"全部",
                bannerTypes:[{value:0,label:"全部"},{value:1,label:"推广中"},{value:2,label:"未推广"}],
                tableData:[{type:'阿里',status:'上架',latelyTime:'四天前',quantity:'123',clicks:'456',conversion:'13%',promotion:'2018-2-3 至2018-3-4'}],
                txcount:0,
                nowPageSize:10,
                currentPage:1,
            };
        },
        methods: {
            addStartup(){//新增

            },
            updateStartup(){//编辑

            },
            more(){//更多

            },
            delStartup(){//删除

            },
            frames(){//上下架

            },
            handleCurrentChange(){

            },
            handleSizeChange(){

            }
        },
        components:{
        }
    }
</script>
<style lang="less">
    .content{
        padding:20px;
        .el-tabs__item{
            font-size:20px
        }
    }
</style>