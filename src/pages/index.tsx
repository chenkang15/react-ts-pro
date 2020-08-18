import React from 'react';
import styles from './index.css';
import { Link } from 'react-router-dom';
import a from './a'
import PromiseComp from '@/pages/test/promise';
const FC: React.FC<{}> = function(props) {
  setTimeout(() => a.val = 10)
  return (
    <div className={styles.normal}>
      <Link to="/test">test</Link>
      {props.children}
      <PromiseComp/>
    </div>
  );
}
export default FC
