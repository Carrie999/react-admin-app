import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Button} from 'antd';
import qs from 'qs'
import API from '@/axios/api_task'
import styles from './styles/index.module.less';

class Datasets extends Component {
  render() {  
    return (
      <>
        <Link to="/example">
          <Button className={styles.btn} type="primary">Example</Button> 
        </Link>
      </>
    );
  }
}


export default Datasets;
