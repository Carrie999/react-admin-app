import React, { Component } from 'react';
import {
  Upload, message, Button, Icon,
} from 'antd';



class UpLoad extends React.Component {
   propsConfig = {
    name: 'package',
    action: '//10.60.242.105:12100/ocr/v1/file',
    headers: {
      authorization: 'authorization-text',
    },
    accept:'.zip',
    withCredentials: true,
    beforeUpload: (file) => { 
      // const isZIP = file.type === 'application/zip'
      const isLt2M = file.size / 1024/1024/1024 < 1;
      // if (!isZIP) {
      //   message.error('请上传.zip文件');
      //   return false
      // }
      if (!isLt2M) {
        message.error('文件大小不能超过1G')
        return false
      }
    },
    onRemove: (file) => {
      console.log(file)
    },
    onChange: ({file, fileList})=> {
      // 覆盖上传
      if(fileList.length>1){
        fileList.splice(0,1);
      }
      if (file.status !== 'uploading') {
        console.log(file, fileList)
      } 
      if (file.status === 'done') {
        if (file.response.code === 200) {
          message.success(`${file.name} 文件上传成功`)
          // 把packageid传到父组件
          this.triggerChange(file.response.data.pkg_id);
        }else{
          message.error(`${file.name} 文件上传失败.`)
        }
      } else if (file.status === 'error') {
        message.error(`${file.name} 文件上传失败.`)
      }
    },
  };
 
  triggerChange = (changedValue) => {
    // Should provide an event to pass value to Form.
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(changedValue);
    }
  }

  render(){
    return (
      <Upload {...this.propsConfig}>
        <Button>
          <Icon type="upload" /> 点击上传
        </Button>
      </Upload>
    )
  }
}
export default UpLoad