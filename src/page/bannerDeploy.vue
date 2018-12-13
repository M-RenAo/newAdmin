<template>
    <div class="table_container">
        <el-tabs v-model="activeName"  @tab-click="handleClick">
            <el-tab-pane label="android" name="1"><focus-img></focus-img></el-tab-pane>
            <el-tab-pane label="ios" name="2"><ios-focus-img></ios-focus-img></el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import focusImg from './focusImg'
import iosFocusImg from './iosFocusImg'
    export default {
        data() {
            return {
                activeName:'1'
            };
        },
        created(){
            this.activeName=this.$route.query.active
        },
        components:{
            focusImg,
            iosFocusImg
        },
        methods:{
            handleClick(){
                this.$router.push({
                    name: 'bannerDeploy',
                    query: {
                        page:1,
                        size:10,
                        active:this.activeName
                    }
                })
            }
        }
    }
</script>
<style lang="less" scoped>
    .table_container{
        padding:20px;
        /*.el-tabs__item{*/
            /*!*font-size:20px*!*/
        /*}*/
    }
</style>
