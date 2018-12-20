<template>
    <div class="content">
        <div>
            <el-select v-model="query">
                <el-option
                v-for="item in querys"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                >
                </el-option>
            </el-select>
            <el-input placeholder="关键字搜索" v-model="searchInfo" style="width:400px"
                              @keyup.enter.native="searchCheck">
                        <el-button slot="append" @click="searchCheck"><i class="el-icon-search"></i></el-button>
            </el-input>
        </div>
        <div style="margin-top:20px">
            <el-button @click="refresh" plain>刷新</el-button>
            <el-button @click="dialogVisible = true;sensitive=''" type="primary">新增</el-button>
            <el-button @click="delsensits" type="primary">批量删除</el-button>
        </div>
        <div style="margin-top:20px">
            <div>按开头字母搜索</div>
            <div style="overflow:hidden" ref="zm">
                <div class="zimu" v-for="(letter,index) in letters" :key="index" @click="letterSearch($event,letter)">{{letter}}</div>
            </div>
        </div>
        <div style="margin-top:20px">
            <el-table
                ref="multipleTable"
                :data="tableData"
                style="width: 60%"
                @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column
                    label="敏感词"
                    prop="badword" min-width="50">
                </el-table-column>
                <el-table-column
                    label="操作"
                    min-width="50">
                    <template scope="scope">
                        <el-button type="text" @click="delsensit(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="Pagination">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[10, 20, 30, 50]"
                    :page-size="nowPageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="usercount">
                </el-pagination>
        </div>
        <div>
            <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="30%">
                <div style="margin-bottom:10px">如果需要一次屏蔽多个，请用空格隔开</div>
                <el-input v-model="sensitive" placeholder="请输入需要屏蔽的敏感词" @change="arrsen"></el-input>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="add">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                sensitive:'',//敏感词
                arrsensitive:[],
                dialogVisible:false,
                searchInfo:'',
                letters:["全部",'A','B','C','D','E','F','G','H','J','K','L','M','N','O','P','Q','R','S','T','W','X','Y','Z'],
                tableData:[],
                currentPage:1,
                nowPageSize:10,
                usercount:0,
                multipleSelection: [],
                arr:[],
                keyEq:undefined,
                otherKey:undefined,
                badwordEq:undefined,
                badword:undefined,
                query:1,
                querys:[{value:1,label:"模糊匹配关键字"},{value:2,label:"精确匹配关键字"}],
            }
        },
        created () {
            this.getData()
        },
        mounted () {
            this.$refs.zm.firstChild.classList.add('active')
        },
        methods:{
            searchCheck(){//关键字搜索
                if(this.query==1){
                    this.badwordEq=undefined
                    this.badword=this.searchInfo
                }else if(this.query==2){
                    this.badwordEq=this.searchInfo
                    this.badword=undefined
                }else if(this.query==0){
                    this.badwordEq=undefined
                    this.badword=undefined
                }
                this.classNameUpdate()
                this.keyEq=undefined
                this.otherKey=undefined
                this.currentPage=1
                this.nowPageSize=10
                this.getData();
            },
            arrsen(){//将输入的敏感词转成数组  去重
                this.arr=[]
                let arrs=[]
                this.arrsensitive=this.sensitive.split(' ')
                this.arrsensitive.forEach(time=>{//去首尾空格
                    time.replace(/(^\s*)|(\s*$)/g,"");
                })
                arrs=this.arrsensitive.filter(time=>{
                    return time!=''
                })
                this.arr=arrs.filter((val,index,array)=>{//去重
                    return array.indexOf(val)===index
                })
            },
            refresh(){//刷新
                this.searchInfo=""
                this.badwordEq=undefined
                this.badword=undefined
                this.keyEq=undefined
                this.currentPage=1
                this.nowPageSize=10
                this.$ajax({
                    method: "POST",
                    url: BaseUrl + 'sensitive/reload',
                    headers: {
                        'token': sessionStorage.getItem('token')
                    }
                }).then(res => {
                    if(res.data.flag==200){
                        this.getData()
                        this.classNameUpdate()
                        this.$message({
                        message:`${res.data.msg}`,
                        type: 'success'
                        });
                    }
                })
            },
            add(){//新增
                this.dialogVisible = false
                this.$ajax({
                    method: "POST",
                    url: BaseUrl + 'sensitive/insert',
                    data:this.arr,
                    headers: {
                        'token': sessionStorage.getItem('token')
                    }
                }).then(res => {
                    if(res.data.flag==200){
                        this.$alert(res.data.msg, '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$message({
                                    type: 'info',
                                    message: `${ res.data.msg}`
                                });
                                this.getData()
                                this.classNameUpdate()
                            }
                        });

                    }else if(res.data.flag==500){
                        this.$message.error(`${res.data.msg}`);
                    }else if(res.data.flag==201){
                        this.$alert(res.data.msg + '，请重新登录', '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$router.push('/')
                            }
                        });
                    }

                })
            },
            letterSearch(e,letter){//字母搜索
                this.$refs.zm.childNodes.forEach(time=>{
                    time.classList.remove('active')
                })
                e.target.classList.add('active')
                if(letter=='全部'){
                    this.keyEq=undefined
                    this.otherKey=undefined
                }else if(letter=='其他'){
                    this.keyEq=undefined
                    this.otherKey="其他"
                }else{
                    this.keyEq=letter
                    this.otherKey=undefined
                }
                this.searchInfo=""
                this.badwordEq=undefined
                this.badword=undefined
                this.currentPage=1
                this.nowPageSize=10
                this.getData()
            },
            delsensit(row){//删除
                this.$ajax({
                    method: "POST",
                    url: BaseUrl + 'sensitive/delete',
                    data:[`${row.badword}`],
                    headers: {
                        'token': sessionStorage.getItem('token')
                    }
                }).then(res => {
                    if(res.data.flag==200){
                        this.getData()
                    }else{
                        this.$message.error(`${res.data.msg}`);
                    }

                })
            },
            delsensits(){//删除多个
                if(this.multipleSelection[0]==undefined){
                    this.$alert('请选择要删除的项', '提示', {
                        confirmButtonText: '确定',
                    });
                }else if(this.multipleSelection[0]!=undefined){
                    this.$ajax({
                    method: "POST",
                    url: BaseUrl + 'sensitive/delete',
                    data:this.multipleSelection,
                    headers: {
                        'token': sessionStorage.getItem('token')
                    }
                }).then(res => {
                    if(res.data.flag==200){
                        this.getData()

                    }else{
                        this.$message.error(`${res.data.msg}`);
                    }

                })
                }
            },
            handleSelectionChange(val){
                this.multipleSelection=[]
                if(val){
                    for(let i=0;i<val.length;i++){
                        this.multipleSelection.push(val[i].badword)
                    }
                }
            },
            handleCurrentChange(val){
                this.currentPage=val
                this.nowPageSize=10
                this.getData()
            },
            handleSizeChange(val){
                this.currentPage=1
                this.nowPageSize=val
                this.getData()
            },
            getData(){//获取数据
                this.$ajax({
                    method: "POST",
                    url: BaseUrl + 'sensitive/query',
                    data: {
                        badword:this.badword,
                        badwordEq:this.badwordEq,
                        keyEq:this.keyEq,
                        otherKey:this.otherKey,
                        page:this.currentPage,
                        size:this.nowPageSize
                    },
                    headers: {
                        'token': sessionStorage.getItem('token')
                    }
                }).then(res => {
                    this.tableData=res.data.data.data
                    this.usercount=res.data.data.count
                })
            },
            classNameUpdate(){//
                this.$refs.zm.childNodes.forEach(time=>{
                    time.classList.remove('active')
                })
                this.$refs.zm.firstChild.classList.add('active')
            }
        },
        watch:{
            currentPage(){
            }
        }

    }
</script>
<style lang="less" scoped>
    .content{
        padding: 20px;
        .zimu{
            font-size: 15px;
            font-weight:100;
            float: left;
            padding:10px;
            cursor: pointer;
        }
        .active{
            color: #6cf
        }
    }
</style>
