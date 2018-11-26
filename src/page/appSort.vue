<template>
    <div class="fillcontain">
        <div class="table_container">
            <!--<div style="display:flex;justify-content:flex-end;margin-bottom: 30px;">-->
            <!--&lt;!&ndash;<el-select v-model="value" placeholder="请选择">&ndash;&gt;-->
            <!--&lt;!&ndash;<el-option&ndash;&gt;-->
            <!--&lt;!&ndash;v-for="item in tagList"&ndash;&gt;-->
            <!--&lt;!&ndash;:key="item.code"&ndash;&gt;-->
            <!--&lt;!&ndash;:label="item.title"&ndash;&gt;-->
            <!--&lt;!&ndash;:value="item.code">&ndash;&gt;-->
            <!--&lt;!&ndash;</el-option>&ndash;&gt;-->
            <!--&lt;!&ndash;</el-select>&ndash;&gt;-->
            <!--&lt;!&ndash;<el-button @click="automaticSort" type="primary" style="margin-right:20px">自动整理</el-button>&ndash;&gt;-->
            <!--<div style="">-->
            <!--<el-input placeholder="请输入应用名" v-model="appName" class="input-with-select">-->
            <!--<el-button slot="append" icon="el-icon-search" @click="searchAppSort(appName)"></el-button>-->
            <!--</el-input>-->
            <!--</div>-->
            <!--</div>-->
            <el-form :model="moduleForm" ref="moduleForm" label-width="110px" class="form food_form">
                <div v-if="moduleForm.itemType!='item-promote:advertise'">
                    <!--<el-form-item label="标题类型" :label-width="formLabelWidth" prop="titleStyle">-->
                    <!--<el-select v-model="moduleForm.titleStyle" placeholder="请选择标题类型"  style="width:200px">-->
                    <!--<el-option label="图标" value="image">图标</el-option>-->
                    <!--<el-option label="文字" value="text">文字</el-option>-->
                    <!--</el-select>-->
                    <!--&lt;!&ndash;</el-form-item>&ndash;&gt;v-if="moduleForm.titleStyle=='text'"-->
                    <el-form-item label="模块标题" :label-width="formLabelWidth" prop="title">
                        <el-input v-model="moduleForm.title" auto-complete="off" style="width:200px"></el-input>
                    </el-form-item>
                    <!--<el-form-item label="标题说明" :label-width="formLabelWidth" prop="title" v-if="moduleForm.titleStyle=='image'">-->
                    <!--<el-input v-model="moduleForm.title" auto-complete="off" style="width:200px"></el-input>-->
                    <!--</el-form-item>-->
                    <!--<el-form-item label="分类图标" :label-width="formLabelWidth" prop="titleText" v-if="moduleForm.titleStyle=='image'" class="icon-trumpet-el">-->
                    <!--<input class="upload" @change='add_img' type="file"-->
                    <!--style="opacity: 0;width: 148px;height: 148px;z-index:222;vertical-align: top;position: absolute">-->
                    <!--<div class="icon-plus-container"-->
                    <!--style="display: flex;justify-content: center;align-items: center;">-->
                    <!--<i class="el-icon-plus"></i>-->
                    <!--</div>-->
                    <!--<div class="img-wrap" v-if="uploadIconUrl!=''">-->
                    <!--<img :src="'https://imapp-image.oss-cn-hangzhou.aliyuncs.com/'+uploadIconUrl"-->
                    <!--class="border-radius" style="width: 146px;height: 146px;"/>-->
                    <!--</div>-->
                    <!--</el-form-item>-->
                    <!--<el-form-item label="展示风格" :label-width="formLabelWidth" prop="showStyle">-->
                    <!--<el-select v-model="moduleForm.showStyle" placeholder="请选择展示风格"  style="width:200px">-->
                    <!--<el-option label="横向" key="0" value="0"></el-option>-->
                    <!--<el-option label="竖向" key="1" value="1"></el-option>-->
                    <!--</el-select>-->
                    <!--</el-form-item>-->
                    <el-form-item label="列表类型" :label-width="formLabelWidth" prop="itemType">
                        <el-select v-model="moduleForm.itemType" placeholder="请选择列表类型" style="width:200px">
                            <el-option label="固定" value="item-app:fixationList">固定</el-option>
                            <el-option label="竖向" value="item-app:verticalList">竖向</el-option>
                            <el-option label="滑动" value="item-app:horizontalList">滑动</el-option>
                        </el-select>
                    </el-form-item>
                    <!--<el-form-item label="排序" :label-width="formLabelWidth" prop="sort">-->
                    <!--<el-input v-model="form.sort" auto-complete="off" style="width:80%"></el-input>-->
                    <!--</el-form-item>-->
                    <el-form-item label="首页显示APP个数" :label-width="formLabelWidth" prop="itemNum">
                        <el-input v-model="moduleForm.itemNum" auto-complete="off" style="width:200px"></el-input>
                    </el-form-item>
                    <el-form-item label="状态" :label-width="formLabelWidth" prop="state">
                        <el-select v-model="moduleForm.state" placeholder="请选择展示状态" style="width:200px">
                            <el-option label="关闭" value="0">关闭</el-option>
                            <el-option label="开放" value="1">开放</el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div v-else>
                    <el-form-item label="样式" :label-width="formLabelWidth" prop="itemType">
                      广告
                    </el-form-item>
                    <el-form-item label="地址" :label-width="formLabelWidth"  v-if="moduleForm.itemType=='item-promote:advertise'">
                        <el-input v-model="address" auto-complete="off" style="width:80%"></el-input>
                    </el-form-item>
                    <el-form-item label="推广图" :label-width="formLabelWidth"  v-if="moduleForm.itemType=='item-promote:advertise'">
                        <div style="display: flex;align-items:flex-end;">
                            <div style="width:150px;height:70px;border: 1px #999 solid;margin-right: 10px"><img :src="'https://imapp-image.oss-cn-hangzhou.aliyuncs.com/'+advertisePic" v-if="advertisePic!==null&&advertisePic!=''" style="width:100%;height:100%;"/></div>
                            <el-button type="primary" v-if="advertisePic===null" style="position: relative"><span>上传</span>  <input @change='add_img' type="file" style="opacity: 0;width:70px;height: 40px;position: absolute;top:0;left:0"></el-button>
                            <el-button type="primary" v-if="advertisePic!==null" @click="advertisePic=null">删除</el-button>
                        </div>
                    </el-form-item>
                    <el-form-item label="备注" :label-width="formLabelWidth"   v-if="form.itemType=='item-promote:advertise'">
                        <el-input v-model="remarks" auto-complete="off" style="width:80%"></el-input>
                    </el-form-item>
                    <el-form-item label="状态" :label-width="formLabelWidth" prop="state">
                        <el-select v-model="moduleForm.state" placeholder="请选择展示状态">
                            <el-option label="关闭" value="0">关闭</el-option>
                            <el-option label="开放" value="1">开放</el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div v-if="moduleForm.itemType!='item-promote:advertise'">
                    <div style="margin-bottom: 10px">
                        <el-button type="primary" @click="deleteAll()"
                                   v-bind:disabled="multipleSelection==null||multipleSelection.length==0"
                                   style="margin-right:25px;">批量删除
                        </el-button>
                        <el-select v-model="fileMoudle" placeholder="请选择" @change="searchAppByTagCode"
                                   style="width:200px">
                            <el-option label="全部" value="-1"></el-option>
                            <el-option
                                v-for="(item,index) in tagList"
                                :label="item.title"
                                :value="item.code"
                                :key="index">
                            </el-option>
                            <el-option label="未定义" value="0"></el-option>
                        </el-select>
                        <el-input placeholder="请输入应用名" class="input-with-select" v-model="searchInfo"
                                  style="width:200px;margin-left:10px" @keyup.enter.native="searchApp(searchInfo)">
                            <el-button slot="append" @click="searchApp(searchInfo)"><i class="el-icon-search"></i>
                            </el-button>
                        </el-input>
                        <el-button type="primary" @click="addApptohere()" style="margin-left: 10px">添加应用</el-button>
                    </div>
                    <el-table
                        :data="info"
                        @selection-change="handleSelectionChangeMoudle"
                        style="width: 100%" id="appList">
                        <!--<el-table-column-->
                        <!--label="应用图标"-->
                        <!--prop="fileIcon">-->
                        <!--</el-table-column>-->
                        <el-table-column
                            type="selection"
                            width="55">
                        </el-table-column>
                        <el-table-column
                            label="顺序"
                            prop="sort" min-width="50">
                        </el-table-column>
                        <el-table-column label="logo" prop="fileIcon" min-width="50">
                            <template scope="scope">
                                <img :src="'https://imapp-image.oss-cn-hangzhou.aliyuncs.com/'+scope.row.fileIcon"
                                     style="width:30px;height:30px;">
                            </template>

                        </el-table-column>
                        <el-table-column
                            label="名称"
                            min-width="50">
                            <template scope="scope">
                                <div>{{scope.row.appName}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="大小"
                            prop="fileSize"
                            min-width="50">
                        </el-table-column>
                        <el-table-column
                            label="版本"
                            prop="fileVersion" min-width="50">
                        </el-table-column>
                        <el-table-column
                            label="分类"
                            prop="fileTag" min-width="50">
                        </el-table-column>
                        <el-table-column
                            label="最新版本发布"
                            prop="fileVersion" min-width="50">
                        </el-table-column>
                        <el-table-column
                            label="下载量"
                            prop="fileDownNums" min-width="50">
                        </el-table-column>
                        <el-table-column
                            label="点击量"
                            prop="touchNum" min-width="50">
                        </el-table-column>

                        <!--<el-table-column-->
                        <!--label="最新上传时间"-->
                        <!--prop="fileDate" min-width="50">-->
                        <!--</el-table-column>-->

                        <el-table-column label="操作" min-width="80">
                            <template scope="scope">
                                <el-button class="littleButton" @click="update(scope.row.fileId,scope.row.sort)"
                                           key="edit">更改排序
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="Pagination">
                        <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page.sync="currentPage"
                            :page-size.sync="nowPageSize"
                            :page-sizes="[5, 10, 20, 40]"
                            :total="txcount"
                            layout="total, sizes, prev, pager, next, jumper"
                        >
                        </el-pagination>
                    </div>
                </div>
                <div style="margin-top:30px">
                    <el-button type="primary" @click="saveUpdateDown()">保存</el-button>
                </div>
            </el-form>
            <el-dialog :visible.sync="dialogTableVisible" min-width="600px" :close-on-click-modal=false>
                <div>
                    <el-select v-model="fileMoudleUnchoice" placeholder="请选择" @change="searchUnchoiceAppByTag">
                        <el-option label="全部" value="-1"></el-option>
                        <el-option
                            v-for="item in tagList"
                            :key="item.code"
                            :label="item.title"
                            :value="item.code">
                        </el-option>
                        <el-option key="0" label="未定义" value="0">
                        </el-option>
                    </el-select>
                    <el-input placeholder="请输入应用名" class="input-with-select" v-model="unchoiceAppName"
                              style="width:200px;margin-left:10px"  @keyup.enter.native="searchUnchoiceApp(unchoiceAppName)">
                        <el-button slot="append" @click="searchUnchoiceApp(unchoiceAppName)"><i
                            class="el-icon-search"></i></el-button>
                    </el-input>
                </div>
                <el-table
                    :data="unChoiceAppList"
                    @selection-change="handleSelectionChangeApp"
                    style="width: 100%">
                    <el-table-column
                        type="selection"
                        width="55">
                    </el-table-column>
                    <el-table-column label="logo" prop="fileIcon" min-width="50">
                        <template scope="scope">
                            <img :src="'https://imapp-image.oss-cn-hangzhou.aliyuncs.com/'+scope.row.fileIcon"
                                 style="width:30px;height:30px;">
                        </template>

                    </el-table-column>
                    <el-table-column
                        label="名称"
                        prop="appName"
                        min-width="50">
                    </el-table-column>
                    <el-table-column
                        label="大小"
                        prop="fileSize" min-width="50">
                    </el-table-column>
                    <el-table-column
                        label="版本"
                        prop="fileVersion" min-width="50">
                    </el-table-column>
                    <el-table-column
                        label="最新版本发布"
                        prop="fileDate" min-width="50">
                    </el-table-column>
                    <el-table-column
                        label="分类"
                        prop="fileTag" min-width="50">
                    </el-table-column>
                    <el-table-column
                        label="下载量"
                        prop="fileDownNums" min-width="50">
                    </el-table-column>
                    <el-table-column
                        label="点击量"
                        prop="touchNum" min-width="50">
                    </el-table-column>
                </el-table>
                <el-button type="primary" @click="saveApp()" style="margin-top: 10px"
                           v-bind:disabled="addAppToMoudle.length==0">保存
                </el-button>
            </el-dialog>
            <el-dialog title="" :visible.sync="dialogFormVisible">
                <el-form :model="form" ref="form">
                    <el-form-item label="排序" :label-width="formLabelWidth" prop="sort">
                        <el-input v-model="form.sort" auto-complete="off" style="width:80%" type="number"
                                  min="1"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false;">取 消</el-button>
                    <el-button type="primary" @click="ensureUpdate">确 定</el-button>
                </div>
            </el-dialog>
            <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="30%"
            >
                <span>确认删除选中的应用吗？</span>
                <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="ensureDelete()">确 定</el-button>
            </span>
            </el-dialog>
            <!--<div class="Pagination">-->
            <!--<el-pagination-->
            <!--@size-change="handleSizeChange"-->
            <!--@current-change="handleCurrentChange"-->
            <!--:current-page="currentPage"-->
            <!--:page-size="nowPageSize"-->
            <!--:page-sizes="[5, 10, 20, 40]"-->
            <!--:total="txcount"-->
            <!--layout="total, sizes, prev, pager, next, jumper"-->
            <!--&gt;-->
            <!--</el-pagination>-->
            <!--</div>-->
        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {adminList, adminCount} from '@/api/getData'

    let moment = require('moment')
    export default {
        data() {
            return {
                info: [],
                advertisePic:null,
                txcount: 0,
                totalfees: 0,
                currentPage: 1,
                nowPageSize: 10,
                form: {},
                dialogFormVisible: false,
                dialogTableVisible: false,
                dialogVisible: false,
                deleteId: '',
                tagList: [],
                uploadIconUrl: '',
                applyId: '',
                value: '',
                address:'',
                formLabelWidth: '130px',
                appName: '',
                moduleForm: {state:'',itemType:''},
                positionList: [],
                searchInfo: '',
                fileMoudle: '-1',
                fileMoudleUnchoice: '-1',
                multipleSelection: [],
                deleAppId: [],
                multipleSelectionUnchoiceToMoudle: [],
                addAppToMoudle: [],
                unchoiceAppName: '',
                imgData: {
                    accept: "image/gif, image/jpeg, image/png, image/jpg,image/webp"
                },
                unChoiceAppList: []
            }
        },
        components: {
            headTop,
        },
        created() {
            this.$ajax.get(BaseUrl + "apptag/all", {
                headers: {
                    'token': sessionStorage.getItem('token'),
                    'device': this.$route.query.type
                }
            }).then(response => {
                if (response.data.flag == 200) {
                    this.tagList = response.data.data;
                } else if (response.data.flag == 201) {
                    this.$alert(response.data.msg + '，请重新登录', '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$router.push('/')
                        }
                    });
                }

            });
            this.$ajax.get(BaseUrl + "position/title", {
                headers: {
                    'token': sessionStorage.getItem('token'),
                    'device': this.$route.query.type
                }
            }).then(response => {
                if (response.data.flag == 200) {
                    this.positionList = response.data.data;
                    // this.positionList.forEach(item => {
                    //     if (item.showStyle == 0) {
                    //         item.show='横向'
                    //     }else{
                    //         item.show='竖向'
                    //     }
                    // });
                    // this.positionList.forEach(item => {
                    //     if (item.state == 0) {
                    //         item.status = '关闭'
                    //     } else {
                    //         item.status = '开放'
                    //     }
                    // });
                    this.positionList.forEach(item => {
                        if (item.id == this.$route.query.id) {
                            // this.moduleForm.titleStyle=item.titleStyle;
                            this.moduleForm.title = item.title;
                            // if(item.titleText!=undefined){
                            //     this.moduleForm.titleText=item.titleText
                            //     this.uploadIconUrl=this.moduleForm.titleText
                            // }
                            // this.moduleForm.showStyle=item.showStyle;
                            this.moduleForm.state = item.state;
                            this.moduleForm.itemType = item.itemType;
                            this.moduleForm.id = this.$route.query.id;
                            if( this.moduleForm.itemType=='item-promote:advertise'){
                               this.address=JSON.parse(item.linkText).url;
                               this.advertisePic=JSON.parse(item.linkText).img
                            }
                            this.moduleForm.code = item.code;
                            this.moduleForm.sort = item.sort;
                            this.moduleForm.itemNum = item.itemNum
                        }
                    });
                } else if (response.data.flag == 201) {
                    this.$alert(response.data.msg + '，请重新登录', '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$router.push('/')
                        }
                    });
                }
            });

            this.getData()
        },
        methods: {
            getData() {
                // this.$ajax.get(BaseUrl+'apply/pos/'+this.currentPage+'/'+this.nowPageSize+'/'+this.$route.query.code,{headers:{'token': sessionStorage.getItem('token'),'device':this.$route.query.type}}).then(response => {
                //     console.log(response);
                //     this.info=response.data.data.appList;
                //     this.txcount=response.data.data.fileNum
                // })
                this.$ajax.get(BaseUrl + 'position/mess', {
                    params: {
                        pageCode: this.currentPage,
                        pageSize: this.nowPageSize,
                        posId: this.$route.query.code,
                        tagId: this.fileMoudle == -1 ? null : this.fileMoudle,
                        keyWords: (this.searchInfo != null && this.searchInfo != '') ? this.searchInfo : null
                    },
                    headers: {'token': sessionStorage.getItem('token'), 'device': this.$route.query.type}
                }).then(response => {
                    if (response.data.flag == 200) {
                        this.info = response.data.data.appList
                        this.txcount = response.data.data.fileNum
                        if (this.info.length != 0) {
                            this.info.forEach(item => {
                                if(item.shamFileDownNum!==undefined){
                                    item.fileDownNums=item.fileDownNum+item.shamFileDownNum
                                }else {
                                    item.fileDownNums=item.fileDownNum
                                }
                                item.fileDate = moment.utc(item.fileDate).local().format('YYYY-MM-DD HH:mm:ss')
                            });
                            this.info.forEach((item, index) => {
                                item.index = index + 1 + (this.currentPage - 1) * this.nowPageSize
                            });
                            if (this.$route.query.type == 'android') {
                                this.info.forEach(item => {
                                    item.fileSize = (item.fileSize / 1048576).toFixed(2) + ' M'
                                })
                            } else if (this.$route.query.type == 'ios') {
                                this.info.forEach(item => {
                                    item.fileSize = item.fileSize + ' M'
                                })
                            }
                        } else if (response.data.flag == 201) {
                            this.$alert(response.data.msg + '，请重新登录', '提示', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    this.$router.push('/')
                                }
                            });
                        }
                    }
                    // this.value=this.appForm.fileDisplayPosition.split(',')
                })

            },
            handleCurrentChange(pageValue) {
                this.currentPage = pageValue;
                this.getData()
            },
            handleSizeChange(pageSize) {
                // console.log(">>>>>>pageSize", pageSize);
                this.nowPageSize = pageSize;
                this.getData();
            },
            handleSelectionChangeMoudle(val) {
                this.multipleSelection = val;

                this.deleAppId = [];
                for (let i = 0; i < this.multipleSelection.length; i++) {
                    this.deleAppId.push(this.multipleSelection[i].fileId)
                }
            },
            handleSelectionChangeApp(val) {
                this.multipleSelectionUnchoiceToMoudle = val;
                this.addAppToMoudle = [];
                for (let i = 0; i < this.multipleSelectionUnchoiceToMoudle.length; i++) {
                    this.addAppToMoudle.push(this.multipleSelectionUnchoiceToMoudle[i].fileId)
                }
            },
            deleteAll() {
                this.dialogVisible = true
            },
            add_img(event) {
                let uploadPolicy = null;
                this.$ajax
                    .get(BaseUrl + "alioss/getpolicy", {
                        params: {
                            fileName: event.target.files[0].name,
                            type: "image",
                            callBackType: "app_image",
                        }, headers: {'token': sessionStorage.getItem('token')}
                    })
                    .then(response => {
                        if (response.data.flag==200) {
                            uploadPolicy = response.data.data;
                            this.UploadUrl = response.data.data.host;
                        }else if(response.data.flag==201) {
                            this.$alert(response.data.msg + '请重新登录', '提示', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    this.$router.push('/')
                                }
                            });
                        } else {
                            alert("权限获取失败！");
                            return;
                        }
                        // const deleteArr = ["fileName", "type", "host"];
                        // deleteArr.forEach(item => {
                        //     // 删除掉不需要传的参数
                        //     delete uploadPolicy[item];
                        // });

                        let img1 = event.target.files[0];
                        let type = img1.type; //文件的类型，判断是否是图片
                        let size = img1.size; //文件的大小，判断图片的大小
                        if (this.imgData.accept.indexOf(type) == -1) {
                            alert("请选择我们支持的图片格式！");
                            return false;
                        }
                        const form = new FormData();

                        let paramsObj = {};
                        // for (let key in uploadPolicy) {
                        //   // 需要传的参数 遍历添加到form
                        //  form.append(key, uploadPolicy[key]);
                        // }
                        form.append("key", uploadPolicy["key"]);
                        form.append("OSSAccessKeyId", uploadPolicy["OSSAccessKeyId"]);
                        form.append("expire", uploadPolicy["expire"]);
                        form.append("policy", uploadPolicy["policy"]);
                        form.append("Signature", uploadPolicy["Signature"]);
                        form.append("callback", uploadPolicy["callback"]);
                        form.append("file", img1);
                        form.append('x:user', sessionStorage.getItem('userName'));
                        form.append('x:filename', uploadPolicy['fileName']);
                        form.append('x:type', uploadPolicy['type'])
                        this.$ajax({
                            method: "POST",
                            url: this.UploadUrl,
                            data: form,
                        }).then(response => {
                            this.advertisePic = response.data.data;
                            // this.form.icon = response.data.data;
                        });
                    });
            },
            ensureDelete() {
                this.$ajax({
                    method: "POST",
                    url: BaseUrl + 'position/del/apply/' + this.$route.query.id ,
                    data: this.deleAppId,
                    headers: {'token': sessionStorage.getItem('token'), 'device': this.$route.query.type}
                }).then(response => {
                    if (response.data.flag == 500) {
                        this.$alert(response.data.msg, '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$message({
                                    type: 'info',
                                    message: ` ${ response.data.msg + ',请重试'}`
                                });
                            }
                        });
                    } else if (response.data.flag == 200) {
                        this.$alert(response.data.msg, '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.getData()
                                this.$ajax({
                                    method: "GET",
                                    url:BaseUrl+'apply/auto/sort/'+this.$route.query.code,
                                    headers: {'token': sessionStorage.getItem('token'),'device':this.$route.query.type}
                                }).then(response => {
                                    // console.log(response);
                                    if (response.data.flag == 500) {
                                        this.$alert(response.data.msg, '提示', {
                                            confirmButtonText: '确定',
                                            callback: action => {
                                                this.$message({
                                                    type: 'info',
                                                    message: `${ response.data.msg + ',请重试'}`
                                                });
                                            }
                                        });
                                    } else if (response.data.flag == 200) {
                                        this.dialogFormVisible = false;
                                        this.$alert(response.data.msg, '提示', {
                                            confirmButtonText: '确定',
                                            callback: action=>{
                                                this.getData()
                                            }
                                        });
                                    }else if(response.data.flag==201) {
                                        this.$alert(response.data.msg + '，请重新登录', '提示', {
                                            confirmButtonText: '确定',
                                            callback: action => {
                                                this.$router.push('/')
                                            }
                                        });
                                    }
                                });
                                this.dialogVisible = false
                            }
                        });
                    } else if (response.data.flag == 201) {
                        this.$alert(response.data.msg + '，请重新登录', '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$router.push('/')
                            }
                        });
                    }
                })
            },
            searchAppByTagCode() {
                this.getData()
            },
            searchApp(name) {
                this.getData()
            },
            // searchAppSort(name){
            //
            // },

            update(id, sort) {
                this.dialogFormVisible = true;
                this.applyId = id;
                this.form.sort = sort
            },
            saveUpdateDown() {
                if(this.moduleForm.itemType=='item-promote:advertise'){
                    this.moduleForm.linkText={img:this.advertisePic,url:this.address}
                }
                if (this.moduleForm.itemNum <= 50) {
                    this.$ajax({
                        method: "POST",
                        url: BaseUrl + 'position/update',
                        data: this.moduleForm,
                        headers: {'token': sessionStorage.getItem('token'), 'device': this.$route.query.type}
                    }).then(response => {
                        console.log(response);
                        if (response.data.flag == 500) {
                            this.$alert(response.data.msg, '提示', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    this.$message({
                                        type: 'info',
                                        message: `${ response.data.msg + ',请重试'}`
                                    });
                                }
                            });
                        } else if (response.data.flag == 200) {
                            this.dialogFormVisible = false;
                            this.$alert(response.data.msg, '提示', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    if (this.$route.query.type == 'android') {
                                        this.$router.push('/applicationModule')
                                    } else {
                                        this.$router.push('/iosModule')
                                    }
                                }
                            });
                        } else if (response.data.flag == 201) {
                            this.$alert(response.data.msg + '，请重新登录', '提示', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    this.$router.push('/')
                                }
                            });
                        }
                    });
                } else if (this.moduleForm.itemNum > 50) {
                    this.$alert('首页显示数量不能大于50', '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$message({
                                type: 'info',
                                message: ` ${ response.data.msg + ',请重试'}`
                            });
                        }
                    });
                }
            },
            addApptohere() {
                this.dialogTableVisible = true;
                this.getApp()
            },
            searchUnchoiceAppByTag() {
                this.getApp()
            },
            searchUnchoiceApp(name) {
                this.getApp()
            },
            saveApp() {
                this.$ajax({
                    method: "POST",
                    url: BaseUrl + 'position/add/apply/' + this.$route.query.id,
                    data: this.addAppToMoudle,
                    headers: {'token': sessionStorage.getItem('token'), 'device': this.$route.query.type}
                }).then(response => {
                    console.log(response);
                    if (response.data.flag == 500) {
                        this.$alert(response.data.msg, '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$message({
                                    type: 'info',
                                    message: ` ${ response.data.msg + ',请重试'}`
                                });
                            }
                        });
                    } else if (response.data.flag == 200) {
                        this.$alert(response.data.msg, '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.dialogTableVisible = false
                                this.getData()

                            }
                        });
                    } else if (response.data.flag == 201) {
                        this.$alert(response.data.msg + '，请重新登录', '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$router.push('/')
                            }
                        });
                    }
                });

            },
            ensureUpdate() {
                this.$ajax({
                    method: "POST",
                    url: BaseUrl + 'apply/update/sort/pos',
                    data: {applyId: this.applyId, positionCode: this.$route.query.code, sort: Number(this.form.sort)},
                    headers: {'token': sessionStorage.getItem('token'), 'device': this.$route.query.type}
                }).then(response => {
                    console.log(response);
                    if (response.data.flag == 500) {
                        this.$alert(response.data.msg, '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$message({
                                    type: 'info',
                                    message: `${ response.data.msg + ',请重试'}`
                                });
                            }
                        });
                    } else if (response.data.flag == 200) {
                        this.dialogFormVisible = false;
                        this.$alert(response.data.msg, '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.getData()
                            }
                        });
                    } else if (response.data.flag == 201) {
                        this.$alert(response.data.msg + '，请重新登录', '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$router.push('/')
                            }
                        });
                    }
                });

            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {
                    });
            },
            getApp() {
                this.$ajax
                    .get(`${BaseUrl}apply/all`, {
                        params: {
                            pageCode: 0,
                            pageSize: 0,
                            state: 1,
                            fileState: 1,
                            posId: this.$route.query.code,
                            tagId: this.fileMoudleUnchoice == -1 ? null : this.fileMoudleUnchoice,
                            keyWords: (this.unchoiceAppName != null && this.unchoiceAppName != '') ? this.unchoiceAppName : null
                        },
                        headers: {'token': sessionStorage.getItem('token'), 'device': this.$route.query.type}
                    })
                    .then(response => {
                        // console.log(pageSize)
                        // console.log(pageValue)
                        if (response.data.flag == 200) {
                            var that = this
                            // this.unChoiceAppList = Array.from(new Set([...response.data.data.appList,...this.info]))
                            that.unChoiceAppList = response.data.data.appList
                            this.unChoiceAppList.forEach(item => {
                                if (item.fileState == 1) {
                                    item.appState = "已上架";
                                } else {
                                    item.appState = "未上架";
                                }
                            });
                            this.unChoiceAppList.forEach(item => {
                                item.fileDate = moment.utc(item.fileDate).local().format('YYYY-MM-DD HH:mm:ss')
                            });
                            if(this.$route.query.type=='android') {
                                this.unChoiceAppList.forEach(item => {
                                    item.fileSize = (item.fileSize / 1048576).toFixed(2) + ' M'

                                })
                            }else if(this.$route.query.type=='ios'){
                                this.unChoiceAppList.forEach(item => {
                                    item.fileSize = item.fileSize  + ' M'

                                })
                            }
                        } else if (response.data.flag == 201) {
                            this.$alert(response.data.msg + '，请重新登录', '提示', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    this.$router.push('/')
                                }
                            });
                        }
                    });
            }
        },
    }
</script>

<style lang="less">
    @import '../style/mixin';

    .table_container {
        padding: 20px;
    }
    .littleButton{
        padding:5px 10px!important;
        margin-left: 0!important;
    }
</style>


