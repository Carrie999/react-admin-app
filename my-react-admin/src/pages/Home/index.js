import React, { Component } from 'react';
import { Layout, Menu, Icon, Dropdown} from 'antd';
import { Route } from 'react-router-dom'
import { PrivateRoute } from "@/pages/Login";
import styles from './styles/index.module.less';
import logo from '@/assets/imgs/logo.png'
import Sidebar from '@/components/SideBar';
import Example from '@/pages/Example/Loadable';
import BreadcrumbWrap from '@/components/Breadcrumb';

const { Header, Sider, Content } = Layout;
const Store = require('locallyjs').Store,
      store = new Store();




class Home extends Component {
  state = {
      collapsed: false,
  };
  
  plus(){
    console.log('plus')
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  signOut = () => {
    store.set('isLoggedIn', false);
    this.props.history.push('/login')
  }

  render() { 
    const menu = (
      <Menu>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" onClick={this.signOut}>退出登陆</a>
        </Menu.Item>
      </Menu>
    );
    return (
      <div>
        <Layout>
          <Sider
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
          >
            <div className={styles.logo}>
              {
                this.state.collapsed 
                  ? <img className={ styles.logoImg } src={logo} />
                  : <span className={ styles.logoText }>后台管理平台</span>
              }
            </div>
            <Sidebar></Sidebar> 
          </Sider>
          <Layout>
            <Header style={{ padding: 0 }}>
              <Icon
                className={styles.trigger}
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              />
              <span className={ styles.userName }>
                <Dropdown overlay={menu}>
                  <span>织雪纱奈 &nbsp;<Icon type="down" /> </span> 
                </Dropdown>
              </span>
            </Header>
            <div style={{
                marginLeft: '24px',
                marginTop: '10px'
            }}>
              <BreadcrumbWrap one={'item1'}> </BreadcrumbWrap>
            </div>
              <Content style={{
                margin: '12px 16px', padding: 24, background: '#fff', minHeight: 280,
              }}
              >
                 content<Route path="/home1" exact component={Example} />
              </Content>
          </Layout>
      </Layout>
      </div>
    );
  }
}

export default Home;
