import React, { Component } from 'react';
import { Layout, Menu, Icon, Dropdown, message, Col, Row } from 'antd';
import { Route, Link, Redirect } from 'react-router-dom'

// import { PrivateRoute } from "@/pages/Login";
import styles from './styles/index.module.less';
import logo from '@/assets/imgs/logo.png'
import Sidebar from '@/components/SideBar';
import data from '@/components/SideBar/sidebarData';
// import Example from '@/pages/Example/Loadable';
import BreadcrumbWrap from '@/components/Breadcrumb';
import autoPageRouter from '../index'
import NotFound from '@/pages/NotFount';


const { Header, Sider, Content } = Layout;
const Store = require('locallyjs').Store,
      store = new Store();


class Home extends Component {
  constructor(props){
    super(props)
    this.state = {
      collapsed: false,
    };
  }
  componentDidMount = () =>{
  }

  plus(){
    console.log('plus')
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  signOut = () => {
    this.props.history.push('/login')
  }

  render() { 
    // 面包屑随route变化而变化
    let breadcrumbOne, breadcrumbTwo, breadcrumbThree
    const pathname = this.props.location.pathname.slice(1,)
    data.forEach(element => {
      element.children.forEach(item => {
        if (item.link === pathname) {
          breadcrumbOne = item.tit
          if (item.parentTit) {
            breadcrumbOne =  <Link to={ item.parentLink }> {item.parentTit} </Link>
            breadcrumbTwo = item.tit
          }
        }
      })  
    });

    const menu = (
      <Menu>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" onClick={this.signOut}>退出登录</a>
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
                  : <span className={ styles.logoText }> &nbsp;&nbsp;后台管理模版</span>
              }
            </div>
            <Sidebar></Sidebar> 
          </Sider>
        
          <Layout>
            <Header style={{ padding: '0 5px' }}>
              <Icon
                className={styles.trigger}
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              />
              <div className={ styles.logo2 }>
                <Dropdown overlay={menu}>
                  <span>{ store.get('username') || '我' } &nbsp;<Icon type="down" /> </span> 
                </Dropdown>
              </div>
            </Header>
              <div style={{
                marginLeft: '24px',
                marginTop: '10px'
              }}>
                <BreadcrumbWrap one={ breadcrumbOne } two={ breadcrumbTwo} three = { breadcrumbThree } > </BreadcrumbWrap>
              </div>
              <Content style={{
                margin: '12px 16px', padding: 24, background: '#fff', minHeight: 600,
              }}>
                <Route exact path="/" render={() => (
                  <Redirect to="/tasks"/>
                )}/>
                {Object.keys(autoPageRouter).map(item => (
                  <Route path={item} key={item} exact component={autoPageRouter[item]} />
                ))}
                { ! Object.keys(autoPageRouter).includes(this.props.location.pathname)
                    ? <Route path="*" component={NotFound} />
                    : '' }
              </Content>
          </Layout>
      </Layout>
      </div>
    );
  }
}

export default Home;
