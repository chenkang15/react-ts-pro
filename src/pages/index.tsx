import React from 'react';
import styles from './index.css';
import { Link } from 'react-router-dom';
import Di from '@/pages/designPatterns/Di';

const FC: React.FC<{}> = function(props) {
  return (
    <div className={styles.normal}>
      <Link to="/test">test</Link>
      {props.children}
      <Di/>
    </div>
  );
};
export default FC;
