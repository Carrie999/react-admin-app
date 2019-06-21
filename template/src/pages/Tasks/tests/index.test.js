
import React from 'react';
import sinon from 'sinon';
import { expect } from 'chai';
import { mount } from 'enzyme';
import Datasets from '../index.js'
import API from '@/axios/api_task'
import qs from 'qs'
import { BrowserRouter as Router } from "react-router-dom"

/* eslint-disable */
describe('<Datasets />', () => {
  it('calls componentDidMount', () => {
    sinon.spy(Datasets.prototype, 'componentDidMount');
    // 生气😠 You should not use <Link> outside a <Router>
    const wrapper = mount(<Router><Datasets /></Router>);
    expect(Datasets.prototype.componentDidMount).to.have.property('callCount', 1);
    Datasets.prototype.componentDidMount.restore();
  });

  it('API getTask returns 200', () => {
    API.getTask(qs.stringify({page:1})).then((res)=>{
      expect(res.code).toBe(200)
    })
  });

  it('shallow wrapper instance should not be null', () => {
    const wrapper = mount(<Router><Datasets /></Router>);
    const instance = wrapper.instance();
    expect(instance).to.be.instanceOf(Router);
  });
});
/* eslint-disable */