<template>
    <div>
        <div class="table_container">
            <el-row type="flex" style="margin-bottom: 30px;">
                <el-col style="display: flex;justify-content: flex-start">
                    <el-input placeholder="关键字" class="input-with-select"
                              style="width:40%">
                        <el-button slot="append" @click="search(searchForm)"><i class="el-icon-search"></i></el-button>
                    </el-input>
                </el-col>
            </el-row>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="全部" name="first"></el-tab-pane>
                <el-tab-pane label="显示" name="second"></el-tab-pane>
                <el-tab-pane label="隐藏" name="third"></el-tab-pane>
            </el-tabs>
            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                fixed
                prop="date"
                label="日期"
                min-width="50">
                </el-table-column>
                <el-table-column
                prop="name"
                label="用户"
                min-width="50">
                </el-table-column>
                <el-table-column
                prop="comment"
                label="评论内容"
                min-width="50">
                </el-table-column>
                <el-table-column
                prop="phone"
                label="手机号"
                min-width="50">
                </el-table-column>
                <el-table-column
                prop="replyobject"
                label="回复对象"
                min-width="50">
                </el-table-column>
                <el-table-column
                prop="thumbsup"
                label="点赞"
                min-width="50">
                </el-table-column>
                <el-table-column
                prop="state"
                label="状态"
                min-width="50">
                </el-table-column>
                <el-table-column
                label="操作"
                width="150">
                <template slot-scope="scope">
                    <el-button @click="See(scope.row)" type="text" size="medium">查看</el-button>
                    <el-button type="text" size="medium">显示</el-button>
                    <el-button type="text" size="medium">隐藏</el-button>
                    <el-dialog
                    :visible.sync="centerDialogVisible"
                    width="700px"
                    center>
                    <h2>用户:{{scope.row.name}}</h2>
                    <div class="comment">{{scope.row.comment}}</div>
                    </el-dialog>
                </template>
                </el-table-column>
            </el-table>

        </div>
    </div>
</template>
<script>
    export default {
    data() {
      return {
        activeName: 'first',
        centerDialogVisible:false,
        newsflashID:"",//此条快讯ID
        tableData: [{
          date: '2016-05-03',
          name: '李四',
          phone: '123456757',
          replyobject: '小王',
          author: '李四',
          thumbsup: '1233',
          comment:"真的好看",          
          state: '显示'
        },
        {
          date: '2016-05-03',
          name: '李四',
          phone: '123456757',
          replyobject: '小王',
          comment:"真的好看",
          thumbsup: '1233',
          state: '显示'
        },
        {
          date: '2016-05-03',
          name: '李四',
          phone: '123456757',
          replyobject: '小王',
          author: '李四',
          thumbsup: '1233',
          comment:"真的好看",
          state: '显示'
        },
        {
          date: '2016-05-03',
          name: '李四',
          phone: '123456757',
          replyobject: '小王',
          author: '李四',
          thumbsup: '1233',
          comment:"真的好看",
          state: '显示'
        }
        ]
      };
    },
    created() {
        this.newsflashID=this.$route.query.id;
            console.log(this.$route.query.id)
            this.$ajax.get(BaseUrl+"newsFlash/commentList",{
                        params: {
                            id:this.newsflashID,
                            pageNum:"1",
                            pageSize:"10"
                        }, headers: {'token': sessionStorage.getItem('token')}}).then(res=>{
                console.log(res)
                    // res.data.data.forEach(item=>{
                    //             if(item.time!=undefined){
                    //                 item.time=moment.utc(item.time).local().format('YYYY-MM-DD HH:mm:ss')
                    //             }
                    //         })
                    // this.tableData=res.data.data
                }
            )
        },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      See(row) {//查看
        console.log(row);
        this.centerDialogVisible=true;
      }
    }
  };
</script>
<style lang="less" scoped>
    @import "../style/mixin";

    .table_container {
        padding: 20px;
    }

    .littleButton {
        padding: 5px 10px !important;
        margin-left: 0 !important;
    }

    .border-radius {
        border-radius: 6px;
        height: auto;
        width: 148px
    }

    .icon-trumpet-el {
        height: 147px;
        position: relative;
        .el-form-item__content {
            display: flex;
            position: absolute;
        }
        div.el-form-item__content {
            border: 0 !important;
        }
        div {
            background-color: #fbfdff;
            border: 1px dashed #c0ccda;
            border-radius: 6px;
            box-sizing: border-box;
            width: 148px;
            height: 148px;
            cursor: pointer;
            line-height: 146px;
            position: absolute;
            top: 0;
        }
    }
    .comment{
        padding:20px 0 20px 0
    }
</style>

