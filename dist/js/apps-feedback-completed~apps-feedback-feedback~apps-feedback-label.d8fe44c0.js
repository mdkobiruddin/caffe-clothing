(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["apps-feedback-completed~apps-feedback-feedback~apps-feedback-label"],{"04e8":function(e,t,i){"use strict";var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("v-card",{staticClass:"min-w-0"},[i("v-divider"),0===e.tasks.length?i("div",[i("div",{staticClass:"px-1 py-6 text-center"},[e._v("All done! No more feedback!")])]):i("v-slide-y-transition",{attrs:{group:"",tag:"div"}},e._l(e.visibleTasks,(function(t){return i("div",{key:t.id,staticClass:"d-flex pa-2 task-item align-center"},[i("div",{staticClass:"task-item-content flex-grow-1",class:{complete:t.completed}},[i("div",{staticClass:"font-weight-bold",domProps:{textContent:e._s(t.title)}}),i("div",{domProps:{textContent:e._s(t.description)}}),i("div",{domProps:{textContent:e._s(t.date)}}),i("div",e._l(t.labels,(function(t){return i("v-chip",{key:t,staticClass:"font-weight-bold mt-1 mr-1",attrs:{color:e.getLabelColor(t),outlined:"","x-small":""}},[e._v(" "+e._s(e.getLabelTitle(t))+" ")])})),1)])])})),0)],1)},s=[],r=(i("4de4"),i("7db0"),i("caad"),i("07ac"),i("2532"),i("5530")),n=i("2f62"),o={props:{tasks:{type:Array,default:function(){return[]}}},data:function(){return{filter:""}},computed:Object(r["a"])(Object(r["a"])({},Object(n["d"])("feedback-app",["labels"])),{},{visibleTasks:function(){var e=this;return this.filter?this.tasks.filter((function(t){return Boolean(Object.values(t).filter((function(e){return"string"===typeof e})).find((function(t){return t.includes(e.filter)})))})):this.tasks}}),methods:Object(r["a"])(Object(r["a"])({},Object(n["c"])("feedback-app",{setComplete:"taskCompleted",setIncomplete:"taskIncomplete",deleteTask:"deleteTask"})),{},{getLabelColor:function(e){var t=this.labels.find((function(t){return t.id===e}));return t?t.color:""},getLabelTitle:function(e){var t=this.labels.find((function(t){return t.id===e}));return t?t.title:""}})},l=o,c=(i("8492"),i("2877")),d=i("6544"),u=i.n(d),h=i("b0afa"),p=i("cc20"),f=i("ce7e"),v=i("0789"),g=Object(c["a"])(l,a,s,!1,null,"3f9e841a",null);t["a"]=g.exports;u()(g,{VCard:h["a"],VChip:p["a"],VDivider:f["a"],VSlideYTransition:v["g"]})},"297c":function(e,t,i){"use strict";i("a9e3");var a=i("2b0e"),s=(i("c7cd"),i("5530")),r=i("ade3"),n=(i("6ece"),i("0789")),o=i("a9ad"),l=i("fe6c"),c=i("a452"),d=i("7560"),u=i("80d2"),h=i("58df"),p=Object(h["a"])(o["a"],Object(l["b"])(["absolute","fixed","top","bottom"]),c["a"],d["a"]),f=p.extend({name:"v-progress-linear",props:{active:{type:Boolean,default:!0},backgroundColor:{type:String,default:null},backgroundOpacity:{type:[Number,String],default:null},bufferValue:{type:[Number,String],default:100},color:{type:String,default:"primary"},height:{type:[Number,String],default:4},indeterminate:Boolean,query:Boolean,reverse:Boolean,rounded:Boolean,stream:Boolean,striped:Boolean,value:{type:[Number,String],default:0}},data:function(){return{internalLazyValue:this.value||0}},computed:{__cachedBackground:function(){return this.$createElement("div",this.setBackgroundColor(this.backgroundColor||this.color,{staticClass:"v-progress-linear__background",style:this.backgroundStyle}))},__cachedBar:function(){return this.$createElement(this.computedTransition,[this.__cachedBarType])},__cachedBarType:function(){return this.indeterminate?this.__cachedIndeterminate:this.__cachedDeterminate},__cachedBuffer:function(){return this.$createElement("div",{staticClass:"v-progress-linear__buffer",style:this.styles})},__cachedDeterminate:function(){return this.$createElement("div",this.setBackgroundColor(this.color,{staticClass:"v-progress-linear__determinate",style:{width:Object(u["g"])(this.normalizedValue,"%")}}))},__cachedIndeterminate:function(){return this.$createElement("div",{staticClass:"v-progress-linear__indeterminate",class:{"v-progress-linear__indeterminate--active":this.active}},[this.genProgressBar("long"),this.genProgressBar("short")])},__cachedStream:function(){return this.stream?this.$createElement("div",this.setTextColor(this.color,{staticClass:"v-progress-linear__stream",style:{width:Object(u["g"])(100-this.normalizedBuffer,"%")}})):null},backgroundStyle:function(){var e,t=null==this.backgroundOpacity?this.backgroundColor?1:.3:parseFloat(this.backgroundOpacity);return e={opacity:t},Object(r["a"])(e,this.isReversed?"right":"left",Object(u["g"])(this.normalizedValue,"%")),Object(r["a"])(e,"width",Object(u["g"])(this.normalizedBuffer-this.normalizedValue,"%")),e},classes:function(){return Object(s["a"])({"v-progress-linear--absolute":this.absolute,"v-progress-linear--fixed":this.fixed,"v-progress-linear--query":this.query,"v-progress-linear--reactive":this.reactive,"v-progress-linear--reverse":this.isReversed,"v-progress-linear--rounded":this.rounded,"v-progress-linear--striped":this.striped},this.themeClasses)},computedTransition:function(){return this.indeterminate?n["d"]:n["f"]},isReversed:function(){return this.$vuetify.rtl!==this.reverse},normalizedBuffer:function(){return this.normalize(this.bufferValue)},normalizedValue:function(){return this.normalize(this.internalLazyValue)},reactive:function(){return Boolean(this.$listeners.change)},styles:function(){var e={};return this.active||(e.height=0),this.indeterminate||100===parseFloat(this.normalizedBuffer)||(e.width=Object(u["g"])(this.normalizedBuffer,"%")),e}},methods:{genContent:function(){var e=Object(u["s"])(this,"default",{value:this.internalLazyValue});return e?this.$createElement("div",{staticClass:"v-progress-linear__content"},e):null},genListeners:function(){var e=this.$listeners;return this.reactive&&(e.click=this.onClick),e},genProgressBar:function(e){return this.$createElement("div",this.setBackgroundColor(this.color,{staticClass:"v-progress-linear__indeterminate",class:Object(r["a"])({},e,!0)}))},onClick:function(e){if(this.reactive){var t=this.$el.getBoundingClientRect(),i=t.width;this.internalValue=e.offsetX/i*100}},normalize:function(e){return e<0?0:e>100?100:parseFloat(e)}},render:function(e){var t={staticClass:"v-progress-linear",attrs:{role:"progressbar","aria-valuemin":0,"aria-valuemax":this.normalizedBuffer,"aria-valuenow":this.indeterminate?void 0:this.normalizedValue},class:this.classes,style:{bottom:this.bottom?0:void 0,height:this.active?Object(u["g"])(this.height):0,top:this.top?0:void 0},on:this.genListeners()};return e("div",t,[this.__cachedStream,this.__cachedBackground,this.__cachedBuffer,this.__cachedBar,this.genContent()])}}),v=f;t["a"]=a["a"].extend().extend({name:"loadable",props:{loading:{type:[Boolean,String],default:!1},loaderHeight:{type:[Number,String],default:2}},methods:{genProgress:function(){return!1===this.loading?null:this.$slots.progress||this.$createElement(v,{props:{absolute:!0,color:!0===this.loading||""===this.loading?this.color||"primary":this.loading,height:this.loaderHeight,indeterminate:!0}})}}})},"615b":function(e,t,i){},"6ece":function(e,t,i){},8492:function(e,t,i){"use strict";i("eed1")},"8adc":function(e,t,i){},"8ce9":function(e,t,i){},b0afa:function(e,t,i){"use strict";i("0481"),i("4069"),i("a9e3");var a=i("5530"),s=(i("615b"),i("10d2")),r=i("297c"),n=i("1c87"),o=i("58df");t["a"]=Object(o["a"])(r["a"],n["a"],s["a"]).extend({name:"v-card",props:{flat:Boolean,hover:Boolean,img:String,link:Boolean,loaderHeight:{type:[Number,String],default:4},raised:Boolean},computed:{classes:function(){return Object(a["a"])(Object(a["a"])({"v-card":!0},n["a"].options.computed.classes.call(this)),{},{"v-card--flat":this.flat,"v-card--hover":this.hover,"v-card--link":this.isClickable,"v-card--loading":this.loading,"v-card--disabled":this.disabled,"v-card--raised":this.raised},s["a"].options.computed.classes.call(this))},styles:function(){var e=Object(a["a"])({},s["a"].options.computed.styles.call(this));return this.img&&(e.background='url("'.concat(this.img,'") center center / cover no-repeat')),e}},methods:{genProgress:function(){var e=r["a"].options.methods.genProgress.call(this);return e?this.$createElement("div",{staticClass:"v-card__progress",key:"progress"},[e]):null}},render:function(e){var t=this.generateRouteLink(),i=t.tag,a=t.data;return a.style=this.styles,this.isClickable&&(a.attrs=a.attrs||{},a.attrs.tabindex=0),e(i,this.setBackgroundColor(this.color,a),[this.genProgress(),this.$slots.default])}})},cc20:function(e,t,i){"use strict";i("4de4"),i("4160");var a=i("3835"),s=i("5530"),r=(i("8adc"),i("58df")),n=i("0789"),o=i("9d26"),l=i("a9ad"),c=i("4e82"),d=i("7560"),u=i("f2e7"),h=i("1c87"),p=i("af2b"),f=i("d9bd");t["a"]=Object(r["a"])(l["a"],p["a"],h["a"],d["a"],Object(c["a"])("chipGroup"),Object(u["b"])("inputValue")).extend({name:"v-chip",props:{active:{type:Boolean,default:!0},activeClass:{type:String,default:function(){return this.chipGroup?this.chipGroup.activeClass:""}},close:Boolean,closeIcon:{type:String,default:"$delete"},disabled:Boolean,draggable:Boolean,filter:Boolean,filterIcon:{type:String,default:"$complete"},label:Boolean,link:Boolean,outlined:Boolean,pill:Boolean,tag:{type:String,default:"span"},textColor:String,value:null},data:function(){return{proxyClass:"v-chip--active"}},computed:{classes:function(){return Object(s["a"])(Object(s["a"])(Object(s["a"])(Object(s["a"])({"v-chip":!0},h["a"].options.computed.classes.call(this)),{},{"v-chip--clickable":this.isClickable,"v-chip--disabled":this.disabled,"v-chip--draggable":this.draggable,"v-chip--label":this.label,"v-chip--link":this.isLink,"v-chip--no-color":!this.color,"v-chip--outlined":this.outlined,"v-chip--pill":this.pill,"v-chip--removable":this.hasClose},this.themeClasses),this.sizeableClasses),this.groupClasses)},hasClose:function(){return Boolean(this.close)},isClickable:function(){return Boolean(h["a"].options.computed.isClickable.call(this)||this.chipGroup)}},created:function(){var e=this,t=[["outline","outlined"],["selected","input-value"],["value","active"],["@input","@active.sync"]];t.forEach((function(t){var i=Object(a["a"])(t,2),s=i[0],r=i[1];e.$attrs.hasOwnProperty(s)&&Object(f["a"])(s,r,e)}))},methods:{click:function(e){this.$emit("click",e),this.chipGroup&&this.toggle()},genFilter:function(){var e=[];return this.isActive&&e.push(this.$createElement(o["a"],{staticClass:"v-chip__filter",props:{left:!0}},this.filterIcon)),this.$createElement(n["b"],e)},genClose:function(){var e=this;return this.$createElement(o["a"],{staticClass:"v-chip__close",props:{right:!0,size:18},on:{click:function(t){t.stopPropagation(),t.preventDefault(),e.$emit("click:close"),e.$emit("update:active",!1)}}},this.closeIcon)},genContent:function(){return this.$createElement("span",{staticClass:"v-chip__content"},[this.filter&&this.genFilter(),this.$slots.default,this.hasClose&&this.genClose()])}},render:function(e){var t=[this.genContent()],i=this.generateRouteLink(),a=i.tag,r=i.data;r.attrs=Object(s["a"])(Object(s["a"])({},r.attrs),{},{draggable:this.draggable?"true":void 0,tabindex:this.chipGroup&&!this.disabled?0:r.attrs.tabindex}),r.directives.push({name:"show",value:this.active}),r=this.setBackgroundColor(this.color,r);var n=this.textColor||this.outlined&&this.color;return e(a,this.setTextColor(n,r),t)}})},ce7e:function(e,t,i){"use strict";var a=i("5530"),s=(i("8ce9"),i("7560"));t["a"]=s["a"].extend({name:"v-divider",props:{inset:Boolean,vertical:Boolean},render:function(e){var t;return this.$attrs.role&&"separator"!==this.$attrs.role||(t=this.vertical?"vertical":"horizontal"),e("hr",{class:Object(a["a"])({"v-divider":!0,"v-divider--inset":this.inset,"v-divider--vertical":this.vertical},this.themeClasses),attrs:Object(a["a"])({role:"separator","aria-orientation":t},this.$attrs),on:this.$listeners})}})},eed1:function(e,t,i){}}]);