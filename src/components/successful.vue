<template>
    <div class="content">
        <div style="padding-bottom: 10px">
            <span class="username">用户：张三</span>
            <span>经李四邀请注册</span>
        </div>
        <div class="content">
            <span class="realname">实名状态</span>
            <el-dropdown split-button type="primary" @command="handleCommand" size="small">
                    {{command}}
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="全部">全部</el-dropdown-item>
                    <el-dropdown-item command="已实名">已实名</el-dropdown-item>
                    <el-dropdown-item command="未实名">未实名</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <div>
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
                prop="phone"
                label="手机号"
                min-width="50">
                </el-table-column>
                <el-table-column
                prop="nickname"
                label="昵称"
                min-width="50">
                </el-table-column>
                <el-table-column
                prop="name"
                label="姓名"
                min-width="50">
                </el-table-column>
                <el-table-column
                prop="namestate"
                label="实名状态"
                min-width="50">
                </el-table-column>
                <el-table-column
                prop="reward"
                label="奖励"
                min-width="50">
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        command:"全部",
        tableData: [{
          date: '2016-05-03',
          name: '李四',
          reward: '523',
          phone: '123456757',
          namestate: '已认证',
          nickname: '小李',
        },
        {
          date: '2016-05-03',
          name: '李四',
          reward: '523',
          phone: '123456757',
          namestate: '已认证',
          nickname: '小李',
        },
        {
          date: '2016-05-03',
          name: '李四',
          reward: '523',
          phone: '123456757',
          namestate: '已认证',
          nickname: '小李',
        },
        {
          date: '2016-05-03',
          name: '李四',
          reward: '523',
          phone: '123456757',
          namestate: '已认证',
          nickname: '小李',
        }
        ]
      }
    },
    methods: {
      handleCommand(command){
        this.command=command;
      }
    }
  }
</script>
<style lang="less" scoped>
    @import "../style/mixin";
    .realname{
        color:#000;
        padding-right: 20px;
        font-size: 16px;
        font-weight: 900;
    }
    .username{
        color:#000;
        padding-right: 20px;
        font-size: 20px;
        font-weight: 900;
        
    }
    .content{
        text-align: left
    }
</style>

