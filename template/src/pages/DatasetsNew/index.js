import React from 'react';
import {
  Form, Input, Select, Row, Col, Button, message
} from 'antd';
// import styles from './styles/index.module.less';
import EditableTagGroup from '@/components/Tags'
import UpLoad from './upload'
import API from '@/axios/api_dataset'

const DATANAME = ['name','category','alias_project','device','labels','desc','package_id']
const { Option } = Select;
const { TextArea } = Input;

class RegistrationForm extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if(values.labels && values.labels.hasOwnProperty('tags')){
          values.labels = values.labels.tags
        }
        console.log('Received values of form: ', values);
        API.postDataset(values).then((res)=>{
          if (res.code === 200) {
            this.props.history.push('/datasets')
          } else {
            message.error(res.messge)
          }
        }).catch((err)=>{
          console.log(err)
          message.error('上传失败')
        })
      }
    });
  }

  // checkTags = (rule, value, callback) => {
  //   console.log(value)
  //   if (value.tags.length > 0) {
  //     callback();
  //     console.log(value)
  //     return;
  //   }
  //   callback('请输入数据标签!');
  // }

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 19 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 19,
          offset: 5,
        },
      },
    };

    return (
      <Form {...formItemLayout}>
        <Form.Item
          label='数据名称'
        >
          {getFieldDecorator(DATANAME[0], {
            rules: [{ required: true, message: '请输入数据名称!', whitespace: true }],
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item
          label='数据类型'
        >
          {getFieldDecorator(DATANAME[1], {
            initialValue: "ocr",
            rules: [{ required: true, message: '请输入数据类型!', whitespace: true }],
          })(
            <Select disabled>
              <Option value="OCR识别">OCR识别</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item
          label='所属项目'
        >
          {getFieldDecorator(DATANAME[2], {
            rules: [{ required: true, message: '请输入所属项目!', whitespace: true }],
          })(
            <Input />
           
          )}
        </Form.Item>
        <Form.Item
          label='打码设备'
        >
          {getFieldDecorator(DATANAME[3], {
            rules: [{ required: true, message: '请输入打码设备!', whitespace: true }],
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item
          label='数据标签'
        >
          {getFieldDecorator(DATANAME[4], {
            // rules: [{ required: true, message: '请输入数据标签!', whitespace: true }],
            initialValue: {tags:[]},
            // rules: [{ required: true, validator: this.checkTags }],
          })(
            <EditableTagGroup />
            // <Input />
          )}
        </Form.Item>
        <Form.Item
          label='备注信息'
        >
          {getFieldDecorator(DATANAME[5], {
            // rules: [{ required: true, message: '请输入备注信息!', whitespace: true }],
          })(
            <TextArea rows={4} />
          )}
        </Form.Item>
        <Form.Item
          label='上传zip'
        >
          {getFieldDecorator(DATANAME[6], {
            initialValue: '',
            rules: [{ required: true, message: '请上传zip文件,耐心等待上传完成!' }],
          })(
              <UpLoad />
          )}
          <span style={{color:'#f5606e',fontSize:'12px'}}>只支持zip格式</span>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" onClick={this.handleSubmit}>保存</Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(RegistrationForm);







const DatasetsNew = (props)=>  {
  return (
    <>
      <Row>
        <Col span={12}>
          <WrappedRegistrationForm {...props}/>
        </Col>
      </Row>
    </>
  );
}



export default DatasetsNew;
