(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{1008:function(e,a,t){"use strict";t.r(a);var n=t(64),r=t(65),l=t(40),s=t(66),i=t(67),c=t(0),o=t.n(c),u=t(979),d=t.n(u),m=t(197),p=t(736),f=t(575),h=t(573),b=t(574),E=t(130),g=t(595),v=t(596),w=["username","user_id","role_desc","distributor_id","is_active"],O=p.a.Option,j=function(e){function a(){var e,t,r;Object(n.a)(this,a);for(var i=arguments.length,c=new Array(i),u=0;u<i;u++)c[u]=arguments[u];return Object(l.a)(r,(t=r=Object(l.a)(this,(e=Object(s.a)(a)).call.apply(e,[this].concat(c))),r.state={data:""},r.handleSubmit=function(e){e.preventDefault(),r.props.form.validateFieldsAndScroll(function(e,a){e||(console.log("Received values of form: ",a),m.a.usersEdit(window.location.search.slice(1),a).then(function(e){200===e.code?(f.a.success("\u4fee\u6539\u6210\u529f"),r.props.history.goBack()):f.a.error(e.message)}))})},r.componentDidMount=function(){var e,a={},t=m.a.getUserOne(window.location.search.slice(1)).then(function(a){if(200===a.code)return e=a.data,1}),n=m.a.getUsersRoles().then(function(e){return e.data.map(function(e){a[e.id]=e.desc}),2});Promise.all([t,n]).then(function(){r.setState({data:e,roleMapping:a})})},r.getSelects=function(){if(r.state.roleMapping){var e=r.state.roleMapping,a=[];for(var t in e)a.push(o.a.createElement(O,{key:t,value:t},e[t]));return a}},t))}return Object(i.a)(a,e),Object(r.a)(a,[{key:"render",value:function(){var e=this.props.form.getFieldDecorator;return this.state.data?o.a.createElement("div",{className:d.a.example},o.a.createElement(h.a,{labelCol:{xs:{span:24},sm:{span:5}},wrapperCol:{xs:{span:24},sm:{span:19}}},o.a.createElement(h.a.Item,{label:"\u7528\u6237\u540d"},o.a.createElement(b.a,{defaultValue:this.state.data[w[0]],disabled:!0})),o.a.createElement(h.a.Item,{label:"\u7528\u6237ID"},o.a.createElement(b.a,{defaultValue:this.state.data[w[1]],disabled:!0})),o.a.createElement(h.a.Item,{label:"\u7528\u6237\u89d2\u8272"},e("role_id",{initialValue:this.state.roleMapping[this.state.data.role_id],rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u7528\u6237\u89d2\u8272!",whitespace:!0}]})(o.a.createElement(p.a,null,this.getSelects()))),o.a.createElement(h.a.Item,{label:"\u6240\u5c5e\u6e20\u9053\u5546"},e(w[3],{initialValue:this.state.data[w[3]]})(o.a.createElement(b.a,null))),o.a.createElement(h.a.Item,{label:"\u662f\u5426\u6709\u6548"},o.a.createElement(b.a,{defaultValue:this.state.data[w[4]],disabled:!0})),o.a.createElement(h.a.Item,{wrapperCol:{xs:{span:24,offset:0},sm:{span:19,offset:5}}},o.a.createElement(E.a,{type:"primary",onClick:this.handleSubmit},"\u4fdd\u5b58")))):""}}]),a}(c.Component),k=h.a.create({name:"register"})(j);a.default=function(e){return o.a.createElement(o.a.Fragment,null,o.a.createElement(g.a,null,o.a.createElement(v.a,{span:12},o.a.createElement(k,e))))}},595:function(e,a,t){"use strict";var n=t(264);a.a=n.a},596:function(e,a,t){"use strict";var n=t(196);a.a=n.a},979:function(e,a,t){e.exports={example:"_3ZX2Kb8bdKfanWQMmhgkTj"}}}]);