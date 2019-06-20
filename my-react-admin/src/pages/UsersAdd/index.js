import React, { Component } from 'react';
import {
  Row, Col, Button,Form, Input, Select, message
} from 'antd';
// import styles from './styles/index.module.less';
import API from '@/axios/api_user'

const DATANAME = ['username','password','role_id','distributor_id','email','phone']
const { Option } = Select;

class RegistrationForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        for(let i in values){
          if(!values[i]) delete values[i]
        }
        API.usersAdd(values).then((res)=>{
          if(res.code === 200){
            message.success('创建成功')
            this.props.history.goBack();
          }else{
            message.error(res.message)
          }
        })
      }
    });
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

    return (
      <Form {...formItemLayout}>
        <Form.Item
          label='用户名'
        >
          {getFieldDecorator(DATANAME[0], {
            rules: [{ required: true, message: '请输入用户名!', whitespace: true }],
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item
          label='密码'
        >
          {getFieldDecorator(DATANAME[1], {
            rules: [{ required: true, message: '请输入密码!', whitespace: true }],
          })(
            <Input />
           
          )}
        </Form.Item>
        <Form.Item
          label='用户角色'
        >
          {getFieldDecorator(DATANAME[2], {
            // initialValue: "0",
            rules: [{ required: true, message: '请输入用户角色!', whitespace: true }],
          })(
            <Select >
              <Option value="0">管理员</Option>
              <Option value="5">渠道商</Option>
              <Option value="10">普通用户</Option>
            </Select>
          )}
        </Form.Item>

        <Form.Item
          label='渠道商id'
        >
          {getFieldDecorator(DATANAME[3], {
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item
          label='邮箱'
        >
          {getFieldDecorator(DATANAME[4], {
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item
          label='手机号'
        >
          {getFieldDecorator(DATANAME[5], {
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" onClick={this.handleSubmit}>添加用户</Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(RegistrationForm);



const UsersAdd = (props) => {
  return (
    <>
      <Row>
        <Col span={12}>
          <WrappedRegistrationForm {...props}/>
        </Col>
      </Row>
    </>
  )
}




export default UsersAdd;
