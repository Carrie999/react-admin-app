
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { Route } from 'react-router-dom'
import  Main from '../index.js'

/* eslint-disable */
describe('<Main />', () => {
  it('renders three <Route /> components', () => {
    const wrapper = shallow(<Main />);
    expect(wrapper.find(Route)).to.have.lengthOf(3);
  });
});
/* eslint-disable */

