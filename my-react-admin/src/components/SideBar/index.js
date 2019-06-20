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

class Sidebar extends React.Component {
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
        return ( 
          <Menu.Item key={ child.id }>
            <Link to={ '/' + child.link }>
              <Icon type={ child.icon }  />
              <span>{ child.tit }</span>
            </Link>
          </Menu.Item>
        )
      }
    })
  }

  render() {
    return (
      <div >
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
        >
        {
          sidebarData.map((item)=>{
            const { children } = item
            return (
              // <MenuItemGroup key={ item.group } title={item.group}>
              this.getChildren(children)
              // </MenuItemGroup>
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
