/**
 *
 * BreadcrumbWrap
 *
 */

import React from 'react';
import { Breadcrumb } from 'antd';
import PropTypes from 'prop-types';

function BreadcrumbWrap(props) {
  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>{ props.one }</Breadcrumb.Item>
        <Breadcrumb.Item>{ props.two }</Breadcrumb.Item>
        <Breadcrumb.Item>{ props.three }</Breadcrumb.Item>
      </Breadcrumb>
    </>
  );
}

BreadcrumbWrap.propTypes = {
  one: PropTypes.oneOfType([
    PropTypes.string, 
    PropTypes.element 
  ]),
  // 可以是字符串，也可以是 react 组件
  two: PropTypes.oneOfType([
    PropTypes.string, 
    PropTypes.element 
  ]),
  three: PropTypes.oneOfType([
    PropTypes.string, 
    PropTypes.element 
  ]),
};

export default BreadcrumbWrap
