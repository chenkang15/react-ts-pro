import React, { useEffect } from 'react';
import a from '../a';

export default function() {
  useEffect(() => {

    document.getElementById('one').addEventListener('click', () => {
      console.log(1, true);
    }, true);
    document.getElementById('two').addEventListener('click', () => {
      console.log(2, true);
    }, true);
    document.getElementById('three').addEventListener('click', () => {
      console.log(3, true);
    }, true);

    document.getElementById('one').addEventListener('click', () => {
      console.log(1);
    });
    document.getElementById('two').addEventListener('click', () => {
      console.log(2);
    });
    document.getElementById('three').addEventListener('click', () => {
      console.log(3);
    });
  }, []);
  return [(
    <div id='one'>one
      <div id='two'>two
        <div id='three'>three</div>
      </div>
    </div>
  ), (
    <details open={false}>
      <summary>新卓越计算机</summary>
      <p>西安邮电的培训教育</p>
      <p>西安邮电的培训教育</p>
      <p>西安邮电的培训教育</p>

    </details>
  )];
}
