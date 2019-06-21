import React from 'react';
import ReactDOM from 'react-dom';
import App from '../components/App';
import { BrowserRouter as Router } from "react-router-dom"

/* eslint-disable */
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Router>
    <App />
  </Router>, div);
  ReactDOM.unmountComponentAtNode(div);
});
/* eslint-disable */