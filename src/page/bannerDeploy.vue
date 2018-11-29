<template>
    <div class="content">
        <el-tabs v-model="activeName">
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
                activeName: '1'
            };
        },
        components:{
            focusImg,
            iosFocusImg
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
