import React, { Component } from 'react';
import { Route, Redirect, Link} from 'react-router-dom'
import {
  Form, Icon, Input, Button, message
} from 'antd';
import styles from './styles/index.module.less';
import MeteorShower from './star'
import API from '@/axios/api_user'


const Store = require('locallyjs').Store,
      store = new Store()
const fakeAuth = {
  isAuthenticated: store.get('isLoggedIn') || false,
  authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100)
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
}

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    fakeAuth.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }} 
      />
  )} />
)

class Login extends Component {
  state = {
    redirectToReferrer: false
  }

  login = () => {
    store.set('isLoggedIn', true);
    // 3天过期
    store.expire('isLoggedIn', 1000*60*60*24*3); 
    fakeAuth.authenticate(() => {
      this.setState(() => ({
        redirectToReferrer: true
      }))
    })
  }

  render() {  
    const { from } = this.props.location.state || { from: { pathname: '/datasets' } }
    const { redirectToReferrer } = this.state

    if (redirectToReferrer === true) {
        return <Redirect to={from} />
    }

    return (
      <div className={styles.loginWrap}>
        <MeteorShower></MeteorShower>
        <h2 className={styles.projectName}>登录</h2> 
        <div className={styles.box}>
          <WrappedNormalLoginForm login={this.login}/>
        </div>
      </div>
    );
  }
}


class NormalLoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        API.login(values).then((res)=>{
          console.log(111,res)
          if(res.code === 200){
            store.set('username', res.data.username);

            // 0是admin， 5是商家，10是用户
            store.set('role_id', res.data.role_id);
            store.set('user_id', res.data.user_id);
            this.props.login()
          }else{
            message.error(res.message);
          }
        }).catch((err)=>{
          console.log(err)
          message.error('登录失败');
        })
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className={styles['login-form']}>
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名/手机号" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" 
            className={styles['login-form-button']}>
            登录
          </Button>
        </Form.Item>
        <p className={styles.tips}>没有帐号？
            <Link to={ '/register' }>
              注册
            </Link>
            <Link to={ '/resetpassword' }>
              <span className={styles.forgetPW}>忘记密码?</span>
            </Link>
        </p>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

export default Login;
