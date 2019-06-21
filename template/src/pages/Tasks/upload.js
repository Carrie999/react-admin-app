import React, { Component } from 'react';
import {
  Upload, message, Button, Icon,
} from 'antd';
import axios from 'axios';
import Env from '@/axios/env.js';

class UpLoad extends React.Component {
  constructor(props) {
    super(props);
    this.propsConfig = {
    name: 'file',
    action: '',
    headers: {
      authorization: 'authorization-text',
    },
    accept:'.zip',
    withCredentials: true,
    beforeUpload: (file) => { 
      // const isZIP = file.type === 'application/zip'
      const isLt2M = file.size / 1024/1024/1024 < 1.5;
      // if (!isZIP) {
      //   message.error('请上传.zip文件');
      //   return false
      // }
      if (!isLt2M) {
        message.error('文件大小不能超过1.5G')
        return false
      }
    },
    customRequest : (files)=>{
      const { file } = files
      let formData = new FormData();
      formData.append("task_id",this.props.index);
      formData.append("file", file);
      const config = {
        method: 'POST',
        url: `${Env.baseURL}api/v1/package`,
        data: formData,
        headers: { 'content-type': 'multipart/form-data' },
      }
      axios(config).then((res) => {
          console.log(res.data)
          if(res.data.code === 200){
            message.success('上传成功')
          }else{
            message.error('上传失败')
          }
        }).catch((e) => {
          console.log(e)
        });
      console.log(33333,files)
    },
    onRemove: (file) => {
      console.log(file)
    },
    onStart: (file) => {
      console.log('onStart', file.name);
    },
    onSuccess(file) {
      console.log('onSuccess', file);
    },
    onProgress(step, file) {
      console.log('onProgress', Math.round(step.percent), file.name);
    },
    onError(err) {
      console.log('onError', err);
    },
  
  
    }
  }
 
  triggerChange = (changedValue) => {
    // Should provide an event to pass value to Form.
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(changedValue);
    }
  }

  render(){
    return (
      <Upload {...this.propsConfig} {...this.props}>
        <Button>
          <Icon type="upload" /> 点击上传
        </Button>
      </Upload>
    )
  }
}
export default UpLoad