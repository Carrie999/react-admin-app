/**
 *
 * SideBar
 *
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon, Switch, Button, } from 'antd';
import styles from './styles/index.module.less';
import sidebarData from './sidebarData';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
// import PropTypes from 'prop-types';
const Store = require('locallyjs').Store,
      store = new Store()

class Sidebar extends React.Component {
  constructor(props){
    super(props)
    // console.log(window.location.pathname)
  }
  getChildren = (children) => {
    return children.map((child)=>{
      if(child.hasOwnProperty('list')){
        return ( 
          <SubMenu key={ child.id } title={<span><Icon type={ child.icon } /><span>{ child.tit }</span></span>}>
            {child.list.map((list, index)=>{
              return (
                <Menu.Item key={ index }>
                  <Link to={ '/' + list.link }>
                    { list.tit }
                  </Link>
                </Menu.Item>
              )
            })}
          </SubMenu>
        )
      } else {
        if(child.show === false) return
        // 如果是普通用户，看不到用户管理
        if(store.get('role_id') === 10 && child.tit === '用户管理') return
        return ( 
          <Menu.Item key={ child.id }>
            <Link to={ '/' + child.link }>
              { /* 没有icon更美 */ }
              {/* <Icon type={ child.icon }  /> */}
              <Icon type='null' />
              <span>{ child.tit }</span>
            </Link>
          </Menu.Item>
        )
      }
    })
  }
  
  routeMapComp = (item)=>{
    // 一些隐藏路径
    if(item === 'datasets/view') return 'datasets'
    if(item === 'models/view') return 'models'
    if(item === 'models/edit') return 'models'
    if(!item.includes('/')){
      return item
    }else{
      let route = '', flag = 0
      for (let i of item) {
        if(i === '/' || flag === 1) {
          flag = 1
          if(i !== '/' && flag === 1){
            route = route + i.toUpperCase()
            flag = 0
          }
        }else{
          route = route + i
        }
      }

      return route 
    }
  
  }
  render() {
    return (
      <div >
        <Menu
          selectedKeys= {[this.routeMapComp(window.location.pathname.toString().slice(1,))]}
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
        >
        {
          sidebarData.map((item)=>{
            const { children } = item
            return (
              <MenuItemGroup key={ item.group } title={item.group}>
                {this.getChildren(children)} 
              </MenuItemGroup>
            )
          })  
        }
        </Menu>
      </div>
    );
  }
}


Sidebar.propTypes = {};

export default Sidebar
