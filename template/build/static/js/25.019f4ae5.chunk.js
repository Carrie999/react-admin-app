(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{1020:function(e,t,a){"use strict";a.r(t);var n=a(641),s=a.n(n),l=a(643),r=a(64),i=a(65),c=a(40),u=a(66),o=a(67),h=a(0),p=a.n(h),d=a(736),m=a(575),g=a(573),f=a(574),b=a(130),k=a(595),v=a(596),E=a(607),C=a(737),y=a(1002),I=a(628),w=a(13),_=["magenta","geekblue","green","red","purple","cyan","blue","lime","volcano","gold"],L=function(e){function t(e){var a;Object(r.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).triggerChange=function(e){var t=e.tags,n=a.props.onChange;n&&n(t)},a.handleClose=function(e){var t=a.state.tags.filter(function(t){return t!==e});a.setState({tags:t}),a.triggerChange(t)},a.showInput=function(){a.setState({inputVisible:!0},function(){return a.input.focus()})},a.handleInputChange=function(e){a.setState({inputValue:e.target.value})},a.handleInputConfirm=function(){var e=a.state.inputValue,t=a.state.tags;e&&-1===t.indexOf(e)&&(t=[].concat(Object(C.a)(t),[e])),console.log(t),a.triggerChange({tags:t}),a.setState({tags:t,inputVisible:!1,inputValue:""})},a.saveInputRef=function(e){return a.input=e};var n=e.value||{};return a.state={tags:n.tags||[],inputVisible:!1,inputValue:""},a}return Object(o.a)(t,e),Object(i.a)(t,[{key:"componentWillReceiveProps",value:function(e){Array.isArray(e.value)&&this.setState({tags:e.value})}},{key:"render",value:function(){var e=this,t=this.state,a=t.tags,n=t.inputVisible,s=t.inputValue;return p.a.createElement("div",null,a.map(function(t,a){var n=t.length>20,s=p.a.createElement(y.a,{key:t,closable:"false",onClose:function(){return e.handleClose(t)},color:_[a>9?0:a]},n?"".concat(t.slice(0,20),"..."):t);return n?p.a.createElement(I.a,{title:t,key:t},s):s}),n&&p.a.createElement(f.a,{ref:this.saveInputRef,type:"text",size:"small",style:{width:78},value:s,onChange:this.handleInputChange,onBlur:this.handleInputConfirm,onPressEnter:this.handleInputConfirm}),!n&&p.a.createElement(y.a,{color:"magenta",onClick:this.showInput,style:{background:"#fff",borderStyle:"dashed"}},p.a.createElement(w.a,{type:"plus"})," New Tag"))}}]),t}(p.a.Component),T=a(630),O=function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).onChange=function(e){a.setState({checkedList:e,indeterminate:!!e.length&&e.length<a.plainOptions.length,checkAll:e.length===a.plainOptions.length},function(){a.triggerChange(a.state)})},a.onCheckAllChange=function(e){a.setState({checkedList:e.target.checked?a.initialValue:[],indeterminate:!1,checkAll:e.target.checked},function(){a.triggerChange(a.state)})},a.triggerChange=function(e){var t=e.checkedList,n=a.props.onChange;n&&n(t)},a.state={indeterminate:!1,checkAll:!0,checkedList:[]},a}return Object(o.a)(t,e),Object(i.a)(t,[{key:"componentWillReceiveProps",value:function(e){e.value!==this.state.checkedList&&(this.initialValue=e.value,this.setState({checkedList:e.value,checkAll:!0,indeterminate:!1}));var t=e.Lists;t&&(this.plainOptions=t)}},{key:"render",value:function(){return p.a.createElement(p.a.Fragment,null,p.a.createElement("div",{style:{borderBottom:"1px solid #E9E9E9"}},p.a.createElement(T.a,{indeterminate:this.state.indeterminate,onChange:this.onCheckAllChange,checked:this.state.checkAll},"\u5168\u9009")),p.a.createElement(T.a.Group,{options:this.plainOptions,value:this.state.checkedList,onChange:this.onChange}))}}]),t}(p.a.Component),U=a(593),j=a.n(U),x=d.a.Option,D=function(e){function t(){var e,a,n;Object(r.a)(this,t);for(var i=arguments.length,o=new Array(i),h=0;h<i;h++)o[h]=arguments[h];return Object(c.a)(n,(a=n=Object(c.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(o))),n.state={labelUsersId:[],labelUsersLists:[],checkUsersId:[],checkUsersLists:[],allowLabelTypes:["Rect","RBox","Quad","Poly","Curve"],allowLabelTypesLists:[{label:"\u77e9\u5f62",value:"Rect"},{label:"\u65cb\u8f6c\u77e9\u5f62",value:"RBox"},{label:"\u56db\u8fb9\u5f62",value:"Quad"},{label:"\u591a\u8fb9\u5f62",value:"Poly"},{label:"\u66f2\u7ebf",value:"Curve"}]},n.handleSubmit=function(e){e.preventDefault(),n.props.form.validateFieldsAndScroll(function(e,t){if(!e){for(var a in console.log("Received values of form: ",t),t)t[a]||delete t[a];n.EDIT?(t.index=window.location.search.slice(1),E.a.putTask(t).then(function(e){console.log(e),200===e.code?(m.a.success("\u4fee\u6539\u4efb\u52a1\u6210\u529f"),n.props.history.goBack()):m.a.error(e.message)})):E.a.postTask(t).then(function(e){console.log(e),200===e.code?(m.a.success("\u521b\u5efa\u6210\u529f"),n.props.history.goBack()):m.a.error(e.message)})}})},n.componentDidMount=function(){window.location.search.slice(1)?(n.EDIT=!0,n.getTaskDetail(!0)):n.EDIT=!1,n.getLabelUsers(),n.getCheckUsers()},n.getTaskDetail=function(){var e=Object(l.a)(s.a.mark(function e(t){var a,l,r,i,c,u,o,h,p,d,m,g;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!t){e.next=6;break}return e.next=3,E.a.getTaskDetailInfo(j.a.stringify({task_id:window.location.search.slice(1)}));case 3:a=e.sent,e.next=9;break;case 6:return e.next=8,E.a.getTaskDetail(j.a.stringify({task_id:window.location.search.slice(1)}));case 8:a=e.sent;case 9:200===a.code&&(l=a.data,r=l.name,i=l.desc,c=l.default_tags,u=l.label_users,o=l.check_users,h=l.allow_label_types,p=l.task_type,d=l.replica_num,m=[],g=[],u.map(function(e){m.push(e.user_id)}),o.map(function(e){g.push(e.user_id)}),n.setState({name:r,desc:i,default_tags:c,labelUsersId:m,checkUsersId:g,allowLabelTypes:h,task_type:p,replica_num:d||""}));case 10:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),n.getLabelUsers=Object(l.a)(s.a.mark(function e(){var t,a,l;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,E.a.getLabelUsers();case 2:200===(t=e.sent).code&&(a=[],l=[],t.data.map(function(e){a.push(e.user_id),l.push({label:e.username,value:e.user_id})}),n.EDIT?n.setState({labelUsersLists:l}):n.setState({labelUsersId:a,labelUsersLists:l}));case 4:case"end":return e.stop()}},e)})),n.getCheckUsers=Object(l.a)(s.a.mark(function e(){var t,a,l;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,E.a.getCheckUsers();case 2:200===(t=e.sent).code&&(a=[],l=[],t.data.map(function(e){a.push(e.user_id),l.push({label:e.username,value:e.user_id})}),n.EDIT?n.setState({checkUsersLists:l}):n.setState({checkUsersId:a,checkUsersLists:l}));case 4:case"end":return e.stop()}},e)})),n.handleChange=function(e){n.setState({task_type:e}),console.log("selected ".concat(e))},a))}return Object(o.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this.props.form.getFieldDecorator;return p.a.createElement(g.a,{labelCol:{xs:{span:24},sm:{span:5}},wrapperCol:{xs:{span:24},sm:{span:19}}},p.a.createElement(g.a.Item,{label:"\u4efb\u52a1\u540d"},e("name",{initialValue:this.EDIT?this.state.name:"",rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u4efb\u52a1\u540d!",whitespace:!0}]})(p.a.createElement(f.a,null))),p.a.createElement(g.a.Item,{label:"\u63cf\u8ff0"},e("desc",{initialValue:this.EDIT?this.state.desc:"",rules:[{required:!1}]})(p.a.createElement(f.a,null))),p.a.createElement(g.a.Item,{label:"\u9ed8\u8ba4\u6807\u7b7e"},e("default_tags",{initialValue:this.EDIT?this.state.default_tags:"",rules:[{required:!1}]})(p.a.createElement(L,null))),p.a.createElement(g.a.Item,{label:"\u4efb\u52a1\u7c7b\u578b"},e("task_type",{initialValue:this.EDIT?this.state.task_type:"general",rules:[{required:!0}]})(p.a.createElement(d.a,{style:{width:120},onChange:this.handleChange},p.a.createElement(x,{value:"general"},"\u666e\u901a\u4efb\u52a1"),p.a.createElement(x,{value:"multiple"},"\u591a\u4eba\u6807\u6ce8")))),"multiple"===this.state.task_type?p.a.createElement(g.a.Item,{label:"\u4efd\u6570"},e("replica_num",{initialValue:this.EDIT?this.state.replica_num:2,rules:[{required:!0}]})(p.a.createElement(d.a,{style:{width:120},onChange:this.handleChange},p.a.createElement(x,{value:2},"2"),p.a.createElement(x,{value:3},"3")))):"",p.a.createElement(g.a.Item,{label:"\u56fe\u5f62"},e("allow_label_types",{initialValue:this.state.allowLabelTypes||[],rules:[{required:!0}]})(p.a.createElement(O,{Lists:this.state.allowLabelTypesLists}))),p.a.createElement(g.a.Item,{label:"\u6807\u6ce8\u5458"},e("label_users",{initialValue:this.state.labelUsersId||[],rules:[{required:!0}]})(p.a.createElement(O,{Lists:this.state.labelUsersLists}))),p.a.createElement(g.a.Item,{label:"\u8d28\u68c0\u5458"},e("check_users",{initialValue:this.state.checkUsersId||[],rules:[{required:!0}]})(p.a.createElement(O,{Lists:this.state.checkUsersLists}))),p.a.createElement(g.a.Item,{wrapperCol:{xs:{span:24,offset:0},sm:{span:19,offset:5}}},p.a.createElement(b.a,{type:"primary",onClick:this.handleSubmit},this.EDIT?"\u4fdd\u5b58":"\u521b\u5efa\u4efb\u52a1")))}}]),t}(p.a.Component),V=g.a.create({name:"register"})(D);t.default=function(e){return p.a.createElement(p.a.Fragment,null,p.a.createElement(k.a,null,p.a.createElement(v.a,{span:12},p.a.createElement(V,e))))}},607:function(e,t,a){"use strict";var n=a(22),s=a(105).a.version;t.a={getTask:function(e){return n.b("".concat(s,"task"),e)},postTask:function(e){return n.c("".concat(s,"task"),e)},putTask:function(e){return n.d("".concat(s,"task"),e)},delTask:function(e){return n.a("".concat(s,"task"),e)},getExport:function(e){return n.b("".concat(s,"export"),e)},getLabelUsers:function(){return n.b("".concat(s,"options/label_users"))},getCheckUsers:function(){return n.b("".concat(s,"options/check_users"))},getTaskDetail:function(e){return n.b("".concat(s,"task/detail"),e)},getTaskDetailInfo:function(e){return n.b("".concat(s,"task/detail_info"),e)}}}}]);