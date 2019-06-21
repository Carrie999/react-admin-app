/**
 *
 * Header
 *
 */

import React from 'react';
import { Layout } from 'antd';
import styles from './styles/index.module.less';
import { Link } from 'react-router-dom';

const { Header } = Layout
// import PropTypes from 'prop-types';

function CustomHeader() {
  return (
    <Header className={styles.header}>
    <div className={styles.layoutContainer}>
      <div className={styles.logo}>
        <Link to="/" className={styles.logoLink}>
          {/* <img className={styles.logoImage} src={logo} alt="logo" /> */}
        </Link>
      </div>
      <h2 className={styles.title}>平台</h2>
    </div>
  </Header>
  );
}

Header.propTypes = {};

export default CustomHeader
