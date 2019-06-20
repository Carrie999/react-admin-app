import React from 'react';
import {
  Form, Input, Select, Row, Col, Button, message,
} from 'antd';
// import styles from './styles/index.module.less';
import EditableTagGroup from '@/components/Tags'
import API from '@/axios/api_project'

const DATANAME = ['name','category','alias_project','labels','desc']
const { Option } = Select;
const { TextArea } = Input;

class RegistrationForm extends React.Component {
  state = {
    data:{

    }
  }
  isView = ()=>{
    return  this.is_view = this.props.view ? true : false
  }
  isEdit = ()=>{
    return  this.is_edit =this.props.edit ? true : false
  }
  isViewOrEdit = () => {
    return this.is_view_edit = this.is_view || this.is_edit
  }

  componentDidMount = ()=>{
    this.isView()
    this.isEdit()
    this.isViewOrEdit()
    if( this.is_view_edit ){
      const id = window.location.search.slice(1,)
      API.getProjectOne(id).then((res)=>{
        if(res.code === 200){
          this.setState({data:res.data[0]})
        } else {
          message.error(res.message)
        }
      })
    }
  }
  
  componentDidUpdate = ()=>{
    this.isView()
    this.isEdit()
    this.isViewOrEdit()
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values.labels = values.labels.tags 
        for(const i in values){
          if(!values[i]) delete values[i]
        }
        console.log('Received values of form: ', values);
        if (this.isEdit()) {
          values.index = window.location.search.slice(1,)
          API.putProject(values).then((res)=>{
            console.log(res)
            if (res.code === 200) {
              message.success('保存成功')
              this.props.history.push('/models')
            } else {
              message.error(res.messge)
            }
          })
          return
        }
        API.postProject(values).then((res)=>{
          console.log(res)
          if (res.code === 200) {
            message.success('创建成功')
            this.props.history.push('/models')
          } else {
            message.error(res.messge)
          }
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
          label='工程名称'
        >
          {getFieldDecorator(DATANAME[0], {
            initialValue: this.is_view_edit ? this.state.data[DATANAME[0]] : '',
            rules: [{ required: true, message: '请输入工程名称!', whitespace: true }],
          })(
            <Input disabled={this.is_view}/>
          )}
        </Form.Item>
        <Form.Item
          label='工程类型'
        >
          {getFieldDecorator(DATANAME[1], {
            initialValue: "ocr",
            rules: [{ required: true, message: '请输入工程类型!', whitespace: true }],
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
            initialValue: this.is_view_edit ? this.state.data[DATANAME[2]] : '',
            rules: [{ required: true, message: '请输入所属项目!', whitespace: true }],
          })(
            <Input disabled={this.is_view}/>
           
          )}
        </Form.Item>
        
        <Form.Item
          label='数据标签'
        >
          {getFieldDecorator(DATANAME[3], {
            initialValue: this.is_view_edit ? {tags:this.state.data[DATANAME[3]]} : {tags:[]},
            // rules: [{ required: true, validator: this.checkTags }],
          })(
            <EditableTagGroup />
          )}
        </Form.Item>
        <Form.Item
          label='备注信息'
        >
          {getFieldDecorator(DATANAME[4], {
            initialValue: this.is_view_edit ? this.state.data[DATANAME[4]] : '',
            // rules: [{ required: true, message: '请输入备注信息!', whitespace: true }],
          })(
            <TextArea rows={4} disabled={this.is_view}/>
          )}
        </Form.Item>
        { this.is_view
          ? ''
          : <Form.Item {...tailFormItemLayout}>
          <Button type="primary" onClick={this.handleSubmit}>保存</Button>
        </Form.Item> }
       
      </Form>
    );
  }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(RegistrationForm);




function ModelsNew(props) {
  return (
    <>
      <Row>
        <Col span={12}>
          <WrappedRegistrationForm {...props} />
        </Col>
      </Row>
    </>
  );
}


export default ModelsNew;
