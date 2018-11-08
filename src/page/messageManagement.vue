<template>
    <div>
        <div class="table_container">
            <el-row type="flex" style="margin-bottom: 30px;">
                <el-col style="display: flex;justify-content: flex-start">
                    <el-input placeholder="关键字" class="input-with-select"
                              style="width:40%">
                        <el-button slot="append" @click="search"><i class="el-icon-search"></i></el-button>
                    </el-input>
                </el-col>
            </el-row>
            <div class="tabs" style="padding-left:20px">
                <el-tabs v-model="activeName" @tab-click="tabClick">
                    <el-tab-pane label="全部" name="whole"></el-tab-pane>
                    <el-tab-pane label="发布" name="release"></el-tab-pane>
                    <el-tab-pane label="草稿" name="draft"></el-tab-pane>
                </el-tabs>
                <el-button type="primary" round class="establish" @click="goEdit">创建</el-button>
            </div>
            <div class="table">
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column fixed prop="date" label="发布日期" min-width="50"></el-table-column>
                    <el-table-column prop="mapping" label="配图" width="200"></el-table-column>
                    <el-table-column prop="headlines" label="快讯标题" min-width="50">
                        <template scope="scope">
                            <span class="headlines" @click="headlinesclick(scope.row)">{{scope.row.headlines}}</span>
                            <span class="right">已置顶</span>
                            <el-dialog :visible.sync="centerDialogVisible" width="800px" center>
                                <h2 style="text-align:center;padding-bottom:20px;font-size:25px">{{scope.row.headlines}}</h2>
                                <div style="width:400px;margin:0 auto"><img src="https://ss3.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=4fbff84f6e2762d09f3ea2bf90ed0849/5243fbf2b2119313562db8dc68380cd791238d74.jpg" width="400px" height="200px"/></div>
                                <div style="width:500px;margin:0 auto;text-align:center">Praesent accumsan ligula eget elit porta, sed efficitur est varius. Sed quam tellus, iaculis vel ante nec, tincidunt tempus ipsum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lacinia, enim a posuere molestie, ante est cursus nunc, quis fringilla tortor sapien sed nisl. Donec viverra, tortor quis commodo tincidunt, turpis sapien ornare </div>
                            </el-dialog>
                        </template>
                    </el-table-column>
                    <el-table-column prop="state" label="状态" min-width="50"></el-table-column>
                    <el-table-column prop="author" label="作者" min-width="50"></el-table-column>
                    <el-table-column prop="createdate" label="创建日期" min-width="50"></el-table-column>
                    <el-table-column label="热讯推荐" min-width="50">
                        <template scope="scope">
                            <div class="recommend">{{scope.row.recommend}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="150">
                    <template slot-scope="scope">
                        <el-button @click="goEdit" type="text" size="medium">编辑</el-button>
                        <el-button type="text" size="medium" @click="goComment">评论</el-button>
                        <el-popover
                            placement="right"
                            trigger="click">
                            <el-button type="text" size="medium" slot="reference">更多</el-button>
                        </el-popover>
                        
                    </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
    data() {
      return {
        centerDialogVisible:false,//弹窗是否显示
        activeName: 'whole',
        tableData: [{
          date: '2016-05-03',
          mapping: '1231321',
          headlines: '123456757',
          state: '发布',
          author: '李四',
          createdate: "2018-11-6",
          recommend:"已推荐",
        },
        {
          date: '2016-05-03',
          mapping: '1231321',
          headlines: '123456757',
          state: '发布',
          author: '李四',
          createdate: "2018-11-6",
          recommend:"已推荐",

        },
        {
          date: '2016-05-03',
          mapping: '1231321',
          headlines: '123456757',
          state: '发布',
          author: '李四',
          createdate: "2018-11-6",
          recommend:"已推荐",          
        },
        {
          date: '2016-05-03',
          mapping: '1231321',
          headlines: '123456757',
          state: '发布',
          author: '李四',
          createdate: "2018-11-6",
          recommend:"已推荐",          
        }
        ]
      };
    },
    methods: {
      tabClick(tab, event) {
        console.log(tab, event);
      },
      goEdit(){//前往编辑界面
          this.$router.push({path:"/editingInterface"})
      },
      goComment(){//前往评论界面
          this.$router.push({path:"/comment"})        
      },
      search(){
          
      },
      headlinesclick(row){//查看快讯标题
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
    .tabs{
        position: relative;
    }
    .establish{
        position:absolute;
        top:-2px;
        right:50px;
        z-index: 100;
    }
    .recommend{
        color:red
    }
    .headlines{
        color:#6cf;
        cursor: pointer;
    }
    .right{
        border: 1px solid red;
        color: red;
        font-size: 12px
    }
    
</style>

