<template>
    <div class="content">
        <div style="padding-bottom: 10px">
            <span class="username">用户：张三</span>
            <span>经李四邀请注册</span>
        </div>
        <div class="content">
            <span class="realname">实名状态</span>
            <el-select v-model="selectvalue" placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
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
    props:["userId"],
    data() {
      return {
        selectvalue:"全部",//实名状态
        options: [{
          value: '1',
          label: '全部'
        }, {
          value: '2',
          label: '已实名'
        }, {
          value: '3',
          label: '未实名'
        }],
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
    created(){
      console.log(this.userId)
       this.$ajax.get(BaseUrl+"inviterecord/all/"+"ee8e7a80acc94543af52685353e25a73"+"/"+'1'+"/"+'5',{
                        // params: {
                        //     userId:"e58467da4c9245daa9bb70b3d58be60c",
                        //     pageCode:"1",
                        //     pageSize:"10"
                        // }, 
                        headers: {'token': sessionStorage.getItem('token')}}).then(res=>{
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

