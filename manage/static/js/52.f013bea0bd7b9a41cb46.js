webpackJsonp([52],{271:function(t,e,a){a(877);var o=a(58)(a(721),a(996),null,null);t.exports=o.exports},315:function(t,e,a){"use strict";a.d(e,"b",function(){return o}),a.d(e,"a",function(){return n});var o="",n=void 0;o="//elm.cangdu.org",n="//elm.cangdu.org/img/"},439:function(t,e,a){a(442);var o=a(58)(a(440),a(443),"data-v-771ef16e",null);t.exports=o.exports},440:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=a(110),n=a.n(o),r=a(109),s=a.n(r),i=a(59),l=a.n(i),p=a(108),c=(a.n(p),a(315)),d=a(111);e.default={data:function(){return{baseImgPath:c.a}},created:function(){},computed:l()({},a.i(d.b)(["adminInfo"])),methods:{handleCommand:function(t){var e=this;return s()(n.a.mark(function a(){return n.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:"home"==t?e.$router.push("/manage"):"singout"==t&&(sessionStorage.removeItem("token"),e.$router.push("/"));case 1:case"end":return a.stop()}},a,e)}))()}}}},441:function(t,e,a){e=t.exports=a(241)(!1),e.push([t.i,".allcover[data-v-771ef16e]{position:absolute;top:0;right:0}.ctt[data-v-771ef16e]{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}.tb[data-v-771ef16e]{position:absolute;top:50%;transform:translateY(-50%)}.lr[data-v-771ef16e]{position:absolute;left:50%;transform:translateX(-50%)}.header_container[data-v-771ef16e]{background-color:#eff2f7;height:60px;display:flex;justify-content:space-between;align-items:center;width:100%}.avator[data-v-771ef16e]{width:36px;height:36px;border-radius:50%;margin-right:37px}.el-dropdown-menu__item[data-v-771ef16e]{text-align:center}",""])},442:function(t,e,a){var o=a(441);"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);a(242)("31846a3f",o,!0)},443:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"header_container"},[a("el-breadcrumb",{staticStyle:{"padding-left":"20px"},attrs:{separator:"/"}},t._l(t.$route.meta,function(e,o){return a("el-breadcrumb-item",{key:o},[t._v(t._s(e))])})),t._v(" "),a("el-dropdown",{attrs:{"menu-align":"start"},on:{command:t.handleCommand}},[a("img",{staticClass:"avator",attrs:{src:t.baseImgPath+t.adminInfo.avatar}}),t._v(" "),a("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[a("el-dropdown-item",{attrs:{command:"home"}},[t._v("首页")]),t._v(" "),a("el-dropdown-item",{attrs:{command:"singout"}},[t._v("退出")])],1)],1)],1)},staticRenderFns:[]}},721:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=a(439),n=a.n(o),r=a(108);a.n(r),a(315),a(1);e.default={data:function(){return{tagList:[],appForm:{fileTag:"",fileState:""},typeList:[],positionList:[]}},components:{headTop:n.a},created:function(){this.getData(),this.positionList=JSON.parse(sessionStorage.getItem("positionList")),console.log(this.positionList)},computed:{},methods:{getData:function(){var t=this;this.$ajax.get(BaseUrl+"apply/appmsg/"+this.$route.query.id,{headers:{token:sessionStorage.getItem("token")}}).then(function(e){t.appForm=e.data.data}),this.$ajax.get(BaseUrl+"apptag",{headers:{token:sessionStorage.getItem("token")}}).then(function(e){console.log(e),t.tagList=e.data.data,t.typeList=[{code:"1",id:"1",title:"上架"},{code:"0",id:"0",title:"下架"}]})},submitForm:function(t){var e=this;console.log(t),this.$ajax({method:"POST",url:BaseUrl+"apply/update",data:t,headers:{token:sessionStorage.getItem("token")}}).then(function(t){console.log(t),500==t.data.flag?e.$alert(t.data.msg,"提示",{confirmButtonText:"确定",callback:function(a){e.$message({type:"info",message:"error: "+t.data.msg+",请重试"})}}):200==t.data.flag&&e.$alert(t.data.msg,"提示",{confirmButtonText:"确定",callback:function(t){e.$router.push({path:"/applicationList"})}})})}}}},772:function(t,e,a){e=t.exports=a(241)(!1),e.push([t.i,".allcover{position:absolute;top:0;right:0}.ctt{left:50%;transform:translate(-50%,-50%)}.ctt,.tb{position:absolute;top:50%}.tb{transform:translateY(-50%)}.lr{position:absolute;left:50%;transform:translateX(-50%)}\n/*!*border:10px solid #fff;*!*/\n/*!*transform:translate(10px,-50%);*!*/",""])},877:function(t,e,a){var o=a(772);"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);a(242)("0e18d214",o,!0)},996:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("el-row",{staticStyle:{"margin-top":"20px"}},[a("el-col",{attrs:{span:14,offset:4}},[a("el-form",{ref:"appForm",staticClass:"form food_form",attrs:{model:t.appForm,"label-width":"110px"}},[a("el-form-item",{attrs:{label:"应用标签",prop:"name"}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:t.appForm.fileTag,callback:function(e){t.$set(t.appForm,"fileTag",e)},expression:"appForm.fileTag"}},t._l(t.tagList,function(t){return a("el-option",{key:t.code,attrs:{label:t.title,value:t.code}})}))],1),t._v(" "),a("el-form-item",{attrs:{label:"应用展示位",prop:"name"}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:t.appForm.fileDisplayPosition,callback:function(e){t.$set(t.appForm,"fileDisplayPosition",e)},expression:"appForm.fileDisplayPosition"}},t._l(t.positionList,function(t){return a("el-option",{key:t.code,attrs:{label:t.title,value:t.code}})}))],1),t._v(" "),a("el-form-item",{attrs:{label:"应用状态",prop:"name"}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:t.appForm.fileState,callback:function(e){t.$set(t.appForm,"fileState",e)},expression:"appForm.fileState"}},t._l(t.typeList,function(t){return a("el-option",{key:t.code,attrs:{label:t.title,value:t.code}})}))],1),t._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:function(e){t.submitForm(t.appForm)}}},[t._v("提交")])],1)],1)],1)],1)],1)},staticRenderFns:[]}}});