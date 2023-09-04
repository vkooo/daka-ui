(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-d27e2d48"],{1946:function(e,t,s){"use strict";s("7c58")},"421d":function(e,t,s){},"55c1":function(e,t,s){"use strict";s.r(t);var r=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("el-form",{ref:"form",attrs:{model:e.user,rules:e.rules,"label-width":"80px"}},[s("el-form-item",{attrs:{label:"旧密码",prop:"oldPassword"}},[s("el-input",{attrs:{placeholder:"请输入旧密码",type:"password","show-password":""},model:{value:e.user.oldPassword,callback:function(t){e.$set(e.user,"oldPassword",t)},expression:"user.oldPassword"}})],1),s("el-form-item",{attrs:{label:"新密码",prop:"newPassword"}},[s("el-input",{attrs:{placeholder:"请输入新密码",type:"password","show-password":""},model:{value:e.user.newPassword,callback:function(t){e.$set(e.user,"newPassword",t)},expression:"user.newPassword"}})],1),s("el-form-item",{attrs:{label:"确认密码",prop:"confirmPassword"}},[s("el-input",{attrs:{placeholder:"请确认新密码",type:"password","show-password":""},model:{value:e.user.confirmPassword,callback:function(t){e.$set(e.user,"confirmPassword",t)},expression:"user.confirmPassword"}})],1),s("el-form-item",[s("el-button",{directives:[{name:"throttle",rawName:"v-throttle",value:2e3,expression:"2000"}],attrs:{type:"primary",size:"mini"},on:{click:e.submit}},[e._v("保存")]),s("el-button",{attrs:{type:"danger",size:"mini"},on:{click:e.close}},[e._v("关闭")])],1)],1)},i=[],a=s("602c"),o={data:function(){var e=this,t=function(t,s,r){e.user.newPassword!==s?r(new Error("两次输入的密码不一致")):r()};return{user:{oldPassword:void 0,newPassword:void 0,confirmPassword:void 0},rules:{oldPassword:[{required:!0,message:"旧密码不能为空",trigger:"blur"}],newPassword:[{required:!0,message:"新密码不能为空",trigger:"blur"},{min:5,max:15,message:"长度在 5 到 15 个字符",trigger:"blur"}],confirmPassword:[{required:!0,message:"确认密码不能为空",trigger:"blur"},{required:!0,validator:t,trigger:"blur"}]}}},methods:{submit:function(){var e=this;this.$refs["form"].validate((function(t){t&&Object(a["m"])({oldPassword:e.user.oldPassword,newPassword:e.user.newPassword}).then((function(t){e.$message({message:"修改成功",type:"success"})}))}))},close:function(){this.$tab.closePage()}}},l=o,n=s("2877"),c=Object(n["a"])(l,r,i,!1,null,null,null);t["default"]=c.exports},"666c":function(e,t,s){"use strict";s.r(t);var r=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"app-container"},[s("el-row",{attrs:{gutter:20}},[s("el-col",{attrs:{span:6,xs:24}},[s("el-card",{staticClass:"box-card"},[s("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[s("span",[e._v("个人信息")])]),s("div",[s("div",{staticClass:"text-center"},[s("userAvatar",{attrs:{user:e.user}})],1),s("ul",{staticClass:"list-group list-group-striped"},[s("li",{staticClass:"list-group-item"},[s("svg-icon",{attrs:{"icon-class":"user"}}),e._v("用户名称 "),s("div",{staticClass:"pull-right"},[e._v(e._s(e.user.account))])],1),s("li",{staticClass:"list-group-item"},[s("svg-icon",{attrs:{"icon-class":"phone"}}),e._v("手机号码 "),s("div",{staticClass:"pull-right"},[e._v(e._s(e.user.mobile))])],1),s("li",{staticClass:"list-group-item"},[s("svg-icon",{attrs:{"icon-class":"email"}}),e._v("用户邮箱 "),s("div",{staticClass:"pull-right"},[e._v(e._s(e.user.email))])],1),s("li",{staticClass:"list-group-item"},[s("svg-icon",{attrs:{"icon-class":"peoples"}}),e._v("所属角色 "),s("div",{staticClass:"pull-right"},[e._v(e._s(e.user.role))])],1),s("li",{staticClass:"list-group-item"},[s("svg-icon",{attrs:{"icon-class":"date"}}),e._v("创建日期 "),s("div",{staticClass:"pull-right"},[e._v(e._s(e.user.created_at))])],1)])])])],1),s("el-col",{attrs:{span:18,xs:24}},[s("el-card",[s("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[s("span",[e._v("基本资料")])]),s("el-tabs",{model:{value:e.activeTab,callback:function(t){e.activeTab=t},expression:"activeTab"}},[s("el-tab-pane",{attrs:{label:"基本资料",name:"userinfo"}},[s("userInfo",{attrs:{user:e.user}})],1),s("el-tab-pane",{attrs:{label:"修改密码",name:"resetPwd"}},[s("resetPwd")],1)],1)],1)],1)],1)],1)},i=[],a=s("6d39"),o=s("c360"),l=s("55c1"),n=s("602c"),c={name:"Profile",components:{userAvatar:a["default"],userInfo:o["default"],resetPwd:l["default"]},data:function(){return{user:{},activeTab:"userinfo"}},created:function(){this.getUser()},methods:{getUser:function(){var e=this;Object(n["f"])().then((function(t){var s=t.data.userInfo;e.user=s}))}}},u=c,p=(s("dcf1"),s("2877")),d=Object(p["a"])(u,r,i,!1,null,null,null);t["default"]=d.exports},"6d39":function(e,t,s){"use strict";s.r(t);var r=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("div",{staticClass:"user-info-head",on:{click:function(t){return e.editCropper()}}},[s("img",{staticClass:"img-circle img-lg",attrs:{src:e.options.img,title:"点击上传头像"}})]),s("el-dialog",{attrs:{title:e.title,visible:e.open,width:"800px","append-to-body":""},on:{"update:visible":function(t){e.open=t},opened:e.modalOpened,close:e.closeDialog}},[s("el-row",[s("el-col",{style:{height:"350px"},attrs:{xs:24,md:12}},[e.visible?s("vue-cropper",{ref:"cropper",attrs:{img:e.options.img,info:!0,autoCrop:e.options.autoCrop,autoCropWidth:e.options.autoCropWidth,autoCropHeight:e.options.autoCropHeight,fixedBox:e.options.fixedBox,outputType:e.options.outputType},on:{realTime:e.realTime}}):e._e()],1),s("el-col",{style:{height:"350px"},attrs:{xs:24,md:12}},[s("div",{staticClass:"avatar-upload-preview"},[s("img",{style:e.previews.img,attrs:{src:e.previews.url}})])])],1),s("br"),s("el-row",[s("el-col",{attrs:{lg:2,sm:3,xs:3}},[s("el-upload",{attrs:{action:"#","http-request":e.requestUpload,"show-file-list":!1,"before-upload":e.beforeUpload}},[s("el-button",{attrs:{size:"small"}},[e._v(" 选择 "),s("i",{staticClass:"el-icon-upload el-icon--right"})])],1)],1),s("el-col",{attrs:{lg:{span:1,offset:2},sm:2,xs:2}},[s("el-button",{attrs:{icon:"el-icon-plus",size:"small"},on:{click:function(t){return e.changeScale(1)}}})],1),s("el-col",{attrs:{lg:{span:1,offset:1},sm:2,xs:2}},[s("el-button",{attrs:{icon:"el-icon-minus",size:"small"},on:{click:function(t){return e.changeScale(-1)}}})],1),s("el-col",{attrs:{lg:{span:1,offset:1},sm:2,xs:2}},[s("el-button",{attrs:{icon:"el-icon-refresh-left",size:"small"},on:{click:function(t){return e.rotateLeft()}}})],1),s("el-col",{attrs:{lg:{span:1,offset:1},sm:2,xs:2}},[s("el-button",{attrs:{icon:"el-icon-refresh-right",size:"small"},on:{click:function(t){return e.rotateRight()}}})],1),s("el-col",{attrs:{lg:{span:2,offset:6},sm:2,xs:2}},[s("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(t){return e.uploadImg()}}},[e._v("提 交")])],1)],1)],1)],1)},i=[],a=s("4360"),o=s("7e79"),l=s("602c"),n=s("ed08"),c={components:{VueCropper:o["VueCropper"]},props:{user:{type:Object}},data:function(){return{open:!1,visible:!1,title:"修改头像",options:{img:a["a"].getters.avatar,autoCrop:!0,autoCropWidth:200,autoCropHeight:200,fixedBox:!0,outputType:"png"},previews:{},resizeHandler:null}},methods:{editCropper:function(){this.open=!0},modalOpened:function(){var e=this;this.visible=!0,this.resizeHandler||(this.resizeHandler=Object(n["a"])((function(){e.refresh()}),100)),window.addEventListener("resize",this.resizeHandler)},refresh:function(){this.$refs.cropper.refresh()},requestUpload:function(){},rotateLeft:function(){this.$refs.cropper.rotateLeft()},rotateRight:function(){this.$refs.cropper.rotateRight()},changeScale:function(e){e=e||1,this.$refs.cropper.changeScale(e)},beforeUpload:function(e){var t=this;if(-1==e.type.indexOf("image/"))this.$modal.msgError("文件格式错误，请上传图片类型,如：JPG，PNG后缀的文件。");else{var s=new FileReader;s.readAsDataURL(e),s.onload=function(){t.options.img=s.result}}},uploadImg:function(){var e=this;this.$refs.cropper.getCropBlob((function(t){var s=new FormData;s.append("file",t),Object(l["n"])(s).then((function(t){e.open=!1,e.options.img=t.data,a["a"].commit("user/SET_AVATAR",e.options.img),e.$message({message:"修改成功",type:"success"}),e.visible=!1}))}))},realTime:function(e){this.previews=e},closeDialog:function(){this.options.img=a["a"].getters.avatar,this.visible=!1,window.removeEventListener("resize",this.resizeHandler)}}},u=c,p=(s("1946"),s("2877")),d=Object(p["a"])(u,r,i,!1,null,"553bb3b9",null);t["default"]=d.exports},"7c58":function(e,t,s){},c360:function(e,t,s){"use strict";s.r(t);var r=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("el-form",{ref:"form",attrs:{model:e.user,rules:e.rules,"label-width":"80px"}},[s("el-form-item",{attrs:{label:"用户昵称",prop:"nickname"}},[s("el-input",{attrs:{maxlength:"30"},model:{value:e.user.nickname,callback:function(t){e.$set(e.user,"nickname",t)},expression:"user.nickname"}})],1),s("el-form-item",{attrs:{label:"手机号码",prop:"mobile"}},[s("el-input",{attrs:{maxlength:"11"},model:{value:e.user.mobile,callback:function(t){e.$set(e.user,"mobile",t)},expression:"user.mobile"}})],1),s("el-form-item",{attrs:{label:"邮箱",prop:"email"}},[s("el-input",{attrs:{maxlength:"50"},model:{value:e.user.email,callback:function(t){e.$set(e.user,"email",t)},expression:"user.email"}})],1),s("el-form-item",[s("el-button",{directives:[{name:"throttle",rawName:"v-throttle",value:2e3,expression:"2000"}],attrs:{type:"primary",size:"mini"},on:{click:e.submit}},[e._v("保存")]),s("el-button",{attrs:{type:"danger",size:"mini"},on:{click:e.close}},[e._v("关闭")])],1)],1)},i=[],a=s("602c"),o={props:{user:{type:Object}},data:function(){return{rules:{nickname:[{required:!0,message:"用户昵称不能为空",trigger:"blur"}],email:[{required:!0,message:"邮箱地址不能为空",trigger:"blur"},{type:"email",message:"请输入正确的邮箱地址",trigger:["blur","change"]}],mobile:[{required:!0,message:"手机号码不能为空",trigger:"blur"},{pattern:/^1[3|4|5|6|7|8|9][0-9]\d{8}$/,message:"请输入正确的手机号码",trigger:"blur"}]}}},methods:{submit:function(){var e=this;this.$refs["form"].validate((function(t){t&&Object(a["l"])(e.user).then((function(t){e.$message({message:"修改成功",type:"success"})}))}))},close:function(){this.$tab.closePage()}}},l=o,n=s("2877"),c=Object(n["a"])(l,r,i,!1,null,null,null);t["default"]=c.exports},dcf1:function(e,t,s){"use strict";s("421d")},ed08:function(e,t,s){"use strict";s.d(t,"a",(function(){return i})),s.d(t,"b",(function(){return a}));s("53ca"),s("ac1f"),s("00b4"),s("5319"),s("4d63"),s("2c3e"),s("25f0"),s("d3b7"),s("4d90"),s("159b"),s("d81d");var r=s("2b0e");function i(e,t,s){}function a(e){var t=e.selection.map((function(e){return e.id}));return console.log(),t.length<=0&&r["default"].prototype.$throw("请选择删除数据"),t}}}]);