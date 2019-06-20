import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { Layout } from 'antd'

import Main from './Main'
import 'antd/dist/antd.css'
// import "./myAntd.less"

class App extends Component {
  render() {
    return (
      <Layout>
        <Main />
      </Layout>
    );
  }
}

export default withRouter(App);
