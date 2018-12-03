<template>
    <div class="content">
        <div style="margin-bottom:20px">
            <el-button type="primary">新建</el-button>
        </div>
        <div>
            <el-table
            :data="tableData" 
            style="min-width: 100%">
                <el-table-column prop="hao" label="渠道号" min-width="50"></el-table-column>
                <el-table-column prop="name" label="公司名称" min-width="50"></el-table-column>
                <el-table-column prop="ctime" label="创建时间" min-width="50"></el-table-column>
                <el-table-column prop="utime" label="修改时间" min-width="50"></el-table-column>
                <el-table-column prop="shu" label="渠道数" min-width="50"></el-table-column>
                <el-table-column prop="liang" label="下载量" min-width="50"></el-table-column>
                <el-table-column prop="clicks" label="点击量" min-width="50"></el-table-column>
                <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text">查看</el-button>
                </template>
                </el-table-column>
            </el-table>
        </div>
        <div>
            <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%">
                <span>这是一段信息</span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                tableData:[
                    {hao:"123",name:"阿里巴巴",ctime:"2017-9-30",utime:"2018-10-30",shu:"20",liang:"50",clicks:"10"},
                    {hao:"123",name:"阿里巴巴",ctime:"2017-9-30",utime:"2018-10-30",shu:"20",liang:"50",clicks:"10"},
                    {hao:"123",name:"阿里巴巴",ctime:"2017-9-30",utime:"2018-10-30",shu:"20",liang:"50",clicks:"10"},
                    {hao:"123",name:"阿里巴巴",ctime:"2017-9-30",utime:"2018-10-30",shu:"20",liang:"50",clicks:"10"},
                    {hao:"123",name:"阿里巴巴",ctime:"2017-9-30",utime:"2018-10-30",shu:"20",liang:"50",clicks:"10"},
                ],
                dialogVisible:false
            }
        },
        methods: {
            handleClick(){
                this.dialogVisible = true
            }
        }
    }
</script>
<style lang="less" scoped>
    .content{
        padding:20px
    }
</style>