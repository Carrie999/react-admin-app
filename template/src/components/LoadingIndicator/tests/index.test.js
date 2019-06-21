
import  LoadingIndicator from '../index.js'
import { expect } from 'chai';
import { shallow } from 'enzyme';

/* eslint-disable */
describe('<LoadingIndicator />', () => {
  it('renders an `.loadingBox`', () => {
    const wrapper = shallow(<LoadingIndicator />);
    expect(wrapper.find('.loadingBox')).to.have.lengthOf(1);
  });
});
/* eslint-disable */
