import React, {Component} from 'react';
import {
  Table, Input, Button, Popconfirm, Form,
} from 'antd';
import styles from './styles/index.module.less';

const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends Component {
  state = {
    editing: false,
  }

  toggleEdit = () => {
   
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus();
      }
    });
  }

  save = (e) => {

    const { record, handleSave } = this.props;
    this.form.validateFields((error, values) => {
      if (error && error[e.currentTarget.id]) {
        return;
      }
      this.toggleEdit();
      handleSave({ ...record, ...values });
    });
  }

  render() {
    const { editing } = this.state;
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editable ? (
          <EditableContext.Consumer>
            {(form) => {
              this.form = form;
              return (
                editing ? (
                  <FormItem style={{ margin: 0 }}>
                    {form.getFieldDecorator(dataIndex, {
                      rules: [{
                        required: true,
                        message: `请输入${title}`,
                      }],
                      initialValue: record[dataIndex],
                    })(
                      <Input
                        style={{ width: 100 }}
                        ref={node => (this.input = node)}
                        onPressEnter={this.save}
                        onBlur={this.save}
                      />
                    )}
                  </FormItem>
                ) : (
                  <div
                    className={styles.editableCellValueWrap}
                    style={{ paddingRight: 4 }}
                    onClick={this.toggleEdit}
                  >
                    {restProps.children}
                  </div>
                )
              );
            }}
          </EditableContext.Consumer>
        ) : restProps.children}
      </td>
    );
  }
}

class EditableTable extends Component {
  constructor(props) {
    super(props);
    this.columns = [{
      title: '字符编号',
      dataIndex: 'name',
      width: '15%',
      // editable: true,
    }, {
      title: '数字',
      width: '15%',
      dataIndex: 'number',
      editable: true,
    }, {
      title: '大写字母',
      width: '30%',
      dataIndex: 'upperCaseLetters',
      editable: true,
    }, {
      title: '小写字母',
      width: '30%',
      dataIndex: 'lowerCaseLetters',
      editable: true,
    }
    // ,{
    //   title: '操作',
    //   width: '10%',
    //   dataIndex: 'opration',
    //   render: (text, record) => (
    //     this.state.dataSource.length >= 1
    //       ? (
    //         <Popconfirm title="确定要删除?" onConfirm={() => this.handleDelete(record.key)}>
    //           <a href="javascript:;">删除</a>
    //         </Popconfirm>
    //       ) : null
    //   ),
    // }
    ];
    
    let { row, col } = this.props
    col = parseInt(col)
    let dataSource = []
    for(let i=0; i < col; i++){
      dataSource.push({
        key: i,
        name:`${row}行${i+1}列`,
        number: '',
        upperCaseLetters: '',
        lowerCaseLetters: '',
      })
    }
   
    this.state = {
      dataSource: dataSource
    };
  }
  componentDidMount = () => {

  }
  componentWillReceiveProps(nextProps) {
    if(this.props.col === nextProps.col && this.props.row === nextProps.row){
      return false
    }
    console.log(nextProps)
    let { row, col } = nextProps
    col = parseInt(col)
    let dataSource = []
    for(let i=0;i < col;i++){
      dataSource.push({
        key: i,
        name:`${row}行${i+1}列`,
        number: '',
        upperCaseLetters: '',
        lowerCaseLetters: '',
      })
    }
    this.setState({ dataSource: dataSource});
  }

  handleDelete = (key) => {
    const dataSource = [...this.state.dataSource];
    this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
  }

  handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData = {
      key: count,
      name: `Edward King ${count}`,
      age: 32,
      address: `London, Park Lane no. ${count}`,
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
  }

  handleSave = (row) => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    this.setState({ dataSource: newData });
    // 把 state 传递给父组件
    this.props.getTableState(this.state, this.props.row)
  }

  render() {
    // console.log(this.props)
   
    // const { dataSource } = this.state;
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });
    return (
      <div>
        {/* <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
          新增一行
        </Button> */}
        <Table
          components={components}
          rowClassName={styles.editableRow}
          bordered
          dataSource={this.state.dataSource}
          columns={columns}
        />
      </div>
    );
  }
}

export default EditableTable