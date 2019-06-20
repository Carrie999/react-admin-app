import React, { Component } from 'react';
import styles from './styles/index.module.less';
import API from '@/axios/api_user'
import {
  Form, Input, Select, Row, Col, Button, message,
} from 'antd';

const DATANAME = [ 
  "username",
  "user_id",
  "role_desc",
  "distributor_id",
  "is_active",
]
const { Option } = Select;


class RegistrationForm extends Component {
  state ={
    data: ''
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
     
        API.usersEdit(window.location.search.slice(1,),values).then((res)=>{
          if(res.code === 200){
            message.success('修改成功')
            this.props.history.goBack();
          }else{
            message.error(res.message)
          }
        })
      }
    });
  }
 
  componentDidMount = () =>{
    let data
    const roleMapping = {}
    let promise1 = API.getUserOne(window.location.search.slice(1,)).then((res)=>{
      if (res.code === 200) {
        data = res.data
        return 1
      }
    })
    let promise2 = API.getUsersRoles().then((res)=>{
      const { data } = res
      data.map((item)=>{
        roleMapping[item.id] = item.desc
      })
      return 2
    })
    Promise.all([promise1,promise2]).then(() =>{
      this.setState({data,roleMapping})
    })
  }
  
  getSelects = ()=>{
    if(this.state.roleMapping){
      const {roleMapping} = this.state
      let children = []
      for (let i in roleMapping) { 
        children.push(<Option key={i} value={i}>{roleMapping[i]}</Option>) 
      }
      return children
    }
  }
  render() {  
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 19 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 19,
          offset: 5,
        },
      },
    };
    if(this.state.data){
      return (
        <div className={styles.example}>
          <Form {...formItemLayout}>
            <Form.Item
              label='用户名'
            >
              <Input defaultValue={this.state.data[DATANAME[0]]} disabled={true}/>
            </Form.Item>
            <Form.Item
              label='用户ID'
            >
                <Input defaultValue={this.state.data[DATANAME[1]]} disabled={true}/>
            </Form.Item>
            <Form.Item
              label='用户角色'
            >
              {getFieldDecorator('role_id', {
                initialValue: this.state.roleMapping[this.state.data.role_id],
                rules: [{ required: true, message: '请输入用户角色!', whitespace: true }],
              })(
                <Select >
                  { this.getSelects() }
                </Select>
              )}
            </Form.Item>
            <Form.Item
              label='所属渠道商'
            >
              {getFieldDecorator(DATANAME[3], {
                initialValue: this.state.data[DATANAME[3]],
                // rules: [{ required: true, message: '请输入所属渠道商!' }],
              })(
                <Input />
              )}
            </Form.Item>
            <Form.Item
              label='是否有效'
            >
              {/* {getFieldDecorator(DATANAME[4], {
                initialValue: this.state.data[DATANAME[4]],
                // rules: [{ required: true, message: '请输入用户名!', whitespace: true }],
              })( */}
                <Input defaultValue={this.state.data[DATANAME[4]]} disabled={true}/>
              {/* )} */}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" onClick={this.handleSubmit}>保存</Button>
            </Form.Item>
          </Form>
        </div>
      );
    }else {
      return ('')
    }
  }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(RegistrationForm);

function UsersEdit(props) {
  return (
    <>
      <Row>
        <Col span={12}>
          <WrappedRegistrationForm {...props} />
        </Col>
      </Row>
    </>
  );
}


export default UsersEdit;
