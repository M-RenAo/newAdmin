<template>
    <div class="content">
        <el-row style="margin-top: 20px;">
            <el-col :span="14" :offset="1">
                <el-form :model="editForm" ref="editForm">
                    <el-form-item>
                        <h2>文章标题</h2>
                        <el-input v-model="editForm.name"></el-input>
                        <h2 style="padding:40px 0 0 0">配图</h2>
                    </el-form-item>
                    <div class="mapping">
                        <el-form-item class="icon-el">
                                <input class="upload" @change='mapping' type="file"
                                   style="opacity: 0;width: 148px;height: 148px;z-index:222;"/>
                                <div class="icon-plus-container" style="">
                                    <i class="el-icon-plus"></i>
                                </div>
                                <div class="img-wrap" v-if="uploadIconUrl!=''">
                                    <img :src="'https://imapp-image.oss-cn-hangzhou.aliyuncs.com/'+uploadIconUrl"
                                        class="border-radius" style="width: 146px;height: 146px;"/>
                                </div>   
                                <!-- <button>确定</button> -->
                                <el-button type="primary" class="but">确定</el-button>
                        </el-form-item>
                    </div>
                    <div style="padding-top:10px" >
                        <el-form-item>
                            <h2>快讯内容</h2>
                            <el-input type="textarea" v-model="editForm.desc" rows="5" min="1"></el-input>
                        </el-form-item>
                    </div>
                    <div class="source" style="padding-top:30px">
                        <el-form-item>
                            <span style="font-size:20px">文章来源</span>
                            <el-input v-model="editForm.source" style="width:200px"></el-input>
                            <span style="font-size:12px">如果没有可以为空</span>
                        </el-form-item>
                    </div>
                    <div class="line"></div>
                    <div class="release" style="overflow:hidden">
                        <div class="left">
                            字数123字
                        </div>
                        <div class="right">
                            <el-button>发布</el-button>
                            <el-button>存草稿</el-button>
                        </div>
                    </div>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    export default {
    data() {
      return {
        uploadIconUrl: "",
        editForm:{
            name:"",
            desc:"",
            source:""
        }
      }
    },
    methods:{
        mapping(event){//配图    
            console.log(event)    
        }
    }
  }
</script>
<style lang="less" socped>
@import "../style/mixin";
    .form {
        min-width: 400px;
        margin-bottom: 30px;
        &:hover {
            box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6),
            0 2px 4px 0 rgba(232, 237, 250, 0.5);
            border-radius: 6px;
            transition: all 400ms;
        }
    }

    .border-radius {
        border-radius: 6px;
        height: auto;
        width: 148px
    }

    .img-wrap {
        width: 148px;
        height: 148px;
    }

    .form_header {
        text-align: center;
        margin-bottom: 10px;
    }

    .category_select {
        border: 1px solid #eaeefb;
        padding: 10px 30px 10px 10px;
        border-top-right-radius: 6px;
        border-top-left-radius: 6px;
    }

    .add_category_row {
        height: 0;
        overflow: hidden;
        transition: all 400ms;
        background: #f9fafc;
    }

    .showEdit {
        height: 185px;
    }

    .add_category {
        background: #f9fafc;
        padding: 10px 30px 0px 10px;
        border: 1px solid #eaeefb;
        border-top: none;
    }

    .icon-plus-container {
        display: flex;
        justify-content: center;
        align-items: center
    }

    .add_category_button {
        text-align: center;
        line-height: 40px;
        border-bottom-right-radius: 6px;
        border-bottom-left-radius: 6px;
        border: 1px solid #eaeefb;
        border-top: none;
        transition: all 400ms;
        &:hover {
            background: #f9fafc;
            span,
            .edit_icon {
                color: #20a0ff;
            }
        }
        span {
            .sc(14px, #999);
            transition: all 400ms;
        }
        .edit_icon {
            color: #ccc;
            transition: all 400ms;
        }
    }

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #20a0ff;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 120px;
        height: 120px;
        line-height: 120px;
        text-align: center;
    }

    .avatar {
        width: 120px;
        height: 120px;
        display: block;
    }

    .cell {
        text-align: center;
    }

    .icon-el {
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
            vertical-align: top;
            position: absolute;
        }
    }
    .but{
        display: block;
        width:200px;
        height:40px;
        margin: 108px 0 0 40px
    }
    .line{
        margin-top:100px;
        width:100%;
        border-top:1px solid #000;
    }
    .release{
        margin-top:10px;
        div{
            line-height: 40px
        }
        .left{
            margin-left:10px
        }
        .right{
            margin-right:10px
        }
    }

</style>
