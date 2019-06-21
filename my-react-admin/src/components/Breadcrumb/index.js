/**
 *
 * LoadingIndicator
 *
 */

import React from 'react';
import { Breadcrumb } from 'antd';
// import PropTypes from 'prop-types';

function BreadcrumbWrap(props) {
  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>{props.one}</Breadcrumb.Item>
        <Breadcrumb.Item>{props.two}</Breadcrumb.Item>
      </Breadcrumb>
    </>
  );
}

BreadcrumbWrap.propTypes = {};

export default BreadcrumbWrap
