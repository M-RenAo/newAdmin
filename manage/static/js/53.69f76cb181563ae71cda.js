webpackJsonp([53],{270:function(t,e,a){a(879);var o=a(58)(a(720),a(999),"data-v-0c6ad238",null);t.exports=o.exports},315:function(t,e,a){"use strict";a.d(e,"b",function(){return o}),a.d(e,"a",function(){return i});var o="",i=void 0;o="//elm.cangdu.org",i="//elm.cangdu.org/img/"},439:function(t,e,a){a(442);var o=a(58)(a(440),a(443),"data-v-771ef16e",null);t.exports=o.exports},440:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=a(110),i=a.n(o),l=a(109),n=a.n(l),r=a(59),s=a.n(r),d=a(108),c=(a.n(d),a(315)),u=a(111);e.default={data:function(){return{baseImgPath:c.a}},created:function(){},computed:s()({},a.i(u.b)(["adminInfo"])),methods:{handleCommand:function(t){var e=this;return n()(i.a.mark(function a(){return i.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:"home"==t?e.$router.push("/manage"):"singout"==t&&(sessionStorage.removeItem("token"),e.$router.push("/"));case 1:case"end":return a.stop()}},a,e)}))()}}}},441:function(t,e,a){e=t.exports=a(241)(!1),e.push([t.i,".allcover[data-v-771ef16e]{position:absolute;top:0;right:0}.ctt[data-v-771ef16e]{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}.tb[data-v-771ef16e]{position:absolute;top:50%;transform:translateY(-50%)}.lr[data-v-771ef16e]{position:absolute;left:50%;transform:translateX(-50%)}.header_container[data-v-771ef16e]{background-color:#eff2f7;height:60px;display:flex;justify-content:space-between;align-items:center;width:100%}.avator[data-v-771ef16e]{width:36px;height:36px;border-radius:50%;margin-right:37px}.el-dropdown-menu__item[data-v-771ef16e]{text-align:center}",""])},442:function(t,e,a){var o=a(441);"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);a(242)("31846a3f",o,!0)},443:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"header_container"},[a("el-breadcrumb",{staticStyle:{"padding-left":"20px"},attrs:{separator:"/"}},t._l(t.$route.meta,function(e,o){return a("el-breadcrumb-item",{key:o},[t._v(t._s(e))])})),t._v(" "),a("el-dropdown",{attrs:{"menu-align":"start"},on:{command:t.handleCommand}},[a("img",{staticClass:"avator",attrs:{src:t.baseImgPath+t.adminInfo.avatar}}),t._v(" "),a("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[a("el-dropdown-item",{attrs:{command:"home"}},[t._v("首页")]),t._v(" "),a("el-dropdown-item",{attrs:{command:"singout"}},[t._v("退出")])],1)],1)],1)},staticRenderFns:[]}},720:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=a(439),i=(a.n(o),a(315),a(108));a.n(i);e.default={data:function(){return{info:[],url:"",dialogFormVisible:!1,dialogFormVisibleSort:!1,dialogVisible:!1,formLabelWidth:"110px",form:{},multipleSelection:null,sortItemForm:{},deleAppId:[],title:""}},created:function(){this.getData()},components:{},methods:{getData:function(){var t=this;this.$ajax.get(BaseUrl+"ranking/title",{headers:{token:sessionStorage.getItem("token"),device:"android"}}).then(function(e){t.info=e.data.data,t.info.forEach(function(t){if(void 0!=t.rule)switch(t.rule.split(":")[0]){case"add":t.rules="添加时间";break;case"new":t.rules="最新版本发布";break;case"down":t.rules="下载量";break;case"touch":t.rules="点击量"}})})},handleSelectionChange:function(t){this.multipleSelection=t,this.deleAppId=[];for(var e=0;e<this.multipleSelection.length;e++)this.deleAppId.push(this.multipleSelection[e].id)},downloadSort:function(t,e,a){this.dialogFormVisible=!0,this.form.id=t,this.title=e,this.form.sort=a},deleteAll:function(){this.dialogVisible=!0},ensureDelete:function(){var t=this;this.$ajax({method:"POST",url:BaseUrl+"ranking/del/ranktitle",data:this.deleAppId,headers:{token:sessionStorage.getItem("token"),device:"android"}}).then(function(e){console.log(e),500==e.data.flag?t.$alert(e.data.msg,"提示",{confirmButtonText:"确定",callback:function(a){t.$message({type:"info",message:e.data.msg+",请重试"})}}):200==e.data.flag?t.$alert(e.data.msg,"提示",{confirmButtonText:"确定",callback:function(e){t.dialogFormVisibleSort=!1,t.getData()}}):201==e.data.flag&&t.$alert(e.data.msg+"，请重新登录","提示",{confirmButtonText:"确定",callback:function(e){t.$router.push("/")}})}),this.dialogVisible=!1},ensureSort:function(){var t=this;this.form.sort>=1&&this.form.sort<=this.info.length?(this.form.sort=Number(this.form.sort),this.$ajax({method:"POST",url:BaseUrl+"ranking/update/ranktitle",data:this.form,headers:{token:sessionStorage.getItem("token"),device:"android"}}).then(function(e){console.log(e),500==e.data.flag?t.$alert(e.data.msg,"提示",{confirmButtonText:"确定",callback:function(a){t.$message({type:"info",message:"error: "+e.data.msg+",请重试"})}}):200==e.data.flag?t.$alert(e.data.msg,"提示",{confirmButtonText:"确定",callback:function(e){t.dialogFormVisible=!1,t.getData()}}):201==e.data.flag&&t.$alert(e.data.msg+"，请重新登录","提示",{confirmButtonText:"确定",callback:function(e){t.$router.push("/")}})})):this.$alert("请输入1到"+this.info.length+"之间的数字","提示",{confirmButtonText:"确定",callback:function(e){t.dialogFormVisible=!1}})},addDownload:function(){this.sortItemForm={},this.dialogFormVisibleSort=!0},addNewSort:function(){var t=this;console.log(this.sortItemForm.title.length),this.sortItemForm.title.length<2?this.$alert("请输入正确的排行榜名称","提示",{confirmButtonText:"确定",callback:function(e){t.$message({type:"info",message:"error: "+response.data.msg+",请重试"})}}):this.$ajax({method:"POST",url:BaseUrl+"ranking/add/ranktitle",data:this.sortItemForm,headers:{token:sessionStorage.getItem("token"),device:"android"}}).then(function(e){console.log(e),500==e.data.flag?t.$alert(e.data.msg,"提示",{confirmButtonText:"确定",callback:function(a){t.$message({type:"info",message:"error: "+e.data.msg+",请重试"})}}):200==e.data.flag?t.$alert(e.data.msg,"提示",{confirmButtonText:"确定",callback:function(e){t.dialogFormVisibleSort=!1,t.getData()}}):201==e.data.flag&&t.$alert(e.data.msg+"，请重新登录","提示",{confirmButtonText:"确定",callback:function(e){t.$router.push("/")}})})},updateDownload:function(t,e,a,o){this.$router.push({path:"/addDownload",query:{id:t,title:e,rule:a,sort:o,type:"android"}})}}}},774:function(t,e,a){e=t.exports=a(241)(!1),e.push([t.i,".allcover[data-v-0c6ad238]{position:absolute;top:0;right:0}.ctt[data-v-0c6ad238]{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}.tb[data-v-0c6ad238]{position:absolute;top:50%;transform:translateY(-50%)}.lr[data-v-0c6ad238]{position:absolute;left:50%;transform:translateX(-50%)}.demo-table-expand[data-v-0c6ad238]{font-size:0}.demo-table-expand label[data-v-0c6ad238]{width:90px;color:#99a9bf}.demo-table-expand .el-form-item[data-v-0c6ad238]{margin-right:0;margin-bottom:0;width:50%}.table_container[data-v-0c6ad238]{padding:20px}.Pagination[data-v-0c6ad238]{display:flex;justify-content:flex-start;margin-top:8px}.avatar-uploader .el-upload[data-v-0c6ad238]{border:1px dashed #d9d9d9;border-radius:6px;cursor:pointer;position:relative;overflow:hidden}.avatar-uploader .el-upload[data-v-0c6ad238]:hover{border-color:#20a0ff}.avatar-uploader-icon[data-v-0c6ad238]{font-size:28px;color:#8c939d;width:120px;height:120px;line-height:120px;text-align:center}.avatar[data-v-0c6ad238]{width:120px;height:120px;display:block}.cell[data-v-0c6ad238]{overflow:hidden;text-overflow:ellipsis;word-break:break-all;white-space:nowrap!important}.littleButton[data-v-0c6ad238]{padding:5px 10px!important;margin-left:0!important}",""])},879:function(t,e,a){var o=a(774);"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);a(242)("0628fc74",o,!0)},999:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"fillcontain"},[a("div",{staticClass:"table_container"},[a("div",{staticStyle:{display:"flex","margin-bottom":"30px"}},[a("el-button",{attrs:{type:"primary",disabled:null==t.multipleSelection||0==t.multipleSelection.length},on:{click:function(e){t.deleteAll()}}},[t._v("批量删除")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(e){t.addDownload()}}},[t._v("新增排行榜")])],1),t._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.info},on:{"selection-change":t.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",width:"55"}}),t._v(" "),a("el-table-column",{attrs:{label:"顺序",prop:"sort"}}),t._v(" "),a("el-table-column",{attrs:{label:"排行榜名称",prop:"title"}}),t._v(" "),a("el-table-column",{attrs:{label:"排序标准",prop:"rules"}}),t._v(" "),a("el-table-column",{attrs:{label:"应用数量",prop:"itemNumOfAll"}}),t._v(" "),a("el-table-column",{attrs:{label:"操作",width:"200"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{staticClass:"littleButton",on:{click:function(a){t.updateDownload(e.row.id,e.row.title,e.row.rule,e.row.sort)}}},[t._v("编辑\n                    ")]),t._v(" "),a("el-button",{staticClass:"littleButton",on:{click:function(a){t.downloadSort(e.row.id,e.row.title,e.row.sort)}}},[t._v("设置顺序\n                    ")])]}}])})],1)],1),t._v(" "),a("el-dialog",{attrs:{title:"",visible:t.dialogFormVisible},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[a("el-form",{attrs:{model:t.form}},[a("el-form-item",{attrs:{label:"排行榜名称："}},[t._v(t._s(t.title))]),t._v(" "),a("el-form-item",{attrs:{label:"顺序：","label-width":t.formLabelWidth}},[a("el-input",{attrs:{autocomplete:"off",type:"number",min:"1",max:t.info.length},model:{value:t.form.sort,callback:function(e){t.$set(t.form,"sort",e)},expression:"form.sort"}})],1)],1),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer",align:"center"},slot:"footer"},[a("el-button",{attrs:{type:"primary"},on:{click:function(e){t.ensureSort()}}},[t._v("确 定")])],1)],1),t._v(" "),a("el-dialog",{attrs:{title:"",visible:t.dialogFormVisibleSort,align:"center"},on:{"update:visible":function(e){t.dialogFormVisibleSort=e}}},[a("el-form",{attrs:{model:t.sortItemForm}},[a("el-form-item",{attrs:{label:"排行榜名称：","label-width":t.formLabelWidth}},[a("el-input",{attrs:{autocomplete:"off",maxlength:"6",onkeyup:"this.value=this.value.replace(/^ +| +$/g,'')",placeholder:"最多输入六位"},model:{value:t.sortItemForm.title,callback:function(e){t.$set(t.sortItemForm,"title",e)},expression:"sortItemForm.title"}})],1)],1),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer",align:"center"},slot:"footer"},[a("el-button",{attrs:{type:"primary",disabled:void 0===t.sortItemForm.title||""===t.sortItemForm.title},on:{click:function(e){t.addNewSort()}}},[t._v("确 定")])],1)],1),t._v(" "),a("el-dialog",{attrs:{title:"提示",visible:t.dialogVisible,width:"30%"},on:{"update:visible":function(e){t.dialogVisible=e}}},[a("span",[t._v("确认删除此排行榜？")]),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.dialogVisible=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(e){t.ensureDelete()}}},[t._v("确 定")])],1)])],1)},staticRenderFns:[]}}});