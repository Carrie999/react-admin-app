import React from 'react';
import styles from './styles/index.module.less';
import {
  Form, Icon, Input, Button, Row, Col, message
} from 'antd';
import API from '@/axios/api_user'


const Reset = (props)=> {
  return (
    <div className={styles.loginWrap}>
      <h2 className={styles.projectName}>重置密码</h2> 
      <div className={styles.box}>
        <WrappedNormalLoginForm {...props}/>
      </div>
    </div>
  );
}


class NormalLoginForm extends React.Component {
  state = {
    isSentCaptcha: false,
    second: 60
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        API.resetPW(values).then((res)=>{
          if (res.code === 200) {
            message.success('重置成功')
            this.props.history.goBack();
          } else {
            message.error('重置失败')
          }
        }).catch((err)=>{
          console.log(err)
          message.error('网络错误')
        })
      }
    });
  }
  sentCaptcha = () =>{
    this.props.form.validateFields(['username'],(err, values) => {
      if (!err) {
        const { username } = values
        if(!(/^1[34578]\d{9}$/.test(username))){ 
          message.error("请输入有效的手机号");  
          return false; 
        } 

        API.sendCaptcha({phone:username}).then((res)=>{
          if(res.code === 200){
            console.log(res)
          }else {
            message.error('发送失败')
            console.log(res.message)
          }
        })

        this.setState({isSentCaptcha:true})
        this.Timer = setInterval(()=>{
          if(this.state.second === 1){
            this.setState({isSentCaptcha: false, second: 60})
            clearInterval(this.Timer) 
            return
          }
          this.setState({second: this.state.second-1})
        },1000)
      }
    });
  }
  componentWillUnmount = () =>{
    if(this.Timer){
      clearInterval(this.Timer)
    }
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className={styles['login-form']}>
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '请输入手机号!' }],
          })(
            <Input prefix={<Icon type="mobile" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="手机号" />
          )}
        </Form.Item>
        <Form.Item
        >
          <Row gutter={16}>
            <Col span={14}>
              {getFieldDecorator('verify_code', {
                rules: [{ required: true, message: '请输入验证码!' }],
              })(
                <Input placeholder="验证码" />
              )}
            </Col>
            <Col span={6}>
              <Button disabled ={this.state.isSentCaptcha} className ={styles.sentCaptcha} onClick ={this.sentCaptcha}>{this.state.isSentCaptcha?`重新发送(${this.state.second})`:'发送验证码'}</Button>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入新密码!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" 
            className={styles['login-form-button']}>
            重置密码
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

export default Reset;
