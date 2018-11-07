<template>
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
        <el-button @click="handleClick(scope.row)" type="text" size="medium">查看</el-button>
        <el-button type="text" size="medium">编辑</el-button>
        <el-button type="text" size="medium">更多</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    methods: {
      handleClick(row) {
        console.log(row);
      }
    },
    data() {
      return {
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
      }
    }
  }
</script>
<style>

</style>

