webpackJsonp([64],{1002:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("el-row",{staticStyle:{"margin-top":"20px"}},[a("el-col",{attrs:{span:14,offset:4}},[a("el-form",{ref:"adminForm",staticClass:"form food_form",attrs:{model:t.adminForm,rules:t.rules,"label-width":"110px"}},[a("el-form-item",{attrs:{label:"用户名",prop:"adminName"}},[a("el-input",{model:{value:t.adminForm.adminName,callback:function(e){t.$set(t.adminForm,"adminName",e)},expression:"adminForm.adminName"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"密码",prop:"adminPass"}},[a("el-input",{attrs:{type:"password"},model:{value:t.adminForm.adminPass,callback:function(e){t.$set(t.adminForm,"adminPass",e)},expression:"adminForm.adminPass"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"权限",prop:"adminType"}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:t.adminForm.adminType,callback:function(e){t.$set(t.adminForm,"adminType",e)},expression:"adminForm.adminType"}},t._l(t.options,function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}))],1),t._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:function(e){t.addAdmin(t.adminForm)}}},[t._v("确定")])],1)],1)],1)],1)],1)},staticRenderFns:[]}},244:function(t,e,a){a(882);var n=a(58)(a(692),a(1002),null,null);t.exports=n.exports},315:function(t,e,a){"use strict";a.d(e,"b",function(){return n}),a.d(e,"a",function(){return r});var n="",r=void 0;n="//elm.cangdu.org",r="//elm.cangdu.org/img/"},439:function(t,e,a){a(442);var n=a(58)(a(440),a(443),"data-v-771ef16e",null);t.exports=n.exports},440:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a(110),r=a.n(n),o=a(109),s=a.n(o),i=a(59),l=a.n(i),m=a(108),d=(a.n(m),a(315)),u=a(111);e.default={data:function(){return{baseImgPath:d.a}},created:function(){},computed:l()({},a.i(u.b)(["adminInfo"])),methods:{handleCommand:function(t){var e=this;return s()(r.a.mark(function a(){return r.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:"home"==t?e.$router.push("/manage"):"singout"==t&&(sessionStorage.removeItem("token"),e.$router.push("/"));case 1:case"end":return a.stop()}},a,e)}))()}}}},441:function(t,e,a){e=t.exports=a(241)(!1),e.push([t.i,".allcover[data-v-771ef16e]{position:absolute;top:0;right:0}.ctt[data-v-771ef16e]{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}.tb[data-v-771ef16e]{position:absolute;top:50%;transform:translateY(-50%)}.lr[data-v-771ef16e]{position:absolute;left:50%;transform:translateX(-50%)}.header_container[data-v-771ef16e]{background-color:#eff2f7;height:60px;display:flex;justify-content:space-between;align-items:center;width:100%}.avator[data-v-771ef16e]{width:36px;height:36px;border-radius:50%;margin-right:37px}.el-dropdown-menu__item[data-v-771ef16e]{text-align:center}",""])},442:function(t,e,a){var n=a(441);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);a(242)("31846a3f",n,!0)},443:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"header_container"},[a("el-breadcrumb",{staticStyle:{"padding-left":"20px"},attrs:{separator:"/"}},t._l(t.$route.meta,function(e,n){return a("el-breadcrumb-item",{key:n},[t._v(t._s(e))])})),t._v(" "),a("el-dropdown",{attrs:{"menu-align":"start"},on:{command:t.handleCommand}},[a("img",{staticClass:"avator",attrs:{src:t.baseImgPath+t.adminInfo.avatar}}),t._v(" "),a("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[a("el-dropdown-item",{attrs:{command:"home"}},[t._v("首页")]),t._v(" "),a("el-dropdown-item",{attrs:{command:"singout"}},[t._v("退出")])],1)],1)],1)},staticRenderFns:[]}},692:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a(110),r=a.n(n),o=a(109),s=a.n(o),i=a(439),l=a.n(i),m=a(108);a.n(m),a(315),a(1);e.default={data:function(){return{adminForm:{adminName:"",adminPass:""},rules:{adminName:[{required:!0,message:"请输入用户名",trigger:"blur"}],adminPass:[{required:!0,message:"请输入密码",trigger:"blur"}],adminType:[{required:!0,message:"请选择身份",trigger:"blur"}]},options:[{label:"超级管理员",value:"ADMIN"},{label:"普通管理员",value:"EDITOR"},{label:"钱包管理者",value:"ASSIT"}]}},components:{headTop:l.a},created:function(){},computed:{},methods:{addAdmin:function(t){var e=this;this.$refs.adminForm.validate(function(){var a=s()(r.a.mark(function a(n){return r.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:if(!n){a.next=4;break}e.$ajax({method:"POST",url:BaseUrl+"addAdmin",data:t,headers:{token:sessionStorage.getItem("token")}}).then(function(t){console.log(t),500==t.data.flag?e.$alert(t.data.msg,"提示",{confirmButtonText:"确定",callback:function(a){e.$message({type:"info",message:"error: "+t.data.msg})}}):200==t.data.flag?e.$alert(t.data.msg,"提示",{confirmButtonText:"确定",callback:function(t){e.$router.push({path:"/adminList"})}}):201==t.data.flag&&e.$alert(t.data.msg+"，请重新登录","提示",{confirmButtonText:"确定",callback:function(t){e.$router.push("/")}})}),a.next=6;break;case 4:return e.$alert("用户名密码不能为空",{confirmButtonText:"确定",callback:function(t){e.$message({type:"info",message:"请重试！"})}}),a.abrupt("return",!1);case 6:case"end":return a.stop()}},a,e)}));return function(t){return a.apply(this,arguments)}}())}}}},777:function(t,e,a){e=t.exports=a(241)(!1),e.push([t.i,".allcover{position:absolute;top:0;right:0}.ctt{left:50%;transform:translate(-50%,-50%)}.ctt,.tb{position:absolute;top:50%}.tb{transform:translateY(-50%)}.lr{position:absolute;left:50%;transform:translateX(-50%)}",""])},882:function(t,e,a){var n=a(777);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);a(242)("e83d6280",n,!0)}});