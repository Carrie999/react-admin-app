import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom'
import styles from './styles/index.module.less';
import MeteorShower from './star'
import {
  Form, Icon, Input, Button,
} from 'antd';

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
  
  componentDidMount = () => {
   
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
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer } = this.state

    if (redirectToReferrer === true) {
      return <Redirect to={from} />
    }

    return (
      <div className={styles.loginWrap}>
        <MeteorShower></MeteorShower>
        <h2 className={styles.projectName}>后台管理平台</h2> 
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
        this.props.login()
        console.log('Received values of form: ', values);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className={styles['login-form']}>
        <Form.Item>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
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
            登陆
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

export default Login;
