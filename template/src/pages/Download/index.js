import React, { Component } from 'react';
import styles from './styles/index.module.less';
import { Button } from 'antd';
import { Table } from 'antd';
// import { Resizable } from 'react-resizable';
import API from '@/axios/api_dataset'



class Demo extends React.Component {
  render() {
    return (
      <Table
        bordered
        columns={this.props.columns}
        dataSource={this.props.data}
        scroll={{ x: 1500 }}
      />
    );
  }
}




class Download extends Component {
  state ={
    columns: [{
      title: 'ID',
      dataIndex: 'id_',
      width: 200,
      fixed: 'left',
    }, {
      title: '名称',
      dataIndex: 'dataset_name',
      width: 100,
      fixed: 'left',
    }, {
      title: '图片数量',
      dataIndex: 'image_cnt',
      width: 100,
      fixed: 'left',
    }, {
      title: 'Note',
      dataIndex: 'note',
      width: 100,
    }, {
      title: 'Action',
      key: 'action',
      render: () => (
        <a href="javascript:;">Delete</a>
      ),
    }],
    data1 : [{
      key: 0,
      id_: '2018-02-11',
      dataset_name: 120,
      type: 'income',
      note: 'transfer',
    }],
    data2 : [{
      key: 0,
      id_: '2018-02-11',
      dataset_name: 120,
      type: 'income',
      note: 'transfer',
    }]
  }
  sdkDownload = ()=>{
    console.log('sdkDownload')
  }
  componentDidMount = ()=>{
    // API
  }
  render() {  
    return (
      <>
        <p>测试结果准确率 <span className ={styles.percent}>99.3%</span></p>
        <p>训练数据集字符分布</p>
        <Demo data={this.state.data1} columns={this.state.columns} />
        <p>测试数据集字符分布</p>
        <Demo data={this.state.data2} columns={this.state.columns} />
        <Button type="primary" onClick={this.sdkDownload} className ={styles.buttonRight}>SDK下载</Button>
        <Button type="primary" onClick={this.sdkDownload} >离线测试程序下载</Button>
      </>
    );
  }
}



export default Download;
