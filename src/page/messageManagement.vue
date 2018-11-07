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
            <div class="tabs">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="全部" name="whole"></el-tab-pane>
                    <el-tab-pane label="发布" name="release"></el-tab-pane>
                    <el-tab-pane label="草稿" name="draft"></el-tab-pane>
                </el-tabs>
                <el-button type="primary" round class="establish" @click="goEdit">创建</el-button>
            </div>
            <div class="table">
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
                    prop="mapping"
                    label="配图"
                    width="200">
                    </el-table-column>
                    <el-table-column
                    prop="headlines"
                    label="快讯标题"
                    min-width="50">
                    </el-table-column>
                    <el-table-column
                    prop="state"
                    label="状态"
                    min-width="50">
                    </el-table-column>
                    <el-table-column
                    prop="author"
                    label="作者"
                    min-width="50">
                    </el-table-column>
                    <el-table-column
                    prop="createdate"
                    label="创建日期"
                    min-width="50">
                    </el-table-column>
                    <el-table-column
                    prop="comment"
                    label="评论"
                    min-width="50">
                    </el-table-column>
                    <el-table-column
                    prop="share"
                    label="分享量"
                    min-width="50">
                    </el-table-column>
                    <el-table-column
                    label="操作"
                    width="150">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="text" size="medium">编辑</el-button>
                        <el-button type="text" size="medium">评论</el-button>
                        <el-button type="text" size="medium">更多</el-button>
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
        activeName: 'whole',
        tableData: [{
          date: '2016-05-03',
          mapping: '1231321',
          headlines: '123456757',
          state: '发布',
          author: '李四',
          createdate: "2018-11-6",
          comment: 'haohao',
          share: '23'
        },
        {
          date: '2016-05-03',
          mapping: '1231321',
          headlines: '123456757',
          state: '发布',
          author: '李四',
          createdate: "2018-11-6",
          comment: 'haohao',
          share: '23'
        },
        {
          date: '2016-05-03',
          mapping: '1231321',
          headlines: '123456757',
          state: '发布',
          author: '李四',
          createdate: "2018-11-6",
          comment: 'haohao',
          share: '23'
        },
        {
          date: '2016-05-03',
          mapping: '1231321',
          headlines: '123456757',
          state: '发布',
          author: '李四',
          createdate: "2018-11-6",
          comment: 'haohao',
          share: '23'
        }
        ]
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      goEdit(){
          this.$router.push({path:"/editingInterface"})
      },
      search(){
          
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
    
</style>

