import React, { Component } from 'react';
import { Pagination, message } from 'antd';
import styles from './styles/index.module.less';
import API from '@/axios/api_dataset'

class DatasetsView extends Component {
  state = {
    total: 0
  }
  onShowSizeChange =(current, pageSize)=> {
    console.log(current, pageSize);
  }
  componentDidMount = () => {
    API.getDatasetImg(window.location.search.slice(1,)).then((res)=>{
      if (res.code === 200){
        console.log(res)
        this.setState({data: res.data, total: res.total})
      }else {
        message.error('请求失败')
      }
    })
  }

  getImgs = () =>{
    const {data} = this.state
    return data.map((item)=>(
      <div className={styles.imgWrap} key = {item.url}>
        <img key = {item.url} className={styles.img} src={item.url} onError={(e)=>{e.target.onerror = null;
          e.target.src= require('@/assets/imgs/default.jpg') }}  alt={item.name}/>
        <p className={styles.imgWrapP} > {item.name.length>10 ? `${item.name.slice(0,10)}...`: item.name}</p>
      </div>
    ))
  }
  
  render() { 
    return (
      this.state.total > 0 
        ? <>
            <div>
             { this.getImgs() }
            </div>
            <span>共 {this.state.total} 张图片</span>
            <Pagination className={styles.page} showSizeChanger onShowSizeChange={this.onShowSizeChange} defaultCurrent={1} total={this.state.total} />
          </>
        : '没有图片'
    )
  }
}




export default DatasetsView;
