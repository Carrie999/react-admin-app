

import React from 'react';
import Index from './index'
function Edit(props) {
  return (
    <>
      <Index edit={true}  {...props}/>
    </>
  );
}


export default Edit