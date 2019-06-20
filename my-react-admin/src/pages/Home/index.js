import React, { Component } from 'react';
import { Layout, Menu, Icon, Dropdown, message} from 'antd';
import { Route, Link } from 'react-router-dom'
// import { PrivateRoute } from "@/pages/Login";
import styles from './styles/index.module.less';
import logo from '@/assets/imgs/logo.png'
import Sidebar from '@/components/SideBar';
import data from '@/components/SideBar/sidebarData';
// import Example from '@/pages/Example/Loadable';
import BreadcrumbWrap from '@/components/Breadcrumb';
import autoPageRouter from '../index'
import API from '@/axios/api_user'

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
  
  plus(){
    console.log('plus')
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  signOut = () => {
    API.signOut().then((res) => {
      if(res.code === 200){
        store.set('isLoggedIn', false);
        store.remove('username');
        this.props.history.push('/login')
      }else{
        message.error(res.message)
      }
    }).catch((err) => {
      console.log(err)
    })
  }

  render() { 
    // 面包屑随route变化而变化
    let breadcrumbOne, breadcrumbTwo, breadcrumbThree
    const pathname = this.props.location.pathname.slice(1,)
    data.forEach(element => {
      element.children.forEach(item => {
        if (item.link === pathname) {
          breadcrumbOne = element.group
          breadcrumbTwo = item.tit
          if (pathname.includes('/')) {
            breadcrumbTwo =  <Link to={`/${element.children[0].link}`}> {element.children[0].tit} </Link>
            breadcrumbThree = item.tit
          }
        }
      })  
    });

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
                  : <span className={ styles.logoText }>工业视觉</span>
              }
            </div>
            <Sidebar></Sidebar> 
          </Sider>
          <Layout>
            <Header style={{ padding: 0 }}>
              { /* 侧边栏宽度切换,没有美感，去掉 */ }
              {/* <Icon
                className={styles.trigger}
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              /> */}
              <span className={ styles.userName }>
                <Dropdown overlay={menu}>
                  {/* 织雪纱奈 */}
                  <span>{ store.get('username') || '我' } &nbsp;<Icon type="down" /> </span> 
                </Dropdown>
              </span>
            </Header>
            <div style={{
              marginLeft: '24px',
              marginTop: '10px'
            }}>
              <BreadcrumbWrap one={ breadcrumbOne } two={ breadcrumbTwo} three = { breadcrumbThree } > </BreadcrumbWrap>
            </div>
              <Content style={{
                margin: '12px 16px', padding: 24, background: '#fff', minHeight: 280,
              }}>
                {Object.keys(autoPageRouter).map(item => (
                  <Route path={item} key={item} exact component={autoPageRouter[item]} />
                ))}
              </Content>
          </Layout>
      </Layout>
      </div>
    );
  }
}

export default Home;
