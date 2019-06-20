/**
 *
 * Main
 *
 */

import React from 'react';
import { Route, Switch } from 'react-router-dom'
import { Layout } from "antd";
import { PrivateRoute } from "@/pages/Login";

import styles from './styles/index.module.less';
import Home from '@/pages/Home/Loadable';
import Login from '@/pages/Login/Loadable';
import Register from '@/pages/Register/Loadable';
import Resetpassword from '@/pages/Resetpassword/Loadable';

// import PropTypes from 'prop-types';

function Main(props) {
  return (
    <Layout>
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/resetpassword" exact component={Resetpassword} />
        <PrivateRoute path="/" component={Home} />
      </Switch>
    </Layout>
  );
}

Main.propTypes = {};

export default Main
