import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Table, Divider, Tag, Button, Popconfirm, message, Pagination } from 'antd';
import styles from './styles/index.module.less';
import API from '@/axios/api_dataset'
import { TAGCOLORS } from '@/libs/constant'
import qs from 'qs'
let TIMES = 0


class Datasets extends Component {
  state = {
    data: [],
    loading: true
  }
  columns = [{
    title: '数据ID',
    dataIndex: 'id_',
    key: 'id_',
  }, {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
  },{
    title: '类型',
    dataIndex: 'category',
    key: 'category',
  }, {
    title: '所属项目',
    dataIndex: 'alias_project',
    key: 'alias_project',
  }, {
    title: '图例树',
    dataIndex: 'image_cnt',
    key: 'image_cnt',
  }, {
    title: '打码设备',
    dataIndex: 'device',
    key: 'device',
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
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <span>
        <Link to={`/datasets/view?${record.index}`}>查看</Link>
        <Divider type="vertical" />
        <Popconfirm title="确定删除工程?" onConfirm={this.confirm.bind(this,record.index)} okText="是" cancelText="否">
          <a href="javascript:;">删除</a>
        </Popconfirm>
      </span>
    ),
  }];
  
  componentDidMount= () => {
    this.getDataset()
  }

  confirm = (id) => {
    API.delDataset({index:id}).then((res) => {
      if (res.code === 200) {
        let { data, total } = this.state
        let _index  // 找出索引

        data.forEach((item, index)=>{
          if(item.index === id)  _index = index
        })
        // 删除索引
        data.splice(_index,1)

        this.setState({data,total})
        message.success('删除成功')
      } else {
        message.success(res.message)
      }
    }).catch((err)=>{
      console.log(err)
    })
  }

  getDataset = (page)=>{
  
    API.getDataset(qs.stringify({page:page?page:1})).then((res)=>{
      if (res.code === 200) {
        const { data } = res
        console.log(res)
        data.forEach(element => {
          element.key =  element.id_
        });
        this.setState({ data,loading: false,total:res.total})
      } else {
        message.error(res.message)
      }
    }).catch(() => {
      message.error('请求失败')
    })
  }
  onChange = (page)=>{
    console.log(page)
    this.getDataset(page)
  }
  render() {  
    return (
      <>
        <Link to="/datasets/new">
          <Button className={styles.btn} type="primary">创建数据集</Button> 
        </Link>
        <Table columns={this.columns} dataSource={this.state.data} loading={this.state.loading}
        pagination = {false}/>
        <Pagination className={styles.page} onChange={this.onChange} defaultPageSize={10} defaultCurrent={1} total={this.state.total} />
      </>
    );
  }
}


export default Datasets;
