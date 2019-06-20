import React, { Component } from 'react';
import {
  Form, Input, Select, Row, Col, Button, message
} from 'antd';
import NumericInput from './NumericInput';
import styles from './styles/index.module.less';
import API from '@/axios/api_train'
import EditableTable from './EditableTable';
import api_dataset from '../../axios/api_dataset';
import { element } from 'prop-types';
import { isNumber } from 'util';
import { ifError } from 'assert';


const DATANAME = ['project_id','train_dataset_id','test_dataset_id','char_dist']
const { Option } = Select;
// const children = [];
// for (let i = 10; i < 36; i++) {
//   children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
// }



class RegistrationForm extends React.Component {
  state ={
    characterRows: 0,
    dataProjects: [],
    dataDatasets: [],
  }
  char_dist = []

  componentDidMount = ()=>{

    API.getProjects().then((res)=>{
      if (res.code === 200) {
        this.setState({dataProjects:res.data})
      } else {
        message.error(res)
      }
    }).catch(() => {
      message.error('请求失败')
    })

    API.getDatasets().then((res)=>{
      if (res.code === 200) {
        this.setState({dataDatasets:res.data})
      } else {
        message.error(res)
      }
    }).catch(() => {
      message.error('请求失败')
    })
  
  }

  handleChange = (type, value) =>{
    console.log(`selected ${type} ${value}`);
    if(type === 'train_dataset_id'){
      value.map( item => {
        if(this.test_dataset_id && this.test_dataset_id.includes(item)){
          message.error('训练数据和测试数据集不能重复')
        }else{
          this.train_dataset_id = value
        }
      })
    }
    if(type === 'test_dataset_id'){
      value.map( item => {
        if(this.train_dataset_id && this.train_dataset_id.includes(item)){
          message.error('训练数据和测试数据集不能重复')
        }else{
          this.test_dataset_id = value
        }
      })
    }
  
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log(this.props)
        values.test_dataset_id.map( item => {
          if(values.train_dataset_id.includes(item)){
            message.error('训练数据和测试数据集不能重复')
          }
          return false
        })
        for (let i in values) {
          if (!isNaN(parseInt(i))){
            delete values[i]
          }
        }
        values.char_dist = this.char_dist
        console.log('Received values of form: ', values);
        API.postTraining(values).then((res)=>{
          console.log(res)
          if (res.code === 200) {
            message.success('请求成功')
            // this.props.form.resetFields();
            this.props.history.go(0);
          }else{
            message.success('请求失败')
          }
        }).catch((err)=>{
          console.log(err)
          message.error('出错了😣')
        })
      }
    });
  }

  showCharacterRows = (rows) => {
    this.setState({characterRows:rows})
  }

  settingCol = (col, i) => {
    // console.log(`settingCol ${col}_${i}`)
    this.setState({[`col${i}`]: col})
  }

  getCharacterRows = ()=>{
    const { getFieldDecorator } = this.props.form;
    const rows = this.state.characterRows
    let children = []
    for(let i= 0;i<rows;i++){
      children.push(<Form.Item
        key={i}
        label= {`第 ${i+1} 行字符数`}
      >
        {getFieldDecorator(`${i+1}`, {
          rules: [{ required: true, message: `请输入第 ${i+1} 行字符数!`}],
        })(
          <NumericInput settingCol = { (e)=>this.settingCol(e, i+1) } key={i} rows={false} style={{ width: 140 }}  />
        )}
      </Form.Item>)
    }
    return children
  }

  unique = (params) =>{
    return [...new Set(params.split(''))]
  }

  getTableState = (value, row) => {
    // console.log(value, row)
    let dataSource = value.dataSource
    let newdataSource = []
    dataSource.forEach((item,index)=>{
      newdataSource[index] = [
        this.unique(item.number),
        this.unique(item.upperCaseLetters),
        this.unique(item.lowerCaseLetters)
      ]
    })
    this.char_dist[row-1] = newdataSource
    console.log(this.char_dist)
  }

  getProjects = () => {
    const { dataProjects } = this.state
    if (dataProjects.length > 0) {
      return dataProjects.map((element)=>(
        <Option key={element.id} value={element.id} >{element.id_}({element.name})</Option>
      ))
    }
  }

  getDatasets = () => {
    const { dataDatasets } = this.state
    if (dataDatasets.length > 0) {
      return dataDatasets.map((element)=>(
        <Option key={element.id} value={element.id} >{element.id_}({element.name})</Option>
      ))
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 3 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 11},
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 11,
          offset: 3,
        },
      },
    };

    return (
      <Form {...formItemLayout}>
        <Form.Item
          label='选择工程'
        >
          {getFieldDecorator(DATANAME[0], {
            initialValue: '',
            rules: [{ required: true, message: '请选择工程!', whitespace: true }],
          })(
          
            <Select onChange={(e) => this.handleChange(DATANAME[0],e)}>
              {this.getProjects()}
            </Select>
          )}
        </Form.Item>
        <Form.Item
          label='训练数据'
        >
        {getFieldDecorator(DATANAME[1], {
            initialValue: [],
            rules: [{ required: true, message: '请选择训练数据!'}],
          })(
            <Select
              mode="multiple"
              style={{ width: '100%' }}
              placeholder="请选择训练数据"
              onChange={(e) => this.handleChange(DATANAME[1],e)}
            >
              {this.getDatasets()}
            </Select>
            )}
        </Form.Item>
        <Form.Item
          label='测试数据'
        >
          {getFieldDecorator(DATANAME[2], {
            rules: [{ required: true, message: '请选择测试数据!'}],
          })(
            <Select
              mode="multiple"
              style={{ width: '100%' }}
              placeholder="请选择测试数据"
              onChange={(e) => this.handleChange(DATANAME[2],e)}
            >
              {this.getDatasets()}
            </Select>
          )}
        </Form.Item>

        <Form.Item
          label='字符行数'
        >
          {getFieldDecorator(DATANAME[3], {
            rules: [{ required: true, message: '请输入字符行数!' }],
          })(
            <NumericInput rows={true} style={{ width: 140 }} showCharacterRows ={this.showCharacterRows}/>
          )}
        </Form.Item>
        { this.state.characterRows > 0
          ? this.getCharacterRows()
          : ''
        }
        { this.state.col1 > 0
          ?  <EditableTable getTableState ={this.getTableState} col={this.state.col1} row = {1}/>
          : ''
        }
        { this.state.col2 > 0
          ?  <EditableTable getTableState ={this.getTableState} col={this.state.col2} row = {2}/>
          : ''
        }
        { this.state.col3 > 0
          ?  <EditableTable getTableState ={this.getTableState} col={this.state.col3} row = {3}/>
          : ''
        }
        { this.state.col4 > 0
          ?  <EditableTable getTableState ={this.getTableState} col={this.state.col4} row = {4}/>
          : ''
        }
       
        
        {/* <Form.Item
          label="常用邮箱"
        >
          {getFieldDecorator('email', {
            rules: [{
              type: 'email', message: '不是有效邮箱',
            }, {
              required: true, message: '请输入邮箱!',
            }],
          })(
            <Input />
          )}
        </Form.Item> */}
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" onClick={this.handleSubmit}>开始训练</Button>
         
        </Form.Item>
        <p className={styles.notify}> 模型训练和测试大概需要5～8小时，请您耐心等待，训练完成后会邮件提醒⏰</p>
       
      </Form>
    );
  }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(RegistrationForm);




function Train(props) {
  return (
    <>
      <Row>
        <Col span={20}>
          <WrappedRegistrationForm {...props}/>
        </Col>
      </Row>
    </>
  );
}




export default Train;
