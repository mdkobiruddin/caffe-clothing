(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["apps-todo"],{1681:function(t,e,a){},a844:function(t,e,a){"use strict";a("a9e3");var s=a("5530"),i=(a("1681"),a("8654")),o=a("58df"),l=Object(o["a"])(i["a"]);e["a"]=l.extend({name:"v-textarea",props:{autoGrow:Boolean,noResize:Boolean,rowHeight:{type:[Number,String],default:24,validator:function(t){return!isNaN(parseFloat(t))}},rows:{type:[Number,String],default:5,validator:function(t){return!isNaN(parseInt(t,10))}}},computed:{classes:function(){return Object(s["a"])({"v-textarea":!0,"v-textarea--auto-grow":this.autoGrow,"v-textarea--no-resize":this.noResizeHandle},i["a"].options.computed.classes.call(this))},noResizeHandle:function(){return this.noResize||this.autoGrow}},watch:{lazyValue:function(){this.autoGrow&&this.$nextTick(this.calculateInputHeight)},rowHeight:function(){this.autoGrow&&this.$nextTick(this.calculateInputHeight)}},mounted:function(){var t=this;setTimeout((function(){t.autoGrow&&t.calculateInputHeight()}),0)},methods:{calculateInputHeight:function(){var t=this.$refs.input;if(t){t.style.height="0";var e=t.scrollHeight,a=parseInt(this.rows,10)*parseFloat(this.rowHeight);t.style.height=Math.max(a,e)+"px"}},genInput:function(){var t=i["a"].options.methods.genInput.call(this);return t.tag="textarea",delete t.data.attrs.type,t.data.attrs.rows=this.rows,t},onInput:function(t){i["a"].options.methods.onInput.call(this,t),this.autoGrow&&this.calculateInputHeight()},onKeyDown:function(t){this.isFocused&&13===t.keyCode&&t.stopPropagation(),this.$emit("keydown",t)}}})},f597:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"d-flex flex-grow-1 flex-row mt-2 ml-4"},[a("v-navigation-drawer",{staticClass:"elevation-1 rounded flex-shrink-0",class:[t.$vuetify.rtl?"ml-3":"mr-3"],attrs:{app:t.$vuetify.breakpoint.mdAndDown,permanent:t.$vuetify.breakpoint.lgAndUp,floating:"",right:t.$vuetify.rtl,width:"340"},model:{value:t.drawer,callback:function(e){t.drawer=e},expression:"drawer"}},[a("todo-menu",{staticClass:"todo-app-menu pa-2",on:{"open-compose":t.openCompose}})],1),a("div",{staticClass:"d-flex flex-grow-1 flex-column"},[a("v-toolbar",{staticClass:"hidden-lg-and-up flex-grow-0 mb-2"},[a("v-app-bar-nav-icon",{on:{click:function(e){t.drawer=!t.drawer}}}),a("div",{staticClass:"title font-weight-bold"},[t._v("Todo App")])],1),a("router-view",{key:t.$route.fullPath,staticClass:"flex-grow-1",on:{"edit-task":t.openCompose}})],1),a("todo-compose",{ref:"compose"})],1)},i=[],o=(a("4160"),a("159b"),a("5530")),l=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("v-list",{staticClass:"mt-2 pa-0",attrs:{nav:""}},[a("v-list-item",{attrs:{to:"/apps/todo/tasks","active-class":"primary--text",link:""}},[a("v-list-item-icon",[a("v-icon",{attrs:{small:""}},[t._v("mdi-checkbox-marked-circle-outline")])],1),a("v-list-item-content",[a("v-list-item-title",[t._v(t._s(t.$t("todo.events")))])],1),t.incompleteTasks.length>0?a("v-list-item-action",[a("v-badge",{staticClass:"font-weight-bold",attrs:{inline:"",color:"primary",content:t.incompleteTasks.length}})],1):t._e()],1),a("v-list-item",{attrs:{to:"/apps/todo/completed","active-class":"primary--text",link:""}},[a("v-list-item-icon",[a("v-icon",{attrs:{small:""}},[t._v("mdi-check")])],1),a("v-list-item-content",[a("v-list-item-title",[t._v(t._s(t.$t("todo.completed")))])],1)],1)],1),a("v-list",{staticClass:"mt-2 pa-0",attrs:{dense:"",nav:""}},[a("div",{staticClass:"overline pa-1 mt-2"},[t._v(t._s(t.$t("todo.labels")))]),t._l(t.labels,(function(e){return a("v-list-item",{key:e.id,attrs:{to:"/apps/todo/label/"+e.id,exact:"","active-class":"primary--text",link:""}},[a("v-list-item-icon",[a("v-icon",{attrs:{small:"",color:e.color}},[t._v("mdi-label-outline")])],1),a("v-list-item-content",[a("v-list-item-title",[t._v(t._s(e.title))])],1)],1)}))],2)],1)},n=[],c=a("2f62"),r={computed:Object(o["a"])(Object(o["a"])({},Object(c["d"])("todo-app",["labels"])),Object(c["b"])("todo-app",["incompleteTasks"]))},d=r,u=a("2877"),p=a("6544"),v=a.n(p),h=a("4ca6"),m=a("132d"),f=a("8860"),b=a("da13"),k=a("1800"),g=a("5d23"),w=a("34c3"),x=Object(u["a"])(d,l,n,!1,null,null,null),_=x.exports;v()(x,{VBadge:h["a"],VIcon:m["a"],VList:f["a"],VListItem:b["a"],VListItemAction:k["a"],VListItemContent:g["a"],VListItemIcon:w["a"],VListItemTitle:g["c"]});var C=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-dialog",{attrs:{width:"600"},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[a("v-card",[a("v-card-title",{staticClass:"pa-2"},[t._v(" "+t._s(t.isEdit?"Edit Task":"Add Task")+" "),a("v-spacer"),a("v-btn",{attrs:{icon:""},on:{click:function(e){t.dialog=!1}}},[a("v-icon",[t._v("mdi-close")])],1)],1),a("v-divider"),a("div",[a("v-text-field",{staticClass:"px-2 py-1",attrs:{solo:"",flat:"",placeholder:t.$t("common.title"),autofocus:"","hide-details":""},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.save(e)}},model:{value:t.title,callback:function(e){t.title=e},expression:"title"}}),a("v-divider"),a("v-textarea",{staticClass:"px-2 py-1",attrs:{solo:"",flat:"",placeholder:t.$t("common.description"),"hide-details":""},model:{value:t.description,callback:function(e){t.description=e},expression:"description"}}),a("v-divider"),a("v-textarea",{staticClass:"px-2 py-1",attrs:{solo:"",flat:"",placeholder:t.$t("common.description"),"hide-details":""},model:{value:t.date,callback:function(e){t.date=e},expression:"date"}}),a("v-select",{staticClass:"px-2 my-3",attrs:{"menu-props":{bottom:!0,offsetY:!0},items:t.labels,placeholder:"Labels","item-value":"id","hide-selected":"","hide-details":"",solo:"",flat:"",multiple:""},scopedSlots:t._u([{key:"selection",fn:function(e){var s=e.attrs,i=e.item,o=e.parent,l=e.selected;return[i===Object(i)?a("v-chip",t._b({staticClass:"font-weight-bold",attrs:{color:i.color,outlined:"","input-value":l,label:""}},"v-chip",s,!1),[a("span",{staticClass:"pr-2"},[t._v(" "+t._s(i.title)+" ")]),a("v-icon",{attrs:{small:""},on:{click:function(t){return o.selectItem(i)}}},[t._v("close")])],1):t._e()]}},{key:"item",fn:function(e){e.index;var s=e.item;return[a("v-chip",{attrs:{color:s.color,label:"",outlined:"",small:""}},[t._v(" "+t._s(s.title)+" ")])]}}]),model:{value:t.taskLabels,callback:function(e){t.taskLabels=e},expression:"taskLabels"}})],1),a("v-divider"),a("v-card-actions",{staticClass:"pa-2"},[a("v-btn",{attrs:{outlined:""},on:{click:t.close}},[t._v(t._s(t.$t("common.cancel")))]),a("v-spacer"),a("v-btn",{attrs:{color:"primary"},on:{click:t.save}},[t._v(t._s(t.$t("common.save")))])],1)],1)],1)},y=[],T=(a("a4d3"),a("e01a"),a("c975"),a("d3b7"),a("25f0"),{data:function(){return{dialog:!1,title:"",description:"",date:"",task:{},taskLabels:[],search:null}},computed:Object(o["a"])(Object(o["a"])({},Object(c["d"])("todo-app",["labels"])),{},{isEdit:function(){return this.task&&this.task.id}}),methods:Object(o["a"])(Object(o["a"])({},Object(c["c"])("todo-app",["updateTask","addTask"])),{},{open:function(t){t?(this.task=t,this.title=this.task.title,this.description=this.task.description,this.date=this.task.date,this.taskLabels=this.task.labels):(this.task={},this.title="",this.description="",this.date="",this.taskLabels=[]),this.dialog=!0},close:function(){this.dialog=!1},save:function(){var t=this.title,e=this.description,a=this.taskLabels,s={title:t,description:e,labels:a};this.task.id?this.updateTask(Object(o["a"])(Object(o["a"])({},this.task),s)):this.addTask(s),this.close()},filter:function(t,e,a){var s=function(t){return null!==t?t:""},i=s(t.title),o=s(e);return i.toString().toLowerCase().indexOf(o.toString().toLowerCase())>-1}})}),V=T,O=a("8336"),j=a("b0afa"),I=a("99d9"),$=a("cc20"),D=a("169a"),L=a("ce7e"),H=a("b974"),A=a("2fa4"),E=a("8654"),M=a("a844"),N=Object(u["a"])(V,C,y,!1,null,null,null),G=N.exports;v()(N,{VBtn:O["a"],VCard:j["a"],VCardActions:I["a"],VCardTitle:I["d"],VChip:$["a"],VDialog:D["a"],VDivider:L["a"],VIcon:m["a"],VSelect:H["a"],VSpacer:A["a"],VTextField:E["a"],VTextarea:M["a"]});var S=a("56d7"),z=a("c1df"),B=a.n(z),Y={components:{TodoMenu:_,TodoCompose:G},data:function(){return{drawer:null,tasks:[]}},created:function(){var t=this,e=[];this.clearTasks(),S["db"].collection("requestedDeleteAccount").get().then((function(a){a.forEach((function(a){console.log(a.data());var s=a.data();s.id=a.id,t.tasks.push(s);var i=1e3*a.data()["date"].seconds,o=B()(i).format("MMM Do YY"),l={id:a.id+"account",title:"Delete Account",description:a.data()["userPhone"],date:o,sortDate:i,labels:["account"],completed:!1};e.push(l)})),S["db"].collection("requestedDeleteData").get().then((function(a){a.forEach((function(a){console.log(a.data());var s=a.data();s.id=a.id,t.tasks.push(s);var i=1e3*a.data()["date"].seconds,o=B()(i).format("MMM Do YY"),l={id:a.id+"data",title:"Delete Data",description:a.data()["userPhone"],date:o,sortDate:i,labels:["data"],completed:!1};e.push(l)})),e.sort((function(t,e){return t.sortDate<e.sortDate?1:-1}));for(var s=0;s<e.length;s++)t.addTask(e[s])}))}))},methods:Object(o["a"])(Object(o["a"])({},Object(c["c"])("todo-app",["updateTask","addTask","clearTasks"])),{},{openCompose:function(t){this.$refs.compose.open(t)}})},F=Y,P=a("5bc1"),R=a("f774"),q=a("71d9"),J=Object(u["a"])(F,s,i,!1,null,null,null);e["default"]=J.exports;v()(J,{VAppBarNavIcon:P["a"],VNavigationDrawer:R["a"],VToolbar:q["a"]})}}]);