
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { Menu } from 'antd';
import Sidebar from '../index.js'


/* eslint-disable */
describe('<Sidebar />', () => {
  it('renders three <Menu /> components', () => {
    const wrapper = shallow(<Sidebar />);
    expect(wrapper.find(Menu)).to.have.lengthOf(1);
  });
});
/* eslint-disable */

