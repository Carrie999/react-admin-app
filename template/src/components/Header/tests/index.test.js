
import  CustomHeader from '../index.js'
import { expect } from 'chai';
import { shallow } from 'enzyme';

/* eslint-disable */
describe('<CustomHeader />', () => {
  it('renders an `.title`', () => {
    const wrapper = shallow(<CustomHeader />);
    expect(wrapper.find('.title')).to.have.lengthOf(1);
  });
});
/* eslint-disable */
