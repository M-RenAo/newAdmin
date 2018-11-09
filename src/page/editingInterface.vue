<template>
    <div>
        <el-row style="margin-top: 20px;">
            <el-col :span="14" :offset="4">
                <el-form :model="editdata" ref="editdata" label-width="110px" class="form food_form">
                    <el-form-item label="文章标题" prop="title">
                        <el-input v-model="editdata.title"></el-input>
                    </el-form-item>
                    <el-form-item label="配图" prop="mapping" class="icon-el">
                        <input class="upload" @change='mapping' type="file" style="opacity: 0;width: 148px;height: 148px;z-index:222;"/>
                                <div class="icon-plus-container">
                                    <i class="el-icon-plus"></i>
                                </div>
                                <div class="img-wrap" v-if="uploadIconUrl!=''">
                                    <img :src="'https://imapp-image.oss-cn-hangzhou.aliyuncs.com/'+uploadIconUrl"
                                        class="border-radius" style="width: 146px;height: 146px;"/>
                                </div>
                    </el-form-item>
                    <el-form-item label="快讯内容" prop="content">
                        <el-input
                            type="textarea"
                            rows="5"
                            v-model="editdata.content">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="文章来源" prop="source">
                        <el-input v-model="editdata.source" style="width:200px"></el-input>
                        <span style="font-size:12px;color:#666">如果没有可以为空</span>
                    </el-form-item>
                    <el-form-item label="热讯推荐" prop="recommend">
                        <div class="radio">
                                <el-radio v-model="radio" label="1">是</el-radio><el-radio v-model="radio" label="0">否</el-radio>
                            </div>
                            <div class="radio">
                                <el-select v-model="selectvalue" @change="selectdate" :disabled="radio==1?false:true">
                                    <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                            <span style="font-size:12px;color:#666">热讯只有发布状态下生效</span>
                    </el-form-item>
                    <div class="line"></div>
                    <el-form-item>
                        <div class="release clear:after" >
                            <div class="left">
                                字数123字
                            </div>
                            <div class="right">
                                <el-button @click="submit">发布</el-button>
                                <el-button>存草稿</el-button>
                            </div>
                        </div>
                    </el-form-item>
                </el-form>

            </el-col>
        </el-row>
    </div>

</template>

<script>
    export default {
        data() {
            return {
                uploadIconUrl:"",
                editdata:{
                    title:"",
                    mapping:"",
                    content:"",
                    source:"",
                },
                selectvalue:"当天",//实名状态
                    options: [{
                    value: '选项1',
                    label: '当天'
                    }, {
                    value: '选项2',
                    label: '三天'
                    }, {
                    value: '选项3',
                    label: '无限制'
                }],
                radio:"1",//单选按钮
            };
        },

        created() {
        },
        computed: {},
        methods: {
            mapping(){

            },
            selectdate(a,b,c){//select选择器选择时间
                console.log(a,b,c)
            },
            submit(a,b,c){//提交表单
                console.log(a,b,c)
                console.log(1)
            }
            
        },

    };
</script>

<style lang="less">
    @import "../style/mixin";
    @import "../style/common.less";

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

    .icon-els {
        position: relative;
        line-height: 0 !important;
        .el-form-item__content {
            display: flex;
            line-height: 0 !important;
        }
        .addImage {
            background-color: #fbfdff;
            border: 1px dashed #c0ccda;
            border-radius: 6px;
            box-sizing: border-box;
            width: 148px;
            height: 148px;
            cursor: pointer;
            line-height: 146px;
            vertical-align: top;

            .img-wrap {
                position: absolute;
            }
        }
    }

    .imgMask {
        position: absolute;
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        z-index: 10000;
        background: rgba(0, 0, 0, .6);
    }

    .showImg {
        height: auto;
        width: 500px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        /*border:10px solid #fff;*/
        text-align: center;
    }

    .bigImg {
        width: 500px;
        height: auto;
    }

    .prev {
        position: absolute;
        top: 50%;
        left: 10px;
        width: 40px;
        height: 40px;
        color: #fff;
        transform: translate(10px, -50%);
    }

    .next {
        width: 40px;
        transform: translate(10px, -50%);
        position: absolute;
        top: 50%;
        right: 20px;
        height: 40px;
        color: #fff;
    }

    .delete {
        position: absolute;
        top: 0;
        right: 0px;
        width: 40px;
        height: 40px;
        color: #8c939d;
        text-align: center;
        font-size: 18px;
        /*transform:translate(10px,-50%);*/
    }
    .radio{
        display: inline-block;
        padding: 0 10px 0 10px
    }
    .line{
        margin-top:100px;
        width:100%;
        border-top:1px solid #000;
    }
    .release{
        margin-top:10px;
        padding:10px 0 20px 0;
        width:100%;
        div{
            line-height: 40px
        }
        .left{
            margin-left:-90px
        }
        .right{
            margin-right:10px
        }
    }
</style>
