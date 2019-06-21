import React, { Component } from 'react';
import styles from './styles/index.module.less';

class Example extends Component {
  render() {  
    return (
      <div className={styles.example}>
        <div>404</div> 
        <iframe 
          style={{border: 'none'}}
          id="inlineFrameExample"
          title="Inline Frame Example"
          width="760"
          height="420"
          src="http://vianroyal.github.io/t-rex-runner/"
          >
        </iframe>
      </div>
    );
  }
}




export default Example;
