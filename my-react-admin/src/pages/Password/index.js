import React from 'react';
// import styles from './styles/index.module.less';
import {
  Form, Input, Row, Col, Button, message
} from 'antd';
import API from '@/axios/api_user'



class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        delete values['confirm']
        API.usersEditPW(values).then((res)=>{
          if (res.code === 200) {
            message.success('修改密码成功')
            this.props.history.push('/login');
          } else {
            message.error(res.message)
          }
        })
      }
    });
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次新密码不一致!');
    } else {
      callback();
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  handleWebsiteChange = (value) => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
    }
    this.setState({ autoCompleteResult });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 15 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 20,
          offset: 4,
        },
      },
    };
  

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
         <Form.Item
          label="原密码"
        >
          {getFieldDecorator('old_password', {
            rules: [{
              required: true, message: '请输入原密码!',
            }, {
              validator: this.validateToNextPassword,
            }],
          })(
            <Input type="password" />
          )}
        </Form.Item>

        <Form.Item
          label="新密码"
        >
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: '请输入新密码!',
            }, {
              validator: this.validateToNextPassword,
            }],
          })(
            <Input type="password" />
          )}
        </Form.Item>
        <Form.Item
          label="新密码"
        >
          {getFieldDecorator('confirm', {
            rules: [{
              required: true, message: '请再次输入新密码!',
            }, {
              validator: this.compareToFirstPassword,
            }],
          })(
            <Input type="password" onBlur={this.handleConfirmBlur} />
          )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">修改密码</Button>
        </Form.Item>
        
      </Form>
    );
  }
}
const WrappedRegistrationForm = Form.create({ name: 'register' })(RegistrationForm);


const Password = (props) => {
  return (
    <>
      <Row>
      <Col span={10}>
        <WrappedRegistrationForm {...props}/>
      </Col>
    </Row>
    </>
  );
}




export default Password;
