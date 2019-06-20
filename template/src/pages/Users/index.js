import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Table, Icon, Row, Col, Button, Popconfirm, message, Divider } from 'antd';
import styles from './styles/index.module.less';
import API from '@/axios/api_user'

const Store = require('locallyjs').Store,
      store = new Store()

class UsersList extends React.Component {
  state = {
    data: [],
    loading: true
  }

  columns =  [{
    title: '用户ID',
    dataIndex: 'user_id',
    width: 200,
  }, {
    title: '用户名',
    dataIndex: 'username',
    width: 100,
  }, {
    title: '用户角色',
    dataIndex: 'role_desc',
    width: 100,
  }, {
    title: '角色ID',
    dataIndex: 'role_id',
    width: 100,
  }, 
  {
    title: '所属渠道商',
    dataIndex: 'distributor_id',
    width: 100,
  },
  {
    title: '是否有效',
    dataIndex: 'is_active',
    width: 100,
    render: (text) => (
      <span style={{color:text?'':'red'}}>{ text?'是':'否' }</span>
    ),
  },
  {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <span>
        <Popconfirm title="确定删除用户?" onConfirm={this.confirm.bind(this,record.user_id)} okText="是" cancelText="否">
          <a href="javascript:;">删除</a>
        </Popconfirm>
        <Divider type="vertical" />
        <Link to={`/users/edit?${record.user_id}`}>修改</Link>
      </span>
    ),
  }]

  confirm = (id) => {
    API.usersDel(id).then((res) => {
      if (res.code === 200) {
        this.getUsers()
        message.success('删除成功')
      } else {
        message.success(res.message)
      }
    }).catch((err)=>{
      console.log(err)
    })
  }
  
  componentDidMount = () => {
    this.getUsers()
  }

 
  getUsers = ()=>{
    API.getUsers().then((res)=>{
      if (res.code === 200) {
        const { data, total } = res
        data.forEach(element => {
          element.key =  element.user_id
        });
        this.setState({ data , loading: false, total})
      } else {
        message.error(res.message)
      }
    })
  }

  render() {
    return (
      <Table
        bordered
        columns={this.columns}
        dataSource={this.state.data}
        pagination={{ total: this.state.total || 10 }}
      />
    );
  }
}




class Users extends Component {
  state = {
    invite_code: ""
  }
  componentDidMount = () => {
   
  }
  getInviteCode = ()=>{
    API.getInviteCode().then((res)=>{
      if (res.code === 200) {
        this.setState({invite_code: res.data.invite_code})
      } else {
        message.error(res.message)
      }
    })
  }
 
  copy = () => {
    const params = this.state.invite_code
    // 创建透明dom
    let para=document.createElement("p");
    let node=document.createTextNode(params);
    para.id = 'copyMy'
    para.style.opacity = '0' 
    para.style.position = 'absolute' 
    para.appendChild(node);
    let element=document.getElementById("copyId");
    element.appendChild(para);

    // excute copy command
    document.getElementById('copyMy');
    let val = document.getElementById('copyMy');
    window.getSelection().selectAllChildren(val);
    document.execCommand ("Copy");
    message.success('已复制到粘贴版',0.5)
     // 删除透明dom
    element.removeChild(para);
  }

  render() {  
    if(store.get('role_id') == 5){
      return (
        <>
          <Button type="primary" onClick ={this.getInviteCode} className = {styles.btnBottom}>生成邀请码</Button>
          { this.state.invite_code 
            ? <>
              <h4 id='copyId'>邀请码:</h4>
              <Row>
                <Col span={3}><p className={styles.invitation}>{ this.state.invite_code }</p></Col>
                <Col span={12}> 
                  <Button className={styles.copy} onClick={this.copy} type="primary" shape="circle" icon="copy" size='large'/>
                  <span className={styles.span} onClick={this.copy} >复制</span>
                </Col>
              </Row> 
            </>
            : ''}
          {/* next version
           / <h4>我邀请的用户:</h4>
           <Demo /> */}
        </>
      )
    }else if(store.get('role_id') == 0){
      return (
        <>
          <Link to={'/users/add'}>
            <Button type="primary" onClick ={this.addUser} className = {styles.btnBottom}>添加用户</Button>
          </Link>
          <UsersList />
        </>
      )
    }
  }
}




export default Users;
