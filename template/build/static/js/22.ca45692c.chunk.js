(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{1022:function(e,t,a){"use strict";a.r(t);var n=a(64),o=a(65),c=a(40),r=a(66),i=a(67),s=a(198),l=a(0),u=a.n(l),d=a(68),p=a(805),f=a(806),m=a(575),g=a(130),h=a(1013),k=a(1001),b=a(593),E=a.n(b),x=a(607),y=a(757),v=a.n(y),j=a(1015),C=a(13),w=a(190),O=a.n(w),S=a(105),T=function(e){function t(e){var a;return Object(n.a)(this,t),(a=Object(c.a)(this,Object(r.a)(t).call(this,e))).triggerChange=function(e){var t=a.props.onChange;t&&t(e)},a.propsConfig={name:"file",action:"",headers:{authorization:"authorization-text"},accept:".zip",withCredentials:!0,beforeUpload:function(e){if(!(e.size/1024/1024/1024<1.5))return m.a.error("\u6587\u4ef6\u5927\u5c0f\u4e0d\u80fd\u8d85\u8fc71.5G"),!1},customRequest:function(e){var t=e.file,n=new FormData;n.append("task_id",a.props.index),n.append("file",t);var o={method:"POST",url:"".concat(S.a.baseURL,"api/v1/package"),data:n,headers:{"content-type":"multipart/form-data"}};O()(o).then(function(e){console.log(e.data),200===e.data.code?m.a.success("\u4e0a\u4f20\u6210\u529f"):m.a.error("\u4e0a\u4f20\u5931\u8d25")}).catch(function(e){console.log(e)}),console.log(33333,e)},onRemove:function(e){console.log(e)},onStart:function(e){console.log("onStart",e.name)},onSuccess:function(e){console.log("onSuccess",e)},onProgress:function(e,t){console.log("onProgress",Math.round(e.percent),t.name)},onError:function(e){console.log("onError",e)}},a}return Object(i.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return u.a.createElement(j.a,Object.assign({},this.propsConfig,this.props),u.a.createElement(g.a,null,u.a.createElement(C.a,{type:"upload"})," \u70b9\u51fb\u4e0a\u4f20"))}}]),t}(u.a.Component),_=function(e){function t(){var e,a,o;Object(n.a)(this,t);for(var i=arguments.length,l=new Array(i),g=0;g<i;g++)l[g]=arguments[g];return Object(c.a)(o,(a=o=Object(c.a)(this,(e=Object(r.a)(t)).call.apply(e,[this].concat(l))),o.state={data:[],loading:!0},o.columns=[{title:"ID",dataIndex:"index",key:"index"},{title:"\u540d\u79f0",dataIndex:"name",key:"name"},{title:"\u63cf\u8ff0",dataIndex:"desc",key:"desc"},{title:"\u4e0a\u4f20",key:"upload",render:function(e,t){return u.a.createElement("span",null,u.a.createElement(T,{index:t.index}))}},{title:"\u64cd\u4f5c",key:"action",render:function(e,t){return u.a.createElement("span",null,u.a.createElement(d.b,{to:"labels?".concat(t.index,"&tag=").concat(t.default_tags,"&label=").concat(t.allow_label_types)},"\u5f00\u59cb\u6807\u6ce8"),u.a.createElement(p.a,{type:"vertical"}),u.a.createElement(d.b,{to:"labeled?".concat(t.index)},"\u67e5\u770b\u5df2\u6807\u6ce8"),u.a.createElement(p.a,{type:"vertical"}),u.a.createElement(d.b,{to:"taskdetails?".concat(t.index)},"\u8be6\u60c5"),u.a.createElement(p.a,{type:"vertical"}),u.a.createElement(d.b,{to:"tasks/new?".concat(t.index)},"\u7f16\u8f91"),u.a.createElement(p.a,{type:"vertical"}),u.a.createElement(d.b,{to:"check?".concat(t.index)},"\u8d28\u68c0"),u.a.createElement(p.a,{type:"vertical"}),u.a.createElement("a",{href:"javascript:;",onClick:function(){o.export(t.index)}},"\u5bfc\u51fa"),u.a.createElement(p.a,{type:"vertical"}),u.a.createElement("a",{href:"javascript:;",onClick:function(){o.export(t.index,"zip")}},"\u5bfc\u51fazip"),u.a.createElement(p.a,{type:"vertical"}),u.a.createElement(f.a,{title:"\u786e\u5b9a\u5220\u9664\u5de5\u7a0b?",onConfirm:o.confirm.bind(Object(s.a)(Object(s.a)(o)),t.index),okText:"\u662f",cancelText:"\u5426"},u.a.createElement("a",{href:"javascript:;"},"\u5220\u9664")))}}],o.export=function(e,t){var a={task_id:e};t&&(a.export_type="single"),x.a.getExport(E.a.stringify(a)).then(function(e){200===e.code&&(m.a.success("\u5bfc\u51fa\u6210\u529f"),window.open(e.data.url))})},o.confirm=function(e){x.a.delTask({index:e}).then(function(t){if(console.log(t),200===t.code){var a,n=o.state,c=n.data,r=n.total;c.forEach(function(t,n){t.index===e&&(a=n)}),c.splice(a,1),o.setState({data:c,total:r}),m.a.success("\u5220\u9664\u6210\u529f")}else m.a.success(t.message)}).catch(function(e){console.log(e)})},o.getData=function(e){x.a.getTask(E.a.stringify({page:e||1})).then(function(e){if(200===e.code){var t=e.data;t.forEach(function(e){e.key=e.index}),o.setState({data:t,loading:!1,total:e.total})}else m.a.error(e.message),o.props.history.push("/login")}).catch(function(){m.a.error("\u8bf7\u6c42\u5931\u8d25")})},o.onChange=function(e){o.getData(e)},a))}return Object(i.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){this.getData()}},{key:"render",value:function(){return u.a.createElement(u.a.Fragment,null,u.a.createElement(d.b,{to:"/tasks/new"},u.a.createElement(g.a,{className:v.a.btn,type:"primary"},"\u65b0\u5efa\u4efb\u52a1")),u.a.createElement(h.a,{columns:this.columns,dataSource:this.state.data,loading:this.state.loading,pagination:!1}),u.a.createElement(k.a,{showQuickJumper:!0,className:v.a.page,onChange:this.onChange,defaultPageSize:10,defaultCurrent:1,total:this.state.total}))}}]),t}(l.Component);t.default=_},607:function(e,t,a){"use strict";var n=a(22),o=a(105).a.version;t.a={getTask:function(e){return n.b("".concat(o,"task"),e)},postTask:function(e){return n.c("".concat(o,"task"),e)},putTask:function(e){return n.d("".concat(o,"task"),e)},delTask:function(e){return n.a("".concat(o,"task"),e)},getExport:function(e){return n.b("".concat(o,"export"),e)},getLabelUsers:function(){return n.b("".concat(o,"options/label_users"))},getCheckUsers:function(){return n.b("".concat(o,"options/check_users"))},getTaskDetail:function(e){return n.b("".concat(o,"task/detail"),e)},getTaskDetailInfo:function(e){return n.b("".concat(o,"task/detail_info"),e)}}},757:function(e,t,a){e.exports={btn:"_1-fyFXQkx76XgLCkOBcqWC",page:"_3SpmDwL9-iauzj0uSiKy-E"}}}]);