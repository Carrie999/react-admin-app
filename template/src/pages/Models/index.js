import React, { Component } from 'react';
import styles from './styles/index.module.less';
import { Link } from 'react-router-dom'
import { Table, Divider, Tag, Button, message, Popconfirm } from 'antd';
import API from '@/axios/api_project'
import { TAGCOLORS } from '@/libs/constant'

let TIMES = 0



class Models extends Component {
  state = {
    data: [],
    loading: true
  }
  columns = [{
    title: '工程ID',
    dataIndex: 'id_',
    key: 'id_',
    // render: text => <a href="javascript:;">{text}</a>,
  }, {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: '类型',
    dataIndex: 'category',
    key: 'category',
  }, {
    title: '所属项目',
    dataIndex: 'alias_project',
    key: 'alias_project',
  }, {
    title: '标签',
    key: 'labels',
    dataIndex: 'labels',
    render: tags => (
      <span>
        {tags.map((tag, index) => {
          let color
          if (index + TIMES > 9 ) {
            index = 0
            TIMES = 1
          }
          color = TAGCOLORS[index+TIMES];
          TIMES = TIMES + 3
          return <Tag color={color} key={tag}>{tag.toUpperCase()}</Tag>;
        })}
      </span>
    ),
  }, {
    title: '状态',
    dataIndex: 'procedure',
    key: 'procedure',
  }, {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <span>
        <Link to={ `/models/view?${record.index}`}>查看</Link>
        <Divider type="vertical" />
        <Link to={`/models/edit?${record.index}`}>编辑</Link>
        <Divider type="vertical" />
          <Popconfirm title="确定删除工程?" onConfirm={this.confirm.bind(this,record.index)} okText="是" cancelText="否">
            <a href="javascript:;">删除</a>
          </Popconfirm>
        <Divider type="vertical" />
        <a href="javascript:;">SDK下载</a>
      </span>
    ),
  }];
  
  confirm = (id) => {
    API.delProject({index:id}).then((res) => {
      if (res.code === 200) {
        let { data } = this.state
        let _index  // 找出索引

        data.forEach((item, index)=>{
          if(item.index === id)  _index = index
        })
        // 删除索引
        data.splice(_index,1)

        this.setState({data})
        message.success('删除成功')
      } else {
        message.success(res.message)
      }
    }).catch((err)=>{
      console.log(err)
    })
  }
  
  componentDidMount = () => {
    this.getProject()
  }
  
  getProject = () => {
    API.getProject().then((res)=>{
      if (res.code === 200) {
        const { data } = res
        data.forEach(element => {
          element.key =  element.id_
        });
        this.setState({ data ,loading: false})
      } else {
        message.error(res.message)
      }
    }).catch(() => {
      message.error('请求失败')
    })
  }

  render() {  
    return (
      <>
       	<Link to="/models/new">
          <Button className={styles.btn} type="primary">创建训练工程</Button> 
        </Link>
        <Table columns={this.columns} dataSource={this.state.data} loading={this.state.loading}/>
      </>
    );
  }
}




export default Models;
